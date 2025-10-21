export type LeadCategory =
  | 'handwerk'
  | 'finanzen'
  | 'energie'
  | 'dienstleistungen';

export type LeadStatus =
  | 'neu'
  | 'kontaktiert'
  | 'erneut'
  | 'erinnerung'
  | 'termin'
  | 'angebot'
  | 'gewonnen'
  | 'verloren';

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  street?: string;
  zip: string;
  city: string;
  category: LeadCategory;
  subcategory?: string;
  source?: string;        // Leadquelle
  consent: boolean;       // Opt-in vorhanden?
  notes?: string;
  priority?: number;      // 1..5
  score?: number;         // 0..100
  createdAt: string;      // ISO
  status: LeadStatus;
}
