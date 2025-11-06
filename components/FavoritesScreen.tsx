import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { HeartIcon } from './icons';

const FavoriteProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { removeFavorite, navigateTo, setSelectedProductForPurchase } = useAppContext();

    const handleBuyNowClick = () => {
        setSelectedProductForPurchase(product);
        navigateTo('purchase');
    };
    
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex p-4">
            <img className="w-24 h-24 object-cover rounded-lg flex-shrink-0" src={`https://picsum.photos/seed/${product.id}/200`} alt={product.productName} />
            <div className="ml-4 flex-grow flex flex-col justify-between">
                <div>
                    <p className="text-xs text-pink-500 font-semibold">{product.brand}</p>
                    <h3 className="font-bold text-gray-800 leading-tight">{product.productName}</h3>
                    <p className="text-sm text-gray-500">{product.shadeName}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="font-semibold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center space-x-2">
                         <button onClick={() => removeFavorite(product.id)} className="text-gray-400 hover:text-pink-500 p-1">
                            <HeartIcon filled={true} className="w-6 h-6 text-pink-500" />
                        </button>
                        <button onClick={handleBuyNowClick} className="text-xs bg-pink-500 text-white px-4 py-1.5 rounded-full hover:bg-pink-600 font-semibold">Beli Sekarang</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FavoritesScreen: React.FC = () => {
    const { favorites } = useAppContext();

    return (
        <div className="bg-gray-50 min-h-screen">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-center">
                <h1 className="text-xl font-bold text-gray-800">Favorites</h1>
            </header>

            <div className="p-4">
                {favorites.length === 0 ? (
                    <div className="text-center pt-20">
                        <HeartIcon className="w-16 h-16 mx-auto text-gray-300" />
                        <h2 className="mt-4 text-xl font-semibold text-gray-700">Belum Ada Favorit</h2>
                        <p className="mt-2 text-gray-500">Ketuk ikon hati pada produk untuk menyimpannya di sini.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                         <p className="text-sm text-gray-500 px-2">{favorites.length} produk favorit</p>
                        {favorites.map(product => (
                            <FavoriteProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesScreen;