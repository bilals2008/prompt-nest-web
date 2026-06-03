import { ThemeProvider } from "@/components/theme-provider";
import { useLatestRelease } from "@/hooks/use-latest-release";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Download } from "@/components/sections/download";
import { Changelog } from "@/components/sections/changelog";
import { Footer } from "@/components/sections/footer";

function App() {
  const release = useLatestRelease();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar version={release.version} />
        <main>
          <Hero version={release.version} />
          <Features />
          <Download release={release} />
          <Changelog />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

