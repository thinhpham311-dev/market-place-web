// components/providers/FilterProvider.tsx
'use client';

import { injectReducer } from "@/store";
import paginationReducer from "../store/stateSlice";

injectReducer("pagination", paginationReducer);

export default function PaginationProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
