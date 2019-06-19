async function fileToBase64(file){
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject('Error: ', error);
        };
    })
}

export {
    fileToBase64
}