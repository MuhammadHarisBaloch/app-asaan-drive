// features/storage/StorageService.ts
class StorageService {
  async uploadFile(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      return result.fileId;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }

  async uploadMultipleFiles(files: File[]): Promise<string[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/upload-multiple", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();
      return result.files.map((file: any) => file.fileId);
    } catch (error) {
      console.error("Multiple upload error:", error);
      throw error;
    }
  }

  async downloadFile(fileId: string): Promise<string> {
    try {
      // ✅ Correct IDs use karein
      return `https://nyc.cloud.appwrite.io/v1/storage/buckets/68bb42e2001557c9125f/files/${fileId}/view?project=68bb42450007bbaf128a`;
    } catch (error) {
      console.error("Download error:", error);
      throw error;
    }
  }

  static shared = new StorageService();
}

export default StorageService;
