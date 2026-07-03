import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    
    if (page) {
      const docRef = doc(db, "seo", page);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return NextResponse.json({ page, ...docSnap.data() });
      }
      // Return default if not set
      return NextResponse.json({
        page,
        title: "LENTONE | Premium Hospitality & Cleaning Solutions",
        description: "Indian manufacturer of premium-quality hospitality amenities and cleaning solutions serving hotels, restaurants, offices, and commercial businesses.",
        keywords: "hospitality, amenities, cleaning solutions, floor cleaner, hand wash, hotel supply"
      });
    }
    
    const colRef = collection(db, "seo");
    const snapshot = await getDocs(colRef);
    const seoData = snapshot.docs.map(doc => ({
      page: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(seoData);
  } catch (error) {
    console.error("Fetch SEO error:", error);
    return NextResponse.json({ error: "Failed to fetch SEO configurations" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { page, title, description, keywords } = await req.json();
    if (!page || !title || !description) {
      return NextResponse.json({ error: "Page, title and description are required" }, { status: 400 });
    }

    const docRef = doc(db, "seo", page);
    const seoData = {
      title,
      description,
      keywords: keywords || "",
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, seoData, { merge: true });

    return NextResponse.json({ page, ...seoData });
  } catch (error) {
    console.error("Update SEO error:", error);
    return NextResponse.json({ error: "Failed to update SEO configuration" }, { status: 500 });
  }
}
