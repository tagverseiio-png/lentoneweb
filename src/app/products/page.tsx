"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

type Product = {
  id: string;
  name: string;
  shortDesc: string;
  image: string;
  category: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <section className={styles.productsHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Premium Cleaning Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover our comprehensive range of commercial-grade hospitality amenities and highly effective cleaning products.
          </motion.p>
        </div>
      </section>

      <section className={styles.listingSection}>
        <div className="container">
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>Loading products...</div>
          ) : (
            <motion.div 
              className={styles.productGrid}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {products.map((prod) => (
                <motion.div 
                  className={styles.productCard} 
                  key={prod.id}
                  variants={fadeUp}
                >
                  <div className={styles.imgWrapper}>
                    <img src={prod.image} alt={prod.name} className={styles.productImage} />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{prod.name}</h3>
                    <p className={styles.productDesc}>{prod.shortDesc}</p>
                    <Link href={`/products/${prod.id}`} className="text-gold caption">
                      Discover More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

