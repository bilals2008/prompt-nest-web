import { useEffect, useState } from "react";

const REPO = "bilals2008/prompt-nest";
const FALLBACK_VERSION = "0.1.0";

export function useLatestRelease() {
  const [state, setState] = useState({
    version: FALLBACK_VERSION,
    notes: "",
    publishedAt: null,
    assets: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO}/releases/latest`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const assets = (data.assets || []).map((a) => ({
          name: a.name,
          url: a.browser_download_url,
          size: a.size,
        }));
        const windows = assets.find((a) => a.name.endsWith(".exe"));
        const mac = assets.find((a) => a.name.endsWith(".dmg"));

        setState({
          version: (data.tag_name || FALLBACK_VERSION).replace(/^v/, ""),
          notes: data.body || "",
          publishedAt: data.published_at || null,
          assets,
          windows: windows?.url || null,
          mac: mac?.url || null,
          releaseUrl: data.html_url || `https://github.com/${REPO}/releases/latest`,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          loading: false,
          error: err.message,
          releaseUrl: `https://github.com/${REPO}/releases/latest`,
        }));
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
