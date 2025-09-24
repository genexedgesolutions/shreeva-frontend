import { getAllCategories } from "@/api/category";
import { getProductsOnce } from "@/hooks/useProducts";
import slugify from "slugify";
// This must be in an async function
const products = await getProductsOnce();
// Calculate min and max price dynamically
export const minPrice = Math.min(...products.map((product) => product.finalPrice || product.price || 0));
export const maxPrice = Math.max(...products.map((product) => product.finalPrice || product.price || 0));

const categoriesData = await getAllCategories();

// export const categories = categoriesData.categories.map((category) => ({
//   _id: category._id,
//   name: category.name,
//   slug: category.name 
//     ? slugify(category.name.toLowerCase())
//     : "products", // If slug is not available, default to 'products',
//   count: products.filter((product) => {
//   return product?.category?.toString() === category._id.toString();
// }).length || 0,

//   image: category.image?.[0] || "default-category.jpg",
//   isActive: category.isActive || false
// }));


// Extract unique sizes from variants or products
export const sizes = [
  ...new Set(
    products.flatMap((product) =>
      Array.isArray(product.variants)
        ? product.variants.map((variant) => variant.size)
        : product.sizes || []
    )
  )
];

// Extract unique colors from products or variants
export const colors = [
  ...new Set(
    products.flatMap((product) => product.shades || [])
  )
];

  // Availability filter options
  export const availabilityOptions = [
    {
      id: "All",
      label: "All",
      count: products.length,
      value: true,
    },
    {
      id: "inStock",
      label: "In stock",
      count: products.filter((p) => {
        const variantInventory = p.variants?.reduce((total, v) => total + (v.inventory || 0), 0) || 0;
        const productStock = typeof p.stock === "number" ? p.stock : parseInt(p.stock) || 0;
        const totalStock = variantInventory + productStock;
        return totalStock > 0;
      }).length,
      value: true,
    },
    {
      id: "outStock",
      label: "Out of stock",
      count: products.filter((p) => {
        const variantInventory = p.variants?.reduce((total, v) => total + (v.inventory || 0), 0) || 0;
        const productStock = typeof p.stock === "number" ? p.stock : parseInt(p.stock) || 0;
        const totalStock = parseInt(variantInventory + productStock);
        return totalStock <= 0;
      }).length,
      value: false,
    },
  ];

// Extract unique brands
export const brands = [
  ...new Set(products.map((product) => product.brand || "Beaubless"))
].map((brand) => ({
  id: brand,
  label: brand
}));
