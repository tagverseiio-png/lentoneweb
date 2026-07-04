"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import ImageUpload from "@/components/ImageUpload/ImageUpload";

type Product = {
  id: string;
  title: string;
  name?: string;
  slug: string;
  description: string;
  fullDesc?: string;
  shortDesc?: string;
  image: string;
  category: string;
  features: any; // Can be array or string
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Product Form State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    category: "",
    features: ""
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update product
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, ...form })
        });
        if (res.ok) {
          alert("Product updated!");
          resetForm();
          fetchProducts();
        } else {
          alert("Failed to update product");
        }
      } else {
        // Create product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          alert("Product created!");
          resetForm();
          fetchProducts();
        } else {
          alert("Failed to create product");
        }
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    
    // Format features for text input
    let featuresText = "";
    if (Array.isArray(product.features)) {
      featuresText = product.features.join(", ");
    } else if (typeof product.features === "string") {
      featuresText = product.features;
    }

    setForm({
      title: product.title || product.name || "",
      slug: product.slug || "",
      description: product.description || product.fullDesc || "",
      image: product.image || "",
      category: product.category || "",
      features: featuresText
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        alert("Product deleted!");
        fetchProducts();
        if (editingId === id) resetForm();
      } else {
        alert("Failed to delete product");
      }
    } catch (e) {
      alert("Error deleting product.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", slug: "", description: "", image: "", category: "", features: "" });
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", marginBottom: 24 }}>Product Manager</h2>
      
      <div className={styles.dashboardCard}>
        <h3>{editingId ? "Edit Product Details" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit} className={styles.contentForm} style={{ marginTop: 16 }}>
          <div className={styles.contentRow}>
            <label>Title / Name</label>
            <input required type="text" className={styles.contentInput} value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
          </div>
          <div className={styles.contentRow}>
            <label>Slug (URL-friendly name, e.g. luxury-shampoo)</label>
            <input required type="text" className={styles.contentInput} value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} />
          </div>

          <div className={styles.contentRow}>
            <ImageUpload 
              label="Product Image"
              value={form.image}
              onChange={base64 => setForm({...form, image: base64})}
            />
          </div>
          <div className={styles.contentRow}>
            <label>Description</label>
            <textarea required className={styles.contentArea} value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div className={styles.contentRow}>
            <label>Features (comma separated)</label>
            <input required type="text" className={styles.contentInput} value={form.features} onChange={e => setForm({...form, features: e.target.value})} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="submit" className={styles.saveBtn}>
              {editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className={styles.saveBtn} style={{ background: "#ccc", color: "#333" }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.dashboardCard}>
        <h3>Current Products</h3>
        {isLoading ? <p>Loading...</p> : (
          <div style={{ marginTop: 16 }}>
            {products.length === 0 ? <p>No products yet.</p> : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map(p => (
                  <li key={p.id} style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong>{p.title || p.name}</strong>
                      <span style={{ color: "#666", marginLeft: 10, fontSize: "12px", background: "#eee", padding: "2px 6px", borderRadius: "3px" }}>
                        {p.category}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button 
                        onClick={() => handleEdit(p)} 
                        style={{ padding: "6px 12px", background: "#0070f3", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        style={{ padding: "6px 12px", background: "#ff0000", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

