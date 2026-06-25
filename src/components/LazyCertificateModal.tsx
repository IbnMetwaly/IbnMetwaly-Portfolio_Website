import React, { Suspense, useCallback, useState } from 'react';

const CertificateModal = React.lazy(() => import('./CertificateModal'));

interface LazyCertificateModalProps {
  certificateUrl: string;
  trigger: React.ReactNode;
}

function ModalLoader() {
  return <span className="sr-only" aria-live="polite">Loading certificate viewer…</span>;
}

export default function LazyCertificateModal({ certificateUrl, trigger }: LazyCertificateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const loadModal = useCallback(() => setShouldLoad(true), []);

  const openModal = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setShouldLoad(true);
    setIsOpen(true);
  }, []);

  const interactiveTrigger = React.isValidElement(trigger)
    ? React.cloneElement(trigger as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
        onClick: openModal,
        onFocus: loadModal,
        onMouseEnter: loadModal,
      })
    : (
        <button type="button" onClick={openModal} onFocus={loadModal} onMouseEnter={loadModal}>
          {trigger}
        </button>
      );

  return (
    <>
      {interactiveTrigger}
      {shouldLoad ? (
        <Suspense fallback={<ModalLoader />}>
          <CertificateModal
            certificateUrl={certificateUrl}
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<span className="hidden" />}
          />
        </Suspense>
      ) : null}
    </>
  );
}
