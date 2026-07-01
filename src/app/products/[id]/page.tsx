"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { productsData } from "@/data/products";
import styles from "../page.module.css";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const params = useParams();
  const { id } = params;
  
  const product = productsData.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link href="/products" className="btn-primary" style={{ marginTop: "20px" }}>Back to Products</Link>
      </div>
    );
  }

  return (
    <section className={styles.detailSection}>
      <div className="container">
        <Link href="/products" style={{ color: "var(--text-secondary)", marginBottom: "30px", display: "inline-block" }}>
          &larr; Back to all products
        </Link>
        
        <div className={styles.detailGrid}>
          <motion.div 
            className={styles.detailImages}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={product.image} alt={product.name} className={styles.mainImage} />
          </motion.div>
          
          <motion.div 
            className={styles.detailContent}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1>{product.name}</h1>
            <p className={styles.tagline}>{product.shortDesc}</p>
            <p className={styles.description}>{product.fullDesc}</p>
            
            <ul className={styles.featuresList}>
              {product.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>
            
            <div className={styles.actionBtns}>
              <Link href="/contact" className="btn-primary">Request a Quote</Link>
              <Link href="/contact?subject=Sample Request" className="btn-secondary" style={{ color: "var(--navy)", borderColor: "var(--navy)" }}>
                Request Sample
              </Link>
            </div>
            
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <strong>Pack Sizes Available</strong>
                <span>{product.packSizes.join(", ")}</span>
              </div>
              <div className={styles.specItem}>
                <strong>Usage</strong>
                <span>{product.usage}</span>
              </div>
              {Object.entries(product.specs).map(([key, val]) => (
                <div className={styles.specItem} key={key}>
                  <strong>{key}</strong>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
