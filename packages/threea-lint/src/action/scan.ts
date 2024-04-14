import {Config, PKG, ScanOptions, ScanReport, ScanResult} from "../types";
import path from "path";
import fs from "fs-extra";
import {PKG_NAME} from "../utils/constants";
import {doESLint, doMarkdownlint, doPrettier, doStylelint} from "../lint";

const scanAction = async (options: ScanOptions): Promise<ScanReport> => {
    const {cwd, fix, outputReport, config: scanConfig} = options

    const readConfigFile = (pth: string): any => {
        const localPath = path.resolve(cwd, pth)
        return fs.existsSync(localPath) ? require(localPath) : {}
    }

    const pkg: PKG = readConfigFile('package.json');
    const config: Config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`)
    const runErrors: Error[] = [];
    let results: ScanResult[] = []

    if (fix) {
        // prettier
        if (config.enablePrettier) {
            await doPrettier(options)
        }
        // eslint
        if (config.enableESLint !== false) {
            try {
                const eslintResults = await doESLint({...options, pkg, config});
                results = results.concat(eslintResults);
            } catch (e) {
                runErrors.push(e);
            }
        }
        if (config.enableStylelint) {
            try {
                const stylelintResults = await doStylelint({...options, pkg, config});
                results = results.concat(stylelintResults);
            } catch (e) {
                runErrors.push(e);
            }
        }
        if (config.enableMarkdownlint) {
            try {
                const markdownlintResults = await doMarkdownlint({...options, pkg, config});
                results = results.concat(markdownlintResults);
            } catch (e) {
                runErrors.push(e);
            }
        }
    }

    if (outputReport) {
        const reportPath = path.resolve(process.cwd(), `./${PKG_NAME}-report.json`);
        fs.outputFile(reportPath, JSON.stringify(results, null, 2), () => {
        });
    }
    return {
        results,
        errorCount: results.reduce((count, {errorCount}) => count + errorCount, 0),
        warningCount: results.reduce((count, {warningCount}) => count + warningCount, 0),
        runErrors,
    }
}

export default scanAction