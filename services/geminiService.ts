
import { GoogleGenAI } from "@google/genai";
import { QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT = `
Generate 10 multiple-choice quiz questions suitable for the Dhaka University (DU) admission test (specifically for B and D units). The questions should be in Bengali and cover subjects like Bangla Literature & Grammar, English, General Knowledge (Bangladesh Affairs & International Affairs).
Provide the output as a valid JSON array. Do not include any text outside of the JSON array.
Each object in the array must have three keys:
1.  "question": The question text in Bengali (or English for English subject questions).
2.  "options": An array of 4 strings.
3.  "correctAnswer": The correct option string from the "options" array.

Example format:
[
  {
    "question": "'আমার ভাইয়ের রক্তে রাঙানো একুশে ফেব্রুয়ারি' গানটির রচয়িতা কে?",
    "options": ["আবদুল গাফফার চৌধুরী", "আলতাফ মাহমুদ", "শামসুর রাহমান", "হাসান হাফিজুর রহমান"],
    "correctAnswer": "আবদুল গাফফার চৌধুরী"
  },
  {
    "question": "Which of the following is the correct spelling?",
    "options": ["Accomodate", "Acommodate", "Accommodate", "Acomodate"],
    "correctAnswer": "Accommodate"
  }
]
`;

export const generateQuizQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: PROMPT,
      config: {
        responseMimeType: "application/json",
        temperature: 0.8, // Slightly increased temperature for more varied questions
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    const parsedData = JSON.parse(jsonStr);

    if (Array.isArray(parsedData) && parsedData.every(item => 'question' in item && 'options' in item && 'correctAnswer' in item)) {
        return parsedData as QuizQuestion[];
    } else {
        console.warn("Generated data is not in the expected format, retrying...", parsedData);
        // Fallback or retry logic can be implemented here. For now, returning empty.
        return [];
    }

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to generate quiz. Please try again.");
  }
};
