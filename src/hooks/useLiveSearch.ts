import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import { debounce } from "@/utils/debounce";
import { apiSearchSuggestions, ProductItem } from "@/services/product.service";

// Module-scoped cache to persist searches across component mount/unmounts
const searchCache = new Map<string, ProductItem[]>();
const CACHE_LIMIT = 100;

interface UseLiveSearchOptions {
  onSelectProduct?: (product: ProductItem) => void;
  onSearchSubmit?: (keyword: string) => void;
  limit?: number;
}

export function useLiveSearch({ onSelectProduct, onSearchSubmit, limit = 5 }: UseLiveSearchOptions = {}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Sync recent searches with localStorage
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("recent_searches");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Save keyword to local storage history (limits to 5 items, removes duplicates)
  const saveToHistory = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== trimmed);
      const next = [trimmed, ...filtered].slice(0, 5);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("recent_searches", JSON.stringify(next));
        } catch (e) {
          console.error("Failed to save search history to localStorage", e);
        }
      }
      return next;
    });
  }, []);

  const removeHistoryItem = useCallback((term: string) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item !== term);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("recent_searches", JSON.stringify(next));
        } catch (e) {
          console.error("Failed to remove search history from localStorage", e);
        }
      }
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("recent_searches");
      } catch (e) {
        console.error("Failed to clear search history from localStorage", e);
      }
    }
  }, []);

  // API Call function
  const searchApi = useCallback(async (keyword: string) => {
    // Abort any pending requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Check cache
    const cachedData = searchCache.get(keyword);
    if (cachedData) {
      setResults(cachedData);
      setError(null);
      setLoading(false);
      setIsOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiSearchSuggestions(keyword, limit, controller.signal);
      const resBody = response.data as any;
      
      let rawResults: any[] = [];
      if (resBody) {
        if (Array.isArray(resBody.data)) {
          rawResults = resBody.data;
        } else if (resBody.metadata && Array.isArray(resBody.metadata.data)) {
          rawResults = resBody.metadata.data;
        }
      }

      // Map raw response items to standardized ProductItem schema
      const fetchedResults: ProductItem[] = rawResults.map((item: any, idx: number) => {
        // If it's already a full product
        if (item.name && item.thumbnail) {
          return {
            id: item.id || idx,
            name: item.name,
            thumbnail: item.thumbnail,
            price: item.price || 0,
            inStock: item.inStock !== undefined ? item.inStock : true,
          };
        }
        
        // If it's a backend suggestions text item (text, score, product_id)
        if (item.text) {
          const formattedName = item.text
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
            
          return {
            id: item.product_id || item.id || idx,
            name: formattedName,
            thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&auto=format&fit=crop&q=80",
            price: item.price || 120000,
            inStock: true,
          };
        }
        
        // Fallback mapping
        return {
          id: item.id || idx,
          name: item.name || "Suggested Product",
          thumbnail: item.thumbnail || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=100&q=80",
          price: item.price || 0,
          inStock: true,
        };
      });

      // Add to Cache, maintaining size limit
      if (searchCache.size >= CACHE_LIMIT) {
        const firstKey = searchCache.keys().next().value;
        if (firstKey !== undefined) {
          searchCache.delete(firstKey);
        }
      }
      searchCache.set(keyword, fetchedResults);

      // Only update state if this request wasn't superseded
      if (abortControllerRef.current === controller) {
        setResults(fetchedResults);
        setIsOpen(true);
      }
    } catch (err: any) {
      if (axios.isCancel(err) || err.name === "AbortError") {
        // Request was aborted, do nothing
        return;
      }
      if (abortControllerRef.current === controller) {
        setError(err.message || "Failed to fetch search results");
        setResults([]);
      }
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  // Debounced wrapper for searching
  const debouncedSearch = useMemo(() => {
    return debounce((keyword: string) => {
      searchApi(keyword);
    }, 300);
  }, [searchApi]);

  // Handle query changes (checks cache synchronously, otherwise debounces)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      setIsOpen(false);
      setActiveIndex(-1);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    }

    // Synchronous Cache Check to bypass loading state/debounce
    const cachedData = searchCache.get(trimmed);
    if (cachedData) {
      setResults(cachedData);
      setLoading(false);
      setError(null);
      setIsOpen(true);
      setActiveIndex(-1);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      return;
    }

    // Trigger loading and debounce search
    setLoading(true);
    setIsOpen(true);
    debouncedSearch(trimmed);
  }, [query, debouncedSearch]);

  // Clean up controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const selectSuggestedProduct = useCallback(
    (product: ProductItem) => {
      onSelectProduct?.(product);
      saveToHistory(product.name);
      setIsOpen(false);
      setActiveIndex(-1);
    },
    [onSelectProduct, saveToHistory]
  );

  const selectHistoryTerm = useCallback((term: string) => {
    setQuery(term);
    saveToHistory(term);
    setActiveIndex(-1);
  }, [saveToHistory]);

  const triggerSearchSubmit = useCallback(() => {
    const trimmed = query.trim();
    if (trimmed) {
      saveToHistory(trimmed);
      onSearchSubmit?.(trimmed);
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }, [query, saveToHistory, onSearchSubmit]);

  // Keyboard navigation logic
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const isHistoryMode = query.trim() === "";
      const itemsCount = isHistoryMode ? history.length : results.length;

      if (!isOpen && itemsCount > 0) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setIsOpen(true);
          setActiveIndex(0);
          return;
        }
      }

      if (itemsCount === 0 || !isOpen) {
        if (e.key === "Enter") {
          triggerSearchSubmit();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % itemsCount);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + itemsCount) % itemsCount);
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < itemsCount) {
            if (isHistoryMode) {
              selectHistoryTerm(history[activeIndex]);
            } else {
              selectSuggestedProduct(results[activeIndex]);
            }
          } else {
            triggerSearchSubmit();
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setActiveIndex(-1);
          break;
      }
    },
    [
      isOpen,
      query,
      history,
      results,
      activeIndex,
      selectSuggestedProduct,
      selectHistoryTerm,
      triggerSearchSubmit,
    ]
  );

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    isOpen,
    setIsOpen,
    history,
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    saveToHistory,
    removeHistoryItem,
    clearHistory,
    selectSuggestedProduct,
    selectHistoryTerm,
    triggerSearchSubmit,
  };
}
