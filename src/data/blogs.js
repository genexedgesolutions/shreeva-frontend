import { getAllBlogs } from "@/api/blogs";
import slugify from "slugify"; // Ensure slugify is installed

const blogs = await getAllBlogs(); // Fetch blogs dynamically

// Function to generate unique slugs
const generateUniqueSlugs = (blogs) => {
  const slugMap = new Map(); // Store slugs to track duplicates

  return blogs.map((blog, index) => {
    let baseSlug = blog.slug || slugify(blog.title || "untitled-blog", { lower: true, strict: true });
    let uniqueSlug = baseSlug;
    let count = 1;

    // Ensure uniqueness by appending -1, -2, etc., if slug already exists
    while (slugMap.has(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    slugMap.set(uniqueSlug, true); // Mark slug as used

    return {
      id: blog._id, // Use MongoDB's ID
      imgSrc: blog.image?.[0] || "/images/default.jpg", // Fallback image
      slug: uniqueSlug, // Unique slug
      author:blog.author || "Beaubless",
      alt: blog.alt || "Blog Image",
      date: blog.date || "Unknown Date",
      title: blog.title || "Untitled Blog",
      description: blog.description || "",
      description2: blog.description2 || "",
      description3: blog.description3 || "",
      tags: blog.tags?.length > 0 ? blog.tags : ["Hair", "Skin"], 
      delay: `${index * 0.1}s`, // Dynamic delay
    };
  });
};

// export const blogPosts = generateUniqueSlugs(blogs);


export const blogPosts2 = [
  {
    id: 4,
    imgSrc: "/images/blog/women-3.jpg",
    imgAlt: "img",
    wowDelay: "0s",
    date: "13 August",
    title: "Top 10 Summer Fashion Trends You Can't Miss in 2024",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
  },
  {
    id: 5,
    imgSrc: "/images/blog/women-4.jpg",
    imgAlt: "img",
    wowDelay: "0.1s",
    date: "13 August",
    title: "How to Effortlessly Style Your Office Wear for a Modern Look",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
  },
];

export const blogPosts3 = [
  {
    id: 6,
    title: "5 ways to enhance your business website in 2024",
    date: "February 28, 2024",
    author: "Avitex",
    imgSrc: "/images/blog/women-5.jpg",
    delay: "0s",
  },
  {
    id: 7,
    title: "5 ways to enhance your business website in 2024",
    date: "February 28, 2024",
    author: "Avitex",
    imgSrc: "/images/blog/sidebar-3.jpg",
    delay: "0.1s",
  },
  {
    id: 8,
    title: "5 ways to enhance your business website in 2024",
    date: "February 28, 2024",
    author: "Avitex",
    imgSrc: "/images/blog/sidebar-4.jpg",
    delay: "0.2s",
  },
];

export const blogItems = [
  {
    id: 9,
    imgSrc: "/images/blog/new-beauty1.jpg",
    date: "13 August",
    title: "Must-Have Beauty Products for Glowing Skin",
    delay: "0s",
  },
  {
    id: 10,
    imgSrc: "/images/blog/new-beauty2.jpg",
    date: "13 August",
    title: "Top 5 Makeup Essentials for a Flawless Look",
    delay: "0.1s",
  },
  {
    id: 11,
    imgSrc: "/images/blog/new-beauty3.jpg",
    date: "13 August",
    title: "Trending Beauty Products You Need to Try Right Now",
    delay: "0.2s",
  },
  {
    id: 12,
    imgSrc: "/images/blog/new-beauty4.jpg",
    date: "13 August",
    title: "A Beginner's Guide to Building Your Own Beauty Kit",
    delay: "0.3s",
  },
];

export const blogPosts4 = [
  {
    id: 13,
    imgSrc: "/images/blog/blog-grid-10.jpg",
    alt: "",
    date: "13 August",
    title: "Top 10 Summer Fashion Trends You Can't Miss in 2024",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
    delay: "0s",
  },
  {
    id: 14,
    imgSrc: "/images/blog/blog-grid-11.jpg",
    alt: "",
    date: "13 August",
    title: "How to Effortlessly Style Your Office Wear for a Modern Look",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
    delay: "0.1s",
  },
  {
    id: 15,
    imgSrc: "/images/blog/blog-grid-12.jpg",
    alt: "",
    date: "13 August",
    title: "Sustainable Fashion: Eco-Friendly Brands to Watch This Year",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
    delay: "0.2s",
  },
];

export const newsItems = [
  {
    id: 16,
    wowDelay: "0s",
    imgSrc: "/images/section/news-1.jpg",
    date: "13 August",
    title: "Choosing the Perfect Tent for Your Adventure",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
  },
  {
    id: 17,
    wowDelay: "0.1s",
    imgSrc: "/images/section/news-2.jpg",
    date: "13 August",
    title: "Choosing the Perfect Tent for Your Adventure",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
  },
];

export const blogPosts5 = [
  {
    id: 18,
    date: "13 August",
    imgSrc: "/images/blog/blog-grid-10.jpg",
    title: "Top 10 Summer Fashion Trends You Can't Miss in 2024",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
    delay: "0s",
  },
  {
    id: 19,
    date: "13 August",
    imgSrc: "/images/blog/blog-grid-11.jpg",
    title: "How to Effortlessly Style Your Office Wear for a Modern Look",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
    delay: "0.1s",
  },
  {
    id: 20,
    date: "13 August",
    imgSrc: "/images/blog/blog-grid-12.jpg",
    title: "Sustainable Fashion: Eco-Friendly Brands to Watch This Year",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
    delay: "0.2s",
  },
];

export const blogPosts6 = [
  {
    id: 21,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "How to Choose the Right Skincare Products for Your Skin Type",
    description:
      "A practical guide to help customers identify their skin type and select products that truly work for them — with tips on patch testing and ingredient awareness.",
  },
  {
    id: 22,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "Breaking Down the Skincare Routine: What Goes First and Why?",
    description:
      "Simplify skincare by explaining the correct order of applying products like cleansers, serums, moisturizers, and sunscreen — perfect for beginners.",
  },
  {
    id: 23,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "Why Clean Beauty Matters: The Truth Behind Harmful Chemicals",
    description:
      "An eye-opening blog about the effects of parabens, sulfates, and artificial fragrances on skin health, with a spotlight on your clean beauty promise.",
  },
  {
    id: 24,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "Real Customers, Real Results: Skincare Journeys with Beaubless",
    description:
      "Showcase before-and-after stories from customers who transformed their skin using your products — building trust through genuine experiences.",
  },
  {
    id: 25,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "Fashion Forward Embracing Diversity and Inclusion in Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed vulputate massa.",
  },
  {
    id: 26,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "How to Care for Acne-Prone Skin Without Drying It Out",
    description:
      "A relatable guide for those struggling with acne, featuring product recommendations, lifestyle tips, and how to balance hydration and treatment.",
  },
  {
    id: 27,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "Skincare Myths You Need to Stop Believing Right Now",
    description:
      "Bust common myths like “oily skin doesn’t need moisturizer” or “natural always means better” — backed by expert advice and science.",
  },
  {
    id: 28,
    imgSrc: "/images/blog/Lookbek.png",
    date: "February 28, 2024",
    author: "Themesflat",
    title: "Morning vs. Night Skincare Routine: What's the Difference?",
    description:
      "Help readers understand the different needs of their skin at different times of the day, with a curated product guide for each routine.",
  },
];

export const allBlogs = [
  ...blogPosts,
  ...blogPosts2,
  ...blogPosts3,
  ...blogItems,
  ...blogPosts4,
  ...newsItems,
  ...blogPosts5,
  ...blogPosts6,
];
