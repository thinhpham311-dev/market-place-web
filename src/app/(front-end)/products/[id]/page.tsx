'use client';

import { useRef, useMemo, useCallback } from 'react';

// Routers
import { useParams } from 'next/navigation';

// Store
import { useAppDispatch } from '@/lib/hooks';
import { addItem } from '@/store/cart/stateSlice';

// Components
import { Button } from '@/components/ui/atoms';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Counter, CounterRef } from '@/components/ui/molecules';
import { GalleryWithThumbnails, ButtonTagsList, CarouselList } from '@/components/ui/organisms';

// Icons
import { MdOutlineStar, MdOutlineStarBorder, MdAddShoppingCart } from 'react-icons/md';
import { ArrowRight, CircleDollarSign } from 'lucide-react';

// Data
import { images, productData } from '@/constants/data';

// Types
import { IcartItem } from '@/types/cart';
import { IProduct } from '@/types/product';

export default function Page() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const counterRef = useRef<CounterRef>(null);

    const { product } = useMemo(() => {
        const product = productData?.find((item: IProduct) => item?.id === id);
        return { product };
    }, [id]);

    const handleAddToCart = useCallback(() => {
        if (!product) {
            return;
        }

        const updatedQuantity = counterRef.current?.getCount() || 0;

        if (updatedQuantity <= 0) {
            return;
        }

        const cartItem: IcartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity: updatedQuantity,
        };

        dispatch(addItem(cartItem))
        counterRef.current?.reset()
    }, [dispatch, product]);


    if (!product) return <div>Product not found</div>;

    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <Card layout="horizontal" className="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5 md:px-6 px-3 space-y-5 my-6 border-none">
                <div className="p-0 space-y-4 lg:col-span-1 md:col-span-2 col-span-1">
                    <GalleryWithThumbnails data={images} />
                </div>
                <div className="md:py-6 p-0 space-y-3 lg:col-span-2 md:col-span-2 col-span-1">
                    <CardContent>
                        <CardTitle className="line-clamp-2 leading-8 mb-5">{product.name}</CardTitle>
                        <CardDescription className="space-y-5">
                            <span className="flex items-center space-x-1">
                                {[...Array(2)].map((_, i) => <MdOutlineStar key={i} size={20} />)}
                                {[...Array(3)].map((_, i) => <MdOutlineStarBorder key={i} size={20} />)}
                            </span>
                            <div className="space-x-4">
                                <p className="inline-flex items-center gap-x-1 text-md">
                                    <CircleDollarSign size={15} /> <span className="font-bold">{product.discountPrice}</span>
                                </p>
                                <p className="inline-flex items-center gap-x-1 line-through text-md">
                                    <CircleDollarSign size={15} /> <span>{product.price}</span>
                                </p>
                            </div>
                            <div>
                                <ButtonTagsList label="Size" data={["Size S", "Size M", "Size L", "Size XL", "Size XXL"]} />
                                <ButtonTagsList label="Color" data={["White", "Black", "Red", "Yellow"]} />
                            </div>
                            <div>
                                <Counter ref={counterRef} />
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                variant="outline"
                                size="sm"
                                className="w-full md:w-auto uppercase"
                            >
                                <MdAddShoppingCart /> Buy Now
                            </Button>
                        </CardDescription>
                    </CardContent>
                </div>
            </Card>

            {/* Product Info Card */}
            <Card className="border-none">
                <CardHeader>
                    <CardTitle>THÔNG TIN SẢN PHẨM</CardTitle>
                </CardHeader>

                <CardContent >
                    <div><div><p>Tên sản phẩm: [Choice] Bông tẩy trang Lameila XB01 222 miếng cotton pad</p><p>
                    </p><p>1. Tính năng đặc biệt và ưu điểm nổi trội </p><p>
                        </p><p>- Thành phần tự nhiên 100% cotton, chất bông mềm mịn.</p><p>
                        </p><p>- Miếng bông có thiết kế hình vuông, kích thước 6x5cm, cực kỳ vừa vặn khi sử dụng.</p><p>
                        </p><p>- Hai mặt bông được ép chặt, không bị xơ khi tẩy trang tiện dụng với thiết kế 3 lớp 2 mặt đa năng.</p><p>
                        </p><p>- Bông tẩy trang 222 miếng an toàn cho da với thành phần tự nhiên và siêu tiết kiệm.</p><p>
                        </p><p>2. Thành phần của sản phẩm</p><p>
                        </p><p>- Bông Tẩy Trang 222 Miếng Cotton Pads là sản phẩm bông làm từ 100% cotton, không sử dụng chất tẩy trắng.</p><p>
                        </p><p>- Sợi bông mềm mại được tiệt trùng, đảm bảo an toàn và lành tính cho da.</p><p>
                        </p><p>3. Công dụng</p><p>
                        </p><p>- Sử dụng dễ dàng, thoải mái cho da nhờ độ mềm và dai.</p><p>
                        </p><p>- Khả năng thấm hút cực tốt nên sẽ không khiến dung dịch tẩy trang bị lãng phí.</p><p>
                        </p><p>- Không bị vỡ, rách, tung lớp bông ra nên dùng được lâu và không ảnh hưởng tới da mặt.</p><p>
                        </p><p>- Lấy đi từng lớp cặn trang điểm trên bề mặt, bụi bẩn và tế bào chết đang làm tắc nghẽn lỗ chân lông.</p><p>
                        </p><p>4. Phù hợp với ai, với đối tượng nào</p><p>
                        </p><p>- Dùng cho cả nam và nữ.</p><p>
                        </p><p>- Phù hợp với nhiều đối tượng có nhu cầu sử dụng để tẩy trang, làm sạch da.</p><p>
                        </p><p>- Dành cho người thường xuyên trang điểm, chăm sóc da.</p><p>
                        </p><p>- Thích hợp cho nhiều loại da kể cả da nhạy cảm.</p><p>
                        </p><p>- Dùng được cho cả trẻ nhỏ.</p><p>
                        </p><p>5. Hướng dẫn sử dụng</p><p>
                        </p><p>- Khi dưỡng da</p><p>
                        </p><p>  + Tẩm nước hoa hồng cơ bản lên miếng bông tẩy trang rồi sử dụng để massage mặt.</p><p>
                        </p><p>  + Để ngấm nước hoa hồng toàn bộ bông tẩy trang rồi đắp lên mặt 10-15p là bạn có thể thay mặt nạ dưỡng ẩm giúp da mịn màng hơn.</p><p>
                        </p><p>- Khi tẩy trang</p><p>
                        </p><p>  + Dùng dung dịch tẩy trang massage mặt, tiếp theo đó sử dụng bông tẩy trang lau sạch.</p><p>
                        </p><p>  + Thấm dung dịch tẩy trang lên bông, sau đó dùng bông lau những vùng da cần tẩy trang.</p><p>
                        </p><p>6. Quy cách &amp; thông tin, thông số chi tiết:</p><p>
                        </p><p>- Bông Tẩy Trang 222 Miếng Cotton Pads gồm 222 miếng được đóng gói trong bao bì nylon tiện lợi</p><p>
                        </p><p>- Miếng bông có kích thước nhỏ gọn 5x6cm dễ dàng sử dụng.</p><p>
                        </p><p>7. Hướng dẫn bảo quản &amp; thời hạn sử dụng</p><p>
                        </p><p>- Bảo quản nơi khô ráo, tránh ánh nắng mặt trời trực tiếp và nhiệt độ cao.</p><p>
                        </p><p>- Thời hạn sử dụng là 3 năm kể từ ngày sản xuất</p><p>
                        </p><p>✪ Lưu ý khi mua hàng: Khách tham khảo kỹ bảng size, mô tả sản phẩm và ảnh cận chất liệu để lựa chọn sản phẩm phù hợp với mình (tránh trường hợp mua sản phẩm không phù hợp với ý thích). Mọi thắc mắc khác vui lòng liên hệ qua Shopee chat để được trả lời nhanh nhất.</p><p>#shopeechoice #shopeechoicevietnam #choicevietnam</p></div></div>
                </CardContent>
            </Card>

            {/* Related Products Card */}
            <Card className="border-0 md:px-6 px-3">
                <CardHeader className="flex-row items-center px-0 space-x-3 mb-3">
                    <div className="p-0 flex-1">
                        <CardTitle className="mb-3 capitalize">Relate Products</CardTitle>
                        <CardDescription className="md:line-clamp-2 line-clamp-1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id.
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="icon" className="float-end">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="px-0">
                    <CarouselList data={productData} className="lg:basis-1/6 md:basis-1/3 basis-1/2" />
                </CardContent>
            </Card>
        </div>
    );
}
