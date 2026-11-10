# Blog publishing

For every new blog article, read the complete supplied content and prepare English TDK before publishing.

- Write an engaging SEO title containing the main topic keyword, at most 58 characters including spaces and any brand suffix. Do not append a suffix that exceeds this limit.
- Write a coherent meta description summarizing the whole article and containing the main topic keyword, at most 156 characters including spaces.
- Use at most two commas in the title and at most two in the description. Prefer natural sentences over keyword lists.
- Set relevant keywords separately in `seo.keywords`; save `seo.primaryKeyword` and run the build-time TDK validation.
- Use the user's designated featured image. Preserve the original and export WebP at no more than 600px per side and strictly below 30,000 bytes for every blog image (including the banner and sidebar carousel). Use accurate English alt text and the same image for article social previews.
- Preserve meaningful article content, comparison tables, lists and FAQ hierarchy. Assign one of the two existing blog categories. Show each article's featured image above its title in the Blog index and keep each category limited to nine posts per page. Pagination shows previous/next arrow buttons, at most three page numbers and ellipses for omitted pages; do not display a total-page count.
- All existing and future blog articles and the Blog index must allow indexing and link following with `index, follow`. Do not add per-article `noindex` overrides. Keep blog URLs crawlable in `robots.txt` and include published articles in the Sitemap. Run the build-time blog indexing validation. Preserve restrictions on non-blog private or asset-preview pages. Verify the local result before publishing through the existing GitHub → Hostinger workflow.
- Publication must not include unrelated files, credentials or generated document output. Preserve existing user changes.

- The left sidebar carousel uses square source exports and a 1:1 image viewport. Set both CSS width and height explicitly so HTML aspect-ratio attributes cannot stretch it.

- For supplied-document articles, preserve embedded images in their original content positions. Use only source-document images and any featured image explicitly designated by the user; do not add stock/generated photos or company-photo carousels without a separate request.

- The user has explicitly requested the shared four-photo company carousel and inquiry CTA below the table of contents on every blog article. Keep this shared sidebar sticky within the article body on desktop, highlight the current section and matching TOC entry, and keep long TOCs independently scrollable. Do not overlap the article hero, site header or footer. Use normal flow on narrow screens.
