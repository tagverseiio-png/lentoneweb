"use client";

import { useState, useRef } from "react";

type ImageUploadProps = {
  value: string;
  onChange: (base64: string) => void;
  label?: string;
};

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);
    if (!file) return;

    // Check size < 600KB
    const maxSize = 600 * 1024; // 614400 bytes
    if (file.size > maxSize) {
      setError("Image size must be less than 600KB.");
      alert("Image size must be less than 600KB. Please choose a smaller or optimized image.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onChange(base64String);
    };
    reader.onerror = () => {
      setError("Failed to read file.");
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
      {label && <label style={{ fontWeight: 600, fontSize: "14px", color: "#333" }}>{label}</label>}
      
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        {value && (
          <div style={{ position: "relative", width: "100px", height: "100px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
            <img 
              src={value} 
              alt="Preview" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </div>
        )}
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "8px 16px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
                color: "var(--navy)"
              }}
            >
              Select Image File
            </button>
            
            {value && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  padding: "8px 16px",
                  border: "1px solid #ff4d4f",
                  borderRadius: "4px",
                  backgroundColor: "#fff",
                  color: "#ff4d4f",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px"
                }}
              >
                Remove
              </button>
            )}
          </div>
          <span style={{ fontSize: "12px", color: "#666" }}>
            Upload directly to Firestore DB (Max size: 600KB, Base64 format)
          </span>
          {error && <span style={{ fontSize: "12px", color: "#ff4d4f", fontWeight: 600 }}>{error}</span>}
        </div>
      </div>
    </div>
  );
}
