"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Beaker, CheckCircle, Factory, MapPin, Building2 } from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <>
      <section className={styles.aboutHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Lentone
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Manufacturing Excellence. Delivered with Trust. We are dedicated to providing premium-quality cleaning solutions meeting international expectations.
          </motion.p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.missionGrid}>
            <motion.div 
              className={styles.missionContent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2>Welcome to Lentone</h2>
              <p>
                Lentone is a premier Indian manufacturer specializing in high-quality cleaning solutions and hospitality amenities. We cater directly to Hotels, Restaurants, Resorts, Corporate Offices, Educational Institutions, Hospitals, and Retail Businesses without any middlemen.
              </p>
              <p>
                Our mission is simple: to deliver premium-quality products that meet and exceed international expectations while remaining affordable, reliable, and strictly customer-focused. By controlling the entire manufacturing process, we ensure consistent excellence in every drop.
              </p>
              <div style={{ marginTop: '30px' }}>
                <Link href="/contact" className="btn-primary">Partner With Us</Link>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.missionImage}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Lentone Laboratory" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`${styles.contentSection} section-bg-grey`}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2>Quality Assurance</h2>
            <p style={{ color: 'var(--text-secondary)' }}>We adhere to strict international manufacturing standards to guarantee the safety and efficacy of our products.</p>
          </div>

          <div className={styles.qualityGrid}>
            {[
              { icon: <Beaker size={36} />, title: "Premium Raw Materials" },
              { icon: <ShieldCheck size={36} />, title: "Laboratory Testing" },
              { icon: <CheckCircle size={36} />, title: "Quality Inspection" },
              { icon: <Factory size={36} />, title: "Hygienic Production" }
            ].map((item, i) => (
              <motion.div 
                className={styles.qualityCard} 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.qualityIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className="container">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto 50px' }}>
            <h2>Our Presence</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Strategically located to serve our clients efficiently across the region.</p>
          </div>

          <div className={styles.presenceGrid}>
            <motion.div 
              className={styles.locationCard}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Building2 size={40} className="text-gold" />
              <h3>Head Office</h3>
              <p>Chennai, Tamil Nadu</p>
            </motion.div>
            <motion.div 
              className={styles.locationCard}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <MapPin size={40} className="text-gold" />
              <h3>Branch Office</h3>
              <p>Kannur, Kerala</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
