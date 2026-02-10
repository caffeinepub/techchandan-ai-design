import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { services } from '@/config/services';
import { encodeServicePrefill } from '@/utils/orderPrefill';

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Pricing</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional AI-powered design services tailored for content creators, influencers, and businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="border-border/40 hover:border-chart-1/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="outline" className="border-chart-1/40 text-chart-1">
                    {service.category}
                  </Badge>
                  <span className="text-2xl font-bold text-chart-1">{service.price}</span>
                </div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-chart-1 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/order" search={{ service: encodeServicePrefill(service.id) }}>
                  <Button className="w-full bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
                    Order Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-chart-1/20 bg-accent/20">
            <CardHeader>
              <CardTitle>Need Something Custom?</CardTitle>
              <CardDescription>
                Don't see exactly what you're looking for? We offer custom design packages tailored to your specific
                needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
