

import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from '../types';
import { shadeCollection } from '../data/shades';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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

export const analyzeSkinToneFromImage = async (base64Image: string): Promise<Omit<AnalysisResult, 'image'>> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: 'image/jpeg',
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
        
        // Ensure products array has at most 4 items as requested
        if (result.products && result.products.length > 4) {
          result.products = result.products.slice(0, 4);
        }

        return result;

    } catch (error)
    {
        console.error("Error analyzing skin tone with Gemini:", error);
        // Check for specific Gemini API errors if possible, otherwise generic message
        if (error instanceof Error && error.message.includes('json')) {
             throw new Error("The AI returned an invalid format. Please try again with a better lit photo.");
        }
        throw new Error("Failed to analyze image. Please try again with a clearer photo in good lighting.");
    }
};

export const getSupportResponse = async (
    // FIX: The messageHistory parameter should be an array of objects to represent the conversation history.
    messageHistory: { role: 'user' | 'model', parts: { text: string }[] }[]
): Promise<string> => {
    try {
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
        return "Maaf, sepertinya ada gangguan. Coba beberapa saat lagi ya.";
    }
};