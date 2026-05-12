import { useState } from "react";

interface Content {
  title: string;
  link: string;
  type: string;
}

interface SmartSearchProps {
  contents: Content[];
  onResults: (results: Content[] | null) => void;
}

export function SmartSearch({ contents, onResults }: SmartSearchProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultCount, setResultCount] = useState<number | null>(null);

  const search = async () => {
    const q = query.trim();
    if (!q || loading) return;

    setLoading(true);
    setResultCount(null);

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    if (!apiKey) {
      const lower = q.toLowerCase();
      const results = contents.filter(
        (c) =>
          c.title.toLowerCase().includes(lower) ||
          c.type.toLowerCase().includes(lower)
      );
      setResultCount(results.length);
      onResults(results);
      setLoading(false);
      return;
    }

    try {
      const list = contents
        .map((c, i) => `${i}. [${c.type.toUpperCase()}] ${c.title}`)
        .join("\n");

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 256,
          messages: [
            {
              role: "user",
              content: `You are a semantic search engine. Given saved content items and a query, return ONLY a raw JSON array of 0-based indices of matching items. Understand intent, not just keywords — e.g. "coding stuff" should match programming tutorials. Return [] if nothing matches.\n\nQuery: "${q}"\n\nContent:\n${list}`,
            },
          ],
        }),
      });

      const data = await res.json();
      const text: string = data.content?.[0]?.text ?? "[]";
      const match = text.match(/\[[\d,\s]*\]/);
      const indices: number[] = match ? JSON.parse(match[0]) : [];
      const results = indices.map((i) => contents[i]).filter(Boolean);
      setResultCount(results.length);
      onResults(results);
    } catch {
      const lower = q.toLowerCase();
      const results = contents.filter((c) =>
        c.title.toLowerCase().includes(lower)
      );
      setResultCount(results.length);
      onResults(results);
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setQuery("");
    setResultCount(null);
    onResults(null);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">
            ✨
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder='AI Search — try "coding tutorials" or "funny tweets"'
            className="w-full pl-9 pr-8 py-2.5 border border-gray-300 rounded-xl text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
          />
          {query && (
            <button
              onClick={clear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xs"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={search}
          disabled={loading || !query.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      {resultCount !== null && (
        <p className="text-xs text-gray-500 mt-1.5 ml-1">
          {resultCount === 0
            ? "No matches found."
            : `${resultCount} result${resultCount === 1 ? "" : "s"} found for "${query}".`}
          <button
            onClick={clear}
            className="ml-2 text-purple-600 hover:underline"
          >
            Clear search
          </button>
        </p>
      )}
    </div>
  );
}
