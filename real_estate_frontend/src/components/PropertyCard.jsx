import React from 'react';
import { Link } from 'react-router-dom';
export default function PropertyCard({ property }) {
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <img src={property.images?.[0]?.url || '/placeholder.jpg'} alt={property.title} className="w-full h-44 object-cover"/>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{property.title}</h3>
        <p className="text-sm text-gray-500">{property.city} • {property.sqft ? `${property.sqft} sqft` : '-'}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-brandBlue font-bold">₹{property.price?.toLocaleString()}</div>
          <Link to={`/properties/${property._id}`} className="px-3 py-1 bg-brandBlue text-white rounded text-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
}