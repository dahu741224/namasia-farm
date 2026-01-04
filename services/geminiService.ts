import { GoogleGenAI, Type } from "@google/genai";

// 宣告 process 以避免 TypeScript 在編譯時噴錯
declare var process: {
  env: {
    API_KEY: string;
  }
};

export const getRecipeSuggestion = async (boxItems: string[]) => {
  const key = process.env.API_KEY;
  
  if (!key) {
    console.warn("API KEY 未設定，AI 功能已暫時停用");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: key });
  const prompt = `我購買了一個蔬菜箱，裡面包含：${boxItems.join(', ')}。請推薦一個簡單健康的台灣家常食譜。請以 JSON 回應：{ "name": "菜名", "steps": ["步驟1", "步驟2"] }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["name", "steps"]
        }
      }
    });
    
    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Gemini 服務異常:", error);
    return null;
  }
};
