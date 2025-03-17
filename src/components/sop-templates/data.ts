
import { Template, TemplateCategory } from "./types";

export const templateCategories: TemplateCategory[] = [
  { id: "iso9001", name: "ISO 9001" },
  { id: "iso13485", name: "ISO 13485" },
  { id: "iso14971", name: "ISO 14971" },
  { id: "iec62366", name: "IEC 62366" },
  { id: "cgmp", name: "cGMP" },
  { id: "haccp", name: "HACCP" }
];

export const initialTemplates: Template[] = [
  // ISO 9001 Templates
  { 
    id: "iso9001-001", 
    title: "Qualitätshandbuch Vorlage", 
    category: "iso9001", 
    description: "Umfassende Qualitätshandbuchvorlage für die Einhaltung der ISO 9001:2015", 
    type: "Documentation",
    updated: "2023-03-15",
    downloads: 156,
    status: 'published',
    tags: ['Dokumentation', 'Qualitätspolitik']
  },
  { 
    id: "iso9001-002", 
    title: "Verfahren zur Dokumentenlenkung", 
    category: "iso9001", 
    description: "Standardverfahren für die Dokumentenlenkung und -verwaltung", 
    type: "Procedure",
    updated: "2023-04-22",
    downloads: 134,
    status: 'published',
    tags: ['Dokumentenlenkung', 'Prozesse']
  },
  { 
    id: "iso9001-003", 
    title: "Checkliste für interne Audits", 
    category: "iso9001", 
    description: "Umfassende Checkliste für die Durchführung interner Qualitätsaudits", 
    type: "Form",
    updated: "2023-05-10",
    downloads: 98,
    status: 'published',
    tags: ['Audit', 'Konformität']
  },
  
  // ISO 13485 Templates
  { 
    id: "iso13485-001", 
    title: "Medizinprodukte-Qualitätshandbuch", 
    category: "iso13485", 
    description: "Qualitätshandbuchvorlage für Medizinproduktehersteller", 
    type: "Documentation",
    updated: "2023-02-28",
    downloads: 87,
    status: 'published',
    tags: ['Medizinprodukte', 'Regulatorisch']
  },
  { 
    id: "iso13485-002", 
    title: "Verfahren für Design und Entwicklung", 
    category: "iso13485", 
    description: "Verfahren für den Design- und Entwicklungsprozess von Medizinprodukten", 
    type: "Procedure",
    updated: "2023-04-05",
    downloads: 76,
    status: 'published',
    tags: ['Design', 'Entwicklung']
  },
  
  // ISO 14971 Templates
  { 
    id: "iso14971-001", 
    title: "Risikomanagementplan Vorlage", 
    category: "iso14971", 
    description: "Planvorlage für das Risikomanagement von Medizinprodukten", 
    type: "Documentation",
    updated: "2023-03-18",
    downloads: 112,
    status: 'draft',
    tags: ['Risiko', 'Management']
  },
  { 
    id: "iso14971-002", 
    title: "Risikobewertungsmatrix", 
    category: "iso14971", 
    description: "Matrix zur Bewertung und Kategorisierung von Risiken", 
    type: "Form",
    updated: "2023-02-14",
    downloads: 143,
    status: 'published',
    tags: ['Risikobewertung', 'Matrix']
  },
  
  // cGMP Templates
  { 
    id: "cgmp-001", 
    title: "Chargenherstellungsprotokoll", 
    category: "cgmp", 
    description: "Vorlage für die Dokumentation der Chargenherstellung in GMP-Umgebung", 
    type: "Form",
    updated: "2023-01-30",
    downloads: 65,
    status: 'published',
    tags: ['Herstellung', 'Protokoll']
  },
  { 
    id: "cgmp-002", 
    title: "Reinigungsvalidierungsprotokoll", 
    category: "cgmp", 
    description: "Protokoll zur Validierung von Reinigungsverfahren in GMP-Anlagen", 
    type: "Procedure",
    updated: "2023-03-25",
    downloads: 52,
    status: 'archived',
    tags: ['Reinigung', 'Validierung']
  }
];
