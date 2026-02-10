export const contactLinks = {
  whatsapp: '7739425361',
  email: 'chandankumar0852139@gmail.com',
  instagram: 'techchandan11',

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
