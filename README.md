# YQ GLASSES

使用 Astro 构建的英语批发询盘网站，品牌为 YQ GLASSES。网站已发布在 <https://yqglasses.com/>。首页按品牌提供的参考页面重新设计，展示香槟杯、蛋糕刀铲套装、其他酒杯、定制工艺、质量与包装，并使用参考页面中的产品图片。具体产品规格和可提供的定制选项仍需由品牌方逐项确认。

## 产品知识库

产品介绍与内容参考资料见 [知识库索引](knowledge-base/README.md)。当前包含 [Cake Knife & Server Sets（蛋糕刀铲套装）](knowledge-base/products/cake-knife-server-sets.md)及[定制蛋糕刀铲套装](knowledge-base/customization/custom-cake-knife-server-sets.md)，覆盖产品常识、使用保养、定制设计维度、询盘字段、FAQ 和英文文案参考。后续撰写相关页面时先查阅；知识库通用信息不替代 YQ 具体型号的规格和定制能力确认。

使用场景的扩展资料见 [蛋糕刀铲使用与分餐指南](knowledge-base/guides/cake-cutting-serving.md)，包含按形状切分、份量参考及原文操作纠错。

YQ 当前通用供货与定制能力见 [品牌方确认记录](knowledge-base/company/yq-cake-knife-server-capabilities.md)；后续页面设计可使用 [现货／定制首屏切换的六区块英文文案](knowledge-base/content/cake-knife-server-page-copy-en.md)。

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

蛋糕刀铲页面：`/cake-knife-server-sets/`。共六个区块，首屏支持现货／定制切换；首页蛋糕刀铲入口已链接至该页。询盘按钮会携带产品类别、订单类型和款式，自动填写到表单，并包含在询盘邮件中。页面文案保持英文，开发期间保留 `noindex`。

香槟杯页面：`/personalized-champagne-glasses/`。首屏支持现货／定制切换；Flute、Tulip、Coupe、Stemless 四种杯型以轮廓示意，不代表所有款式均有现货。询盘会携带产品类别和订单类型，访客可在表单中填写所选杯型；页面继续保留 `noindex`。

## 后续需要完善的内容

1. 业务邮箱已设置为 `zcolin867@gmail.com`。`/file-upload/` 表单通过 Gmail SMTP 发送询盘和附件。Hostinger 服务器需要在 `public_html` 上一级放置 `.yq-mail-config.php`，文件格式参考根目录的 `.yq-mail-config.example.php`。其中必须使用 Google 应用专用密码，不能使用 Gmail 登录密码；真实配置文件不得提交到 GitHub。如使用 WhatsApp，可在 `src/data/site.ts` 中填写完整的 `https://wa.me/...` 链接。
2. 核对 `public/images/reference/` 中的图片是否对应实际可供货产品，确认规格、材质、起订量和包装方案。如需替换图片，同步修改图片说明。
3. 有确定的产品型号、参数和价格后，可添加产品页。当前是询盘网站，没有收款或购物车功能。

## 搜索引擎收录

网站目前处于开发阶段：页面保留 `noindex`，并在 `robots.txt` 中使用 `Disallow: /` 阻止搜索引擎抓取全站。普通访客仍可通过网址直接访问。正式开放收录时，需要同时移除页面的 `noindex`、把 `robots.txt` 改为 `Allow: /` 并恢复 Sitemap，然后重新部署并检查 Google Search Console。

## GitHub 与 Hostinger 静态部署

GitHub 仓库为 <https://github.com/zcolin867-lgtm/yqglasses>。`main` 保存 Astro 源码；推送到 `main` 会自动运行 **Build Hostinger static branch**，执行检查与构建，并将 `dist/` 的内容发布到 `hostinger-site` 分支。Hostinger 已连接该分支并开启自动部署，部署目录是 `public_html`。后续修改网站时，将源码提交到 `main`，再到 GitHub Actions 和 Hostinger Git 面板查看部署结果。

域名仍由阿里云管理 DNS，根域名 `yqglasses.com` 已指向 Hostinger。站点以不带 `www` 的 HTTPS 地址为主网址。

参考：[Astro 官方 Hostinger 部署文档](https://docs.astro.build/en/guides/deploy/hostinger/)、[Hostinger Git 部署说明](https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/)、[Hostinger 域名指向说明](https://www.hostinger.com/support/1863967-how-to-point-a-domain-to-hostinger/)。
