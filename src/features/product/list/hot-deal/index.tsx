'use client'
import { useRouter } from "next/navigation";

//components
import {
    Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui/card';
import {
    Button
} from '@/components/ui/button';
import ProCarousel from "@/features/product/components/ProCarousel"

//datas

//stores
import { useFetchData } from "./hooks";

//icons
import { ArrowRight } from "lucide-react"
import { FaHotjar } from "react-icons/fa"


export default function ProHotDealList() {
    const router = useRouter()
    const { products = [], loading, error = null } = useFetchData()

    return (
        <Card className="border-none shadow-nonee grid grid-cols-12">
            <CardHeader className="col-span-12 flex-row  items-center mb-3" >
                <div className=" flex-1">
                    <CardTitle className="mb-3 capitalize space-x-2 flex items-center"><FaHotjar color="#f73e48" /><span>Hot Deals</span></CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>

                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="col-span-12">
                <ProCarousel
                    error={error}
                    countLoadItems={6}
                    data={products}
                    isLoading={loading}
                    className="lg:basis-1/6 md:basis-1/4 basis-1/3" />
            </CardContent>
        </Card>
    );
}


