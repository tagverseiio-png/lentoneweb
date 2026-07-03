import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { unstable_cache, revalidateTag } from "next/cache";

const getCachedSEOList = unstable_cache(
  async () => {
    const colRef = collection(db, "seo");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map(doc => ({
      page: doc.id,
      ...doc.data()
    }));
  },
  ["seo-list"],
  { revalidate: 3600, tags: ["seo"] }
);

const getCachedSingleSEO = unstable_cache(
  async (page: string) => {
    const docRef = doc(db, "seo", page);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  },
  ["seo-detail"],
  { revalidate: 3600, tags: ["seo"] }
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    
    if (page) {
      const data = await getCachedSingleSEO(page);
      if (data) {
        return NextResponse.json({ page, ...data }, {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600"
          }
        });
      }
      // Return default if not set
      return NextResponse.json({
        page,
        title: "LENTONE | Premium Hospitality & Cleaning Solutions",
        description: "Indian manufacturer of premium-quality hospitality amenities and cleaning solutions serving hotels, restaurants, offices, and commercial businesses.",
        keywords: "hospitality, amenities, cleaning solutions, floor cleaner, hand wash, hotel supply"
      }, {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600"
        }
      });
    }
    
    const seoData = await getCachedSEOList();
    return NextResponse.json(seoData, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600"
      }
    });
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

    // Invalidate SEO cache
    revalidateTag("seo", "max");

    return NextResponse.json({ page, ...seoData });
  } catch (error) {
    console.error("Update SEO error:", error);
    return NextResponse.json({ error: "Failed to update SEO configuration" }, { status: 500 });
  }
}
