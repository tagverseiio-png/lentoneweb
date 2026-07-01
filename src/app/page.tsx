"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import styles from "./page.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=2000",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <>
      {/* Editorial Hero */}
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          <img 
            src={heroImages[bgIndex]} 
            alt="Luxury Hospitality" 
            className={styles.heroImage} 
            key={bgIndex}
          />
        </div>

        <div className={styles.heroTextContainer}>
          <div className={styles.heroTextContent}>
            <motion.h1 
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Formulating <br/>
              <span className={styles.titleHighlight}>Excellence.</span>
            </motion.h1>
            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Premium hospitality amenities and commercial cleaning solutions crafted for industry leaders. Direct from our manufacturing facility to your establishment.
            </motion.p>
            <motion.div 
              className={styles.heroBtns}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              <Link href="/products" className="btn-primary">Explore Collection</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Split Pane: Why Choose Us */}
      <section className={styles.splitSection}>
        <div className={styles.splitImage} />
        <div className={styles.splitContent}>
          <div className={styles.sectionHeader}>
            <p>The Lentone Standard</p>
            <h2>Uncompromising Quality.</h2>
          </div>

          <motion.div 
            className={styles.editorialList}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className={styles.editorialItem}>
              <span className={styles.bigNumber}>01</span>
              <h3>Factory Direct</h3>
              <p>We eliminate wholesalers and distributors, providing you with uncompromising quality at genuine manufacturer rates.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.editorialItem}>
              <span className={styles.bigNumber}>02</span>
              <h3>Flexible Supply</h3>
              <p>Whether you manage a boutique hotel or a nationwide chain, our production scales seamlessly to meet your exact volume requirements.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.editorialItem}>
              <span className={styles.bigNumber}>03</span>
              <h3>Premium Formulations</h3>
              <p>Sourced from top-tier raw materials and infused with luxury fragrances to ensure your establishment leaves a lasting impression.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Direct Advantage (Oversized Typography) */}
      <section className={styles.advantageSection}>
        <div className={styles.giantWatermark}>DIRECT</div>
        
        <div className={styles.advantageContainer}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, marginBottom: '24px' }}>The Supply Chain, <br/><span style={{ color: 'var(--gold)', fontStyle: 'italic', fontFamily: 'var(--font-playfair)' }}>Simplified.</span></h2>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>We handle everything internally, giving you complete transparency, better margins, and total control over your inventory.</p>
          
          <motion.div 
            className={styles.advantageGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className={styles.advantageBlock}>
              <h4>Phase 01</h4>
              <h3>Manufacturing</h3>
              <p>Our ISO-standard facility formulates and produces every drop, ensuring absolute consistency.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.advantageBlock}>
              <h4>Phase 02</h4>
              <h3>Quality Assurance</h3>
              <p>Rigorous batch testing guarantees that international hygiene and safety standards are meticulously met.</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.advantageBlock}>
              <h4>Phase 03</h4>
              <h3>Direct Dispatch</h3>
              <p>Securely packaged and shipped directly from our warehouse to your establishment's doorstep.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products (Editorial Gallery) */}
      <section className={styles.editorialGallery}>
        <div className="container">
          <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 80px', maxWidth: '700px' }}>
            <p>Our Collection</p>
            <h2>Signature Solutions</h2>
          </div>

          <motion.div 
            className={styles.galleryGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { id: "luxury-floor-cleaner", title: "Luxury Floor Cleaner", desc: "Long Lasting Freshness", img: "https://images.unsplash.com/photo-1584820927498-cafe8c106093?auto=format&fit=crop&w=800&q=80" },
              { id: "premium-hand-wash", title: "Premium Hand Wash", desc: "Moisturizing Formula", img: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=800&q=80" },
              { id: "dishwash-gel", title: "Dishwash Gel", desc: "Commercial Grade degreaser", img: "https://images.unsplash.com/photo-1585659722983-38ca8e89f664?auto=format&fit=crop&w=800&q=80" }
            ].map((prod) => (
              <motion.div className={styles.galleryItem} key={prod.id} variants={fadeUp}>
                <Link href={`/products/${prod.id}`}>
                  <div className={styles.galleryImageWrapper}>
                    <img src={prod.img} alt={prod.title} className={styles.galleryImage} />
                  </div>
                  <div className={styles.galleryInfo}>
                    <h3>{prod.title}</h3>
                    <p>{prod.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <div style={{ textAlign: 'center', marginTop: '80px' }}>
             <Link href="/products" className="btn-secondary">View Full Catalog</Link>
          </div>
        </div>
      </section>

      {/* Staggered Timeline / Manufacturing */}
      <section className={styles.staggeredSection}>
        <div className="container">
           <div className={styles.sectionHeader} style={{ textAlign: 'center', margin: '0 auto 120px' }}>
            <p>Our Process</p>
            <h2>Precision Engineered.</h2>
          </div>

          <motion.div 
            className={styles.staggeredRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <img src="https://images.unsplash.com/photo-1574689211272-bc1550ce1856?auto=format&fit=crop&w=1000&q=80" alt="R&D Lab" className={styles.staggeredImage} />
            <div className={styles.staggeredContent}>
              <span className={styles.stepLabel}>Step 01</span>
              <h3>Research & Formulation</h3>
              <p>Our dedicated R&D chemists utilize cutting-edge technology to develop precise formulas that match the strict efficacy requirements of commercial environments.</p>
            </div>
          </motion.div>

          <motion.div 
            className={styles.staggeredRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" alt="Production Line" className={styles.staggeredImage} />
            <div className={styles.staggeredContent}>
              <span className={styles.stepLabel}>Step 02</span>
              <h3>Automated Production</h3>
              <p>State-of-the-art automated filling and mixing lines ensure absolute consistency across every batch, minimizing contamination risks and maximizing output efficiency.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dramatic Testimonial */}
      <section className={styles.dramaticTestimonial}>
        <motion.div 
          className={styles.dramaticQuote}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2>"The transition to Lentone's premium cleaning line completely elevated our lobby ambiance. The fragrance profile is exceptional, and the factory-direct pricing drastically improved our operating margins."</h2>
          <div className={styles.dramaticAuthor}>
            Taj Residency Operations
            <span>Luxury Hotel Partner</span>
          </div>
        </motion.div>
      </section>

      {/* Minimal CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>Ready to upgrade your standards?</h2>
          <Link href="/contact" className="btn-secondary" style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>Contact Our Team</Link>
        </div>
      </section>
    </>
  );
}
