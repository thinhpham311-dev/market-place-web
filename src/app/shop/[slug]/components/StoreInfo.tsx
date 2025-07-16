"use client"
import { useRouter } from "next/navigation";

//ui
import { Button, Avatar, AvatarImage, AvatarFallback, Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui";


//icons
import { Plus, MessageCircleMore } from "lucide-react";
export default function StoreInfo(
    // { name, address, phone, openingHours }: ISroreInfoProps
) {
    const router = useRouter()

    return (
        <Card className=' grid grid-cols-12 md:gap-10 gap-5 md:mx-6 mx-3 md:p-6 p-3'>
            <CardHeader className='flex flex-row flex-wrap md:col-span-4 col-span-12 gap-x-5 p-0'>
                <div className='col-span-1 my-3'>
                    <Avatar>
                        <AvatarImage src="https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <CardContent className='grid grid-cols-2  flex-1 p-0 '>
                    <CardTitle className='text-lg col-span-2'>
                        Mỹ Phẩm Chính Hãng
                    </CardTitle>
                    <CardDescription className='col-span-2'>
                        <small className=' text-xs'>Active 57 minutes ago</small>
                    </CardDescription>
                </CardContent>
                <CardContent className='grid grid-cols-2 w-full gap-3 p-0'>
                    <Button className='col-span-1' variant="outline" onClick={() => router.push("/shop/shop-1")}><Plus /><span>View Shop</span></Button>
                    <Button className='col-span-1' variant="outline" ><MessageCircleMore /><span>Chat Now</span></Button>
                </CardContent>
            </CardHeader>
            <CardContent className=' md:col-span-8 col-span-12 grid md:gap-10 gap-3 md:grid-cols-3 grid-cols-2 items-center  p-0'>
                <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>ratings:</strong> 1,5k</CardDescription>
                <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>response rate:</strong> 92%</CardDescription>
                <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>joined:</strong> 6 years ago</CardDescription>
                <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>products:</strong> 55</CardDescription>
                <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>response time:</strong> within hours</CardDescription>
                <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>follower:</strong> 4,8k</CardDescription>
            </CardContent>
        </Card>
    )
};
