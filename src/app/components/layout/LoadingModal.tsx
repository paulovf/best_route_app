// src/components/ui/LoadingModal.tsx
import React, { useEffect } from 'react';
import Image from "next/image";

interface LoadingModalProps {
  isOpen: boolean;
}

export const LoadingModal = ({ isOpen }: LoadingModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800 backdrop-blur-sm animate-slide-up">
      <div className="w-full max-w-md bg-neutral-800 rounded-t-3xl sm:rounded-3xl p-8">
        
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-white animate-spin"></div>            
            <Image
              src="/images/logo.png"
              alt="Best Route modal loading logo"
              width={80}
              height={80}
              className="w-[80px] h-[80px] object-contain"
              priority
            />
          </div>

          <h3 className="mt-8 text-white text-xl font-semibold tracking-tight">
            Estamos calculando sua rota
          </h3>
          <p className="mt-2 text-white/70 text-[15px]">
            Aguarde alguns instantes...
          </p>
        </div>
      </div>
    </div>
  );
};