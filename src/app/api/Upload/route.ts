// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client, ID, Storage } from "appwrite";

export async function POST(request: NextRequest) {
  try {
    console.log("📨 Upload API called");

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.log("❌ No file received");
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log("📁 File received:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Validate environment variables
    const endpoint = process.env.APPWRITE_ENDPOINT;
    const projectId = process.env.APPWRITE_PROJECT_ID;
    const bucketId = process.env.VEHICLE_BUCKET_ID;

    if (!endpoint || !projectId || !bucketId) {
      console.error("❌ Missing environment variables:", {
        endpoint: !!endpoint,
        projectId: !!projectId,
        bucketId: !!bucketId,
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Initialize Appwrite client
    const client = new Client().setEndpoint(endpoint).setProject(projectId);

    const storage = new Storage(client);

    console.log("🚀 Uploading to Appwrite...");

    // Upload file to Appwrite
    const result = await storage.createFile(bucketId, ID.unique(), file);

    console.log("✅ File uploaded to Appwrite:", result.$id);

    // Get file view URL
    const fileUrl = await storage.getFileView(bucketId, result.$id);
    const fileUrlString = fileUrl.toString();

    console.log("🔗 File URL generated:", fileUrlString);

    return NextResponse.json({
      success: true,
      fileId: result.$id,
      fileUrl: fileUrlString,
    });
  } catch (error: any) {
    console.error("💥 Upload API error:", {
      message: error.message,
      code: error.code,
      type: error.type,
    });

    let errorMessage = "Upload failed";
    if (error.code === 401) {
      errorMessage = "Invalid Appwrite credentials";
    } else if (error.code === 404) {
      errorMessage = "Storage bucket not found";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
