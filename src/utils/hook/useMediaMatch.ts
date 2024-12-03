import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
    // Helper to check if the media query matches
    const getMatches = (): boolean =>
        typeof window !== "undefined" && window.matchMedia(query).matches;

    // Initialize state with a function initializer for lazy evaluation
    const [matches, setMatches] = useState<boolean>(() => getMatches());

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Handler for media query changes
        const handleChange = () => setMatches(matchMedia.matches);

        // Add event listener
        matchMedia.addEventListener("change", handleChange);

        // Initial check
        handleChange();

        // Cleanup event listener
        return () => {
            matchMedia.removeEventListener("change", handleChange);
        };
    }, [query]); // Depend on the query to handle updates properly

    return matches;
};
