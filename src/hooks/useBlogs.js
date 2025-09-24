import { useEffect, useState } from "react";
import { getAllBlogs } from "@/api/blogs";
import slugify from "slugify";

const generateUniqueSlugs = (blogPosts) => {
  const slugMap = new Map();

  return blogPosts.map((blog, index) => {
    let baseSlug = blog.slug || slugify(blog.title || "untitled-blog", {
      lower: true,
      strict: true,
    });

    let uniqueSlug = baseSlug;
    let count = 1;

    while (slugMap.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    slugMap.set(uniqueSlug, true);

    return {
      id: blog._id,
      imgSrc: blog.image?.[0] || "/images/default.jpg",
      slug: uniqueSlug,
      author: blog.author || "Beaubless",
      alt: blog.alt || "Blog Image",
      date: blog.date || "Unknown Date",
      title: blog.title || "Untitled Blog",
      description: blog.description || "",
      description2: blog.description2 || "",
      description3: blog.description3 || "",
      tags: blog.tags?.length > 0 ? blog.tags : ["Hair", "Skin"],
      delay: `${index * 0.1}s`,
    };
  });
};

export const useBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const blogData = await getAllBlogs();
        const processedBlogs = generateUniqueSlugs(blogData);
        setBlogPosts(processedBlogs);
      } catch (error) {
        console.error("Error fetching blogPosts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return { blogPosts, loading };
};
