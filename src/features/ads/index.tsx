'use client'
import * as React from "react"

//components
import AdsCarousel from "./components/AdsCarousel"

//datas
import { bannerData } from "@/constants/data"


const Advertisement = () => {

    return (
        <>
            <AdsCarousel data={bannerData} />
        </>
    );
}

export default Advertisement;

