# Travel Instagram Generator

A modern, interactive web app to create, customize, and export stunning Instagram travel posts and stories. Drag-and-drop elements, edit styles, and export your designs as images for social media.

## Features
- **Drag-and-drop template designer** for Instagram posts, stories, reels, and more
- **Customizable travel package data** (title, destination, price, dates, inclusions, exclusions, etc.)
- **Multiple template formats** (Square, Story, Portrait, Reel)
- **Element style editing** (font, color, size, alignment, etc.)
- **Background customization** (color, image, overlay)
- **Export as PNG** for easy sharing
- **Live preview** in a new window

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/travel-instagram-generator.git
   cd travel-instagram-generator
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

## Project Structure
- `app/` — Next.js app directory (main page, layout)
- `components/` — UI components (cards, buttons, template designer, etc.)
- `public/images/` — Sample background images
- `styles/` — Global styles (Tailwind CSS)
- `lib/`, `hooks/` — Utilities and custom hooks

## Customization
- Add or edit template formats in `app/page.tsx`
- Add your own images to `public/images/`
- Tweak UI components in `components/ui/`

## License
MIT 