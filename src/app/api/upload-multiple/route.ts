// app/api/upload-multiple/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client, Storage, ID } from "appwrite";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // ✅ Correct Project ID use karein
    const client = new Client()
      .setEndpoint("https://nyc.cloud.appwrite.io/v1")
      .setProject("68bb42450007bbaf128a"); // Your actual PROJECT ID

    const storage = new Storage(client);

    const uploadPromises = files.map(async (file) => {
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

      return {
        fileId: result.$id,
        fileName: file.name,
      };
    });

    const results = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      files: results,
    });
  } catch (error: any) {
    console.error("Appwrite upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
