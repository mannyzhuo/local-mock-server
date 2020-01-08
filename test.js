const http = require('http');

let server = null;
server = http.createServer((request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    // vscode.window.showInformationMessage(request.path);
    console.log(request.path);
    response.end('456');
});
server.listen(63341);