import { getUserData } from "@/api/auth";
import parseJwt from "@/utlis/jwt";
import React, { useState, useEffect } from "react";

export default function Address() {
  const [userData, setUserData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken._id) {
          const user = await getUserData(token);
          setUserData(user.user);

          // Extract address details from user data
          if (user.user.address) {
            setAddresses([
              {
                id: 1,
                houseNo: user.user.address.houseNo,
                street: user.user.address.street,
                landmark: user.user.address.landmark,
                city: user.user.address.city,
                state: user.user.address.state,
                country: user.user.address.country,
                pincode: user.user.address.pincode,
                isEditing: false,
              },
            ]);
          }
        }
      }
    };

    fetchUserData();
  }, [token]);

  const handleEditToggle = (id) => {
    setAddresses((prev) =>
      prev.map((address) =>
        address.id === id
          ? { ...address, isEditing: !address.isEditing }
          : address
      )
    );
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  return (
    <div className="my-account-content">
      <div className="account-address">
        <div className="text-center widget-inner-address">
          <button
            className="tf-btn btn-fill radius-4 mb_20 btn-address"
            onClick={() =>
              document.querySelector(".createForm").classList.toggle("d-block")
            }
          >
            <span className="text text-caption-1">Add a new address</span>
          </button>

          {/* Address List */}
          <div className="list-account-address">
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <div className="account-address-item" key={address.id}>
                  <h6 className="mb_20">Address</h6>
                  <p>{`${address.houseNo}, ${address.street}`}</p>
                  <p>{address.landmark}</p>
                  <p>{`${address.city}, ${address.state}`}</p>
                  <p>{`${address.country} - ${address.pincode}`}</p>
                  <div className="d-flex gap-10 justify-content-center">
                    <button
                      className="tf-btn radius-4 btn-fill"
                      onClick={() => handleEditToggle(address.id)}
                    >
                      {address.isEditing ? "Close" : "Edit"}
                    </button>
                    <button
                      className="tf-btn radius-4 btn-outline"
                      onClick={() => handleDelete(address.id)}
                    >
                      Delete
                    </button>
                  </div>

                  {/* Edit Address Form */}
                  {address.isEditing && (
                    <form
                      className="edit-form-address wd-form-address d-block"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="title">Edit Address</div>
                      <fieldset className="mb_20">
                        <input
                          type="text"
                          placeholder="House No"
                          defaultValue={address.houseNo}
                          required
                        />
                      </fieldset>
                      <fieldset className="mb_20">
                        <input
                          type="text"
                          placeholder="Street"
                          defaultValue={address.street}
                          required
                        />
                      </fieldset>
                      <fieldset className="mb_20">
                        <input
                          type="text"
                          placeholder="Landmark"
                          defaultValue={address.landmark}
                        />
                      </fieldset>
                      <fieldset className="mb_20">
                        <input
                          type="text"
                          placeholder="City"
                          defaultValue={address.city}
                          required
                        />
                      </fieldset>
                      <fieldset className="mb_20">
                        <input
                          type="text"
                          placeholder="State"
                          defaultValue={address.state}
                          required
                        />
                      </fieldset>
                      <fieldset className="mb_20">
                        <input
                          type="text"
                          placeholder="Country"
                          defaultValue={address.country}
                          required
                        />
                      </fieldset>
                      <fieldset className="mb_20">
                        <input
                          type="text"
                          placeholder="Pincode"
                          defaultValue={address.pincode}
                          required
                        />
                      </fieldset>
                      <div className="d-flex gap-20">
                        <button
                          type="submit"
                          className="tf-btn btn-fill radius-4"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          className="tf-btn btn-fill radius-4"
                          onClick={() => handleEditToggle(address.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))
            ) : (
              <p>No address found. Please add one.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
