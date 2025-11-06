
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, CrownIcon, SparklesIcon } from './icons';
import { Product } from '../types';
import { shadeCollection } from '../data/shades';

type MakeupCategory = 'Foundation' | 'Blush' | 'Lipstick';

const PremiumGate: React.FC = () => {
    const { navigateTo } = useAppContext();
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg m-4">
            <CrownIcon className="w-16 h-16 mx-auto text-yellow-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Fitur Coba Virtual Eksklusif</h2>
            <p className="mt-2 text-gray-600">
                Upgrade ke Pro atau Premium untuk mencoba semua shade makeup secara virtual dengan kamera Anda.
            </p>
            <button
                onClick={() => navigateTo('premiumPlans')}
                className="mt-6 w-full bg-pink-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2"
            >
                <SparklesIcon className="w-5 h-5" />
                <span>Lihat Paket Langganan</span>
            </button>
        </div>
    );
};


const TryOnScreen: React.FC = () => {
    const { user, selectedProductForTryOn, navigateTo, fromScreen, setSelectedProductForPurchase } = useAppContext();
    const hasAccess = user?.subscriptionStatus === 'Pro' || user?.subscriptionStatus === 'Premium';

    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    const [activeTab, setActiveTab] = useState<MakeupCategory>('Foundation');
    
    const [selectedFoundation, setSelectedFoundation] = useState<Product | null>(null);
    const [selectedBlush, setSelectedBlush] = useState<Product | null>(null);
    const [selectedLipstick, setSelectedLipstick] = useState<Product | null>(null);

    useEffect(() => {
        if (selectedProductForTryOn) {
            const category = selectedProductForTryOn.category as MakeupCategory;
            setActiveTab(category);
            switch (category) {
                case 'Foundation': setSelectedFoundation(selectedProductForTryOn); break;
                case 'Blush': setSelectedBlush(selectedProductForTryOn); break;
                case 'Lipstick': setSelectedLipstick(selectedProductForTryOn); break;
            }
        } else {
             const defaultFoundationShade = shadeCollection.find(c => c.name === 'Foundation')?.shades[0];
             if (defaultFoundationShade) {
                setSelectedFoundation({
                    id: defaultFoundationShade.id, category: 'Foundation', brand: defaultFoundationShade.brand, productName: defaultFoundationShade.productName, shadeName: defaultFoundationShade.shadeName, shadeColor: defaultFoundationShade.color, price: defaultFoundationShade.price, description: ''
                });
             }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProductForTryOn]);


    const selectableShades = useMemo(() => {
        return shadeCollection
            .find(cat => cat.name === activeTab)?.shades
            .map((shade): Product => ({
                id: shade.id, category: activeTab, brand: shade.brand, productName: shade.productName, shadeName: shade.shadeName, shadeColor: shade.color, price: shade.price, description: `A beautiful ${shade.shadeName} shade.`
            })) || [];
    }, [activeTab]);
    
    const activeProduct = useMemo(() => {
        switch(activeTab) {
            case 'Foundation': return selectedFoundation;
            case 'Blush': return selectedBlush;
            case 'Lipstick': return selectedLipstick;
            default: return null;
        }
    }, [activeTab, selectedFoundation, selectedBlush, selectedLipstick]);

    const handleSelectShade = (product: Product) => {
        switch (product.category) {
            case 'Foundation': setSelectedFoundation(prev => prev?.id === product.id ? null : product); break;
            case 'Blush': setSelectedBlush(prev => prev?.id === product.id ? null : product); break;
            case 'Lipstick': setSelectedLipstick(prev => prev?.id === product.id ? null : product); break;
        }
    };
    
    useEffect(() => {
        if (!hasAccess) return;

        let activeStream: MediaStream | null = null;
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user' }, audio: false
                });
                activeStream = mediaStream;
                setStream(mediaStream);
                if (videoRef.current) videoRef.current.srcObject = mediaStream;
            } catch (err) {
                setError("Tidak dapat mengakses kamera. Mohon periksa izin dan coba lagi.");
            }
        };
        startCamera();
        return () => {
            if (activeStream) activeStream.getTracks().forEach(track => track.stop());
        };
    }, [hasAccess]);

    const handleBack = () => navigateTo(fromScreen || 'dashboard');
    const handleBuyNow = (product: Product | null) => {
        if (product) {
            setSelectedProductForPurchase(product);
            navigateTo('purchase');
        }
    }

    const tabs: MakeupCategory[] = ['Foundation', 'Blush', 'Lipstick'];

    if (!hasAccess) {
        return (
            <div className="w-full h-screen flex flex-col bg-pink-50">
                <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                    <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-100">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Coba Virtual</h1>
                    <div className="w-10"></div>
                </header>
                <div className="flex-grow flex items-center justify-center">
                    <PremiumGate />
                </div>
            </div>
        );
    }


    return (
        <div className="w-full h-screen bg-black flex flex-col relative text-white">
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 h-full w-full object-cover" style={{ transform: 'scaleX(-1)' }} />
            
            {error && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center z-50">
                    <p className="font-semibold text-red-400">{error}</p>
                </div>
            )}
            
            {!error && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    {selectedFoundation && <div className="absolute inset-0 transition-colors" style={{ backgroundColor: selectedFoundation.shadeColor, opacity: 0.4, mixBlendMode: 'soft-light' }} />}
                    
                    {selectedBlush && (
                        <>
                           <div className="absolute transition-colors" style={{ top: '40%', left: '10%', width: '30%', height: '15%', backgroundColor: selectedBlush.shadeColor, opacity: 0.35, mixBlendMode: 'overlay', filter: 'blur(30px)', borderRadius: '50%' }} />
                           <div className="absolute transition-colors" style={{ top: '40%', right: '10%', width: '30%', height: '15%', backgroundColor: selectedBlush.shadeColor, opacity: 0.35, mixBlendMode: 'overlay', filter: 'blur(30px)', borderRadius: '50%' }} />
                        </>
                    )}

                    {selectedLipstick && <div className="absolute transition-colors" style={{ top: '63%', left: '50%', transform: 'translateX(-50%)', width: '25%', height: '8%', backgroundColor: selectedLipstick.shadeColor, opacity: 0.6, mixBlendMode: 'color', filter: 'blur(8px)', borderRadius: '40% 40% 50% 50% / 60% 60% 40% 40%' }} />}
                </div>
            )}

            <div className="absolute inset-0 z-20 flex flex-col justify-between">
                <header className="w-full p-4 flex items-start justify-between bg-gradient-to-b from-black/50 to-transparent">
                    <button onClick={handleBack} className="p-2 rounded-full hover:bg-white/20">
                        <ArrowLeftIcon className="w-6 h-6" />
                    </button>
                    <div className="text-center font-bold">
                        <p className="text-lg uppercase tracking-wider">{activeProduct?.productName || activeTab}</p>
                        <p className="text-sm text-gray-300">{activeProduct?.brand}</p>
                    </div>
                    <div className="w-10"></div>
                </header>

                <div className="flex-grow flex">
                    <div className="w-24 flex flex-col items-center justify-center p-2 space-y-2">
                        <div className="flex-grow w-full overflow-y-auto space-y-3 pr-1 hide-scrollbar" >
                             {selectableShades.map(shade => (
                                <div key={shade.id} className="text-center flex-shrink-0">
                                    <button 
                                        onClick={() => handleSelectShade(shade)}
                                        className={`w-12 h-12 rounded-full border-2 transition-all duration-200 mx-auto shadow-lg ${activeProduct?.id === shade.id ? 'border-pink-400 scale-110' : 'border-white/50'}`}
                                        style={{ backgroundColor: shade.shadeColor }}
                                        aria-label={`Select shade ${shade.shadeName}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {activeProduct && (
                        <div className="absolute left-24 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm p-3 rounded-lg text-center pointer-events-none">
                            <p className="font-bold uppercase tracking-wide">{activeProduct.shadeName}</p>
                            <p className="text-xs text-gray-300">TAP TO BLEND</p>
                        </div>
                    )}
                </div>

                <footer className="w-full p-4 bg-gradient-to-t from-black/50 to-transparent space-y-3">
                    <div className="flex justify-center bg-black/20 backdrop-blur-sm rounded-full p-1">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`w-full px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-white text-black shadow' : 'text-white'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                     <div className="flex justify-center">
                        <button 
                            onClick={() => handleBuyNow(activeProduct)}
                            disabled={!activeProduct}
                            className="bg-pink-500 text-white font-bold py-3 px-8 rounded-full text-center shadow-lg hover:bg-pink-600 transition-colors disabled:bg-gray-500"
                        >
                           {activeProduct ? `Beli ${activeProduct.shadeName}` : 'Pilih Shade'}
                        </button>
                     </div>
                </footer>
            </div>
             <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
};

export default TryOnScreen;
