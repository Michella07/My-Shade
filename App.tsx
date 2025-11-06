import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import ShadeCollectionScreen from './components/DashboardScreen'; // Renamed import for clarity, though file is the same
import MatcherScreen from './components/MatcherScreen';
import CameraView from './components/CameraView';
import AnalysisScreen from './components/AnalysisScreen';
import ProfileScreen from './components/ProfileScreen';
import FavoritesScreen from './components/FavoritesScreen';
import PremiumPlansScreen from './components/PremiumPlansScreen';
import TryOnScreen from './components/TryOnScreen';
import PurchaseScreen from './components/PurchaseScreen';
import AnalysisHistoryScreen from './components/AnalysisHistoryScreen';
import CustomerSupportScreen from './components/CustomerSupportScreen';
import MuaConsultationScreen from './components/MuaConsultationScreen';
import BrandPartnershipsScreen from './components/BrandPartnershipsScreen';
import BottomNavBar from './components/BottomNavBar';
import PaymentScreen from './components/PaymentScreen';
import PaymentPendingScreen from './components/PaymentPendingScreen';

const AppContent: React.FC = () => {
    const { screen, user } = useAppContext();

    const renderScreen = () => {
        if (!user) {
            switch (screen) {
                case 'login':
                    return <LoginScreen />;
                default:
                    return <SplashScreen />;
            }
        }

        switch (screen) {
            case 'dashboard':
                return <ShadeCollectionScreen />;
            case 'matcher':
                return <MatcherScreen />;
            case 'camera':
                return <CameraView />;
            case 'analysis':
                return <AnalysisScreen />;
            case 'profile':
                return <ProfileScreen />;
            case 'favorites':
                return <FavoritesScreen />;
            case 'premiumPlans':
                return <PremiumPlansScreen />;
            case 'tryOn':
                return <TryOnScreen />;
            case 'purchase':
                return <PurchaseScreen />;
            case 'analysisHistory':
                return <AnalysisHistoryScreen />;
            case 'customerSupport':
                return <CustomerSupportScreen />;
            case 'muaConsultation':
                return <MuaConsultationScreen />;
            case 'brandPartnerships':
                return <BrandPartnershipsScreen />;
            case 'payment':
                return <PaymentScreen />;
            case 'paymentPending':
                return <PaymentPendingScreen />;
            default:
                return <ShadeCollectionScreen />;
        }
    };
    
    const showNavBar = user && ['dashboard', 'matcher', 'favorites', 'profile', 'tryOn'].includes(screen);

    return (
        <div className="w-full min-h-screen font-sans bg-white flex justify-center">
            <div className="relative w-full max-w-md h-screen overflow-y-auto bg-pink-50 shadow-lg">
                <main className="pb-20">
                    {renderScreen()}
                </main>
                {showNavBar && <BottomNavBar />}
            </div>
        </div>
    );
};


const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;