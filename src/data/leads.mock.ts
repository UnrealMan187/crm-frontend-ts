import type { Lead } from '../types/lead';

const now = () => new Date().toISOString();
const id = () => Math.random().toString(36).slice(2,10);

export const seedLeads: Lead[] = [
  {
    id: id(), firstName: 'Max', lastName: 'Schneider', company: 'Dachbau Schneider',
    email: 'max@dach-schneider.de', phone: '+49 171 1234567',
    zip: '10115', city: 'Berlin', street: 'Hauptstr. 5',
    category: 'handwerk', subcategory: 'Dachdecker', source: 'Landingpage',
    consent: true, notes: 'Rückruf ab 16 Uhr', priority: 3, score: 62,
    createdAt: now(), status: 'neu'
  },
  {
    id: id(), firstName: 'Laura', lastName: 'Keller', company: 'Keller Umzüge',
    email: 'office@keller-umzuege.de', phone: '+49 172 888111',
    zip: '50667', city: 'Köln', street: 'Domplatz 2',
    category: 'dienstleistungen', subcategory: 'Umzüge', source: 'Google Ads',
    consent: true, notes: '', priority: 2, score: 48,
    createdAt: now(), status: 'kontaktiert'
  },
  {
    id: id(), firstName: 'Yusuf', lastName: 'Demir', company: 'EnergiePlus',
    email: 'y.demir@energieplus.de', phone: '+49 170 555000',
    zip: '20095', city: 'Hamburg',
    category: 'energie', subcategory: 'Strom Gewerbe', source: 'Partner',
    consent: true, notes: 'Gewerbevertrag läuft 12/2025 aus', priority: 4, score: 74,
    createdAt: now(), status: 'termin'
  }
];
