import Header from "../../components/Header";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Blog() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith(".md")); // ディレクトリなどを除外

  const posts = files.map((file) => {
    const md = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(md);
    const slug = file.replace(".md", "");

    return { ...data, slug };
  });

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold mb-6">Blog</h1>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            {/* basePath 環境で相対リンクにする */}
            <a href={`./${post.slug}`} className="underline">
              {post.title}{" "}
              <span className="text-gray-500 text-sm">{post.date}</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
