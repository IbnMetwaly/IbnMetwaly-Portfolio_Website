import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ImageModalProps {
    src: string;
    alt: string;
    trigger: React.ReactNode;
}

export default function ImageModal({ src, alt, trigger }: ImageModalProps) {
    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content
                    className="fixed left-[50%] top-[50%] z-[101] w-full max-w-[90vw] max-h-[90vh] translate-x-[-50%] translate-y-[-50%] outline-none duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <div className="relative flex items-center justify-center w-full h-full group">
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-transform duration-300"
                        />

                        <Dialog.Close className="absolute -top-12 right-0 rounded-full p-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <X className="h-6 w-6" />
                            <span className="sr-only">Close</span>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
