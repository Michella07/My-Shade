import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { HeartIcon, HistoryIcon, SupportIcon, MakeupArtistIcon, PartnershipIcon, SettingsIcon, CrownIcon } from './icons';

const ProfileScreen: React.FC = () => {
    const { user, navigateTo, favorites, analysisCount, tryOnCount } = useAppContext();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    if (!user) return null;

    const menuItems = [
        { icon: <HeartIcon className="w-6 h-6"/>, label: "Favorit Saya", value: `${favorites.length} produk tersimpan`, onClick: () => navigateTo('favorites') },
        { icon: <HistoryIcon className="w-6 h-6"/>, label: "Riwayat Analisis", value: "Lihat hasil sebelumnya", onClick: () => navigateTo('analysisHistory') },
        { icon: <SupportIcon className="w-6 h-6"/>, label: "Customer Support", value: "Dapatkan bantuan", onClick: () => navigateTo('customerSupport') },
        { icon: <MakeupArtistIcon className="w-6 h-6"/>, label: "Konsultasi Makeup Artist", value: "Upgrade untuk akses", isPremium: true, onClick: () => navigateTo('muaConsultation') },
        { icon: <PartnershipIcon className="w-6 h-6"/>, label: "Brand Partnerships", value: "Lihat penawaran spesial", isPremium: true, onClick: () => navigateTo('brandPartnerships') },
        { icon: <SettingsIcon className="w-6 h-6"/>, label: "Pengaturan", value: "Preferensi aplikasi", onClick: () => alert('Pengaturan akan datang!') },
    ];

    return (
        <div className="bg-pink-50/50 min-h-screen p-4 space-y-4">
            {/* Subscription Card */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl text-white shadow-lg space-y-3">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">Paket Berlangganan</h2>
                    <CrownIcon className="w-6 h-6"/>
                </div>
                <p className="text-sm text-purple-100">Upgrade untuk akses fitur premium</p>
                <div className="flex justify-between items-center bg-white/20 p-2 rounded-lg">
                    <span className="text-sm font-semibold">Status Paket</span>
                    <span className="bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded-full">{user.subscriptionStatus}</span>
                </div>
                <button onClick={() => navigateTo('premiumPlans')} className="w-full bg-white text-pink-500 font-bold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                    Langganan Sekarang
                </button>
            </div>

            {/* Activity Card */}
            <div className="bg-white p-4 rounded-2xl shadow-md">
                <h2 className="font-semibold text-gray-700 mb-3">Aktivitas Saya</h2>
                <div className="flex justify-around text-center">
                    <ActivityStat value={analysisCount} label="Analisis" />
                    <ActivityStat value={favorites.length} label="Favorit" />
                    <ActivityStat value={tryOnCount} label="Try-On" />
                </div>
            </div>
            
            {/* Quick Menu */}
            <div className="bg-white p-2 rounded-2xl shadow-md space-y-1">
                <h2 className="font-semibold text-gray-700 p-2">Menu Cepat</h2>
                {menuItems.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>

            {/* Settings */}
            <div className="bg-white p-4 rounded-2xl shadow-md space-y-4">
                 <h2 className="font-semibold text-gray-700">Pengaturan</h2>
                 <SettingsToggle 
                    label="Notifikasi" 
                    description="Terima update produk baru" 
                    isChecked={notificationsEnabled}
                    onToggle={() => setNotificationsEnabled(!notificationsEnabled)}
                 />
                 <SettingsToggle 
                    label="Mode Gelap" 
                    description="Ubah tema aplikasi" 
                    isChecked={darkModeEnabled}
                    onToggle={() => {
                        setDarkModeEnabled(!darkModeEnabled)
                        if (!darkModeEnabled) {
                            alert("Mode gelap akan segera hadir!");
                        }
                    }}
                 />
            </div>
        </div>
    );
};

const ActivityStat: React.FC<{ value: number, label: string }> = ({ value, label }) => (
    <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
    </div>
);

const MenuItem: React.FC<{ icon: React.ReactNode, label: string, value: string, onClick: () => void, isPremium?: boolean }> = ({ icon, label, value, onClick, isPremium }) => (
    <button onClick={onClick} className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-100 transition-colors">
        <div className="text-pink-500 mr-4">{icon}</div>
        <div className="flex-grow">
            <p className="font-semibold text-gray-800 flex items-center">
                {label}
                {isPremium && <CrownIcon className="w-4 h-4 text-yellow-500 ml-2"/>}
            </p>
            <p className="text-xs text-gray-500">{value}</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    </button>
);

const SettingsToggle: React.FC<{ label: string, description: string, isChecked: boolean, onToggle: () => void }> = ({ label, description, isChecked, onToggle }) => (
    <div className="flex justify-between items-center">
        <div>
            <p className="font-semibold text-gray-800">{label}</p>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input 
                type="checkbox" 
                name="toggle" 
                id={label} 
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                checked={isChecked}
                onChange={onToggle}
            />
            <label htmlFor={label} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
        <style>{`.toggle-checkbox:checked { right: 0; border-color: #EC4899; } .toggle-checkbox:checked + .toggle-label { background-color: #EC4899; }`}</style>
    </div>
);

export default ProfileScreen;