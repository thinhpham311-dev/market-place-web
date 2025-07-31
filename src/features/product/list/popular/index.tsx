'use client'
import { useRouter } from "next/navigation";

//components
import {
    Button, Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui';
import ProductCarousel from "../components/ProductCarousel"

//hooks
import { useFetchData } from "./hooks";


//icons
import { ArrowRight } from "lucide-react"


export default function ProPopularList() {

    const router = useRouter()
    const { products, loading, error } = useFetchData();

    return (
        <Card className="border-none shadow-none grid grid-cols-12">
            <CardHeader className="col-span-12 flex-row  items-center mb-3" >
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Popular Products </CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>

                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="col-span-12">
                <ProductCarousel
                    countLoadItems={6}
                    data={products}
                    isLoading={loading}
                    error={error}
                    className="lg:basis-1/6 md:basis-1/4 basis-1/3" />
            </CardContent>
        </Card>
    );
}


