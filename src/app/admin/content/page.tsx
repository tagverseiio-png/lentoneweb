"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import { Trash2, Save, Plus, ArrowLeft } from "lucide-react";

type PageContent = {
  id: string;
  page: string;
  section: string;
  content: string;
  label: string;
  type: "text" | "textarea" | "image";
};

export default function ContentManager() {
  const [contentList, setContentList] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("home");
  const [showAddForm, setShowAddForm] = useState(false);

  // Add Form State
  const [newContent, setNewContent] = useState({
    page: "home",
    section: "",
    label: "",
    type: "text" as "text" | "textarea" | "image",
    content: ""
  });

  const fetchContent = () => {
    setIsLoading(true);
    fetch(`/api/content?t=${Date.now()}`, { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setContentList(data);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.page || !newContent.section) {
      alert("Page and Section Key are required.");
      return;
    }

    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContent)
      });
      if (res.ok) {
        alert("New content item created successfully!");
        setShowAddForm(false);
        setNewContent({
          page: selectedPage,
          section: "",
          label: "",
          type: "text",
          content: ""
        });
        fetchContent();
      } else {
        alert("Failed to create content item.");
      }
    } catch {
      alert("Error creating content item.");
    }
  };

  const handleUpdate = async (item: PageContent) => {
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: item.page,
          section: item.section,
          content: item.content,
          label: item.label,
          type: item.type
        })
      });
      if (res.ok) {
        alert("Content saved successfully!");
        fetchContent();
      } else {
        alert("Failed to save content.");
      }
    } catch {
      alert("Error saving content.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content item? This will remove it from the page layout.")) return;

    try {
      const res = await fetch(`/api/content?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        alert("Content item deleted successfully!");
        setContentList(prev => prev.filter(c => c.id !== id));
      } else {
        alert("Failed to delete content.");
      }
    } catch {
      alert("Error deleting content.");
    }
  };

  const handleFieldChange = (id: string, value: string) => {
    setContentList(prev => prev.map(c => c.id === id ? { ...c, content: value } : c));
  };

  if (isLoading) return <div style={{ padding: "40px" }}>Loading page content...</div>;

  // Extract unique pages for tab filters
  const pagesList = Array.from(new Set(contentList.map(c => c.page)));
  // Ensure default pages exist in tabs even if empty
  const defaultPages = ["global", "home", "about", "distributor", "private-label", "bulk-orders", "faq", "contact", "privacy-policy", "terms", "refund"];
  defaultPages.forEach(p => {
    if (!pagesList.includes(p)) {
      pagesList.push(p);
    }
  });

  const filteredContent = contentList.filter(c => c.page === selectedPage);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", margin: 0 }}>Content CRUD Manager</h2>
        
        <button
          onClick={() => {
            setNewContent(prev => ({ ...prev, page: selectedPage }));
            setShowAddForm(!showAddForm);
          }}
          style={{
            padding: "10px 16px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: showAddForm ? "#666" : "var(--navy)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px"
          }}
        >
          {showAddForm ? (
            <>
              <ArrowLeft size={16} /> Back to List
            </>
          ) : (
            <>
              <Plus size={16} /> Create Content Item
            </>
          )}
        </button>
      </div>

      {showAddForm ? (
        <div className={styles.dashboardCard} style={{ maxWidth: "600px" }}>
          <h3 style={{ marginBottom: "20px" }}>Create New Site Content Item</h3>
          <form onSubmit={handleCreate} className={styles.contentForm}>
            <div className={styles.contentRow}>
              <label>Page Name *</label>
              <input
                type="text"
                required
                className={styles.contentInput}
                value={newContent.page}
                onChange={e => setNewContent({ ...newContent, page: e.target.value })}
                placeholder="e.g. home, about, privacy-policy"
              />
            </div>

            <div className={styles.contentRow}>
              <label>Section Key * (Unique within the page)</label>
              <input
                type="text"
                required
                className={styles.contentInput}
                value={newContent.section}
                onChange={e => setNewContent({ ...newContent, section: e.target.value })}
                placeholder="e.g. hero_title, footer_text"
              />
            </div>

            <div className={styles.contentRow}>
              <label>Field Label * (Friendly name for editors)</label>
              <input
                type="text"
                required
                className={styles.contentInput}
                value={newContent.label}
                onChange={e => setNewContent({ ...newContent, label: e.target.value })}
                placeholder="e.g. Main Header Title"
              />
            </div>

            <div className={styles.contentRow}>
              <label>Field Type</label>
              <select
                className={styles.contentInput}
                value={newContent.type}
                onChange={e => setNewContent({ ...newContent, type: e.target.value as any })}
                style={{ padding: "8px 12px" }}
              >
                <option value="text">Single Line Text</option>
                <option value="textarea">Multi-line Text (Textarea)</option>
                <option value="image">Base64 Image Upload</option>
              </select>
            </div>

            <div className={styles.contentRow}>
              {newContent.type === "image" ? (
                <ImageUpload
                  label="Initial Image Content"
                  value={newContent.content}
                  onChange={base64 => setNewContent({ ...newContent, content: base64 })}
                />
              ) : newContent.type === "textarea" ? (
                <>
                  <label>Initial Content</label>
                  <textarea
                    className={styles.contentArea}
                    value={newContent.content}
                    onChange={e => setNewContent({ ...newContent, content: e.target.value })}
                    placeholder="Type details here..."
                  />
                </>
              ) : (
                <>
                  <label>Initial Content</label>
                  <input
                    type="text"
                    className={styles.contentInput}
                    value={newContent.content}
                    onChange={e => setNewContent({ ...newContent, content: e.target.value })}
                    placeholder="Type details here..."
                  />
                </>
              )}
            </div>

            <button type="submit" className={styles.saveBtn} style={{ width: "100%", marginTop: 12 }}>
              Create Content Document
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Page Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {pagesList.map(pageName => (
              <button
                key={pageName}
                onClick={() => setSelectedPage(pageName)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "1px solid var(--navy)",
                  background: selectedPage === pageName ? "var(--navy)" : "white",
                  color: selectedPage === pageName ? "white" : "var(--navy)",
                  cursor: "pointer",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontSize: "13px"
                }}
              >
                {pageName.replace("-", " ")}
              </button>
            ))}
          </div>

          <div className={styles.dashboardCard}>
            <h3 style={{ textTransform: "capitalize", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{selectedPage.replace("-", " ")} Content Items</span>
              <span style={{ fontSize: "13px", color: "#666", fontWeight: "normal" }}>
                {filteredContent.length} items configured
              </span>
            </h3>

            {filteredContent.length === 0 ? (
              <p style={{ color: "#666", fontStyle: "italic" }}>
                No database items set for this page. Click "Create Content Item" to add content.
              </p>
            ) : (
              <div className={styles.contentForm}>
                {filteredContent.map((item) => (
                  <div 
                    key={item.id} 
                    className={styles.contentRow} 
                    style={{ borderBottom: "1px solid #eee", paddingBottom: 24, marginBottom: 24 }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <label style={{ fontWeight: 700, color: "var(--navy)", margin: 0 }}>
                        {item.label}
                      </label>
                      <span style={{ fontSize: "11px", color: "#888" }}>
                        Key: <code>{item.section}</code> | Type: <span style={{ textTransform: "uppercase", fontWeight: 600 }}>{item.type}</span>
                      </span>
                    </div>

                    {item.type === "textarea" ? (
                      <textarea
                        className={styles.contentArea}
                        value={item.content}
                        onChange={e => handleFieldChange(item.id, e.target.value)}
                      />
                    ) : item.type === "image" ? (
                      <ImageUpload
                        value={item.content}
                        onChange={base64 => handleFieldChange(item.id, base64)}
                      />
                    ) : (
                      <input
                        type="text"
                        className={styles.contentInput}
                        value={item.content}
                        onChange={e => handleFieldChange(item.id, e.target.value)}
                      />
                    )}

                    <div style={{ display: "flex", gap: "10px", marginTop: 12 }}>
                      <button
                        onClick={() => handleUpdate(item)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: "#4caf50",
                          color: "white",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px"
                        }}
                      >
                        <Save size={14} /> Save Content
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "4px",
                          border: "none",
                          backgroundColor: "#ff4d4f",
                          color: "white",
                          fontWeight: 600,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "12px"
                        }}
                      >
                        <Trash2 size={14} /> Delete Section
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
