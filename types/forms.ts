export interface PartnershipFormData {
  formType: 'partnership';
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  designation?: string;
  website?: string;
  industry?: string;
  goal?: string;
  message?: string;
}

export interface ServiceFormData {
  formType: 'service';
  firstName: string;
  lastName: string;
  email: string;
  contact?: string;
  organization?: string;
  serviceType?: string;
  projectBrief?: string;
}

export interface JoinUsFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  linkedin?: string;
  role?: string;
  portfolio?: string;
  whyJoin?: string;
}

export type FormData = PartnershipFormData | ServiceFormData;

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
  details?: string;
}
