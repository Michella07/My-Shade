import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon } from './icons';

const brandMappings: Record<string, { shopee?: string }> = {
    'Make Over': { shopee: 'makeoverofficial' },
    'Wardah': { shopee: 'wardah.official' },
    'Somethinc': { shopee: 'somethinc.official' },
    'Pixy': { shopee: 'pixyofficialstore' },
    'Glad2Glow': { shopee: 'glad2glow.id' },
    'Emina': { shopee: 'emina.official' },
    'Luxcrime': { shopee: 'luxcrime.official' },
};


const PurchaseScreen: React.FC = () => {
    const { selectedProductForPurchase, navigateTo, fromScreen } = useAppContext();

    if (!selectedProductForPurchase) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
                <p className="text-gray-600">Produk tidak ditemukan.</p>
                <button onClick={() => navigateTo('dashboard')} className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg">
                    Kembali ke Koleksi
                </button>
            </div>
        );
    }

    const product = selectedProductForPurchase;
    const searchTerm = encodeURIComponent(`${product.brand} ${product.productName} ${product.shadeName}`);
    const brandStore = brandMappings[product.brand];

    const shopeeUrl = brandStore?.shopee
        ? `https://shopee.co.id/${brandStore.shopee}?keyword=${searchTerm}`
        : `https://shopee.co.id/search?keyword=${searchTerm}`;

    const onlineStore = {
        name: 'Shopee',
        logo: 'https://seeklogo.com/images/S/shopee-logo-05B3895366-seeklogo.com.png',
        url: shopeeUrl
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => navigateTo(fromScreen || 'dashboard')} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Beli Produk</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>
            
            <div className="p-4">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                    <div className="flex items-center p-4 space-x-4">
                        <div 
                          className="w-24 h-24 rounded-lg flex-shrink-0 border"
                          style={{ backgroundColor: product.shadeColor }}
                        >
                             <img className="w-full h-full object-contain mix-blend-multiply" src={`https://picsum.photos/seed/${product.id}/200`} alt={product.productName} />
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm text-pink-500 font-semibold">{product.brand}</p>
                            <h2 className="font-bold text-lg text-gray-800 leading-tight">{product.productName}</h2>
                            <p className="text-md text-gray-600">{product.shadeName}</p>
                            <p className="font-bold text-xl text-gray-900 mt-2">Rp {product.price.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Temukan di Official Store</h3>
                    <div className="space-y-3">
                        <a 
                            href={onlineStore.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center p-3 text-left rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                            <img src={onlineStore.logo} alt={`${onlineStore.name} logo`} className="w-8 h-8 mr-4 object-contain" />
                            <span className="font-semibold text-gray-800 flex-grow">{`Lihat Produk di ${onlineStore.name}`}</span>
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                    <p className="text-xs text-gray-400 mt-4 text-center">Anda akan diarahkan ke website atau aplikasi e-commerce. Pastikan aplikasi sudah ter-install untuk pengalaman terbaik.</p>
                </div>
            </div>
        </div>
    );
};

export default PurchaseScreen;