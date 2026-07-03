"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import styles from "./page.module.css";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/content?page=faq")
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

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Do you supply directly to hotels or through distributors?",
      a: "We do both. For large hotel chains and institutional buyers, we supply directly from our factory to ensure the best pricing and service. For smaller requirements, we have a wide network of authorized distributors across India."
    },
    {
      q: "What is the Minimum Order Quantity (MOQ) for bulk orders?",
      a: "Our standard MOQ for direct bulk pricing is ₹50,000 per order, which can be a mix of different products. For customized or private label products, the MOQ depends on the specific packaging and formulation requirements."
    },
    {
      q: "Are your cleaning chemicals safe for marble and granite floors?",
      a: "Yes, our Luxury Floor Cleaning Liquid is pH-neutral and specially formulated to be safe on delicate natural stones like marble and granite, while still providing powerful cleaning action."
    },
    {
      q: "Do you offer private labeling for guest amenities?",
      a: "Absolutely. We offer comprehensive OEM/Private Label services for hotel amenities, including toothbrushes, toothpaste, soaps, and room sprays. We can customize the packaging to feature your hotel's logo and branding."
    },
    {
      q: "Can I get samples before placing a bulk order?",
      a: "Yes, we encourage testing our products. You can request a sample kit through our Contact Us page. Please mention your business details and the specific products you are interested in."
    },
    {
      q: "What is the shelf life of your products?",
      a: "Most of our cleaning liquids and gels have a shelf life of 24 months from the date of manufacture. Our guest amenities typically have a shelf life of 36 months. Please check the label on individual products for specific details."
    }
  ];

  return (
    <>
      <section className={styles.faqHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {content.faq_title || "Frequently Asked Questions"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {content.faq_subtitle || "Find answers to common questions about our products, bulk ordering, and distribution network."}
          </motion.p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container">
          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className={styles.faqItem}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button 
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openIndex === index}
                >
                  {faq.q}
                  <ChevronDown className={`${styles.faqIcon} ${openIndex === index ? styles.open : ""}`} size={20} />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`${styles.faqAnswer} ${styles.open}`}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
