"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PlayCircle, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/lib/hooks";

const liveSessions = [
  {
    id: "fashion",
    image: "/O1CN01gRUkNN1sW5HWJb8Me_!!6000000005773-2-tps-200-200.avif",
    href: "/daily-discover",
    titleKey: "shop_live_card_fashion",
    descriptionKey: "shop_live_card_fashion_desc",
    viewers: "12.4k",
    duration: "48 min",
  },
  {
    id: "beauty",
    image: "/O1CN01Si2Chv1URSNSZI3w2_!!6000000002514-2-tps-200-200.avif",
    href: "/flash-sale",
    titleKey: "shop_live_card_beauty",
    descriptionKey: "shop_live_card_beauty_desc",
    viewers: "8.9k",
    duration: "36 min",
  },
  {
    id: "home",
    image: "/O1CN01kxhWs527Gi6Fzc3zF_!!6000000007770-2-tps-200-200.avif",
    href: "/categories",
    titleKey: "shop_live_card_home",
    descriptionKey: "shop_live_card_home_desc",
    viewers: "6.2k",
    duration: "52 min",
  },
  {
    id: "tech",
    image: "/O1CN01WD8L611FtC7zB5hSv_!!6000000000544-2-tps-200-200.avif",
    href: "/daily-discover?tab=trending",
    titleKey: "shop_live_card_tech",
    descriptionKey: "shop_live_card_tech_desc",
    viewers: "10.1k",
    duration: "41 min",
  },
  {
    id: "essentials",
    image: "/O1CN01Sksz1Z1YcgYJqip4w_!!6000000003080-2-tps-200-200.avif",
    href: "/daily-discover?tab=best-value",
    titleKey: "shop_live_card_essentials",
    descriptionKey: "shop_live_card_essentials_desc",
    viewers: "7.4k",
    duration: "29 min",
  },
] as const;

