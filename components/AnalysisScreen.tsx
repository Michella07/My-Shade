
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { analyzeSkinToneFromImage } from '../services/geminiService';
import { Product, AnalysisResult } from '../types';
import { HeartIcon, ArrowLeftIcon } from './icons';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addFavorite, removeFavorite, isFavorite, navigateTo, setSelectedProductForTryOn, incrementTryOnCount, setSelectedProductForPurchase } = useAppContext();
    const favorite = isFavorite(product.id);

    const handleFavoriteClick = () => {
        if (favorite) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    const handleTryOnClick = () => {
        setSelectedProductForTryOn(product);
        incrementTryOnCount();
        navigateTo('tryOn');
    };

    const handleBuyNowClick = () => {
        setSelectedProductForPurchase(product);
        navigateTo('purchase');
    };
    
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-start p-4 space-x-4">
            <div className="w-24 h-24 rounded-lg flex-shrink-0" style={{backgroundColor: product.shadeColor || '#f0f0f0'}}>
                <img className="w-full h-full object-contain mix-blend-multiply" src={`https://picsum.photos/seed/${product.id}/200`} alt={product.productName} />
            </div>
            <div className="flex-grow">
                <p className="text-xs text-pink-500 font-semibold">{product.brand}</p>
                <h3 className="font-bold text-gray-800 leading-tight">{product.productName}</h3>
                <p className="text-sm text-gray-500">{product.shadeName}</p>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                    <p className="font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center space-x-2">
                        <button onClick={handleTryOnClick} className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300 font-semibold">Try On</button>
                        <button onClick={handleBuyNowClick} className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full hover:bg-pink-600 font-semibold">Beli</button>
                         <button onClick={handleFavoriteClick} className="text-gray-400 hover:text-pink-500 p-1">
                            <HeartIcon filled={favorite} className={`w-6 h-6 ${favorite ? 'text-pink-500' : ''}`} />
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProductCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-start p-4 space-x-4">
        <div className="w-24 h-24 rounded-lg flex-shrink-0 bg-gray-200 animate-pulse"></div>
        <div className="flex-grow space-y-2">
            <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-1"></div>
            <div className="flex justify-between items-center mt-2">
                <div className="h-5 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="flex items-center space-x-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

const AnalysisSkeleton: React.FC = () => (
    <div className="p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                    <div className="w-8 h-8 rounded-full mx-auto mt-1 bg-gray-200 animate-pulse"></div>
                </div>
            </div>
        </div>
        <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2 animate-pulse"></div>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
        </div>
    </div>
);


const AnalysisScreen: React.FC = () => {
    const { capturedImage, setAnalysisResult, addAnalysisToHistory, navigateTo } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AnalysisResult | null>(null);

    useEffect(() => {
        if (!capturedImage) {
            setError("No image found for analysis. Please go back and select one.");
            setLoading(false);
            return;
        }

        const performAnalysis = async () => {
            setLoading(true);
            setError(null);
            try {
                // Simulate a slightly longer loading time for better UX
                await new Promise(resolve => setTimeout(resolve, 1500));
                const analysisData = await analyzeSkinToneFromImage(capturedImage);
                
                const resultWithImage: AnalysisResult = { ...analysisData, image: capturedImage };
                
                setResult(resultWithImage);
                setAnalysisResult(resultWithImage);
                addAnalysisToHistory(resultWithImage);
            } catch (err: any) {
                setError(err.message || "An unknown error occurred during analysis.");
            } finally {
                setLoading(false);
            }
        };

        performAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [capturedImage]);

    
    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => navigateTo('matcher')} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Result</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            {loading ? (
                <AnalysisSkeleton />
            ) : error || !result ? (
                 <div className="p-6 text-center mt-10">
                     <h2 className="text-2xl font-bold text-red-600 mb-4">Analisis Gagal</h2>
                     <p className="text-red-500 mb-6">{error || "Could not retrieve analysis result."}</p>
                     <button onClick={() => navigateTo('matcher')} className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg">
                        Coba Lagi
                     </button>
                </div>
            ) : (
                <div className="p-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <img src={`data:image/jpeg;base64,${capturedImage}`} alt="Analyzed" className="w-full h-48 object-cover rounded-xl mb-4"/>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Analisis Kulit</h2>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-sm text-gray-500">Skin Tone</p>
                                <p className="font-bold text-lg text-gray-800">{result.skinTone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Undertone</p>
                                <p className="font-bold text-lg text-gray-800">{result.undertone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Warna Dominan</p>
                                <div className="w-8 h-8 rounded-full mx-auto mt-1 border border-gray-200" style={{ backgroundColor: result.dominantColor }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-700">Rekomendasi Produk</h2>
                        <p className="text-sm text-gray-500 -mt-2 px-1">Berikut adalah shade yang cocok untukmu dari koleksi kami.</p>
                        {result.products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalysisScreen;
