// src/components/PropertyForm.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import PreviewImage from './PreviewImage';
import { createProperty, updateProperty, getProperty } from '../services/propertyService';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PropertyForm({ mode = 'create' /* 'create' or 'edit' */ }) {
  const navigate = useNavigate();
  const params = useParams(); // if editing, params.id expected
  const { user } = useContext(AuthContext);

  const isEdit = mode === 'edit';
  const propertyId = params.id;

  // form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'House',
    city: '',
    address: '',
    sqft: ''
  });

  // existing images from server (when editing)
  const [existingImages, setExistingImages] = useState([]); // { url, public_id }
  const [removeExistingIds, setRemoveExistingIds] = useState([]); // public_id list to remove on submit

  // newly added files & previews
  const [files, setFiles] = useState([]); // File objects
  const [previews, setPreviews] = useState([]); // objectUrls

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // cleanup previews on unmount
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [previews]);

  useEffect(() => {
    if (isEdit && propertyId) {
      (async () => {
        try {
          setLoading(true);
          const res = await getProperty(propertyId);
          const p = res.data;
          setForm({
            title: p.title || '',
            description: p.description || '',
            price: p.price || '',
            propertyType: p.propertyType || 'House',
            city: p.city || '',
            address: p.address || '',
            sqft: p.sqft || ''
          });
          setExistingImages(p.images || []);
        } catch (err) {
          console.error(err);
          setError('Failed to load property. Make sure you are the owner.');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [isEdit, propertyId]);

  // handle input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  };

  // when user adds files
  const onFilesAdded = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    // limit total images (existing + new) to 12
    if ((existingImages.length - removeExistingIds.length) + files.length + selected.length > 12) {
      setError('You can upload up to 12 images in total.');
      return;
    }

    // add files and previews
    const newPreviews = selected.map(f => URL.createObjectURL(f));
    setFiles(prev => [...prev, ...selected]);
    setPreviews(prev => [...prev, ...newPreviews]);

    // reset file input so same file can be re-selected if removed
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // remove newly added file at index
  const removeNewFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    // revoke objectURL
    setPreviews(prev => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
  };

  // toggle removal of existing image (marks for deletion)
  const toggleRemoveExisting = (public_id) => {
    setRemoveExistingIds(prev => {
      if (prev.includes(public_id)) return prev.filter(id => id !== public_id);
      return [...prev, public_id];
    });
  };

  // build FormData and submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // basic validation
    if (!form.title.trim()) return setError('Title is required.');
    if (!form.price || Number(form.price) <= 0) return setError('Enter a valid price.');
    if (!form.city.trim()) return setError('City is required.');
    if (!user || user.role !== 'seller') return setError('Only sellers can list properties.');

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('price', String(form.price));
      formData.append('propertyType', form.propertyType);
      formData.append('city', form.city);
      formData.append('address', form.address);
      if (form.sqft) formData.append('sqft', String(form.sqft));

      // send location if you have a map/autocomplete (optional)
      // formData.append('location', JSON.stringify({ lat: ..., lng: ... }));

      // append new image files
      files.forEach((file) => {
        formData.append('images', file);
      });

      // pass removeExistingIds so backend can delete them from Cloudinary (as JSON)
      if (removeExistingIds.length) {
        // append as JSON string so multer won't parse it as files
        formData.append('removeImages', JSON.stringify(removeExistingIds));
      }

      let res;
      if (isEdit && propertyId) {
        res = await updateProperty(propertyId, formData);
      } else {
        res = await createProperty(formData);
      }

      // success, redirect to new property or dashboard
      const newId = res.data._id || (res.data.property && res.data.property._id);
      alert('Property saved successfully');
      navigate(newId ? `/properties/${newId}` : '/dashboard');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.response?.data?.errors?.[0]?.msg || err.message || 'Save failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? 'Edit Property' : 'Create New Property'}</h2>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input name="title" value={form.title} onChange={onChange} className="mt-1 block w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" value={form.description} onChange={onChange} className="mt-1 block w-full border px-3 py-2 rounded h-28" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (INR)</label>
            <input name="price" value={form.price} onChange={onChange} type="number" className="mt-1 block w-full border px-3 py-2 rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <select name="propertyType" value={form.propertyType} onChange={onChange} className="mt-1 block w-full border px-3 py-2 rounded">
              <option>House</option>
              <option>Plot</option>
              <option>Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Sqft</label>
            <input name="sqft" value={form.sqft} onChange={onChange} type="number" className="mt-1 block w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input name="city" value={form.city} onChange={onChange} className="mt-1 block w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input name="address" value={form.address} onChange={onChange} className="mt-1 block w-full border px-3 py-2 rounded" />
          </div>
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>

          <div className="flex gap-3 flex-wrap mb-3">
            {/* existing images */}
            {existingImages.map(img => {
              const isMarked = removeExistingIds.includes(img.public_id);
              return (
                <div key={img.public_id} className="relative">
                  <div className={`relative w-40 h-28 rounded overflow-hidden border ${isMarked ? 'opacity-40' : ''}`}>
                    <img src={img.url} alt="existing" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => toggleRemoveExisting(img.public_id)}
                      className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full p-1 shadow"
                    >
                      {isMarked ? '↺' : '✕'}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* previews for newly selected files */}
            {previews.map((src, idx) => (
              <div key={src} className="relative">
                <PreviewImage src={src} onRemove={() => removeNewFile(idx)} />
              </div>
            ))}

            {/* add button */}
            <label className="w-40 h-28 flex items-center justify-center cursor-pointer border rounded text-sm text-gray-500 bg-gray-50">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onFilesAdded}
                className="hidden"
              />
              + Add Images
            </label>
          </div>

          <p className="text-xs text-gray-500">You can upload up to 12 images. Remove any image by clicking ✕. Removed existing images will be deleted from server on Save.</p>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-brandGold text-brandBlue rounded font-semibold">
            {loading ? (isEdit ? 'Saving...' : 'Creating...') : (isEdit ? 'Save Changes' : 'Create Property')}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
