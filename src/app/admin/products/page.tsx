"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  features: string;
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    title: "", slug: "", description: "", image: "", category: "", features: ""
  });

  const fetchProducts = async () => {
    setIsLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });
    if (res.ok) {
      alert("Product created!");
      setNewProduct({ title: "", slug: "", description: "", image: "", category: "", features: "" });
      fetchProducts();
    } else {
      alert("Failed to create product");
    }
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", marginBottom: 24 }}>Product Manager</h2>
      
      <div className={styles.dashboardCard}>
        <h3>Add New Product</h3>
        <form onSubmit={handleCreate} className={styles.contentForm} style={{ marginTop: 16 }}>
          <div className={styles.contentRow}>
            <label>Title</label>
            <input required type="text" className={styles.contentInput} value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
          </div>
          <div className={styles.contentRow}>
            <label>Slug (URL-friendly name, e.g. luxury-shampoo)</label>
            <input required type="text" className={styles.contentInput} value={newProduct.slug} onChange={e => setNewProduct({...newProduct, slug: e.target.value})} />
          </div>
          <div className={styles.contentRow}>
            <label>Category</label>
            <input required type="text" className={styles.contentInput} value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} />
          </div>
          <div className={styles.contentRow}>
            <label>Image URL</label>
            <input required type="text" className={styles.contentInput} value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
          </div>
          <div className={styles.contentRow}>
            <label>Description</label>
            <textarea required className={styles.contentArea} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
          </div>
          <div className={styles.contentRow}>
            <label>Features (comma separated)</label>
            <input required type="text" className={styles.contentInput} value={newProduct.features} onChange={e => setNewProduct({...newProduct, features: e.target.value})} />
          </div>
          <button type="submit" className={styles.saveBtn}>Add Product</button>
        </form>
      </div>

      <div className={styles.dashboardCard}>
        <h3>Current Products</h3>
        {isLoading ? <p>Loading...</p> : (
          <div style={{ marginTop: 16 }}>
            {products.length === 0 ? <p>No products yet.</p> : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {products.map(p => (
                  <li key={p.id} style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
                    <strong>{p.title}</strong>
                    <span style={{ color: "#666" }}>{p.category}</span>
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
