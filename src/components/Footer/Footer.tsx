import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        {/* About Section */}
        <div className={styles.footerCol}>
          <Link href="/" className={styles.footerLogo}>
            <Image src="/logo.png" alt="Lentone Logo" width={64} height={64} style={{ objectFit: "contain" }} />
          </Link>
          <p className={styles.footerDesc}>
            Indian manufacturer of premium-quality hospitality amenities and cleaning solutions serving hotels, restaurants, offices, and commercial businesses.
          </p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">Fb</a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">Ig</a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">In</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.footerCol}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/distributor">Become a Distributor</Link></li>
            <li><Link href="/bulk-orders">Bulk Orders</Link></li>
            <li><Link href="/private-label">Private Label / OEM</Link></li>
            <li><Link href="/blog">Knowledge Center</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div className={styles.footerCol}>
          <h4 className={styles.colTitle}>Our Products</h4>
          <ul className={styles.footerLinks}>
            <li><Link href="/products/luxury-floor-cleaner">Luxury Floor Cleaner</Link></li>
            <li><Link href="/products/dishwash-gel">Dishwash Gel</Link></li>
            <li><Link href="/products/premium-hand-wash">Premium Hand Wash</Link></li>
            <li><Link href="/products/dining-disinfectant">Dining Disinfectant</Link></li>
            <li><Link href="/products/car-wash-shampoo">Car Wash Shampoo</Link></li>
            <li><Link href="/products">View All Products</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.footerCol}>
          <h4 className={styles.colTitle}>Contact Us</h4>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={18} className={styles.contactIcon} />
              <span><strong>Head Office:</strong> First floor, Tamil Residency layout, plot no.47, Hindustan college road, Padur, Kalipattur, Tamil Nadu 603103</span>
            </li>
            <li>
              <Phone size={18} className={styles.contactIcon} />
              <span>+91 6374580424<br/>+91 99419 68238</span>
            </li>
            <li>
              <Mail size={18} className={styles.contactIcon} />
              <span>lentonecp@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>
      
      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomContainer}`}>
          <p>&copy; {new Date().getFullYear()} Lentone. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/refund">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
