import * as vscode from 'vscode';

export async function deletePastResults(): Promise<vscode.TerminalExitStatus> {
    let terminal = vscode.window.createTerminal();
    terminal.sendText("dotnet tool install -g dotnet-reportgenerator-globaltool");
    terminal.sendText("powershell rm -r -fo ./coverage_report");
    terminal.sendText("powershell rm -r -fo ./**/TestResults");
    terminal.sendText("; exit");
    return new Promise<vscode.TerminalExitStatus>((resolve, reject) => {
        const disposeToken = vscode.window.onDidCloseTerminal(async (closedTermianl) => {
            if(closedTermianl === terminal) {
                disposeToken.dispose();
                if(closedTermianl.exitStatus !== undefined) {
                    resolve(closedTermianl.exitStatus);
                }
                else {
                    reject("Terminal closed without exit status");
                }
            }
        });
    });
}

export async function collectTestResults(): Promise<vscode.TerminalExitStatus> {
    let terminal = vscode.window.createTerminal();
    terminal.sendText("dotnet test --collect:\"XPlat Code Coverage\"");
    terminal.sendText("; exit");
    return new Promise<vscode.TerminalExitStatus>((resolve, reject) => {
        const disposeToken = vscode.window.onDidCloseTerminal(async (closedTermianl) => {
            if(closedTermianl === terminal) {
                disposeToken.dispose();
                if(closedTermianl.exitStatus !== undefined) {
                    resolve(closedTermianl.exitStatus);
                }
                else {
                    reject("Terminal closed without exit status");
                }
            }
        });
    });
}

export async function generateReport(): Promise<vscode.TerminalExitStatus> {
    let terminal = vscode.window.createTerminal();
    terminal.sendText("reportgenerator -reports:./**/coverage.cobertura.xml -targetdir:coverage_report -filefilters:-**Moq** -assemblyFilters:-*.Tests");
    terminal.sendText("./coverage_report/index.html");
    terminal.sendText("; exit");
    return new Promise<vscode.TerminalExitStatus>((resolve, reject) => {
        const disposeToken = vscode.window.onDidCloseTerminal(async (closedTermianl) => {
            if(closedTermianl === terminal) {
                disposeToken.dispose();
                if(closedTermianl.exitStatus !== undefined) {
                    resolve(closedTermianl.exitStatus);
                }
                else {
                    reject("Terminal closed without exit status");
                }
            }
        });
    });
}
