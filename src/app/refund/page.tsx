"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../faq/page.module.css"; 

export default function RefundPolicy() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?page=refund")
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

  const defaultTitle = "Refund & Cancellation Policy";
  const defaultText = `Thank you for shopping at Lentone.

Because we are a manufacturer providing customized cleaning solutions and guest amenities directly to businesses, we handle returns and cancellations on a case-by-case basis:

1. Cancellations:
Orders can be cancelled before dispatch without any fee. If the order has already been shipped or if it contains customized/private labeled products that have already gone into production, cancellation is not possible.

2. Returns:
We accept returns within 7 days of delivery only if:
- The product was damaged during transit.
- The wrong product was delivered.
- The product is defective or does not meet quality specifications.

To initiate a return, please email us at lentonecp@gmail.com with your order details and photos of the issue.

3. Refunds:
Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.`;

  return (
    <>
      <section className={styles.faqHero}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {content.refund_title || defaultTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Please read our refund & cancellation policy below.
          </motion.p>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
          {isLoading ? (
            <p style={{ textAlign: "center" }}>Loading...</p>
          ) : (
            <div style={{ whiteSpace: "pre-line", lineHeight: 1.8, fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              {content.refund_content || defaultText}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
