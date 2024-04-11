import {ScanOptions} from "../../types";
import fg from "fast-glob";
import {PRETTIER_FILE_EXT, PRETTIER_IGNORE_PATTERN,} from "../../utils/constants";
import {extname} from "path";
import {join} from "lodash";
import {readFile, writeFile} from "fs-extra";
import prettier from "prettier";

export interface DoPrettierOptions extends ScanOptions {
}

const formatFile = async (filepath: string) => {
    const text = await readFile(filepath, "utf8");
    const options = await prettier.resolveConfig(filepath);
    const formatted = prettier.format(text, {...options, filepath});
    await writeFile(filepath, formatted, "utf8");
};

export const doPrettier = async (options: DoPrettierOptions) => {
    let files: string[] = [];
    if (options.files) {
        files = options.files.filter((name) =>
            PRETTIER_FILE_EXT.includes(extname(name))
        );
    } else {
        const pattern = join(
            options.include,
            `**/*.{${PRETTIER_FILE_EXT.map((t) => t.replace(/^\./, "")).join(",")}}`
        );
        files = await fg(pattern, {
            cwd: options.cwd,
            ignore: PRETTIER_IGNORE_PATTERN,
        });
    }
    await Promise.all(files.map(formatFile));
};