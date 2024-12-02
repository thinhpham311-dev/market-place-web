
import * as React from "react"
import { memo } from "react"
import { bannerData } from '@/constants/data'
import CarouselSingle from "./components/Carousel"

const Banner = () => {
    return (
        <div className=" w-full">
            <CarouselSingle data={bannerData} />
        </div>
    );
}

export default memo(Banner)