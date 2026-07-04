import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { unstable_cache, revalidateTag } from "next/cache";

import { defaultPageContent } from "@/data/defaultPageContent";

const getCachedContent = unstable_cache(
  async () => {
    const colRef = collection(db, "pageContent");
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      for (const item of defaultPageContent) {
        const docRef = doc(db, "pageContent", item.id);
        await setDoc(docRef, item);
      }
      const seededSnap = await getDocs(colRef);
      return seededSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },
  ["page-content-list"],
  { revalidate: 3600, tags: ["content"] }
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageFilter = searchParams.get("page");

    let content = await getCachedContent();

    if (pageFilter) {
      content = content.filter((item: any) => item.page === pageFilter || item.page === "global");
    }

    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate"
      }
    });
  } catch (error) {
    console.error("Fetch content error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { page, section, content, label, type } = await req.json();
    if (!page || !section) {
      return NextResponse.json({ error: "Page and section are required" }, { status: 400 });
    }

    const docId = `${page}_${section}`;
    const docRef = doc(db, "pageContent", docId);
    
    const updatedData = {
      page,
      section,
      content: content || "",
      label: label || section,
      type: type || "text",
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, updatedData, { merge: true });

    // Invalidate content cache
    revalidateTag("content", "max");

    return NextResponse.json({ id: docId, ...updatedData });
  } catch (error) {
    console.error("Update content error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // e.g. "home_hero_title"
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteDoc(doc(db, "pageContent", id));

    // Invalidate content cache
    revalidateTag("content", "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete content error:", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
