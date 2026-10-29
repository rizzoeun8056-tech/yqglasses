# Blog publishing

For every new blog article, read the complete supplied content and prepare English TDK before publishing.

- Write an engaging SEO title containing the main topic keyword, at most 58 characters including spaces and any brand suffix. Do not append a suffix that exceeds this limit.
- Write a coherent meta description summarizing the whole article and containing the main topic keyword, at most 156 characters including spaces.
- Use at most two commas in the title and at most two in the description. Prefer natural sentences over keyword lists.
- Set relevant keywords separately in `seo.keywords`; save `seo.primaryKeyword` and run the build-time TDK validation.
- Use the user's designated featured image. Preserve the original and export WebP at no more than 600px per side and strictly below 30,000 bytes for every blog image (including the banner and sidebar carousel). Use accurate English alt text and the same image for article social previews.
- Preserve meaningful article content, comparison tables, lists and FAQ hierarchy. Assign one of the two existing blog categories. Keep the Blog index free of article thumbnails and limited to nine posts per category per page.
- Preserve the site's noindex/robots restrictions until the user explicitly requests indexing. Verify the local result before publishing through the existing GitHub → Hostinger workflow.
- Publication must not include unrelated files, credentials or generated document output. Preserve existing user changes.

- The left sidebar carousel uses square source exports and a 1:1 image viewport. Set both CSS width and height explicitly so HTML aspect-ratio attributes cannot stretch it.

- For supplied-document articles, preserve embedded images in their original content positions. Use only source-document images and any featured image explicitly designated by the user; do not add stock/generated photos or company-photo carousels without a separate request.
