"use client";

import CheckoutButton from "./CheckoutButton";
import DeleteAllButton from "./DeleteAllButton"

export default function ActionsSection() {

    return (
        <div className="flex items-center justify-end space-x-3 border p-3  w-full">
            <DeleteAllButton />
            <CheckoutButton />
        </div>
    );
}
