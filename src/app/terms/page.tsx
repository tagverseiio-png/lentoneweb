"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../faq/page.module.css"; 

export default function TermsAndConditions() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?page=terms")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const contentMap: Record<string, string> = {};
          data.forEach((item: any) => {
            contentMap[item.section] = item.content;
          });
          setContent(contentMap);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const defaultTitle = "Terms & Conditions";
  const defaultText = `Welcome to Lentone. These terms and conditions outline the rules and regulations for the use of Lentone's Website.

By accessing this website we assume you accept these terms and conditions. Do not continue to use Lentone if you do not agree to take all of the terms and conditions stated on this page.

The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company.

License: Unless otherwise stated, Lentone and/or its licensors own the intellectual property rights for all material on Lentone. All intellectual property rights are reserved. You may access this from Lentone for your own personal use subjected to restrictions set in these terms and conditions.

You must not:
- Republish material from Lentone
- Sell, rent or sub-license material from Lentone
- Reproduce, duplicate or copy material from Lentone
- Redistribute content from Lentone

This Agreement shall begin on the date hereof.`;

  return (
    <>
      <section className={styles.faqHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {content.terms_title || defaultTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Please read our terms & conditions below.
          </motion.p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
          {isLoading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            <div style={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              {content.terms_content || defaultText}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
