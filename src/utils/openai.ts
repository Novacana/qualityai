
import { toast } from "sonner";

// This is a temporary solution for storing the API key
// IMPORTANT: In production, API keys should be stored securely on a backend
let apiKey = "";

export const setOpenAIKey = (key: string) => {
  apiKey = key;
  localStorage.setItem("temp_openai_key", key);
  return true;
};

export const getOpenAIKey = () => {
  if (!apiKey) {
    // Try to get from localStorage (temporary solution)
    const storedKey = localStorage.getItem("temp_openai_key");
    if (storedKey) {
      apiKey = storedKey;
    }
  }
  return apiKey;
};

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const callOpenAI = async (
  messages: OpenAIMessage[],
  model: string = "gpt-4o-mini",
  temperature: number = 0.7,
  maxTokens: number = 1000
) => {
  const key = getOpenAIKey();
  
  if (!key) {
    toast.error("OpenAI API Key nicht konfiguriert");
    throw new Error("OpenAI API Key not configured");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      toast.error(`API Fehler: ${errorData.error?.message || "Unbekannter Fehler"}`);
      throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    toast.error(`Fehler beim Aufruf der OpenAI API: ${(error as Error).message}`);
    throw error;
  }
};

// Generate a complete SOP document based on template info
export const generateSOPDocument = async (
  template: { 
    title: string; 
    category: string; 
    description: string; 
    type: string; 
  },
  qmsStandard: string = "ISO 9001"
) => {
  const systemPrompt = `Du bist ein Experte für Qualitätsmanagement und erstellst detaillierte Standard Operating Procedures (SOPs) für Forschungseinrichtungen.
  Erstelle eine vollständige, detaillierte SOP mit dem Titel "${template.title}" für die Kategorie "${template.category}" 
  gemäß dem QM-Standard ${qmsStandard}. 
  Die SOP sollte folgende Elemente enthalten:
  1. Zweck und Anwendungsbereich
  2. Verantwortlichkeiten
  3. Definitionen
  4. Verfahren/Prozess (detaillierte Schritte)
  5. Dokumentation
  6. Referenzen/zugehörige Dokumente
  7. Anhänge (falls zutreffend)
  
  Die SOP bezieht sich auf: ${template.description}
  
  Das Format sollte professionell und konform mit ${qmsStandard} Anforderungen sein. 
  Die Antwort sollte ausschließlich den Text der SOP enthalten, ohne zusätzliche Kommentare.`;

  const messages: OpenAIMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Erstelle eine SOP für "${template.title}" gemäß ${qmsStandard}` }
  ];

  return callOpenAI(messages, "gpt-4o", 0.7, 2500);
};

// Generate a response for the QMS AI advisor
export const generateQMSAdvice = async (
  userMessage: string,
  chatHistory: { content: string; sender: 'user' | 'assistant'; timestamp: Date }[]
) => {
  // Convert chat history to OpenAI format
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `Du bist ein Experte für Qualitätsmanagement und hilfst Benutzern bei der Auswahl und Implementierung von QM-Systemen wie ISO 9001, ISO 13485, cGMP, HACCP und anderen für ihre Forschungsprojekte.
      Beantworte Fragen sachlich und kompetent und gib spezifische, handlungsorientierte Ratschläge.
      Deine Antworten sollten informativ, höflich und auf Deutsch sein.
      Wenn du etwas nicht weißt, gib das offen zu, statt zu spekulieren.`
    }
  ];

  // Add the last 5 messages from chat history to provide context
  const relevantHistory = chatHistory.slice(-10);
  for (const message of relevantHistory) {
    messages.push({
      role: message.sender === 'user' ? 'user' : 'assistant',
      content: message.content
    });
  }

  // Add the current user message
  messages.push({ role: "user", content: userMessage });

  return callOpenAI(messages, "gpt-4o-mini", 0.7, 1000);
};
