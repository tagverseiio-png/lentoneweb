import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { unstable_cache } from "next/cache";

import { productsData } from "@/data/products";

const getCachedSingleProduct = unstable_cache(
  async (id: string) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const local = productsData.find(p => p.id === id);
      return local || null;
    }
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
        "Cache-Control": "no-store, max-age=0, must-revalidate"
      }
    });
  } catch (error) {
    console.error("Get product details error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
