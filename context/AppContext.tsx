import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Screen, User, Product, AnalysisResult, SupportMessage } from '../types';
import { getSupportResponse } from '../services/geminiService';

interface PlanForPayment {
    name: 'Gratis' | 'Pro' | 'Premium';
    price: string;
}

interface AppContextType {
    screen: Screen;
    fromScreen: Screen;
    user: User | null;
    favorites: Product[];
    analysisHistory: AnalysisResult[];
    capturedImage: string | null;
    capturedImageMimeType: string;
    analysisResult: AnalysisResult | null;
    analysisCount: number;
    tryOnCount: number;
    selectedProductForTryOn: Product | null;
    selectedProductForPurchase: Product | null;
    supportMessages: SupportMessage[];
    isAgentTyping: boolean;
    selectedPlanForPayment: PlanForPayment | null;
    navigateTo: (screen: Screen) => void;
    login: () => void;
    logout: () => void;
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    setCapturedImage: (image: string | null, mimeType?: string) => void;
    setAnalysisResult: (result: AnalysisResult | null) => void;
    addAnalysisToHistory: (result: AnalysisResult) => void;
    setSubscriptionStatus: (status: 'Gratis' | 'Pro' | 'Premium') => void;
    setSelectedProductForTryOn: (product: Product | null) => void;
    incrementTryOnCount: () => void;
    setSelectedProductForPurchase: (product: Product | null) => void;
    sendSupportMessage: (text: string) => Promise<void>;
    setSelectedPlanForPayment: (plan: PlanForPayment | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [screen, setScreen] = useState<Screen>('splash');
    const [fromScreen, setFromScreen] = useState<Screen>('splash');
    const [user, setUser] = useState<User | null>(null);
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);
    const [capturedImage, _setCapturedImage] = useState<string | null>(null);
    const [capturedImageMimeType, setCapturedImageMimeType] = useState('image/jpeg');
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [analysisCount, setAnalysisCount] = useState(12);
    const [tryOnCount, setTryOnCount] = useState(25);
    const [selectedProductForTryOn, setSelectedProductForTryOn] = useState<Product | null>(null);
    const [selectedProductForPurchase, setSelectedProductForPurchase] = useState<Product | null>(null);
    const [supportMessages, setSupportMessages] = useState<SupportMessage[]>([
        { id: 'agent-welcome', text: 'Halo! Nama saya Maya, asisten virtual MyShade. Ada yang bisa saya bantu?', sender: 'agent', timestamp: Date.now() }
    ]);
    const [isAgentTyping, setIsAgentTyping] = useState(false);
    const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PlanForPayment | null>(null);


    const navigateTo = (newScreen: Screen) => {
        setFromScreen(screen);
        setScreen(newScreen);
    };

    const setCapturedImage = (image: string | null, mimeType: string = 'image/jpeg') => {
        _setCapturedImage(image);
        if (image) {
            setCapturedImageMimeType(mimeType);
        }
    };

    const login = () => {
        setUser({ 
            name: 'Sarah Johnson', 
            email: 'sarah.johnson@gmail.com', 
            avatar: `https://i.pravatar.cc/150?u=sarahjohnson`,
            phone: '+62 812-3456-7890',
            subscriptionStatus: 'Gratis'
        });
        navigateTo('dashboard');
    };
    
    const logout = () => {
        setUser(null);
        navigateTo('login');
    };

    const addFavorite = (product: Product) => {
        setFavorites(prev => [...prev, product]);
    };

    const removeFavorite = (productId: string) => {
        setFavorites(prev => prev.filter(p => p.id !== productId));
    };

    const isFavorite = useCallback((productId: string) => {
        return favorites.some(p => p.id === productId);
    }, [favorites]);

    const addAnalysisToHistory = (result: AnalysisResult) => {
        setAnalysisHistory(prev => [result, ...prev]);
        setAnalysisCount(prev => prev + 1);
    };

    const setSubscriptionStatus = (status: 'Gratis' | 'Pro' | 'Premium') => {
        if(user) {
            setUser({...user, subscriptionStatus: status});
        }
    };
    
    const incrementTryOnCount = () => {
        setTryOnCount(prev => prev + 1);
    }
    
    const sendSupportMessage = async (text: string) => {
        const userMessage: SupportMessage = {
            id: `user-${Date.now()}`,
            text,
            sender: 'user',
            timestamp: Date.now()
        };
        
        const updatedMessages = [...supportMessages, userMessage];
        setSupportMessages(updatedMessages);
        setIsAgentTyping(true);

        try {
            const history = updatedMessages.map((msg): { role: 'user' | 'model'; parts: { text: string }[] } => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            }));
            
            const agentResponseText = await getSupportResponse(history);
            
            const agentMessage: SupportMessage = {
                id: `agent-${Date.now()}`,
                text: agentResponseText,
                sender: 'agent',
                timestamp: Date.now()
            };
            
            setSupportMessages(prev => [...prev, agentMessage]);
        } catch (error) {
            console.error("Error getting support response:", error);
            const errorMessage: SupportMessage = {
                id: `agent-error-${Date.now()}`,
                text: "Maaf, sepertinya ada gangguan. Coba beberapa saat lagi ya.",
                sender: 'agent',
                timestamp: Date.now()
            };
            setSupportMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsAgentTyping(false);
        }
    };


    return (
        <AppContext.Provider value={{
            screen,
            fromScreen,
            user,
            favorites,
            analysisHistory,
            capturedImage,
            capturedImageMimeType,
            analysisResult,
            analysisCount,
            tryOnCount,
            selectedProductForTryOn,
            selectedProductForPurchase,
            supportMessages,
            isAgentTyping,
            selectedPlanForPayment,
            navigateTo,
            login,
            logout,
            addFavorite,
            removeFavorite,
            isFavorite,
            setCapturedImage,
            setAnalysisResult,
            addAnalysisToHistory,
            setSubscriptionStatus,
            setSelectedProductForTryOn,
            incrementTryOnCount,
            setSelectedProductForPurchase,
            sendSupportMessage,
            setSelectedPlanForPayment
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};