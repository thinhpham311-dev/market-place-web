"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks/use-translation";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <div className="container mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
        <div className="flex flex-1 items-center justify-center">
          <section className="w-full max-w-2xl rounded-3xl border bg-card/95 p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
              <SearchX className="h-10 w-10" />
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              404
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
              {t("not_found_title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
              {t("not_found_description")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/">{t("not_found_back_home")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/categories">{t("not_found_browse_categories")}</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
