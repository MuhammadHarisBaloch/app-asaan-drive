// src/features/storage/index.ts
import { Client, ID, Storage, AppwriteException } from "appwrite";

class StorageService {
  static shared = new StorageService();
  private client: Client;
  private storage: Storage;
  private BUCKET_ID: string;

  constructor() {
    const endpoint = this.getEndpoint();
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const bucketId = process.env.NEXT_PUBLIC_VEHICLE_BUCKET_ID;

    if (!endpoint || !projectId || !bucketId) {
      console.error("Appwrite configuration missing:", {
        endpoint: !!endpoint,
        projectId: !!projectId,
        bucketId: !!bucketId,
      });
      throw new Error("Storage service configuration error");
    }

    console.log("Initializing Appwrite client with endpoint:", endpoint);

    this.client = new Client().setEndpoint(endpoint).setProject(projectId);

    this.storage = new Storage(this.client);
    this.BUCKET_ID = bucketId;
  }

  private getEndpoint(): string {
    // Use custom domain if available, fallback to default
    const customEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;

    if (customEndpoint && customEndpoint.includes("yourdomain.com")) {
      return customEndpoint;
    }

    // Fallback for development
    return process.env.NODE_ENV === "development"
      ? "http://localhost/v1" // For self-hosted Appwrite
      : "https://cloud.appwrite.io/v1"; // Default Appwrite cloud
  }

  async uploadFile(file: File): Promise<string> {
    try {
      console.log(
        "Uploading to Appwrite endpoint:",
        this.client.config.endpoint
      );

      const res = await this.storage.createFile(
        this.BUCKET_ID,
        ID.unique(),
        file
      );

      return res.$id;
    } catch (error: any) {
      console.error("Appwrite upload failed:", {
        endpoint: this.client.config.endpoint,
        error: error.message,
        type: error.type,
        code: error.code,
      });

      throw new Error(`Upload failed: ${error.message}`);
    }
  }

  async downloadFile(id: string): Promise<string> {
    try {
      const result = await this.storage.getFileView(this.BUCKET_ID, id);
      return result.toString();
    } catch (error: any) {
      console.error("Appwrite download failed:", error);
      throw new Error(`Failed to get file URL: ${error.message}`);
    }
  }
}

export default StorageService;
