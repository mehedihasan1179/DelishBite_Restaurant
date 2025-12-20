import React, { useState } from "react";
import PrimaryBtn from "../../Component/Buttons/PrimaryBtn/PrimaryBtn";
import { toast } from "react-toastify";

const Address = ({ savedAddress, setSavedAddress, setIsEditingAddress }) => {
  const [addressForm, setAddressForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [addressErrors, setAddressErrors] = useState({});

  // Validation regex (copied from Reservation.jsx)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{4}[-.\s]?\d{4}$/;

  const validateAddressField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = `${name === "firstName" ? "First" : "Last"} name is required.`;
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!emailRegex.test(value.trim())) error = "Please enter a valid email address.";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required.";
        else if (!phoneRegex.test(value.trim())) error = "Please enter a valid phone number (e.g., 123-4567-7890).";
        break;
      case "street":
        if (!value.trim()) error = "Street address is required.";
        break;
      case "city":
        if (!value.trim()) error = "City is required.";
        break;
      case "state":
        if (!value.trim()) error = "State is required.";
        break;
      case "zip":
        if (!value.trim()) error = "Zip code is required.";
        else if (!/^\d{4}$/.test(value.trim())) error = "Invalid zip code.";
        break;
      case "country":
        if (!value.trim()) error = "Country is required.";
        break;
      default:
        break;
    }
    setAddressErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
    validateAddressField(name, value);
  };

  const validateAddressForm = () => {
    let valid = true;
    Object.keys(addressForm).forEach((field) => {
      if (!validateAddressField(field, addressForm[field])) valid = false;
    });
    return valid;
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (validateAddressForm()) {
      // Construct display address string
      const displayAddress = `${addressForm.street}, ${addressForm.city}, ${addressForm.state} ${addressForm.zip}, ${addressForm.country}`;
      setSavedAddress(displayAddress);
      setIsEditingAddress(false);
      toast.success("Address saved successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Optionally reset form
      setAddressForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
    }
  };

  const isAddressActive = (field) => addressForm[field] && addressForm[field].length > 0;

  return (
    <div className="mt-40 p-4 max-w-7xl mx-auto mt-12 border-t border-[#ffd2ad] pt-4">
      <h4 className="text-lg font-semibold text-[var(--text-primary-dark)] mb-4">
        Address
      </h4>
      <form onSubmit={handleSaveAddress} noValidate>
        <div className="flex flex-wrap gap-4 mb-8 md:mb-16">
          {["firstName", "lastName"].map((name) => (
            <div key={name} className="flex-1 mb-5 lg:min-w-0 min-w-[250px] relative">
              <input
                type="text"
                id={name}
                name={name}
                value={addressForm[name]}
                onChange={handleAddressChange}
                className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                  addressErrors[name]
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[#f8c471]"
                }`}
              />
              <label
                htmlFor={name}
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                  isAddressActive(name)
                    ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                    : ""
                }`}
              >
                {name === "firstName" ? "First Name" : "Last Name"}
              </label>
              {addressErrors[name] && (
                <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                  {addressErrors[name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="relative -mt-4 md:-mt-12 mb-8">
          <input
            type="email"
            id="email"
            name="email"
            value={addressForm.email}
            onChange={handleAddressChange}
            className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
              addressErrors.email
                ? "border-red-500"
                : "border-gray-300 focus:border-[#f8c471]"
            }`}
          />
          <label
            htmlFor="email"
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
              isAddressActive("email")
                ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                : ""
            }`}
          >
            Email Address
          </label>
          {addressErrors.email && (
            <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
              {addressErrors.email}
            </p>
          )}
        </div>

        <div className="relative mb-8">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={addressForm.phone}
            onChange={handleAddressChange}
            className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
              addressErrors.phone
                ? "border-red-500"
                : "border-gray-300 focus:border-[#f8c471]"
            }`}
          />
          <label
            htmlFor="phone"
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
              isAddressActive("phone")
                ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                : ""
            }`}
          >
            Phone No.
          </label>
          {addressErrors.phone && (
            <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
              {addressErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            id="street"
            name="street"
            value={addressForm.street}
            onChange={handleAddressChange}
            className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
              addressErrors.street
                ? "border-red-500"
                : "border-gray-300 focus:border-[#f8c471]"
            }`}
          />
          <label
            htmlFor="street"
            className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
              isAddressActive("street")
                ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                : ""
            }`}
          >
            Street
          </label>
          {addressErrors.street && (
            <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
              {addressErrors.street}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {["city", "state"].map((name) => (
            <div key={name} className="flex-1 mb-5 lg:min-w-0 min-w-[250px] relative">
              <input
                type="text"
                id={name}
                name={name}
                value={addressForm[name]}
                onChange={handleAddressChange}
                className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                  addressErrors[name]
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[#f8c471]"
                }`}
              />
              <label
                htmlFor={name}
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                  isAddressActive(name)
                    ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                    : ""
                }`}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              {addressErrors[name] && (
                <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                  {addressErrors[name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap -mt-4 md:-mt-4 gap-4 mb-14">
          {["zip", "country"].map((name) => (
            <div key={name} className="flex-1 mb-5 lg:min-w-0 min-w-[250px] relative">
              <input
                type="text"
                id={name}
                name={name}
                value={addressForm[name]}
                onChange={handleAddressChange}
                className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                  addressErrors[name]
                    ? "border-red-500"
                    : "border-gray-300 focus:border-[#f8c471]"
                }`}
              />
              <label
                htmlFor={name}
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                  isAddressActive(name)
                    ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                    : ""
                }`}
              >
                {name === "zip" ? "Zip Code" : "Country"}
              </label>
              {addressErrors[name] && (
                <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                  {addressErrors[name]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap">
          <PrimaryBtn className="w-full md:w-auto flex justify-center" type="submit">
            Save Address
          </PrimaryBtn>
          <PrimaryBtn
            className="w-full md:w-auto flex justify-center"
            onClick={() => setIsEditingAddress(false)}
          >
            Cancel
          </PrimaryBtn>
        </div>
      </form>
    </div>
  );
};

export default Address;