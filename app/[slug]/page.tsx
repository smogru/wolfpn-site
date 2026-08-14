import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "../../lib/site";
import { getSeoPage, seoPages } from "../../lib/seo-pages";
import SeoExperiencePage from "./trial-period-page";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};

  const canonical = `${SITE_URL}/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.description,
    alternates: { canonical },
    robots: page.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: "WolfPN",
      url: canonical,
      title: page.metaTitle,
      description: page.description,
      images: [{ url: `${SITE_URL}/media/wolf-brand.webp`, width: 640, height: 640, alt: "WolfPN" }],
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.description,
      images: [`${SITE_URL}/media/wolf-brand.webp`],
    },
  };
}

export default async function SeoLanding({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();

  const related = page.related.map(getSeoPage).filter(Boolean);
  const faqSchema = page.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.metaTitle,
    description: page.description,
    url: `${SITE_URL}/${page.slug}`,
    inLanguage: "ru-RU",
    isPartOf: { "@type": "WebSite", name: "WolfPN", url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <SeoExperiencePage
        page={page}
        related={related.flatMap((item) => item ? [{ slug: item.slug, title: item.title, eyebrow: item.eyebrow }] : [])}
      />
    </>
  );
}
