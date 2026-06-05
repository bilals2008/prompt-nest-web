import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToHash } from "@/components/scroll-to-hash";
import { useLatestRelease } from "@/hooks/use-latest-release";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Download } from "@/components/sections/download";
import { ThemePreview } from "@/components/sections/theme-preview";
import { QuickPrompt } from "@/components/sections/quickprompt";
import { Footer } from "@/components/sections/footer";
import { ChangelogPage } from "@/components/pages/changelog-page";

function HomePage() {
  const release = useLatestRelease();

  return (
    <ThemeProvider>
      <ScrollToHash />
      <div className="min-h-screen bg-background text-foreground">
        <Navbar version={release.version} />
        <main>
          <Hero version={release.version} />
          <Features />
          <Download release={release} />
          <ThemePreview />
          <QuickPrompt />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/changelog" element={<ChangelogPage />} />
    </Routes>
  );
}

export default App;
