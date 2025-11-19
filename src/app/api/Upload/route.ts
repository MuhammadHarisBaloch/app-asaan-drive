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

    // ✅ Correct Project ID use karein
    const client = new Client()
      .setEndpoint("https://nyc.cloud.appwrite.io/v1")
      .setProject("68bb42450007bbaf128a"); // Your actual PROJECT ID

    const storage = new Storage(client);

    const arrayBuffer = await file.arrayBuffer();
    const newFile = new File([arrayBuffer], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    // ✅ Correct Bucket ID use karein
    const result = await storage.createFile(
      "68bb42e2001557c9125f", // Your actual BUCKET ID
      ID.unique(),
      newFile
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
