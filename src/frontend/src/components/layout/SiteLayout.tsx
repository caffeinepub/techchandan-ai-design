import { ReactNode, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    // Dev-only duplicate detection guard for HomePage sections
    if (import.meta.env.DEV && location.pathname === '/') {
      // Small delay to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        const sections = [
          { id: 'home-hero', name: 'Hero Section' },
          { id: 'home-features', name: 'Features Section' },
          { id: 'home-services', name: 'Services Preview Section' },
          { id: 'home-cta', name: 'CTA Section' },
        ];

        let duplicatesFound = false;

        sections.forEach(({ id, name }) => {
          const elements = document.querySelectorAll(`[data-section="${id}"]`);
          if (elements.length > 1) {
            console.error(
              `🚨 DUPLICATION DETECTED: ${name} (data-section="${id}") appears ${elements.length} times in the DOM. Expected exactly 1.`,
              '\nThis indicates the HomePage component or SiteLayout is being mounted multiple times.',
              '\nCheck App.tsx router composition and ensure no page components wrap themselves in SiteLayout.'
            );
            duplicatesFound = true;
          }
        });

        // Check for duplicate headers/footers
        const headers = document.querySelectorAll('header[data-component="site-header"]');
        const footers = document.querySelectorAll('footer[data-component="site-footer"]');

        if (headers.length > 1) {
          console.error(
            `🚨 DUPLICATION DETECTED: Site header appears ${headers.length} times. Expected exactly 1.`
          );
          duplicatesFound = true;
        }

        if (footers.length > 1) {
          console.error(
            `🚨 DUPLICATION DETECTED: Site footer appears ${footers.length} times. Expected exactly 1.`
          );
          duplicatesFound = true;
        }

        if (!duplicatesFound && location.pathname === '/') {
          console.log('✅ No layout duplication detected on homepage');
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
