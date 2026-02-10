import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle } from 'lucide-react';
import { services } from '@/config/services';
import { useSubmitBooking } from '@/hooks/useSubmitBooking';
import { decodeServicePrefill } from '@/utils/orderPrefill';
import { useSearch } from '@tanstack/react-router';

interface OrderFormData {
  name: string;
  email: string;
  phoneNumber: string;
  preferredContact: string;
  serviceType: string;
  description: string;
  deadline: string;
  budgetRange: string;
}

interface OrderFormProps {
  onSuccess: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const search = useSearch({ strict: false }) as { service?: string };
  const prefilledService = search.service ? decodeServicePrefill(search.service) : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OrderFormData>({
    defaultValues: {
      serviceType: prefilledService,
      preferredContact: 'whatsapp',
    },
  });

  const [serviceType, setServiceType] = useState(prefilledService);
  const [preferredContact, setPreferredContact] = useState('whatsapp');

  const { submitBooking, isSubmitting, error } = useSubmitBooking();

  const onSubmit = async (data: OrderFormData) => {
    try {
      await submitBooking({
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        preferredContact: data.preferredContact,
        serviceType: data.serviceType,
        description: data.description,
        deadline: data.deadline || 'Flexible',
        budgetRange: data.budgetRange || 'Standard pricing',
      });
      onSuccess();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="John Doe"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="john@example.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phoneNumber"
          {...register('phoneNumber', { required: 'Phone number is required' })}
          placeholder="+1 234 567 8900"
          className={errors.phoneNumber ? 'border-destructive' : ''}
        />
        {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>}
      </div>

      {/* Preferred Contact */}
      <div className="space-y-2">
        <Label htmlFor="preferredContact">
          Preferred Contact Method <span className="text-destructive">*</span>
        </Label>
        <Select
          value={preferredContact}
          onValueChange={(value) => {
            setPreferredContact(value);
            setValue('preferredContact', value);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Service Type */}
      <div className="space-y-2">
        <Label htmlFor="serviceType">
          Service Type <span className="text-destructive">*</span>
        </Label>
        <Select
          value={serviceType}
          onValueChange={(value) => {
            setServiceType(value);
            setValue('serviceType', value, { shouldValidate: true });
          }}
        >
          <SelectTrigger className={errors.serviceType ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.id} value={service.id}>
                {service.name} - {service.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" {...register('serviceType', { required: 'Please select a service' })} />
        {errors.serviceType && <p className="text-sm text-destructive">{errors.serviceType.message}</p>}
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Project Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          {...register('description', { required: 'Please describe your project' })}
          placeholder="Tell us about your project, what you need, your brand style, any specific requirements..."
          rows={5}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      {/* Deadline (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline (Optional)</Label>
        <Input id="deadline" {...register('deadline')} placeholder="e.g., 3 days, 1 week, ASAP" />
      </div>

      {/* Budget Range (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
        <Input id="budgetRange" {...register('budgetRange')} placeholder="e.g., Standard, Premium, Custom" />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-chart-1 to-chart-2 text-white hover:opacity-90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Order'
        )}
      </Button>
    </form>
  );
}
