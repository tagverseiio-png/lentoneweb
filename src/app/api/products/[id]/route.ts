import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";

const getCachedSingleProduct = unstable_cache(
  async (id: string) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() };
  },
  ["product-detail"],
  { revalidate: 3600, tags: ["products"] }
);

export async function GET(
  req: Request,
  context: any
) {
  try {
    const { id } = await context.params;
    const product = await getCachedSingleProduct(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600"
      }
    });
  } catch (error) {
    console.error("Get product details error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
