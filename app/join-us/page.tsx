"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  role: string;
  resume: File | null;
  portfolio: string;
  whyJoin: string;
}

export default function JoinUsPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    role: "",
    resume: null,
    portfolio: "",
    whyJoin: "",
  });

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Submitting your application...");

    // Store form reference before async operation
    const form = e.currentTarget;

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("linkedin", formData.linkedin);
      submitData.append("role", formData.role);
      submitData.append("portfolio", formData.portfolio);
      submitData.append("whyJoin", formData.whyJoin);
      
      if (formData.resume) {
        submitData.append("resume", formData.resume);
      }

      const response = await fetch("/api/send-application", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("✅ Application submitted successfully!");
        form.reset();
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedin: "",
          role: "",
          resume: null,
          portfolio: "",
          whyJoin: "",
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus(`❌ Error: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      setStatus("❌ Failed to submit application. Please try again.");
      console.error("Submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Join Us Form */}
      <main className="flex-grow flex justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[#0B0B0F] border border-purple-500/40 shadow-xl rounded-2xl p-8 w-full max-w-2xl"
        >
          <h2 className="text-lg text-gray-300">Join Us</h2>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Be a Part of the PugArch Journey
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none transition"
              required
              disabled={loading}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none transition"
              required
              disabled={loading}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-gray-600 rounded-md mt-4 focus:border-purple-500 focus:outline-none transition"
            required
            disabled={loading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none transition"
              disabled={loading}
            />
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none transition"
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="role"
              placeholder="Role/Position"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none transition"
              disabled={loading}
            />
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-md focus:border-purple-500 focus:outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              required
              disabled={loading}
            />
          </div>

          <input
            type="url"
            name="portfolio"
            placeholder="Portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-gray-600 rounded-md mt-4 focus:border-purple-500 focus:outline-none transition"
            disabled={loading}
          />

          <textarea
            name="whyJoin"
            placeholder="Why Do You Want to Join PugArch?"
            value={formData.whyJoin}
            onChange={handleChange}
            className="w-full p-3 bg-transparent border border-gray-600 rounded-md mt-4 focus:border-purple-500 focus:outline-none transition resize-none"
            rows={4}
            disabled={loading}
          ></textarea>

          {/* Status Message */}
          {status && (
            <div
              className={`mt-4 p-3 rounded-md text-center ${
                status.includes("✅")
                  ? "bg-green-500/20 text-green-400 border border-green-500/50"
                  : "bg-red-500/20 text-red-400 border border-red-500/50"
              }`}
            >
              {status}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md hover:opacity-90 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
