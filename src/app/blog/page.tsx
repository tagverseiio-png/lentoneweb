"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

export default function BlogPage() {
  const posts = [
    {
      id: "hospitality-hygiene-standards",
      title: "Maintaining 5-Star Hygiene Standards in Hotels",
      excerpt: "Discover the critical areas of hotel hygiene that impact guest satisfaction and how premium cleaning chemicals ensure consistent results.",
      category: "Hospitality",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "understanding-ph-levels",
      title: "Why pH Levels Matter in Commercial Cleaning",
      excerpt: "A technical deep dive into how the pH level of your cleaning agents affects different surfaces like marble, wood, and ceramic.",
      category: "Technical",
      image: "https://images.unsplash.com/photo-1530533718750-25255447a126?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "cost-effective-bulk-buying",
      title: "The Economics of Bulk Buying for Facility Management",
      excerpt: "How shifting from retail cleaning products to concentrated commercial chemicals can reduce your facility's operational costs by 40%.",
      category: "Business",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "eco-friendly-amenities",
      title: "Transitioning to Eco-Friendly Guest Amenities",
      excerpt: "Explore the growing trend of sustainable hotel amenities and how bamboo toothbrushes are changing the guest experience.",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <>
      <section className={styles.blogHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Knowledge Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Industry insights, hygiene best practices, and product guides for the hospitality and commercial cleaning sectors.
          </motion.p>
        </div>
      </section>

      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.filterNav}>
            <button className={`${styles.filterBtn} ${styles.active}`}>All Articles</button>
            <button className={styles.filterBtn}>Hospitality</button>
            <button className={styles.filterBtn}>Technical</button>
            <button className={styles.filterBtn}>Business</button>
            <button className={styles.filterBtn}>Sustainability</button>
          </div>

          <motion.div 
            className={styles.blogGrid}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.article key={post.id} className={styles.blogCard} variants={fadeUp}>
                <img src={post.image} alt={post.title} className={styles.blogImage} />
                <div className={styles.blogContent}>
                  <span className={styles.blogCategory}>{post.category}</span>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <Link href={`#`} className={styles.readMore}>
                    Read Article &rarr;
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
