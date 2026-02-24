import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CertificateModalProps {
    certificateUrl: string;
    trigger: React.ReactNode;
}

export default function CertificateModal({ certificateUrl, trigger }: CertificateModalProps) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    // Append #toolbar=0&navpanes=0&scrollbar=0 to hide default PDF viewer controls/download options
    const secureUrl = certificateUrl.includes('#')
        ? certificateUrl
        : `${certificateUrl}#toolbar=0&navpanes=0&scrollbar=0`;

    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger asChild>
                {trigger}
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 flex flex-col w-[95vw] h-[90vh] max-w-5xl translate-x-[-50%] translate-y-[-50%] gap-0 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-background-dark-surface p-0 shadow-xl-light dark:shadow-xl-dark duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl overflow-hidden">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-background-dark-surface shrink-0">
                        <Dialog.Title className="text-h3 font-semibold text-neutral-900 dark:text-neutral-100">
                            {t('nav.viewCertificate')}
                        </Dialog.Title>
                        <Dialog.Close className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 opacity-70 ring-offset-white transition-all hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none">
                            <X className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
                            <span className="sr-only">Close</span>
                        </Dialog.Close>
                    </div>

                    {/* Iframe for PDF */}
                    <div className="flex-1 w-full bg-neutral-100 dark:bg-neutral-900 relative" onContextMenu={(e) => e.preventDefault()}>
                        <iframe
                            src={secureUrl}
                            className="absolute inset-0 w-full h-full border-0"
                            title={t('nav.viewCertificate')}
                            sandbox="allow-scripts allow-same-origin"
                        />
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
