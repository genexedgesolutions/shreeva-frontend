import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
import parseJwt from "@/utlis/jwt";
import { addToWishlistBackend, getWishlistItems } from "@/api/cart";
import useProducts from "@/hooks/useProducts";

export default function Wishlist() {
  const {products ,loading} = useProducts();
  const { removeFromWishlist, wishList, setWishList, addToWishlist } =
    useContextElement();
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [wishlistMerged, setWishlistMerged] = useState(false);
  const token = localStorage.getItem("authToken");
  // ✅ Fetch userId from token
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          setUserId(decodedToken._id);
        }
      }
    };
    fetchUserData();
  }, [token]);

  // ✅ Sync Wishlist between Local and Backend
  useEffect(() => {
    const syncWishlist = async () => {
      try {
        const fetchedWishlist = await getWishlistItems(userId);
        const backendWishlist =
          fetchedWishlist?.wishlist?.products?.map((product) => product._id) ||
          [];

        // ✅ If Backend Wishlist is empty, push local wishList to backend
        if (!backendWishlist.length && wishList && wishList.length) {
          for (const item of wishList) {
            await addToWishlistBackend(userId, item);
          }
        }
        // ✅ If Local Wishlist is empty, pull from backend
        else if (backendWishlist.length && (!wishList || !wishList.length)) {
          backendWishlist.forEach((id) => {
            addToWishlist(id);
          });
        }
        // ✅ If both exist, merge both
        else if (backendWishlist.length && wishList.length) {
          const mergedWishlist = [...wishList];

          wishList.forEach((localItem) => {
            if (!backendWishlist.includes(localItem._id)) {
              mergedWishlist.push(localItem);
            }
          });

          for (const item of mergedWishlist) {
            await addToWishlist(userId, item._id);
          }
        }

        setWishlistMerged(true);
      } catch (error) {
        console.error("Wishlist Sync Error:", error);
      }
    };

    if (userId && !wishlistMerged) {
      syncWishlist();
    }
  }, [userId, wishlistMerged, wishList]);

  useEffect(() => {
    setItems([...products.filter((elm) => wishList.includes(elm.id))]);
  }, [wishList]);
  return (
    <div className="modal fullRight fade modal-wishlist" id="wishlist">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="header">
            <h5 className="title">Wish List</h5>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-mini-cart-wrap">
              <div className="tf-mini-cart-main">
                <div className="tf-mini-cart-sroll">
                  {items.length ? (
                    <div className="tf-mini-cart-items">
                      {items.map((elm, i) => (
                        <div key={i} className="tf-mini-cart-item file-delete">
                          <div className="tf-mini-cart-image">
                            <img
                              className="lazyload"
                              alt=""
                              src={elm.imgSrc}
                              width={600}
                              height={800}
                            />
                          </div>
                          <div className="tf-mini-cart-info flex-grow-1">
                            <div className="mb_12 d-flex align-items-center justify-content-between flex-wrap gap-12">
                              <div className="text-title">
                                <Link
                                  to={`/products/${elm.slug}`}
                                  className="link text-line-clamp-1"
                                >
                                  {elm.title}
                                </Link>
                              </div>
                              <div
                                className="text-button tf-btn-remove remove"
                                onClick={() => removeFromWishlist(elm.id)}
                              >
                                Remove
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-12">
                              <div className="text-secondary-2">
                                {elm.sizes}
                              </div>
                              <div className="text-button">
                                ₹{elm.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4">
                      Your wishlist is empty. Start adding your favorite
                      products to save them for later!{" "}
                      <Link className="btn-line" href="/shop-default-grid">
                        Explore Products
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="tf-mini-cart-bottom">
                <Link
                  to={`/wish-list`}
                  className="btn-style-2 w-100 radius-4 view-all-wishlist"
                >
                  <span className="text-btn-uppercase">View All Wish List</span>
                </Link>
                <Link to={`/products`} className="text-btn-uppercase">
                  Or continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
