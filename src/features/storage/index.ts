import { Client, ID, Storage } from "appwrite";

class StorageService {
  static shared = new StorageService();
  private client: Client;
  private storage: Storage;
  constructor() {
    this.client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME ?? "");

    this.storage = new Storage(this.client);
  }
  async uploadFile(file: File) {
    const promise = await this.storage.createFile(
      process.env.NEXT_PUBLIC_VEHICLE_BUCKET_ID ?? "",
      ID.unique(),
      file
    );
  }
}
