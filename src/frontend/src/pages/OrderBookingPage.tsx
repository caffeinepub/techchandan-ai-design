import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import OrderForm from '@/components/order/OrderForm';
import { Button } from '@/components/ui/button';

export default function OrderBookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitSuccess = () => {
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="py-16 md:py-24">
        <div className="container max-w-2xl">
          <Alert className="border-chart-1/40 bg-chart-1/10">
            <CheckCircle2 className="h-5 w-5 text-chart-1" />
            <AlertDescription className="text-base">
              <strong className="block mb-2">Order Submitted Successfully!</strong>
              Thank you for your order. We've received your request and will get back to you shortly.
            </AlertDescription>
          </Alert>

          <div className="mt-8 text-center space-y-4">
            <p className="text-muted-foreground">
              We typically respond within 24 hours. In the meantime, feel free to explore our portfolio or services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/portfolio">
                <Button variant="outline">View Portfolio</Button>
              </a>
              <a href="/services">
                <Button variant="outline">Browse Services</Button>
              </a>
              <Button onClick={() => setIsSubmitted(false)}>Submit Another Order</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Place Your Order</h1>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and we'll get started on your project
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Please provide as much detail as possible about your project</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderForm onSuccess={handleSubmitSuccess} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
