import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <img src="/logo.png" alt="Prompt Nest" className="size-5 rounded object-cover" />
          <span>Built by</span>
          <a
            href="https://github.com/bilals2008"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground transition-colors hover:text-primary cursor-pointer"
          >
            @bilals2008
          </a>
          <span>· MIT License</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://github.com/bilals2008/prompt-nest"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground cursor-pointer"
          >
            <IconBrandGithub className="size-4" stroke={1.75} />
            Source
          </a>
          <a
            href="https://github.com/bilals2008/prompt-nest/issues"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground cursor-pointer"
          >
            Issues
          </a>
          <a
            href="https://github.com/bilals2008/prompt-nest/releases"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground cursor-pointer"
          >
            Releases
          </a>
        </div>
      </div>
    </footer>
  );
}
