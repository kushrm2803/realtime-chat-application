import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const googleAI = new GoogleGenerativeAI(apiKey);

const removeBoldFormatting = async (text) => {
  const noBoldText = text.replace(/\*\*/g, "").replace(/\*/g, "");
  return noBoldText;
};

export const generateContent = async (
  prompt,
  temperature = 0.7,
  topK = 40,
  maxOutputTokens = 50
) => {
  const geminiConfig = {
    temperature,
    topK,
    maxOutputTokens,
  };

  const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
  });

  try {
    const rawResponse = await geminiModel.generateContent(prompt);
    const responseText = rawResponse.response.text();
    const noBoldText = removeBoldFormatting(responseText);
    return noBoldText;
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred during generation.";
  }
};
