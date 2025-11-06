import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CheckCircleIcon } from './icons';

const PaymentPendingScreen: React.FC = () => {
    const { navigateTo } = useAppContext();

    return (
        <div className="bg-pink-50/70 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-sm">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                <h1 className="text-2xl font-bold text-gray-800 mt-4">Terima Kasih!</h1>
                <p className="text-gray-600 mt-2">
                    Bukti pembayaran Anda telah kami terima dan sedang dalam proses verifikasi oleh tim kami.
                </p>
                <p className="font-semibold text-gray-700 mt-4">
                    Paket langganan Anda akan aktif dalam <strong>1x24 jam</strong> setelah verifikasi berhasil.
                </p>
                <button
                    onClick={() => navigateTo('dashboard')}
                    className="w-full mt-8 bg-pink-500 text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
                >
                    Kembali ke Beranda
                </button>
            </div>
        </div>
    );
};

export default PaymentPendingScreen;