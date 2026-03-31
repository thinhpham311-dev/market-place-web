"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/hooks";

const Logo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Link
      href="/"
      className="md:flex hidden items-center justify-center space-x-1 cursor-pointer px-3 ml-0"
    >
      <Image
        src="https://res.cloudinary.com/di6zporch/image/upload/t_Banner 16:9/v1730777885/market-place-logo_iz3rdk.svg"
        loading="lazy"
        width={30}
        height={30}
        alt={t("brand_logo_alt")}
      />
      <h3 className="font-bold uppercase lg:flex md:flex hidden">{t("footer_brand_name")}</h3>
    </Link>
  );
};

export default Logo;
