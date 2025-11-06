import React, { useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { CameraIcon, GalleryIcon } from './icons';

const MatcherScreen: React.FC = () => {
    const { navigateTo, setCapturedImage } = useAppContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                const base64Image = result.split(',')[1];
                if (base64Image) {
                    setCapturedImage(base64Image, file.type);
                    navigateTo('analysis');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-pink-50 text-center">
            
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-pink-200 to-pink-50 rounded-b-3xl"></div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="mb-8">
                     <div className="w-28 h-28 mx-auto rounded-full bg-white/50 flex items-center justify-center shadow-lg mb-4 p-2">
                        <div className="w-full h-full rounded-full bg-pink-100 flex flex-col items-center justify-center text-pink-500">
                             <span className="text-sm">My</span>
                             <span className="text-3xl font-bold" style={{fontFamily: "'Pacifico', cursive", lineHeight: 1}}>Shade</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800">Make Up Color Matcher</h1>
                    <p className="text-gray-600 mt-2">Temukan shade makeup yang sempurna untuk warna kulitmu.</p>
                </div>

                <div className="w-full bg-white/60 p-8 rounded-2xl shadow-xl backdrop-blur-md border border-white/30">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Upload a Photo</h2>
                    <p className="text-gray-500 text-sm mb-6">Ambil foto atau upload dari galeri untuk analisis warna kulit.</p>
                    
                    <div className="space-y-4">
                        <button
                            onClick={() => navigateTo('camera')}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center text-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            <CameraIcon className="w-6 h-6 mr-3" />
                            Ambil Foto
                        </button>
                        
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />

                        <button
                            onClick={handleUploadClick}
                            className="w-full bg-white hover:bg-gray-100 text-pink-500 font-bold py-4 px-6 rounded-xl flex items-center justify-center text-lg border-2 border-pink-500 shadow-lg transition-transform transform hover:scale-105"
                        >
                            <GalleryIcon className="w-6 h-6 mr-3" />
                            Upload dari Galeri
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatcherScreen;