"use client";

import * as React from "react";
import { useEffect } from "react";

export interface VideoLightboxProps {
  /** The YouTube video id to play, or `null` to keep the lightbox closed. */
  videoId: string | null;
  /** Called when the user dismisses the lightbox (backdrop, close button, or Escape). */
  onClose: () => void;
}

export default function VideoLightbox({ videoId, onClose }: VideoLightboxProps) {
  // Lock body scroll while open and close on Escape.
  useEffect(() => {
    if (!videoId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  return (
    <div
      className="ytt-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
    >
      <button
        type="button"
        className="ytt-lightbox-close"
        onClick={onClose}
        aria-label="Close video"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="ytt-lightbox-frame" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
