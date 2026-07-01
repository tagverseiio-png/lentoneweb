"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function GalleryPage() {
  const images = [
    { src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80", title: "Laboratory Testing" },
    { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80", title: "Manufacturing Plant" },
    { src: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=800&q=80", title: "Premium Products" },
    { src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80", title: "Automated Packaging" },
    { src: "https://images.unsplash.com/photo-1580982513988-348f95c4d516?auto=format&fit=crop&w=800&q=80", title: "Warehouse Storage" },
    { src: "https://images.unsplash.com/photo-1595188846175-c08170c91bd7?auto=format&fit=crop&w=800&q=80", title: "Quality Control" },
  ];

  return (
    <>
      <section className={styles.galleryHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Factory Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Take a glimpse inside our state-of-the-art manufacturing facilities, strict quality control labs, and packaging units.
          </motion.p>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className="container">
          <motion.div 
            className={styles.grid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {images.map((img, i) => (
              <motion.div key={i} className={styles.gridItem} variants={fadeUp}>
                <img src={img.src} alt={img.title} loading="lazy" />
                <div className={styles.overlay}>
                  <span>{img.title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
