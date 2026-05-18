import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsDetail from "@/components/NewsDetail";
import { TN_NEWS, type NewsItem } from "@/data/news";

interface Props {
  params: Promise<{ id: string }>;
}

function findItem(id: string) {
  return (
    TN_NEWS.hot.find((n) => n.id === id) ||
    TN_NEWS.hidden.find((n) => n.id === id)
  );
}

export async function generateStaticParams() {
  return [
    ...TN_NEWS.hot.map((n) => ({ id: n.id })),
    ...TN_NEWS.hidden.map((n) => ({ id: n.id })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = findItem(id);
  if (!item) return { title: "Story not found" };

  return {
    title: item.headline,
    description: item.summary,
    keywords: [
      item.tag.toLowerCase(),
      item.district,
      "TN news",
      "Tamil Nadu news",
      "TN blog",
      item.source,
    ],
    alternates: { canonical: `https://news.tn-info.in/${id}` },
    openGraph: {
      title: `${item.headline} | TN News`,
      description: item.summary,
      type: "article",
      url: `https://news.tn-info.in/${id}`,
      siteName: "TN-Info.in",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: item.headline }],
      publishedTime: item.isoDate,
      tags: [item.tag, item.district, "Tamil Nadu"],
    },
    twitter: {
      card: "summary_large_image",
      title: item.headline,
      description: item.summary,
    },
  };
}

function NewsJsonLd({ item, id }: { item: NewsItem; id: string }) {
  const isHidden = TN_NEWS.hidden.some((n) => n.id === id);
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.headline,
    description: item.summary,
    datePublished: item.isoDate,
    dateModified: item.isoDate,
    author: { "@type": "Organization", name: item.source },
    publisher: {
      "@type": "Organization",
      name: "TN-Info.in",
      url: "https://tn-info.in",
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://news.tn-info.in/${id}` },
    articleSection: item.tag,
    keywords: [item.tag, item.district, "Tamil Nadu", "TN news"].join(", "),
    inLanguage: "en-IN",
    ...(isHidden && {
      additionalProperty: {
        "@type": "PropertyValue",
        name: "whyHidden",
        value: item.whyHidden,
      },
    }),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "TN Info", item: "https://tn-info.in" },
        { "@type": "ListItem", position: 2, name: "TN News", item: "https://news.tn-info.in" },
        { "@type": "ListItem", position: 3, name: item.headline, item: `https://news.tn-info.in/${id}` },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = findItem(id);
  if (!item) notFound();

  return (
    <>
      <NewsJsonLd item={item} id={id} />
      <Header />
      <NewsDetail id={id} />
      <Footer />
    </>
  );
}
