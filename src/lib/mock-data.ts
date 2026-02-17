/**
 * Mock data for development and demonstration
 */

import { Certificate, CertificateTemplate, DashboardStats } from '@/types/certificate';

export const mockTemplates: CertificateTemplate[] = [
  {
    id: 'template-1',
    name: 'Classic Academic',
    description: 'Traditional academic certificate with elegant borders',
    thumbnail: 'https://images.pexels.com/photos/9829488/pexels-photo-9829488.jpeg',
    isPremium: false,
    category: 'academic',
  },
  {
    id: 'template-2',
    name: 'Modern Professional',
    description: 'Contemporary design for professional certifications',
    thumbnail: 'https://images.pexels.com/photos/7713438/pexels-photo-7713438.jpeg',
    isPremium: true,
    category: 'professional',
  },
  {
    id: 'template-3',
    name: 'Achievement Award',
    description: 'Bold design perfect for achievement recognition',
    thumbnail: 'https://images.pexels.com/photos/7713436/pexels-photo-7713436.jpeg',
    isPremium: false,
    category: 'achievement',
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    recipientName: 'Jane Doe',
    courseTitle: 'Advanced Artificial Intelligence',
    completionDate: '2025-10-24',
    issuerName: 'Antigravity Academy',
    certificateId: 'CERT-123456789',
    templateId: 'template-1',
    status: 'issued',
    createdAt: '2025-10-24T10:00:00Z',
  },
  {
    id: 'cert-2',
    recipientName: 'John Smith',
    courseTitle: 'Web Development Mastery',
    completionDate: '2025-09-15',
    issuerName: 'Tech Institute',
    certificateId: 'CERT-987654321',
    templateId: 'template-2',
    status: 'issued',
    createdAt: '2025-09-15T14:30:00Z',
  },
  {
    id: 'cert-3',
    recipientName: 'Alice Johnson',
    courseTitle: 'Data Science Fundamentals',
    completionDate: '2025-11-01',
    issuerName: 'Data Academy',
    certificateId: 'CERT-456789123',
    templateId: 'template-1',
    status: 'draft',
    createdAt: '2025-11-01T09:15:00Z',
  },
];

export const mockStats: DashboardStats = {
  totalCertificates: 42,
  issuedThisMonth: 12,
  activeTemplates: 8,
};
