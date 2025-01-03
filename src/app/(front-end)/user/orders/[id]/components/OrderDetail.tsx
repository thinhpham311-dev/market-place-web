'use client';

import { useMemo } from 'react';

// Routers
import { useParams, useRouter } from 'next/navigation';

// Components
import { Badge, Button } from "@/components/ui/atoms"
import { Card, CardContent, CardTitle, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, CardHeader } from '@/components/ui/molecules';

import { orderData } from '@/constants/data';

//icons
import { ArrowLeft } from 'lucide-react';


export default function OrderDetail() {
    const { id } = useParams();
    const router = useRouter()

    const { order } = useMemo(() => {
        const order = orderData?.find((item) => item?._id === id);
        return { order };
    }, [id]);


    if (!order) return <div>Order not found</div>

    return (
        <div className='grid grid-cols-3 gap-3'>
            <Card className=' md:px-6 px-3 md:col-span-2 col-span-3'>
                <CardHeader className='flex flex-row items-center gap-3'>
                    <Button onClick={() => router.back()} variant="outline" size="icon">
                        <ArrowLeft />
                    </Button>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <strong>Order ID:</strong> {order._id}
                        </div>
                        <div>
                            <strong>User:</strong> {order.user?.name || "Guest"}
                        </div>
                        <div>
                            <strong>Payment Method:</strong> {order.paymentMethod}
                        </div>
                        <div>
                            <strong>Status:</strong>{" "}
                            <Badge variant={order.isPaid ? "default" : "destructive"}>
                                {order.isPaid ? "Paid" : "Unpaid"}
                            </Badge>{" "}
                            <Badge variant={order.isDelivered ? "default" : "secondary"}>
                                {order.isDelivered ? "Delivered" : "Pending"}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className='md:col-span-1 col-span-3  md:px-6 px-3'>
                <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.address}</p>
                        <p>
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className='md:col-span-2 col-span-3  md:px-6 px-3'>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.qty}</TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>${(item.qty * item.price).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className='md:col-span-1 col-span-3  md:px-6 px-3'>
                <CardHeader>
                    <CardTitle>Price Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Items Price:</span>
                            <span>${order.itemsPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping Price:</span>
                            <span>${order.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax Price:</span>
                            <span>${order.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>Total Price:</span>
                            <span>${order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
