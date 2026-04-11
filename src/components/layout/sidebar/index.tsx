"use client";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBasket, Store, User, ArrowLeft, Bell } from "lucide-react";
import { IoIosFlash } from "react-icons/io";
import { MdLogout } from "react-icons/md";

import { CgMediaLive } from "react-icons/cg";
import MenuItems from "./MenuItems";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LinkMenuItem, MenuItem } from "@/interfaces/common/menu.interface";
import { useTranslation } from "@/lib/hooks/use-translation";
import { useFetchData } from "@/features/category/list/popular/hooks";
import { useSidebarShops } from "./hooks/useSidebarShops";
import { buildCategoryMenuItems } from "@/features/category/utils/build-category-menu-items";

export default function SidebarNavigation() {
  const { t } = useTranslation();
  const pathname = usePathname() ?? "/";
  const { categories } = useFetchData();
  const { shops } = useSidebarShops();
  const isUserPage = pathname.split("/")[1] === "user";
  const categoryMenuItems: MenuItem[] = useMemo(() => {
    return buildCategoryMenuItems(categories ?? [], t("categories"));
  }, [categories, t]);
  const shopMenuItems: MenuItem[] = useMemo(() => {
    if (!shops?.length) {
      return [
        { type: "link", title: t("sidebar_shop_1"), url: "/shop/shop-s.1" },
        { type: "link", title: t("sidebar_shop_2"), url: "/shop/shop-s.2" },
      ];
    }
    return shops.map(
      (shop): LinkMenuItem => ({
        type: "link",
        title: shop.shop_name || t("sidebar_shops"),
        url: `/shop/${shop.shop_slug}-s.${shop.shop_id}`,
      }),
    );
  }, [shops, t]);

  const items: MenuItem[] = useMemo(
    () => [
      {
        type: "link",
        title: t("sidebar_shop_live"),
        icon: CgMediaLive,
        url: "/#live-shops",
      },
      {
        type: "link",
        title: t("sidebar_flash_sale"),
        icon: IoIosFlash,
        url: "/#flash-sale",
      },
      {
        type: "group",
        title: t("sidebar_categories"),
        icon: ShoppingBasket,
        children: categoryMenuItems,
      },
      {
        type: "group",
        title: t("sidebar_shops"),
        icon: Store,
        children: shopMenuItems,
      },
    ],
    [categoryMenuItems, shopMenuItems, t],
  );
  const profileMenuItems: MenuItem[] = useMemo(
    () => [
      {
        type: "group",
        title: t("header_my_account"),
        icon: User,
        children: [
          { type: "link", title: t("sidebar_profile_info"), url: "/user/account/profile" },
          { type: "link", title: t("change_password"), url: "/user/account/change-password" },
          {
            type: "link",
            title: t("sidebar_privacy_settings"),
            url: "/user/account/privacy-settings",
          },
          { type: "link", title: t("header_my_purchase"), url: "/user/purchase" },
          { type: "link", title: t("header_my_vouchers"), url: "/user/vouchers" },
        ],
      },
      {
        type: "group",
        title: t("sidebar_notifications"),
        icon: Bell,
        children: [
          {
            type: "link",
            title: t("sidebar_order_update"),
            url: "/user/notifications/order-update",
          },
          { type: "link", title: t("sidebar_promotions"), url: "/user/notifications/promotions" },
          {
            type: "link",
            title: t("sidebar_wallet_update"),
            url: "/user/notifications/wallet-update",
          },
          {
            type: "link",
            title: t("sidebar_marketplace_update"),
            url: "/user/notifications/marketplace-update",
          },
        ],
      },
    ],
    [t],
  );
  const menuToRender = isUserPage ? profileMenuItems : items;

  return (
    <Sidebar aria-label={t("sidebar_main_navigation")}>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-xl px-0">
            <Button type="button" className="w-full" variant="outline" asChild>
              <Link href="/">
                <span>
                  <ArrowLeft />
                </span>
                {t("sidebar_back_home")}
              </Link>
            </Button>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-3">
          <SidebarGroupContent className="flex flex-col h-full">
            <SidebarMenu className="flex-1" aria-labelledby="application-group">
              {menuToRender.map((item) => (
                <MenuItems
                  key={
                    item.type === "link" ? item.url : `${item.title}-${item.children?.length ?? 0}`
                  }
                  item={item}
                  pathname={pathname}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {isUserPage  && (
          <SidebarMenuButton className="space-x-1 text-white hover:text-white bg-red-500 hover:bg-red-700">
            <MdLogout className="h-5 w-5" aria-hidden="true" />
            <span>{t("header_sign_out")}</span>
          </SidebarMenuButton>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
