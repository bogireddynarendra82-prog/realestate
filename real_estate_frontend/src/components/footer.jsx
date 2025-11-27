import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#101010] text-gray-300 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* POPULAR LOCALITIES */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
            Popular Localities
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Flats in Vivek Vihar</li>
            <li>Flats in Viyan Vihar</li>
            <li>Flats in Block A</li>
            <li>Flats in Block B</li>
            <li>Flats in Anand Vihar</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
            Company
          </h3>
          <ul className="space-y-2 text-sm">
            <li>Careers</li>
            <li>About Us</li>
            <li>For Partners</li>
            <li>Terms</li>
            <li>Annual Return</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
            <li>Unsubscribe</li>
            <li>Merger Hearing Advertisement</li>
          </ul>
        </div>

        {/* PARTNER SITES */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
            Partner Sites
          </h3>
          <ul className="space-y-2 text-sm">
            <li>realestate.com.au</li>
            <li>realtor.com</li>
            <li>99.co</li>
            <li>collinsdictionary.com</li>
          </ul>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>News</li>
            <li>Home Loans</li>
            <li>Sitemap</li>
            <li>International</li>
          </ul>
        </div>

        {/* EXPERIENCE APP */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wide">
            Experience Housing App On Mobile
          </h3>

          <ul className="space-y-2 text-sm mb-4">
            <li>Housing iOS App</li>
            <li>Housing Android App</li>
          </ul>

          <div className="bg-white p-2 rounded-lg w-32">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://housing.com"
              alt="QR Code"
              className="w-full"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Open camera & scan the QR code to download the app
          </p>
        </div>
      </div>

      {/* SOCIAL + COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-700 pt-6">
          
          {/* SOCIAL ICONS */}
          <div className="flex gap-4 text-xl mb-4 sm:mb-0">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📸</a>
            <a href="#" className="hover:text-white">▶</a>
          </div>

          {/* COPYRIGHT */}
          <div className="text-gray-400 text-sm text-center sm:text-right">
            © 2025–27 Chinni Solutions Pvt. Ltd
          </div>
        </div>
      </div>
    </footer>
  );
}
