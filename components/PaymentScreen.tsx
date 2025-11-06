import React, { useState, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, UploadIcon } from './icons';

const PaymentScreen: React.FC = () => {
    const { selectedPlanForPayment, navigateTo, user } = useAppContext();
    const [paymentProof, setPaymentProof] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!selectedPlanForPayment) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
                <p className="text-gray-600">Paket tidak dipilih.</p>
                <button onClick={() => navigateTo('premiumPlans')} className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg">
                    Kembali ke Paket Langganan
                </button>
            </div>
        );
    }
    
    const { name, price } = selectedPlanForPayment;
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPaymentProof(e.target.files[0]);
        }
    };

    const handleSubmitProof = () => {
        if (!paymentProof) {
            alert("Mohon upload bukti pembayaran terlebih dahulu.");
            return;
        }
        // In a real app, you would upload the file to a server here.
        // For this simulation, we'll just navigate to the pending screen.
        navigateTo('paymentPending');
    };

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=MyShadePremium-${name}-${price}-for-${user?.email || 'user'}`;

    return (
        <div className="bg-pink-50/70 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => navigateTo('premiumPlans')} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon />
                </button>
                <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Selesaikan Pembayaran</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>
            
            <div className="p-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Anda memilih paket:</h2>
                    <p className="text-3xl font-extrabold text-pink-600 my-1">{name}</p>
                    <p className="text-2xl font-bold text-gray-800">{price} <span className="text-base font-medium text-gray-500">/ bulan</span></p>

                    <div className="my-6">
                        <h3 className="font-semibold text-gray-800">1. Scan QRIS untuk Membayar</h3>
                        <div className="flex justify-center p-4 bg-gray-100 rounded-lg mt-2">
                             <img src={qrCodeUrl} alt="QRIS Payment Code" className="w-48 h-48" />
                        </div>
                    </div>
                    
                    <div className="my-6 text-left">
                        <h3 className="font-semibold text-gray-800 text-center">2. Upload Bukti Pembayaran</h3>
                        <p className="text-sm text-gray-500 mb-2 text-center">Upload screenshot transaksi Anda di sini.</p>
                        
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors flex flex-col items-center justify-center"
                        >
                            <UploadIcon className="w-8 h-8 text-gray-400 mb-2"/>
                            <p className="text-sm font-semibold text-gray-600">{paymentProof ? paymentProof.name : 'Pilih file...'}</p>
                            <p className="text-xs text-gray-400">PNG, JPG, JPEG</p>
                        </button>
                    </div>

                    <button 
                        onClick={handleSubmitProof}
                        disabled={!paymentProof}
                        className="w-full mt-6 bg-pink-500 text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Kirim Bukti Pembayaran
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentScreen;