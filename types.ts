export type Screen = 'splash' | 'login' | 'dashboard' | 'camera' | 'analysis' | 'profile' | 'favorites' | 'matcher' | 'premiumPlans' | 'tryOn' | 'purchase' | 'analysisHistory' | 'customerSupport' | 'muaConsultation' | 'brandPartnerships' | 'payment' | 'paymentPending';

export interface User {
  name: string;
  email: string;
  avatar: string;
  phone: string;
  subscriptionStatus: 'Gratis' | 'Pro' | 'Premium';
}

export interface Product {
  id: string;
  category: 'Foundation' | 'Lipstick' | 'Blush';
  brand: string;
  productName: string;
  shadeName: string;
  shadeColor: string; // Hex color code for the shade
  price: number;
  description: string;
}

export interface AnalysisResult {
  image: string; // The base64 captured image
  skinTone: string;
  undertone: string;
  dominantColor: string;
  analysisExplanation: string;
  products: Product[];
}

export interface SupportMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: number;
}