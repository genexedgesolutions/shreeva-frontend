// import { getAllCategories } from "@/api/category";
import slugify from "slugify";

// const mycollections = await getAllCategories();
// const collectionArray = mycollections.categories; // Get product array
// export const collections = collectionArray.map((collection,index) => ({
//   id:collection._id,
//  imgSrc: collection.image[0],
//     alt: collection.name,
//     title: collection.name,
//     slug: slugify(collection.name, { lower: true }),
//     subtitle: collection.name,
//     delay: `${index * 0.1}s`,
// }));


// export const collections = [
//   {
//     imgSrc: "/images/collections/collection-circle/cls-circle1.jpg",
//     alt: "collection-img",
//     title: "New in",
//     count: "12 items",
//   },
//   {
//     imgSrc: "/images/collections/collection-circle/cls-circle2.jpg",
//     alt: "collection-img",
//     title: "Promotion",
//     count: "12 items",
//   },
//   {
//     imgSrc: "/images/collections/collection-circle/cls-circle3.jpg",
//     alt: "collection-img",
//     title: "Clothing",
//     count: "12 items",
//   },
//   {
//     imgSrc: "/images/collections/collection-circle/cls-circle4.jpg",
//     alt: "collection-img",
//     title: "Shoes",
//     count: "12 items",
//   },
//   {
//     imgSrc: "/images/collections/collection-circle/cls-circle5.jpg",
//     alt: "collection-img",
//     title: "Bags",
//     count: "12 items",
//   },
//   {
//     imgSrc: "/images/collections/collection-circle/cls-circle1.jpg",
//     alt: "collection-img",
//     title: "New in",
//     count: "12 items",
//   },
// ];


export const categories = [
  {
    id: 1,
    imgSrc: "/images/products/womens/women1.jpg",
    alt: "banner-cls",
    delay: "0s",
    title: "Sunscream",
    itemsCount: "12 items",
    imgWidth: 625,
    imgHeight: 833,
  },
  {
    id: 2,
    imgSrc: "/images/products/womens/women5.jpg",
    alt: "banner-cls",
    delay: "0.1s",
    title: "Face & Body Cream",
    itemsCount: "12 items",
    imgWidth: 626,
    imgHeight: 833,
  },
  {
    id: 3,
    imgSrc: "/images/products/womens/women4.jpg",
    alt: "banner-cls",
    delay: "0.2s",
    title: "Hair Conditioners",
    itemsCount: "12 items",
    imgWidth: 626,
    imgHeight: 833,
  },
];

export const collections3 = [
  {
    id: 1,
    imgSrc: "/images/collections/banner-collection/banner-cls13.jpg",
    alt: "banner-cls",
    title: "What's New",
    description: "Reserved for special occasions",
    btnText: "Shop Now",
    imgWidth: 950,
    imgHeight: 950,
    delay: "0s",
  },
  {
    id: 2,
    imgSrc: "/images/collections/banner-collection/banner-cls14.jpg",
    alt: "banner-cls",
    title: "Capsule Collection",
    description: "From beach to party: Perfect styles for every occasion",
    btnText: "Shop Now",
    imgWidth: 634,
    imgHeight: 633,
    delay: "0.1s",
  },
  {
    id: 3,
    imgSrc: "/images/collections/banner-collection/banner-cls2.jpg",
    alt: "banner-cls",
    title: "Trending Now",
    description: "Browse our Top Trending: the hottest picks loved by all",
    btnText: "Shop Now",
    imgWidth: 945,
    imgHeight: 945,
    delay: "0.2s",
  },
];

export const collections4 = [
  {
    id: 1,
    imgSrc: "/images/collections/cls7.jpg",
    imgAlt: "banner-cls",
    wowDelay: "0s",
    title: "On Sale",
    count: "12 items",
  },
  {
    id: 2,
    imgSrc: "/images/collections/cls8.jpg",
    imgAlt: "banner-cls",
    wowDelay: "0.1s",
    title: "Best Seller",
    count: "12 items",
  },
];

