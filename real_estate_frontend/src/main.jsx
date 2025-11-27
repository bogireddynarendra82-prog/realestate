import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";    // ⬅ Added import

import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/footer";
import SellPropertySection from "./components/SellPropertySection";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
           
          }
        />

        <Route
          path="/dashboard/edit-property/:id"
          element={
            <ProtectedRoute>
              <EditProperty />
            </ProtectedRoute>
          }
        />
      </Routes>
      <SellPropertySection />
        <Footer/>
    </BrowserRouter>
  </AuthProvider>

);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
