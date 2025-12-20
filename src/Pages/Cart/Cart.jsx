import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMinus,
  faPlus,
  faCreditCard,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { mockMenuData } from "../../data/mockMenuData";
import "./cart.css";
import PrimaryBtn from "../../Component/Buttons/PrimaryBtn/PrimaryBtn";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Address from "../Address/Address";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Cart = ({ cartItems, setCartItems }) => {
  const [animationStates, setAnimationStates] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [activeFields, setActiveFields] = useState({
    deliveryMethod: false,
    paymentMethod: false,
    couponCode: false,
  });
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [savedAddress, setSavedAddress] = useState("123 Main St, City, Country");

  // Function to remove an item from the cart
  const removeFromCart = (itemName) => {
    setCartItems(cartItems.filter((item) => item.name !== itemName));
    toast.success(`${itemName} removed from cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to increase quantity
  const increaseQuantity = (itemName) => {
    setAnimationStates((prev) => ({ ...prev, [itemName]: "increase" }));
    setCartItems(
      cartItems.map((item) =>
        item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    setTimeout(() => {
      setAnimationStates((prev) => ({ ...prev, [itemName]: null }));
    }, 300);
  };

  // Function to decrease quantity
  const decreaseQuantity = (itemName) => {
    setAnimationStates((prev) => ({ ...prev, [itemName]: "decrease" }));
    setCartItems(
      cartItems
        .map((item) =>
          item.name === itemName && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    setTimeout(() => {
      setAnimationStates((prev) => ({ ...prev, [itemName]: null }));
    }, 300);
  };

  // Handle payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    setActiveFields((prev) => ({ ...prev, paymentMethod: !!e.target.value }));
  };

  // Handle delivery method change
  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);
    setActiveFields((prev) => ({ ...prev, deliveryMethod: !!e.target.value }));
  };

  // Handle coupon code change
  const handleCouponChange = (e) => {
    const code = e.target.value;
    setCouponCode(code);
    setActiveFields((prev) => ({ ...prev, couponCode: !!code }));
  };

  // Handle apply coupon
  const handleApplyCoupon = () => {
    const validCodes = {
      SAVE10: 10.0,
      DISCOUNT5: 5.0,
    };
    if (validCodes[couponCode] && preDiscountTotal > validCodes[couponCode]) {
      setIsCouponApplied(true);
      setAppliedCoupon(couponCode);
      toast.success(`Coupon "${couponCode}" applied!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setIsCouponApplied(false);
      setAppliedCoupon(null);
      toast.error(
        !validCodes[couponCode]
          ? "Coupon invalid: Incorrect code"
          : `Coupon invalid: Total must be over $${validCodes[couponCode]}`,
        {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setIsCouponApplied(false);
    setAppliedCoupon(null);
    setCouponCode("");
    setActiveFields((prev) => ({ ...prev, couponCode: false }));
  };

  // Handle focus for floating label
  const handleFocus = (name) => {
    setActiveFields((prev) => ({ ...prev, [name]: true }));
  };

  // Handle blur for floating label
  const handleBlur = (name) => {
    if (name === "deliveryMethod" && !deliveryMethod) {
      setActiveFields((prev) => ({ ...prev, deliveryMethod: false }));
    }
    if (name === "paymentMethod" && !paymentMethod) {
      setActiveFields((prev) => ({ ...prev, paymentMethod: false }));
    }
    if (name === "couponCode" && !couponCode) {
      setActiveFields((prev) => ({ ...prev, couponCode: false }));
    }
  };

  // Handle click on span to focus input/select
  const handleSpanClick = (name) => {
    setActiveFields((prev) => ({ ...prev, [name]: true }));
    document.getElementById(`${name}-input`)?.focus();
  };

  // Handle checkout click
  const handleCheckout = () => {
    if (!deliveryMethod || !paymentMethod) {
      toast.error("Please select delivery and payment methods", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    toast.info("Proceeding to checkout!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    console.log("Proceed to Checkout", {
      paymentMethod,
      deliveryMethod,
      couponCode: appliedCoupon,
    });
  };

  // Calculate order summary values
  const subtotal = cartItems
    .reduce((total, item) => {
      return total + parseFloat(item.price.replace("$", "")) * item.quantity;
    }, 0)
    .toFixed(2);
  const shippingFee = deliveryMethod === "Home Delivery" ? 5.0 : 0.0;
  const vat = (subtotal * 0.05).toFixed(2);
  const preDiscountTotal = parseFloat(subtotal) + shippingFee + parseFloat(vat);
  const validCodes = {
    SAVE10: 10.0,
    DISCOUNT5: 5.0,
  };
  const discount =
    isCouponApplied &&
    appliedCoupon &&
    validCodes[appliedCoupon] &&
    preDiscountTotal > validCodes[appliedCoupon]
      ? validCodes[appliedCoupon]
      : 0.0;
  const totalAmount = (preDiscountTotal - discount).toFixed(2);

  return (
    <section className="cart-section py-16 px-2 md:px-4 lg:px-8 relative">
      <div className="max-w-7xl mx-auto mt-12">
        {/* Header and Description */}
        {/* {cartItems.length === 0 ? '' : ( */}
          <div className="menu-header text-center mb-8 text-view">
            <h2 className="text-6xl md:text-[3.5rem] mb-4 text-primary-dark w-fit mx-auto relative font-satisfy transition-all duration-400">
              Your Cart
            </h2>
            <p className="my-4 text-lg text-primary-orange">
              Review your selected dishes and proceed to checkout
            </p>
          </div>
        {/* // )} */}

        {/* Cart Table */}
        {cartItems.length === 0 ? (
          <>
            <DotLottieReact
              src="https://lottie.host/1fd3b4be-a458-4859-b54f-cc5429df3aea/GykcBcc1Fk.lottie"
              loop
              autoplay
              className="-mt-20"
            />
            <p className="text-center mt-10 text-primary-dark text-2xl">Your empty cart is ready for a culinary adventure.</p>
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="!bg-[#ffd2ad] text-primary-dark">
                  <th className="px-4 py-2 text-center font-semibold">Action</th>
                  <th className="px-4 py-2 text-center font-semibold">Image</th>
                  <th className="px-4 py-2 text-center font-semibold">ID</th>
                  <th className="px-4 py-2 text-center font-semibold">Category</th>
                  <th className="px-4 py-2 text-center font-semibold">Name</th>
                  <th className="px-4 py-2 text-center font-semibold">Quantity</th>
                  <th className="px-4 py-2 text-center font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const menuItem = mockMenuData.find(
                    (menu) => menu.name === item.name
                  );
                  const category = menuItem ? menuItem.category : "Unknown";

                  return (
                    <tr
                      key={item.name}
                      className={`border-t border-[#ffd2ad] last:border-b-0 transition-colors duration-200 ${
                        index % 2 === 1
                          ? "bg-[#fffaf6] hover:bg-[#fff]"
                          : "bg-white hover:bg-[#fffaf6]"
                      }`}
                    >
                      <td className="px-4 py-2">
                        <button
                          onClick={() => removeFromCart(item.name)}
                          className="text-[var(--hover-accent)] hover:text-red-800"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </td>
                      <td className="px-4 py-2">
                        <img
                          src={item.images.main}
                          alt={item.name}
                          className="w-16 h-16 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 capitalize">{category}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">
                        <div className="flex justify-center items-center space-x-2">
                          <button
                            onClick={() => decreaseQuantity(item.name)}
                            className="text-primary-dark hover:text-primary-orange flex-shrink-0"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <div className="relative w-12 text-center">
                            <span
                              className={`quantity absolute inset-0 flex items-center justify-center font-semibold transition-all duration-300 ${
                                animationStates[item.name] === "increase"
                                  ? "slide-up"
                                  : animationStates[item.name] === "decrease"
                                  ? "slide-down"
                                  : ""
                              }`}
                            >
                              {item.quantity}
                            </span>
                            <span className="invisible font-semibold">00</span>
                          </div>
                          <button
                            onClick={() => increaseQuantity(item.name)}
                            className="text-primary-dark hover:text-primary-orange flex-shrink-0"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 w-20 text-center">
                        <div className="relative w-16">
                                  ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                        </div>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Coupon and Order Summary Row */}
        {cartItems.length === 0 ? '' : (
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Coupon Section */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md border border-[#ffd2ad]">
            <h3 className="text-2xl border-b border-[#ffd2ad] text-primary-dark font-satisfy mb-4">
             Got a code? Save on your meal!
            </h3>
            <div className="relative mb-4">
              <input
                id="couponCode-input"
                type="text"
                value={couponCode}
                onChange={handleCouponChange}
                onFocus={() => handleFocus("couponCode")}
                onBlur={() => handleBlur("couponCode")}
                className={`w-full min-h-14 p-4 border border-[#ddd] rounded-lg text-base focus:border-[#f39c12] focus:outline-none ${
                  activeFields.couponCode ? "text-gray-600 pt-6" : "text-transparent"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 text-[#696363] text-lg -translate-y-1/2 px-5 transition-all duration-400 z-10 cursor-text ${
                  activeFields.couponCode
                    ? "bg-[#e67e22] !text-white text-sm !top-0 left-4 px-1.5 py-1 rounded-[5px]"
                    : ""
                }`}
                onClick={() => handleSpanClick("couponCode")}
              >
                Coupon Code
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-2">
              <PrimaryBtn
                className="flex justify-center w-full md:w-auto"
                onClick={handleApplyCoupon}
              >
                Apply Coupon
              </PrimaryBtn>
              {isCouponApplied && (
                <PrimaryBtn
                  className="flex justify-center w-full md:w-auto"
                  onClick={handleRemoveCoupon}
                >
                  Remove Coupon
                </PrimaryBtn>
              )}
            </div>
          </div>
          {/* Order Summary Section */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md border border-[#ffd2ad]">
            <h3 className="text-2xl border-b border-[#ffd2ad] text-primary-dark font-satisfy mb-4">
              Order Summary
            </h3>
            <div className="space-y-4">
              {/* Address with Change Address Section */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-[var(--text-primary-dark)]">
                    Address
                  </h4>
                  <p className="text-gray-600">{savedAddress}</p>
                </div>
                <PrimaryBtn
                  className="flex justify-center"
                  onClick={() => setIsEditingAddress(true)}
                >
                  Change Address
                </PrimaryBtn>
              </div>

              {/* Address Form */}
              {isEditingAddress && (
                <Address
                  savedAddress={savedAddress}
                  setSavedAddress={setSavedAddress}
                  setIsEditingAddress={setIsEditingAddress}
                />
              )}

              {/* Delivery Method */}
              <div className="relative">
                <select
                  id="delivery-method"
                  name="deliveryMethod"
                  value={deliveryMethod}
                  onChange={handleDeliveryChange}
                  onFocus={() => handleFocus("deliveryMethod")}
                  onBlur={() => handleBlur("deliveryMethod")}
                  className={`w-full p-4 border border-[#ddd] rounded-lg text-base cursor-pointer focus:border-[#f39c12] focus:outline-none bg-white ${
                    activeFields.deliveryMethod ? "text-gray-600 pt-6" : "text-transparent"
                  }`}
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 15px center",
                    backgroundSize: "20px",
                  }}
                >
                  <option value="" disabled>
                    Select Delivery Method
                  </option>
                  <option value="Home Delivery">Home Delivery</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Dine-in">Dine-in</option>
                </select>
                <span
                  className={`absolute left-0 top-1/2 text-[#696363] text-lg -translate-y-1/2 px-5 transition-all duration-400 z-10 cursor-pointer ${
                    activeFields.deliveryMethod
                      ? "bg-[#e67e22] !text-white text-sm !top-0 left-4 px-1.5 py-1 rounded-[5px]"
                      : ""
                  }`}
                  onClick={() => handleSpanClick("deliveryMethod")}
                >
                  Delivery Method
                </span>
              </div>
              {/* Payment Method */}
              <div className="relative">
                <select
                  id="payment-method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handlePaymentChange}
                  onFocus={() => handleFocus("paymentMethod")}
                  onBlur={() => handleBlur("paymentMethod")}
                  className={`w-full p-4 border border-[#ddd] rounded-lg text-base cursor-pointer focus:border-[#f39c12] focus:outline-none bg-white ${
                    activeFields.paymentMethod ? "text-gray-600 pt-6" : "text-transparent"
                  }`}
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 15px center",
                    backgroundSize: "20px",
                  }}
                >
                  <option value="" disabled>
                    Select Payment Method
                  </option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
                <span
                  className={`absolute left-0 top-1/2 text-[#696363] text-lg -translate-y-1/2 px-5 transition-all duration-400 z-10 cursor-pointer ${
                    activeFields.paymentMethod
                      ? "bg-[#e67e22] !text-white text-sm !top-0 left-4 px-1.5 py-1 rounded-[5px]"
                      : ""
                  }`}
                  onClick={() => handleSpanClick("paymentMethod")}
                >
                  Payment Method
                </span>
              </div>
              {/* Price Details */}
              <div className="border-t border-[#ffd2ad] pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (5%)</span>
                  <span>${vat}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Discount Coupon</span>
                  <span>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-primary-dark mt-2 border-t border-[#ffd2ad] pt-2">
                  <span>Total Amount</span>
                  <span className="text-2xl">${totalAmount}</span>
                </div>
              </div>
              <PrimaryBtn
                className="w-full md:w-auto float-right flex justify-center"
                onClick={handleCheckout}
              >
                <FontAwesomeIcon className="mr-1" icon={faCreditCard} />
                Proceed to Checkout
              </PrimaryBtn>
            </div>
          </div>
        </div> 
      )}
        {/* Buttons */}
        {cartItems.length === 0 ? '' : (
          <div className="flex mt-8 flex-col md:flex-row justify-between gap-4 md:items-end">
            <Link to="/menu">
              <PrimaryBtn className="w-full md:w-auto flex justify-center">
                <FontAwesomeIcon className="mr-1" icon={faArrowLeft} />
                Back to Shopping
              </PrimaryBtn>
            </Link>
          </div> 
        )}


      </div>
    </section>
  );
};

export default Cart;

