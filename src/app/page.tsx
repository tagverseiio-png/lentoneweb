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
  const [content, setContent] = useState<Record<string, string>>({});
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  
  const heroImages = [
    content.hero_image || "/backup_images/luxury-floor-cleaner.png",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000"
  ];

  useEffect(() => {
    // Fetch content
    fetch("/api/content?page=home")
      .then(res => res.json())
      .then(data => {
        const contentMap: Record<string, string> = {};
        data.forEach((item: any) => {
          contentMap[item.section] = item.content;
        });
        setContent(contentMap);
      })
      .catch(() => {});

    // Fetch products
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFeaturedProducts(data.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

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
              {content.hero_title || "Formulating Excellence."}
            </motion.h1>
            <motion.p 
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              {content.hero_subtitle || "Premium hospitality amenities and commercial cleaning solutions crafted for industry leaders. Direct from our manufacturing facility to your establishment."}
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
        <div 
          className={styles.splitImage} 
          style={{ backgroundImage: `url(${content.why_choose_image || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000'})` }} 
        />
        <div className={styles.splitContent}>
          <div className={styles.sectionHeader}>
            <p>{content.split_title || "The Lentone Standard"}</p>
            <h2>{content.split_subtitle || "Uncompromising Quality."}</h2>
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
              <h3>{content.editorial_item_01_title || "Factory Direct"}</h3>
              <p>{content.editorial_item_01_text || "We eliminate wholesalers and distributors, providing you with uncompromising quality at genuine manufacturer rates."}</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.editorialItem}>
              <span className={styles.bigNumber}>02</span>
              <h3>{content.editorial_item_02_title || "Flexible Supply"}</h3>
              <p>{content.editorial_item_02_text || "Whether you manage a boutique hotel or a nationwide chain, our production scales seamlessly to meet your exact volume requirements."}</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.editorialItem}>
              <span className={styles.bigNumber}>03</span>
              <h3>{content.editorial_item_03_title || "Premium Formulations"}</h3>
              <p>{content.editorial_item_03_text || "Sourced from top-tier raw materials and infused with luxury fragrances to ensure your establishment leaves a lasting impression."}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Direct Advantage (Oversized Typography) */}
      <section className={styles.advantageSection}>
        <div className={styles.giantWatermark}>DIRECT</div>
        
        <div className={styles.advantageContainer}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 400, marginBottom: '24px' }}>
            The Supply Chain, <br/>
            <span style={{ color: 'var(--gold)', fontStyle: 'italic', fontFamily: 'var(--font-playfair)' }}>
              {content.advantage_title || "Simplified."}
            </span>
          </h2>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            {content.advantage_subtitle || "We handle everything internally, giving you complete transparency, better margins, and total control over your inventory."}
          </p>
          
          <motion.div 
            className={styles.advantageGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} className={styles.advantageBlock}>
              <h4>Phase 01</h4>
              <h3>{content.advantage_item_01_title || "Manufacturing"}</h3>
              <p>{content.advantage_item_01_text || "Our ISO-standard facility formulates and produces every drop, ensuring absolute consistency."}</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.advantageBlock}>
              <h4>Phase 02</h4>
              <h3>{content.advantage_item_02_title || "Quality Assurance"}</h3>
              <p>{content.advantage_item_02_text || "Rigorous batch testing guarantees that international hygiene and safety standards are meticulously met."}</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.advantageBlock}>
              <h4>Phase 03</h4>
              <h3>{content.advantage_item_03_title || "Direct Dispatch"}</h3>
              <p>{content.advantage_item_03_text || "Securely packaged and shipped directly from our warehouse to your establishment's doorstep."}</p>
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
            {(() => {
              const defaultFeatured = [
                { id: "luxury-floor-cleaner", name: "Luxury Floor Cleaner", shortDesc: "Long Lasting Freshness", image: "/backup_images/luxury-floor-cleaner.png" },
                { id: "premium-hand-wash", name: "Premium Hand Wash", shortDesc: "Moisturizing Formula", image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=800&q=80" },
                { id: "dishwash-gel", name: "Dishwash Gel", shortDesc: "Commercial Grade degreaser", image: "https://images.unsplash.com/photo-1607006342411-b0135a07292c?auto=format&fit=crop&w=800&q=80" }
              ];
              const displayProducts = featuredProducts.length > 0 ? featuredProducts : defaultFeatured;
              return displayProducts.map((prod) => (
                <motion.div className={styles.galleryItem} key={prod.id} variants={fadeUp}>
                  <Link href={`/products/${prod.id}`}>
                    <div className={styles.galleryImageWrapper}>
                      <img src={prod.image || prod.img} alt={prod.name || prod.title} className={styles.galleryImage} />
                    </div>
                    <div className={styles.galleryInfo}>
                      <h3>{prod.name || prod.title}</h3>
                      <p>{prod.shortDesc || prod.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ));
            })()}
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
            <p>{content.process_header_title || "Our Process"}</p>
            <h2>{content.process_header_subtitle || "Precision Engineered."}</h2>
          </div>

          <motion.div 
            className={styles.staggeredRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <img src={content.process_step_01_image || "https://images.unsplash.com/photo-1574689211272-bc1550ce1856?auto=format&fit=crop&w=1000&q=80"} alt="R&D Lab" className={styles.staggeredImage} />
            <div className={styles.staggeredContent}>
              <span className={styles.stepLabel}>Step 01</span>
              <h3>{content.process_step_01_title || "Research & Formulation"}</h3>
              <p>{content.process_step_01_text || "Our dedicated R&D chemists utilize cutting-edge technology to develop precise formulas that match the strict efficacy requirements of commercial environments."}</p>
            </div>
          </motion.div>

          <motion.div 
            className={styles.staggeredRow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
          >
            <img src={content.process_step_02_image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80"} alt="Production Line" className={styles.staggeredImage} />
            <div className={styles.staggeredContent}>
              <span className={styles.stepLabel}>Step 02</span>
              <h3>{content.process_step_02_title || "Automated Production"}</h3>
              <p>{content.process_step_02_text || "State-of-the-art automated filling and mixing lines ensure absolute consistency across every batch, minimizing contamination risks and maximizing output efficiency."}</p>
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
          <h2>{content.testimonial_text || `"The transition to Lentone's premium cleaning line completely elevated our lobby ambiance. The fragrance profile is exceptional, and the factory-direct pricing drastically improved our operating margins."`}</h2>
          <div className={styles.dramaticAuthor}>
            {content.testimonial_author || "Taj Residency Operations"}
            <span>{content.testimonial_author_sub || "Luxury Hotel Partner"}</span>
          </div>
        </motion.div>
      </section>

      {/* Minimal CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <h2>{content.cta_title || "Ready to upgrade your standards?"}</h2>
          <Link href="/contact" className="btn-secondary" style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>
            {content.cta_button_text || "Contact Our Team"}
          </Link>
        </div>
      </section>
    </>
  );
}
