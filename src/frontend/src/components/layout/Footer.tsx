import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiWhatsapp, SiInstagram } from 'react-icons/si';
import { Mail } from 'lucide-react';
import { contactLinks } from '@/config/contactLinks';
import { siteData } from '@/config/siteData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'techchandan-ai-design'
  );

  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/generated/logo-mark.dim_512x512.png" alt="Logo" className="h-10 w-10" />
              <span className="text-lg font-bold bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
                {siteData.brandName}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional AI-powered design services for content creators and businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
              <Link to="/order" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Order Now
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="flex flex-col gap-3">
              <a
                href={contactLinks.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={contactLinks.emailUrl}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              <a
                href={contactLinks.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <SiInstagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {siteData.brandName}. Built with <Heart className="inline h-4 w-4 text-chart-1" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chart-1 hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
