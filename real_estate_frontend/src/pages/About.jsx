import React from "react";
import { CheckCircleIcon, ShieldCheckIcon, DocumentCheckIcon } from "@heroicons/react/24/solid";

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-brandBlue text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg text-gray-200">
            Premium real estate platform connecting trusted buyers and sellers.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-brandBlue">Our Mission</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
          We provide a transparent and effortless platform for buying and selling
          plots and houses. Our goal is to build trust, ensure secure transactions,
          and deliver properties that match your dreams.
        </p>
      </section>

      {/* What Makes Us Different */}
      <section className="container mx-auto px-4 py-10">
        <h3 className="text-2xl font-bold text-brandBlue mb-10 text-center">Why Choose Us?</h3>

        <div className="grid gap-8 md:grid-cols-3">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <ShieldCheckIcon className="h-12 text-brandGold mx-auto" />
            <h4 className="font-semibold text-xl mt-4 text-center">Trusted Listings</h4>
            <p className="text-gray-600 mt-2 text-center">
              Verified sellers and genuine properties to ensure the safest real estate experience.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <CheckCircleIcon className="h-12 text-brandGold mx-auto" />
            <h4 className="font-semibold text-xl mt-4 text-center">Transparent Process</h4>
            <p className="text-gray-600 mt-2 text-center">
              Full clarity in pricing, documentation, and legal procedures at every step.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <DocumentCheckIcon className="h-12 text-brandGold mx-auto" />
            <h4 className="font-semibold text-xl mt-4 text-center">Easy Documentation</h4>
            <p className="text-gray-600 mt-2 text-center">
              Hassle-free documentation support to close property deals smoothly.
            </p>
          </div>

        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-brandBlue text-white text-center py-14 px-4">
        <h3 className="text-2xl font-semibold">We Help You Find Your Dream Property!</h3>
        <p className="text-gray-200 mt-2">
          Trusted by thousands of customers across India
        </p>
      </section>

    </div>
  );
}
