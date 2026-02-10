import { useState } from 'react';
import { useActor } from './useActor';
import { ExternalBlob } from '@/backend';
import type { ReferenceFile } from '@/backend';

interface BookingData {
  name: string;
  email: string;
  serviceType: string;
  description: string;
  referenceFile?: File | null;
}

export function useSubmitBooking() {
  const { actor } = useActor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = async (data: BookingData) => {
    if (!actor) {
      setError('Unable to connect to the service. Please try again.');
      throw new Error('Actor not available');
    }

    setIsSubmitting(true);
    setError(null);

    try {
      let referenceFileData: ReferenceFile | null = null;

      // Convert File to ReferenceFile if provided
      if (data.referenceFile) {
        const file = data.referenceFile;
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        
        referenceFileData = {
          filename: file.name,
          contentType: file.type || 'application/octet-stream',
          blob: ExternalBlob.fromBytes(bytes),
        };
      }

      await actor.submitOrder(
        data.name,
        data.email,
        data.serviceType,
        data.description,
        referenceFileData
      );

      setIsSubmitting(false);
      return true;
    } catch (err: any) {
      setIsSubmitting(false);
      const errorMessage =
        err?.message || 'Failed to submit your order. Please try again or contact us directly.';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    submitBooking,
    isSubmitting,
    error,
  };
}
