"use client";

import * as React from "react";
import { useState } from "react";
import VideoLightbox from "./VideoLightbox";

export interface VideoTile {
  /** YouTube video id (the part after `?v=`). Tiles without one are skipped. */
  youtubeId: string;
  /** Optional heading shown under the thumbnail. */
  title?: string;
  /** Optional description shown under the title. */
  description?: string;
}

export interface YoutubeTilesProps {
  /** The videos to display as tiles. */
  videoTiles?: VideoTile[];
  /** Optional caption rendered above the grid. */
  videoCaption?: string;
  /**
   * Which YouTube thumbnail to request.
   * @default "maxresdefault"
   */
  thumbnailQuality?:
    | "default"
    | "mqdefault"
    | "hqdefault"
    | "sddefault"
    | "maxresdefault";
  /** Extra class name applied to the grid root. */
  className?: string;
}

export default function YoutubeTiles({
  videoTiles = [],
  videoCaption = "",
  thumbnailQuality = "maxresdefault",
  className,
}: YoutubeTilesProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const tiles = videoTiles.filter((tile) => Boolean(tile?.youtubeId));

  if (tiles.length === 0) {
    return null;
  }

  const getThumbnailUrl = (videoId: string) =>
    `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`;

  return (
    <>
      <div className={className ? `ytt-root ${className}` : "ytt-root"}>
        {videoCaption ? (
          <div className="ytt-caption-wrap">
            <h2 className="ytt-caption">{videoCaption}</h2>
          </div>
        ) : null}

        {tiles.map((tile, index) => (
          <button
            type="button"
            key={tile.youtubeId || index}
            className="ytt-tile"
            onClick={() => setSelectedVideo(tile.youtubeId)}
            aria-label={tile.title ? `Play ${tile.title}` : `Play video ${index + 1}`}
          >
            <div className="ytt-thumb-wrap">
              <img
                className="ytt-thumb"
                src={getThumbnailUrl(tile.youtubeId)}
                alt={tile.title || `Video ${index + 1}`}
                loading="lazy"
              />
              <div className="ytt-overlay">
                <div className="ytt-play">
                  <svg
                    className="ytt-play-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="ytt-meta">
              {tile.title ? <h3 className="ytt-title">{tile.title}</h3> : null}
              {tile.description ? <p className="ytt-desc">{tile.description}</p> : null}
            </div>
          </button>
        ))}
      </div>

      <VideoLightbox videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </>
  );
}
