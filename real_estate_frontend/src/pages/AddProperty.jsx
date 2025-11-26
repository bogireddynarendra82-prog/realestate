import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createProperty } from "../services/propertyService";
import PreviewImage from "../components/PreviewImage";
import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    type: "House",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (images.length === 0) return alert("Please upload at least one image.");

    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      formData.append("seller", user._id);

      images.forEach((file) => formData.append("images", file));

      await createProperty(formData);

      alert("Property added successfully!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error creating property");
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-brandBlue mb-6">
        Add New Property
      </h1>

      <form
        onSubmit={submit}
        className="bg-white shadow p-6 rounded-lg space-y-5"
      >
        {/* Title */}
        <input
          name="title"
          value={form.title}
          onChange={changeHandler}
          placeholder="Property Title"
          className="w-full border rounded px-3 py-2"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={changeHandler}
          placeholder="Property Description"
          className="w-full border rounded px-3 py-2"
          required
        />

        {/* Price & Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="price"
            value={form.price}
            onChange={changeHandler}
            placeholder="Price (₹)"
            type="number"
            className="w-full border rounded px-3 py-2"
            required
          />

          <select
            name="type"
            value={form.type}
            onChange={changeHandler}
            className="w-full border rounded px-3 py-2"
          >
            <option>House</option>
            <option>Plot</option>
            <option>Commercial</option>
          </select>
        </div>

        {/* City & Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="city"
            value={form.city}
            onChange={changeHandler}
            placeholder="City"
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            name="address"
            value={form.address}
            onChange={changeHandler}
            placeholder="Full Address"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="font-semibold">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={addImages}
            className="w-full mt-2"
          />

          {/* Preview */}
          {previews.length > 0 && (
            <div className="flex gap-4 mt-4 flex-wrap">
              {previews.map((src, index) => (
                <PreviewImage
                  key={index}
                  src={src}
                  onRemove={() => removeImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-brandBlue text-white rounded hover:bg-brandBlue/90"
        >
          {loading ? "Saving..." : "Save Property"}
        </button>
      </form>
    </div>
  );
}