export const collectionData = [
  {
    id: 1,
    imageSrc: "/images/collections/cls9.jpg",
    title: "Dresses",
    itemCount: 12,
    delay: "0s",
  },
  {
    id: 2,
    imageSrc: "/images/collections/cls10.jpg",
    title: "Tops",
    itemCount: 12,
    delay: "0.1s",
  },
  {
    id: 3,
    imageSrc: "/images/collections/cls11.jpg",
    title: "Bottoms",
    itemCount: 12,
    delay: "0.2s",
  },
  {
    id: 4,
    imageSrc: "/images/collections/cls12.jpg",
    title: "Outerwear",
    itemCount: 12,
    delay: "0.3s",
  },
  {
    id: 5,
    imageSrc: "/images/collections/cls4.jpg",
    title: "Shoes",
    itemCount: 12,
    delay: "0.4s",
  },
  {
    id: 6,
    imageSrc: "/images/collections/cls6.jpg",
    title: "Accessories",
    itemCount: 12,
    delay: "0.5s",
  },
  {
    id: 7,
    imageSrc: "/images/collections/cls12.jpg",
    title: "Outerwear",
    itemCount: 12,
    delay: "0.6s",
  },
];

export const categories2 = [
  {
    id: 1,
    imgSrc: "/images/collections/grid-cls/women-cls.jpg",
    alt: "banner-cls",
    title: "Women",
    width: 615,
    height: 819,
  },
  {
    id: 2,
    imgSrc: "/images/collections/grid-cls/promotion-cls.jpg",
    alt: "banner-cls",
    title: "Promotion",
    width: 615,
    height: 387,
  },
  {
    id: 3,
    imgSrc: "/images/collections/grid-cls/accessories-cls.jpg",
    alt: "banner-cls",
    title: "Accessories",
    width: 615,
    height: 387,
  },
  {
    id: 4,
    imgSrc: "/images/collections/grid-cls/men-cls.jpg",
    alt: "banner-cls",
    title: "Men",
    width: 615,
    height: 819,
  },
];

export const collectionItems2 = [
  {
    id: 1,
    imgSrc: "/images/collections/banner-collection/banner-cls15.jpg",
    alt: "banner-cls",
    title: "Capsule Collection",
    desc: "Start From $199",
    btnText: "Shop Now",
  },
  {
    id: 2,
    imgSrc: "/images/collections/banner-collection/banner-cls13.jpg",
    alt: "banner-cls",
    title: "Dresses and jumpsuits",
    desc: "Start From $199",
    btnText: "Shop Now",
  },
  {
    id: 3,
    imgSrc: "/images/collections/banner-collection/banner-cls16.jpg",
    alt: "banner-cls",
    title: "New Arrivals",
    desc: "Start From $199",
    btnText: "Shop Now",
  },
];

export const categoryItems = [
  {
    id: 1,
    imgSrc: "/images/collections/banner-collection/banner-cls7.jpg",
    alt: "banner-cls",
    title: "Men's",
    count: "12 items",
  },
  {
    id: 2,
    imgSrc: "/images/collections/banner-collection/banner-cls8.jpg",
    alt: "banner-cls",
    title: "Promotion",
    count: "12 items",
  },
  {
    id: 3,
    imgSrc: "/images/collections/banner-collection/banner-cls17.jpg",
    alt: "banner-cls",
    title: "New Now",
    count: "12 items",
  },
  {
    id: 4,
    imgSrc: "/images/collections/banner-collection/banner-cls18.jpg",
    alt: "banner-cls",
    title: "Clothing",
    count: "12 items",
  },
  {
    id: 5,
    imgSrc: "/images/collections/banner-collection/banner-cls19.jpg",
    alt: "banner-cls",
    title: "Accessories",
    count: "12 items",
  },
  {
    id: 6,
    imgSrc: "/images/collections/banner-collection/banner-cls6.jpg",
    alt: "banner-cls",
    title: "Women’s",
    count: "12 items",
  },
  {
    id: 7,
    imgSrc: "/images/collections/banner-collection/banner-cls17.jpg",
    alt: "banner-cls",
    title: "New Now",
    count: "12 items",
  },
];

export const collection5 = [
  {
    id: 1,
    imageSrc: "/images/collections/grid-cls/women-cls2.jpg",
    alt: "banner-cls",
    title: "Shop Women",
    delay: "0s",
  },
  {
    id: 2,
    imageSrc: "/images/collections/grid-cls/men-cls2.jpg",
    alt: "banner-cls",
    title: "Shop Men",
    delay: "0.1s",
  },
  {
    id: 3,
    imageSrc: "/images/collections/grid-cls/kid-cls.jpg",
    alt: "banner-cls",
    title: "Shop Kid",
    delay: "0.2s",
  },
];

