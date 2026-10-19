# YQ GLASSES

使用 Astro 构建的英语批发询盘网站，品牌为 YQ GLASSES。网站已发布在 <https://yqglasses.com/>。首页按品牌提供的参考页面重新设计，展示香槟杯、蛋糕刀叉套装、其他酒杯、定制工艺、质量与包装，并使用参考页面中的产品图片。具体产品规格和可提供的定制选项仍需由品牌方逐项确认。

## 本地运行

要求 Node.js 22.22.0 或更新版本。

```bash
npm ci
npm run dev
```

检查与构建：

```bash
npm run check
npm run build
```

构建后的静态文件位于 `dist/`。

## 后续需要完善的内容

1. 业务邮箱已在 `src/data/site.ts` 设置为 `zcolin867@gmail.com`。请确认该邮箱可正常接收询盘；如使用 WhatsApp，再填写完整的 `https://wa.me/...` 链接。当前表单会在访客的邮件应用中生成询盘邮件。若需要访客直接在网页提交、无需邮件应用，后续需连接表单服务或后端接口。
2. 核对 `public/images/reference/` 中的图片是否对应实际可供货产品，确认规格、材质、起订量和包装方案。如需替换图片，同步修改图片说明。
3. 有确定的产品型号、参数和价格后，可添加产品页。当前是询盘网站，没有收款或购物车功能。

## 搜索引擎收录

首页目前设置了 `<meta name="robots" content="noindex">`，要求支持该规则的搜索引擎不收录。`robots.txt` 仍允许抓取，以便爬虫读取 `noindex`。如需日后开放收录，移除该标签并重新部署，再检查 Google Search Console 的索引状态。

## GitHub 与 Hostinger 静态部署

GitHub 仓库为 <https://github.com/zcolin867-lgtm/yqglasses>。`main` 保存 Astro 源码；推送到 `main` 会自动运行 **Build Hostinger static branch**，执行检查与构建，并将 `dist/` 的内容发布到 `hostinger-site` 分支。Hostinger 已连接该分支并开启自动部署，部署目录是 `public_html`。后续修改网站时，将源码提交到 `main`，再到 GitHub Actions 和 Hostinger Git 面板查看部署结果。

域名仍由阿里云管理 DNS，根域名 `yqglasses.com` 已指向 Hostinger，根域名 HTTPS 可用。`www.yqglasses.com` 的证书覆盖尚未完成，目前请使用不带 `www` 的网址。

参考：[Astro 官方 Hostinger 部署文档](https://docs.astro.build/en/guides/deploy/hostinger/)、[Hostinger Git 部署说明](https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/)、[Hostinger 域名指向说明](https://www.hostinger.com/support/1863967-how-to-point-a-domain-to-hostinger/)。
