// Frei editierbare Platzhalter-Daten für Paket-Details.
// Später kannst du hier echte Vorteile/Bullets pro Kategorie & Tier pflegen.

export type PackageDetail = {
    categoryId: 'handwerk' | 'finanzen' | 'energie' | 'dienstleistungen'
    tierId: 'S' | 'M' | 'L'
    title: string
    description: string
    bullets: string[]
  }
  
  export const packageDetails: PackageDetail[] = [
    // Handwerk
    {
      categoryId: 'handwerk',
      tierId: 'S',
      title: 'Handwerk · Paket S',
      description: 'Ideal für den Einstieg und erste Tests in deiner Region.',
      bullets: ['10 qualifizierte Leads', 'PLZ-Filter möglich', 'Basis E-Mail-Benachrichtigung']
    },
    {
      categoryId: 'handwerk',
      tierId: 'M',
      title: 'Handwerk · Paket M',
      description: 'Solide Menge für kontinuierliche Auslastung kleiner Teams.',
      bullets: ['25 qualifizierte Leads', 'PLZ- & Kategorie-Filter', 'Wöchentliche Zusammenfassung']
    },
    {
      categoryId: 'handwerk',
      tierId: 'L',
      title: 'Handwerk · Paket L',
      description: 'Skalierungspaket für mehrere Kolonnen und volle Pipeline.',
      bullets: ['50 qualifizierte Leads', 'Priorisierte Zustellung', 'CSV-Export inklusive']
    },
  
    // Finanzen
    {
      categoryId: 'finanzen',
      tierId: 'S',
      title: 'Finanzen · Paket S',
      description: 'Einstiegspaket für Makler & Berater.',
      bullets: ['10 Leads (Qualifikation: Interesse vorhanden)', 'Segmentfilter (z. B. BauFi, Altersvorsorge)', 'Benachrichtigung per E-Mail']
    },
    {
      categoryId: 'finanzen',
      tierId: 'M',
      title: 'Finanzen · Paket M',
      description: 'Stetiger Dealflow für aktive Beratungsteams.',
      bullets: ['25 Leads', 'Segment- & PLZ-Filter', 'Wöchentliche Performance-Mail']
    },
    {
      categoryId: 'finanzen',
      tierId: 'L',
      title: 'Finanzen · Paket L',
      description: 'Skalierung für größere Maklerpools.',
      bullets: ['50 Leads', 'Priorisierte Auslieferung', 'CSV-Export & Mini-CRM']
    },
  
    // Energie
    {
      categoryId: 'energie',
      tierId: 'S',
      title: 'Energie · Paket S',
      description: 'Kleines Bundle für Angebotsphase.',
      bullets: ['10 Leads (Strom/Gas)', 'Privat & Gewerbe', 'Basis-Benachrichtigung']
    },
    {
      categoryId: 'energie',
      tierId: 'M',
      title: 'Energie · Paket M',
      description: 'Regelmäßige Pipeline-Füllung.',
      bullets: ['25 Leads', 'PLZ-Filter', 'Zusammenfassung wöchentlich']
    },
    {
      categoryId: 'energie',
      tierId: 'L',
      title: 'Energie · Paket L',
      description: 'Skalierbare Neukundengewinnung.',
      bullets: ['50 Leads', 'Priorität in der Zustellung', 'CSV-Export']
    },
  
    // Dienstleistungen
    {
      categoryId: 'dienstleistungen',
      tierId: 'S',
      title: 'Dienstleistungen · Paket S',
      description: 'Einstieg für Cleaning / Umzug / Entrümpelung / Garten.',
      bullets: ['10 Leads', 'PLZ-Filter', 'E-Mail-Benachrichtigung']
    },
    {
      categoryId: 'dienstleistungen',
      tierId: 'M',
      title: 'Dienstleistungen · Paket M',
      description: 'Regelmäßiger Dealflow für kleine Teams.',
      bullets: ['25 Leads', 'PLZ & Kategorie-Filter', 'Wöchentliche Übersicht']
    },
    {
      categoryId: 'dienstleistungen',
      tierId: 'L',
      title: 'Dienstleistungen · Paket L',
      description: 'Skalierung für wachsende Betriebe.',
      bullets: ['50 Leads', 'Priorisierte Zustellung', 'CSV-Export inklusive']
    }
  ]
  
  // Helper – falls für ein Paar nichts gepflegt ist:
  export function findPackageDetail(categoryId: PackageDetail['categoryId'], tierId: PackageDetail['tierId']): PackageDetail {
    const hit = packageDetails.find(d => d.categoryId === categoryId && d.tierId === tierId)
    return (
      hit ?? {
        categoryId,
        tierId,
        title: 'Paket-Details',
        description: 'Platzhalterbeschreibung. Hier kannst du später deine echten Leistungsmerkmale pflegen.',
        bullets: ['Leads in definierter Qualität', 'Filteroptionen je nach Paket', 'E-Mail-Benachrichtigungen']
      }
    )
  }
  