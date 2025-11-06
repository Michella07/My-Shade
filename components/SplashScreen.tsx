
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SparklesIcon } from './icons';

const SplashScreen: React.FC = () => {
    const { navigateTo } = useAppContext();

    return (
        <div
            className="w-full h-screen flex flex-col justify-between items-center p-8 text-center bg-gradient-to-b from-rose-50 via-pink-100 to-amber-100"
        >
            <div className="relative z-10 flex flex-col justify-between items-center h-full w-full">
                <div className="text-gray-800 mt-24">
                    <p className="text-sm font-light text-pink-400">milk</p>
                    <h1 className="text-6xl font-normal text-pink-600" style={{ fontFamily: "'Pacifico', cursive" }}>MyShade</h1>
                </div>

                <div className="text-center text-gray-700">
                    <h2 className="text-2xl font-medium tracking-wide">Your Personal</h2>
                    <p className="text-4xl font-bold tracking-wider">AI Makeup Consultant</p>
                </div>

                <div className="w-full mb-8">
                    <button
                        onClick={() => navigateTo('login')}
                        className="w-full bg-pink-500 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                        <SparklesIcon className="w-5 h-5" />
                        <span>Start Your Glow Up</span>
                    </button>
                    <p className="text-pink-800/70 text-xs mt-3">Find your perfect shade in seconds</p>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
