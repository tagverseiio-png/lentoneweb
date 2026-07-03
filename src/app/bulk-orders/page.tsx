"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../forms.module.css";

export default function BulkOrdersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/content?page=bulk-orders")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const contentMap: Record<string, string> = {};
          data.forEach((item: any) => {
            contentMap[item.section] = item.content;
          });
          setContent(contentMap);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const company = formData.get("company") as string;
    const gst = formData.get("gst") as string;
    const name = formData.get("contactPerson") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const location = formData.get("location") as string;
    const products = formData.get("products") as string;
    const requirements = formData.get("requirements") as string;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "bulk-orders",
          name,
          email,
          phone,
          details: { company, gst, location, products, requirements }
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Bulk order enquiry submission failed.");
      }
    } catch {
      alert("Error submitting request.");
    }
  };

  return (
    <>
      <section className={styles.formHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {content.bulk_title || "Bulk Order Enquiry"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.bulk_subtitle || "Request a quote for large volume requirements. Ideal for corporate buyers, large hotel chains, and facility management companies."}
          </motion.p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "var(--navy)" }}>Corporate Enquiry Form</h2>
            
            {submitted ? (
              <div className={styles.successMessage}>
                <h3>Request Received!</h3>
                <p>Thank you for your bulk order enquiry. Our corporate sales team will send you a customized quote shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Company Name *</label>
                    <input name="company" type="text" className={styles.input} required placeholder="Your company name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>GST Number *</label>
                    <input name="gst" type="text" className={styles.input} required placeholder="For B2B billing" />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Contact Person *</label>
                    <input name="contactPerson" type="text" className={styles.input} required placeholder="Name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Mobile Number *</label>
                    <input name="phone" type="tel" className={styles.input} required placeholder="Contact number" />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email Address *</label>
                    <input name="email" type="email" className={styles.input} required placeholder="Official email id" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Delivery Location (City/State) *</label>
                    <input name="location" type="text" className={styles.input} required placeholder="Where to ship" />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Products Required & Quantity *</label>
                  <textarea name="products" className={styles.textarea} required placeholder="E.g., 50x 5L Luxury Floor Cleaner, 100x Premium Hand Wash 500ml..."></textarea>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Special Requirements (Optional)</label>
                  <textarea name="requirements" className={styles.textarea} placeholder="Any specific packaging or logistics requirements..."></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>Submit Bulk Order Request</button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
