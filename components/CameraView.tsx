import React, { useRef, useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ArrowLeftIcon } from './icons';

const CameraView: React.FC = () => {
    const { navigateTo, setCapturedImage } = useAppContext();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);

    useEffect(() => {
        let activeStream: MediaStream | null = null;
        
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user' },
                    audio: false
                });
                activeStream = mediaStream;
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("Could not access the camera. Please check permissions and try again.");
                navigateTo('matcher');
            }
        };

        if(!showPreview){
            startCamera();
        }

        return () => {
            if (activeStream) {
                activeStream.getTracks().forEach(track => track.stop());
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showPreview]);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            
            // Flip the image horizontally for a mirror effect
            context?.translate(video.videoWidth, 0);
            context?.scale(-1, 1);
            context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            
            const dataUrl = canvas.toDataURL('image/jpeg');
            setPhotoDataUrl(dataUrl);
            setShowPreview(true);

            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        }
    };

    const usePhoto = () => {
        if (photoDataUrl) {
            const base64Image = photoDataUrl.split(',')[1];
            setCapturedImage(base64Image, 'image/jpeg');
            navigateTo('analysis');
        }
    };
    
    const retakePhoto = () => {
        setShowPreview(false);
        setPhotoDataUrl(null);
    };

    return (
        <div className="w-full h-screen bg-black text-white flex flex-col">
            <header className="absolute top-0 left-0 w-full p-4 z-20 flex items-center bg-black/30">
                <button onClick={() => navigateTo('matcher')} className="p-2 rounded-full hover:bg-white/20">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </header>

            <div className="relative flex-grow flex items-center justify-center overflow-hidden">
                {showPreview && photoDataUrl ? (
                     <img src={photoDataUrl} alt="Preview" className="h-full w-full object-cover" style={{ transform: 'scaleX(-1)' }} />
                ) : (
                    <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" style={{ transform: 'scaleX(-1)' }} />
                )}
                
                {!showPreview && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-8">
                        <div className="w-full max-w-[280px] aspect-square border-4 border-white/50 border-dashed rounded-full"></div>
                        <p className="mt-4 text-center font-semibold">Posisikan wajah di dalam lingkaran.</p>
                         <div className="bg-black/40 p-4 rounded-lg mt-8 text-sm text-center">
                            <h3 className="font-bold mb-2">Tips untuk Hasil Terbaik:</h3>
                            <ul className="list-disc list-inside text-left text-xs space-y-1">
                                <li>Pastikan pencahayaan cukup.</li>
                                <li>Wajah bersih tanpa makeup.</li>
                                <li>Posisikan wajah menghadap kamera.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            
            <footer className="w-full p-6 z-10 bg-black/50 flex justify-around items-center h-32">
                {showPreview ? (
                    <>
                        <button onClick={retakePhoto} className="font-semibold py-3 px-8 rounded-full border border-white hover:bg-white/20 transition-colors">
                            Ambil Lagi
                        </button>
                        <button onClick={usePhoto} className="font-semibold py-3 px-8 rounded-full bg-pink-500 hover:bg-pink-600 transition-colors">
                            Gunakan Foto
                        </button>
                    </>
                ) : (
                    <button onClick={capturePhoto} aria-label="Capture photo" className="w-20 h-20 rounded-full bg-white flex items-center justify-center transition-transform transform active:scale-95">
                        <div className="w-16 h-16 rounded-full border-4 border-black"></div>
                    </button>
                )}
            </footer>

            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default CameraView;