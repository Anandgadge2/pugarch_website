'use client';

import { useState } from 'react';
import type { EmailResponse } from '@/types/forms';

interface PartnershipFormProps {
  onSubmit: () => void;
}

const PartnershipForm: React.FC<PartnershipFormProps> = ({ onSubmit }) => {
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
      formType: 'partnership' as const,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      designation: formData.get('designation') as string,
      website: formData.get('website') as string,
      industry: formData.get('industry') as string,
      goal: formData.get('goal') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result: EmailResponse = await response.json();

      if (response.ok && result.success) {
        setStatus('✅ Partnership request sent successfully!');
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
      <h4 className="text-sm text-violet-400 mb-1">Partnership</h4>
      <h2 className="text-xl font-semibold mb-8">Let&apos;s Collaborate To Drive Innovation</h2>

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
          type="text"
          name="company"
          placeholder="Company Name"
          required
          className="form-input-style"
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          className="form-input-style"
        />

        <input
          type="url"
          name="website"
          placeholder="Website URL"
          className="form-input-style"
        />
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          className="form-input-style"
        />

        <input
          type="text"
          name="goal"
          placeholder="Collaboration Goal"
          className="form-input-style"
        />
        <input
          type="text"
          name="message"
          placeholder="Message"
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
        className="mt-6 w-full rounded-full bg-white text-black font-semibold py-2 px-6 hover:bg-violet-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Submit Partnership Request'}
      </button>
    </form>
  );
};

export default PartnershipForm;