export const categorySlides = [
  {
    imgSrc: "/images/collections/cls1.jpg",
    imgAlt: "banner-cls",
    btnText: "New in",
  },
  {
    imgSrc: "/images/collections/cls2.jpg",
    imgAlt: "banner-cls",
    btnText: "Tops",
  },
  {
    imgSrc: "/images/collections/cls3.jpg",
    imgAlt: "banner-cls",
    btnText: "Clothing",
  },
  {
    imgSrc: "/images/collections/cls13.jpg",
    imgAlt: "banner-cls",
    btnText: "Dresses",
  },
  {
    imgSrc: "/images/collections/cls14.jpg",
    imgAlt: "banner-cls",
    btnText: "Jacket",
  },
  {
    imgSrc: "/images/collections/cls6.jpg",
    imgAlt: "banner-cls",
    btnText: "Sale",
  },
  {
    imgSrc: "/images/collections/cls5.jpg",
    imgAlt: "banner-cls",
    btnText: "Bags",
  },
];

export const collections5 = [
  {
    imgSrc: "/images/collections/banner-collection/100.jpg",
    alt: "banner-cls",
    title: "What's New",
    description: "Reserved for special occasions",
  },
  {
    imgSrc: "/images/collections/banner-collection/101.jpg",
    alt: "banner-cls",
    title: "Capsule Collection",
    description: "From beach to party: Perfect styles for every occasion",
  },
];

export const galleryItems = [
  {
    imgSrc: "/images/gallery/gallery-cls3.jpg",
    alt: "image-gallery",
    text: "Promotion",
  },
  {
    imgSrc: "/images/gallery/gallery-cls4.jpg",
    alt: "image-gallery",
    text: "Accessories",
  },
  {
    imgSrc: "/images/gallery/gallery-cls5.jpg",
    alt: "image-gallery",
    text: "Accessories",
  },
  {
    imgSrc: "/images/gallery/gallery-cls1.jpg",
    alt: "image-gallery",
    text: "New in",
  },
  {
    imgSrc: "/images/gallery/gallery-cls2.jpg",
    alt: "image-gallery",
    text: "New Arrival",
  },
  {
    imgSrc: "/images/gallery/gallery-cls5.jpg",
    alt: "image-gallery",
    text: "Accessories",
  },
];




export const collectionItems4 = [
  {
    id: "1",
    imgSrc: ["/images/collections/collection1.jpeg",],
    alt: "Rings",
    title: "Rings",
    slug: slugify("Rings", { lower: true }),
    subtitle: "Rings",
    delay: "0s",
    itemsCount: "0 items",
  },
  {
    id: "2",
    imgSrc: ["/images/collections/collection2.jpeg",],
    alt: "Earrings",
    title: "Earrings",
    slug: slugify("Earrings", { lower: true }),
    subtitle: "Earrings",
    delay: "0.1s",
    itemsCount: "0 items",
  },
  {
    id: "3",
    imgSrc: ["/images/collections/collection3.jpeg",],
    alt: "Pendants",
    title: "Pendants",
    slug: slugify("Pendants", { lower: true }),
    subtitle: "Pendants",
    delay: "0.2s",
    itemsCount: "0 items",
  },
  {
    id: "4",
    imgSrc: ["/images/collections/collection4.jpeg",],
    alt: "Necklaces",
    title: "Necklaces",
    slug: slugify("Necklaces", { lower: true }),
    subtitle: "Necklaces",
    delay: "0.3s",
    itemsCount: "0 items",
  },
  {
    id: "5",
    imgSrc: ["/images/collections/collection1.jpeg",],
    alt: "Bracelets",
    title: "Bracelets",
    slug: slugify("Bracelets", { lower: true }),
    subtitle: "Bracelets",
    delay: "0.4s",
    itemsCount: "0 items",
  },
  {
    id: "6",
    imgSrc: ["/images/collections/collection2.jpeg",],
    alt: "Earrings",
    title: "Earrings",
    slug: slugify("Earrings", { lower: true }),
    subtitle: "Earrings",
    delay: "0.5s",
    itemsCount: "0 items",
  },
  {
    id: "7",
    imgSrc: ["/images/collections/collection3.jpeg",],
    alt: "Pendants",
    title: "Pendants",
    slug: slugify("Pendants", { lower: true }),
    subtitle: "Pendants",
    delay: "0.6s",
    itemsCount: "0 items",
  },
  {
    id: "8",
    imgSrc: ["/images/collections/collection4.jpeg",],
    alt: "Necklaces",
    title: "Necklaces",
    slug: slugify("Necklaces", { lower: true }),
    subtitle: "Necklaces",
    delay: "0.7s",
    itemsCount: "0 items",
  },
  {
    id: "9",
    imgSrc: ["/images/collections/collection1.jpeg",],
    alt: "Bracelets",
    title: "Bracelets",
    slug: slugify("Bracelets", { lower: true }),
    subtitle: "Bracelets",
    delay: "0.8s",
    itemsCount: "0 items",
  },
];

