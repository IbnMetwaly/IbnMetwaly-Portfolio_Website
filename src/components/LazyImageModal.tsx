import React, { Suspense, useCallback, useState } from 'react';

const ImageModal = React.lazy(() => import('./ImageModal'));

interface LazyImageModalProps {
  src: string;
  alt: string;
  trigger: React.ReactNode;
}

function ModalLoader() {
  return <span className="sr-only" aria-live="polite">Loading image preview…</span>;
}

export default function LazyImageModal({ src, alt, trigger }: LazyImageModalProps) {
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
          <ImageModal
            src={src}
            alt={alt}
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<span className="hidden" />}
          />
        </Suspense>
      ) : null}
    </>
  );
}
