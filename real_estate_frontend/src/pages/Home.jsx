import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { searchProperties } from '../services/propertyService';

export default function Home() {
  const [properties, setProperties] = useState([]);

  const fetchData = async (params = {}) => {
    try {
      const res = await searchProperties(params);

      const updatedProps = res.data.properties.map((p) => ({
        ...p,
        image: p.image || "https://source.unsplash.com/600x400/?house,real-estate",
      }));

      setProperties(updatedProps);
    } catch (err) {
      console.error("Error loading properties", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

      {/* HERO SECTION */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero.jpg)' }}
      >
        <div className="absolute inset-0 bg-brandBlue opacity-40"></div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-bold">Find Your Perfect Property</h1>
            <p className="mt-2">Buy & Sell plots and houses with trust and transparency.</p>

            <div className="mt-6">
              <SearchBar onSearch={(q) => fetchData(q)} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Properties</h2>

        {properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            
            {/* Building Illustration */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/6193/6193884.png"
              alt="No Properties Found"
              className="w-40 h-40 mb-4 opacity-90"
            />

            <h3 className="text-lg font-semibold text-gray-700">
              No properties found
            </h3>

            <p className="text-gray-500 mt-1 text-sm">
              Try adjusting your search filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
