import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
  try {
    const colRef = collection(db, "pageContent");
    const snapshot = await getDocs(colRef);
    const content = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return NextResponse.json(content);
  } catch (error) {
    console.error("Fetch content error:", error);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
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

    return NextResponse.json({ id: docId, ...updatedData });
  } catch (error) {
    console.error("Update content error:", error);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // e.g. "home_hero_title"
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteDoc(doc(db, "pageContent", id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete content error:", error);
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 });
  }
}
