import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { type, name, email, phone, details } = data;

    if (!type || !name || !email || !phone) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "enquiries"), {
      type, // 'contact' | 'distributor' | 'private-label' | 'bulk-orders'
      name,
      email,
      phone,
      details: details || {},
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Failed to submit enquiry:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const enquiries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    return NextResponse.json({ error: "Failed to fetch enquiries" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await deleteDoc(doc(db, "enquiries", id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete enquiry:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
