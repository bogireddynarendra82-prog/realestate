import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PreviewImage from "../components/PreviewImage";
import { getProperty, updateProperty } from "../services/propertyService";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    address: "",
    type: "House",
  });

  const [existingImages, setExistingImages] = useState([]); // Cloudinary images
  const [removedImages, setRemovedImages] = useState([]); // public_ids removed

  const [newImages, setNewImages] = useState([]); // new files
  const [newPreviews, setNewPreviews] = useState([]); // preview URLs

  const [loading, setLoading] = useState(true);

  // Fetch original property data
  useEffect(() => {
    (async () => {
      try {
        const res = await getProperty(id);
        const p = res.data;

        setForm({
          title: p.title || "",
          description: p.description || "",
          price: p.price || "",
          city: p.city || "",
          address: p.address || "",
          type: p.type || "House",
        });

        setExistingImages(p.images || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Could not load property");
        navigate("/dashboard");
      }
    })();
  }, [id, navigate]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle new uploads
  const addImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  // remove existing Cloudinary image
  const removeExistingImage = (public_id) => {
    setExistingImages((prev) => prev.filter((img) => img.public_id !== public_id));
    setRemovedImages((prev) => [...prev, public_id]);
  };

  // remove new images
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      // Send list of removed Cloudinary images
      removedImages.forEach((public_id) =>
        formData.append("removedImages", public_id)
      );

      // Upload new files
      newImages.forEach((file) => formData.append("images", file));

      await updateProperty(id, formData);

      alert("Property updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Error updating property");
    }

    setLoading(false);
  };

  if (loading)
    return (
      <div className="p-6 container mx-auto text-center text-gray-500">
        Loading property...
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-brandBlue mb-6">
        Edit Property
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
            type="number"
            placeholder="Price (₹)"
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

        {/* Existing Images */}
        <div>
          <h3 className="font-semibold mb-2">Existing Images</h3>

          {existingImages.length === 0 && (
            <p className="text-gray-500 text-sm">No images found</p>
          )}

          <div className="flex gap-4 mt-2 flex-wrap">
            {existingImages.map((img) => (
              <PreviewImage
                key={img.public_id}
                src={img.url}
                onRemove={() => removeExistingImage(img.public_id)}
                isExisting={true}
              />
            ))}
          </div>
        </div>

        {/* Upload New Images */}
        <div>
          <label className="font-semibold">Upload New Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={addImages}
            className="w-full mt-2"
          />

          {newPreviews.length > 0 && (
            <div className="flex gap-4 mt-4 flex-wrap">
              {newPreviews.map((src, i) => (
                <PreviewImage
                  key={i}
                  src={src}
                  onRemove={() => removeNewImage(i)}
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-brandBlue text-white rounded hover:bg-brandBlue/90"
        >
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}
