import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Upload, X } from 'lucide-react';
import { services } from '@/config/services';
import { useSubmitBooking } from '@/hooks/useSubmitBooking';
import { decodeServicePrefill } from '@/utils/orderPrefill';
import { useSearch } from '@tanstack/react-router';

interface OrderFormData {
  name: string;
  email: string;
  serviceType: string;
  description: string;
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
  } = useForm<OrderFormData>({
    defaultValues: {
      serviceType: prefilledService,
    },
  });

  const [serviceType, setServiceType] = useState(prefilledService);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { submitBooking, isSubmitting, error } = useSubmitBooking();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById('referenceFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      await submitBooking({
        name: data.name,
        email: data.email,
        serviceType: data.serviceType,
        description: data.description,
        referenceFile: selectedFile,
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
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Your name"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">
          Email <span className="text-destructive">*</span>
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
          placeholder="your@email.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
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

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
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

      {/* Reference Upload */}
      <div className="space-y-2">
        <Label htmlFor="referenceFile">Upload Reference (Optional)</Label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Input
              id="referenceFile"
              type="file"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
              className="cursor-pointer"
            />
          </div>
          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-accent/50 rounded-md border border-border">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="flex-shrink-0 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
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
