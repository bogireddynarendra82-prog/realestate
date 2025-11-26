// src/components/PreviewImage.jsx
import React from 'react';

export default function PreviewImage({ src, onRemove, isExisting=false }) {
  return (
    <div className="relative w-40 h-28 rounded overflow-hidden border">
      <img src={src} alt="preview" className="w-full h-full object-cover" />
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full p-1 shadow"
        aria-label={isExisting ? "Remove existing image" : "Remove image"}
      >
        ✕
      </button>
    </div>
  );
}
