import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { productsData } from "@/data/products";
export async function GET(
  req: Request,
  context: any
) {
  try {
    const { id } = await context.params;
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    let product = null;
    if (docSnap.exists()) {
      product = { id: docSnap.id, ...docSnap.data() };
    } else {
      product = productsData.find(p => p.id === id) || null;
    }

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
