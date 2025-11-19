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
      return result.fileId; // Return file ID for storage
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  }

  async downloadFile(fileId: string): Promise<string> {
    try {
      // Direct Appwrite URL generate karein (CORS issue nahi hoga download mein)
      return `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
    } catch (error) {
      console.error("Download error:", error);
      throw error;
    }
  }

  // Multiple files upload ke liye
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

  static shared = new StorageService();
}

export default StorageService;
