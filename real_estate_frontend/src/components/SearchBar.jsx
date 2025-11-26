import React, { useState } from 'react';
export default function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [type, setType] = useState('');
  const submit = (e) => {
    e.preventDefault();
    onSearch({ city, minPrice, maxPrice, type });
  };
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow-md flex gap-2 flex-wrap">
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" className="px-3 py-2 border rounded w-48 text-black"/>
      <input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Min Price" className="px-3 py-2 border rounded w-28 text-black"/>
      <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max Price" className="px-3 py-2 border rounded w-28 text-black"/>
      <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 border rounded text-black">
        <option value="">All Types</option>
        <option value="House">House</option>
        <option value="Plot">Plot</option>
      </select>
      <button className="px-4 py-2 bg-brandGold text-brandBlue rounded">Search</button>
    </form>
  );
}