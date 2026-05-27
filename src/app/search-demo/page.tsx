"use client";

import React, { useRef, useEffect, useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { SearchDropdown } from "@/components/SearchDropdown";
import { useLiveSearch } from "@/hooks/useLiveSearch";
import { ProductItem } from "@/services/product.service";
import { Terminal, Database, Keyboard, Sparkles, CheckCircle2, History } from "lucide-react";
import { cn } from "@/utils/styles";

interface LogEntry {
  id: string;
  time: string;
  type: "info" | "success" | "warn" | "error" | "cache";
  message: string;
}

export default function SearchDemoPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Add event helper to log console events to UI
  const addLog = (message: string, type: LogEntry["type"] = "info") => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [
      { id: Math.random().toString(), time, type, message },
      ...prev.slice(0, 14),
    ]);
  };

  // Live search hook callbacks
  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    addLog(`Product selected: "${product.name}" (${product.id})`, "success");
  };

  const handleSearchSubmit = (keyword: string) => {
    setSubmittedQuery(keyword);
    addLog(`Search form submitted with keyword: "${keyword}"`, "info");
  };

  const liveSearch = useLiveSearch({
    onSelectProduct: handleSelectProduct,
    onSearchSubmit: handleSearchSubmit,
  });

  const {
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
    removeHistoryItem,
    clearHistory,
    selectSuggestedProduct,
    selectHistoryTerm,
  } = liveSearch;

  // Handle click outside to close suggestion dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  // Log status transitions for debugger visual feedback
  useEffect(() => {
    if (query.trim() === "") {
      return;
    }
    if (loading) {
      addLog(`API request initiated (Debounced) / aborting preceding...`, "info");
    }
  }, [loading, query]);

  useEffect(() => {
    if (error) {
      addLog(`API Error: ${error}`, "error");
    }
  }, [error]);

  useEffect(() => {
    if (results.length > 0 && !loading && query) {
      // Check if it was retrieved from cache
      addLog(`Search resolved with ${results.length} items`, "success");
    }
  }, [results, loading, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-black text-stone-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Live Search Playground
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-orange-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
            Ultra-Fast Autocomplete Search
          </h1>
          <p className="max-w-lg mx-auto text-sm sm:text-base text-stone-400">
            A state-of-the-art live search component leveraging debouncing, Axios request aborting, client cache mapping, and strict accessibility.
          </p>
        </div>

        {/* Search Widget Container */}
        <div 
          ref={containerRef} 
          className="relative max-w-xl mx-auto z-40 bg-stone-900/60 p-6 rounded-3xl border border-stone-800/80 shadow-2xl backdrop-blur-xl"
        >
          <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2 px-1">
            Search Products
          </label>
          <SearchInput
            value={query}
            onChange={setQuery}
            onClear={() => {
              setQuery("");
              addLog("Search input cleared", "info");
            }}
            loading={loading}
            onKeyDown={handleKeyDown}
            placeholder="Type 'ip', 'sony', 'nike', 'mac'..."
            onFocus={() => {
              if (query.trim() !== "") {
                setIsOpen(true);
              }
              addLog("Search input focused", "info");
            }}
          />
          
          <SearchDropdown
            isOpen={isOpen}
            query={query}
            results={results}
            loading={loading}
            error={error}
            history={history}
            activeIndex={activeIndex}
            onSetActiveIndex={setActiveIndex}
            onSelectProduct={selectSuggestedProduct}
            onSelectHistory={(term) => {
              selectHistoryTerm(term);
              addLog(`Selected search term from history: "${term}"`, "info");
            }}
            onRemoveHistoryItem={(term) => {
              removeHistoryItem(term);
              addLog(`Removed "${term}" from history`, "warn");
            }}
            onClearHistory={() => {
              clearHistory();
              addLog("Cleared all search history", "warn");
            }}
          />
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Diagnostic Console Panel */}
          <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 flex flex-col h-[320px]">
            <div className="flex items-center gap-2 border-b border-stone-800 pb-3 mb-3">
              <Terminal className="h-4.5 w-4.5 text-orange-400" />
              <h3 className="font-semibold text-sm tracking-wide text-stone-200">Real-time Diagnostics Console</h3>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[11px] leading-relaxed pr-1 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
              {logs.length === 0 ? (
                <div className="text-stone-600 italic text-center pt-20">Console waiting for search activity...</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex gap-2">
                    <span className="text-stone-500 flex-shrink-0">{log.time}</span>
                    <span
                      className={cn(
                        log.type === "success" && "text-emerald-400",
                        log.type === "warn" && "text-amber-400",
                        log.type === "error" && "text-red-400",
                        log.type === "info" && "text-sky-400"
                      )}
                    >
                      [{log.type.toUpperCase()}] {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Results Details Display Panel */}
          <div className="bg-stone-900/30 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between h-[320px]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-850 pb-3">
                <Database className="h-4.5 w-4.5 text-emerald-400" />
                <h3 className="font-semibold text-sm tracking-wide text-stone-200">Selected Product Detail</h3>
              </div>

              {selectedProduct ? (
                <div className="flex items-start gap-4 p-3 bg-stone-900/80 rounded-xl border border-stone-800">
                  <div className="h-16 w-16 overflow-hidden rounded-lg border border-stone-800 flex-shrink-0 bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={selectedProduct.thumbnail} 
                      alt={selectedProduct.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-stone-100 text-sm leading-snug">{selectedProduct.name}</h4>
                    <p className="text-xs text-stone-400 mt-1">Product ID: {selectedProduct.id}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-sm text-primary">
                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(selectedProduct.price)}
                      </span>
                      <span className={cn(
                        "px-1.5 py-0.5 text-[9px] font-semibold rounded-full uppercase",
                        selectedProduct.inStock ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                      )}>
                        {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-8 text-stone-500">
                  <CheckCircle2 className="h-8 w-8 text-stone-600 mb-2" />
                  <p className="text-xs">No product selected yet.</p>
                  <p className="text-[10px] text-stone-600 mt-1">Select a suggestion in the dropdown via mouse or keyboard.</p>
                </div>
              )}
            </div>

            <div className="border-t border-stone-850 pt-3 flex flex-col gap-1.5 text-xs text-stone-400">
              <div className="flex justify-between">
                <span>Submitted Query:</span>
                <span className="font-semibold text-stone-200">{submittedQuery || "None"}</span>
              </div>
              <div className="flex justify-between">
                <span>Total suggestions:</span>
                <span className="font-semibold text-stone-200">{results.length}</span>
              </div>
              <div className="flex justify-between">
                <span>History entries:</span>
                <span className="font-semibold text-stone-200">{history.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* UX Tips & Instructions */}
        <div className="bg-stone-900/30 border border-stone-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-400">
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-200 flex items-center gap-2">
              <Keyboard className="h-4 w-4 text-primary" /> Keyboard Shortcuts & Navigation
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Press <kbd className="bg-stone-800 px-1 py-0.5 rounded border border-stone-750 text-stone-300">Ctrl + K</kbd> or <kbd className="bg-stone-800 px-1 py-0.5 rounded border border-stone-750 text-stone-300">⌘ + K</kbd> to focus search input.</li>
              <li>Use <kbd className="bg-stone-800 px-1 py-0.5 rounded border border-stone-750 text-stone-300">Arrow Down</kbd> / <kbd className="bg-stone-800 px-1 py-0.5 rounded border border-stone-750 text-stone-300">Arrow Up</kbd> to move selection.</li>
              <li>Press <kbd className="bg-stone-800 px-1 py-0.5 rounded border border-stone-750 text-stone-300">Enter</kbd> to select the highlighted element.</li>
              <li>Press <kbd className="bg-stone-800 px-1 py-0.5 rounded border border-stone-750 text-stone-300">Escape</kbd> to hide suggestions.</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-200 flex items-center gap-2">
              <History className="h-4 w-4 text-emerald-400" /> Key Features under the Hood
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Cancellation:</strong> Requests cancelled mid-flight via <code className="text-orange-400">AbortController</code>.</li>
              <li><strong>Sync Cache:</strong> Map caching skips network load on duplicate back-to-back entries.</li>
              <li><strong>Debounce:</strong> Restricts API calling overhead to 300ms.</li>
              <li><strong>Clean UI:</strong> Dynamic loading skeletons and responsive layouts.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
