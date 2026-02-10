export const contactLinks = {
  whatsapp: '+1234567890',
  email: 'hello@aidesignstudio.com',
  instagram: '@aidesignstudio',

  get whatsappUrl() {
    return `https://wa.me/${this.whatsapp.replace(/[^0-9]/g, '')}`;
  },

  get emailUrl() {
    return `mailto:${this.email}`;
  },

  get instagramUrl() {
    return `https://instagram.com/${this.instagram.replace('@', '')}`;
  },
};
