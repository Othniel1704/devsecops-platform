import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div>
      <h1 className="text-2xl font-bold">Blog</h1>
      <ul className="mt-6 space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-lg font-medium hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="mt-1 text-gray-600">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
