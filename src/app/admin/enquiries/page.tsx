"use client";

import { useState, useEffect } from "react";
import styles from "../admin.module.css";
import { Mail, Phone, Calendar, Trash2 } from "lucide-react";

type Enquiry = {
  id: string;
  type: "contact" | "distributor" | "private-label" | "bulk-orders";
  name: string;
  email: string;
  phone: string;
  details: Record<string, string>;
  createdAt: string;
};

export default function EnquiriesInbox() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  const fetchEnquiries = () => {
    setIsLoading(true);
    fetch("/api/enquiries")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEnquiries(data);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await fetch(`/api/enquiries?id=${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setEnquiries(prev => prev.filter(item => item.id !== id));
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null);
        }
      } else {
        alert("Failed to delete enquiry.");
      }
    } catch {
      alert("Error deleting enquiry.");
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "contact": return { bg: "#e6f7ff", text: "#1890ff", border: "#91d5ff" };
      case "distributor": return { bg: "#fff7e6", text: "#fa8c16", border: "#ffd591" };
      case "private-label": return { bg: "#f9f0ff", text: "#722ed1", border: "#d3adf7" };
      case "bulk-orders": return { bg: "#e6fffb", text: "#13c2c2", border: "#87e8de" };
      default: return { bg: "#f5f5f5", text: "#595959", border: "#d9d9d9" };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "contact": return "Contact Message";
      case "distributor": return "Distributor Request";
      case "private-label": return "OEM / Private Label";
      case "bulk-orders": return "Bulk Order Enquiry";
      default: return type;
    }
  };

  const filteredEnquiries = filterType === "all" 
    ? enquiries 
    : enquiries.filter(item => item.type === filterType);

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", marginBottom: 24 }}>Enquiries Inbox</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontWeight: 600, fontSize: "14px", color: "#666" }}>Filter by:</span>
        {["all", "contact", "distributor", "private-label", "bulk-orders"].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              background: filterType === type ? "var(--navy)" : "white",
              color: filterType === type ? "white" : "var(--navy)",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "capitalize"
            }}
          >
            {type.replace("-", " ")}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedEnquiry ? "1fr 1fr" : "1fr", gap: "24px" }}>
        
        {/* Inbox List */}
        <div className={styles.dashboardCard} style={{ padding: 0, overflow: "hidden" }}>
          {isLoading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>Loading enquiries...</div>
          ) : filteredEnquiries.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>No enquiries found.</div>
          ) : (
            <div style={{ maxHeight: "700px", overflowY: "auto" }}>
              {filteredEnquiries.map((item) => {
                const badge = getTypeBadgeColor(item.type);
                const isSelected = selectedEnquiry?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEnquiry(item)}
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #eee",
                      backgroundColor: isSelected ? "#f0f5ff" : "white",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, color: "var(--navy)" }}>{item.name}</span>
                      <span style={{
                        backgroundColor: badge.bg,
                        color: badge.text,
                        border: `1px solid ${badge.border}`,
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "11px",
                        fontWeight: 600
                      }}>
                        {getTypeLabel(item.type)}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "16px", color: "#666", fontSize: "13px", marginBottom: 8 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Mail size={14} /> {item.email}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Phone size={14} /> {item.phone}
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#999" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <button 
                        onClick={(e) => handleDelete(item.id, e)}
                        style={{ background: "none", border: "none", color: "#ff4d4f", cursor: "pointer" }}
                        title="Delete enquiry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Details View */}
        {selectedEnquiry && (
          <div className={styles.dashboardCard} style={{ alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: 16, marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>Enquiry Details</h3>
              <button 
                onClick={() => setSelectedEnquiry(null)}
                style={{ background: "none", border: "1px solid #ddd", borderRadius: "4px", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}
              >
                Close
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <span style={{ color: "#888", fontSize: "12px", display: "block" }}>Sender Name</span>
                <strong style={{ fontSize: "16px" }}>{selectedEnquiry.name}</strong>
              </div>

              <div>
                <span style={{ color: "#888", fontSize: "12px", display: "block" }}>Contact Info</span>
                <span style={{ display: "block", fontSize: "14px" }}>Email: <a href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a></span>
                <span style={{ display: "block", fontSize: "14px" }}>Phone: <a href={`tel:${selectedEnquiry.phone}`}>{selectedEnquiry.phone}</a></span>
              </div>

              <div>
                <span style={{ color: "#888", fontSize: "12px", display: "block" }}>Enquiry Type</span>
                <strong style={{ fontSize: "14px" }}>{getTypeLabel(selectedEnquiry.type)}</strong>
              </div>

              <div>
                <span style={{ color: "#888", fontSize: "12px", display: "block" }}>Submission Date</span>
                <span style={{ fontSize: "14px" }}>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: 16, marginTop: 8 }}>
                <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", color: "var(--navy)" }}>Submitted Details:</h4>
                <div style={{ backgroundColor: "#f9f9f9", padding: "16px", borderRadius: "6px", fontSize: "14px" }}>
                  {Object.entries(selectedEnquiry.details || {}).map(([key, val]) => (
                    <div key={key} style={{ marginBottom: 12 }}>
                      <span style={{ textTransform: "capitalize", fontWeight: 600, color: "#555", display: "block", fontSize: "12px" }}>
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span style={{ whiteSpace: "pre-line", color: "#333" }}>{val || "N/A"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
