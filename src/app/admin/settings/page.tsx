"use client";

import { useState } from "react";
import styles from "../admin.module.css";

export default function AdminSettings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        alert("Admin credentials updated successfully! Please note the new login details.");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update credentials.");
      }
    } catch (error) {
      alert("An error occurred while saving credentials.");
    }
    setIsSaving(false);
  };

  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-playfair)", color: "var(--navy)", marginBottom: 24 }}>System Settings</h2>
      
      <div className={styles.dashboardCard} style={{ maxWidth: 500 }}>
        <h3>Change Admin Credentials</h3>
        <p style={{ color: "#666", marginBottom: 20, fontSize: "14px" }}>
          Update the credentials used to access the Lentone Admin Dashboard.
        </p>
        <form onSubmit={handleSubmit} className={styles.contentForm}>
          <div className={styles.contentRow}>
            <label>New Username</label>
            <input 
              required 
              type="text" 
              className={styles.contentInput} 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="e.g. admin"
            />
          </div>
          
          <div className={styles.contentRow}>
            <label>New Password</label>
            <input 
              required 
              type="password" 
              className={styles.contentInput} 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter new password"
            />
          </div>

          <div className={styles.contentRow}>
            <label>Confirm Password</label>
            <input 
              required 
              type="password" 
              className={styles.contentInput} 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)} 
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" disabled={isSaving} className={styles.saveBtn}>
            {isSaving ? "Saving..." : "Change Credentials"}
          </button>
        </form>
      </div>
    </div>
  );
}
