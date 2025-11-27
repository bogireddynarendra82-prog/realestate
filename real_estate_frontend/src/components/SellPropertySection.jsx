import React from "react";

export default function SellPropertySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <h2 className="text-3xl font-semibold mb-4">Have a property to sell?</h2>

      <div className="bg-white shadow-md border rounded-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left illustration */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/535/535239.png"
          alt="Property Illustration"
          className="w-24 md:w-32"
        />

        {/* Middle text */}
        <div className="flex flex-col text-center md:text-left">
          <p className="text-gray-700 text-lg mb-2">
            List your property & connect with clients faster!
          </p>

          <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition">
            Sell your property
          </button>
        </div>

        {/* Right illustration — HOUSE BUILDING */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/6193/6193884.png"
          alt="House Building"
          className="w-28 md:w-36"
        />

      </div>
    </section>
  );
}
