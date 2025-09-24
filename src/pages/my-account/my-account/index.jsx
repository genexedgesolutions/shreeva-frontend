import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar6 from "@/components/headers/Topbar6";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import Information from "@/components/my-account/Information";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import useAuthorization from "@/hooks/userAuthorization";
import Topbar from "@/components/headers/Topbar";
import { getUserData } from "@/api/auth";
import parseJwt from "@/utlis/jwt";
import AccountSidebarMobile from "@/components/modals/AccountSidebarMobile";
const metadata = {
  title: "My Account || Beaubless",
  description: "Beaubless - Hair Care and Skin Care Solution",
};

export default function MyAccountPage() {
  const isAuthorized = useAuthorization();
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          const user = await getUserData(token);
          setUserData(user.user);
        }
      }
    };

    fetchUserData();
  }, [token]);
  if (isAuthorized === null) {
    return <div>Loading...</div>; // Avoids redirection before auth check completes
  }
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <>
        {/* page-title */}
        <div
          className="page-title"
          style={{ backgroundImage: "url(/images/section/bg-2.png )" }}
        >
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-center">My Account</h3>
                <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                  <li>
                    <Link className="link" to={`/`}>
                      Homepage
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>
                    <a className="link" href="#">
                      Pages
                    </a>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>My Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /page-title */}
        <div className="btn-sidebar-account">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-squares-four" />
          </button>
        </div>
      </>
      <AccountSidebarMobile />

      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap">
            <AccountSidebar userData={userData} />
            <Information userData={userData} />
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
