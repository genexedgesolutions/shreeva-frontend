import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import AccountSidebar from "@/components/my-account/AccountSidebar";
import AccountSidebarMobile from "@/components/modals/AccountSidebarMobile";
import MetaComponent from "@/components/common/MetaComponent";
import Topbar from "@/components/headers/Topbar";
import useAuthorization from "@/hooks/userAuthorization";
import parseJwt from "@/utlis/jwt";
import {
  getUserData,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  setDefaultUserAddress,
} from "@/api/auth";

const metadata = {
  title: "My Account Address || Beaubless",
  description: "Beaubless - Hair Care and Skin Care Solution",
};

export default function MyAccountAddressPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const token = localStorage.getItem("authToken");
  const isAuthorized = useAuthorization();

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const decodedToken = parseJwt(token);
          if (decodedToken && decodedToken._id) {
            const user = await getUserData(token);
            setUserData(user?.user || null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [token]);

  const handleDelete = async (addressId) => {
    try {
      await deleteUserAddress({ userId: userData._id, addressId });
      const updatedUser = await getUserData(token);
      setUserData(updatedUser?.user);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (address) => {
    setEditAddress(address._id);
    setAddressForm(address);
    setShowModal(true);
  };

  const handleAddEdit = async (e) => {
    e.preventDefault();
    try {
      if (editAddress) {
        await updateUserAddress({
          userId: userData._id,
          addressId: editAddress,
          updatedAddress: addressForm,
        });
      } else {
        await addUserAddress({ ...addressForm, userId: userData._id });
      }
      const updatedUser = await getUserData(token);
      setUserData(updatedUser?.user);
      setShowModal(false);
      setEditAddress(null);
      setAddressForm({ houseNo: "", street: "", landmark: "", city: "", state: "", country: "", pincode: "" });
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!isAuthorized) return <Navigate to="/login" replace />;

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />

      <div className="page-title" style={{ backgroundImage: "url(/images/section/bg-2.png )" }}>
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">My Account</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li><Link className="link" to={`/`}>Homepage</Link></li>
                <li><i className="icon-arrRight" /></li>
                <li><a className="link" href="#">Pages</a></li>
                <li><i className="icon-arrRight" /></li>
                <li>My Account</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="btn-sidebar-account">
        <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
          <i className="icon icon-squares-four" />
        </button>
      </div>

      <AccountSidebarMobile />

      <section className="flat-spacing">
        <div className="container">
          <div className="my-account-wrap">
            <AccountSidebar userData={userData} />
            <div className="address-section">
              <button className=" btn-fill " onClick={() => setShowModal(true)}>
                Add Address
              </button>
              <div className="row mt_20">
                {userData?.addresses?.map((address) => (
                  <div key={address._id} className="col-md-12 mb-3">
                    <div className="card p-3">
                      <p><strong>House No:</strong> {address.houseNo}</p>
                      <p><strong>Street:</strong> {address.street}</p>
                      <p><strong>Landmark:</strong> {address.landmark}</p>
                      <p><strong>City:</strong> {address.city}</p>
                      <p><strong>State:</strong> {address.state}</p>
                      <p><strong>Country:</strong> {address.country}</p>
                      <p><strong>Pincode:</strong> {address.pincode}</p>
                      <div className="d-flex justify-content-between mt-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(address)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(address._id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{editAddress ? "Edit Address" : "Add Address"}</h4>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddEdit}>
                  {Object.entries(addressForm).map(([key, value]) => (
                    <div className="form-group" key={key}>
                      <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={value}
                        onChange={(e) => setAddressForm({ ...addressForm, [key]: e.target.value })}
                        required={key !== "landmark"}
                      />
                    </div>
                  ))}
                  <button type="submit" className="btn btn-success w-100 mt-3">{editAddress ? "Update" : "Add"} Address</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer1 />
    </>
  );
}