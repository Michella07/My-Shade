import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, CrownIcon } from './icons';

const CheckmarkIcon: React.FC = () => (
    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
);

const PlanFeature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center">
        <CheckmarkIcon />
        <span className="text-gray-700">{children}</span>
    </li>
);

const PremiumPlansScreen: React.FC = () => {
    const { user, navigateTo, setSelectedPlanForPayment } = useAppContext();

    const plans = {
        Gratis: {
            price: "Rp0",
            title: "Akses fitur dasar",
            features: ["Analisis Skin Tone Dasar", "Rekomendasi Produk", "Simpan Favorit", "Shade Comparison"],
            isPopular: false,
        },
        Pro: {
            price: "Rp49.000",
            title: "Fitur lengkap + update rutin",
            features: ["Semua fitur Gratis", "Virtual Try-On Unlimited", "AR Filter Eksklusif", "Analisis Advanced", "Save & Share Results"],
            isPopular: true,
        },
        Premium: {
            price: "Rp99.000",
            title: "Semua fitur + prioritas support",
            features: ["Semua fitur Pro", "Priority Customer Support", "Konsultasi Makeup Artist", "Early Access New Features", "Brand Partnerships"],
            isPopular: false,
        }
    };

    return (
        <div className="min-h-screen bg-pink-50/70 p-4">
            <header className="flex items-center justify-between mb-4">
                <button onClick={() => navigateTo('profile')} className="p-2 rounded-full hover:bg-gray-200">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Paket Berlangganan</h1>
                <div className="w-10"></div>
            </header>
            <p className="text-center text-gray-600 mb-6">Nikmati fitur premium tanpa batas dengan paket pilihan Anda.</p>
            
            <div className="space-y-4">
                {Object.entries(plans).map(([name, plan]) => (
                    <div key={name} className={`bg-white rounded-2xl p-6 shadow-md border-2 ${plan.isPopular ? 'border-pink-500' : 'border-transparent'}`}>
                        {plan.isPopular && <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full absolute -mt-10 ml-4">Paling Populer</span>}
                        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                        <p className="text-3xl font-extrabold text-gray-900 my-2">{plan.price} <span className="text-base font-medium text-gray-500">/ bulan</span></p>
                        <p className="text-sm text-gray-500 mb-4">{plan.title}</p>
                        <ul className="space-y-2 text-sm mb-6">
                            {plan.features.map(feature => <PlanFeature key={feature}>{feature}</PlanFeature>)}
                        </ul>
                        <button 
                            onClick={() => {
                                const planName = name as 'Pro' | 'Premium';
                                setSelectedPlanForPayment({ name: planName, price: plan.price });
                                navigateTo('payment');
                            }}
                            disabled={user?.subscriptionStatus === name || name === 'Gratis'}
                             className={`w-full font-bold py-3 rounded-lg transition-colors ${
                                user?.subscriptionStatus === name || name === 'Gratis'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-pink-500 text-white hover:bg-pink-600'
                            }`}>
                            {user?.subscriptionStatus === name ? 'Paket Aktif' : (name === 'Gratis' ? 'Termasuk' : `Pilih ${name}`)}
                        </button>
                    </div>
                ))}
            </div>

             <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-transparent mt-4">
                <h3 className="font-bold mb-2">Metode Pembayaran</h3>
                 <div className="flex items-center space-x-4 my-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_QRIS_2020.svg/2560px-Logo_QRIS_2020.svg.png" alt="QRIS" className="h-6 object-contain" />
                    <img src="https://seeklogo.com/images/G/gopay-logo-957B863102-seeklogo.com.png" alt="GoPay" className="h-6 object-contain" />
                    <img src="https://seeklogo.com/images/S/shopeepay-logo-263A4E3342-seeklogo.com.png" alt="ShopeePay" className="h-8 object-contain" />
                </div>
                <p className="text-sm text-gray-600">
                    Kami menerima pembayaran melalui QRIS, GoPay, dan ShopeePay. Pembayaran aman melalui platform terpercaya dan Anda dapat membatalkan langganan kapan saja.
                </p>
             </div>
        </div>
    );
};

export default PremiumPlansScreen;