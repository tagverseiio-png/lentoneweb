import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


import { productsData } from "@/data/products";

let cachedProducts: any[] | null = null;

export async function GET() {
  try {
    if (cachedProducts && cachedProducts.length > 0) {
      return NextResponse.json(cachedProducts, {
        headers: {
          "Cache-Control": "no-store, max-age=0, must-revalidate"
        }
      });
    }

    const colRef = collection(db, "products");
    const snapshot = await getDocs(colRef);

    let products;
    if (snapshot.empty) {
      for (const prod of productsData) {
        const docRef = doc(db, "products", prod.id);
        await setDoc(docRef, prod);
      }
      const seededSnap = await getDocs(colRef);
      products = seededSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    } else {
      products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    cachedProducts = products;

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate"
      }
    });
  } catch (error: any) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const docId = data.id || data.slug || Math.random().toString(36).substring(7);
    
    let featuresArray = [];
    if (Array.isArray(data.features)) {
      featuresArray = data.features;
    } else if (typeof data.features === "string") {
      featuresArray = data.features.split(",").map((f: string) => f.trim()).filter(Boolean);
    }

    const productData = {
      id: docId,
      title: data.title || data.name,
      name: data.title || data.name,
      slug: data.slug || docId,
      shortDesc: data.shortDesc || data.description || "",
      fullDesc: data.description || "",
      description: data.description || "",
      image: data.image || "",
      category: data.category || "",
      features: featuresArray,
      usage: data.usage || "",
      packSizes: Array.isArray(data.packSizes) ? data.packSizes : (data.packSizes ? data.packSizes.split(",").map((p: string) => p.trim()) : ["5L Cans"]),
      specs: data.specs || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const docRef = doc(db, "products", docId);
    await setDoc(docRef, productData);

    cachedProducts = null;

    return NextResponse.json(productData);
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { id } = data;
    if (!id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const docRef = doc(db, "products", id);
    
    let featuresArray = undefined;
    if (data.features !== undefined) {
      if (Array.isArray(data.features)) {
        featuresArray = data.features;
      } else if (typeof data.features === "string") {
        featuresArray = data.features.split(",").map((f: string) => f.trim()).filter(Boolean);
      }
    }

    const updatedData: any = {};
    if (data.title !== undefined) {
      updatedData.title = data.title;
      updatedData.name = data.title;
    }
    if (data.slug !== undefined) updatedData.slug = data.slug;
    if (data.shortDesc !== undefined) updatedData.shortDesc = data.shortDesc;
    if (data.description !== undefined) {
      updatedData.description = data.description;
      updatedData.fullDesc = data.description;
    }
    if (data.image !== undefined) updatedData.image = data.image;
    if (data.category !== undefined) updatedData.category = data.category;
    if (featuresArray !== undefined) updatedData.features = featuresArray;
    if (data.usage !== undefined) updatedData.usage = data.usage;
    if (data.packSizes !== undefined) {
      updatedData.packSizes = Array.isArray(data.packSizes) ? data.packSizes : data.packSizes.split(",").map((p: string) => p.trim());
    }
    if (data.specs !== undefined) updatedData.specs = data.specs;
    updatedData.updatedAt = new Date().toISOString();

    await setDoc(docRef, updatedData, { merge: true });
    
    cachedProducts = null;

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Product ID is required" }, { status: 400 });

    const docRef = doc(db, "products", id);
    await deleteDoc(docRef);
    
    cachedProducts = null;

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
