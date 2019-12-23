const {Builder, By, Key, until} = require('selenium-webdriver');
const colors = require('colors');

/**
 * Inputs
 */
const host = 'http://localhost:3000/';
const username = 'victorprueba'
const password = '1234'
const key_permission = 'solicitudusuario'

/**
 * Code
 */

const wait = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), seconds * 1000)
    })
}

async function getParentMenuFromSubmenu(driver, element){
    return await driver.executeScript(`
        return arguments[0].parentElement.parentElement.parentElement.querySelector(':first-child a:not(.active)')
    `, element);
}

async function openParentsMenu(driver, element){
    let hasParent = false
    do{
        let _id_init = await element.getId()
        // submenu mas arriba
        let parentMostAbove = null
        do {
            let parent = await getParentMenuFromSubmenu(driver, parentMostAbove ? parentMostAbove : element)

            let _id1 = await parent.getId()
            let _id2 = parentMostAbove ? (await parentMostAbove.getId()) : ''

            if(_id_init == _id1 && _id1 == _id2){
                parentMostAbove = null
                break
            }

            if(parent && _id1 != _id2){
                parentMostAbove = parent
            }else{
                break
            }
        }
        while(true)

        if(parentMostAbove){
            parentMostAbove.click()
            hasParent = true
        }
        else hasParent = false
    }
    while(hasParent)
}

async function getLocalStorageItem(driver, key) {
    let item = await driver.executeScript("return localStorage.getItem(arguments[0])", key);
    if(item){
        item = JSON.parse(item)
        let newItem = {}
        let keys = Object.keys(item)
        for(let i in keys){
            newItem[keys[i]] = JSON.parse(item[keys[i]])
        }
        return newItem
    }
    return null
}

const login = (driver, {username, password}) => {
    let txtUser = driver.findElement(By.css('[aria-label=Usuario]'));
    let txtPass = driver.findElement(By.css('[aria-label=Contraseña]'));
    let btnLogin = driver.findElement(By.css('[type=submit]'))

    txtUser.sendKeys(username)
    txtPass.sendKeys(password)
    btnLogin.click()
}

const testPermission = async (driver, { key_permission, isCatalog }) => {
    try {
        let redux = await getLocalStorageItem(driver, 'persist:root')
        if(redux.user_info.isSuperuser) return true

        let permissions = redux.user_info.permissions
        let hasPermission = permissions.filter((name_permission) => isCatalog ? name_permission.includes(key_permission) : name_permission === key_permission)
        if(hasPermission.length){
            let hasView = !!hasPermission.find(name => name.includes('view_'))
            let hasAdd = !!hasPermission.find(name => name.includes('add_'))
            let hasChange = !!hasPermission.find(name => name.includes('change_'))
            let hasDelete = !!hasPermission.find(name => name.includes('delete_'))

            if(hasView){
                await testView(driver, { key_permission : isCatalog ? `view_${key_permission}` : key_permission })
            }
        }

        return false
    }catch(e){
        console.log(colors.red(e))
    }
}

/**
 * Prueba que el boton del menu este visible y 
 * tambien al dar click redirija correctamente al modulo
 * y el modulo cargue su información
 */
const testView = async (driver, { key_permission }) => {
    try {
        // test is button visible on menu
        let linkMenu = await driver.findElement(By.css(`li.sidebar-item[permission=${key_permission}] a`))
        if(linkMenu){
            await openParentsMenu(driver, linkMenu)
            linkMenu.click()

            let table = await driver.wait(until.elementLocated(By.css('table.table.table-sm')), 5*1000)
            let url = await driver.getCurrentUrl()

            if(!table || url.includes('#/404')){
                console.log(colors.red(`FAIL: Test "view" ${key_permission}`))
                return false
            }

            console.log(colors.green(`OK: Test "view" ${key_permission}`))
            return true
        }
    }catch(e){
        throw `Test de "view" fallido${e ? ' '+e : ''}`
    }
}
 
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  driver.manage().window().maximize();
  try {
    console.time('test')
    await driver.get(host);
    await login(driver, { username, password })
    await wait(5)
    await testPermission(driver, { key_permission, isCatalog: true })
    console.timeEnd('test')
  } finally {
    await driver.quit();
  }
})();