export const collections6 = [
  {
    imgSrc: "/images/collections/grid-cls/face-cls.jpg",
    alt: "banner-cls",
    category: "Face",
    delay: "0s",
  },
  {
    imgSrc: "/images/collections/grid-cls/hand-cls.jpg",
    alt: "banner-cls",
    category: "Hand",
    delay: "0.1s",
  },
  {
    imgSrc: "/images/collections/grid-cls/body-cls.jpg",
    alt: "banner-cls",
    category: "Body",
    delay: "0.2s",
  },
  {
    imgSrc: "/images/collections/grid-cls/foot-cls.jpg",
    alt: "banner-cls",
    category: "Foot",
    delay: "0s",
  },
  {
    imgSrc: "/images/collections/grid-cls/eye-cls.jpg",
    alt: "banner-cls",
    category: "Eye",
    delay: "0.1s",
  },
  {
    imgSrc: "/images/collections/grid-cls/lip-cls.jpg",
    alt: "banner-cls",
    category: "Lip",
    delay: "0.2s",
  },
];

export const collections7 = [
  {
    imgSrc: "/images/collections/cls-decor1.jpg",
    title: "Shop Bathroom",
    productCount: "25 products",
  },
  {
    imgSrc: "/images/collections/cls-decor2.jpg",
    title: "Shop Bathroom",
    productCount: "25 products",
  },
  {
    imgSrc: "/images/collections/cls-decor3.jpg",
    title: "Shop Bedroom",
    productCount: "25 products",
  },
  {
    imgSrc: "/images/collections/cls-decor4.jpg",
    title: "Shop Kitchen Room",
    productCount: "25 products",
  },
  {
    imgSrc: "/images/collections/cls-decor1.jpg",
    title: "Shop Living Room",
    productCount: "25 products",
  },
];

export const collections8 = [
  {
    imgSrc: "/images/collections/collection-circle/cls-furniture1.jpg",
    title: "Chairs",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-furniture2.jpg",
    title: "Tables",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-furniture3.jpg",
    title: "Sofas",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-furniture4.jpg",
    title: "Storage",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-furniture5.jpg",
    title: "Beds",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-furniture1.jpg",
    title: "Chairs",
    count: "12 items",
  },
];

export const collections9 = [
  {
    imgSrc: "/images/banner/discover-furniture1.jpg",
    subtitle: "summer 2024 collection",
    title: "Super Sale Up To %50",
    buttonText: "discover Now",
  },
  {
    imgSrc: "/images/banner/discover-furniture2.jpg",
    subtitle: "summer 2024 collection",
    title: "What's New",
    buttonText: "discover Now",
  },
];

export const categories3 = [
  {
    imgSrc: "/images/collections/collection-circle/cls-circle12.jpg",
    title: "Necklaces",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-circle13.jpg",
    title: "Rings",
    count: "16 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-circle14.jpg",
    title: "Bracelets",
    count: "18 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-circle15.jpg",
    title: "Earnings",
    count: "24 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-circle16.jpg",
    title: "Charm & Dangles",
    count: "08 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-circle17.jpg",
    title: "Gift Ideas",
    count: "26 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-circle16.jpg",
    title: "Charm & Dangles",
    count: "12 items",
  },
];

export const collections10 = [
  {
    imgSrc: "/images/collections/banner-collection/banner-cls28.jpg",
    alt: "banner-cls",
    title: "Capsule Collection",
    description: "Reserved for special occasions",
  },
  {
    imgSrc: "/images/collections/banner-collection/banner-cls29.jpg",
    alt: "banner-cls",
    title: "New Arrival",
    description: "Reserved for special occasions",
  },
  // Add more items here if needed
];

