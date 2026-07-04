export type DefaultContentItem = {
  id: string;
  page: string;
  section: string;
  content: string;
  label: string;
  type: "text" | "textarea" | "image";
};

export const defaultPageContent: DefaultContentItem[] = [
  // GLOBAL
  { id: "global_phone", page: "global", section: "phone", label: "Phone Numbers", type: "text", content: "+91 6374580424, +91 99419 68238" },
  { id: "global_email", page: "global", section: "email", label: "Email Address", type: "text", content: "lentonecp@gmail.com" },
  { id: "global_address", page: "global", section: "address", label: "Head Office Address", type: "textarea", content: "First floor, Tamil Residency layout, plot no.47, Hindustan college road, Padur, Kalipattur, Tamil Nadu 603103" },

  // HOME
  { id: "home_hero_title", page: "home", section: "hero_title", label: "Hero Title", type: "text", content: "Formulating Excellence." },
  { id: "home_hero_subtitle", page: "home", section: "hero_subtitle", label: "Hero Subtitle", type: "textarea", content: "Premium hospitality amenities and commercial cleaning solutions crafted for industry leaders. Direct from our manufacturing facility to your establishment." },
  { id: "home_hero_image", page: "home", section: "hero_image", label: "Hero Image", type: "image", content: "/backup_images/luxury-floor-cleaner.png" },
  { id: "home_why_choose_image", page: "home", section: "why_choose_image", label: "Why Choose Image", type: "image", content: "/backup_images/luxury-floor-cleaner.png" },
  { id: "home_split_title", page: "home", section: "split_title", label: "Split Section Category", type: "text", content: "The Lentone Standard" },
  { id: "home_split_subtitle", page: "home", section: "split_subtitle", label: "Split Section Title", type: "text", content: "Uncompromising Quality." },
  { id: "home_editorial_item_01_title", page: "home", section: "editorial_item_01_title", label: "Feature 01 Title", type: "text", content: "Factory Direct" },
  { id: "home_editorial_item_01_text", page: "home", section: "editorial_item_01_text", label: "Feature 01 Description", type: "textarea", content: "We eliminate wholesalers and distributors, providing you with uncompromising quality at genuine manufacturer rates." },
  { id: "home_editorial_item_02_title", page: "home", section: "editorial_item_02_title", label: "Feature 02 Title", type: "text", content: "Flexible Supply" },
  { id: "home_editorial_item_02_text", page: "home", section: "editorial_item_02_text", label: "Feature 02 Description", type: "textarea", content: "Whether you manage a boutique hotel or a nationwide chain, our production scales seamlessly to meet your exact volume requirements." },
  { id: "home_editorial_item_03_title", page: "home", section: "editorial_item_03_title", label: "Feature 03 Title", type: "text", content: "Premium Formulations" },
  { id: "home_editorial_item_03_text", page: "home", section: "editorial_item_03_text", label: "Feature 03 Description", type: "textarea", content: "Sourced from top-tier raw materials and infused with luxury fragrances to ensure your establishment leaves a lasting impression." },
  { id: "home_advantage_title", page: "home", section: "advantage_title", label: "Advantage Section Title Highlight", type: "text", content: "Simplified." },
  { id: "home_advantage_subtitle", page: "home", section: "advantage_subtitle", label: "Advantage Section Subtitle", type: "textarea", content: "We handle everything internally, giving you complete transparency, better margins, and total control over your inventory." },
  { id: "home_testimonial_text", page: "home", section: "testimonial_text", label: "Testimonial Quote", type: "textarea", content: "\"The transition to Lentone's premium cleaning line completely elevated our lobby ambiance. The fragrance profile is exceptional, and the factory-direct pricing drastically improved our operating margins.\"" },
  { id: "home_testimonial_author", page: "home", section: "testimonial_author", label: "Testimonial Author", type: "text", content: "Taj Residency Operations" },
  { id: "home_testimonial_author_sub", page: "home", section: "testimonial_author_sub", label: "Testimonial Author Role", type: "text", content: "Luxury Hotel Partner" },
  { id: "home_cta_title", page: "home", section: "cta_title", label: "CTA Banner Title", type: "text", content: "Ready to upgrade your standards?" },

  // ABOUT
  { id: "about_about_title", page: "about", section: "about_title", label: "Hero Title", type: "text", content: "About Lentone" },
  { id: "about_about_subtitle", page: "about", section: "about_subtitle", label: "Hero Subtitle", type: "textarea", content: "Manufacturing Excellence. Delivered with Trust. We are dedicated to providing premium-quality cleaning solutions meeting international expectations." },
  { id: "about_about_image", page: "about", section: "about_image", label: "About Laboratory Image", type: "image", content: "/backup_images/luxury-floor-cleaner.png" },
  { id: "about_welcome_title", page: "about", section: "welcome_title", label: "Welcome Section Title", type: "text", content: "Welcome to Lentone" },
  { id: "about_welcome_text", page: "about", section: "welcome_text", label: "Welcome Description", type: "textarea", content: "Lentone is a premier Indian manufacturer specializing in high-quality cleaning solutions and hospitality amenities. We cater directly to Hotels, Restaurants, Resorts, Corporate Offices, Educational Institutions, Hospitals, and Retail Businesses without any middlemen." },
  { id: "about_mission_text", page: "about", section: "mission_text", label: "Mission Description", type: "textarea", content: "Our mission is simple: to deliver premium-quality products that meet and exceed international expectations while remaining affordable, reliable, and strictly customer-focused. By controlling the entire manufacturing process, we ensure consistent excellence in every drop." },
  { id: "about_presence_head_office", page: "about", section: "presence_head_office", label: "Head Office Location", type: "text", content: "Chennai, Tamil Nadu" },
  { id: "about_presence_branch_office", page: "about", section: "presence_branch_office", label: "Branch Office Location", type: "text", content: "Kannur, Kerala" },

  // PRIVATE LABEL (OEM)
  { id: "private-label_pl_title", page: "private-label", section: "pl_title", label: "Hero Title", type: "text", content: "Private Label & OEM Manufacturing" },
  { id: "private-label_pl_subtitle", page: "private-label", section: "pl_subtitle", label: "Hero Subtitle", type: "textarea", content: "Launch your own brand of premium cleaning solutions. We handle the manufacturing, you handle the selling." },

  // BULK ORDERS
  { id: "bulk-orders_bulk_title", page: "bulk-orders", section: "bulk_title", label: "Hero Title", type: "text", content: "Bulk & Institutional Orders" },
  { id: "bulk-orders_bulk_subtitle", page: "bulk-orders", section: "bulk_subtitle", label: "Hero Subtitle", type: "textarea", content: "Direct factory pricing for hotels, hospitals, offices, and commercial establishments." },

  // DISTRIBUTOR
  { id: "distributor_dist_title", page: "distributor", section: "dist_title", label: "Hero Title", type: "text", content: "Become a Lentone Distributor" },
  { id: "distributor_dist_subtitle", page: "distributor", section: "dist_subtitle", label: "Hero Subtitle", type: "textarea", content: "Join our growing network of distribution partners across India. Exceptional margins and dedicated brand support." },

  // CONTACT
  { id: "contact_contact_title", page: "contact", section: "contact_title", label: "Hero Title", type: "text", content: "Contact Us" },
  { id: "contact_contact_subtitle", page: "contact", section: "contact_subtitle", label: "Hero Subtitle", type: "textarea", content: "Have questions or need a custom quote? Reach out to our manufacturing team directly." },

  // FAQ
  { id: "faq_faq_title", page: "faq", section: "faq_title", label: "Hero Title", type: "text", content: "Frequently Asked Questions" },
  { id: "faq_faq_subtitle", page: "faq", section: "faq_subtitle", label: "Hero Subtitle", type: "textarea", content: "Find answers to common questions about our products, bulk ordering, and OEM manufacturing." },

  // PRIVACY POLICY
  { id: "privacy-policy_title", page: "privacy-policy", section: "title", label: "Page Title", type: "text", content: "Privacy Policy" },
  { id: "privacy-policy_subtitle", page: "privacy-policy", section: "subtitle", label: "Page Subtitle", type: "textarea", content: "How we collect, use, and protect your information." },

  // TERMS
  { id: "terms_title", page: "terms", section: "title", label: "Page Title", type: "text", content: "Terms & Conditions" },
  { id: "terms_subtitle", page: "terms", section: "subtitle", label: "Page Subtitle", type: "textarea", content: "Terms governing the use of Lentone products and website." },

  // REFUND
  { id: "refund_title", page: "refund", section: "title", label: "Page Title", type: "text", content: "Refund Policy" },
  { id: "refund_subtitle", page: "refund", section: "subtitle", label: "Page Subtitle", type: "textarea", content: "Our policy regarding returns, refunds, and replacements." }
];
