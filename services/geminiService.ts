

import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from '../types';
import { shadeCollection } from '../data/shades';

const getInitializedAI = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        // This is a developer-facing error, caught and translated for the user in the functions below.
        throw new Error("API_KEY_NOT_CONFIGURED");
    }
    return new GoogleGenAI({ apiKey });
};

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        skinTone: { type: Type.STRING, description: "A concise Indonesian skin tone description, e.g., 'Sawo Matang', 'Kuning Langsat'." },
        undertone: { type: Type.STRING, description: "The skin undertone in Indonesian, e.g., 'Hangat (Warm)', 'Netral (Neutral)', 'Dingin (Cool)'." },
        dominantColor: { type: Type.STRING, description: "The dominant skin color as a CSS hex code, e.g., '#C68642'." },
        products: {
            type: Type.ARRAY,
            description: "An array of 4 recommended makeup products (2 foundations, 2 lipsticks).",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING, description: "A unique ID for the product, like 'brand-product-shade'."},
                    category: { type: Type.STRING, description: "Category of the product: 'Foundation' or 'Lipstick'." },
                    brand: { type: Type.STRING, description: "The brand name of the product." },
                    productName: { type: Type.STRING, description: "The name of the product line." },
                    shadeName: { type: Type.STRING, description: "The specific shade name of the product." },
                    shadeColor: { type: Type.STRING, description: "The hex color code for the shade, e.g., '#E58C83'." },
                    price: { type: Type.NUMBER, description: "Price in Indonesian Rupiah (IDR)." },
                    description: { type: Type.STRING, description: "A brief, one-sentence description of the product." }
                },
                required: ["id", "category", "brand", "productName", "shadeName", "shadeColor", "price", "description"]
            }
        }
    },
    required: ["skinTone", "undertone", "dominantColor", "products"]
};

export const analyzeSkinToneFromImage = async (base64Image: string, mimeType: string): Promise<Omit<AnalysisResult, 'image'>> => {
    try {
        const ai = getInitializedAI();
        
        const imagePart = {
            inlineData: {
                mimeType: mimeType,
                data: base64Image,
            },
        };

        const availableProductsJson = JSON.stringify(shadeCollection);

        const textPart = {
            text: `Analyze the skin tone of the person in this image. They are from Indonesia.
            First, determine their skin tone (e.g., 'Sawo Matang'), undertone (e.g., 'Hangat (Warm)'), and the dominant skin color as a CSS hex code.

            Next, from the following JSON list of available makeup products, please select the 4 most suitable items for the analyzed skin tone: 2 foundations and 2 lipsticks.

            AVAILABLE PRODUCTS:
            ${availableProductsJson}

            Your response must be a single JSON object that strictly follows the provided schema.
            The 'products' array in your response should contain the complete, unmodified JSON objects for the 4 products you selected from the list. Generate a concise, one-sentence 'description' for each selected product.
            Do not add any markdown formatting like \`\`\`json or any explanatory text outside of the main JSON object.`
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2,
            }
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (result.products && result.products.length > 4) {
          result.products = result.products.slice(0, 4);
        }

        return result;

    } catch (error)
    {
        console.error("Error analyzing skin tone with Gemini:", error);

        let errorMessage = "Gagal menganalisis gambar. Coba lagi dengan foto yang lebih jelas dan pencahayaan yang baik.";

        if (error instanceof Error) {
            const errorText = error.toString();
             if (error.message === "API_KEY_NOT_CONFIGURED" || errorText.toLowerCase().includes('api key not valid')) {
                errorMessage = "Kunci API tidak valid atau belum diatur. Pastikan Anda telah mengatur environment variable 'API_KEY' di Vercel.";
            } else if (errorText.includes('json') || errorText.includes('JSON')) {
                errorMessage = "AI mengembalikan format respons yang tidak valid. Coba lagi dengan foto yang lebih terang.";
            } else if (errorText.includes('400')) {
                errorMessage = "Gambar tidak dapat diproses. Mungkin rusak, tidak valid, atau ukurannya terlalu besar. Coba foto lain.";
            } else if (errorText.includes('500') || errorText.includes('503')) {
                errorMessage = "Terjadi masalah dengan layanan analisis. Silakan coba lagi nanti.";
            }
        }
        
        throw new Error(errorMessage);
    }
};

export const getSupportResponse = async (
    messageHistory: { role: 'user' | 'model', parts: { text: string }[] }[]
): Promise<string> => {
    try {
        const ai = getInitializedAI();

        if (!messageHistory || messageHistory.length === 0) {
             throw new Error("Terjadi masalah dengan riwayat percakapan. Mohon mulai percakapan baru.");
        }

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: messageHistory,
            config: {
                systemInstruction: `You are a friendly and helpful customer support agent for "MyShade", an AI makeup recommendation app. 
                Your name is Maya. Be concise, empathetic, and knowledgeable about the app. 
                The app features are: AI skin tone analysis, makeup shade recommendations, virtual try-on, favorites list, and premium plans with access to makeup artist consultations. 
                Keep your answers short and conversational. Respond in Bahasa Indonesia.`,
                temperature: 0.7,
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error getting support response from Gemini:", error);

        let errorMessage = "Maaf, sepertinya ada gangguan. Coba beberapa saat lagi ya.";
        if (error instanceof Error) {
            const errorText = error.toString().toLowerCase();
            if (error.message === "API_KEY_NOT_CONFIGURED" || errorText.includes('api key not valid')) {
                errorMessage = "Terjadi masalah koneksi ke layanan AI. Pastikan Anda telah mengatur environment variable 'API_KEY' di Vercel.";
            } else if (errorText.includes('quota')) {
                 errorMessage = "Maaf, kami sedang menerima banyak permintaan. Coba lagi nanti.";
            } else if (errorText.includes('400')) {
                errorMessage = "Terjadi masalah dengan permintaan. Mohon coba lagi memulai percakapan baru.";
            } else if (errorText.includes('500') || errorText.includes('503') || errorText.includes('candidate')) {
                errorMessage = "Layanan AI sedang mengalami gangguan atau memblokir respons. Silakan coba beberapa saat lagi.";
            } else {
                 errorMessage = error.message;
            }
        }
        throw new Error(errorMessage);
    }
};