export const banners = [
  {
    imgSrc: "/images/collections/banner-collection/banner-cls23.jpg",
    alt: "banner-cls",
    title: "Long raffia earrings",
    description: "Contains at least 100% recycled materials",
    btnText: "Shop Now",
    wowDelay: ".1s",
    className: "item1",
  },
  {
    imgSrc: "/images/collections/banner-collection/banner-cls24.jpg",
    alt: "banner-cls",
    title: "Beaded pendant earrings",
    description:
      "Metallic press stud fastening. Beaded detail. Festival Season.",
    btnText: "Shop Now",
    wowDelay: ".1s",
    className: "item2",
  },
  {
    imgSrc: "/images/collections/banner-collection/banner-cls25.jpg",
    alt: "banner-cls",
    title: "Long raffia earrings",
    description: "Contains at least 100% recycled materials",
    btnText: "Shop Now",
    wowDelay: ".1s",
    className: "item3",
  },
];

export const categories4 = [
  {
    imgSrc: "/images/collections/collection-circle/cls-jewelry1.jpg",
    title: "Necklaces",
    itemsCount: 12,
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-jewelry2.jpg",
    title: "Rings",
    itemsCount: 16,
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-jewelry3.jpg",
    title: "Bracelets",
    itemsCount: 18,
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-jewelry4.jpg",
    title: "Earnings",
    itemsCount: 24,
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-jewelry5.jpg",
    title: "Charm & Dangles",
    itemsCount: 8,
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-jewelry6.jpg",
    title: "Gift Ideas",
    itemsCount: 26,
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-jewelry4.jpg",
    title: "Earnings",
    itemsCount: 24,
  },
];

export const collectionData2 = [
  {
    imgSrc: "/images/collections/banner-collection/banner-cls26.jpg",
    alt: "banner-cls",
    title: "Capsule Collection",
    description: "Reserved for special occasions",
  },
  {
    imgSrc: "/images/collections/banner-collection/banner-cls27.jpg",
    alt: "banner-cls",
    title: "New Arrival",
    description: "Reserved for special occasions",
  },
];

export const collectionsData3 = [
  {
    image: "/images/collections/cls-activewear1.jpg",
    title: "Yoga",
    itemCount: 12,
  },
  {
    image: "/images/collections/cls-activewear2.jpg",
    title: "Lounge",
    itemCount: 12,
  },
  {
    image: "/images/collections/cls-activewear3.jpg",
    title: "Tennis",
    itemCount: 12,
  },
  {
    image: "/images/collections/cls-activewear4.jpg",
    title: "Train",
    itemCount: 12,
  },
  {
    image: "/images/collections/cls-activewear5.jpg",
    title: "Pilates",
    itemCount: 12,
  },
  {
    image: "/images/collections/cls-activewear4.jpg", // same image as above
    title: "Train",
    itemCount: 12,
  },
];

export const collectionItems5 = [
  {
    imgSrc: "/images/collections/cls-organic-1.jpg",
    alt: "banner-cls",
    title: "Pure Organic-Vegan",
    description: "Fresh Veggie Combos Start from $22",
    delay: "0s",
  },
  {
    imgSrc: "/images/collections/cls-organic-2.jpg",
    alt: "banner-cls",
    title: "Top-quality nuts and grains.",
    description: "Nut & Grain Combos Start from $22",
    delay: "0.1s",
  },
  {
    imgSrc: "/images/collections/cls-organic-3.jpg",
    alt: "banner-cls",
    title: "Delicious and nutritious blends.",
    description: "Smoothie Essentials Bundle Start from $22",
    delay: "0.2s",
  },
];

export const collectionData3 = [
  {
    imgSrc: "/images/collections/banner-collection/banner-cls30.jpg",
    alt: "banner-cls",
    title: "Men's Socks",
  },
  {
    imgSrc: "/images/collections/banner-collection/banner-cls31.jpg",
    alt: "banner-cls",
    title: "Women's Socks",
  },
  {
    imgSrc: "/images/collections/banner-collection/banner-cls32.jpg",
    alt: "banner-cls",
    title: "Kid's Socks",
  },
];

