
import * as React from "react"
import { memo } from "react"
import { bannerData } from '@/constants/data'
import { Slider } from "@/components/ui/organisms"

const Banner = () => {
    return (
        <div className="w-full">
            <Slider data={bannerData} />
        </div>
    );
}

export default memo(Banner)