import {defaultTheme} from '@vuepress/theme-default'
import {defineUserConfig} from 'vuepress'
import viteBundler from "@vuepress/bundler-vite";
import {searchPlugin} from "@vuepress/plugin-search";

export default defineUserConfig({
    base: '/threea-doc/',
    bundler: viteBundler(),
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'ThreeA',
            description: '前端编码规范工程化',
        }
    },
    theme: defaultTheme({
        navbar: [
            {text: '首页', link: '/index.md'},
            {
                text: '编码规范',
                children: [
                    {text: 'HTML 编码规范', link: '/coding/html.md'},
                    {text: 'CSS 编码规范', link: '/coding/css.md'},
                    {text: 'JavaScript 编码规范', link: '/coding/javascript.md'},
                    {text: 'Node 编码规范', link: '/coding/node.md'},
                    {text: 'Typescript 编码规范', link: '/coding/typescript.md'},
                ],
            },
            {
                text: '工程规范',
                children: [
                    {text: 'Git 规范', link: '/engineering/git.md'},
                    {text: '文档规范', link: '/engineering/doc.md'},
                    {text: 'CHANGELOG 规范', link: '/engineering/changelog.md'},
                ],
            },
            {
                text: 'NPM包',
                children: [
                    {text: 'threea-eslint-config', link: '/npm/eslint.md'},
                    {text: 'threea-stylelint-config', link: '/npm/stylelint.md'},
                    {text: 'threea-commitlint-config', link: '/npm/commitlint.md'},
                    {text: 'threea-markdownlint-config', link: '/npm/markdownlint.md'},
                ],
            },
            {
                text: '脚手架',
                children: [{text: 'threea-lint', link: '/cli/threea-lint.md'}],
            },
        ],
        sidebar: 'auto',
        searchMaxSuggestions: 10,
        docsDir: 'docs',
    }),
    plugins: [
        'vuepress-plugin-smooth-scroll',
        searchPlugin({
            maxSuggestions: 10
        })
    ],
    extraWatchFiles: ['.vuepress/config.ts'],
})