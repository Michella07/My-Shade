import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, HistoryIcon } from './icons';
import { AnalysisResult, Product } from '../types';

const HistoryProduct: React.FC<{product: Product}> = ({ product }) => (
    <div className="flex items-center space-x-2">
        <div className="w-6 h-6 rounded-full border border-gray-200" style={{backgroundColor: product.shadeColor}}></div>
        <div>
            <p className="text-xs font-semibold text-gray-700">{product.brand} - {product.shadeName}</p>
        </div>
    </div>
);

const HistoryCard: React.FC<{ result: AnalysisResult }> = ({ result }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex space-x-4 p-4">
                <img src={`data:image/jpeg;base64,${result.image}`} alt="Analyzed face" className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-grow">
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                            <p className="text-xs text-gray-500">Skin Tone</p>
                            <p className="font-bold text-sm text-gray-800">{result.skinTone}</p>
                        </div>
                         <div>
                            <p className="text-xs text-gray-500">Undertone</p>
                            <p className="font-bold text-sm text-gray-800">{result.undertone}</p>
                        </div>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500">Rekomendasi</p>
                         <div className="space-y-1 mt-1">
                            {result.products.slice(0, 2).map(p => <HistoryProduct key={p.id} product={p} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AnalysisHistoryScreen: React.FC = () => {
    const { analysisHistory, navigateTo } = useAppContext();

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => navigateTo('profile')} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Riwayat Analisis</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <div className="p-4">
                {analysisHistory.length === 0 ? (
                    <div className="text-center pt-20">
                        <HistoryIcon className="w-16 h-16 mx-auto text-gray-300" />
                        <h2 className="mt-4 text-xl font-semibold text-gray-700">Belum Ada Riwayat</h2>
                        <p className="mt-2 text-gray-500">Lakukan analisis warna kulit untuk melihat riwayat Anda di sini.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {analysisHistory.map((result, index) => (
                            <HistoryCard key={index} result={result} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalysisHistoryScreen;
