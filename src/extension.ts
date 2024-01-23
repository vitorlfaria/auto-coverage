import * as vscode from 'vscode';
import { collectTestResults, deletePastResults, generateReport } from './methods';

export function activate(context: vscode.ExtensionContext) {
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    statusBarItem.text = "$(open-editors-view-icon) Generate Report";
    statusBarItem.command = "auto-coverage.generateReport";
    statusBarItem.show();

	let disposable = vscode.commands.registerCommand('auto-coverage.generateReport', () => {
        vscode.window.withProgress({location: vscode.ProgressLocation.Notification, title: "Generating Coverage Report"}, async (progress) => {
            progress.report({message: "Deleting past results..."});
            await deletePastResults();

            progress.report({message: "Running tests and collecting results..."});
            await collectTestResults();

            progress.report({message: "Generating report..."});
            await generateReport();
	    });
    });

	context.subscriptions.push(disposable);
}

export function deactivate() {}
