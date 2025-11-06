import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, CrownIcon, SparklesIcon } from './icons';

const mockOffers = [
    {
        brand: 'Make Over',
        logo: 'https://img.icons8.com/color/96/m-symbol.png',
        title: 'Diskon 20% untuk Powerstay Foundation',
        description: 'Dapatkan diskon eksklusif untuk pembelian Powerstay Liquid Foundation.',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800',
    },
    {
        brand: 'Wardah',
        logo: 'https://img.icons8.com/color/96/w-symbol.png',
        title: 'Gratis Lip Cream Setiap Pembelian',
        description: 'Beli produk Wardah senilai Rp150.000 dan dapatkan gratis Matte Lip Cream.',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
    },
    {
        brand: 'Somethinc',
        logo: 'https://img.icons8.com/color/96/s-symbol.png',
        title: 'Cashback 15% untuk Semua Produk',
        description: 'Nikmati cashback spesial untuk semua produk Somethinc di official store.',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
    },
     {
        brand: 'Emina',
        logo: 'https://img.icons8.com/color/96/e-symbol.png',
        title: 'Paket Bundling Spesial Remaja',
        description: 'Dapatkan paket Creamy Tint dan Cheeklit Blush dengan harga spesial.',
        bgColor: 'bg-pink-100',
        textColor: 'text-pink-800',
    },
];

const PremiumGate: React.FC = () => {
    const { navigateTo } = useAppContext();
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg m-4">
            <CrownIcon className="w-16 h-16 mx-auto text-yellow-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Penawaran Spesial</h2>
            <p className="mt-2 text-gray-600">
                Upgrade ke Pro atau Premium untuk mendapatkan akses ke diskon dan penawaran eksklusif dari brand partner kami.
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
}

const OfferCard: React.FC<typeof mockOffers[0]> = ({ brand, logo, title, description, bgColor, textColor }) => (
    <div className={`${bgColor} rounded-xl shadow-md overflow-hidden p-4`}>
        <div className="flex items-start space-x-4">
            <img className="w-12 h-12 rounded-lg object-contain" src={logo} alt={`${brand} logo`} />
            <div className="flex-grow">
                <h3 className={`font-bold text-lg ${textColor}`}>{title}</h3>
                <p className={`text-sm ${textColor}/80 mt-1`}>{description}</p>
            </div>
        </div>
         <button onClick={() => alert(`Claiming offer for ${brand}... (Simulation)`)} className="mt-4 w-full bg-white text-gray-800 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow">
            Klaim Penawaran
        </button>
    </div>
);

const BrandPartnershipsScreen: React.FC = () => {
    const { user, navigateTo } = useAppContext();
    const hasAccess = user?.subscriptionStatus === 'Pro' || user?.subscriptionStatus === 'Premium';

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => navigateTo('profile')} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Brand Partnerships</h1>
                <div className="w-10"></div>
            </header>
            
            {!hasAccess ? <PremiumGate /> : (
                <div className="p-4 space-y-4">
                    <p className="text-center text-gray-600 mb-2">Nikmati penawaran spesial dari brand-brand favorit Anda, khusus untuk member premium.</p>
                    {mockOffers.map(offer => <OfferCard key={offer.brand} {...offer} />)}
                </div>
            )}
        </div>
    );
};

export default BrandPartnershipsScreen;
