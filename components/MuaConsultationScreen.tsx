import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, CrownIcon, SparklesIcon } from './icons';

const mockMuas = [
    {
        name: 'Andi Soraya',
        avatar: 'https://i.pravatar.cc/150?u=mua1',
        specialty: 'Wedding & Bridal Makeup',
        experience: '8+ years',
    },
    {
        name: 'Bunga Citra',
        avatar: 'https://i.pravatar.cc/150?u=mua2',
        specialty: 'Editorial & High Fashion',
        experience: '12 years',
    },
    {
        name: 'Cahaya Putri',
        avatar: 'https://i.pravatar.cc/150?u=mua3',
        specialty: 'Natural & Everyday Glow',
        experience: '5 years',
    },
    {
        name: 'Dewi Lestari',
        avatar: 'https://i.pravatar.cc/150?u=mua4',
        specialty: 'Special Effects (SFX)',
        experience: '10 years',
    },
];

const PremiumGate: React.FC = () => {
    const { navigateTo } = useAppContext();
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg m-4">
            <CrownIcon className="w-16 h-16 mx-auto text-yellow-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Fitur Eksklusif</h2>
            <p className="mt-2 text-gray-600">
                Upgrade ke Pro atau Premium untuk mendapatkan akses konsultasi langsung dengan Makeup Artist profesional kami.
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

const MuaCard: React.FC<typeof mockMuas[0]> = ({ name, avatar, specialty, experience }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-center p-4 space-x-4">
        <img className="w-20 h-20 rounded-full object-cover" src={avatar} alt={name} />
        <div className="flex-grow">
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-pink-600 font-semibold">{specialty}</p>
            <p className="text-xs text-gray-500 mt-1">{experience} experience</p>
        </div>
        <button onClick={() => alert(`Booking consultation with ${name}... (Simulation)`)} className="bg-pink-100 text-pink-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-pink-200 transition-colors">
            Book
        </button>
    </div>
);

const MuaConsultationScreen: React.FC = () => {
    const { user, navigateTo } = useAppContext();
    const hasAccess = user?.subscriptionStatus === 'Pro' || user?.subscriptionStatus === 'Premium';

    return (
        <div className="bg-pink-50/70 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => navigateTo('profile')} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Konsultasi MUA</h1>
                <div className="w-10"></div>
            </header>
            
            {!hasAccess ? <PremiumGate /> : (
                <div className="p-4 space-y-4">
                    <p className="text-center text-gray-600 mb-2">Pilih Makeup Artist profesional untuk sesi konsultasi personal Anda.</p>
                    {mockMuas.map(mua => <MuaCard key={mua.name} {...mua} />)}
                </div>
            )}
        </div>
    );
};

export default MuaConsultationScreen;
