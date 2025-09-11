'use client'
import { useRouter } from "next/navigation";

//components
import {
    Button, Card, CardHeader, CardContent, CardTitle, CardDescription
} from '@/components/ui';
import ProGrid from "@/features/product/components/ProGrid";
import Pagination from "@/features/common/pagination";

//hooks
import { useFetchData } from "@/features/product/list/search/hooks";

//icons
import { ArrowRight } from "lucide-react"

///constants
import { PRO_SEARCH_LIST } from "@/features/product/list/search/constants";


export default function ProSearchList() {
    const router = useRouter()
    const { products, totalItems, error, status } = useFetchData({
        keyword: "",
        storeKey: PRO_SEARCH_LIST,
    });

    return (
        <Card className="border-none shadow-none grid grid-cols-12">
            <CardHeader className="col-span-12 flex-row  items-center mb-3" >
                <div className="p-0 flex-1">
                    <CardTitle className="mb-3 capitalize">Popular Products</CardTitle>
                    <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="float-end" onClick={() => router.push("/categories/1")}>
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent className="col-span-12">
                <ProGrid
                    countLoadItems={12}
                    error={error}
                    data={products}
                    className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3"
                    status={status}
                />
                <Pagination
                    storeKey={PRO_SEARCH_LIST}
                    isShowDot
                    isShowNav
                    initialLimit={15}
                    initialTotal={totalItems}
                />
            </CardContent>
        </Card>
    );
}


