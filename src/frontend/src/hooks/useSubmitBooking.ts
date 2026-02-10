import { useState } from 'react';
import { useActor } from './useActor';

interface BookingData {
  name: string;
  phoneNumber: string;
  email: string;
  preferredContact: string;
  serviceType: string;
  description: string;
  deadline: string;
  budgetRange: string;
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
      // Map the form data to the backend's expected format
      // Backend expects: name, phoneNumber, location, deadline, bonusService
      // We'll map our fields as follows:
      // - name -> name
      // - phoneNumber -> phoneNumber
      // - email + preferredContact -> location (as contact info)
      // - deadline -> deadline
      // - serviceType + description + budgetRange -> bonusService (as project details)

      const location = `Email: ${data.email} | Preferred: ${data.preferredContact}`;
      const bonusService = `Service: ${data.serviceType} | Description: ${data.description} | Budget: ${data.budgetRange}`;

      await actor.submitBooking(data.name, data.phoneNumber, location, data.deadline, bonusService);

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
