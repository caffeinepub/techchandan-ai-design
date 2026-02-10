export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'youtube-thumbnails',
    name: 'YouTube Thumbnails',
    description: 'Eye-catching thumbnails that boost your click-through rate',
    price: '₹199–299',
    category: 'YouTube',
    features: [
      'Custom design tailored to your brand',
      'High-resolution output (1920x1080)',
      'Unlimited revisions',
      '24-48 hour delivery',
      'Source files included',
    ],
  },
  {
    id: 'instagram-reel-covers',
    name: 'Instagram Reel Covers',
    description: 'Professional covers that make your reels stand out',
    price: '₹149–199',
    category: 'Instagram',
    features: [
      'Optimized for Instagram format',
      'Brand-consistent design',
      'Fast 24-hour turnaround',
      'Multiple concepts available',
      'Ready-to-upload files',
    ],
  },
  {
    id: 'social-media-posts',
    name: 'Social Media Posts',
    description: 'Engaging graphics for all your social platforms',
    price: '₹149',
    category: 'Social Media',
    features: [
      'Multi-platform optimization',
      'Consistent brand identity',
      'Carousel posts available',
      'Story format included',
      'Quick 24-hour delivery',
    ],
  },
  {
    id: 'logo-design',
    name: 'Logo Design',
    description: 'Unique, memorable logos that define your brand',
    price: '₹399–699',
    category: 'Branding',
    features: [
      '3 initial concepts',
      'Unlimited revisions',
      'Vector files (AI, SVG)',
      'Multiple color variations',
      'Brand guidelines included',
    ],
  },
  {
    id: 'banner-poster-design',
    name: 'Banner & Poster Design',
    description: 'Impactful banners and posters for any purpose',
    price: '₹299',
    category: 'Marketing',
    features: [
      'Custom size and format',
      'Print-ready files',
      'Web-optimized versions',
      'Professional typography',
      '48-hour delivery',
    ],
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};
