"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../faq/page.module.css"; 

export default function PrivacyPolicy() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?page=privacy-policy")
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

  const defaultTitle = "Privacy Policy";
  const defaultText = `Your privacy is important to us. It is Lentone's policy to respect your privacy regarding any information we may collect from you across our website.

We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.

We don’t share any personally identifying information publicly or with third-parties, except when required to by law.

Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.`;

  return (
    <>
      <section className={styles.faqHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {content.privacy_title || defaultTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Please read our privacy policy details below.
          </motion.p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
          {isLoading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            <div style={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              {content.privacy_content || defaultText}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
