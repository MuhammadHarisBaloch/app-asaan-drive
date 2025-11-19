// src/features/storage/index.ts - CORRECTED VERSION
import { Client, ID, Storage, AppwriteException } from "appwrite";

class StorageService {
  static shared = new StorageService();
  private client: Client;
  private storage: Storage;
  private BUCKET_ID: string;

  constructor() {
    // ✅ CORRECTED: Use proper environment variable names
    const endpoint = process.env.APPWRITE_ENDPOINT;
    const projectId = process.env.APPWRITE_PROJECT_ID; // ✅ Fixed: removed underscore
    const bucketId = process.env.VEHICLE_BUCKET_ID;

    console.log("Appwrite Config Check:", {
      endpoint: endpoint ? "Set" : "Missing",
      projectId: projectId ? "Set" : "Missing",
      bucketId: bucketId ? "Set" : "Missing",
    });

    if (!endpoint || !projectId || !bucketId) {
      console.error("❌ Appwrite configuration missing:", {
        endpoint,
        projectId,
        bucketId,
      });
      throw new Error(
        "Storage service configuration error - Check environment variables"
      );
    }

    console.log("✅ Initializing Appwrite client");

    this.client = new Client().setEndpoint(endpoint).setProject(projectId);

    this.storage = new Storage(this.client);
    this.BUCKET_ID = bucketId;
  }

  async uploadFile(file: File): Promise<string> {
    try {
      console.log("📤 Uploading file to Appwrite...", {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      });

      const result = await this.storage.createFile(
        this.BUCKET_ID,
        ID.unique(),
        file
      );

      console.log("✅ File uploaded successfully:", result.$id);
      return result.$id;
    } catch (error: any) {
      console.error("❌ Appwrite upload failed:", {
        message: error.message,
        code: error.code,
        type: error.type,
      });

      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async downloadFile(id: string): Promise<string> {
    try {
      const result = await this.storage.getFileView(this.BUCKET_ID, id);
      return result.toString();
    } catch (error: any) {
      console.error("❌ Appwrite download failed:", error);
      throw new Error(`Failed to get file URL: ${error.message}`);
    }
  }
}

export default StorageService;