export const collectionData4 = [
  {
    imgSrc: "/images/collections/collection-circle/cls-camping1.jpg",
    title: "New in",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-camping2.jpg",
    title: "Promotion",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-camping3.jpg",
    title: "Clothing",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-camping4.jpg",
    title: "Shoes",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-camping5.jpg",
    title: "Bags",
    count: "12 items",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-camping1.jpg",
    title: "New in",
    count: "12 items",
  },
];

export const categories5 = [
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic1.jpg",
    alt: "collection-img",
    title: "Electronics",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic2.jpg",
    alt: "collection-img",
    title: "Appliances",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic3.jpg",
    alt: "collection-img",
    title: "Kitchen",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic4.jpg",
    alt: "collection-img",
    title: "Audio",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic5.jpg",
    alt: "collection-img",
    title: "Smart Home",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic6.jpg",
    alt: "collection-img",
    title: "Game",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic7.jpg",
    alt: "collection-img",
    title: "Office",
  },
  {
    imgSrc: "/images/collections/collection-circle/cls-electronic1.jpg",
    alt: "collection-img",
    title: "Electronics",
  },
];

export const collectionItems6 = [
  {
    id: 1,
    imgSrc: "/images/collections/cls-electronic-1.jpg",
    title: "New Apple Watch",
    description: "Stay connected and stylish with the latest Apple Watch.",
    wowDelay: "0s",
  },
  {
    id: 2,
    imgSrc: "/images/collections/cls-electronic-2.jpg",
    title: "Discover Galaxy",
    description: "Experience the cutting-edge Samsung S24",
    wowDelay: "0.1s",
  },
  {
    id: 3,
    imgSrc: "/images/collections/cls-electronic-3.jpg",
    title: "Smart Speaker",
    description: "Google home smart speaker with google assistant",
    wowDelay: "0.2s",
  },
];

export const slides = [
  {
    id: 1,
    imgSrc: "/images/collections/collection-circle/cls-electronic8.jpg",
    alt: "collection-img",
    heading: "Shop top deals on Samsung Fold and more.",
    delay: "0s",
  },
  {
    id: 2,
    imgSrc: "/images/collections/collection-circle/cls-electronic9.jpg",
    alt: "collection-img",
    heading: "Score top deals on Sony PS5 and accessories.",
    delay: "0.1s",
  },
  {
    id: 3,
    imgSrc: "/images/collections/collection-circle/cls-electronic10.jpg",
    alt: "collection-img",
    heading: "Grab amazing deals on Imac and Apple",
    delay: "0.2s",
  },
  {
    id: 4,
    imgSrc: "/images/collections/collection-circle/cls-electronic11.jpg",
    alt: "collection-img",
    heading: "Top deals on Bluetooth speakers and more.",
    delay: "0.3s",
  },
];

export const categories6 = [
  {
    imageSrc: "/images/avatar/pet-1.jpg",
    categoryName: "For Dog",
    bgColor: "bg-blue",
    items: [
      "Dog Beds",
      "Dog Clothing",
      "Dog Food",
      "Dog Supplements",
      "Dog Toys",
    ],
  },
  {
    imageSrc: "/images/avatar/pet-2.jpg",
    categoryName: "For Cat",
    bgColor: "bg-pink",
    items: [
      "Dog Beds",
      "Dog Clothing",
      "Dog Food",
      "Dog Supplements",
      "Dog Toys",
    ],
  },
  {
    imageSrc: "/images/avatar/pet-3.jpg",
    categoryName: "Small Pet",
    bgColor: "bg-warning",
    items: [
      "Hamster Cages",
      "Hamster Bedding",
      "Hamster Food",
      "Hamster Toys",
      "Hamster Supplements",
    ],
  },
  {
    imageSrc: "/images/avatar/pet-4.jpg",
    categoryName: "For Pharmacy",
    bgColor: "bg-yellow",
    items: [
      "Pet Medications",
      "Flea & Tick",
      "Dewormers",
      "Vitamins & Supplements",
      "First Aid",
    ],
  },
];

export const collections11 = [
  {
    imgSrc: "/images/collections/shop-cls/shampoo.jpg",
    text: "Hair Care",
    // count: "12 items",
  },
  {
    imgSrc: "/images/collections/shop-cls/bodycream.jpg",
    text: "Skin Care",
    // count: "12 items",
  }
];
