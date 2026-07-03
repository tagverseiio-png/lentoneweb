"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import styles from "./page.module.css";
import formStyles from "../forms.module.css";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/content?page=contact")
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
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          email,
          phone,
          details: { subject, message }
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    } catch {
      alert("Error sending message.");
    }
  };

  const defaultAddress = "First floor, Tamil Residency layout, plot no.47,\nHindustan college road, near gateway international school,\nPadur, Kalipattur, Tamil Nadu 603103";
  const defaultPhones = "+91 63745 80424 / +91 99419 68238";
  const defaultEmail = "lentonecp@gmail.com";

  return (
    <>
      <section className={styles.contactHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {content.contact_title || "Contact Us"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.contact_subtitle || "Get in touch with our team for enquiries, support, or to request product samples."}
          </motion.p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            
            <motion.div 
              className={styles.contactInfo}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.infoBlock}>
                <div className={styles.infoIcon}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Head Office</h3>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {content.contact_address || defaultAddress}
                  </p>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.infoIcon}>
                  <Phone size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Phone Numbers</h3>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {content.contact_phone || defaultPhones}
                  </p>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.infoIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h3>Email Address</h3>
                  <p>
                    <a href={`mailto:${content.contact_email || defaultEmail}`}>
                      {content.contact_email || defaultEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.mapContainer}>
                <iframe 
                  src="https://maps.google.com/maps?q=Tamil+Residency+layout,+plot+no.47,+Hindustan+college+road,+near+gateway+international+school,+Padur,+Kalipattur,+Tamil+Nadu+603103&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0, width: "100%", height: "100%", minHeight: "300px" }}
                ></iframe>
                <a href="https://share.google/6INA4BiKT23yLIoUO" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "12px", fontSize: "0.9rem", color: "var(--navy)", textDecoration: "underline", fontWeight: 500 }}>
                  Open in Google Maps
                </a>
              </div>
            </motion.div>

            <motion.div 
              className={formStyles.formContainer}
              style={{ margin: 0, height: "fit-content" }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ marginBottom: "30px", color: "var(--navy)" }}>Send a Message</h2>
              
              {submitted ? (
                <div className={formStyles.successMessage}>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={formStyles.formRow}>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.label}>Name *</label>
                      <input name="name" type="text" className={formStyles.input} required placeholder="Your name" />
                    </div>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.label}>Phone *</label>
                      <input name="phone" type="tel" className={formStyles.input} required placeholder="Your contact number" />
                    </div>
                  </div>

                  <div className={formStyles.formGroup}>
                    <label className={formStyles.label}>Email *</label>
                    <input name="email" type="email" className={formStyles.input} required placeholder="Your email address" />
                  </div>

                  <div className={formStyles.formGroup}>
                    <label className={formStyles.label}>Subject</label>
                    <input name="subject" type="text" className={formStyles.input} placeholder="How can we help?" />
                  </div>

                  <div className={formStyles.formGroup}>
                    <label className={formStyles.label}>Message *</label>
                    <textarea name="message" className={formStyles.textarea} required placeholder="Write your message here..."></textarea>
                  </div>

                  <button type="submit" className={formStyles.submitBtn}>Send Message</button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
