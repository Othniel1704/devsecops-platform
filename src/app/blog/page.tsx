import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles pratiques sur la sécurité web, l'automatisation par l'IA et la conformité RGPD/OWASP.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <Container className="py-16">
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            marginBottom: "0.75rem",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.375rem", flexShrink: 0 }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          Articles
        </span>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "0 0 0.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Blog
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", margin: 0, maxWidth: "520px" }}>
          Sécurité web, automatisation par l&apos;IA et conformité — des cas pratiques, pas de théorie.
        </p>
      </div>

      {/* Posts grid */}
      <ul
        style={{
          display: "grid",
          gap: "1.25rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          padding: 0,
          margin: 0,
          listStyle: "none",
        }}
      >
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
              <Card className="h-full" style={{ height: "100%" }}>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "var(--cyan)",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    margin: "0 0 0.75rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {post.date}
                </p>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: "0 0 0.625rem",
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </h2>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: "0 0 1.25rem" }}>
                  {post.description}
                </p>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--violet)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Lire l&apos;article →
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
