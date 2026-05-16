# Brainly Frontend

A personal second-brain app where you can save, organize, and share YouTube videos and tweets — with AI-powered features built on top.

## What it does

- Save YouTube videos and Twitter/X links as cards on your dashboard
- Cards render the actual embedded video or tweet inline
- **Auto-fill title** — paste a YouTube or Twitter link and the title fills itself automatically (no API key needed, uses free oEmbed APIs)
- Filter content by type (YouTube / Twitter) using the sidebar
- AI auto-tags every piece of content with topic labels (e.g. programming, music, finance)
- Filter content by AI-generated topic tags from the sidebar
- AI Smart Search — search in natural language ("coding tutorials", "funny stuff")
- Delete any card
- Share your entire brain as a link — anyone can open it and see your saved content
- All data is saved in the browser (localStorage) — no account or backend needed

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Build tool | Vite |
| AI | Anthropic Claude API (Haiku model) |
| Storage | localStorage (browser) |

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd brainly-frontend
npm install
```

### 2. Add your Anthropic API key

Create a `.env` file in the root of the project:

```bash
cp .env.example .env
```

Open `.env` and add your key:

```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

Get a free API key from [console.anthropic.com](https://console.anthropic.com).

> The app works without the key — AI features (auto-tagging and smart search) are simply skipped. Auto-fill title works without any API key.

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:5173/dashboard](http://localhost:5173/dashboard) in your browser.

---

## How to use

### Adding content
1. Click **Add Content** (top right)
2. Paste a YouTube or Twitter/X link — the title fills in automatically
3. Edit the title if you want, then click **Submit**
4. The card appears instantly on the dashboard

### Filtering
- Click **Twitter** or **Youtube** in the sidebar to filter by type
- Click any topic tag in the **Topics** section of the sidebar to filter by AI-generated tag
- Click the same filter again to clear it

### AI Smart Search
- Type anything in the search bar (e.g. `"coding tutorials"`, `"news about tech"`)
- Press Enter or click **Search**
- Claude finds matching content semantically — not just keyword matching
- Click **Clear search** to go back to all content

### Deleting content
- Click the trash icon on any card to delete it

### Share Brain
- Click **Share Brain** (top right)
- A link is copied to your clipboard
- Send it to anyone — they open the link and see all your saved cards

---

## AI Features

### Auto-fill title (free, no API key)
When you paste a YouTube or Twitter link into the Add Content modal:
- The type (YouTube / Twitter) is detected automatically
- The title is fetched from the free oEmbed API and filled in
- Works with `youtube.com`, `youtu.be`, `twitter.com`, and `x.com` links

### Auto-tagging
Every time you add content, Claude reads the title and automatically assigns 2–3 topic tags from a fixed list:

`programming · design · finance · music · sports · news · humor · science · health · business · education · entertainment · technology · politics · art · cooking · travel · gaming`

Tags are saved in localStorage so they are not regenerated on every page load.

### Smart Search
Uses Claude to understand your search intent. For example:
- `"react tutorials"` finds videos about React even if the title says "hooks explained"
- `"funny tweets"` finds humorous Twitter content
- Falls back to simple keyword matching if no API key is set

---

## Project Structure

```
src/
├── pages/
│   ├── Dashboard.tsx          # Main page — content grid + all state
│   ├── Home.tsx               # Landing page
│   ├── SharedBrainView.tsx    # View a shared brain link
│   └── SharedBrain.tsx        # Legacy shared brain page
├── components/ui/
│   ├── Card.tsx               # Content card (YouTube embed / Twitter embed)
│   ├── Sidebar.tsx            # Type filters + AI topic tag filters
│   ├── CreateContentModal.tsx # Add content form with auto-fill from URL
│   └── SmartSearch.tsx        # AI search bar
├── hooks/
│   └── useContentTags.ts      # Auto-tagging hook (calls Claude API)
├── utils/
│   └── tagStore.ts            # localStorage helpers for tags
└── icons/                     # SVG icon components
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_ANTHROPIC_API_KEY` | Anthropic API key for auto-tagging and smart search |

> `.env` is gitignored and will never be pushed to GitHub. Use `.env.example` as a template.

---

## Notes

- Content is stored in `localStorage` — clearing browser storage will erase your saved cards
- The API key is used directly from the browser (fine for demos, use a backend proxy in production)
- The Share Brain feature encodes your content as a base64 URL — no server required
- Auto-fill title uses YouTube and Twitter oEmbed APIs — both are free and require no authentication

