---
home: true
heroText: 前端编码规范工程化
tagline: null
actions: 
  - text: 立即进入 →
    link: /coding/html.md
---

## :couch_and_lamp: 配套工具

引入了多个业界流行的 `Linter` 作为规约文档的配套工具，并根据规约内容定制了对应的规则包。

| 规约                              | Lint 工具 | NPM包 |
|---------------------------------| -------- | -------- |
| JavaScript、TypeScript、Node 编码规范 |  [ESLint](https://eslint.org/)   | [threea-eslint-config](https://www.npmjs.com/package/threea-eslint-config) |
| CSS 编码规范                        |  [stylelint](https://stylelint.io/)  | [threea-stylelint-config](https://www.npmjs.com/package/threea-stylelint-config) |
| Git 规范                          |  [commitlint](https://commitlint.js.org/#/)  | [threea-commitlint-config](https://www.npmjs.com/package/threea-commitlint-config) |
| 文档规范                            |  [markdownlint](https://github.com/DavidAnson/markdownlint)  | [threea-markdownlint-config](https://www.npmjs.com/package/threea-markdownlint-config) |

[threea-lint](https://www.npmjs.com/package/threea-lint) 收敛屏蔽了上述依赖和配置细节，提供简单的 `CLI`，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡口，降低项目接入规约的成本。

您可以使用[threea-lint](https://www.npmjs.com/package/threea-lint) 方便地为项目接入全部规范。