export default function ShopLiveSection() {
  const { t } = useTranslation();
  const [activeSessionId, setActiveSessionId] = useState<
    (typeof liveSessions)[number]["id"] | null
  >(null);
  const activeSession = liveSessions.find((session) => session.id === activeSessionId) ?? null;

  const liveComments = activeSession
    ? [
        { id: 1, user: "Linh", message: t("shop_live_chat_comment_1") },
        { id: 2, user: "Minh", message: t("shop_live_chat_comment_2") },
        {
          id: 3,
          user: "Hana",
          message: `${t("shop_live_chat_comment_3")} ${t(activeSession.titleKey)}`,
        },
      ]
    : [];

  return (
    <div id="live-shops">
      <section className="md:px-6 px-3">
        <div className="overflow-hidden rounded-[28px] border border-orange-200 bg-gradient-to-b from-orange-50 via-orange-50 to-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-orange-100 bg-gradient-to-r from-[#ee4d2d] to-[#ff7337] px-4 py-4 text-white md:flex-row md:items-center md:justify-between md:px-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                  {t("shop_live_now")}
                </span>
              </div>
              <h2 className="text-2xl font-semibold md:text-3xl">{t("sidebar_shop_live")}</h2>
              <p className="max-w-2xl text-sm text-white/90 md:text-base">{t("shop_live_desc")}</p>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="rounded-full border-0 bg-white text-[#ee4d2d] hover:bg-white/90"
              onClick={() => setActiveSessionId(liveSessions[0]?.id ?? null)}
            >
              <PlayCircle className="h-4 w-4" />
              {t("shop_live_watch_now")}
            </Button>
          </div>

          <div className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-5 md:p-6">
            {liveSessions.map((session) => (
              <article
                key={session.id}
                className="group overflow-hidden rounded-3xl border border-orange-100 bg-white transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <Link href={session.href} className="block">
                  <div className="relative aspect-[16/11] overflow-hidden bg-orange-100">
                    <Image
                      src={session.image}
                      alt={t(session.titleKey)}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                      <Badge className="gap-2 bg-[#ee4d2d] text-white hover:bg-[#ee4d2d]">
                        <span className="h-2 w-2 rounded-full bg-white" />
                        {t("shop_live_now")}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/95 text-stone-900">
                        {session.duration}
                      </Badge>
                    </div>
                  </div>
                </Link>

                <div className="space-y-4 p-4">
                  <div className="space-y-2">
                    <h3 className="line-clamp-1 text-lg font-semibold text-stone-900">
                      {t(session.titleKey)}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-6 text-stone-600">
                      {t(session.descriptionKey)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl bg-orange-50 px-3 py-2 text-sm">
                    <span className="inline-flex items-center gap-2 text-stone-700">
                      <Users className="h-4 w-4 text-[#ee4d2d]" />
                      {session.viewers} {t("shop_live_viewers")}
                    </span>
                    <span className="font-medium text-[#ee4d2d]">{t("shop_live_join_now")}</span>
                  </div>

                  <Button
                    type="button"
                    className="w-full rounded-full bg-[#ee4d2d] text-white hover:bg-[#d94426]"
                    onClick={() => setActiveSessionId(session.id)}
                  >
                    <PlayCircle className="h-4 w-4" />
                    {t("shop_live_watch_now")}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Dialog
        open={Boolean(activeSession)}
        onOpenChange={(open) => !open && setActiveSessionId(null)}
      >
        <DialogContent className="inset-0 left-0 top-0 h-screen max-h-screen w-screen max-w-none translate-x-0 translate-y-0 rounded-none border-none bg-white p-0 shadow-none">
          {activeSession ? (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>{t("shop_live_popup_title")}</DialogTitle>
                <DialogDescription>{t("shop_live_popup_desc")}</DialogDescription>
              </DialogHeader>

              <div className="grid h-full overflow-hidden lg:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.75fr)]">
                <div className="overflow-auto bg-stone-950 p-4 md:p-6">
                  <div className="relative overflow-hidden rounded-3xl">
                    <div className="relative aspect-video">
                      <Image
                        src={activeSession.image}
                        alt={t(activeSession.titleKey)}
                        fill
                        sizes="(min-width: 1024px) 66vw, 100vw"
                        className="object-cover opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <Badge className="gap-2 bg-[#ee4d2d] text-white hover:bg-[#ee4d2d]">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                          </span>
                          {t("shop_live_now")}
                        </Badge>
                        <Badge variant="secondary" className="bg-white text-stone-900">
                          {activeSession.viewers} {t("shop_live_viewers")}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                          <PlayCircle className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white md:p-6">
                        <h3 className="text-2xl font-semibold">{t(activeSession.titleKey)}</h3>
                        <p className="mt-2 max-w-2xl text-sm text-white/85">
                          {t(activeSession.descriptionKey)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-white/10 p-4 text-white">
                      <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                        {t("shop_live_hosted_by")}
                      </div>
                      <div className="mt-2 font-semibold">Market Live Studio</div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 text-white">
                      <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                        {t("shop_live_featured_product")}
                      </div>
                      <div className="mt-2 font-semibold">{t(activeSession.titleKey)}</div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4 text-white">
                      <div className="text-xs uppercase tracking-[0.2em] text-white/60">
                        {t("shop_live_duration")}
                      </div>
                      <div className="mt-2 font-semibold">{activeSession.duration}</div>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-0 flex-col bg-orange-50">
                  <div className="border-b border-orange-100 p-5">
                    <h4 className="text-lg font-semibold text-stone-900">
                      {t("shop_live_live_chat")}
                    </h4>
                    <p className="mt-1 text-sm text-stone-600">{t("shop_live_chat_tip")}</p>
                  </div>

                  <div className="flex-1 space-y-3 overflow-auto p-5">
                    {liveComments.map((comment) => (
                      <div key={comment.id} className="rounded-2xl bg-white p-4 shadow-sm">
                        <div className="text-sm font-semibold text-stone-900">{comment.user}</div>
                        <div className="mt-1 text-sm leading-6 text-stone-600">
                          {comment.message}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-orange-100 p-5">
                    <Button
                      asChild
                      className="w-full rounded-full bg-[#ee4d2d] text-white hover:bg-[#d94426]"
                    >
                      <Link href={activeSession.href}>{t("shop_live_view_products")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
