// src/features/storage/index.ts
import { Client, ID, Storage } from "appwrite";

class StorageService {
  static shared = new StorageService();
  private client: Client;
  private storage: Storage;
  private BUCKET_ID: string;

  constructor() {
    this.client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "");
    this.storage = new Storage(this.client);
    this.BUCKET_ID = process.env.NEXT_PUBLIC_VEHICLE_BUCKET_ID ?? "";
  }

  // backward-compatible vehicle upload
  async uploadFile(file: File): Promise<string> {
    const res = await this.storage.createFile(
      this.BUCKET_ID,
      ID.unique(),
      file
    );
    return res.$id;
  }

  // backward-compatible vehicle download -> returns view URL string
  async downloadFile(id: string): Promise<string> {
    return this.storage.getFileView(
      process.env.NEXT_PUBLIC_VEHICLE_BUCKET_ID ?? "",
      id
    ) as unknown as string;
  }

  // explicit vehicle upload (new)
  async uploadVehicleFile(file: File, vehicleId?: string): Promise<string> {
    const res = await this.storage.createFile(
      this.BUCKET_ID,
      ID.unique(),
      file
    );
    return res.$id;
  }

  // user documents (explicit)
  async uploadUserDocument(
    file: File,
    userId: string,
    docType: string
  ): Promise<string> {
    const res = await this.storage.createFile(
      this.BUCKET_ID,
      ID.unique(),
      file
    );
    return res.$id;
  }

  // get file view link
  async getFileViewUrl(fileId: string): Promise<string> {
    return (await this.storage.getFileView(
      this.BUCKET_ID,
      fileId
    )) as unknown as string;
  }

  async getFileDownloadUrl(fileId: string): Promise<string> {
    return (await this.storage.getFileDownload(
      this.BUCKET_ID,
      fileId
    )) as unknown as string;
  }
}

export default StorageService;
