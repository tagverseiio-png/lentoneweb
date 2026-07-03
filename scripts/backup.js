const fs = require('fs');
const path = require('path');
const https = require('https');

const productsData = [
  {
    id: "luxury-floor-cleaner",
    name: "Luxury Floor Cleaning Liquid",
    shortDesc: "Luxury Fragrance, Long Lasting Freshness, Commercial Grade",
    fullDesc: "Our Luxury Floor Cleaning Liquid is formulated specifically for high-end hospitality environments. It effortlessly removes tough dirt while leaving behind a premium, long-lasting fragrance that elevates the ambiance of your space. Safe for use on all types of hard floors including marble, granite, tiles, and polished concrete.",
    features: [
      "Luxury Long-Lasting Fragrance",
      "Commercial & Hotel Grade Strength",
      "Removes Tough Dirt & Grime",
      "Safe on All Hard Floors",
      "Leaves No Sticky Residue"
    ],
    usage: "Dilute 20ml in 4 liters of water. Mop the floor as usual. No need to rinse.",
    packSizes: ["5L Cans", "20L Bulk Drums"],
    specs: {
      "Appearance": "Clear Colored Liquid",
      "pH Level": "Neutral (6.5 - 7.5)",
      "Shelf Life": "24 Months",
      "Application": "Floor Mopping / Auto Scrubbers"
    },
    image: "https://images.unsplash.com/photo-1584820927498-cafe8c106093?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "dishwash-gel",
    name: "Dishwash Gel",
    shortDesc: "Cuts Grease, Rich Foam, Pleasant Fragrance, Gentle on Hands",
    fullDesc: "Designed for commercial kitchens, our Dishwash Gel tackles the toughest grease and baked-on food residues. The highly concentrated formula produces a rich, long-lasting foam that cleans effectively while remaining surprisingly gentle on hands during manual washing.",
    features: [
      "Heavy-Duty Grease Cutting",
      "Rich, Stable Foam",
      "Pleasant Citrus Fragrance",
      "Gentle & Safe on Hands",
      "Easy Rinsing Formula"
    ],
    usage: "Use 10ml in a small bowl of water. Dip sponge and wash utensils. Rinse thoroughly with water.",
    packSizes: ["5L Cans", "20L Bulk Drums"],
    specs: {
      "Appearance": "Thick Gel",
      "pH Level": "Balanced (6.0 - 7.0)",
      "Shelf Life": "24 Months",
      "Application": "Manual Dishwashing"
    },
    image: "https://images.unsplash.com/photo-1585659722983-38ca8e89f664?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "premium-hand-wash",
    name: "Lentone Special Series Hand Wash",
    shortDesc: "Rich Foam, Soft on Skin, Luxury Fragrance, Moisturizing Formula",
    fullDesc: "Elevate your guest experience with the Lentone Special Series Hand Wash. Crafted with premium moisturizers and a sophisticated luxury fragrance, this hand wash cleans effectively while leaving hands feeling soft, hydrated, and pleasantly scented.",
    features: [
      "Luxurious Rich Lather",
      "Moisturizing & Soft on Skin",
      "Signature Premium Fragrance",
      "Gentle Cleansing Action",
      "Ideal for Hotel Bathrooms"
    ],
    usage: "Apply a small amount to wet hands, lather thoroughly, and rinse well.",
    packSizes: ["5L Refill Cans", "500ml Dispenser Bottles"],
    specs: {
      "Appearance": "Pearlized Liquid",
      "pH Level": "Skin Friendly (5.5 - 6.5)",
      "Shelf Life": "36 Months",
      "Application": "Hand Cleansing"
    },
    image: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "dining-disinfectant",
    name: "Restaurant Table & Dining Disinfectant",
    shortDesc: "Food Contact Safe, Kills Germs, Quick Dry, No Sticky Residue",
    fullDesc: "Maintain impeccable hygiene standards in your dining areas. This fast-acting disinfectant is specifically formulated for restaurant tables and food prep surfaces. It kills 99.9% of germs, dries quickly without leaving any sticky residue, and is safe for food contact surfaces once dry.",
    features: [
      "Food Contact Surface Safe",
      "Kills 99.9% of Bacteria & Germs",
      "Quick Drying Formula",
      "Leaves No Sticky Residue",
      "Neutral Odor Profile"
    ],
    usage: "Spray directly onto the surface. Wipe clean with a microfiber cloth or paper towel. Allow to air dry.",
    packSizes: ["5L Cans", "500ml Spray Bottles"],
    specs: {
      "Appearance": "Clear Liquid",
      "Action Time": "30-60 Seconds",
      "Shelf Life": "24 Months",
      "Application": "Surface Disinfection"
    },
    image: "https://images.unsplash.com/photo-1595188846175-c08170c91bd7?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "car-wash-shampoo",
    name: "Premium Car Wash Shampoo",
    shortDesc: "High Foam, Gloss Finish, Paint Safe, Professional Grade",
    fullDesc: "A professional-grade car wash shampoo formulated for automotive detailers and commercial car wash stations. It generates thick, clinging foam that safely lifts dirt and road grime without stripping wax or sealants, leaving a brilliant gloss finish.",
    features: [
      "High Foaming Action",
      "Enhances Paint Gloss",
      "Safe on Wax & Ceramic Coatings",
      "Professional Grade Cleaning",
      "Easy Rinse Formula"
    ],
    usage: "Dilute 50ml in 10 liters of water. Wash vehicle from top to bottom. Rinse thoroughly and dry.",
    packSizes: ["5L Cans", "20L Bulk Drums"],
    specs: {
      "Appearance": "Thick Liquid",
      "pH Level": "Neutral (Safe for paint)",
      "Shelf Life": "24 Months",
      "Application": "Automotive Cleaning"
    },
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "premium-toilet-cleaner",
    name: "Premium Toilet Cleaner",
    shortDesc: "Removes Hard Stains, Odour Control, Powerful Cleaning",
    fullDesc: "A highly effective, thick formula designed to tackle the toughest hard water stains and scale build-up in commercial restrooms. It clings to the bowl for maximum cleaning power while leaving a long-lasting, fresh fragrance.",
    features: [
      "Removes Stubborn Hard Water Stains",
      "Thick Clinging Formula",
      "Powerful Odor Control",
      "Long-Lasting Freshness",
      "Kills Germs & Bacteria"
    ],
    usage: "Apply directly under the toilet bowl rim. Leave for 15-20 minutes. Brush lightly and flush.",
    packSizes: ["5L Refill Cans", "750ml Angular Bottles"],
    specs: {
      "Appearance": "Thick Colored Liquid",
      "Action Type": "Acidic Cleaner",
      "Shelf Life": "24 Months",
      "Application": "Toilet Bowl Cleaning"
    },
    image: "https://images.unsplash.com/photo-1584820926521-127e38a2e2d5?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "platinum-plus-phenyl",
    name: "Platinum Plus Phenyl",
    shortDesc: "Commercial Grade, Strong Disinfection, Pleasant Fragrance",
    fullDesc: "Our heavy-duty Platinum Plus Phenyl provides robust disinfection for high-traffic commercial spaces. It effectively eliminates pathogens while masking unpleasant odors with a strong, pleasant fragrance, maintaining a highly hygienic environment.",
    features: [
      "Commercial Grade Disinfection",
      "Strong Odor Masking",
      "Effective Germ Kill Rate",
      "Highly Concentrated",
      "Ideal for High-Traffic Areas"
    ],
    usage: "Dilute 50ml in 1 liter of water for heavy cleaning, or 20ml per liter for regular mopping.",
    packSizes: ["5L Cans", "20L Bulk Drums"],
    specs: {
      "Appearance": "Milky/Colored Emulsion",
      "Active Content": "High concentration",
      "Shelf Life": "24 Months",
      "Application": "General Floor Disinfection"
    },
    image: "https://images.unsplash.com/photo-1595188846175-c08170c91bd7?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "hotel-toothbrush",
    name: "Premium Hotel Toothbrush",
    shortDesc: "Premium Packaging, Soft Bristles, Elegant Design",
    fullDesc: "Enhance your guest's stay with our premium hotel toothbrushes. Featuring soft, rounded bristles for comfortable brushing and an elegant handle design. Packaged in luxury, eco-friendly or standard premium wrapping tailored to your hotel's aesthetic.",
    features: [
      "Soft, Rounded Bristles",
      "Elegant Handle Design",
      "Luxury Presentation Packaging",
      "Custom Branding Available",
      "High-Quality Materials"
    ],
    usage: "Guest amenity for daily dental hygiene.",
    packSizes: ["Cartons of 500 pcs", "Cartons of 1000 pcs"],
    specs: {
      "Material": "Premium Plastic/Bamboo options",
      "Bristle Type": "Soft",
      "Packaging": "Box/Sachet wrap",
      "Application": "Guest Amenities"
    },
    image: "https://images.unsplash.com/photo-1559868723-5e9a4f475143?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "hotel-toothpaste",
    name: "Premium Hotel Toothpaste",
    shortDesc: "Premium Tube, Fresh Mint, Fluoride Formula",
    fullDesc: "Our premium guest toothpaste delivers a refreshing mint flavor and effective cleaning power. The compact, elegantly designed tubes are perfectly sized for short stays, complementing our premium toothbrush offerings for a complete dental kit.",
    features: [
      "Refreshing Mint Flavor",
      "Contains Cavity-Fighting Fluoride",
      "Premium Tube Design",
      "Perfect Guest Size (10g - 20g)",
      "Tamper-Evident Seal"
    ],
    usage: "Apply a pea-sized amount to toothbrush and brush thoroughly.",
    packSizes: ["Cartons of 500 pcs", "Cartons of 1000 pcs"],
    specs: {
      "Flavor": "Fresh Mint",
      "Weight": "15g per tube",
      "Shelf Life": "36 Months",
      "Application": "Guest Amenities"
    },
    image: "https://images.unsplash.com/photo-1559868723-5e9a4f475143?auto=format&fit=crop&w=1000&q=80"
  }
];

const backupDir = path.join(__dirname, '../backup');
const photosDir = path.join(__dirname, '../public/backup_images');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
if (!fs.existsSync(photosDir)) {
  fs.mkdirSync(photosDir, { recursive: true });
}

// Save text data to JSON backup
fs.writeFileSync(
  path.join(backupDir, 'backup_data.json'),
  JSON.stringify(productsData, null, 2)
);
console.log('Saved products text backup to backup/backup_data.json');

// Download photo helper
function downloadPhoto(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

// Download photos sequentially
async function runBackup() {
  console.log('Starting image downloads...');
  for (const product of productsData) {
    const filename = `${product.id}.jpg`;
    const filepath = path.join(photosDir, filename);
    try {
      console.log(`Downloading ${product.name} image...`);
      await downloadPhoto(product.image, filepath);
      console.log(`Downloaded image saved to public/backup_images/${filename}`);
    } catch (err) {
      console.error(`Failed to download image for ${product.id}:`, err.message);
    }
  }
  console.log('Backup process completed!');
}

runBackup();
