import { GoogleGenAI, Type } from "@google/genai";

// 宣告全域變數，防止編譯器報錯
declare global {
  interface Window {
    process: {
      env: {
        API_KEY: string;
      }
    }
  }
}

export const getRecipeSuggestion = async (boxItems: string[]) => {
  // 優先從環境變數獲取 API Key
  const key = process.env.API_KEY;
  
  if (!key) {
    console.warn("Gemini API Key is missing. AI recipe suggestion is disabled.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: key });
  const prompt = `我購買了一個蔬菜箱，裡面包含：${boxItems.join(', ')}。請推薦一個簡單健康的台灣家常食譜。請以 JSON 格式回應，結構如下：{ "name": "菜名", "steps": ["步驟1", "步驟2"] }`;

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
    console.error("AI 推薦失敗:", error);
    return null;
  }
};
