import cakeSlicingArticle from './blog/best-knife-for-slicing-cake.json';
import buyerGuide from './blog/cake-knife-and-server-set-guide-for-buyer.json';

export const blogCategories = [
  { id: 'champagne-glassware', label: 'Champagne Glassware' },
  { id: 'cake-knife-set', label: 'Cake Knife Set' },
] as const;

type BlogCategory = typeof blogCategories[number]['id'];

interface BlogPost {
  slug: string;
  category: BlogCategory;
  title: string;
  description: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  alt: string;
  heroImage?: string;
  heroAlt?: string;
  seo?: { title: string; description: string; keywords: string; primaryKeyword: string };
  intro?: string[];
  introImage?: { src: string; alt: string; width: number; height: number };
  sections: { title: string; text: string; blocks?: { type: string; text?: string; items?: string[]; headers?: string[]; rows?: string[][]; label?: string; src?: string; alt?: string; width?: number; height?: number }[] }[];
  productUrl: string;
  productLabel: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'cake-knife-and-server-set-guide-for-buyer',
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
  {
    slug: 'custom-cake-knife-set-details',
    category: 'cake-knife-set',
    title: 'Custom Cake Knife Sets: Handles, Finishes and Packaging',
    description: 'Choose the details that bring your cake serving collection together.',
    image: '/images/blog/cake-rose-pair.webp',
    imageWidth: 507,
    imageHeight: 507,
    alt: 'Gold-colored cake knife and server with rose-shaped metal handles on a wooden surface',
    sections: [
      { title: 'Choose the material and handle', text: 'YQ GLASSES offers stainless steel and zinc alloy cake serving designs, with acrylic, hollow acrylic and metal handle options. Confirm the material of each component and the available combinations for your chosen style.' },
      { title: 'Define the finish and engraving', text: 'Share the metal finish, wording and engraved details you have in mind. We support engraving and laser engraving, with the method, placement and result reviewed for the selected design.' },
      { title: 'Complete the box design', text: 'Gift boxes and standard boxes are available. Packaging shape, design and text can be customized for your project. Confirm the final box format and product arrangement alongside your sample.' },
      { title: 'Confirm your schedule', text: 'In-stock dispatch is typically 1–3 days, or 3–7 days for bulk stock orders. Custom samples requiring mold development are planned at 3–7 days, with custom bulk production at 5–25 days. Final timing is confirmed for your design, quantity and packaging; shipping transit time is additional.' },
    ],
    productUrl: '/cake-knife-server-sets/',
    productLabel: 'Explore custom cake serving sets',
  },
];
