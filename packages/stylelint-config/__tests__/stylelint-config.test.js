const assert = require('assert');
const stylelint = require('stylelint');
const path = require('path')

describe('test rules.test.js', () => {
    it('Validate default', async () => {
        const filePath = [path.join(__dirname, './fixtures/index.scss')]
        const result = await stylelint.lint({
            configFile: path.join(__dirname, '../index.js'),
            files: filePath,
            fix: true
        })
        if (result?.errored) {
            const filesResult = JSON.parse(result.output || '[]') || [];
            filesResult.forEach(fileResult => {
                console.log(`======${filePath}======`)
                console.log(fileResult.warnings)
            })
            assert.ok(filesResult.length !== 0)
        }
    })
});