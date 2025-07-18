"use client";
import React from "react";
import { images, socials } from "./data"
import ThumbnailGallery from "./components/ThumbnailGallery";
import ProQuantitySelector from "./components/ProQuantitySelector"
import ProVariantsSelector from "./components/ProVariantsSelector"
import ProDescriptionContent from "./components/ProDescriptionContent";
import ProSpecifications from "./components/ProSpecifications"
import SocialsShare from "./components/SocialsShare";
// import PurchaseActions from "./components/PurchaseActions"



export default function ProDetail() {
    return (
        <div className="w-full max-w-xl sm:w-auto">
            <ThumbnailGallery data={images} />
            <SocialsShare data={socials} />
            <ProVariantsSelector options={[]} />
            <ProQuantitySelector quantity={0} />
            <ProDescriptionContent />
            <ProSpecifications specs={[]} />
            {/* <PurchaseActions /> */}
        </div>
    );
}
