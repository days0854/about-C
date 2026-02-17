/**
 * Type definitions for the certificate platform
 */

// Certificate status
export type CertificateStatus = 'draft' | 'issued' | 'revoked';

// Template categories
export type TemplateCategory = 'academic' | 'professional' | 'achievement' | 'participation';

// Certificate data interface
export interface Certificate {
  id: string;
  recipientName: string;
  courseTitle: string;
  completionDate: string;
  issuerName: string;
  certificateId: string;
  templateId: string;
  status: CertificateStatus;
  createdAt: string;
}

// Certificate template interface
export interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  category: TemplateCategory;
}

// User interface
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
}

// Dashboard stats
export interface DashboardStats {
  totalCertificates: number;
  issuedThisMonth: number;
  activeTemplates: number;
}
