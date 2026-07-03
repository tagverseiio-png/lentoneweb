"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";

type SeoConfig = {
  page: string;
  title: string;
  description: string;
  keywords: string;
};

export default function SeoEditor() {
  const [seoList, setSeoList] = useState<SeoConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("home");

  const [form, setForm] = useState({
    title: "",
    description: "",
    keywords: ""
  });

  const fetchSeo = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/seo");
      const data = await res.json();
      if (Array.isArray(data)) {
        setSeoList(data);
        const current = data.find(s => s.page === selectedPage);
        if (current) {
          setForm({
            title: current.title || "",
            description: current.description || "",
            keywords: current.keywords || ""
          });
        }
      }
    } catch (e) {
      console.error("Error fetching SEO:", e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  useEffect(() => {
    const current = seoList.find(s => s.page === selectedPage);
    if (current) {
      setForm({
        title: current.title || "",
        description: current.description || "",
        keywords: current.keywords || ""
      });
    } else {
      setForm({ title: "", description: "", keywords: "" });
    }
  }, [selectedPage, seoList]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: selectedPage, ...form })
      });
      if (res.ok) {
        alert("SEO Settings updated successfully!");
        fetchSeo();
      } else {
        alert("Failed to update SEO settings.");
      }
    } catch (e) {
      alert("Error saving SEO settings.");
    }
  };

  if (isLoading) return <div style={{ padding: "40px" }}>Loading SEO Settings...</div>;

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", marginBottom: 24 }}>SEO Metadata Manager</h2>
      
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {["home", "about", "products", "contact"].map(pageName => (
          <button
            key={pageName}
            onClick={() => setSelectedPage(pageName)}
            style={{
              padding: "10px 20px",
              borderRadius: "4px",
              border: "1px solid var(--navy)",
              background: selectedPage === pageName ? "var(--navy)" : "white",
              color: selectedPage === pageName ? "white" : "var(--navy)",
              cursor: "pointer",
              fontWeight: 600,
              textTransform: "capitalize"
            }}
          >
            {pageName} Page
          </button>
        ))}
      </div>

      <div className={styles.dashboardCard}>
        <h3 style={{ textTransform: "capitalize", marginBottom: 20 }}>Edit {selectedPage} SEO</h3>
        <form onSubmit={handleSave} className={styles.contentForm}>
          <div className={styles.contentRow}>
            <label>SEO Title</label>
            <input
              type="text"
              required
              className={styles.contentInput}
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. LENTONE | Premium Hospitality Solutions"
            />
          </div>

          <div className={styles.contentRow}>
            <label>Meta Description</label>
            <textarea
              required
              className={styles.contentArea}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Write a compelling meta description for search engines..."
            />
          </div>

          <div className={styles.contentRow}>
            <label>Keywords (comma separated)</label>
            <input
              type="text"
              className={styles.contentInput}
              value={form.keywords}
              onChange={e => setForm({ ...form, keywords: e.target.value })}
              placeholder="e.g. hotel supplies, dishwash gel, sanitizers"
            />
          </div>

          <button type="submit" className={styles.saveBtn}>Save SEO Config</button>
        </form>
      </div>
    </div>
  );
}
