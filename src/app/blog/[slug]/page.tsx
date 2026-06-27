import { remark } from "remark";
import html from "remark-html";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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

  return (
    <article className="prose prose-neutral max-w-none">
      <h1>{meta.title}</h1>
      <p className="text-sm text-gray-500">{meta.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
