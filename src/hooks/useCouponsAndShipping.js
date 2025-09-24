import { useEffect, useState } from "react";
import { getAllCoupons, getAllShippingOptions } from "@/api/coupans";

export function useCouponsAndShipping() {
  const [coupons, setCoupons] = useState([]);
  const [shippingInfo, setShippingInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [couponCodes, shippingOptions] = await Promise.all([
        getAllCoupons(),
        getAllShippingOptions(),
      ]);

      const mappedCoupons = couponCodes.coupons.map((coupon) => ({
        id: coupon._id,
        code: coupon.code,
        title: coupon.title,
        discount: coupon.discountValue,
        discountValue: coupon.discountValue,
        type: coupon.discountType,
        discountType: coupon.discountType,
        isActive: coupon.isActive,
        usageCount: coupon.usageCount,
        maxUsage: coupon.maxUsage,
        startDate: coupon.startDate,
        expireDate: coupon.expireDate,
      }));

      const mappedShipping = shippingOptions.data.map((option) => ({
        id: option._id,
        type: option.type,
        charges: option.charges,
        name: option.name,
      }));

      setCoupons(mappedCoupons);
      setShippingInfo(mappedShipping);
      setLoading(false);
    }

    fetchData();
  }, []);

  return { coupons, shippingInfo, loading };
}
