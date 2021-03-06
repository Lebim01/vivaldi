export const functions = {
    email : (value) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
    },
    url : (value) => {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value);
    },
    number : (value) => {
        return /^[-+]?\d+$/gm.test(value);
    },
    decimal : (value) => {
        return /^[+-]?\d+(\.\d+)?$/gm.test(value)
    },
    date : (value) => {
        return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](18|19|20|21)\d\d$/gm.test(value);
    },
    color : (value) => {
        return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
    },
    ip : (value) => {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)
    },
    phone : (value) => {
        // (dd) ddd-dddd
        const format1 = /(\(\d\d\)+\s+\d\d\d+\s\-+\s+\d\d\d\d)/gm
        // ddd ddd ddd
        const format2 = /(\d\d\d+\s+\d\d\d+\s+\d\d\d)/gm
        return (format1.test(value) || format2.test(value))
    },
    length : (value, { compare }) => {
        let length = value.length

        if(Array.isArray(compare)){
            return !!compare.find(val => val === length)
        }else{
            return length === compare
        }
    },

    lengthDouble : (value, { compare,compare2 }) => {
        let length = value.length

        if(Array.isArray(compare) || Array.isArray(compare2)){
            return !!compare.find(val => val === length) || !!compare2.find(val => val === length)
        }else{
            return length === compare || length === compare2
        }
    }
}

export function validate(funcs){
    return function(value){
        // nameFuntion is a function on this file
        for(let nameFunction in funcs){
            let aditionalParamsFunc = funcs[nameFunction]
            let result = functions[nameFunction](value, aditionalParamsFunc)
            if(!result){
                return result || ( typeof aditionalParamsFunc === 'string' ? aditionalParamsFunc : aditionalParamsFunc.message )
            }
        }

        return true
    }
}
