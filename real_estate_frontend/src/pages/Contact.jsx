import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Submitted! (Backend integration coming soon)");
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-brandBlue text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-200">
          Have questions about buying or selling property? We're here to help!
        </p>
      </section>

      {/* Contact Form + Info */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-brandBlue mb-3">Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          ></textarea>

          <button className="w-full bg-brandGold text-brandBlue font-semibold py-3 rounded-md hover:bg-yellow-500 transition">
            Submit
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h3 className="text-2xl font-bold text-brandBlue">Get in Touch</h3>

          <p className="text-gray-600">
            📍 Location: Hi-Tech city, Hyderabad, Telangana
          </p>
          <p className="text-gray-600">
            📞 Phone: +91 9502839942
          </p>
          <p className="text-gray-600">
            ✉ Email: boggireddynarendra82@gmail.com
          </p>

          <hr />

          <p className="text-gray-600">
            We respond within 24 hours. Feel free to reach out anytime!
          </p>
        </div>

      </div>
    </div>
  );
}
