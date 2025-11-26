import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  searchProperties,
  deleteProperty,
} from "../services/propertyService";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // For seller → fetch only their properties
      if (user.role === "seller") {
        const res = await searchProperties({ sellerId: user._id });
        setProperties(res.data.properties || []);
      }

      // For buyer → fetch saved properties (if implemented)
      if (user.role === "buyer") {
        // If buyer saved properties table is implemented
        setProperties(user.saved || []); // fallback
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      await deleteProperty(id);
      setProperties(properties.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting property");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="container mx-auto p-6 text-center">Loading...</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">

      {/* HEADER AREA */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brandBlue">
          Dashboard ({user.role})
        </h1>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* SELLER DASHBOARD */}
      {user.role === "seller" && (
        <>
          <div className="flex justify-between items-center mt-8 mb-4">
            <h2 className="text-xl font-semibold">My Property Listings</h2>

            <Link
              to="/dashboard/add-property"
              className="px-4 py-2 bg-brandGold text-brandBlue rounded hover:bg-brandGold/90"
            >
              + Add New Property
            </Link>
          </div>

          {properties.length === 0 ? (
            <p className="text-gray-500">You haven’t listed any properties.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {properties.map((p) => (
                <div key={p._id} className="relative group">
                  <PropertyCard property={p} />

                  {/* Edit/Delete buttons */}
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <Link
                      to={`/dashboard/edit-property/${p._id}`}
                      className="px-2 py-1 text-xs bg-brandBlue text-white rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* BUYER DASHBOARD */}
      {user.role === "buyer" && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Saved Properties</h2>
          {properties.length === 0 ? (
            <p className="text-gray-500">
              You have not saved any properties yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
