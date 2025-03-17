import { useState, useEffect, useRef } from 'react';
import { Check, Shield, Clipboard, HeartPulse, Beaker, FileCheck, FolderCheck, Bot, Send, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import QMSCard from '@/components/ui/QMSCard';
import { toast } from "sonner";
import { OpenAIConfig } from "@/components/settings/OpenAIConfig";
import { generateQMSAdvice, getOpenAIKey } from "@/utils/openai";

interface Message {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const QMSSelection = () => {
  const [selectedQMS, setSelectedQMS] = useState<string | null>(null);
  const [questionnaireStep, setQuestionnaireStep] = useState(0);
  const [projectType, setProjectType] = useState('');
  const [regulationNeeds, setRegulationNeeds] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      content: "Hallo! Ich bin der QMS-Auswahlassistent. Wie kann ich Ihnen bei der Auswahl des passenden Qualitätsmanagementsystems helfen?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const handleSelectQMS = (qmsType: string) => {
    setSelectedQMS(qmsType);
    toast.success(`${qmsType} als Ihr QMS-Standard ausgewählt`);
  };

  const handleNextStep = () => {
    if (questionnaireStep < 4) {
      setQuestionnaireStep(questionnaireStep + 1);
    } else {
      // Generate recommendation based on answers
      let recommendation = '';
      if (projectType.toLowerCase().includes('medizin') || regulationNeeds.toLowerCase().includes('medizin')) {
        recommendation = 'ISO 13485';
      } else if (projectType.toLowerCase().includes('pharma') || regulationNeeds.toLowerCase().includes('pharma')) {
        recommendation = 'cGMP';
      } else if (projectType.toLowerCase().includes('lebensmittel') || regulationNeeds.toLowerCase().includes('lebensmittel')) {
        recommendation = 'HACCP';
      } else {
        recommendation = 'ISO 9001';
      }

      toast.success(`Basierend auf Ihren Antworten empfehlen wir: ${recommendation}`);
      setSelectedQMS(recommendation);
      setQuestionnaireStep(0);
    }
  };

  const handleResetQuestionnaire = () => {
    setQuestionnaireStep(0);
    setProjectType('');
    setRegulationNeeds('');
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    // Check if OpenAI API key is set
    const hasApiKey = !!getOpenAIKey();

    const userMessage: Message = {
      content: chatMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setChatMessage('');
    setIsLoading(true);

    try {
      let responseContent = '';
      
      if (hasApiKey) {
        // Use OpenAI for response
        responseContent = await generateQMSAdvice(chatMessage, chatHistory);
      } else {
        // Fallback to basic response logic if no API key
        const lowerCaseMessage = chatMessage.toLowerCase();
        
        if (lowerCaseMessage.includes('medizinprodukt') || lowerCaseMessage.includes('medical device')) {
          responseContent = "Für Medizinprodukte empfehle ich die ISO 13485. Diese Norm ist speziell für Qualitätsmanagementsysteme im Bereich der Medizinprodukte konzipiert und bietet die notwendigen Anforderungen für regulatorische Zwecke.";
        } else if (lowerCaseMessage.includes('pharma') || lowerCaseMessage.includes('arzneimittel')) {
          responseContent = "Für pharmazeutische Forschung empfehle ich cGMP (Current Good Manufacturing Practice). Dies ist der goldene Standard für die Herstellung und Qualitätskontrolle von Arzneimitteln.";
        } else if (lowerCaseMessage.includes('lebensmittel') || lowerCaseMessage.includes('food')) {
          responseContent = "Für Forschung im Bereich Lebensmittel oder Lebensmittelkontaktmaterialien empfehle ich HACCP (Hazard Analysis Critical Control Points). Dieses System ist speziell für die Lebensmittelsicherheit konzipiert.";
        } else if (lowerCaseMessage.includes('risiko') || lowerCaseMessage.includes('risk')) {
          responseContent = "Wenn Risikomanagement im Vordergrund steht, sollten Sie die ISO 14971 in Betracht ziehen, besonders in Kombination mit IEC 62366 für Medizinprodukte.";
        } else if (lowerCaseMessage.includes('labor') || lowerCaseMessage.includes('lab')) {
          responseContent = "Für allgemeine Laborforschung bietet ISO 9001 einen soliden Rahmen. Wenn jedoch spezifischere Anforderungen bestehen, können je nach Forschungsgebiet andere Standards wie ISO 17025 oder GLP (Good Laboratory Practice) relevant sein.";
        } else {
          responseContent = "Ohne spezifischere Informationen zu Ihrem Projekt würde ich ISO 9001 als Ausgangspunkt empfehlen. Dies ist ein vielseitiger Standard, der für eine Vielzahl von Forschungsprojekten geeignet ist. Können Sie mir mehr Details zu Ihrem spezifischen Forschungsbereich geben?";
        }
      }

      const assistantMessage: Message = {
        content: responseContent,
        sender: 'assistant',
        timestamp: new Date()
      };

      setChatHistory((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      const errorMessage: Message = {
        content: "Entschuldigung, aber ich konnte Ihre Anfrage nicht bearbeiten. Bitte versuchen Sie es später noch einmal.",
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setChatHistory((prev) => [...prev, errorMessage]);
      toast.error("Fehler bei der KI-Antwort");
    } finally {
      setIsLoading(false);
    }
  };
  
  const qmsOptions = [
    {
      title: "ISO 9001",
      description: "Allgemeines Qualitätsmanagementsystem",
      icon: <Shield className="h-8 w-8" />,
      features: [
        "Prozessorientierter Ansatz für Qualitätsmanagement",
        "Risikobasiertes Denken",
        "Kontinuierliche Verbesserungsmethodik",
        "Dokumentenmanagement",
        "Interne Auditverfahren"
      ],
      suitable: ["Allgemeine Forschung", "Labormanagement", "Grundlegende Qualitätskontrolle"],
      variant: "default"
    },
    {
      title: "ISO 13485",
      description: "Qualitätsmanagement für Medizinprodukte",
      icon: <HeartPulse className="h-8 w-8" />,
      features: [
        "Regulatorische Konformität für Medizinprodukte",
        "Design- und Entwicklungskontrollen",
        "Integration des Risikomanagements",
        "Produktions- und Prozesskontrollen",
        "Spezielle Validierungsanforderungen"
      ],
      suitable: ["Medizinprodukte-Entwicklung", "Klinische Forschung", "Implantierbare Materialien"],
      variant: "highlighted"
    },
    {
      title: "HACCP",
      description: "Lebensmittelsicherheitsmanagementsystem",
      icon: <Beaker className="h-8 w-8" />,
      features: [
        "Identifizierung von Gefahren",
        "Überwachung kritischer Kontrollpunkte",
        "Einrichtung präventiver Maßnahmen",
        "Verifizierungsverfahren",
        "Dokumentation zur Lebensmittelsicherheit"
      ],
      suitable: ["Lebensmittelkontaktmaterialien", "Verpackungsforschung", "Konsumgüter"],
      variant: "default"
    },
    {
      title: "cGMP",
      description: "Current Good Manufacturing Practice",
      icon: <FileCheck className="h-8 w-8" />,
      features: [
        "Anlagen- und Gerätequalifizierung",
        "Materialverwaltungssystem",
        "Produktions- und Prozesskontrollen",
        "Laborkontrollen",
        "Validierungsdokumentation"
      ],
      suitable: ["Pharmazeutische Forschung", "Systeme zur Wirkstoffabgabe", "Regulierte Herstellung"],
      variant: "default"
    },
    {
      title: "ISO 14971 & IEC 62366",
      description: "Risikomanagement und Gebrauchstauglichkeit für Medizinprodukte",
      icon: <FolderCheck className="h-8 w-8" />,
      features: [
        "Umfassende Risikobewertung",
        "Bewertung der Benutzeroberfläche",
        "Nutzungsbezogene Risikoanalyse",
        "Gebrauchstauglichkeitsprozess",
        "Integrierter Validierungsansatz"
      ],
      suitable: ["Komplexe Medizinprodukte", "Mensch-Maschine-Schnittstellen", "Patientenorientierte Systeme"],
      variant: "default"
    }
  ];

  const questions = [
    {
      question: "Um welche Art von Forschungsprojekt handelt es sich?",
      placeholder: "z.B. Medizinprodukt, Pharmazeutische Forschung, Materialwissenschaft..."
    },
    {
      question: "Welchen regulatorischen Anforderungen muss Ihr Projekt entsprechen?",
      placeholder: "z.B. Medizinprodukteverordnung, Lebensmittelkontaktmaterialien..."
    },
    {
      question: "Wie hoch ist der Schweregrad potenzieller Risiken Ihres Projekts?",
      options: ["Niedrig", "Mittel", "Hoch", "Sehr hoch"]
    },
    {
      question: "Wird Ihr Projekt direkte Auswirkungen auf die Patientensicherheit haben?",
      options: ["Ja", "Nein", "Möglicherweise"]
    },
    {
      question: "Welche Aspekte sind für Ihr Qualitätsmanagementsystem am wichtigsten?",
      options: ["Dokumentation", "Risikomanagement", "Rückverfolgbarkeit", "Regulatorische Konformität"]
    }
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">QMS Auswahl</h1>
        <p className="text-muted-foreground">
          Wählen Sie das am besten geeignete Qualitätsmanagementsystem für Ihr Forschungsprojekt
        </p>
      </div>
      
      <Tabs defaultValue="selection" className="space-y-6">
        <TabsList>
          <TabsTrigger value="selection">QMS Auswählen</TabsTrigger>
          <TabsTrigger value="assistant">KI-Assistent</TabsTrigger>
          <TabsTrigger value="comparison">Standards Vergleichen</TabsTrigger>
          <TabsTrigger value="settings">Einstellungen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="selection" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {qmsOptions.map((qms, index) => (
              <QMSCard
                key={index}
                title={qms.title}
                description={qms.description}
                features={qms.features}
                suitable={qms.suitable}
                icon={qms.icon}
                variant={qms.variant as "default" | "highlighted"}
                onSelect={() => handleSelectQMS(qms.title)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="assistant">
          <Card>
            <CardHeader>
              <CardTitle>KI-Assistent</CardTitle>
              <CardDescription>
                Beantworten Sie einige Fragen, um eine personalisierte Empfehlung für das am besten geeignete QMS zu erhalten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="questionnaire">
                <TabsList className="mb-4">
                  <TabsTrigger value="questionnaire">Fragebogen</TabsTrigger>
                  <TabsTrigger value="chat">Chat-Assistent</TabsTrigger>
                </TabsList>
                
                <TabsContent value="questionnaire">
                  {questionnaireStep < 5 ? (
                    <div className="space-y-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">
                          Frage {questionnaireStep + 1} von 5
                        </h3>
                        <p>{questions[questionnaireStep].question}</p>
                      </div>
                      
                      {questions[questionnaireStep].options ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {questions[questionnaireStep].options?.map((option, index) => (
                            <Button 
                              key={index}
                              variant="outline"
                              className="justify-start h-auto py-3"
                              onClick={handleNextStep}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Textarea 
                            placeholder={questions[questionnaireStep].placeholder || ""} 
                            className="min-h-[100px]"
                            value={questionnaireStep === 0 ? projectType : regulationNeeds}
                            onChange={(e) => {
                              if (questionnaireStep === 0) {
                                setProjectType(e.target.value);
                              } else {
                                setRegulationNeeds(e.target.value);
                              }
                            }}
                          />
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              onClick={handleResetQuestionnaire}
                              disabled={questionnaireStep === 0}
                            >
                              Zurück
                            </Button>
                            <Button onClick={handleNextStep}>
                              Weiter
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">Empfehlung generiert!</h3>
                      <p className="mb-6">
                        Basierend auf Ihren Antworten empfehlen wir:
                        <span className="block text-2xl font-bold mt-2">{selectedQMS}</span>
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button variant="outline" onClick={handleResetQuestionnaire}>
                          Neu starten
                        </Button>
                        <Button onClick={() => toast.success(`${selectedQMS} als QMS ausgewählt!`)}>
                          Diese Empfehlung übernehmen
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="chat">
                  <div className="border rounded-md h-[400px] mb-4 overflow-hidden flex flex-col">
                    <div className="p-4 bg-muted/30 border-b">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">QMS-Auswahlassistent</h3>
                        {!getOpenAIKey() && (
                          <div className="ml-auto">
                            <Button size="sm" variant="outline" className="text-xs" asChild>
                              <a href="#settings" onClick={() => document.querySelector('[data-value="settings"]')?.dispatchEvent(new MouseEvent('click'))}>
                                <Key className="h-3 w-3 mr-1" />
                                API Key konfigurieren
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4" ref={chatContainerRef}>
                      {chatHistory.map((message, index) => (
                        <div 
                          key={index} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted'
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <div className={`text-xs mt-1 ${
                              message.sender === 'user' 
                                ? 'text-primary-foreground/70' 
                                : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse"></div>
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse delay-150"></div>
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-pulse delay-300"></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t">
                      <div className="flex space-x-2">
                        <Input 
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          placeholder="Stellen Sie eine Frage zum QMS..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isLoading) {
                              handleSendMessage();
                            }
                          }}
                          disabled={isLoading}
                        />
                        <Button size="icon" onClick={handleSendMessage} disabled={isLoading || !chatMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Standards Vergleichen</CardTitle>
              <CardDescription>
                Vergleichen Sie Funktionen und Anforderungen verschiedener Qualitätsmanagementstandards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border p-2 text-left">Funktion</th>
                      <th className="border p-2 text-center">ISO 9001</th>
                      <th className="border p-2 text-center">ISO 13485</th>
                      <th className="border p-2 text-center">HACCP</th>
                      <th className="border p-2 text-center">cGMP</th>
                      <th className="border p-2 text-center">ISO 14971 & IEC 62366</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 text-left font-medium">Risikomanagement</td>
                      <td className="border p-2 text-center">Mittel</td>
                      <td className="border p-2 text-center">Hoch</td>
                      <td className="border p-2 text-center">Hoch</td>
                      <td className="border p-2 text-center">Hoch</td>
                      <td className="border p-2 text-center">Sehr Hoch</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Dokumentationsanforderungen</td>
                      <td className="border p-2 text-center">Mittel</td>
                      <td className="border p-2 text-center">Hoch</td>
                      <td className="border p-2 text-center">Mittel</td>
                      <td className="border p-2 text-center">Sehr Hoch</td>
                      <td className="border p-2 text-center">Hoch</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Regulatorischer Fokus</td>
                      <td className="border p-2 text-center">Niedrig</td>
                      <td className="border p-2 text-center">Hoch</td>
                      <td className="border p-2 text-center">Mittel</td>
                      <td className="border p-2 text-center">Sehr Hoch</td>
                      <td className="border p-2 text-center">Hoch</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Validierungsanforderungen</td>
                      <td className="border p-2 text-center">Niedrig</td>
                      <td className="border p-2 text-center">Hoch</td>
                      <td className="border p-2 text-center">Mittel</td>
                      <td className="border p-2 text-center">Sehr Hoch</td>
                      <td className="border p-2 text-center">Hoch</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Implementierungskomplexität</td>
                      <td className="border p-2 text-center">Mittel</td>
                      <td className="border p-2 text-center">Hoch</td>
                      <td className="border p-2 text-center">Mittel</td>
                      <td className="border p-2 text-center">Sehr Hoch</td>
                      <td className="border p-2 text-center">Hoch</td>
                    </tr>
                    <tr>
                      <td className="border p-2 text-left font-medium">Spezielle Schulungen erforderlich</td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                      <td className="border p-2 text-center">
                        <Check size={16} className="mx-auto text-green-500" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              {selectedQMS && (
                <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">Ihre aktuelle Auswahl: {selectedQMS}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sie haben {selectedQMS} als Ihr QMS-Standard ausgewählt. Sie können diese Auswahl jederzeit ändern.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedQMS(null);
                      toast.info("QMS-Auswahl zurückgesetzt");
                    }}
                  >
                    Auswahl zurücksetzen
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <OpenAIConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QMSSelection;
