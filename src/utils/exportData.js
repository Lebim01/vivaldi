function htmlToXlsById(tableID){
    let tableSelect = document.getElementById(tableID);
    let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    htmlToXls(tableHTML)
}

function htmlToXls(tableHTML){
    let downloadLink;
    let dataType = 'application/vnd.ms-excel';
    
    // Specify file name
    let filename = 'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        let blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}

function Export2Doc(element){
    
    let html = document.getElementById(element).innerHTML;
    Export2DocFromHtml(html)
    
}

function Export2DocFromHtml(html){
    let preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    let postHtml = "</body></html>";

    let blob = new Blob(['\ufeff', preHtml+html+postHtml], {
        type: 'application/msword'
    });

    // Specify link url
    let url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    let filename = 'document.doc';
    
    // Create download link element
    let downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}

function printHtml(html){
    let _window = window.open('','')
    _window.document.write(`
        ${html}
        <style>
            body {
                font-family : Arial;
            }
        </style>
        <script>
            window.onload = function(){
                window.print()
            }
            window.onafterprint = function(){
                window.close()
            }
        </script>
    `)
    _window.document.close();

    _window.focus();
}

function barcodeToPng(code = ''){
    const JsBarcode = require('jsbarcode');

    const canvas = document.createElement('canvas')

    JsBarcode(canvas, code, {format: "CODE39"});

    return canvas.toDataURL("image/png");
}

function qrcodeToPng(code = '', options = {}){
    return new Promise((resolve, reject) => {
        var QRCode = require('qrcode')
        
        QRCode.toDataURL(code, options, function (error, url) {
            if (error) reject(error)
            resolve(url)
        })
    })
}

export {
    htmlToXlsById,
    htmlToXls,
    Export2Doc,
    Export2DocFromHtml,
    printHtml,
    barcodeToPng,
    qrcodeToPng
}