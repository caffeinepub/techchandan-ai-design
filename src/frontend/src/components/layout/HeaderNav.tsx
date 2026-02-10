import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { siteData } from '@/config/siteData';
import HeaderAuthControl from '@/components/auth/HeaderAuthControl';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
];

export default function HeaderNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-component="site-header">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/generated/logo-mark.dim_512x512.png" alt="Logo" className="h-10 w-10" />
          <span className="text-xl font-bold bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent">
            {siteData.brandName}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-chart-1 ${
                currentPath === link.to
                  ? 'text-transparent bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text'
                  : 'text-foreground/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <HeaderAuthControl variant="outline" />
          <Link to="/order">
            <Button className="bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-lg font-medium transition-colors hover:text-chart-1 ${
                    currentPath === link.to
                      ? 'text-transparent bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text'
                      : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 space-y-3">
                <HeaderAuthControl variant="outline" fullWidth />
                <Link to="/order" className="block">
                  <Button className="w-full bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
