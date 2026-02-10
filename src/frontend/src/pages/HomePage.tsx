import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { services } from '@/config/services';
import { siteData } from '@/config/siteData';

export default function HomePage() {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden" data-section="home-hero">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_2400x1350.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background z-0" />

        <div className="container relative z-10 py-24 md:py-32">
          <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 border border-chart-1/20">
              <Sparkles className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">AI-Powered Design Services</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-chart-1 via-chart-2 to-chart-1 bg-clip-text text-transparent">
                {siteData.brandName}
              </span>
              <br />
              Transform Your Brand
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Professional design services for content creators, YouTubers, and businesses. Get stunning thumbnails,
              social media graphics, logos, and more—powered by cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/order">
                <Button size="lg" className="bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-accent/20" data-section="home-features">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-chart-1/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <Zap className="h-10 w-10 text-chart-1 mb-2" />
                <CardTitle>Fast Turnaround</CardTitle>
                <CardDescription>Get your designs delivered quickly without compromising quality</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-chart-2/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <Target className="h-10 w-10 text-chart-2 mb-2" />
                <CardTitle>Tailored to You</CardTitle>
                <CardDescription>Every design is customized to match your brand and vision</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-chart-1/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <Sparkles className="h-10 w-10 text-chart-1 mb-2" />
                <CardTitle>AI-Enhanced</CardTitle>
                <CardDescription>Leveraging the latest AI tools for stunning, modern designs</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24" data-section="home-services">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional design solutions tailored for content creators and businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredServices.map((service) => (
              <Card key={service.id} className="border-border/40 hover:border-chart-1/40 transition-colors">
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-chart-1">{service.price}</span>
                    <Link to="/services">
                      <Button variant="ghost" size="sm">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button size="lg" variant="outline">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-chart-1/10 via-chart-2/10 to-chart-1/10" data-section="home-cta">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's create something amazing together. Get started with your custom design project today.
            </p>
            <Link to="/order">
              <Button size="lg" className="bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
