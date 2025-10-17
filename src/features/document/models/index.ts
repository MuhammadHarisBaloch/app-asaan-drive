// src/features/document/models/index.ts
export type DocumentStatus = "Pending" | "Verified" | "Rejected";

export interface DocumentModel {
  id?: string;
  userId: string;
  documentType: "CNIC-Front" | "CNIC-Back" | "License" | "Other";
  fileUrl: string;
  status: DocumentStatus;
  uploadedAt: string; // ISO string
  reviewedAt?: string;
  reviewerId?: string;
  remarks?: string;
}
