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
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-2 text-slate-600">
        Sécurité web, automatisation par l&apos;IA et conformité — des cas pratiques, pas de théorie.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <Card className="h-full">
                <p className="text-xs text-slate-400">{post.date}</p>
                <h2 className="mt-1 text-lg font-semibold text-slate-900">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600">{post.description}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
