// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client, Storage, ID } from "appwrite";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Appwrite client setup
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.APPWRITE_PROJECT_ID!);

    const storage = new Storage(client);

    // File object recreate karein with all required properties
    const arrayBuffer = await file.arrayBuffer();

    // New File object banayein with original properties
    const newFile = new File([arrayBuffer], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    // Direct file object pass karein
    const result = await storage.createFile(
      process.env.APPWRITE_BUCKET_ID!,
      ID.unique(),
      newFile // File object pass karein
    );

    return NextResponse.json({
      success: true,
      fileId: result.$id,
      fileName: file.name,
    });
  } catch (error: any) {
    console.error("Appwrite upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
