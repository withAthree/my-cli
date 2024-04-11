import initAction from "./action/init";
import type {InitOptions, ScanOptions} from './types'
import ora from "ora";
import {PKG_NAME} from "./utils/constants";
import scanAction from "./action/scan";
import printReport from "./utils/print-report";

type IInitOptions = Omit<InitOptions, 'checkVersionUpdate'>;


export const init = async (option: IInitOptions) => {
    return await initAction({
        ...option,
        checkVersionUpdate: false
    })
}

export const scan = async (options: ScanOptions) => {
    const checking = ora();
    checking.start(`执行 ${PKG_NAME} 代码检查`);

    const report = await scanAction(options);
    const {results, errorCount, warningCount} = report;
    let type = 'succeed';
    if (errorCount > 0) {
        type = 'fail';
    } else if (warningCount > 0) {
        type = 'warn';
    }

    checking[type]();
    if (results.length > 0) printReport(results, false);

    return report;
}