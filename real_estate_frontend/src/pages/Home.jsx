import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { searchProperties } from '../services/propertyService';
export default function Home() {
  const [properties, setProperties] = useState([]);
  const fetchData = async (params={}) => {
    const res = await searchProperties(params);
    setProperties(res.data.properties);
  };
  useEffect(()=>{ fetchData(); },[]);
  return (
    <div>
      <section className="relative h-96 bg-cover bg-center" style={{backgroundImage:'url(/hero.jpg)'}}>
        <div className="absolute inset-0 bg-brandBlue opacity-40"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-bold">Find Your Perfect Property</h1>
            <p className="mt-2">Buy & Sell plots and houses with trust and transparency.</p>
            <div className="mt-6">
              <SearchBar onSearch={(q)=> fetchData(q)} />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((p)=> <PropertyCard key={p._id} property={p}/>)}
        </div>
      </section>
    </div>
  );
}