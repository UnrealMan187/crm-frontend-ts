export type Tier = { id: 'S'|'M'|'L'; leads: number; discountNote?: string };
export type PackageCategory = {
  id: 'handwerk' | 'finanzen' | 'energie' | 'dienstleistungen';
  name: string;
  leadPrice: number; // € pro Lead
  tiers: Tier[];
  blurb: string;
};

export const packageCatalog: PackageCategory[] = [
  {
    id: 'handwerk',
    name: 'Handwerk',
    leadPrice: 65,
    blurb: 'Leads für Dachdecker, Elektriker, Sanitär, u.v.m.',
    tiers: [
      { id: 'S', leads: 10, discountNote: 'Bundle-Preis' },
      { id: 'M', leads: 25, discountNote: 'Beliebt' },
      { id: 'L', leads: 50, discountNote: 'Bester Preis' }
    ]
  },
  {
    id: 'finanzen',
    name: 'Finanzdienstleistungen & Makler',
    leadPrice: 90,
    blurb: 'Versicherung, Baufinanzierung, Immobilien, Anlagen.',
    tiers: [
      { id: 'S', leads: 10, discountNote: 'Bundle-Preis' },
      { id: 'M', leads: 25, discountNote: 'Beliebt' },
      { id: 'L', leads: 50, discountNote: 'Bester Preis' }
    ]
  },
  {
    id: 'energie',
    name: 'Energie (Strom/Gas)',
    leadPrice: 65,
    blurb: 'Privat & Gewerbe, qualifizierte Strom/Gas-Anfragen.',
    tiers: [
      { id: 'S', leads: 10 },
      { id: 'M', leads: 25 },
      { id: 'L', leads: 50 }
    ]
  },
  {
    id: 'dienstleistungen',
    name: 'Dienstleistungen',
    leadPrice: 65,
    blurb: 'Reinigung, Umzüge, Entrümpelung, Hausmeister, Garten.',
    tiers: [
      { id: 'S', leads: 10 },
      { id: 'M', leads: 25 },
      { id: 'L', leads: 50 }
    ]
  }
];

// Hilfsfunktion für Totalpreis – aktuell simple Multiplikation.
// Später können wir hier Paket-Rabatte oder Festpreise hinterlegen.
export function calcTotal(leadPrice: number, leads: number) {
  return leadPrice * leads;
}
