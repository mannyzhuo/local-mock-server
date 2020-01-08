// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const http = require('http');
const fs = require('fs');

let server = null;

let port = 63341;
// const dirname = vscode.workspace.workspaceFolder[0].uri.path;
const dirname = path.resolve(vscode.workspace.workspaceFolders[0].uri.fsPath);
const packageP = path.resolve(dirname, 'package.json');
if (fs.existsSync(packageP)) {
	const a = JSON.parse(fs.readFileSync(packageP).toString());
	port = a.localmockserverport || port;
}


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "local mock server" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.localmockserver', function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage(dirname);
		// vscode.window.showInformationMessage(vscode.workspace.rootPath);
		// vscode.window.showInformationMessage(vscode.workspace.workspaceFolders[0].uri.path);
		vscode.window.showInformationMessage(path.resolve(vscode.workspace.workspaceFolders[0].uri.fsPath),''+port)
	});
	server = http.createServer((request, response) => {
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Headers', '*');
		response.setHeader('Content-Type', 'application/json');
		const fp = path.resolve(dirname, request.url.slice(1).split('?')[0]);
		if (fs.existsSync(fp)) {
			response.end(fs.readFileSync(fp).toString());
		}
		else {
			console.log("The file does not exists.", fp)
			response.end('The file does not exists.');
		}
	});

	server.listen(port);
	context.subscriptions.push(disposable);
	setTimeout(()=>{


	},2000);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
