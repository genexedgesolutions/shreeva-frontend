import "./styles/style.scss";
import {useEffect, useState } from "react";

import Context from "@/context/Context";
import CartModal from "@/components/modals/CartModal";
import QuickView from "@/components/modals/QuickView";
import QuickAdd from "@/components/modals/QuickAdd";
import Compare from "@/components/modals/Compare";
import MobileMenu from "@/components/modals/MobileMenu";
import NewsLetterModal from "@/components/modals/NewsLetterModal";
import SearchModal from "@/components/modals/SearchModal";
import SizeGuide from "@/components/modals/SizeGuide";
import Wishlist from "@/components/modals/Wishlist";
import DemoModal from "@/components/modals/DemoModal";
import Categories from "@/components/modals/Categories";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages";
import ShopLeftSidebarPage from "./pages/products/shop-left-sidebar";
import ShopCategoriesTopPage1 from "./pages/products/shop-categories-top";
import ShopCollectionPage from "./pages/products/shop-collection";

import WishListPage from "./pages/other-pages/wish-list";
import SearchResultPage from "./pages/products/search-result";
import ShopingCartPage from "./pages/products/shopping-cart";
import LoginPage from "./pages/other-pages/login";
import ForgotPasswordPage from "./pages/other-pages/forget-password";
import OrderTrackingPage from "./pages/other-pages/order-tracking";
import MyAccountPage from "./pages/my-account/my-account";
import ProductDescriptionListPage from "./pages/productDetails/product-description-list";
import BlogGridPage from "./pages/blogs/blog-grid";
import BlogDetailsPage2 from "./pages/blogs/blog-details";
import AboutUsPage from "./pages/other-pages/about-us";
import PageNotFoundPage from "./pages/not-found";
import TermsOfUsePage from "./pages/other-pages/term-of-use";

// import Privacy from "./pages/other-pages/privacy-policy";

import CommingSoonPage from "./pages/other-pages/coming-soon";
import WOW from "@/utlis/wow";
import CompareProductsPage from "./pages/other-pages/compare-products";

import PrivacyPage from "./pages/other-pages/privacy-policy";
import ReturnPage from "./pages/other-pages/refund-return";

import RegisterPage from "./pages/other-pages/register";
import MyAccountOrdersPage from "./pages/my-account/my-account-orders";
import MyAccountAddressPage from "./pages/my-account/my-account-address";
import MyAccountOrdersDetailsPage from "./pages/my-account/my-account-orders-details";
import ShippingPage from "./pages/other-pages/shipping";
import ContactPage from "./pages/other-pages/contact";
import CheckoutPage from "./pages/products/checkout";
import OrderSuccessPage from "./pages/other-pages/order-success";
import GiftingPage from "./pages/gifting/Gifting";
import CCAvenueCheckout from "./pages/other-pages/CCAvenue/cc-avenue-checkout";
import OrderFailurePage from "./pages/other-pages/order-failure";
import OrderPendingPage from "./pages/other-pages/order-pending";

function App({ setIsLoading }) {
  const { pathname } = useLocation();
  useEffect(() => {
    // Simulate API call or content loading check
    const checkAppReady = async () => {
      // Simulate delay for data fetching (Replace with actual API calls)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Hide loader once content is ready
    };

    checkAppReady();
  }, [setIsLoading]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
        header.classList.add("header-bg");
      } else {
        header.classList.remove("header-bg");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    setScrollDirection("up");
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);
  useEffect(() => {
    // Dynamically import Bootstrap
    import("bootstrap")
      .then((bootstrap) => {
        // Close any open modal
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        // Close any open offcanvas
        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, [pathname]); // Runs every time the route changes

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) {
      if (scrollDirection == "up") {
        header.style.top = "0px";
      } else {
        header.style.top = "-185px";
      }
    }
  }, [scrollDirection]);
  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return (
    <>
      <Context>
        <div id="wrapper">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />

              {/* My Account */}
              <Route path="wish-list" element={<WishListPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forget-password" element={<ForgotPasswordPage />} />
              <Route path="order-tracking" element={<OrderTrackingPage />} />
              <Route path="my-account" element={<MyAccountPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="cart" element={<ShopingCartPage />} />
              <Route path="order-success" element={<OrderSuccessPage />} />
              <Route path="order-failed" element={<OrderFailurePage/>} />
              <Route path="order-pending" element={<OrderPendingPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="cc-avenue-checkout" element={<CCAvenueCheckout />} />
              <Route path="my-orders" element={<MyAccountOrdersPage />} />
              <Route path="my-address" element={<MyAccountAddressPage />} />
              <Route
                path="order-details/:orderId"
                element={<MyAccountOrdersDetailsPage />}
              />
              {/* My Account End */}

              {/* Pages */}
              <Route path="gifting" element={<GiftingPage />} />
              <Route path="blogs" element={<BlogGridPage />} />
              <Route path="blogs/:slug" element={<BlogDetailsPage2 />} />
              <Route path="about-us" element={<AboutUsPage />} />
              <Route path="contact-us" element={<ContactPage />} />
              <Route path="term-of-use" element={<TermsOfUsePage />} />
              <Route path="privacy-policy" element={<PrivacyPage />} />
              <Route path="refund-return" element={<ReturnPage />} />
              <Route path="shipping" element={<ShippingPage />} />
              <Route path="coming-soon" element={<CommingSoonPage />} />
              <Route path="404" element={<PageNotFoundPage />} />
              {/* Pages End */}

              {/* Shop */}
              <Route path="products" element={<ShopLeftSidebarPage />} />
              <Route path="search-result" element={<SearchResultPage />} />
              <Route
                path="compare-products"
                element={<CompareProductsPage />}
              />
              <Route path="collections" element={<ShopCollectionPage />} />
              <Route
                path="collections/:slug"
                element={<ShopCategoriesTopPage1  />}
              />
              {/* Shop End */}

              {/* Single Product Pages */}
              <Route
                path="product-detail/:slug"
                element={<ProductDescriptionListPage />}
              />

              {/* Single Product Page End */}
              <Route
                path="/products/:slug"
                element={<ProductDescriptionListPage />}
              />


              <Route path="*" element={<PageNotFoundPage />} />
            </Route>
          </Routes>
        </div>
        <CartModal />
        <QuickView />
        <QuickAdd />
        <Compare />
        <MobileMenu />

        <NewsLetterModal />
        <SearchModal />
        <SizeGuide />
        <Wishlist />
        <DemoModal />
        <Categories />
      </Context>
    </>
  );
}

export default App;
