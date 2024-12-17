'use client'
import { useRouter } from "next/navigation";

//components
import { GallerySingle, CarouselList, GridListWithLoading } from "@/components/ui/organisms"
import { Button } from "@/components/ui/atoms"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';
import { bannerData } from '@/constants/data';

//icons
import { ArrowRight } from "lucide-react"

//datas
import { productData } from "@/constants/data"

export default function Home() {
  const router = useRouter()
  return (
    <div className="space-y-10">
      <GallerySingle data={bannerData} />
      <Card className="border-0 md:px-6 px-3 w-full">
        <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
          <div className="p-0 flex-1">
            <CardTitle className="mb-3 capitalize">Popular Products</CardTitle>
            <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
          </div>

          <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <CarouselList data={productData} className=" lg:basis-1/6  md:basis-1/3 basis-1/2" />
        </CardContent>
      </Card>
      <Card className="border-0 md:px-6 px-3">
        <CardHeader className="flex-row  items-center px-0 space-x-3 mb-3" >
          <CardTitle className="mb-3 capitalize text-center mx-auto">Suggestion today</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <GridListWithLoading data={productData} itemsPerPage={12} className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3" />
        </CardContent>
      </Card >
    </div>
  );
}


