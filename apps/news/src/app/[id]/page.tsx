import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsDetail from "@/components/NewsDetail";
import { TN_NEWS } from "@/data/news";

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
  const allIds = [
    ...TN_NEWS.hot.map((n) => n.id),
    ...TN_NEWS.hidden.map((n) => n.id),
  ];
  return allIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = findItem(id);
  if (!item) return { title: "Story not found" };
  return {
    title: item.headline,
    description: item.summary,
    openGraph: {
      title: item.headline,
      description: item.summary,
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = findItem(id);
  if (!item) notFound();

  return (
    <>
      <Header />
      <NewsDetail id={id} />
      <Footer />
    </>
  );
}
