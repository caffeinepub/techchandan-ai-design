import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiWhatsapp, SiInstagram } from 'react-icons/si';
import { Mail, MessageCircle, Camera, Send } from 'lucide-react';
import { contactLinks } from '@/config/contactLinks';

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            Ready to start your project? Reach out through any of these channels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp */}
          <Card className="border-border/40 hover:border-chart-1/40 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center">
                <SiWhatsapp className="h-8 w-8 text-chart-1" />
              </div>
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>Chat with us directly for quick responses</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={contactLinks.whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open WhatsApp
                </Button>
              </a>
              <p className="text-sm text-muted-foreground text-center mt-3">{contactLinks.whatsapp}</p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="border-border/40 hover:border-chart-1/40 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center">
                <Mail className="h-8 w-8 text-chart-1" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>Send us a detailed message about your project</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={contactLinks.emailUrl} className="block">
                <Button className="w-full bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </a>
              <p className="text-sm text-muted-foreground text-center mt-3">{contactLinks.email}</p>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="border-border/40 hover:border-chart-1/40 transition-all hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-chart-1/20 to-chart-2/20 flex items-center justify-center">
                <SiInstagram className="h-8 w-8 text-chart-1" />
              </div>
              <CardTitle>Instagram</CardTitle>
              <CardDescription>Follow us and DM for inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <a href={contactLinks.instagramUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90">
                  <Camera className="mr-2 h-4 w-4" />
                  Visit Instagram
                </Button>
              </a>
              <p className="text-sm text-muted-foreground text-center mt-3">{contactLinks.instagram}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-chart-1/20 bg-accent/20">
          <CardHeader className="text-center">
            <CardTitle>Prefer to Fill Out a Form?</CardTitle>
            <CardDescription>
              Use our order form to provide detailed information about your project requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <a href="/order">
              <Button size="lg" variant="outline">
                Go to Order Form
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
