import { useTheme } from "@/components/theme-provider";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <IconSun className="size-4" stroke={1.75} />
      ) : (
        <IconMoon className="size-4" stroke={1.75} />
      )}
    </Button>
  );
}
