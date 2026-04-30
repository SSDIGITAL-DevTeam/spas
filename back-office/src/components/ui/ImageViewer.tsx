import { JSX, useState, useEffect, useCallback } from "react";
import { MdClose, MdZoomIn } from "react-icons/md";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function ImageViewer({ src, alt, className = "" }: Props): JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const open = () => {
    setMounted(true);
    // Defer so the initial opacity-0 class renders first, enabling the transition
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => setMounted(false), 280);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mounted, close]);

  return (
    <>
      {/* Thumbnail — clickable */}
      <div
        className="relative group cursor-zoom-in"
        onClick={open}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-[inherit] transition-colors duration-200 flex items-center justify-center">
          <MdZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow" />
        </div>
      </div>

      {/* Lightbox portal */}
      {mounted && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-[250ms]
            ${visible ? "bg-black/80 backdrop-blur-sm" : "bg-black/0"}`}
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className={`absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-[250ms]
              ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            aria-label="Close"
          >
            <MdClose className="w-5 h-5" />
          </button>

          {/* Full-size image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl transition-all duration-[250ms]
              ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          />
        </div>
      )}
    </>
  );
}
