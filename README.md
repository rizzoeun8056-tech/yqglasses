# YQ GLASSES

使用 Astro 构建的英语酒杯询盘网站，品牌为 YQ GLASSES。当前是内容与图片示意版，商品规格、真实产品照片及联系信息需在正式发布前确认。

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

## 上线前需要替换的内容

1. 业务邮箱已在 `src/data/site.ts` 设置为 `zcolin867@gmail.com`。上线前请确认该邮箱可正常接收询盘；如使用 WhatsApp，再填写完整的 `https://wa.me/...` 链接。当前表单会在访客的邮件应用中生成询盘邮件。若需要访客直接在网页提交、无需邮件应用，后续需连接表单服务或后端接口。
2. 将 `public/images/` 中的示意图片换成获得使用许可的真实产品照片；同步修改图片说明。
3. 在 `src/data/site.ts` 更新系列名称和说明；有确定的产品型号、参数和价格后，再添加对应产品页。
4. 审核英语网站文案、Logo 和品牌名称。当前是询盘网站，没有收款或购物车功能。

## Google 搜索收录

页面使用英语语言标记、标题、描述、canonical 地址、结构化数据、`robots.txt` 和 `sitemap.xml`。域名上线后，在 Google Search Console 验证 `yqglasses.com`，提交 `https://yqglasses.com/sitemap.xml`，再检查页面索引状态。提交站点地图不保证立即收录或排名。

## GitHub 与 Hostinger 静态部署

推荐保留 `main` 分支中的 Astro 源码，由 GitHub Actions 构建静态文件，发布到单独的 `hostinger-site` 分支，再由 Hostinger 的 Git 集成功能部署该分支。

1. 在 GitHub 创建仓库，将本项目推送到 `main`。首次推送后，在仓库 **Actions** 中手动运行 **Build Hostinger static branch**。该工作流会检查并构建项目，然后创建 `hostinger-site` 分支。若 GitHub 拒绝推送，检查仓库的 **Settings → Actions → General → Workflow permissions** 是否允许读写。
2. 在 Hostinger hPanel 添加域名 `yqglasses.com` 对应的自定义 HTML 网站。打开该网站的 **Dashboard → Advanced → Git**，用 GitHub OAuth 连接仓库，选择 `hostinger-site` 分支，部署目录选 `public_html`。确认该目录没有需要保留的已有网站文件，再部署。
3. Hostinger 的 Git 自动部署开启后，每次更新 `hostinger-site` 分支会触发部署。以后修改源码并推送 `main`，再手动运行 GitHub 工作流即可。确认流程稳定后，可将工作流改为 `main` 分支推送时自动触发。
4. 目前域名使用 `dns3.hichina.com` 和 `dns4.hichina.com` 作为 DNS 服务器。请在阿里云 DNS 中，根据 Hostinger 给出的**实际主机 IP**为 `@` 和 `www` 添加 A 记录。不要猜测 IP，也不要修改现有邮件 MX、SPF、DKIM 等记录。等待解析生效后，在 Hostinger 确认 SSL 证书并测试 `https://yqglasses.com` 和 `https://www.yqglasses.com`。

如果暂时不使用 Git 集成，也可以在本地运行 `npm run build`，将 **`dist/` 的内容**上传至 Hostinger 的 `public_html`，不要上传整个 Astro 源码目录。

参考：[Astro 官方 Hostinger 部署文档](https://docs.astro.build/en/guides/deploy/hostinger/)、[Hostinger Git 部署说明](https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/)、[Hostinger 域名指向说明](https://www.hostinger.com/support/1863967-how-to-point-a-domain-to-hostinger/)。
