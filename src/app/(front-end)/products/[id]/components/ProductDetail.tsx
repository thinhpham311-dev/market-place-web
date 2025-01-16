'use client';

import { useMemo, useRef, useCallback, useState, ReactElement } from 'react';

// Routers
import { useParams, useRouter } from 'next/navigation';

// Store
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addItem } from '@/store/cart/stateSlice';


// Components
import { Button, Avatar, AvatarImage, AvatarFallback, Separator } from '@/components/ui/atoms';
import { Card, CardContent, CardTitle, CardDescription, Counter, CounterRef, CardHeader, StarRating } from '@/components/ui/molecules';
import { OptionsListOfTab } from './OptionsListOfTab';
import ProductReview from './ProductReview'
import ProductImagesListWithThumbnails from "./ProductImagesListWithThumbnails"
import ProductItemsListBundleDeals from "./ProductItemsListBundleDeals"
import ProductItemsListTopPicksFromShop from "./ProductItemsListTopPicksFromShop"
import ShareSocialsList from "./ShareSocialsList"

// Data
import { images, productData } from '@/constants/data';

// Types
import { IOption, IProduct, IReview } from '@/types/product';
import { IcartItem } from "@/types/cart"
import ToastMessage from './ToastMessage';

//format & hooks
import { formatToCurrency } from "@/lib/formats"
import { useToast } from "@/lib/hooks";

