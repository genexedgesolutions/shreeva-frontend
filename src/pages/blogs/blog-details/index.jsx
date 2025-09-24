import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogDetail2 from "@/components/blogs/BlogDetail2";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import { getBlogBySlug } from "@/api/blogs";

export default function BlogDetailsPage2() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) {
    return <p>Blog Loading...</p>; // Show loading state while fetching data
  }

  const metadata = {
    title: blog.title || "Blog Detail",
    description:
      blog.description || "Modave - Multipurpose Reactjs eCommerce Template",
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <BlogDetail2 blog={blog} />
      <RelatedBlogs />
      <Footer1 />
    </>
  );
}
