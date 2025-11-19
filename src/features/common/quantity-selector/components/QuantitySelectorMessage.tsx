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
        <CardFooter className=" col-start-3 px-3 py-0">
            {errorMessages?.length > 0 && (
                <ErrorMessages messages={errorMessages} />
            )}
        </CardFooter>
    );
}

export default QuantitySelectorMessage
