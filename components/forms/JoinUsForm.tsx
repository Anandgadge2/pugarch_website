'use client';

import { useState } from 'react';
import type { EmailResponse } from '@/types/forms';

interface JoinUsFormProps {
  onSubmit: () => void;
}

const JoinUsForm: React.FC<JoinUsFormProps> = ({ onSubmit }) => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatus('Sending application...');

    // Store reference to form BEFORE async operation
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/send-application', {
        method: 'POST',
        body: formData, // Send as FormData for file upload
      });

      const result: EmailResponse = await response.json();

      if (response.ok && result.success) {
        setStatus('✅ Application submitted successfully!');
        form.reset(); // Use stored form reference
        setTimeout(() => onSubmit(), 1500);
      } else {
        setStatus(`❌ Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      setStatus('❌ Failed to submit. Please try again.');
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
      <h4 className="text-sm text-violet-400 mb-1">Join Us</h4>
      <h2 className="text-xl font-semibold mb-8">Be a Part of the PugArch Journey</h2>

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
          name="phone"
          placeholder="Phone Number"
          className="form-input-style"
        />
        <input
          type="url"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          className="form-input-style"
        />

        <input
          type="text"
          name="role"
          placeholder="Role/Position"
          className="form-input-style"
        />

        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          required
          className="file-input-style"
        />

        <input
          type="url"
          name="portfolio"
          placeholder="Portfolio"
          className="form-input-style col-span-full"
        />

        <textarea
          name="whyJoin"
          placeholder="Why Do You Want to Join PugArch?"
          rows={4}
          className="form-input-style col-span-full"
        ></textarea>
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
        {loading ? 'Submitting...' : 'Apply Now'}
      </button>
    </form>
  );
};

export default JoinUsForm;
