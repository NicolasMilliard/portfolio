import { useRef, useState } from "react";

interface ArticleImageLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ArticleImageLightbox({
  src,
  alt,
  width,
  height,
}: ArticleImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [zoomed, setZoomed] = useState(false);

  const close = () => dialogRef.current?.close();

  return (
    <figure className="article-diagram">
      <button
        ref={triggerRef}
        type="button"
        className="article-diagram-trigger"
        aria-label={`Enlarge: ${alt}`}
        onClick={() => {
          setZoomed(false);
          dialogRef.current?.showModal();
        }}
      >
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </button>
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- Native dialog supports Escape and the Close button; this handler dismisses backdrop clicks. */}
      <dialog
        ref={dialogRef}
        className="article-image-dialog"
        aria-label={alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
        onClose={() => {
          triggerRef.current?.focus();
        }}
      >
        <div className="article-image-dialog-panel">
          <div className="article-image-dialog-toolbar">
            <button
              type="button"
              onClick={() => {
                setZoomed(!zoomed);
              }}
            >
              {zoomed ? "Fit image" : "Zoom in"}
            </button>
            <button type="button" onClick={close}>
              Close
            </button>
          </div>
          <div className="article-image-dialog-viewport">
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={zoomed ? "is-zoomed" : undefined}
            />
          </div>
        </div>
      </dialog>
    </figure>
  );
}
