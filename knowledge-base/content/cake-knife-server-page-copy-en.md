---
id: KB-COPY-001
title: Cake Knife & Server Sets — 六区块英文页面文案
category: website-copy
updated: 2026-10-24
status: 文案草稿，供后续 UI 设计与确认使用
fact_source: ../company/yq-cake-knife-server-capabilities.md
---

# YQ GLASSES 蛋糕刀铲页面文案

页面为英文批发询盘页，共六个区块。首屏在现货和定制两种信息间切换，后五区块共用。依据：[品牌方确认信息](../company/yq-cake-knife-server-capabilities.md)。此文档是供设计使用的文案稿，不表示对应网页或按钮交互已经实现。

## 1. Hero — Ready to Ship / Custom Orders

### 切换按钮

`Ready to Ship` · `Custom Orders`

### 现货模式

Eyebrow: `YQ GLASSES · READY TO SHIP`

H1: **Ready-to-Ship Cake Knife & Server Sets**

Body:

> Find stainless steel and zinc alloy designs for weddings, gifts and wholesale collections. Explore available styles with acrylic, hollow acrylic or metal handles, then let our team confirm stock and packing options for your order.

Timing badges:

- `In-stock dispatch: 1–3 days`
- `Bulk stock dispatch: 3–7 days`

Primary CTA: **Check Stock Availability**

Secondary CTA: **View Available Designs**

Short note:

> Dispatch timing is confirmed for your selected style, quantity and packaging.

### 定制模式

Eyebrow: `YQ GLASSES · CUSTOM ORDERS`

H1: **Custom Cake Knife & Server Sets**

Body:

> Create a coordinated set with your choice of handle, metal finish and engraved details. Complete it with a gift box or standard box, with packaging shapes, designs and text tailored to your project.

Timing badges:

- `Custom samples: 3–7 days*`
- `Bulk production: 5–25 days`

Primary CTA: **Request a Custom Quote**

Secondary CTA: **Explore Custom Options**

Short note:

> *For custom samples requiring mold development. Final timing is confirmed for your design, quantity and packaging.

### UI 设计说明

- 使用同一区域的两个按钮切换，默认显示 Ready to Ship；不需要拆成两页。
- 同步切换眉题、主标题、正文、时间提示、两个 CTA 的文字和对应主图。
- 保持两种模式的图文区域和按钮位置一致，避免切换时页面明显跳动。
- 现货主图强调清晰的完整套装；定制主图强调手柄、表面、刻字或包装细节，使用真实对应素材。
- 页面其余五个区块保持共用，不增加到七个区块。
- 两个主 CTA 沿用现有 `/file-upload/` 询盘入口；在 UI 实现时记录所选现货／定制需求。现有表单是否支持该字段需实现时检查，不能仅添加参数就宣称已经预选。
- 现货次按钮定位到款式／材质展示；定制次按钮定位到定制工艺区。
- 当前是询盘网站，按钮不使用 Buy Now、Add to Cart 或直接付款文案。

## 2. Material & Handle Options

Intro:

> Start with stainless steel or zinc alloy designs, then choose the handle style that fits your collection. Acrylic, hollow acrylic and metal options offer different looks for a coordinated knife and server set.

Material labels:

- **Stainless Steel Designs** — Cake knife and server styles for coordinated wedding, gift and wholesale collections.
- **Zinc Alloy Designs** — Another material direction for your selected design and finish.

Handle cards:

- **Acrylic Handles** — An acrylic handle option to suit your preferred design.
- **Hollow Acrylic Handles** — A hollow acrylic construction for a different handle style.
- **Metal Handles** — Coordinate the handle with your chosen metal finish.

UI: 两种主要材质作为标签或分组，三种手柄作为图片卡片。具体展示款式与各部件材料对应确认后匹配，不把通用选项套用于每个 SKU。

## 3. Metal Finishes & Personalization

Intro:

> Define the finish, wording and engraved details that make the set yours. Our team will review the design and placement with you before the order moves forward.

