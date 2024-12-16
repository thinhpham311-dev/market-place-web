
import * as React from "react"

import { bannerData } from '@/constants/data'
import { Slider } from "@/components/ui/organisms"

const Banner = () => {
    return (
        <Slider data={bannerData} />
    );
}

export default Banner