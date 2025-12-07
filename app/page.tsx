"use client";

import { useCallback, useMemo, useState } from "react";

type ScrapeResponse = {
  images: string[];
  hasMore: boolean;
  total: number;
  error?: string;
};

const PAGE_SIZE = 100;

export default function Home() {
  const [targetUrl, setTargetUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const selectedCount = selected.size;

  const toggleSelect = useCallback((url: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(url)) {
        next.delete(url);
      } else {
        next.add(url);
      }
      return next;
    });
  }, []);

  const fetchPage = useCallback(
    async (pageToLoad: number, append: boolean) => {
      if (!targetUrl) {
        setError("URLを入力してください");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/scrape?page=${pageToLoad}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: targetUrl.trim() })
        });
        const data = (await res.json()) as ScrapeResponse;
        if (!res.ok || data.error) {
          throw new Error(data.error || "取得に失敗しました");
        }
        setHasMore(data.hasMore);
        setPage(pageToLoad);
        setImages((prev) => (append ? [...prev, ...data.images] : data.images));
      } catch (err: any) {
        setError(err?.message ?? "取得に失敗しました");
      } finally {
        setLoading(false);
      }
    },
    [targetUrl]
  );

  const onSearch = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      setSelected(new Set());
      await fetchPage(1, false);
    },
    [fetchPage]
  );

  const onLoadMore = useCallback(async () => {
    await fetchPage(page + 1, true);
  }, [fetchPage, page]);

  const onDownload = useCallback(async () => {
    if (selected.size === 0) {
      setError("ダウンロードする画像を選択してください");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: Array.from(selected) })
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg.error || "ダウンロードに失敗しました");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "images.zip";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err?.message ?? "ダウンロードに失敗しました");
    } finally {
      setLoading(false);
    }
  }, [selected]);

  const disableActions = loading;
  const hasImages = useMemo(() => images.length > 0, [images.length]);

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-base uppercase tracking-[0.4em] text-gray-400">
            Image Scraper Downloader
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            任意サイトの画像を取得して選択・ダウンロード
          </h1>
          <p className="text-gray-300">
            公開サイトの画像を最大{PAGE_SIZE}件ずつ表示し、選択してZIPでダウンロードできます。
          </p>
        </header>

        <form
          onSubmit={onSearch}
          className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/30 backdrop-blur"
        >
          <label className="text-sm text-gray-300" htmlFor="targetUrl">
            画像を取得したいページのURL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="targetUrl"
              type="url"
              required
              placeholder="https://example.com"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-500 focus:border-white/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={disableActions}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black px-4 py-3 text-sm font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-40"
            >
              {loading ? "読み込み中..." : "表示"}
            </button>
          </div>
          {error && <p className="text-sm text-red-300">{error}</p>}
        </form>

        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>
            取得件数: {images.length} {hasMore ? "(さらに取得可能)" : ""}
          </span>
          <span>選択: {selectedCount} 件</span>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20 backdrop-blur">
          {hasImages ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {images.map((src) => {
                const checked = selected.has(src);
                return (
                  <label
                    key={src}
                    className={`group relative block overflow-hidden rounded-xl border ${
                      checked ? "border-white/70" : "border-white/10"
                    } bg-black/40 transition hover:border-white/50`}
                  >
                    <input
                      type="checkbox"
                      className="peer absolute left-2 top-2 h-4 w-4 accent-white"
                      checked={checked}
                      onChange={() => toggleSelect(src)}
                    />
                    <div className="flex min-h-[140px] items-center justify-center bg-black/30">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="max-h-48 w-full object-contain transition duration-200 peer-checked:opacity-90"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 transition group-hover:opacity-100" />
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center text-gray-400">
              ここに画像が表示されます
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onLoadMore}
              disabled={!hasMore || disableActions}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              さらに見る
            </button>
          </div>
        </section>
      </div>

      {hasMore && (
        <div className="fixed right-4 bottom-6 z-30 sm:right-6 sm:bottom-8">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={!hasMore || disableActions}
            className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            さらに見る
          </button>
        </div>
      )}

      <div className="fixed left-4 bottom-6 z-30 sm:left-6 sm:top-1/2 sm:-translate-y-1/2">
        <button
          type="button"
          onClick={onDownload}
          disabled={disableActions || selectedCount === 0}
          className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-black shadow-lg shadow-emerald-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          ダウンロード ({selectedCount})
        </button>
      </div>
    </div>
  );
}
