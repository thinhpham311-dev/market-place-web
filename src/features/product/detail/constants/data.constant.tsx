import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa"
import { SiZalo } from "react-icons/si";
import Breadcrumb from "@/features/common/breadcrumb";
import { Product } from "../../types";

export const images = [
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
    "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png",
];

export const socials = [
    {
        label: "facebook",
        icon: <FaFacebook />,
        link: "https://www.facebook.com/"
    },
    {
        label: "zalo",
        icon: <SiZalo />,
        link: "https://www.facebook.com/"
    },
    {
        label: "tiktok",
        icon: <FaTiktok />,
        link: "https://www.facebook.com/"
    },
    {
        label: "instargram",
        icon: <FaInstagram />,
        link: "https://www.facebook.com/"
    },
]

export const breadcrumbs = (product: Product) => {
    const categoryItems = product.product_category || [];

    const breadcrumbItems = [
        {
            category_id: "home",
            category_slug: "",
            category_name: "Home",
            ancestors: [],
        },
        ...categoryItems,
        {
            category_id: "product",
            category_slug: "",
            category_name: product.product_name,
            ancestors: [],
        },
    ];

    return [
        {
            label: "",
            value: (
                <Breadcrumb
                    items={breadcrumbItems}
                    isDisableLast
                    getHref={(item) => {
                        if (item.category_id === "home") return "/";

                        const ancestors = Array.isArray(item.ancestors)
                            ? item.ancestors.filter(Boolean)
                            : [];
                        const allIds = [...ancestors, item.category_id];
                        return `/categories/${item.category_slug}-cat.${allIds.join(".")}`;
                    }}
                    getLabel={(item) => item.category_name}
                />
            ),
        },
    ];
};



export const specs = (product: Product) => [
    {
        label: "Product Name:",
        value: (
            <Breadcrumb
                items={[product]}
                isDisableLast
                getHref={(item) => `/${item.product_slug}.${item.product_id}`}
                getLabel={(item) => item.product_name}
            />
        ),
    },
    {
        label: "Categories:",
        value: product.product_category ? (
            <Breadcrumb
                items={product.product_category}
                getHref={(item) => {
                    const ancestors = Array.isArray(item.ancestors)
                        ? item.ancestors.filter(Boolean)
                        : [];
                    const allIds = [...ancestors, item.category_id];
                    return `/categories/${item.category_slug}-cat.${allIds.join(".")}`;
                }}
                getLabel={(item) => item.category_name}
            />
        ) : (
            "-"
        ),
    },
    {
        label: "Shop Name:",
        value: product.product_shop ? (
            <Breadcrumb
                items={[product.product_shop]}
                getHref={(item) => `/shop/${item._id}`}
                getLabel={(item) => item.name}
            />
        ) : (
            "-"
        ),
    },
    {
        label: "Brand:",
        value: product.product_brand ? (
            <Breadcrumb
                items={[product.product_brand]}
                getHref={(item) => `/brand/${item.brand_slug}`}
                getLabel={(item) => item.brand_name}
            />
        ) : (
            "-"
        ),
    },
];
