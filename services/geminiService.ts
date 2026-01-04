import { GoogleGenAI, Type } from "@google/genai";

export const getRecipeSuggestion = async (boxItems: string[]) => {
  // ✅ Vite 前端環境變數必須用 import.meta.env 且 key 需 VITE_ 前綴
  const apiKey = import.meta.env.VITE_API_KEY as string | undefined;

  if (!apiKey) {
    console.warn("AI 功能目前無法使用：未偵測到 API Key");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `我購買了一個蔬菜箱，裡面包含：${boxItems.join(
    ", "
  )}。請推薦一個簡單健康的台灣家常食譜。請以 JSON 格式回應：{ "name": "菜名", "steps": ["步驟1", "步驟2"] }`;

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
              items: { type: Type.STRING },
            },
          },
          required: ["name", "steps"],
        },
      },
    });

    const text = response.text;
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error("Gemini 服務調用失敗:", error);
    return null;
  }
};
