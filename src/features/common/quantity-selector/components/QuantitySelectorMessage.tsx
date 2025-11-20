"use client";
import * as React from "react";

// ui
import {
    CardFooter,
} from "@/components/ui";
import { ErrorMessages } from "@/components/shared";

// hooks
import { useQuantitySelectorContext } from "../hooks";


const QuantitySelectorMessage = () => {

    const {
        errorMessages,
    } = useQuantitySelectorContext();


    return (
        <CardFooter className=" px-3 py-0 basis-full">
            {errorMessages?.length > 0 && (
                <ErrorMessages messages={errorMessages} />
            )}
        </CardFooter>
    );
}

export default QuantitySelectorMessage