Cards:

- **Metal Surface Finishes** — Choose from a range of metal finishing options to coordinate the look of your knife, server and handle.
- **Personalized Engraving** — Add names, dates or a personal message for weddings, gifts and commemorative collections.
- **Laser Engraving** — Share your text or artwork and preferred placement for a laser-engraved design.

CTA: **Discuss Your Design**

UI: 使用实际表面与刻字特写。工艺名称及效果按可提供的样品展示，不凭金色外观自动标注 PVD 或真金电镀。

## 4. Packaging Designed Around Your Set

Intro:

> Choose a gift box for presentation or a standard box for your shipment. Customize the packaging shape, design and text to bring the set and its presentation together.

Cards:

- **Gift Boxes** — Complete the set with packaging suited to weddings, gifting and retail presentation.
- **Standard Boxes** — A straightforward packaging option for your selected set and order.
- **Custom Shapes, Designs & Text** — Share your box concept, artwork and wording so the packaging can be developed around your project.

CTA: **Plan Your Packaging**

UI: 礼盒、普通盒和包装设计稿分开展示；不默认木盒、磁吸结构或特定内托。

## 5. A Dedicated Team at Every Stage

Intro:

> Your order is supported by dedicated assembly, inspection, packaging and customer service teams. We keep you informed as it moves through each stage, from preparation to dispatch.

Cards:

- **Professional Assembly** — Our assembly team brings the components and decorative details of your selected set together.
- **Product Inspection** — Our inspection team reviews the products before they move to packing.
- **Order Packaging** — Our packaging team prepares your sets in the agreed boxes for dispatch.
- **Customer Support** — Stay informed about order progress, key confirmations and the next steps.

Progress labels:

`Order Details → Assembly → Inspection → Packing & Dispatch`

UI: 使用真实工作场景或流程图，明确四类人员职责。不添加未经确认的认证徽章、自动追踪系统或 24/7 承诺。

## 6. Lead Times & Project Inquiries

Intro:

> Planning a stock purchase or a custom collection? Use the timings below as a starting point, then share your quantity, design and packaging requirements for order confirmation.

| Order stage | Timing |
|---|---|
| In-stock order dispatch | 1–3 days |
| Bulk in-stock order dispatch | 3–7 days |
| Custom samples requiring mold development | 3–7 days |
| Custom bulk production | 5–25 days |

Timing note:

> Final timing is confirmed for your design, quantity and packaging. Shipping transit time is additional.

Compact FAQs:

**Can I order an existing design or create a custom set?**  
Yes. Choose an available design or discuss your preferred handle, metal finish, engraving and packaging.

**Can the packaging be customized?**  
Yes. We offer gift boxes and standard boxes, with custom packaging shapes, designs and text.

**Will I receive updates on my order?**  
Yes. Our team keeps you updated through assembly, inspection, packing and dispatch.

Closing line:

> Tell us the design, quantity, finish and packaging you have in mind. Our team will help you plan the next step.

Primary CTA: **Send Your Requirements**

UI: 时间表与三条简短 FAQ 合并在同一收尾区块；最后按钮跳转 `/file-upload/`。询盘页已有文件上传入口，可沿用，不增加购物车或支付流程。

## 写作与实施备注

- 所有时间保留“days”，未擅自写成 business days。
- 现货时间是发货准备时间；批量生产时间不是快递抵达时间。
- 样品说明按品牌方“3–7 天（需要开模）”的描述保留为需开模样品类别，不推导所有个性化项目都要开模，也不自行保证开模全部环节已计入。
- 不虚构 MOQ、钢号、食品接触检测、机洗、防锈、涂层寿命等属性。
- 品牌已有具体手工点钻产品记录，可作为第四／第五区块的实际工艺素材补充，但不能把每个款式都写成全手工制造。
- 六个区块编号为前台内容结构；本文件的 UI 说明与实施备注不作为公开页面正文。
