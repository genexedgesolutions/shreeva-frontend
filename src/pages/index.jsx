import Footer1 from "@/components/footers/Footer1";
import Topbar from "@/components/headers/Topbar";
import Hero from "@/components/homes/cosmetic/Hero";
import MetaComponent from "@/components/common/MetaComponent";
import { lazy, Suspense, useState, useEffect } from "react";
import Testimonials3 from "@/components/common/Testimonials3";
import BannerTab from "@/components/common/BannerTab";
import KoreanInspired from "@/components/common/KoreanInspired";
import Hero2 from "@/components/homes/cosmetic/Hero2";
import Header1 from "@/components/headers/Header1";
import Products2 from "@/components/common/Products2";
import Products1 from "@/components/products/Products1";
import Products4 from "@/components/common/Products4";
import Products5 from "@/components/common/Products5";
import Categories from "@/components/common/Categories";


const BannerCollection = lazy(() =>
  import("@/components/homes/cosmetic/BannerCollection")
);
const BannerCountdown = lazy(() =>
  import("@/components/homes/cosmetic/BannerCountdown")
);
const Features = lazy(() => import("@/components/common/Features"));
const ShopGram = lazy(() => import("@/components/common/ShopGram"));
const Testimonials = lazy(() => import("@/components/common/Testimonials"));
const MarqueeSection2 = lazy(() =>
  import("@/components/common/MarqueeSection2")
);
const Products = lazy(() => import("@/components/common/Products5"));
const Tiktok = lazy(() => import("@/components/common/Tiktok"));
const Lookbook = lazy(() => import("@/components/homes/cosmetic/Lookbook"));
const Collections = lazy(() => import("@/components/homes/cosmetic/Collections"));
const Products3 = lazy(() => import("@/components/common/Products3"));

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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Show loader for at least 1 second
  }, []);

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Hero />

      <Suspense fallback={<Loader />}>
        <MarqueeSection2 />
      </Suspense>
      <Categories/>
      <Suspense fallback={<Loader/>}>
        <Collections />
      </Suspense>
      
      <Suspense fallback={<Loader />}>
        {/* <Products2 /> */}
      </Suspense>
{/* 
      <Hero2 /> */}

      <Suspense fallback={<Loader />}>
        {/* <BannerCountdown /> */}
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* <Products /> */}
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* <Lookbook /> */}
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* <BannerCollection /> */}
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* <Tiktok /> */}
      </Suspense>
      {/* <KoreanInspired/> */}
      <Suspense fallback={<Loader />}>
        <Testimonials3 />
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* <Features /> */}
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* <ShopGram /> */}
      </Suspense> 

      <Footer1 />
    </>
  );
}
