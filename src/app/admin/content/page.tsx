"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";

type PageContent = {
  page: string;
  section: string;
  content: string;
};

export default function ContentEditor() {
  const [contentList, setContentList] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default structure we want to allow editing for the Home Page
  const editableSections = [
    { page: "home", section: "hero_title", label: "Hero Title", type: "textarea" },
    { page: "home", section: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
    { page: "home", section: "hero_image", label: "Hero Background Image URL", type: "text" },
    { page: "home", section: "about_title", label: "Why Choose Us Title", type: "text" },
    { page: "home", section: "about_text", label: "Why Choose Us Text", type: "textarea" },
  ];

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        setContentList(data);
        setIsLoading(false);
      });
  }, []);

  const getContent = (page: string, section: string) => {
    const item = contentList.find(c => c.page === page && c.section === section);
    return item ? item.content : "";
  };

  const handleSave = async (page: string, section: string, content: string) => {
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, section, content })
      });
      if (res.ok) {
        alert("Saved successfully!");
        // Update local state
        const updated = await res.json();
        setContentList(prev => {
          const filtered = prev.filter(c => !(c.page === page && c.section === section));
          return [...filtered, updated];
        });
      } else {
        alert("Failed to save.");
      }
    } catch (e) {
      alert("Error saving content.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", marginBottom: 24 }}>Page Content Editor</h2>
      
      <div className={styles.dashboardCard}>
        <h3 style={{ marginBottom: 16 }}>Home Page</h3>
        <div className={styles.contentForm}>
          {editableSections.map((sec, idx) => {
            const currentVal = getContent(sec.page, sec.section);
            return (
              <div key={idx} className={styles.contentRow} style={{ borderBottom: "1px solid #eee", paddingBottom: 16 }}>
                <label>{sec.label}</label>
                {sec.type === "textarea" ? (
                  <textarea 
                    className={styles.contentArea} 
                    defaultValue={currentVal}
                    id={`input-${sec.section}`}
                  />
                ) : (
                  <input 
                    type="text" 
                    className={styles.contentInput} 
                    defaultValue={currentVal}
                    id={`input-${sec.section}`}
                  />
                )}
                <button 
                  className={styles.saveBtn} 
                  style={{ marginTop: 8 }}
                  onClick={() => {
                    const el = document.getElementById(`input-${sec.section}`) as HTMLInputElement | HTMLTextAreaElement;
                    handleSave(sec.page, sec.section, el.value);
                  }}
                >
                  Save {sec.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
