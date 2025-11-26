import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function Header(){
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-brandBlue">RealEstate<span className="text-brandGold">.</span></Link>
        <nav className="hidden md:flex gap-6 items-center text-sm text-brandBlue">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 rounded bg-brandBlue text-white">Dashboard</Link>
              <button onClick={logout} className="text-sm">Logout</button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-2 rounded bg-brandGold text-brandBlue">List Your Property</Link>
          )}
        </nav>
        <div className="md:hidden">
          <Link to="/login" className="px-3 py-2 rounded bg-brandGold text-brandBlue text-sm">List</Link>
        </div>
      </div>
    </header>
  );
}