import { useEffect, useState } from "react";
import { getAllCategories } from "@/api/category";
import { getProductsOnce } from "@/hooks/useProducts";
import slugify from "slugify";

export const useProductFilters = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [availabilityOptions, setAvailabilityOptions] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProductsOnce();
      const categoriesData = await getAllCategories();

      // Min and Max Price
      const prices = products.map((product) => product.finalPrice || product.price || 0);
      setMinPrice(Math.min(...prices));
      setMaxPrice(Math.max(...prices));

      // Categories with count
      const mappedCategories = categoriesData.categories.map((category) => {
        const productCount = products.filter((product) => {
          return product?.category?.toString() === category._id.toString();
        }).length;

        return {
          _id: category._id,
          name: category.name,
          slug: category.name ? slugify(category.name.toLowerCase()) : "products",
          count: productCount || 0,
          image: category.image?.[0] || "default-category.jpg",
          isActive: category.isActive || false,
        };
      });
      setCategories(mappedCategories);

      // Unique sizes
      const allSizes = [
        ...new Set(
          products.flatMap((product) =>
            Array.isArray(product.variants)
              ? product.variants.map((variant) => variant.size)
              : product.sizes || []
          )
        ),
      ];
      setSizes(allSizes);

      // Unique colors
      const allColors = [
        ...new Set(products.flatMap((product) => product.shades || [])),
      ];
      setColors(allColors);

      // Availability
      const availability = [
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
            const totalStock = variantInventory + productStock;
            return totalStock <= 0;
          }).length,
          value: false,
        },
      ];
      setAvailabilityOptions(availability);

      // Unique brands
      const brandList = [
        ...new Set(products.map((product) => product.brand || "Beaubless")),
      ].map((brand) => ({
        id: brand,
        label: brand,
      }));
      setBrands(brandList);
    };

    fetchData();
  }, []);

  return {
    minPrice,
    maxPrice,
    categories,
    sizes,
    colors,
    availabilityOptions,
    brands,
  };
};
