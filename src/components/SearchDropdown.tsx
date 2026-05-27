import React from "react";
import { Clock, Trash2, ShoppingBag, AlertTriangle, ArrowRight } from "lucide-react";
import { ProductItem } from "@/services/product.service";
import { cn } from "@/utils/styles";

// Formatter for VND prices
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// Highlight search keyword on text matching case-insensitively
const HighlightText = React.memo<{ text: string; highlight: string }>(
  ({ text, highlight }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }

    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedHighlight})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-transparent text-primary font-bold">
              {part}
            </mark>
          ) : (
            <span key={index} className="text-foreground">
              {part}
            </span>
          )
        )}
      </span>
    );
  }
);
HighlightText.displayName = "HighlightText";

// Memoized Product Item Component to optimize rendering performance
const ProductRow = React.memo<{
  product: ProductItem;
  query: string;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}>(({ product, query, isActive, onClick, onMouseEnter }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-150 rounded-xl",
        isActive
          ? "bg-accent/80 text-accent-foreground shadow-sm translate-x-1"
          : "hover:bg-muted/50 text-foreground"
      )}
      role="option"
      aria-selected={isActive}
    >
      {/* Product Image */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-border bg-stone-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Fallback for broken images
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&q=80";
          }}
        />
      </div>

      {/* Product Metadata */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm truncate leading-snug">
          <HighlightText text={product.name} highlight={query} />
        </h4>
        <div className="flex items-center gap-3 mt-1">
          <span className="font-semibold text-sm text-primary">
            {formatPrice(product.price)}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium leading-none",
              product.inStock
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50"
                : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50"
            )}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Enter Action Indicator (shown on active keyboard selection) */}
      {isActive && (
        <ArrowRight className="h-4 w-4 text-primary animate-pulse flex-shrink-0" />
      )}
    </div>
  );
});
ProductRow.displayName = "ProductRow";

// Memoized History Item Component
const HistoryRow = React.memo<{
  term: string;
  isActive: boolean;
  onClick: () => void;
  onRemove: (e: React.MouseEvent) => void;
  onMouseEnter: () => void;
}>(({ term, isActive, onClick, onRemove, onMouseEnter }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-150 rounded-lg",
        isActive ? "bg-accent/80 text-accent-foreground" : "hover:bg-muted/50 text-foreground"
      )}
      role="option"
      aria-selected={isActive}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        <span className="text-sm font-medium truncate">{term}</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="p-1 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none transition-colors"
        aria-label={`Remove "${term}" from search history`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
});
HistoryRow.displayName = "HistoryRow";

interface SearchDropdownProps {
  isOpen: boolean;
  query: string;
  results: ProductItem[];
  loading: boolean;
  error: string | null;
  history: string[];
  activeIndex: number;
  onSetActiveIndex: (index: number) => void;
  onSelectProduct: (product: ProductItem) => void;
  onSelectHistory: (term: string) => void;
  onRemoveHistoryItem: (term: string) => void;
  onClearHistory: () => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  isOpen,
  query,
  results,
  loading,
  error,
  history,
  activeIndex,
  onSetActiveIndex,
  onSelectProduct,
  onSelectHistory,
  onRemoveHistoryItem,
  onClearHistory,
}) => {
  if (!isOpen || query.trim() === "") return null;

  const isQueryEmpty = query.trim() === "";

  return (
    <div
      className={cn(
        "absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl",
        "backdrop-blur-md bg-opacity-95 dark:bg-opacity-95 transition-all duration-200 ease-out"
      )}
      role="listbox"
      aria-label="Search suggestions"
    >
      {/* 1. Loading State */}
      {loading && (
        <div className="p-4 space-y-3" aria-hidden="true">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 py-2">
              <div className="h-12 w-12 rounded-lg bg-muted animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
                <div className="h-3 w-1/4 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Error State */}
      {!loading && error && (
        <div className="p-6 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-destructive/10 p-3 text-destructive mb-3">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h4 className="font-semibold text-sm mb-1 text-foreground">Failed to Load Results</h4>
          <p className="text-xs text-muted-foreground max-w-xs">{error}</p>
        </div>
      )}

      {/* 3. Search Results Mode */}
      {!loading && !error && !isQueryEmpty && (
        <div className="p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase border-b border-border/50 mb-1">
                Products Found ({results.length})
              </div>
              {results.map((product, index) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  query={query}
                  isActive={activeIndex === index}
                  onClick={() => onSelectProduct(product)}
                  onMouseEnter={() => onSetActiveIndex(index)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <div className="rounded-full bg-muted p-3 text-muted-foreground mb-3">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h4 className="font-semibold text-sm mb-1 text-foreground">No Products Found</h4>
              <p className="text-xs text-muted-foreground max-w-xs">
                We couldn&apos;t find any matches for &ldquo;{query}&rdquo;. Check spelling or try something else.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Recent Searches / History Mode (When input is empty) */}
      {!loading && !error && isQueryEmpty && (
        <div className="p-2">
          {history.length > 0 ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50 mb-1">
                <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Recent Searches
                </span>
                <button
                  type="button"
                  onClick={onClearHistory}
                  className="text-[10px] font-medium text-destructive hover:underline focus-visible:outline-none"
                >
                  Clear all
                </button>
              </div>
              {history.map((term, index) => (
                <HistoryRow
                  key={term}
                  term={term}
                  isActive={activeIndex === index}
                  onClick={() => onSelectHistory(term)}
                  onRemove={(e) => {
                    e.stopPropagation();
                    onRemoveHistoryItem(term);
                  }}
                  onMouseEnter={() => onSetActiveIndex(index)}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-muted-foreground">
              Search for products to populate recent history.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
