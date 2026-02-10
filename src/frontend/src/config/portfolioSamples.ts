export interface PortfolioSample {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export const categories = ['YouTube', 'Instagram', 'Social Media', 'Branding', 'Marketing'];

export const portfolioSamples: PortfolioSample[] = [
  {
    id: 'sample-01',
    title: 'Tech Review Thumbnail',
    category: 'YouTube',
    imageUrl: '/assets/generated/portfolio-sample-01.dim_1200x675.png',
    description: 'High-energy thumbnail for a tech product review video with bold typography and vibrant colors',
  },
  {
    id: 'sample-02',
    title: 'Gaming Stream Cover',
    category: 'YouTube',
    imageUrl: '/assets/generated/portfolio-sample-02.dim_1200x675.png',
    description: 'Dynamic gaming thumbnail featuring character art and eye-catching effects',
  },
  {
    id: 'sample-03',
    title: 'Instagram Reel Cover',
    category: 'Instagram',
    imageUrl: '/assets/generated/portfolio-sample-03.dim_1200x675.png',
    description: 'Minimalist reel cover with modern typography and gradient accents',
  },
  {
    id: 'sample-04',
    title: 'Social Media Carousel',
    category: 'Social Media',
    imageUrl: '/assets/generated/portfolio-sample-04.dim_1200x675.png',
    description: 'Multi-slide carousel post with consistent branding and engaging visuals',
  },
  {
    id: 'sample-05',
    title: 'Brand Logo Design',
    category: 'Branding',
    imageUrl: '/assets/generated/portfolio-sample-05.dim_1200x675.png',
    description: 'Modern, minimalist logo with versatile color schemes and clean geometry',
  },
  {
    id: 'sample-06',
    title: 'Event Poster',
    category: 'Marketing',
    imageUrl: '/assets/generated/portfolio-sample-06.dim_1200x675.png',
    description: 'Eye-catching event poster with bold typography and vibrant color palette',
  },
  {
    id: 'sample-07',
    title: 'Product Launch Banner',
    category: 'Marketing',
    imageUrl: '/assets/generated/portfolio-sample-07.dim_1200x675.png',
    description: 'Professional banner design for product launch with clear call-to-action',
  },
  {
    id: 'sample-08',
    title: 'Story Template Set',
    category: 'Instagram',
    imageUrl: '/assets/generated/portfolio-sample-08.dim_1200x675.png',
    description: 'Cohesive Instagram story template set with modern aesthetic',
  },
];
