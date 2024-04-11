import {defineConfig4CustomTheme, UserPlugins} from "vuepress/config";

export default defineConfig4CustomTheme({
    base: '/threea-doc/',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'ThreeA',
            description: '前端编码规范工程化',
        }
    },
    themeConfig: {
        nav: [
            {text: '首页', link: '/index.md'},
            {
                text: '编码规范',
                items: [
                    {text: 'HTML 编码规范', link: '/coding/html.md'},
                    {text: 'CSS 编码规范', link: '/coding/css.md'},
                    {text: 'JavaScript 编码规范', link: '/coding/javascript.md'},
                    {text: 'Node 编码规范', link: '/coding/node.md'},
                    {text: 'Typescript 编码规范', link: '/coding/typescript.md'},
                ],
            },
            {
                text: '工程规范',
                items: [
                    {text: 'Git 规范', link: '/engineering/git.md'},
                    {text: '文档规范', link: '/engineering/doc.md'},
                    {text: 'CHANGELOG 规范', link: '/engineering/changelog.md'},
                ],
            },
        ],
        sidebar: [
            {
                title: '编码规范',
                children: [
                    {
                        title: 'HTML 编码规范',
                        path: '/coding/html.md',
                    },
                    {
                        title: 'CSS 编码规范',
                        path: '/coding/css.md',
                    },
                    {
                        title: 'JavaScript 编码规范',
                        path: '/coding/javascript.md',
                    },
                    {
                        title: 'Node 编码规范',
                        path: '/coding/node.md',
                    },
                    {
                        title: 'Typescript 编码规范',
                        path: '/coding/typescript.md',
                    },
                ],
            },
            {
                title: '工程规范',
                children: [
                    {
                        title: 'Git 规范',
                        path: '/engineering/git.md',
                    },
                    {
                        title: '文档规范',
                        path: '/engineering/doc.md',
                    },
                    {
                        title: 'CHANGELOG 规范',
                        path: '/engineering/changelog.md',
                    },
                ],
            },
        ],
        searchMaxSuggestions: 10,
        docsDir: 'docs',
    },
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}],
        [
            'meta',
            {
                name: 'keywords',
                content: '前端编码规范工程化',
            },
        ],
    ],

    plugins: <UserPlugins>[
        [
            'vuepress-plugin-zooming',
            {
                selector: '.theme-vdoing-content img:not(.no-zoom)',
                options: {
                    bgColor: 'rgba(0,0,0,0.6)',
                },
            },
        ],
        [
            'one-click-copy',
            {
                copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
                copyMessage: '复制成功',
                duration: 1000,
                showInMobile: false,
            },
        ]
    ],
    extraWatchFiles: ['.vuepress/config.ts'],
})