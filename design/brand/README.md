# YQ GLASSES 网站 Logo 文件

第二版组合为「YQ 图形 + GLASSES」，右侧不再重复 YQ。Y 融入香槟杯，Q 尾部呼应蛋糕铲。铜橙色 #b94f20，深灰色 #292824，米白色 #f5f1eb。

## 文件用途与尺寸

| 文件 | 像素尺寸 | 用途 |
|---|---|---|
| images/brand/logo-horizontal-v2.png | 480 × 160 | 透明底横版，网页和邮件签名 |
| images/brand/logo-horizontal-v2@2x.png | 960 × 320 | 透明底横版高清图 |
| images/brand/logo-horizontal-v2.webp | 480 × 160 | WebP 横版备选 |
| images/brand/logo-dark-v2.png、logo-dark-v2.webp | 480 × 160 | 深灰底白色标识，非透明 |
| images/brand/logo-dark-v2@2x.webp | 960 × 320 | 深色版高清图，非透明 |
| images/brand/logo-mark-512.png | 512 × 512 | 透明底方形标识 |
| images/brand/logo-mark-1024.png | 1024 × 1024 | 透明底高清方形标识 |
| favicon.ico | 内含 16/32/48/64 | 浏览器兼容图标 |
| favicon-16x16.png、favicon-32x32.png、favicon-48x48.png | 16/32/48 方形 | 浏览器图标 PNG |
| favicon.svg | 512 × 512 容器 | 保留旧图标 URL，内部为 PNG，非矢量源稿 |
| apple-touch-icon.png | 180 × 180 | iPhone/iPad 收藏图标，米白底 |
| android-chrome-192x192.png、android-chrome-512x512.png | 192/512 方形 | Android/浏览器应用图标，米白底 |
| images/brand/social-share-v2-1200x630.jpg | 1200 × 630 | 链接分享封面 |
| site.webmanifest | JSON | 手机图标配置 |

图片文件位于项目 public 目录。所有常用 Logo/图标导出均小于 40,000 字节；高清方形标识上限为 150,000 字节（实际亦小于 40,000），分享封面上限为 120,000 字节。asset-inventory.json 记录实际尺寸、字节数、透明度和压缩情况。部分 PNG 使用调色板量化，可能有细微颜色及半透明层次损失；这不属于无损矢量图。

桌面页眉显示 216 × 72 px、手机页眉 180 × 60 px、页脚 240 × 80 px。源图中保留了品牌安全留白，页面不会拉伸比例。

## 网站接入

- src/components/Brand.astro：页眉、页脚共用 Logo。深色背景可传入 dark 参数。
- src/components/BrandAssets.astro：favicon、Apple 图标、manifest、OG/Twitter 分享图片。后续新页面在 head 中引用此组件。
- 当前首页与询盘页均已接入，保留原有 noindex 设置。
- 本地预览 /brand-kit.html 查看全部文件。
- 本地检查后，按现有 GitHub Desktop 流程提交推送，线上部署后才会更新。

## 生成与导出

使用内置 image_gen 生成图像；使用 image40 本地工具调整尺寸、转换格式及压缩。当前版本提示词见 asset-prompts-v2.txt。透明白色版生成不合格，未纳入交付；交付的白色标识使用深灰底。

运行 export-assets.py 时，传入安装的 image40/scripts 目录；PNG 源稿保存在本目录的 source-*-v2.png（图标为 source-icon.png）。无需 API key 即可重新导出各尺寸。

## 彩色浏览器标签图标更新（v3）

浏览器使用 favicon-yq-color-v3.svg、favicon-yq-color-v3.ico 以及 favicon-yq-color-v3-32.png。图标始终为铜橙色 YQ、米白底，不随浏览器深浅主题切换成黑白。使用新版 URL 避免旧 favicon 缓存；默认 /favicon.ico 和 /favicon.svg 也同步为彩色。PNG 提供 16/32/48 px，ICO 内含 16/32/48/64 px。
