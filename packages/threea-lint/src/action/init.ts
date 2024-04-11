import inquirer from 'inquirer';
import {PKG_NAME, PROJECT_TYPES} from "../utils/constants";
import {InitOptions, PKG} from "../types";
import path from 'path';
import fs from "fs-extra";
import update from "./update";
import log from "../utils/log";
import conflictResolve from "../utils/conflict-resolve";
import npmType from "../utils/npm-type";
import spawn from 'cross-spawn';
import generateTemplate from "../utils/generate-template";


let step = 0;

/**
 * 选择项目语言和框架
 */
const chooseEslintType = async (): Promise<string> => {
    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: `请选择项目类型：`,
        choices: PROJECT_TYPES,
    });
    return type;
};

/**
 * 选择是否启用 stylelint
 * @param defaultValue
 */
const chooseEnableStylelint = async (defaultValue: boolean): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `启用 stylelint ？`,
        default: defaultValue,
    });
    return enable;
};

/**
 * 选择是否启用 markdownlint
 */
const chooseEnableMarkdownLint = async (): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `启用 markdownlint ？`,
        default: true,
    });
    return enable;
};

/**
 * 选择是否启用 prettier
 */
const chooseEnablePrettier = async (): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `启用 Prettier ？`,
        default: true,
    });
    return enable;
};


async function initAction (options: InitOptions) {
    const cwd = options.cwd || process.cwd()
    const isTest = process.env.NODE_ENV === 'test';
    const checkVersionUpdate = options.checkVersionUpdate || false;
    const disableNpmInstall = options.disableNpmInstall || false;
    const config: Record<string, any> = {};
    const pkgPath = path.resolve(cwd, 'package.json');
    let pkg: PKG;

    // 版本检查
    if (!isTest && checkVersionUpdate) {
        await update(false);
    }

    // 初始化 `enableESLint`，默认为 true，无需让用户选择
    if (typeof options.enableESLint === 'boolean') {
        config.enableESLint = options.enableESLint;
    } else {
        config.enableESLint = true;
    }

    // 初始化 `eslintType`
    if (options.eslintType && PROJECT_TYPES.find((choice) => choice.value === options.eslintType)) {
        config.eslintType = options.eslintType;
    } else {
        config.eslintType = await chooseEslintType();
    }

    // 初始化 `enableStylelint`
    if (typeof options.enableStylelint === 'boolean') {
        config.enableStylelint = options.enableStylelint;
    } else {
        config.enableStylelint = await chooseEnableStylelint(!/node/.test(config.eslintType));
    }

    // 初始化 `enableMarkdownlint`
    if (typeof options.enableMarkdownlint === 'boolean') {
        config.enableMarkdownlint = options.enableMarkdownlint;
    } else {
        config.enableMarkdownlint = await chooseEnableMarkdownLint();
    }

    // 初始化 `enablePrettier`
    if (typeof options.enablePrettier === 'boolean') {
        config.enablePrettier = options.enablePrettier;
    } else {
        config.enablePrettier = await chooseEnablePrettier();
    }

    if (!isTest) {
        log.info(`检查并处理项目中可能存在的依赖和配置冲突`);
        await conflictResolve(cwd, options.rewriteConfig);
        log.success(`已完成项目依赖和配置冲突检查处理 :)`);

        if(!disableNpmInstall){
            log.info(`安装依赖`);
            const npm = await npmType;
            spawn.sync(
                npm,
                ['i', '-D', PKG_NAME],
                { stdio: 'inherit', cwd },
            );
            log.success(`安装依赖成功 :)`);
        }
    }

    // 更新 pkg.json
    pkg = fs.readJSONSync(pkgPath);
    // 在 `package.json` 中写入 `scripts`
    if (!pkg.scripts) {
        pkg.scripts = {};
    }
    if (!pkg.scripts[`${PKG_NAME}-scan`]) {
        pkg.scripts[`${PKG_NAME}-scan`] = `${PKG_NAME} scan`;
    }
    if (!pkg.scripts[`${PKG_NAME}-fix`]) {
        pkg.scripts[`${PKG_NAME}-fix`] = `${PKG_NAME} fix`;
    }

    // 配置 commit 卡点
    log.info(`配置 git commit 卡点`);
    if (!pkg.husky) pkg.husky = {};
    if (!pkg.husky.hooks) pkg.husky.hooks = {};
    pkg.husky.hooks['pre-commit'] = `${PKG_NAME} commit-file-scan`;
    pkg.husky.hooks['commit-msg'] = `${PKG_NAME} commit-msg-scan`;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    log.success(`配置 git commit 卡点成功 :)`);

    log.info(`写入配置文件`);
    generateTemplate(cwd, config);
    log.success(`写入配置文件成功 :)`);

    // 完成信息
    const logs = [`${PKG_NAME} 初始化完成 :)`].join('\r\n');
    log.success(logs);
}

export default initAction