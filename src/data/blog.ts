import cakeSlicingArticle from './blog/best-knife-for-slicing-cake.json';
import buyerGuide from './blog/cake-knife-and-server-set-guide-for-buyer.json';
import designGuide from './blog/custom-cake-knife-and-server-set-design-guide.json';
import customWeddingQuotes from './blog/compare-custom-wedding-cake-knife-and-server-set-quotes.json';
import studdedQualityGuide from './blog/studded-cake-knife-and-server-set-quality-checklist.json';
import materialSelectionGuide from './blog/custom-cake-knife-server-material-selection.json';
import champagneSupplierGuide from './blog/custom-champagne-glass-supplier-guide.json';
import trumpetFluteLogoGuide from './blog/custom-trumpet-flute-champagne-glasses-logo-guide.json';
import bulkShippingGuide from './blog/reduce-bulk-cake-knife-server-set-shipping-costs.json';

export const blogCategories = [
  { id: 'champagne-glassware', label: 'Champagne Glassware' },
  { id: 'cake-knife-set', label: 'Cake Knife Set' },
] as const;

type BlogCategory = typeof blogCategories[number]['id'];

interface BlogPost {
  slug: string;
  publishedAt: string;
  category: BlogCategory;
  title: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
  heroImage?: string;
  heroAlt?: string;
  seo?: { title: string; description: string; keywords: string; primaryKeyword: string };
  intro?: string[];
  introLinkText?: string;
  outro?: string[];
  noindex?: boolean;
  showHeroDescription?: boolean;
  showProductCta?: boolean;
  introImage?: { src: string; alt: string; width: number; height: number };
  sections: { title: string; text: string; blocks?: { type: string; text?: string; parts?: { text: string; href?: string; strong?: boolean }[]; items?: string[]; headers?: string[]; rows?: string[][]; label?: string; src?: string; alt?: string; width?: number; height?: number; href?: string }[] }[];
  productUrl: string;
  productLabel: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'reduce-bulk-cake-knife-server-set-shipping-costs',
    publishedAt: '2026-11-09T22:15:00+08:00',
    category: 'cake-knife-set',
    title: bulkShippingGuide.title,
    description: bulkShippingGuide.intro[0],
    image: '/images/blog/cake-knife-server-foam-box.webp',
    imageWidth: 600,
    imageHeight: 600,
    alt: 'Cake knife and server in a foam-lined gift box',
    seo: {
      title: 'Cut Bulk Cake Knife and Server Set Shipping Costs',
      description: 'Cut bulk cake knife and server set shipping costs by optimizing gift box size, foam thickness and carton packing while keeping products protected.',
      keywords: 'Cut Bulk Cake Knife and Server Set Shipping Costs',
      primaryKeyword: 'Cut Bulk Cake Knife and Server Set Shipping Costs',
    },
    intro: bulkShippingGuide.intro,
    introLinkText: 'cake knife and server set',
    sections: bulkShippingGuide.sections,
    outro: bulkShippingGuide.outro,
    noindex: true,
    showHeroDescription: false,
    showProductCta: false,
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore cake knife and server sets',
  },
  {
    slug: 'custom-champagne-glass-supplier-guide',
    publishedAt: '2026-11-02T12:00:00+08:00',
    category: 'champagne-glassware',
    title: champagneSupplierGuide.title,
    description: 'Compare quality, customization, samples, pricing, lead times, packaging and shipping before placing a custom champagne glass order.',
    seo: {
      title: 'Choose the Right Custom Champagne Glass Supplier',
      description: 'Choose your custom champagne glass supplier with confidence. Compare samples and quality, then confirm customization details, full costs and delivery terms.',
      keywords: 'custom champagne glass supplier',
      primaryKeyword: 'custom champagne glass supplier',
    },
    image: '/images/blog/yq-metal-stem-champagne-flute.webp',
    imageWidth: 600,
    imageHeight: 600,
    alt: 'YQ GLASSES champagne flute with a gold-finished studded zinc alloy stem',
    intro: champagneSupplierGuide.intro,
    sections: champagneSupplierGuide.sections,
    productUrl: '/personalized-champagne-glasses/',
    productLabel: 'Explore personalized champagne glasses',
  },
  {
    slug: 'custom-trumpet-flute-champagne-glasses-logo-guide',
    publishedAt: '2026-11-04T12:00:00+08:00',
    category: 'champagne-glassware',
    title: trumpetFluteLogoGuide.title,
    description: 'Plan a standout logo for Custom Trumpet Flute Champagne Glasses.',
    seo: {
      title: 'Custom Trumpet Flute Champagne Glasses Logo Dos & Don’ts',
      description: 'Custom Trumpet Flute Champagne Glasses Logo Dos & Don’ts: Plan artwork, decoration and sample checks for YQ’s handmade metal stems.',
      keywords: 'Custom Trumpet Flute Champagne Glasses Logo Dos & Don’ts',
      primaryKeyword: 'Custom Trumpet Flute Champagne Glasses Logo Dos & Don’ts',
    },
    image: '/images/blog/custom-trumpet-flute-logo-studio.webp',
    imageWidth: 700,
    imageHeight: 875,
    alt: 'Illustrative studio display of YQ GLASSES champagne flutes with decorative metal stems and logo branding',
    intro: trumpetFluteLogoGuide.intro,
    sections: trumpetFluteLogoGuide.sections,
    productUrl: '/trumpet-flute-champagne-glasses/',
    productLabel: 'Explore Trumpet Flute Champagne Glasses',
  },
  {
    slug: 'compare-custom-wedding-cake-knife-and-server-set-quotes',
    publishedAt: '2026-11-07T14:17:31+08:00',
    category: 'cake-knife-set',
    title: customWeddingQuotes.title,
    description: 'A practical guide to comparing custom wedding cake knife and server set quotes.',
    seo: {
      title: 'Compare Custom Wedding Cake Knife and Server Set Quotes',
      description: 'Compare Custom Wedding Cake Knife and Server Set Quotes with a guide to specs, samples, customization and landed costs.',
      keywords: 'Compare Custom Wedding Cake Knife and Server Set Quotes',
      primaryKeyword: 'Compare Custom Wedding Cake Knife and Server Set Quotes',
    },
    image: '/images/blog/custom-cake-knife-server-photo.webp',
    imageWidth: 600,
    imageHeight: 600,
    alt: 'Stainless steel cake knife and server with decorative handles',
    intro: customWeddingQuotes.intro,
    introLinkText: 'wedding cake knife and server set',
    sections: customWeddingQuotes.sections,
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore custom cake knife and server sets',
  },
  {
    slug: 'studded-cake-knife-and-server-set-quality-checklist',
    publishedAt: '2026-11-01T12:08:38+08:00',
    category: 'cake-knife-set',
    title: studdedQualityGuide.title,
    description: 'Inspect materials, decorative accents, performance and packaging before approving a bulk order.',
    seo: {
      title: 'Studded Cake Knife and Server Set Quality Checklist',
      description: 'Use the Studded Cake Knife and Server Set Quality Checklist for bulk approval. Check materials and accent attachment, performance, finish and packaging.',
      keywords: 'Studded Cake Knife and Server Set Quality Checklist',
      primaryKeyword: 'Studded Cake Knife and Server Set Quality Checklist',
    },
    image: '/images/blog/studded-quality-four-piece-photo.webp',
    imageWidth: 500,
    imageHeight: 500,
    alt: 'Silver and gold cake knife and server sets with sparkling studded handles on a woven mat',
    intro: studdedQualityGuide.intro,
    introLinkText: 'studded cake knife and server set',
    sections: studdedQualityGuide.sections,
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore custom cake knife and server sets',
  },
  {
    slug: 'custom-cake-knife-server-material-selection',
    publishedAt: '2026-11-07T16:52:50+08:00',
    category: 'cake-knife-set',
    title: materialSelectionGuide.title,
    description: 'Choose cake knife and server set materials by use, market and budget. See how YQ’s hand-set rhinestones and rhinestone-filled handles shape design options.',
    seo: {
      title: 'Choose Cake Knife and Server Set Materials',
      description: 'Choose cake knife and server set materials by use, market and budget. See how YQ’s hand-set rhinestones and rhinestone-filled handles shape design options.',
      keywords: 'cake knife and server set materials',
      primaryKeyword: 'cake knife and server set materials',
    },
    image: '/images/blog/cake-knife-server-material-selection-hero.webp',
    imageWidth: 600,
    imageHeight: 600,
    alt: 'Cake knife and server with crystal-filled transparent handles on a black background',
    intro: materialSelectionGuide.intro,
    sections: materialSelectionGuide.sections,
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore custom cake knife and server sets',
  },
  {
    slug: 'custom-cake-knife-and-server-set-design-guide',
    publishedAt: '2026-11-01T11:17:46+08:00',
    category: 'cake-knife-set',
    title: designGuide.title,
    description: 'Plan the construction, tooling and branded details of a custom cake knife and server set.',
    seo: {
      title: 'Design Guide of Custom Cake Knife and Server Set',
      description: 'Create a custom collection with our Design Guide of Custom Cake Knife and Server Set. Explore construction, tooling, studded details and packaging.',
      keywords: 'Design guide of Custom Cake Knife and Server Set',
      primaryKeyword: 'Design guide of Custom Cake Knife and Server Set',
    },
    image: '/images/blog/custom-cake-knife-server-photo.webp',
    imageWidth: 600,
    imageHeight: 600,
    alt: 'Stainless steel cake knife and server with studded handles on a black background',
    intro: designGuide.intro,
    sections: designGuide.sections,
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore custom cake knife and server sets',
  },
  {
    slug: 'cake-knife-and-server-set-guide-for-buyer',
    publishedAt: '2026-10-29T10:58:27+08:00',
    category: 'cake-knife-set',
    title: buyerGuide.title,
    description: 'Plan your custom set with a practical guide to design options, quality checks and purchasing.',
    seo: {
      title: 'Cake Knife and Server Set Guide for Smart Buyers',
      description: 'This cake knife and server set guide covers custom designs and packaging plus quality checks and pricing to help buyers plan bulk orders.',
      keywords: 'cake knife and server set guide, custom cake knife and server set, cake serving set buyer guide, wholesale cake knife set',
      primaryKeyword: 'cake knife and server set guide',
    },
    image: buyerGuide.introImage.src,
    imageWidth: buyerGuide.introImage.width,
    imageHeight: buyerGuide.introImage.height,
    alt: buyerGuide.introImage.alt,
    intro: buyerGuide.intro,
    introImage: buyerGuide.introImage,
    sections: buyerGuide.sections,
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore custom cake knife and server sets',
  },
  {
    slug: 'best-knife-for-slicing-cake',
    publishedAt: '2026-10-29T09:38:04+08:00',
    category: 'cake-knife-set',
    title: cakeSlicingArticle.title,
    description: 'Choose a knife for your cake’s texture and explore matching servers and custom set options.',
    seo: {
      title: 'Best Knife for Slicing Cake: A Practical Guide',
      description: 'Find the best knife for slicing cake by texture and learn how cake servers and custom set details improve serving and presentation.',
      keywords: 'best knife for slicing cake, cake knife and server set, serrated cake knife, custom cake knife set',
      primaryKeyword: 'best knife for slicing cake',
    },
    image: '/images/blog/cake-slicing-knife-and-servers-oh42046.webp',
    imageWidth: 372,
    imageHeight: 372,
    alt: 'A cake knife and two cake servers with sparkling decorative handles on a woven mat and wooden table',
    intro: cakeSlicingArticle.intro,
    introImage: { src: '/images/blog/cake-slicing-document-production.webp', alt: 'Cake knives and servers in protective sleeves on a production workbench', width: 393, height: 393 },
    sections: cakeSlicingArticle.sections,
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore custom cake knife and server sets',
  },
  {
    slug: 'choosing-champagne-glassware',
    publishedAt: '2026-10-25T12:00:00+08:00',
    category: 'champagne-glassware',
    title: 'Choosing Champagne Glassware for Your Collection',
    description: 'A simple starting point for shape, stem design and a coordinated table.',
    image: '/images/blog/champagne-studded-pair.webp',
    alt: 'Two champagne glasses with decorative studded bases on a dark floral background',
    sections: [
      { title: 'Start with the silhouette', text: 'Compare the profile you want for your collection: a slender flute, a softly curved tulip, a wide coupe or a stemless design. Use a reference image to explain the look, then confirm the available styles and dimensions.' },
      { title: 'Look beyond the bowl', text: 'The stem and base help define the finished design. Compare their shape, color and decorative details alongside the bowl. Review a sample to assess the proportions and how the glass feels in hand.' },
      { title: 'Plan the complete presentation', text: 'Consider where the glasses will be used and whether they need to coordinate with a cake serving set or gift collection. Share your preferred design, quantity and packaging brief so our team can review the options.' },
    ],
    productUrl: '/personalized-champagne-glasses/',
    productLabel: 'Explore champagne glasses',
  },
  {
    slug: 'personalized-champagne-glass-brief',
    publishedAt: '2026-10-25T12:00:00+08:00',
    category: 'champagne-glassware',
    title: 'How to Brief a Personalized Champagne Glass Project',
    description: 'The details to share before reviewing artwork, decoration and packaging.',
    image: '/images/blog/champagne-heart-stem-pair.webp',
    alt: 'Champagne flutes with decorative heart-shaped stems in silver and rose-gold tones',
    sections: [
      { title: 'Choose a reference design', text: 'Send a product photo, sketch or reference image with the shape and decorative details you like. Include your expected quantity and target timing so the team can check the project requirements.' },
      { title: 'Prepare the wording and artwork', text: 'Provide the exact names, date, message or logo you would like to include. Indicate the preferred placement. The suitable decoration method and achievable detail are reviewed for the selected glass.' },
      { title: 'Include the packaging brief', text: 'Explain whether the glasses are for individual gifts, paired sets or a wider collection. Share any box design references and wording, then review the available packaging and sampling options with our team.' },
    ],
    productUrl: '/personalized-champagne-glasses/',
    productLabel: 'Explore personalized glasses',
  },
  {
    slug: 'how-to-use-cake-knife-and-server-set',
    publishedAt: '2026-10-25T12:00:00+08:00',
    category: 'cake-knife-set',
    title: 'How to Use a Cake Knife and Server Set',
    description: 'A few practical steps for cutting, lifting and serving a slice.',
    image: '/images/blog/cake-studded-pair.webp',
    alt: 'Matching silver-colored cake knife and server with decorative handles on a dark background',
    sections: [
      { title: 'Plan your portions', text: 'Choose slice sizes around the cake’s shape, height and number of guests. For a tiered cake, ask the cake maker about boards, supports and serving order before cutting.' },
      { title: 'Cut, then support', text: 'Use a suitable knife to separate the portion fully. Slide the server underneath to support the slice, then move it close to the plate before setting it down.' },
      { title: 'Keep the blade clean', text: 'Clear frosting and crumbs between cuts. Where a warm blade suits the cake, warm it and wipe it dry before cutting.' },
      { title: 'Care for the complete set', text: 'Follow the care instructions for the selected finish, handle and decoration. Confirm dishwasher suitability for the complete product rather than the metal alone.' },
    ],
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore cake knife and server sets',
  },
];
