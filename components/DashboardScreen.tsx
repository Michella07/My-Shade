import React, { useState, useMemo } from 'react';
import { shadeCollection, ShadeCategory } from '../data/shades';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { CrownIcon } from './icons';

const ShadeCard: React.FC<{ product: Product }> = ({ product }) => {
    const { user, navigateTo, setSelectedProductForTryOn } = useAppContext();
    const hasAccess = user?.subscriptionStatus === 'Pro' || user?.subscriptionStatus === 'Premium';

    const handleSelect = () => {
        if (hasAccess) {
            setSelectedProductForTryOn(product);
            navigateTo('tryOn');
        } else {
            alert('Fitur "Coba Virtual" memerlukan langganan Pro atau Premium. Silakan upgrade paket Anda untuk melanjutkan.');
            navigateTo('premiumPlans');
        }
    };

    return (
        <button
            className="relative flex flex-col items-center space-y-1 group focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg p-1 text-center"
            onClick={handleSelect}
            aria-label={`Try on ${product.shadeName} from ${product.brand} ${product.productName}`}
        >
            {!hasAccess && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-white rounded-full z-10 flex items-center justify-center shadow-md" style={{ width: '24px', height: '24px' }}>
                    <CrownIcon className="w-4 h-4" />
                </div>
            )}
            <div
                className="w-16 h-16 rounded-full border-2 border-white shadow-lg group-hover:scale-110 transform transition-transform duration-200 mb-1"
                style={{ backgroundColor: product.shadeColor }}
            ></div>
            <p className="text-[10px] text-pink-500 font-semibold uppercase tracking-wide">{product.brand}</p>
            <p className="text-xs text-gray-700 font-medium leading-tight h-8">{product.shadeName}</p>
            <p className="text-xs text-gray-500 font-semibold">Rp{product.price.toLocaleString('id-ID')}</p>
        </button>
    );
};


const DashboardScreen: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ShadeCategory['name']>('Foundation');

    const categories = useMemo(() => shadeCollection.map(cat => cat.name), []);

    const activeShades = useMemo(() => {
        return shadeCollection.find(cat => cat.name === activeCategory)?.shades || [];
    }, [activeCategory]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-800 text-center">Koleksi Shade</h1>
                <p className="text-center text-sm text-gray-500 mt-1">Jelajahi berbagai shade makeup yang tersedia.</p>
            </header>

            <div className="p-4">
                <div className="flex justify-center bg-gray-200 rounded-full p-1 mb-6 shadow-inner">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`w-full px-3 py-2 text-sm font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-pink-500 ${
                                activeCategory === category ? 'bg-white text-pink-600 shadow' : 'text-gray-600 hover:bg-white/60'
                            }`}
                            aria-pressed={activeCategory === category}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-3 gap-y-4">
                     {activeShades.map(shade => {
                        const product: Product = {
                            id: shade.id,
                            category: activeCategory,
                            brand: shade.brand,
                            productName: shade.productName,
                            shadeName: shade.shadeName,
                            shadeColor: shade.color,
                            price: shade.price,
                            description: `A popular ${shade.shadeName} shade from ${shade.brand}.`
                        };
                        return <ShadeCard key={shade.id} product={product} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
