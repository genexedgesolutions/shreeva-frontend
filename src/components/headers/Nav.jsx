import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <>
      {/* Home */}
      <li className={`menu-item ${pathname === "/" ? "active" : ""}`}>
        <Link to="/" className="item-link">Home</Link>
      </li>
      {/* Home */}
      <li className={`menu-item ${pathname === "/collections" ? "active" : ""}`}>
        <Link to="/Collections" className="item-link">Collections</Link>
      </li>

      {/* Diamonds */}
      <li className={`menu-item has-dropdown ${pathname === "/diamond" ? "active" : ""}`}>
        <Link to="/diamond" className="item-link">Diamonds</Link>
        <ul className="dropdown-menu">
          <li><Link to="/diamond/solitaire">Solitaire Diamonds</Link></li>
          <li><Link to="/diamond/loose">Loose Diamonds</Link></li>
          <li><Link to="/diamond/engagement-rings">Engagement Rings</Link></li>
        </ul>
      </li>

      {/* Fine Jewellery */}
      <li className={`menu-item has-dropdown ${pathname === "/jewellery" ? "active" : ""}`}>
        <Link to="/jewellery" className="item-link">Fine Jewellery</Link>
        <ul className="dropdown-menu">
          <li><Link to="/jewellery/rings">Rings</Link></li>
          <li><Link to="/jewellery/necklaces">Necklaces</Link></li>
          <li><Link to="/jewellery/earrings">Earrings</Link></li>
        </ul>
      </li>

      {/* Hip Hop Jewellery */}
      <li className={`menu-item has-dropdown ${pathname === "/hip-hop-jewellery" ? "active" : ""}`}>
        <Link to="/hip-hop-jewellery" className="item-link">Hip Hop Jewellery</Link>
        <ul className="dropdown-menu">
          <li><Link to="/hip-hop-jewellery/chains">Chains</Link></li>
          <li><Link to="/hip-hop-jewellery/pendants">Pendants</Link></li>
          <li><Link to="/hip-hop-jewellery/grillz">Grillz</Link></li>
        </ul>
      </li>

      {/* Parcel Goods */}
      <li className={`menu-item has-dropdown ${pathname === "/parcel-goods" ? "active" : ""}`}>
        <Link to="/parcel-goods" className="item-link">Parcel Goods</Link>
        <ul className="dropdown-menu">
          <li><Link to="/parcel-goods/bulk-diamonds">Bulk Diamonds</Link></li>
          <li><Link to="/parcel-goods/wholesale-jewellery">Wholesale Jewellery</Link></li>
        </ul>
      </li>

      {/* Share Demand */}
      <li className={`menu-item has-dropdown ${pathname === "/share-demand" ? "active" : ""}`}>
        <Link to="/share-demand" className="item-link">Share Demand</Link>
        <ul className="dropdown-menu">
          <li><Link to="/share-demand/post">Post Demand</Link></li>
          <li><Link to="/share-demand/browse">Browse Demand</Link></li>
        </ul>
      </li>

      {/* Events */}
      <li className={`menu-item has-dropdown ${pathname === "/events" ? "active" : ""}`}>
        <Link to="/events" className="item-link">Events</Link>
        <ul className="dropdown-menu">
          <li><Link to="/events/exhibitions">Exhibitions</Link></li>
          <li><Link to="/events/trade-shows">Trade Shows</Link></li>
        </ul>
      </li>

      {/* Education */}
      <li className={`menu-item has-dropdown ${pathname === "/education" ? "active" : ""}`}>
        <Link to="/education" className="item-link">Education</Link>
        <ul className="dropdown-menu">
          <li><Link to="/education/diamond-guide">Diamond Guide</Link></li>
          <li><Link to="/education/jewellery-care">Jewellery Care</Link></li>
          <li><Link to="/education/blogs">Blogs</Link></li>
        </ul>
      </li>

      {/* Contact Us */}
      <li className={`menu-item ${pathname === "/contact-us" ? "active" : ""}`}>
        <Link to="/contact-us" className="item-link">Contact Us</Link>
      </li>
    </>
  );
}
