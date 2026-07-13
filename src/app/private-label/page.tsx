"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FlaskConical, PenTool, CheckCircle, Package, Truck, Target } from "lucide-react";
import styles from "../forms.module.css";

export default function PrivateLabelPage() {
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/content?page=private-label")
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
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const category = formData.get("category") as string;
    const projectDetails = formData.get("projectDetails") as string;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "private-label",
          name,
          email,
          phone,
          details: { company, category, projectDetails }
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("OEM enquiry submission failed.");
      }
    } catch {
      alert("Error submitting enquiry.");
    }
  };

  const processSteps = [
    { icon: <Target size={32} />, title: content.step1_title || "1. Requirement Brief", desc: content.step1_desc || "Share your vision, target market, and product specifications." },
    { icon: <FlaskConical size={32} />, title: content.step2_title || "2. Formula Development", desc: content.step2_desc || "Our R&D team develops custom formulations tailored to your brand." },
    { icon: <CheckCircle size={32} />, title: content.step3_title || "3. Sample Approval", desc: content.step3_desc || "Test the prototypes. We refine until you are 100% satisfied." },
    { icon: <PenTool size={32} />, title: content.step4_title || "4. Packaging & Design", desc: content.step4_desc || "Select premium bottles and custom labels featuring your logo." },
    { icon: <Package size={32} />, title: content.step5_title || "5. Mass Production", desc: content.step5_desc || "We manufacture, fill, and pack under strict quality control." },
    { icon: <Truck size={32} />, title: content.step6_title || "6. Dispatch & Delivery", desc: content.step6_desc || "Your fully branded ready-to-sell products delivered to you." },
  ];

  return (
    <>
      <section className={styles.formHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {content.pl_title || "Private Label & OEM Manufacturing"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.pl_subtitle || "Launch your own brand of premium cleaning solutions. We handle the manufacturing, you handle the selling."}
          </motion.p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ color: "var(--navy)", marginBottom: "16px" }}>{content.process_title || "The OEM Process"}</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto" }}>
              {content.process_desc || "We offer end-to-end private labeling services. From custom formulation and fragrance selection to bottle design and labeling."}
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginBottom: "80px"
          }}>
            {processSteps.map((step, i) => (
              <motion.div 
                key={i} 
                style={{
                  backgroundColor: "var(--white)",
                  padding: "40px 30px",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ color: "var(--gold)", marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                  {step.icon}
                </div>
                <h3 style={{ marginBottom: "12px", fontSize: "1.2rem" }}>{step.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "var(--navy)" }}>{content.form_title || "OEM Enquiry"}</h2>
            
            {submitted ? (
              <div className={styles.successMessage}>
                <h3>Thank you!</h3>
                <p>We've received your private label enquiry. Our product development team will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Name *</label>
                    <input name="name" type="text" className={styles.input} required placeholder="Your full name" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Company Name *</label>
                    <input name="company" type="text" className={styles.input} required placeholder="Your business name" />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Email *</label>
                    <input name="email" type="email" className={styles.input} required placeholder="Your email address" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number *</label>
                    <input name="phone" type="tel" className={styles.input} required placeholder="Your contact number" />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Product Categories Required *</label>
                  <select name="category" className={styles.select} required>
                    <option value="">-- Select Category --</option>
                    <option>Housekeeping & Floor Cleaners</option>
                    <option>Kitchen & Dishwashing</option>
                    <option>Personal Care & Hand Wash</option>
                    <option>Automotive Care</option>
                    <option>Multiple Categories</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Project Details</label>
                  <textarea name="projectDetails" className={styles.textarea} placeholder="Tell us about your brand vision, custom formulation needs, or packaging ideas..."></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>Submit OEM Request</button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
