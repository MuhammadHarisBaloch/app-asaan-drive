// lib/upload.ts
export const uploadToAppwrite = async (
  file: File
): Promise<{
  fileId: string;
  fileUrl: string;
  fileName: string;
}> => {
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

  return response.json();
};

export const uploadMultipleToAppwrite = async (
  files: File[]
): Promise<{
  files: Array<{ fileId: string; fileUrl: string; fileName: string }>;
}> => {
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

  return response.json();
};
