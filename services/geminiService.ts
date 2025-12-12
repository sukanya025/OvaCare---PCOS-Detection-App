import { GoogleGenAI, Type } from "@google/genai";
import { RiskAssessmentData, RiskResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instructions for the mentor persona
const MENTOR_INSTRUCTION = `
You are Dr. Ova, a compassionate and knowledgeable medical expert specializing in women's health and PCOS (Polycystic Ovary Syndrome). 
Your goal is to provide supportive mentorship, answer medical questions accurately but simply, and guide users toward professional medical help when necessary.
Always maintain an empathetic, non-judgmental tone.
If a user asks about medical diagnosis, clarify that you are an AI assistant and they should see a doctor for confirmation, but provide educational insights based on their description.
`;

export const getMentorshipResponse = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  if (!apiKey) throw new Error("API Key missing");

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: MENTOR_INSTRUCTION,
    },
    history: history,
  });

  const result = await chat.sendMessage({ message });
  return result.text;
};

export const assessPCOSRisk = async (data: RiskAssessmentData): Promise<RiskResult> => {
  if (!apiKey) throw new Error("API Key missing");

  const prompt = `
    Analyze the following patient data for PCOS risk factors. 
    Data: ${JSON.stringify(data)}.
    
    Provide a risk assessment based on clinical guidelines (Rotterdam criteria logic where applicable, but simplified for screening).
    Generate a JSON response.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskScore: { type: Type.NUMBER, description: "A score from 0 to 100 indicating risk probability." },
          riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High"] },
          summary: { type: Type.STRING, description: "A friendly summary for the patient." },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of actionable health steps." },
          doctorReportSummary: { type: Type.STRING, description: "A concise, technical summary using medical terminology suitable for a doctor to read quickly." }
        },
        required: ["riskScore", "riskLevel", "summary", "recommendations", "doctorReportSummary"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as RiskResult;
  }
  
  throw new Error("Failed to generate assessment");
};

export const generateWorkoutPlan = async (age: number, activityLevel: string): Promise<any> => {
    if (!apiKey) return null;

    const prompt = `Create a daily workout plan for a ${age} year old woman with a ${activityLevel} activity level, specifically optimized for hormonal balance and metabolic health (PCOS friendly). Return JSON.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        focus: { type: Type.STRING },
                        exercises: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    duration: { type: Type.STRING },
                                    intensity: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });
        return JSON.parse(response.text);
    } catch (e) {
        console.error(e);
        return null;
    }
}
