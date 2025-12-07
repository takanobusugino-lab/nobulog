import Header from "../../../components/Header";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";

// 静的生成用の slug 一覧を Next.js に渡す
export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  return files.map((file) => ({
    slug: file.replace(".md", "")
  }));
}

// slug ごとのページ
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), "posts", `${params.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  let file: string;
  try {
    file = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    return notFound();
  }

  const { data, content } = matter(file);
  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 mb-4">{data.date}</p>
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </>
  );
}
