import { remark } from "remark";
import html from "remark-html";
import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import DOMPurify from "isomorphic-dompurify";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getPostBySlug(slug);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  const cleanHtml = DOMPurify.sanitize(contentHtml);

  return (
    <Container size="narrow" className="py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="back-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          textDecoration: "none",
          marginBottom: "2.5rem",
          transition: "color 0.2s",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Retour au blog
      </Link>

      {/* Article header */}
      <header style={{ marginBottom: "3rem" }}>
        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 700,
            color: "var(--cyan)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: "0 0 1rem",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {meta.date}
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.15,
          }}
        >
          {meta.title}
        </h1>
        {meta.description && (
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
            }}
          >
            {meta.description}
          </p>
        )}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, var(--cyan), var(--violet), transparent)",
            marginTop: "2rem",
            opacity: 0.5,
          }}
        />
      </header>

      {/* Article content */}
      <article
        className="prose prose-invert prose-headings:font-semibold prose-a:text-cyan-400 prose-code:text-cyan-300"
        style={{ maxWidth: "none" }}
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </Container>
  );
}
