import React, { useState, useRef, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon, PaperAirplaneIcon } from './icons';
import { SupportMessage } from '../types';

const MessageBubble: React.FC<{ message: SupportMessage }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${isUser ? 'bg-pink-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                <p className="text-sm">{message.text}</p>
            </div>
        </div>
    );
};

const TypingIndicator: React.FC = () => (
    <div className="flex justify-start">
        <div className="px-4 py-2 rounded-2xl bg-white text-gray-800 rounded-bl-none">
            <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
        </div>
    </div>
)

const CustomerSupportScreen: React.FC = () => {
    const { navigateTo, supportMessages, sendSupportMessage, isAgentTyping } = useAppContext();
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [supportMessages, isAgentTyping]);

    const handleSend = async () => {
        if (input.trim()) {
            await sendSupportMessage(input.trim());
            setInput('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-pink-50">
            <header className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
                <button onClick={() => navigateTo('profile')} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon />
                </button>
                <div className="text-center flex-grow">
                     <h1 className="text-xl font-bold text-gray-800">Customer Support</h1>
                     <p className="text-xs text-green-500 font-semibold">Online</p>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow p-4 space-y-4 overflow-y-auto">
                {supportMessages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
                {isAgentTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </main>

            <footer className="bg-white p-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ketik pesan Anda..."
                        rows={1}
                        className="flex-grow p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isAgentTyping}
                        className="p-3 rounded-full bg-pink-500 text-white hover:bg-pink-600 disabled:bg-gray-300 transition-colors"
                        aria-label="Send message"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default CustomerSupportScreen;
