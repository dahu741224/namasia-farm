import { GoogleGenAI, Type } from "@google/genai";

export const getRecipeSuggestion = async (boxItems: string[]) => {
  // 每次呼叫時才從 process.env 獲取，確保抓到 Vite 注入的值
  const key = process.env.API_KEY;
  
  if (!key) {
    console.warn("API KEY 未設定，無法使用 AI 功能");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: key });
  const prompt = `我購買了一個蔬菜箱，裡面包含以下食材：${boxItems.join(', ')}。請根據這些食材，推薦一個簡單又健康的台灣家常菜食譜。請以 JSON 格式回應，包含食譜名稱(name)和簡短步驟(steps，陣列)。`;

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
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
