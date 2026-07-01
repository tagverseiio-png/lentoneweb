"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./WhatsAppCTA.module.css";

export default function WhatsAppCTA() {
  return (
    <motion.a
      href="https://wa.me/916374580424"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappBtn}
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <MessageCircle size={32} />
    </motion.a>
  );
}
