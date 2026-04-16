import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import Breadcrumb from "@/features/common/breadcrumb";
import { ISpuModel } from "@/models/spu";
import type { TranslationKey } from "@/lib/i18n/translations";

export const PRO_DETAIL = "PRO_DETAIL";

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
    link: "https://www.facebook.com/",
  },
  {
    label: "zalo",
    icon: <SiZalo />,
    link: "https://www.facebook.com/",
  },
  {
    label: "tiktok",
    icon: <FaTiktok />,
    link: "https://www.facebook.com/",
  },
  {
    label: "instargram",
    icon: <FaInstagram />,
    link: "https://www.facebook.com/",
  },
];

export const breadcrumbs = (product?: ISpuModel, homeLabel = "Home") => {
  const breadcrumbItems = [
    {
      category_id: "home",
      category_slug: "",
      category_name: homeLabel,
      ancestors: [],
    },
    ...(product?.product_category ?? []),
    ...(product
      ? [
          {
            category_id: "product",
            category_slug: "",
            category_name: product.product_name,
            ancestors: [],
          },
        ]
      : []),
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
            const ancestors = Array.isArray(item.ancestors) ? item.ancestors.filter(Boolean) : [];
            return `/categories/${item.category_slug}-cat.${[...ancestors, item.category_id].join(".")}`;
          }}
          getLabel={(item) => item.category_name}
        />
      ),
    },
  ];
};

export const specs = (product?: ISpuModel) => [
  {
    labelKey: "product_spec_name" as TranslationKey,
    value: (
      <Breadcrumb
        items={[product]}
        isDisableLast
        getHref={(item) => `/${item.product_slug}.${item.product_id}`}
        getLabel={(item) => item?.product_name}
      />
    ),
  },
  {
    labelKey: "product_spec_categories" as TranslationKey,
    value: product?.product_category ? (
      <Breadcrumb
        items={product.product_category}
        getHref={(item) => {
          const ancestors = Array.isArray(item.ancestors) ? item.ancestors.filter(Boolean) : [];
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
    labelKey: "product_spec_shop_name" as TranslationKey,
    value: product?.product_shop ? (
      <Breadcrumb
        items={[product.product_shop]}
        getHref={(item) => `/shop/${item.shop_slug}-s.${item.shop_id}`}
        getLabel={(item) => item.shop_name}
      />
    ) : (
      "-"
    ),
  },
  {
    labelKey: "product_spec_brand" as TranslationKey,
    value: product?.product_brand ? (
      <Breadcrumb
        items={[product.product_brand]}
        getHref={(item) => `/brands/${item.brand_slug}-b.${item.brand_id}`}
        getLabel={(item) => item.brand_name}
      />
    ) : (
      "-"
    ),
  },
];
