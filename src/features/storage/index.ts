import { Client, ID, Storage } from "appwrite";

class StorageService {
  static shared = new StorageService();
  private client: Client;
  private storage: Storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? "")
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "");

    this.storage = new Storage(this.client);
  }

  async uploadFile(file: File) {
    const promise = await this.storage.createFile(
      process.env.NEXT_PUBLIC_VEHICLE_BUCKET_ID ?? "",
      ID.unique(),
      file
    );
    return promise.$id;
  }

  async downloadFile(id: string) {
    // 68bb4d9c002f4078bf40
    const url = this.storage.getFileDownload(
      process.env.NEXT_PUBLIC_VEHICLE_BUCKET_ID ?? "",
      id
    );
    return url;
  }
}
export default StorageService;
