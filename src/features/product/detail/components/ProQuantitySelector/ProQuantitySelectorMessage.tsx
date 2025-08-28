"use client";
import * as React from "react";

// ui
import {
    CardFooter,
} from "@/components/ui";
import { ErrorMessages } from "@/components/shared";

// hooks
import { useProQuantitySelectorContext } from "./hooks";


const ProQuantitySelectorMessage = () => {

    const {
        errorMessages,
    } = useProQuantitySelectorContext();


    return (
        <CardFooter className="col-span-10 col-start-3 px-3 py-0">
            {errorMessages?.length > 0 && (
                <ErrorMessages messages={errorMessages} />
            )}
        </CardFooter>
    );
}

export default ProQuantitySelectorMessage
