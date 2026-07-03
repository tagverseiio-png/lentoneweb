"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Truck, Headphones, BadgePercent, ShieldCheck, Factory } from "lucide-react";
import styles from "../forms.module.css";

export default function DistributorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/content?page=distributor")
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
    const cityState = formData.get("cityState") as string;
    const gst = formData.get("gst") as string;
    const businessType = formData.get("businessType") as string;
    const monthlyPurchase = formData.get("monthlyPurchase") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "distributor",
          name,
          email,
          phone,
          details: { company, cityState, gst, businessType, monthlyPurchase, message }
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Enquiry submission failed.");
      }
    } catch {
      alert("Error submitting enquiry.");
    }
  };

  const benefits = [
    { icon: <Factory size={32} />, title: "Factory Direct Pricing" },
    { icon: <TrendingUp size={32} />, title: "High Profit Margin" },
    { icon: <ShieldCheck size={32} />, title: "Low MOQ" },
    { icon: <BadgePercent size={32} />, title: "Marketing Support" },
    { icon: <Truck size={32} />, title: "Fast Supply" },
    { icon: <Headphones size={32} />, title: "Dedicated Manager" },
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
            {content.dist_title || "Become a Lentone Distributor"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.dist_subtitle || "Partner with a premium manufacturer and grow your business with highly profitable, fast-moving cleaning solutions."}
          </motion.p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className="container">
          
          <div className={styles.benefitsList}>
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.benefitIcon}>{b.icon}</div>
                <strong>{b.title}</strong>
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
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "var(--navy)" }}>Distributor Enquiry</h2>
            
            {submitted ? (
              <div className={styles.successMessage}>
                <h3>Thank you for your interest!</h3>
                <p>Your enquiry has been submitted successfully. A Lentone business manager will contact you shortly.</p>
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

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>City / State *</label>
                    <input name="cityState" type="text" className={styles.input} required placeholder="e.g. Chennai, Tamil Nadu" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>GST Number (Optional)</label>
                    <input name="gst" type="text" className={styles.input} placeholder="If registered" />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Current Business Type</label>
                    <select name="businessType" className={styles.select}>
                      <option>Wholesale Dealer</option>
                      <option>Retail Store</option>
                      <option>Facility Management</option>
                      <option>Hotel / Restaurant Supplier</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Expected Monthly Purchase</label>
                    <select name="monthlyPurchase" className={styles.select}>
                      <option>Less than ₹50,000</option>
                      <option>₹50,000 - ₹2,00,000</option>
                      <option>₹2,00,000 - ₹5,00,000</option>
                      <option>Above ₹5,00,000</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Message</label>
                  <textarea name="message" className={styles.textarea} placeholder="Tell us more about your distribution network or specific requirements..."></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>Submit Enquiry</button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
