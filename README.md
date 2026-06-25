# youtube-tiles-react

A responsive React grid of YouTube thumbnails with a built-in, accessible lightbox player. Ships **self-contained CSS** — no Tailwind or other styling setup required.

- Responsive grid (1 / 2 / 3 columns)
- Click a tile to open a full-screen YouTube player
- Closes on backdrop click, the × button, or **Escape**
- Locks body scroll while open
- Keyboard-accessible tiles, themeable via CSS variables
- TypeScript types included

## Install

```bash
npm install youtube-tiles-react
```

`react` and `react-dom` (>=17) are peer dependencies.

## Usage

```tsx
import { YoutubeTiles } from "youtube-tiles-react";
import "youtube-tiles-react/styles.css"; // import once, anywhere in your app

export default function Example() {
  return (
    <YoutubeTiles
      videoCaption="Talks & Interviews"
      videoTiles={[
        {
          youtubeId: "RRKwmeyIc24",
          title: "What Is an AI Stack? LLMs, RAG, & AI Hardware",
          description:
            " What is an AI stack and why does it matter? Lauren McHugh Olende explains how LLMs, vector databases, and orchestration layers integrate with AI hardware to power real-world systems. Discover how these components enable smarter workflows and reliable AI solutions.",
        },
        { youtubeId: "abc123" },
      ]}
    />
  );
}
```

> **Next.js / RSC:** the components are already marked `"use client"`, so they work in the App Router. Import the CSS in your root layout.

## Props

### `<YoutubeTiles />`

| Prop               | Type                                                                        | Default           | Description                                                |
| ------------------ | --------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------- |
| `videoTiles`       | `VideoTile[]`                                                               | `[]`              | Videos to render. Tiles without a `youtubeId` are skipped. |
| `videoCaption`     | `string`                                                                    | `""`              | Optional heading above the grid.                           |
| `thumbnailQuality` | `"default" \| "mqdefault" \| "hqdefault" \| "sddefault" \| "maxresdefault"` | `"maxresdefault"` | Which YouTube thumbnail to request.                        |
| `className`        | `string`                                                                    | —                 | Extra class added to the grid root.                        |

`VideoTile`:

```ts
interface VideoTile {
  youtubeId: string;
  title?: string;
  description?: string;
}
```

If no tiles have a `youtubeId`, the component renders `null`.

### `<VideoLightbox />`

Exported separately if you want to drive the player yourself.

| Prop      | Type             | Description                                 |
| --------- | ---------------- | ------------------------------------------- |
| `videoId` | `string \| null` | Video to play, or `null` to stay closed.    |
| `onClose` | `() => void`     | Called on dismiss (backdrop, ×, or Escape). |

## Theming

Every style reads from a CSS variable with a built-in default. Override any of
them by defining the variable yourself. **Define them on `:root`** — the
lightbox is rendered as a fixed-position element on `<body>`, so `:root` is the
one place that reaches both the grid and the lightbox overlay.

```css
:root {
  --ytt-accent: #c8b273; /* gold left-border accent */
  --ytt-bg: #f3f4f6; /* grid background */
  --ytt-caption-color: #4b5563;
  --ytt-title-color: #dc2626;
  --ytt-desc-color: #9ca3af;
  --ytt-play-color: #dc2626;
  --ytt-overlay-bg: rgba(0, 0, 0, 0.9); /* dim behind the video */
  --ytt-radius: 0.5rem;
  --ytt-gap: 1rem;
}
```

Import this _after_ `youtube-tiles-react/styles.css` so your values win.

## License

MIT
