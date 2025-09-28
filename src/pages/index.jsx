import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import HeroMain from "@/components/homes/cosmetic/Hero";
import MetaComponent from "@/components/common/MetaComponent";
import { lazy, Suspense, useState, useEffect } from "react";
import useProducts from "@/hooks/useProducts";

// ✅ Common / Static Components
import CategoriesSection from "@/components/common/Categories";

// ✅ Lazy Components
const BannerCollectionMain = lazy(() =>
  import("@/components/homes/cosmetic/BannerCollection")
);
const OfferBannerSection = lazy(() =>
  import("@/components/homes/cosmetic/OfferBannerCollection")
);
const BannerCollectionwatches = lazy(() =>
  import("@/components/homes/cosmetic/BannerCollectionwatches")
);
const Video1 = lazy(() =>
  import("@/components/homes/cosmetic/video1.jsx")
);
const FeaturesSection = lazy(() => import("@/components/common/Features"));
const ShopGramSection = lazy(() => import("@/components/common/ShopGram"));
const TestimonialsJewelry = lazy(() =>
  import("@/components/common/Testimonials3")
);
const MarqueeOffers = lazy(() =>
  import("@/components/common/MarqueeSection2")
);
const ProductsTrending = lazy(() =>
  import("@/components/common/ProductsTrending")
);
const ProductsExclusiveEditon = lazy(() =>
  import("@/components/common/ProductsExclusiveEditon")
);
const ProductsBestSelling = lazy(() =>
  import("@/components/common/ProductsBestSeller")
);
const ProductsNewArrivals = lazy(() =>
  import("@/components/common/ProductsNewArrivals")
);

const ProductsWatches = lazy(() =>
  import("@/components/common/ProductsWatches")
);
const TiktokSection = lazy(() => import("@/components/common/Tiktok"));
const LookbookSection = lazy(() =>
  import("@/components/homes/cosmetic/Lookbook")
);
const CollectionsSection = lazy(() =>
  import("@/components/homes/cosmetic/Collections")
);

const metadata = {
  title: "Shreeva Jewels | Timeless Lab-Grown Diamond Jewelry",
  description:
    "Shreeva Jewels crafts modern jewelry in sterling silver, gold, and lab-grown diamonds—each piece elegant, personalized, and meant to tell your story.",
};

// Full-page Loader
const FullPageLoader = () => (
  <div id="preloader" className="preload-container">
    <div className="loader-wrapper">
      <div className="spinner"></div>
    </div>
  </div>
);

// Inline Section Loader
const Loader = () => <div className="loader-container">Loading...</div>;

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch products once
  const { products, loading } = useProducts();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Show loader for at least 1 second
  }, []);

  return isLoading || loading ? (
    <FullPageLoader />
  ) : (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <HeroMain />

      {/* ✅ Scrolling Offers */}
      <Suspense fallback={<Loader />}>
        <MarqueeOffers />
      </Suspense>

      {/* ✅ Categories */}
      <Suspense fallback={<Loader />}>
        <CategoriesSection />
      </Suspense>

      {/* ✅ Offers + Featured Products */}
      <Suspense fallback={<Loader />}>
        <OfferBannerSection />
        <ProductsExclusiveEditon products={products} />
      </Suspense>

      {/* ✅ Mid Banner */}
      <Suspense fallback={<Loader />}>
        <BannerCollectionMain />
      </Suspense>

      {/* ✅ Trending Products */}
      <Suspense fallback={<Loader />}>
        <ProductsTrending products={products} />
      </Suspense>

      {/* ✅ Optional Lookbook */}
      <Suspense fallback={<Loader />}>
        {/* <LookbookSection /> */}
      </Suspense>

      {/* ✅ Another Banner */}
      <Suspense fallback={<Loader />}>
        <BannerCollectionMain />
      </Suspense>

      {/* ✅ TikTok Section */}
      <Suspense fallback={<Loader />}>
        <TiktokSection />
      </Suspense>

   

      {/* ✅ Features */}
      <Suspense fallback={<Loader />}>
        <FeaturesSection />
      </Suspense>

      {/* ✅ ShopGram (Instagram style feed) */}
      <Suspense fallback={<Loader />}>
        {/* <ShopGramSection /> */}
      </Suspense>

      {/* ✅ Best Selling Products */}
      <Suspense fallback={<Loader />}>
        <ProductsBestSelling products={products} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Video1 />
      </Suspense>


      {/* ✅ New Arrivals */}
      <Suspense fallback={<Loader />}>
        <ProductsNewArrivals products={products} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <BannerCollectionwatches />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <ProductsWatches products={products} />
      </Suspense>
   {/* ✅ Testimonials */}
      <Suspense fallback={<Loader />}>
        <TestimonialsJewelry />
      </Suspense>
      <Footer1 />
    </>
  );
}
