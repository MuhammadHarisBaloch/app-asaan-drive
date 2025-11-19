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

    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(process.env.APPWRITE_PROJECT_ID!);

    const storage = new Storage(client);

    // Sabhi files upload karein
    const uploadPromises = files.map(async (file) => {
      // File object recreate karein
      const arrayBuffer = await file.arrayBuffer();
      const newFile = new File([arrayBuffer], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });

      const result = await storage.createFile(
        process.env.APPWRITE_BUCKET_ID!,
        ID.unique(),
        newFile // File object pass karein
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
