
import { useState } from "react";
import { FileText, FileCheck, Filter, Download, Eye, Pencil, Trash2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Document {
  id: string;
  title: string;
  type: string;
  status: string;
  updatedAt: string;
  description?: string;
  qmsType?: string;
  content?: string;
  version?: string;
}

interface DocumentsListProps {
  documents: Document[];
  isOverview?: boolean;
  onViewAllDocuments?: () => void;
}

const DocumentsList = ({ documents: initialDocuments, isOverview = false, onViewAllDocuments }: DocumentsListProps) => {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments || []);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    title: "",
    type: "SOP",
    description: "",
    qmsType: "ISO 9001",
    content: "",
    status: "Draft"
  });

  // Full collection of SOPs and forms
  const allDocuments: Document[] = initialDocuments && initialDocuments.length > 0 ? 
    initialDocuments : 
    [
      // ISO 9001 SOPs
      { 
        id: "SOP-9001-001", 
        title: "Dokumentenlenkung", 
        type: "SOP", 
        status: "Approved", 
        updatedAt: "2023-09-15",
        description: "Standardverfahren zur Erstellung, Prüfung, Genehmigung und Verteilung von Dokumenten im QMS",
        qmsType: "ISO 9001",
        version: "1.2",
        content: `# 1. Zweck
Diese SOP beschreibt den Prozess zur Erstellung, Prüfung, Genehmigung und Verteilung von Dokumenten im Qualitätsmanagementsystem.

# 2. Geltungsbereich
Diese SOP gilt für alle Dokumente des Qualitätsmanagementsystems, einschließlich Qualitätshandbuch, Verfahrensanweisungen, Arbeitsanweisungen und Formblätter.

# 3. Verantwortlichkeiten
- QM-Beauftragter: Überwachung des Dokumentenlenkungsprozesses
- Prozessverantwortliche: Erstellung von Dokumenten
- Genehmigungsberechtigte: Freigabe von Dokumenten

# 4. Verfahren
## 4.1 Erstellung von Dokumenten
- Festlegung von Verantwortlichkeiten
- Bestimmung von Format und Inhalt
- Eindeutige Kennzeichnung (ID, Version, Datum)

## 4.2 Prüfung und Genehmigung
- Fachliche Prüfung durch relevante Abteilungen
- Formale Prüfung durch QM-Beauftragten
- Genehmigung durch befugte Person

## 4.3 Verteilung und Zugänglichkeit
- Dokumente in kontrollierter Form verfügbar machen
- Sicherstellung der Verfügbarkeit an relevanten Stellen
- Schulung der betroffenen Mitarbeiter

## 4.4 Änderungen und Revisionen
- Identifikation notwendiger Änderungen
- Durchführung des Änderungsprozesses
- Kennzeichnung der Änderungen
- Erneute Genehmigung

## 4.5 Archivierung
- Aufbewahrung von aktuellen und veralteten Dokumenten
- Kennzeichnung ungültiger Dokumente

# 5. Mitgeltende Unterlagen
- FB-9001-001: Formblatt Dokumentenänderung
- FB-9001-002: Formblatt Dokumentenübersicht

# 6. Änderungshistorie
- 1.0 (2023-01-15): Erstveröffentlichung
- 1.1 (2023-05-20): Anpassung Genehmigungsprozess
- 1.2 (2023-09-15): Integration digitaler Signatur`
      },
      { 
        id: "SOP-9001-002", 
        title: "Interne Audits", 
        type: "SOP", 
        status: "Approved", 
        updatedAt: "2023-08-30",
        description: "Verfahren zur Planung, Durchführung und Nachverfolgung interner Audits",
        qmsType: "ISO 9001",
        version: "1.1",
        content: `# 1. Zweck
Diese SOP beschreibt den Prozess zur Planung, Durchführung und Nachverfolgung interner Audits im Rahmen des Qualitätsmanagementsystems.

# 2. Geltungsbereich
Diese SOP gilt für alle internen Audits im Unternehmen, die zur Bewertung der Wirksamkeit des QMS durchgeführt werden.

# 3. Verantwortlichkeiten
- Geschäftsführung: Genehmigung des Auditprogramms
- QM-Beauftragter: Planung und Organisation der Audits
- Auditoren: Durchführung der Audits
- Prozessverantwortliche: Umsetzung von Korrekturmaßnahmen

# 4. Verfahren
## 4.1 Auditplanung
- Erstellung eines jährlichen Auditprogramms
- Auswahl qualifizierter Auditoren
- Sicherstellung der Unabhängigkeit der Auditoren
- Festlegung des Auditumfangs und der Kriterien

## 4.2 Auditvorbereitung
- Erstellung eines Auditplans
- Information der zu auditierenden Bereiche
- Überprüfung relevanter Dokumente
- Vorbereitung von Checklisten und Fragebögen

## 4.3 Auditdurchführung
- Eröffnungsgespräch
- Sammlung von Nachweisen
- Dokumentation von Feststellungen
- Abschlussgespräch

## 4.4 Auditberichterstattung
- Erstellung eines Auditberichts
- Kategorisierung von Abweichungen
- Verteilung des Berichts an relevante Stellen

## 4.5 Nachverfolgung
- Festlegung von Korrekturmaßnahmen
- Überprüfung der Umsetzung
- Bewertung der Wirksamkeit
- Abschluss des Audits

# 5. Mitgeltende Unterlagen
- FB-9001-003: Auditplan
- FB-9001-004: Auditbericht
- FB-9001-005: Korrekturmaßnahmenplan

# 6. Änderungshistorie
- 1.0 (2023-02-10): Erstveröffentlichung
- 1.1 (2023-08-30): Erweiterung um Remote-Audit-Verfahren`
      },
      { 
        id: "SOP-9001-003", 
        title: "Management von Nichtkonformitäten", 
        type: "SOP", 
        status: "In Review", 
        updatedAt: "2023-09-20",
        description: "Verfahren zur Identifikation, Dokumentation und Behandlung von Nichtkonformitäten",
        qmsType: "ISO 9001",
        version: "1.0",
        content: `# 1. Zweck
Diese SOP beschreibt den Prozess zur Identifikation, Dokumentation und Behandlung von Nichtkonformitäten im Qualitätsmanagementsystem.

# 2. Geltungsbereich
Diese SOP gilt für alle Nichtkonformitäten im Zusammenhang mit Produkten, Dienstleistungen, Prozessen und dem QMS.

# 3. Verantwortlichkeiten
- Mitarbeiter: Meldung von Nichtkonformitäten
- Prozessverantwortliche: Bewertung und Behandlung
- QM-Beauftragter: Überwachung und Berichterstattung
- Geschäftsführung: Ressourcenbereitstellung

# 4. Verfahren
## 4.1 Identifikation von Nichtkonformitäten
- Erkennung während Prozessausführung
- Meldung durch Mitarbeiter oder Kunden
- Feststellung bei Inspektionen oder Audits

## 4.2 Dokumentation
- Erfassung in entsprechendem Formblatt
- Beschreibung der Abweichung
- Kategorisierung nach Schweregrad
- Zuordnung zu betroffenen Prozessen

## 4.3 Sofortmaßnahmen
- Kennzeichnung nichtkonformer Produkte
- Information betroffener Stellen
- Entscheidung über Aussonderung/Sperrung

## 4.4 Ursachenanalyse
- Anwendung geeigneter Analysetechniken
- Einbeziehung relevanter Mitarbeiter
- Identifikation von Grundursachen

## 4.5 Korrekturmaßnahmen
- Festlegung wirksamer Maßnahmen
- Zuweisung von Verantwortlichkeiten
- Terminfestlegung
- Überprüfung der Umsetzung

## 4.6 Vorbeugungsmaßnahmen
- Erkennung ähnlicher potenzieller Probleme
- Entwicklung präventiver Maßnahmen
- Integration in Prozesse

## 4.7 Wirksamkeitsprüfung
- Bewertung der umgesetzten Maßnahmen
- Dokumentation der Ergebnisse
- Weitere Maßnahmen bei Bedarf

# 5. Mitgeltende Unterlagen
- FB-9001-006: Nichtkonformitätenbericht
- FB-9001-007: Korrekturmaßnahmenplan
- FB-9001-008: Wirksamkeitsprüfung

# 6. Änderungshistorie
- 1.0 (2023-09-20): Erstveröffentlichung`
      },
      // ISO 13485 SOPs
      { 
        id: "SOP-13485-001", 
        title: "Design und Entwicklung von Medizinprodukten", 
        type: "SOP", 
        status: "Approved", 
        updatedAt: "2023-07-12",
        description: "Verfahren für den Design- und Entwicklungsprozess von Medizinprodukten",
        qmsType: "ISO 13485",
        version: "2.0",
        content: `# 1. Zweck
Diese SOP beschreibt den Design- und Entwicklungsprozess für Medizinprodukte in Übereinstimmung mit ISO 13485.

# 2. Geltungsbereich
Diese SOP gilt für alle Design- und Entwicklungsaktivitäten im Zusammenhang mit Medizinprodukten.

# 3. Verantwortlichkeiten
- Entwicklungsleiter: Führung des Entwicklungsteams
- Regulatory Affairs: Sicherstellung regulatorischer Konformität
- Qualitätsmanager: Überwachung von Design-Reviews
- Risikomanager: Durchführung von Risikoanalysen

# 4. Verfahren
## 4.1 Planungsphase
- Erstellung eines Design- und Entwicklungsplans
- Definition von Designvorgaben und -zielen
- Festlegung von Verantwortlichkeiten und Schnittstellen
- Erstellung eines Zeitplans mit Meilensteinen
- Ressourcenplanung

## 4.2 Anforderungsspezifikation
- Erfassung von Benutzeranforderungen
- Definition funktionaler Anforderungen
- Festlegung von Leistungsanforderungen
- Berücksichtigung regulatorischer Anforderungen
- Erstellung der Design Input Requirements

## 4.3 Konzeptentwicklung
- Erarbeitung von Designlösungen
- Bewertung von Alternativen
- Machbarkeitsstudien
- Vorabprüfung auf regulatorische Konformität

## 4.4 Detaillierte Entwicklung
- Ausarbeitung des Designs
- Erstellung von Prototypen
- Design-Reviews durch multidisziplinäres Team
- Verifikationsplanung
- Risikomanagement (nach ISO 14971)

## 4.5 Verifikation und Validierung
- Durchführung von Tests gemäß Testplan
- Vergleich mit Design-Anforderungen
- Usability-Tests
- Dokumentation der Testergebnisse
- Bewertung der Ergebnisse

## 4.6 Design-Transfer
- Überführung in die Produktion
- Schulung der Produktionsmitarbeiter
- Validierung der Produktionsprozesse
- Überprüfung der Herstellungsunterlagen

## 4.7 Design-Änderungen
- Bewertung von Änderungsanforderungen
- Durchführung eines kontrollierten Änderungsprozesses
- Aktualisierung der Dokumentation
- Neu-Validierung bei Bedarf

# 5. Mitgeltende Unterlagen
- FB-13485-001: Design-Plan
- FB-13485-002: Anforderungsspezifikation
- FB-13485-003: Design-Review-Protokoll
- FB-13485-004: Verifikations- und Validierungsbericht
- SOP-14971-001: Risikomanagement für Medizinprodukte

# 6. Änderungshistorie
- 1.0 (2022-11-05): Erstveröffentlichung
- 2.0 (2023-07-12): Umfassende Überarbeitung gemäß aktualisierter regulatorischer Anforderungen`
      },
      { 
        id: "SOP-13485-002", 
        title: "Beschwerdemanagement für Medizinprodukte", 
        type: "SOP", 
        status: "Approved", 
        updatedAt: "2023-06-28",
        description: "Verfahren zum Umgang mit Produktbeschwerden und Vigilanz-Meldungen",
        qmsType: "ISO 13485",
        version: "1.3",
        content: `# 1. Zweck
Diese SOP beschreibt den Prozess zum Umgang mit Kundenbeschwerden und Vigilanzmeldungen für Medizinprodukte.

# 2. Geltungsbereich
Diese SOP gilt für alle Beschwerden im Zusammenhang mit Medizinprodukten des Unternehmens.

# 3. Verantwortlichkeiten
- Vigilanzbeauftragter: Bewertung und Meldung meldepflichtiger Vorkommnisse
- Qualitätsmanager: Überwachung des Beschwerdemanagementprozesses
- Kundendienst: Entgegennahme und Dokumentation von Beschwerden
- Fachexperten: Analyse und Bewertung von Beschwerden

# 4. Verfahren
## 4.1 Entgegennahme von Beschwerden
- Erfassung von Beschwerden aus verschiedenen Quellen
- Sofortige Dokumentation aller erforderlichen Details
- Erstbewertung der Dringlichkeit
- Weiterleitung an zuständige Stellen

## 4.2 Erstbewertung
- Kategorisierung der Beschwerde
- Bewertung des Schweregrades
- Prüfung auf meldepflichtige Vorkommnisse
- Entscheidung über sofortige Maßnahmen

## 4.3 Untersuchung und Analyse
- Sammlung aller relevanten Informationen
- Untersuchung der möglichen Ursachen
- Bewertung möglicher Produktrisiken
- Dokumentation der Untersuchungsergebnisse

## 4.4 Vigilanzmeldungen
- Identifikation meldepflichtiger Vorkommnisse
- Fristgerechte Meldung an zuständige Behörden
- Durchführung notwendiger Korrekturmaßnahmen
- Follow-up mit Behörden

## 4.5 Korrektur- und Vorbeugungsmaßnahmen
- Festlegung von Maßnahmen basierend auf Analyseergebnissen
- Dokumentation im CAPA-System
- Überwachung der Umsetzung
- Bewertung der Wirksamkeit

## 4.6 Kommunikation mit Kunden
- Information des Beschwerdeführers
- Dokumentation der Kommunikation
- Rückmeldung zu ergriffenen Maßnahmen

## 4.7 Trend-Analyse und Berichterstattung
- Regelmäßige Auswertung der Beschwerdedaten
- Identifikation von Trends
- Berichterstattung an das Management
- Integration in Management-Review

# 5. Mitgeltende Unterlagen
- FB-13485-005: Beschwerdedokumentation
- FB-13485-006: Vigilanzmeldung
- FB-13485-007: CAPA-Formular
- FB-13485-008: Beschwerdebericht für Management Review

# 6. Änderungshistorie
- 1.0 (2022-09-10): Erstveröffentlichung
- 1.1 (2022-12-22): Anpassung Vigilanz-Meldeverfahren
- 1.2 (2023-03-15): Aktualisierung Meldefristen
- 1.3 (2023-06-28): Erweiterung um elektronisches Meldesystem`
      },
      // Formblätter ISO 9001
      { 
        id: "FB-9001-001", 
        title: "Formblatt Dokumentenänderung", 
        type: "Form", 
        status: "Approved", 
        updatedAt: "2023-08-15",
        description: "Formular zur Beantragung und Dokumentation von Änderungen an QMS-Dokumenten",
        qmsType: "ISO 9001",
        version: "1.1",
        content: `# Formblatt Dokumentenänderung

## Dokumenteninformation
- Dokumenten-ID: [       ]
- Dokumententitel: [                             ]
- Aktuelle Version: [       ]
- Datum der aktuellen Version: [       ]

## Änderungsinformation
- Änderungsantrag-Nr.: [       ]
- Beantragt von: [                             ]
- Abteilung: [                             ]
- Datum des Antrags: [       ]

## Beschreibung der Änderung
[
                                                                        
                                                                        
]

## Begründung der Änderung
[
                                                                        
                                                                        
]

## Auswirkung der Änderung
- Auswirkung auf andere Dokumente: [ ] Ja [ ] Nein
- Wenn ja, welche: [                             ]
- Schulungsbedarf: [ ] Ja [ ] Nein
- Wenn ja, für wen: [                             ]

## Prüfung und Genehmigung
- Geprüft von (Fachlich): [                 ] Datum: [       ] Unterschrift: [                 ]
- Geprüft von (QM): [                 ] Datum: [       ] Unterschrift: [                 ]
- Genehmigt von: [                 ] Datum: [       ] Unterschrift: [                 ]

## Änderungsumsetzung
- Neue Versionsnummer: [       ]
- Veröffentlichungsdatum: [       ]
- Umgesetzt von: [                 ]
- Alte Version archiviert am: [       ] durch: [                 ]
- Änderung kommuniziert an: [                             ]

## Anlagen
[ ] Betroffene Seiten mit markierten Änderungen
[ ] Sonstige: [                             ]

## Nur vom QM-Beauftragten auszufüllen
- Dokumentenverzeichnis aktualisiert: [ ] Ja [ ] Nein Datum: [       ]
- Dokumenten-Historie aktualisiert: [ ] Ja [ ] Nein Datum: [       ]`
      },
      { 
        id: "FB-9001-003", 
        title: "Auditplan", 
        type: "Form", 
        status: "Approved", 
        updatedAt: "2023-08-25",
        description: "Vorlage für die Planung interner Audits gemäß ISO 9001",
        qmsType: "ISO 9001",
        version: "1.2",
        content: `# Auditplan

## Audit-Information
- Audit-Nr.: [       ]
- Audit-Typ: [ ] Intern [ ] Lieferant [ ] Zertifizierung [ ] Sonstiges: [          ]
- Audit-Ziel: [                                                    ]
- Audit-Umfang: [                                                  ]
- Audit-Kriterien: [ ] ISO 9001:2015 [ ] Interne Verfahren [ ] Sonstiges: [          ]

## Zeitplan
- Audit-Datum: von [       ] bis [       ]
- Eröffnungsgespräch: Datum [       ] Uhrzeit [       ] Ort [                 ]
- Abschlussgespräch: Datum [       ] Uhrzeit [       ] Ort [                 ]

## Auditteam
- Leitender Auditor: [                             ]
- Weitere Auditoren: [                             ]
- Technische Experten: [                           ]
- Beobachter: [                                    ]

## Zu auditierende Bereiche

| Datum | Uhrzeit | Abteilung/Prozess | Ansprechpartner | Auditor | Zu prüfende Anforderungen |
|-------|---------|-------------------|-----------------|---------|---------------------------|
| [    ] | [    ] | [                ] | [             ] | [      ] | [                       ] |
| [    ] | [    ] | [                ] | [             ] | [      ] | [                       ] |
| [    ] | [    ] | [                ] | [             ] | [      ] | [                       ] |
| [    ] | [    ] | [                ] | [             ] | [      ] | [                       ] |
| [    ] | [    ] | [                ] | [             ] | [      ] | [                       ] |
| [    ] | [    ] | [                ] | [             ] | [      ] | [                       ] |

## Besondere Hinweise
[
                                                                        
                                                                        
]

## Verteilung
- Auditteam: [                             ]
- Auditierte Bereiche: [                   ]
- QM-Beauftragter: [                       ]
- Geschäftsführung: [                      ]
- Sonstige: [                              ]

## Freigabe
- Erstellt von: [                 ] Datum: [       ] Unterschrift: [                 ]
- Genehmigt von: [                 ] Datum: [       ] Unterschrift: [                 ]`
      },
      // Formblätter ISO 13485
      { 
        id: "FB-13485-002", 
        title: "Anforderungsspezifikation Medizinprodukt", 
        type: "Form", 
        status: "Approved", 
        updatedAt: "2023-07-12",
        description: "Formblatt zur Dokumentation der Anforderungen an ein Medizinprodukt",
        qmsType: "ISO 13485",
        version: "2.1",
        content: `# Anforderungsspezifikation Medizinprodukt

## Produktinformation
- Produktname: [                             ]
- Produktkategorie: [                        ]
- Risikoklasse: [ ] I [ ] IIa [ ] IIb [ ] III
- Projekt-ID: [              ]
- Vers.-Nr. der Spezifikation: [       ]
- Datum: [       ]

## 1. Verwendungszweck und Indikation
### 1.1 Beabsichtigter Verwendungszweck
[
                                                                        
                                                                        
]

### 1.2 Zielpatientengruppe
[
                                                                        
]

### 1.3 Anwendungsumgebung
[
                                                                        
]

### 1.4 Anwenderprofil
[
                                                                        
]

## 2. Funktionale Anforderungen

| Nr. | Anforderung | Spezifikation | Testmethode | Priorität |
|-----|-------------|---------------|-------------|-----------|
| F1  | [          ] | [           ] | [         ] | [       ] |
| F2  | [          ] | [           ] | [         ] | [       ] |
| F3  | [          ] | [           ] | [         ] | [       ] |
| F4  | [          ] | [           ] | [         ] | [       ] |
| F5  | [          ] | [           ] | [         ] | [       ] |

## 3. Leistungsanforderungen

| Nr. | Anforderung | Spezifikation | Testmethode | Priorität |
|-----|-------------|---------------|-------------|-----------|
| P1  | [          ] | [           ] | [         ] | [       ] |
| P2  | [          ] | [           ] | [         ] | [       ] |
| P3  | [          ] | [           ] | [         ] | [       ] |

## 4. Regulatorische Anforderungen

| Nr. | Regulatorische Anforderung | Norm/Richtlinie | Nachweis |
|-----|----------------------------|-----------------|----------|
| R1  | [                        ] | [             ] | [      ] |
| R2  | [                        ] | [             ] | [      ] |
| R3  | [                        ] | [             ] | [      ] |

## 5. Design-Anforderungen

| Nr. | Anforderung | Spezifikation | Priorität |
|-----|-------------|---------------|-----------|
| D1  | [          ] | [           ] | [       ] |
| D2  | [          ] | [           ] | [       ] |
| D3  | [          ] | [           ] | [       ] |

## 6. Benutzerfreundlichkeit/Usability

| Nr. | Anforderung | Spezifikation | Testmethode | Priorität |
|-----|-------------|---------------|-------------|-----------|
| U1  | [          ] | [           ] | [         ] | [       ] |
| U2  | [          ] | [           ] | [         ] | [       ] |

## 7. Sicherheitsanforderungen

| Nr. | Anforderung | Spezifikation | Testmethode | Priorität |
|-----|-------------|---------------|-------------|-----------|
| S1  | [          ] | [           ] | [         ] | [       ] |
| S2  | [          ] | [           ] | [         ] | [       ] |
| S3  | [          ] | [           ] | [         ] | [       ] |

## 8. Kompatibilitätsanforderungen
[
                                                                        
]

## 9. Verpackungs- und Kennzeichnungsanforderungen
[
                                                                        
]

## 10. Änderungshistorie

| Version | Datum | Beschreibung der Änderung | Erstellt von | Genehmigt von |
|---------|-------|---------------------------|--------------|---------------|
| [     ] | [   ] | [                       ] | [          ] | [           ] |
| [     ] | [   ] | [                       ] | [          ] | [           ] |

## 11. Freigabe
- Erstellt von: [                 ] Datum: [       ] Unterschrift: [                 ]
- Geprüft von (R&D): [                 ] Datum: [       ] Unterschrift: [                 ]
- Geprüft von (RA/QA): [                 ] Datum: [       ] Unterschrift: [                 ]
- Genehmigt von: [                 ] Datum: [       ] Unterschrift: [                 ]`
      },
      { 
        id: "FB-13485-006", 
        title: "Vigilanzmeldung", 
        type: "Form", 
        status: "Approved", 
        updatedAt: "2023-06-29",
        description: "Formular zur Meldung von Vorkommnissen an die zuständigen Behörden",
        qmsType: "ISO 13485",
        version: "1.4",
        content: `# Vigilanzmeldung

## 1. Meldedaten
- Melde-Referenznummer: [                ]
- Meldeart: [ ] Erstmeldung [ ] Folgemeldung [ ] Abschlussmeldung
- Meldedatum: [       ]
- Meldefrist: [ ] Sofortmeldung [ ] 10 Tage [ ] 30 Tage [ ] Periodisch
- Zuständige Behörde(n): [                                            ]

## 2. Herstellerdaten
- Firmenname: [                                            ]
- Adresse: [                                               ]
- Ansprechpartner: [                                       ]
- Telefon: [                ]
- E-Mail: [                                                ]
- Vigilanzbeauftragter: [                                  ]

## 3. Medizinproduktdaten
- Produktbezeichnung: [                                       ]
- Modell/Typ: [                                              ]
- Katalognummer: [                     ]
- Seriennummer(n)/Chargennummer(n): [                        ]
- UDI: [                                                     ]
- Risikoklasse: [ ] I [ ] IIa [ ] IIb [ ] III
- Benannte Stelle: [                    ] Kennnummer: [      ]
- Zertifikat-Nr.: [                                         ]

## 4. Vorkommnisdaten
- Datum des Vorkommnisses: [       ]
- Ort des Vorkommnisses: [                                  ]
- Beschreibung des Vorkommnisses:
[
                                                                        
                                                                        
                                                                        
]

- Anzahl betroffener Produkte: [       ]
- Anzahl betroffener Patienten: [       ]

## 5. Patienteninformation
- Patientenalter: [       ] [ ] Jahre [ ] Monate
- Patientengeschlecht: [ ] Männlich [ ] Weiblich [ ] Divers
- Folgen für den Patienten:
  [ ] Tod, Datum: [       ]
  [ ] Lebensbedrohliche Erkrankung/Verletzung
  [ ] Dauerhafte Beeinträchtigung
  [ ] Medizinischer Eingriff erforderlich
  [ ] Vorübergehende Beeinträchtigung
  [ ] Keine Beeinträchtigung
  [ ] Unbekannt

## 6. Vorläufige Bewertung/Analyse
[
                                                                        
                                                                        
                                                                        
]

## 7. Bisherige Maßnahmen
- Vorläufige Sofortmaßnahmen:
[
                                                                        
]

- Geplante weitere Maßnahmen:
[
                                                                        
]

- Korrektive Maßnahmen im Feld (FSCA): [ ] Ja [ ] Nein
- Wenn ja, Beschreibung:
[
                                                                        
]

## 8. Ähnliche Vorkommnisse
- Anzahl ähnlicher Vorkommnisse: [       ]
- Frühere Meldungen: [ ] Ja [ ] Nein
- Wenn ja, Referenznummern: [                                ]

## 9. Vertriebsinformation
- Anzahl vertriebener Produkte: [       ]
- Betroffene Länder: [                                      ]

## 10. Anlagen
[
                                                                        
]

## 11. Bestätigung
- Name: [                                        ]
- Position: [                                    ]
- Datum: [       ]
- Unterschrift: [                               ]`
      }
    ];
    
  const filteredDocuments = activeTab === "all" 
    ? documents.filter(doc => filterType ? doc.type === filterType : true)
    : documents.filter(doc => {
        const typeMatch = activeTab === "sop" ? doc.type === "SOP" : 
                         activeTab === "form" ? doc.type === "Form" : true;
        const filterMatch = filterType ? doc.type === filterType : true;
        return typeMatch && filterMatch;
      });

  const getDocumentStatusBadge = (status: string) => {
    return status === "Approved" ? "default" : status === "In Review" ? "outline" : "secondary";
  };

  const handleAddDocument = () => {
    if (!newDocument.title || !newDocument.type) {
      toast.error("Bitte füllen Sie alle erforderlichen Felder aus");
      return;
    }
    
    const docId = `${newDocument.type === "SOP" ? "SOP" : "FB"}-${newDocument.qmsType?.replace(/\s+/g, '').replace(':', '')}-${(Math.floor(Math.random() * 900) + 100).toString()}`;
    
    const newDoc: Document = {
      id: docId,
      title: newDocument.title || "",
      type: newDocument.type || "SOP",
      status: "Draft",
      updatedAt: new Date().toISOString().split('T')[0],
      description: newDocument.description,
      qmsType: newDocument.qmsType,
      content: newDocument.content,
      version: "1.0"
    };
    
    setDocuments([newDoc, ...documents]);
    setNewDocument({
      title: "",
      type: "SOP",
      description: "",
      qmsType: "ISO 9001",
      content: "",
      status: "Draft"
    });
    setShowAddDialog(false);
    toast.success(`${newDocument.type} wurde erfolgreich erstellt`);
  };

  const handleViewDocument = (doc: Document) => {
    setCurrentDocument(doc);
    setShowViewDialog(true);
  };

  const handleStatusChange = (docId: string, newStatus: string) => {
    setDocuments(
      documents.map(doc => 
        doc.id === docId 
          ? { ...doc, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } 
          : doc
      )
    );
    
    const statusMessages = {
      Draft: "als Entwurf gespeichert",
      "In Review": "zur Prüfung weitergeleitet",
      Approved: "genehmigt",
      Archived: "archiviert"
    };
    
    toast.success(`Dokument wurde ${statusMessages[newStatus as keyof typeof statusMessages] || "aktualisiert"}`);
  };

  const handleDeleteDocument = (docId: string) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>Möchten Sie dieses Dokument wirklich löschen?</p>
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toast.dismiss()}
          >
            Abbrechen
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => {
              setDocuments(documents.filter(doc => doc.id !== docId));
              toast.success("Dokument wurde gelöscht");
            }}
          >
            Löschen
          </Button>
        </div>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  const handleDownloadDocument = (doc: Document) => {
    // In a real app, this would create a file for download
    toast.success(`${doc.title} wird als PDF heruntergeladen`);
  };

  return (
    <Card>
      <CardHeader className={`flex flex-row items-center justify-between ${isOverview ? '' : ''}`}>
        <CardTitle className={isOverview ? "text-lg" : ""}>
          {isOverview ? "Recent Documents" : "Project Documents"}
        </CardTitle>
        {!isOverview && (
          <div className="flex gap-2">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  Dokument hinzufügen
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Neues Dokument erstellen</DialogTitle>
                  <DialogDescription>
                    Fügen Sie ein neues SOP oder Formblatt zum Projekt hinzu
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="docType">Dokumenttyp</Label>
                      <Select 
                        value={newDocument.type} 
                        onValueChange={(value) => setNewDocument({...newDocument, type: value})}
                      >
                        <SelectTrigger id="docType">
                          <SelectValue placeholder="Dokumenttyp auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SOP">Standard Operating Procedure (SOP)</SelectItem>
                          <SelectItem value="Form">Formblatt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="qmsType">QM System</Label>
                      <Select 
                        value={newDocument.qmsType} 
                        onValueChange={(value) => setNewDocument({...newDocument, qmsType: value})}
                      >
                        <SelectTrigger id="qmsType">
                          <SelectValue placeholder="QM System auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ISO 9001">ISO 9001</SelectItem>
                          <SelectItem value="ISO 13485">ISO 13485</SelectItem>
                          <SelectItem value="ISO 14971">ISO 14971</SelectItem>
                          <SelectItem value="cGMP">cGMP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Titel</Label>
                    <Input
                      id="title"
                      value={newDocument.title}
                      onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                      placeholder="Titel des Dokuments"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                      placeholder="Kurze Beschreibung des Dokuments"
                      rows={2}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Inhalt</Label>
                    <Textarea
                      id="content"
                      value={newDocument.content}
                      onChange={(e) => setNewDocument({...newDocument, content: e.target.value})}
                      placeholder="Inhalt des Dokuments (Markdown unterstützt)"
                      rows={6}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                    Abbrechen
                  </Button>
                  <Button onClick={handleAddDocument}>
                    Dokument erstellen
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  {filterType || "Filter"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Nach Typ filtern</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterType(null)}>
                  Alle Typen
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("SOP")}>
                  SOPs
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("Form")}>
                  Formblätter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </CardHeader>
      <CardContent className={isOverview ? "space-y-4" : ""}>
        {!isOverview && (
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Alle Dokumente</TabsTrigger>
              <TabsTrigger value="sop">SOPs</TabsTrigger>
              <TabsTrigger value="form">Formblätter</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        
        <div className="space-y-4">
          {(isOverview ? filteredDocuments.slice(0, 3) : filteredDocuments).map(doc => (
            <div 
              key={doc.id}
              className={isOverview 
                ? "flex justify-between items-center p-2 rounded-md hover:bg-muted" 
                : "flex justify-between items-center p-3 border rounded-md hover:bg-muted transition-colors"
              }
            >
              <div className="flex items-center">
                <div className={isOverview ? "" : "p-2 rounded-md bg-muted mr-3"}>
                  <FileText className={`${isOverview ? "h-4 w-4 mr-3 text-muted-foreground" : "h-4 w-4"}`} />
                </div>
                <div>
                  <div className={isOverview ? "text-sm font-medium" : "font-medium"}>{doc.title}</div>
                  <div className={isOverview 
                    ? "text-xs text-muted-foreground" 
                    : "text-sm text-muted-foreground flex items-center space-x-2"
                  }>
                    {!isOverview && <span>{doc.type}</span>}
                    {!isOverview && <span>•</span>}
                    <span>{isOverview ? `Updated: ${doc.updatedAt}` : `Aktualisiert: ${doc.updatedAt}`}</span>
                    {doc.qmsType && !isOverview && (
                      <>
                        <span>•</span>
                        <span>{doc.qmsType}</span>
                      </>
                    )}
                    {doc.version && !isOverview && (
                      <>
                        <span>•</span>
                        <span>v{doc.version}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getDocumentStatusBadge(doc.status) as "default" | "secondary" | "destructive" | "outline"}>
                  {doc.status}
                </Badge>
                {!isOverview && (
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDocument(doc)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Anzeigen
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDownloadDocument(doc)}>
                          <Download className="h-4 w-4 mr-2" />
                          Herunterladen
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Bearbeitungsfunktion kommt bald")}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(doc.id, "Draft")}>
                          <Badge variant="secondary" className="mr-2">Entwurf</Badge>
                          Als Entwurf speichern
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(doc.id, "In Review")}>
                          <Badge variant="outline" className="mr-2">Prüfung</Badge>
                          Zur Prüfung senden
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(doc.id, "Approved")}>
                          <Badge className="mr-2">Genehmigt</Badge>
                          Genehmigen
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Löschen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isOverview && (
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={onViewAllDocuments}
            >
              Alle Dokumente anzeigen
            </Button>
          )}
        </div>
      </CardContent>

      {/* Document View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          {currentDocument && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{currentDocument.title}</DialogTitle>
                  <Badge variant={getDocumentStatusBadge(currentDocument.status) as "default" | "secondary" | "destructive" | "outline"}>
                    {currentDocument.status}
                  </Badge>
                </div>
                <DialogDescription>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <span>{currentDocument.id}</span>
                    <span>•</span>
                    <span>{currentDocument.type}</span>
                    {currentDocument.qmsType && (
                      <>
                        <span>•</span>
                        <span>{currentDocument.qmsType}</span>
                      </>
                    )}
                    {currentDocument.version && (
                      <>
                        <span>•</span>
                        <span>Version {currentDocument.version}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>Aktualisiert: {currentDocument.updatedAt}</span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              {currentDocument.description && (
                <div className="bg-muted rounded-md p-3 mb-4">
                  <p className="text-sm">{currentDocument.description}</p>
                </div>
              )}
              
              <div className="border rounded-md p-4 whitespace-pre-line font-mono text-sm">
                {currentDocument.content || "Kein Inhalt verfügbar"}
              </div>
              
              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadDocument(currentDocument)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Herunterladen
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setShowViewDialog(false);
                      toast.info("Bearbeitungsfunktion kommt bald");
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Bearbeiten
                  </Button>
                </div>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => setShowViewDialog(false)}
                >
                  Schließen
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DocumentsList;
