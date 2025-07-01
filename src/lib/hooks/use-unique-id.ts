"use client"
import { useRef } from "react";

function generateRandomString() {
    return crypto.randomUUID(); // Generates a UUID
}

export function useUniqueId(prefix = 'id') {
    const idRef = useRef(`${prefix}-${generateRandomString()}`);
    return idRef.current;
}


