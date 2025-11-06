import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CameraIcon, PaletteIcon, FaceIcon, HeartIcon, UserIcon } from './icons';
import { Screen } from '../types';

const BottomNavBar: React.FC = () => {
    const { screen, navigateTo } = useAppContext();

    const navItems: { screen: Screen; label: string; icon: React.ReactNode }[] = [
        { screen: 'matcher', label: 'Color Matcher', icon: <CameraIcon /> },
        { screen: 'dashboard', label: 'Koleksi Shade', icon: <PaletteIcon /> },
        { screen: 'tryOn', label: 'Coba Virtual', icon: <FaceIcon /> },
        { screen: 'favorites', label: 'Favorit', icon: <HeartIcon /> },
        { screen: 'profile', label: 'Profil', icon: <UserIcon /> },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-t-lg">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <button
                        key={item.screen}
                        onClick={() => navigateTo(item.screen)}
                        className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${
                            screen === item.screen ? 'text-pink-500' : 'text-gray-500 hover:text-pink-400'
                        }`}
                        aria-label={item.label}
                        aria-current={screen === item.screen ? 'page' : undefined}
                    >
                        <div className="w-7 h-7">{item.icon}</div>
                        <span className="text-[10px] font-semibold mt-1">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BottomNavBar;
