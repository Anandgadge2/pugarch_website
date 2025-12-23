'use client';

import { useState } from 'react';
import type { EmailResponse } from '@/types/forms';

interface ServiceFormProps {
  onSubmit: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending...');

    // Store reference to form BEFORE async operation
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data = {
      formType: 'service' as const,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      contact: formData.get('contact') as string,
      organization: formData.get('organization') as string,
      serviceType: formData.get('serviceType') as string,
      projectBrief: formData.get('projectBrief') as string,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: EmailResponse = await response.json();

      if (response.ok && result.success) {
        setStatus('✅ Service request sent successfully!');
        form.reset(); // Use stored form reference
        setTimeout(() => onSubmit(), 1500);
      } else {
        setStatus(`❌ Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setStatus('❌ Failed to send. Please try again.');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black border border-violet-500/30 rounded-xl p-6 md:p-10 shadow-[0_0_50px_rgba(168,85,247,0.25)] text-white max-w-4xl mx-auto"
    >
      <h4 className="text-sm text-violet-400 mb-1">Service</h4>
      <h2 className="text-xl font-semibold mb-8">
        Let&apos;s Transform Your Vision into Reality
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          className="form-input-style"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          className="form-input-style"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="form-input-style col-span-full"
        />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          className="form-input-style"
        />
        <input
          type="text"
          name="organization"
          placeholder="Organization"
          className="form-input-style"
        />

        <input
          type="text"
          name="serviceType"
          placeholder="Type of Service needed"
          className="form-input-style"
        />
        <input
          type="text"
          name="projectBrief"
          placeholder="Project Brief"
          className="form-input-style"
        />
      </div>

      {status && (
        <p className={`mt-4 text-center ${status.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
          {status}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 mx-auto block rounded-full bg-white text-black font-semibold py-2 px-6 hover:bg-violet-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Request a Service'}
      </button>
    </form>
  );
};

export default ServiceForm;
