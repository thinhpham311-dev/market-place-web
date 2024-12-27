'use client';

import { useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
// Routers
import { useParams, useRouter } from 'next/navigation';

// Store
import { useAppDispatch } from '@/lib/hooks';
import { addItem } from '@/store/cart/stateSlice';


// Components
import { Button } from '@/components/ui/atoms';
import { Card, CardContent, CardTitle, CardDescription, Counter, CounterRef, CardHeader } from '@/components/ui/molecules';
import { OptionsListOfTab } from './OptionsListOfTab';
import ProductReview from './ProductReview'
import ProductImagesListWithThumbnails from "./ProductImagesListWithThumbnails"

// Data
import { images, productData } from '@/constants/data';

// Types
import { IProduct } from '@/types/product';
import { IcartItem } from "@/types/cart"

//format & hooks
import { formatToCurrency } from "@/lib/formats"
import { useToast } from "@/lib/hooks";

// Icons
import { MdOutlineStar, MdOutlineStarBorder, MdAddShoppingCart } from 'react-icons/md';

// interface ISroreInfoProps {
//     name: string,
//     address: string,
//     phone: string,
//     openingHours: string
// }

interface IProductDetailProps {
    product: IProduct
}

const initialReviews = [
    {
        rating: 5,
        comment: 'Excellent product! Highly recommend it.',
        user: 'John Doe',
    },
    {
        rating: 4,
        comment: 'Good quality but a bit expensive.',
        user: 'Jane Smith',
    },
];

function ProductDetailInfo({ product }: IProductDetailProps) {
    const dispatch = useAppDispatch();
    const counterRef = useRef<CounterRef>(null);
    const { toast } = useToast();
    const router = useRouter();
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

        dispatch(addItem(cartItem));
        toast({
            title: `${product.name} added to cart`,
            description: <div className="grid grid-cols-3 gap-4 py-5">
                <Image className="col-span-1" src={product.image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={product?.name ?? ""} width={100} height={100} />
                <div className=' col-span-2 space-y-1'>
                    <p className='text-md mb-3'><strong> {product.name}</strong></p>
                    <p className='space-x-2 text-xs'>
                        <span className='line-through'>
                            ${product.price}
                        </span>
                        <span>${product.discountPrice}</span>
                    </p>
                    <p className='text-xs'>Qty:{updatedQuantity}</p>
                </div>
            </div>,
        });
        counterRef.current?.reset();
    }, [dispatch, product]);

    const handleBuyNow = () => {
        handleAddToCart()
        router.push("/cart");
    };

    return (
        <Card layout="horizontal" className=' grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5  p-5'>
            <div className="space-y-4 lg:col-span-1 md:col-span-2 col-span-1 ">
                <ProductImagesListWithThumbnails data={images} />
            </div>
            <CardContent className='lg:col-span-2 md:col-span-2 col-span-1 md:px-5 px-0'>
                <CardTitle className="line-clamp-2 leading-8 mb-5  ">{product.name}</CardTitle>
                <CardDescription className="space-y-5">
                    <span className="flex items-center space-x-1">
                        {[...Array(2)].map((_, i) => <MdOutlineStar key={i} size={20} />)}
                        {[...Array(3)].map((_, i) => <MdOutlineStarBorder key={i} size={20} />)}
                    </span>
                    <div className="space-x-4">
                        <p className="inline-flex items-center gap-x-1 text-md">
                            <span className="font-bold">{formatToCurrency(product.discountPrice)}</span>
                        </p>
                        <p className="inline-flex items-center gap-x-1 line-through text-md">
                            <span>{formatToCurrency(product.price)}</span>
                        </p>
                    </div>
                    <div className='space-y-5'>
                        <OptionsListOfTab label="Size" data={[
                            { label: "Size S", value: "size-s" },
                            { label: "Size M", value: "size-m" },
                            { label: "Size L", value: "size-l" },
                            { label: "Size XL", value: "size-xl" },
                            { label: "Size XXL", value: "size-xxl" }]} />
                        <OptionsListOfTab label="Color" data={[
                            { label: "White", value: "white" },
                            { label: "Black", value: "black" },
                            { label: "Red", value: "red" },
                            { label: "Yellow", value: "Yellow" }]} />

                    </div>
                    <div>
                        <Counter ref={counterRef} />
                    </div>
                    <div className='space-x-3 flex items-center'>
                        <Button
                            onClick={handleAddToCart}
                            variant="outline"
                            size="sm"
                            className="w-full md:w-auto uppercase"
                        >
                            <MdAddShoppingCart /> Add to cart
                        </Button>
                        <Button
                            onClick={handleBuyNow}
                            size="sm"
                            className="w-full md:w-auto uppercase"
                        >
                            Buy Now
                        </Button>
                    </div>
                </CardDescription>
            </CardContent>
        </Card>
    );
}


function ProductDetailDescription() {
    return (
        <Card className='p-5 space-y-3 lg:col-span-3 md:col-span-3 col-span-1'>
            <CardContent className="p-0 space-y-5">
                <CardTitle>THÔNG TIN SẢN PHẨM</CardTitle>
                <CardDescription >
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
                </CardDescription>
            </CardContent>
        </Card>
    );
}

const StoreInfo = (
    // { name, address, phone, openingHours }: ISroreInfoProps
) => (
    <Card>
        <CardHeader>
            <CardTitle>
                Store Information
            </CardTitle>
            <CardDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam iaculis aliquet quam id imperdiet. Cras vulputate neque ut erat molestie malesuada. Suspendisse sit amet vehicula ante. Proin convallis faucibus rhoncus. Duis mollis finibus quam vel pulvinar. Morbi nisl lacus, lobortis eget massa sit amet, egestas fermentum ex. Phasellus nec tellus sapien. Nulla efficitur felis sit amet bibendum euismod. Praesent scelerisque, risus eget semper sagittis, massa urna pellentesque leo, eget aliquam est diam et est.
            </CardDescription>
        </CardHeader>
        {/* <p><strong>Name:</strong> {name}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Phone:</strong> <a href={`tel:${phone}`}>{phone}</a></p>
        <p><strong>Opening Hours:</strong> {openingHours}</p> */}
    </Card>
);


export default function ProductDetail() {
    const { id } = useParams();

    const { product } = useMemo(() => {
        const product = productData?.find((item: IProduct) => item?.id === id);
        return { product };
    }, [id]);

    const handleReviewSubmission = (review: { rating: number; comment: string }) => {
        console.log('New review submitted:', review);
        // Logic to save the review, e.g., an API call
    };

    if (!product) return <div>Product not found</div>

    return (
        <Card className=" border-none shadow-none md:px-6 px-3 space-y-5 my-6">

            <ProductDetailInfo product={product} />
            <StoreInfo />
            <ProductDetailDescription />
            <ProductReview initialReviews={initialReviews} onSubmitReview={handleReviewSubmission} />
        </Card>
    );
}
