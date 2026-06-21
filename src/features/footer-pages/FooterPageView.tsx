import Link from "next/link";
import type { FooterPage } from "./content";

type FooterPageViewProps = {
  page: FooterPage;
};

export default function FooterPageView({ page }: FooterPageViewProps) {
  return (
    <main className="bg-muted/30">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-4xl rounded-lg border bg-background p-5 shadow-sm md:p-8">
          <div className="border-b pb-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Mini Market
            </Link>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              {page.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
              {page.description}
            </p>
            {page.updatedAt ? (
              <p className="mt-3 text-xs font-medium text-muted-foreground">{page.updatedAt}</p>
            ) : null}
          </div>

          <div className="space-y-8 pt-6">
            {page.sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <ul className="space-y-3 text-sm leading-6 text-muted-foreground md:text-base">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
