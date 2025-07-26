import { useContext, Context } from "react";

/**
 * A generic hook to safely use React Context with runtime check.
 * @param context React Context object
 * @param name Optional name for error message
 */
export function useContextSafe<T>(context: Context<T | null>, name?: string): T {
    const value = useContext(context);
    if (!value) {
        throw new Error(
            `useContextSafe must be used within ${name || "its Provider"}`
        );
    }
    return value;
}
