import React, { useRef, useEffect, useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/utils/styles";

interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  loading: boolean;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onClear, loading, className, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isMac, setIsMac] = useState(false);

    // Resolve Mac vs Windows command key naming on client side
    useEffect(() => {
      if (typeof window !== "undefined") {
        setIsMac(/Mac|iPhone|iPad|iPod/i.test(navigator.platform));
      }
    }, []);

    // Combine local ref with forwarded ref
    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Hotkey listener for Focus (Ctrl+K or Cmd+K)
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
          e.preventDefault();
          inputRef.current?.focus();
          inputRef.current?.select();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClear();
      inputRef.current?.focus();
    };

    return (
      <div className={cn("relative flex w-full items-center", className)}>
        {/* Search Icon */}
        <div className="absolute left-4 text-muted-foreground pointer-events-none transition-colors duration-200">
          <Search className="h-5 w-5" />
        </div>

        {/* Input Field */}
        <input
          ref={setRefs}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "flex h-12 w-full rounded-xl border border-input bg-background pl-12 pr-24 text-base ring-offset-background",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:border-primary",
            "transition-all duration-200 ease-in-out shadow-sm",
          )}
          {...props}
        />

        {/* Action Indicators (Spinner, Clear, Hotkey hint) */}
        <div className="absolute right-3 flex items-center space-x-2">
          {loading && <Loader2 className="h-5 w-5 animate-spin text-primary mr-1" />}

          {value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className={cn(
                "rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "transition-colors",
              )}
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Shortcut badge hint */}
          <kbd
            className={cn(
              "pointer-events-none select-none hidden sm:inline-flex h-6 items-center gap-1 rounded border",
              "bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100 border-border",
            )}
          >
            <span>{isMac ? "⌘" : "Ctrl"}</span>K
          </kbd>
        </div>
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
