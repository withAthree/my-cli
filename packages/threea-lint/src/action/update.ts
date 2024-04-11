import promise from "../utils/npm-type";
import {execSync} from 'child_process'
import {PKG_NAME, PKG_VERSION} from '../utils/constants'
import ora from "ora";
import npmType from "../utils/npm-type";
import log from '../utils/log';


/**
 * 检查最新版本号
 */
const checkLatestVersion = async (): Promise<string | null> => {
    const npm = await promise;
    const latestVersion = execSync(`${npm} view ${PKG_NAME} version`).toString('utf-8').trim()

    if (latestVersion === PKG_VERSION) {
        return null
    }

    const compareArr = PKG_VERSION.split('.').map(Number);
    const beComparedArr = latestVersion.split('.').map(Number);

    for (let i = 0; i < compareArr.length; i++) {
        if (compareArr[i] > beComparedArr[i]) {
            return null
        } else if (compareArr[i] < beComparedArr[i]) {
            return latestVersion
        }
    }
}

/**
 * 检查包的版本
 * @param install
 */
export default async (install = false) => {
    const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`)
    checking.start()
    try {
        const npm = await npmType;
        const latestVersion = await checkLatestVersion();
        checking.stop()
        if (latestVersion && install) {
            const update = ora(`[${PKG_NAME}] 存在新版本，将升级至 ${latestVersion}`);
            update.start();
            execSync(`${npm} i -g ${PKG_NAME}`);
            update.stop()
        } else if (latestVersion) {
            log.warn(
                `最新版本为 ${latestVersion}，本地版本为 ${PKG_VERSION}，请尽快升级到最新版本。\n你可以执行 ${npm} install -g ${PKG_NAME}@latest 来安装此版本\n`,
            );
        } else if (install) {
            log.info(`当前没有可用的更新`);
        }
    }catch (e){
        checking.stop();
        log.error(e)
    }
}