// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client, ID, Storage } from "appwrite";

export async function POST(request: NextRequest) {
  let response;

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

    console.log("🔧 Environment variables:", {
      endpoint: endpoint ? "Set" : "Missing",
      projectId: projectId ? "Set" : "Missing",
      bucketId: bucketId ? "Set" : "Missing",
    });

    if (!endpoint || !projectId || !bucketId) {
      console.error("❌ Missing environment variables");
      return NextResponse.json(
        { error: "Server configuration error - missing environment variables" },
        { status: 500 }
      );
    }

    // Initialize Appwrite client
    const client = new Client().setEndpoint(endpoint).setProject(projectId);

    const storage = new Storage(client);

    console.log("🚀 Uploading to Appwrite...", {
      bucketId: bucketId,
      endpoint: endpoint.replace(/\/v1$/, ""), // Hide /v1 for security
    });

    // Upload file to Appwrite
    const result = await storage.createFile(bucketId, ID.unique(), file);

    console.log("✅ File uploaded to Appwrite:", result.$id);

    // Get file view URL
    const fileUrl = await storage.getFileView(bucketId, result.$id);
    const fileUrlString = fileUrl.toString();

    console.log("🔗 File URL generated:", fileUrlString);

    response = NextResponse.json({
      success: true,
      fileId: result.$id,
      fileUrl: fileUrlString,
    });
  } catch (error: any) {
    console.error("💥 Upload API error:", {
      message: error.message,
      code: error.code,
      type: error.type,
      stack: error.stack,
    });

    let errorMessage = "Upload failed";
    let statusCode = 500;

    if (error.code === 401) {
      errorMessage = "Invalid Appwrite credentials - check PROJECT_ID";
      statusCode = 500;
    } else if (error.code === 404) {
      errorMessage = "Storage bucket not found - check BUCKET_ID";
      statusCode = 500;
    } else if (
      error.message.includes("fetch") ||
      error.message.includes("network")
    ) {
      errorMessage = "Cannot connect to Appwrite - check ENDPOINT";
      statusCode = 500;
    } else {
      errorMessage = error.message || "Unknown error occurred";
    }

    response = NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }

  // Add CORS headers to ensure proper response
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Content-Type", "application/json");

  return response;
}

// Add OPTIONS method for CORS preflight
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
