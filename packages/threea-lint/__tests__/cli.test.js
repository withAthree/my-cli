const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const packageJson = require('../package.json');

const cli = (args, options) => {
    return execa('node', [path.resolve(__dirname, '../lib/cli.js'), ...args], options);
};

test('--version should output right version', async () => {
    const {stdout} = await cli(['--version']);
    expect(stdout).toBe(packageJson.version);
});

describe(`'exec' command`, () => {
    const semverRegex = /(\d+)\.(\d+)\.(\d+)/;

    test(`'exec eslint' should work as expected`, async () => {
        const {stdout} = await cli(['exec', 'eslint', '--version']);
        expect(stdout).toMatch(semverRegex);
    });

    test(`'exec stylelint' should work as expected`, async () => {
        const {stdout} = await cli(['exec', 'stylelint', '--version']);
        expect(stdout).toMatch(semverRegex);
    });

    test(`'exec commitlint' should work as expected`, async () => {
        const {stdout} = await cli(['exec', 'commitlint', '--version']);
        expect(stdout).toMatch(semverRegex);
    });
});
