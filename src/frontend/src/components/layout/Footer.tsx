import { Link } from '@tanstack/react-router';
import { Heart, Mail } from 'lucide-react';
import { SiWhatsapp, SiInstagram } from 'react-icons/si';
import { siteData } from '@/config/siteData';
import { contactLinks } from '@/config/contactLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'techchandan-ai-design';

  return (
    <footer className="border-t border-border/40 bg-accent/20" data-component="site-footer">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/generated/logo-mark.dim_512x512.png" alt="Logo" className="h-10 w-10" />
              <span className="text-xl font-bold bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
                {siteData.brandName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{siteData.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-chart-1 transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-chart-1 transition-colors">
                Services
              </Link>
              <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-chart-1 transition-colors">
                Portfolio
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-chart-1 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex flex-col gap-3">
              <a
                href={contactLinks.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-chart-1 transition-colors"
              >
                <SiWhatsapp className="h-4 w-4" />
                {contactLinks.whatsapp}
              </a>
              <a
                href={contactLinks.emailUrl}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-chart-1 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contactLinks.email}
              </a>
              <a
                href={contactLinks.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-chart-1 transition-colors"
              >
                <SiInstagram className="h-4 w-4" />
                @{contactLinks.instagram}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© {currentYear} {siteData.brandName}. All rights reserved.</p>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-chart-1 transition-colors"
          >
            Built with <Heart className="h-4 w-4 text-chart-2 fill-chart-2" /> using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
