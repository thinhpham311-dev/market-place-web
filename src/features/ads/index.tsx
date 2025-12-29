import * as React from "react";

//components
import { Card, CardContent } from "@/components/ui/card";
import AdsCarousel from "./components/AdsCarousel";

//datas
import { bannerData } from "@/constants/data";

const Advertisement = () => {
  return (
    <Card className="border-none shadow-none grid grid-cols-12">
      <CardContent className="col-span-12">
        <AdsCarousel data={bannerData} />
      </CardContent>
    </Card>
  );
};

export default Advertisement;