// Icons
import { MdAddShoppingCart } from 'react-icons/md';
import { MessageCircleMore, Store } from "lucide-react"

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
    // State to store selected options
    const [selectedOptions, setSelectedOptions] = useState<(IOption | null)[]>([]);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const { toast } = useToast();
    const router = useRouter();
    const reviews = useAppSelector((state) => state.product.state.reviews)
    const totalReviews = reviews?.length;

    const handleChooseOption = (index: number, selectedValue: IOption | null) => {
        if (!product.options) {
            return; // Thoát nếu không có options
        }

        // Cập nhật tùy chọn đã chọn
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = selectedValue;

        // Tạo danh sách lỗi mới chỉ với những tùy chọn chưa được chọn
        const newValidationErrors = product.options
            .map((option, idx) => {
                // Nếu tùy chọn chưa được chọn, thêm lỗi vào danh sách
                if (!newSelectedOptions[idx]) {
                    return option.label;
                }
                return null;
            })
            .filter(Boolean) as string[]; // Loại bỏ giá trị null hoặc undefined

        // Cập nhật lại các trạng thái
        setSelectedOptions(newSelectedOptions);
        setValidationErrors(newValidationErrors);
    };

    const validateOptions = () => {
        const errors: string[] = [];

        // Kiểm tra các tùy chọn chưa được chọn
        product.options?.forEach((option, index) => {
            if (!selectedOptions[index]) {
                errors.push(option.label); // Nếu tùy chọn chưa được chọn, thêm lỗi vào danh sách
            }
        });

        return errors;
    };
    const handleAddToCart = useCallback(() => {
        if (!product) {
            return;
        }

        // Validate options
        const errors = validateOptions();

        if (errors.length > 0) {
            setValidationErrors(errors); // Update error state
            toast({
                title: "Error",
                description: `Please select a value for: ${errors.join(", ")}`,
                variant: "destructive",
            });
            return;
        }

        const updatedQuantity = counterRef.current?.getCount() || 0;

        if (updatedQuantity <= 0) {
            toast({
                title: "Error",
                description: "Please select a valid quantity.",
                variant: "destructive",
            });
            return;
        }
        const uniqueKey = `${product._id}-${selectedOptions?.map(option => option ? `${option.label}-${option.value}` : "").join("|")}`;

        const cartItem: IcartItem = {
            _id: product._id,
            uniqueKey,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            quantity: updatedQuantity,
        };

        dispatch(addItem({ cartItem: cartItem, options: selectedOptions || [] }));

        const totalCurrentPrice = updatedQuantity * product.price;
        toast({
            description: <ToastMessage
                product={product}
                options={selectedOptions || []}
                updatedQuantity={updatedQuantity}
                totalCurrentPrice={totalCurrentPrice} />,
        });

        counterRef.current?.reset();
    }, [dispatch, product, selectedOptions, validateOptions, counterRef]);

    const handleBuyNow = () => {
        // Validate before proceeding
        const errors = validateOptions();

        if (errors.length > 0) {
            setValidationErrors(errors); // Update error state
            toast({
                title: "Error",
                description: `Please select a value for: ${errors.join(", ")}`,
                variant: "destructive",
            });
            return;
        }

        handleAddToCart(); // Add to cart first
        router.push("/cart"); // Then navigate to the cart
    };


    const averageRating = useMemo(() => {
        const totalRating = reviews?.reduce((sum: number, review: IReview) => sum + review.rating, 0);
        return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : '0.0';
    }, [reviews]);

    return (
        <Card layout="horizontal" className=' grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-5  p-5'>
            <div className="space-y-4 lg:col-span-1 md:col-span-2 col-span-1 ">
                <ProductImagesListWithThumbnails data={images} />
                <ShareSocialsList />
            </div>
            <CardContent className='lg:col-span-2 md:col-span-2 col-span-1 md:px-5 px-0'>
                <CardTitle className="line-clamp-2 leading-8 mb-5  ">{product.name}</CardTitle>
                <CardDescription className="space-y-5">
                    <StarRating rating={Number(averageRating)} readOnly />
                    <div className="space-x-4">
                        <p className="inline-flex items-center gap-x-1 text-md">
                            <span className="font-bold">{formatToCurrency(product.discountPrice)}</span>
                        </p>
                        <p className="inline-flex items-center gap-x-1 line-through text-md">
                            <span>{formatToCurrency(product.price)}</span>
                        </p>
                    </div>
                    <div className='space-y-5'>
                        {product?.options?.map((item, index) => {
                            if (Array.isArray(item.value)) {
                                return (
                                    <div key={index}>
                                        <OptionsListOfTab
                                            label={item.label}
                                            data={item.value}
                                            onChange={(selectedValue) => handleChooseOption(index, selectedValue)}
                                        />
                                        {validationErrors.includes(item.label) && (
                                            <p className="text-red-500 text-xs my-2">{`${item.label} is required.`}</p>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })}
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

interface IProductDetailDescriptionProps {
    product?: IProduct | string;
}

function ProductDetailDescription({ product }: IProductDetailDescriptionProps) {
    let content: ReactElement | null = null;

    if (typeof product === 'object' && product?.description) {
        content = (
            <CardDescription
                dangerouslySetInnerHTML={{ __html: product.description }}
            />
        );
    } else if (typeof product === 'string') {
        content = <CardDescription>{product}</CardDescription>;
    } else {
        content = <CardDescription>No product details available</CardDescription>;
    }

    return (
        <Card className="p-5  lg:col-span-3 md:col-span-3 col-span-1 grid grid-cols-3 gap-10 ">
            <CardContent className="p-0 space-y-5 lg:col-span-2 md:col-span-3 col-span-3 lg:order-1 md:order-2 order-2">
                <CardTitle className='bg-sidebar-foreground text-background p-3'>Product Description</CardTitle>
                {content}
            </CardContent>
            <CardContent className="p-0 space-y-5 lg:col-span-1 md:col-span-3 col-span-3 lg:order-2 md:order-1 order-1 relative">
                <div className='sticky top-[60px] left-0 space-y-5'>
                    <CardTitle className='bg-sidebar-foreground text-background p-3'>Product Specifications</CardTitle>
                    <CardDescription className='grid grid-cols-2 px-3'>
                        <strong className='col-span-1'>Category</strong>
                        <span className='col-span-1'>
                            Shopee
                            icon arrow right
                            Men Clothes
                            icon arrow right
                            Socks</span>
                    </CardDescription>
                    <Separator />
                    <CardDescription className='grid grid-cols-2  px-3'>
                        <strong className='col-span-1'>Stock</strong>
                        <span className='col-span-1'>939</span>
                    </CardDescription>
                    <Separator />
                    <CardDescription className='grid grid-cols-2  px-3'>
                        <strong className='col-span-1'>Socks Length</strong>
                        <span className='col-span-1'>Ankle</span>
                    </CardDescription>
                    <Separator />
                    <CardDescription className='grid grid-cols-2  px-3'>
                        <strong className='col-span-1'>Socks Type</strong>
                        <span className='col-span-1'>Sports Socks</span>
                    </CardDescription>
                    <Separator />
                    <CardDescription className='grid grid-cols-2  px-3'>
                        <strong className='col-span-1'>Ships From</strong>
                        <span className='col-span-1'>Overseas</span>
                    </CardDescription>
                </div>

            </CardContent>
        </Card>
    );
}


const StoreInfo = (
    // { name, address, phone, openingHours }: ISroreInfoProps
) => (
    <Card className='grid grid-cols-12 md:p-6 md:gap-10 gap-5 p-3'>
        <CardHeader className='flex flex-row flex-wrap md:col-span-4 col-span-12 gap-x-5 p-0'>
            <div className='col-span-1 my-3'>
                <Avatar>
                    <AvatarImage src="https://res.cloudinary.com/dgincjt1i/image/upload/v1735697706/images_zxsvly.png" />
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
                <Button className='col-span-1' variant="outline" ><MessageCircleMore /><span>Chat Now</span></Button>
                <Button className='col-span-1' variant="outline"><Store /><span>View Shop</span></Button>
            </CardContent>
        </CardHeader>
        <CardContent className=' md:col-span-8 col-span-12 grid md:gap-10 gap-3 md:grid-cols-3 grid-cols-2 items-center md:p-3 p-0'>
            <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>ratings:</strong> 1,5k</CardDescription>
            <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>response rate:</strong> 92%</CardDescription>
            <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>joined:</strong> 6 years ago</CardDescription>
            <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>products:</strong> 55</CardDescription>
            <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>response time:</strong> within hours</CardDescription>
            <CardDescription className='md:col-span-1 col-span-2 flex flex-row flex-wrap justify-between capitalize'><strong>follower:</strong> 4,8k</CardDescription>
        </CardContent>
        <CardContent className='col-span-12 p-0'>
            <ProductItemsListTopPicksFromShop />
        </CardContent>
    </Card>
);


export default function ProductDetail() {
    const { id } = useParams();

    const { product } = useMemo(() => {
        const product: IProduct | undefined = productData?.find((item) => item?._id === id);
        return { product };
    }, [id]);


    if (!product) return <div>Product not found</div>

    return (
        <Card className=" border-none shadow-none md:px-6 px-3 space-y-5 my-6">
            <ProductDetailInfo product={product} />
            <ProductItemsListBundleDeals />
            <StoreInfo />
            <ProductDetailDescription product={product} />
            <ProductReview initialReviews={initialReviews} />
        </Card>
    );
}
