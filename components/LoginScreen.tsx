import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginScreen: React.FC = () => {
    const { login } = useAppContext();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const GoogleIcon = () => (
        <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.641-3.657-11.29-8.481l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.021 35.596 44 30.138 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
        </svg>
    );

    const validateEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Email tidak boleh kosong.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Format email tidak valid.');
            return;
        }
        setError('');
        // In a real app, you'd also check the password.
        // For this simulation, we just log in if the email is valid.
        login();
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-pink-50 p-6">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Selamat Datang!</h1>
                    <p className="text-gray-500 mt-2">Masuk untuk mendapatkan rekomendasi makeup yang personal.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <form onSubmit={handleSignIn}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (error) setError('');
                                }}
                                className={`shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-400' : 'focus:ring-pink-400'}`}
                                placeholder="Masukkan email Anda"
                            />
                            {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                defaultValue="password123"
                                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-400"
                                placeholder="Masukkan password Anda"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-400 text-sm">atau</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button
                        onClick={login}
                        className="w-full bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center transition-colors"
                    >
                        <GoogleIcon />
                        Continue with Google
                    </button>
                </div>

                <p className="text-center text-gray-500 text-xs mt-6 px-4">
                    <strong>Privacy & Security:</strong> Kami melindungi data pribadi Anda. Informasi hanya digunakan untuk memberikan rekomendasi makeup yang personal.
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;