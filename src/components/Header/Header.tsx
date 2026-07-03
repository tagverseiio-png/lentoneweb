"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo.png");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/content?page=global")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const logoItem = data.find((item: any) => item.section === "logo");
          if (logoItem && logoItem.content) {
            setLogoSrc(logoItem.content);
          }
        }
      })
      .catch(() => {});
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "OEM", path: "/private-label" },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <img src={logoSrc} alt="Lentone Logo" style={{ objectFit: "contain", width: "auto", height: "48px" }} />
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className={`${styles.navLink} ${pathname === link.path ? styles.active : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className={`btn-primary ${styles.headerCta}`}>
            Contact Us
          </Link>
        </nav>

        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} color="var(--gold)" /> : <Menu size={28} color={isScrolled ? "var(--navy)" : "var(--white)"} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              className={styles.mobileNavLink}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
