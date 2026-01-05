import React, { useEffect, useState, useRef } from "react";
import "./menuitemdetails.css";
import { Link, useParams } from "react-router-dom";
import { mockMenuData } from "../../data/mockMenuData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import PrimaryBtn from "../../Component/Buttons/PrimaryBtn/PrimaryBtn";
import { ToastContainer, toast, Flip } from "react-toastify";

const MenuItemDetails = () => {
  const [animationStates, setAnimationStates] = useState("");
  const [showCounter, setShowCounter] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const imageWrapperRef = useRef(null);
  const [activeTab, setActiveTab] = useState("description");
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("auto");

  const { name } = useParams();
  const item = mockMenuData.find(
    (menu) => menu.name === decodeURIComponent(name)
  );

  if (!item) {
    return <p className="text-center text-2xl mt-20">Item not found</p>;
  }
  const [activeImage, setActiveImage] = useState(item.images.main);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => {
      setCart([...window.cart]);
    };
    window.addEventListener("cartUpdated", handler);

    if (contentRef.current) {
      const activeContent = contentRef.current.querySelector(
        `.tab-content-${activeTab}`
      );
      if (activeContent) {
        setContentHeight(`${activeContent.scrollHeight}px`);
      }
    }

    return () => {
      window.removeEventListener("cartUpdated", handler);
    };
  }, [activeTab, item]);

  const relatedItems = mockMenuData
    .filter(
      (menuItem) =>
        menuItem.category === item.category && menuItem.name !== item.name
    )
    .slice(0, 8);

  const increase = () => {
    setAnimationStates({ [item.name]: "increase" });
    const newQty = quantity + 1;
    setQuantity(newQty);

    window.updateCartQuantity(item.name, newQty);

    setTimeout(() => {
      setAnimationStates("");
    }, 300);
  };

  const decrease = () => {
    if (quantity === 1) {
      window.removeFromCart(item.name);
      setShowCounter(false);
      setQuantity(1);
      toast.error(`${itemName} removed from cart!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      transition: Flip,
      draggable: true,
    });
      return;
    }

    setAnimationStates({ [item.name]: "decrease" });
    const newQty = quantity - 1;
    setQuantity(newQty);
    window.updateCartQuantity(item.name, newQty);

    setTimeout(() => {
      setAnimationStates("");
    }, 300);
  };

  const handleMouseEnter = () => {
    const elem = imageWrapperRef.current;
    const rect = elem.getBoundingClientRect();

    elem.dataset.x = rect.x;
    elem.dataset.y = rect.y;
    elem.dataset.width = rect.width;
    elem.dataset.height = rect.height;
  };

  const handleMouseMove = (e) => {
    const elem = imageWrapperRef.current;

    const x = elem.dataset.x;
    const y = elem.dataset.y;
    const width = elem.dataset.width;
    const height = elem.dataset.height;

    const horizontal = ((e.clientX - x) / width) * 100;
    const vertical = ((e.clientY - y) / height) * 100;

    elem.style.setProperty("--x", `${horizontal}%`);
    elem.style.setProperty("--y", `${vertical}%`);
  };

  const addToCart = () => {
    setShowCounter(true);
    setQuantity(1);
    setAnimationStates({ [item.name]: "increase" });

    window.addToCart({
      ...item,
      quantity: 1,
    });

    setTimeout(() => {
      setAnimationStates("");
    }, 300);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <section className="max-w-7xl mx-auto py-24 px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT – Image */}
        <div className="w-full p-2 rounded-xl shadow-lg transform">
          <div
            ref={imageWrapperRef}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[450px] rounded-xl overflow-hidden cursor-zoom-in"
          >
            <img
              src={activeImage}
              alt={item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out [transform:scale(var(--zoom,1))] [transform-origin:var(--x)_var(--y)] hover:[--zoom:3]"
            />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] gap-2 mt-4">
            {[item.images.main, ...item.images.gallery].map((img, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveImage(img)}
                className={`cursor-pointer border-2 rounded-lg overflow-hidden w-24 h-20
                  ${
                    activeImage === img
                      ? "border-primary-dark"
                      : "border-transparent hover:border-primary-dark"
                  }
                `}
              >
                <img
                  src={img}
                  alt={`thumbnail-${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT – Content */}
        <div className="flex flex-col gap-6">
          <h2 className="text-5xl font-satisfy text-primary-dark">
            {item.name}
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            {item.description.shortDes}
          </p>

          <p className="text-3xl font-bold text-primary-orange">{item.price}</p>

          <div>Ratings</div>

          {!showCounter ? (
            <PrimaryBtn onClick={addToCart} className="w-fit">
              Add to Cart
            </PrimaryBtn>
          ) : (
            <div className="flex items-center justify-between gap-6 mt-6">
              <div className="flex items-center justify-between border border-[#eb8c07] rounded-lg h-[50px] w-36 px-4 py-3 -mt-6 min-w-[144px]">
                <button
                  onClick={decrease}
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
                    key={quantity}
                  >
                    {quantity}
                  </span>
                  <span className="invisible font-semibold">00</span>
                </div>

                <button
                  onClick={increase}
                  className="text-primary-dark hover:text-primary-orange flex-shrink-0"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mt-16">
        {/* Tabs */}
        <div className="flex bg-[#ffd2ad]">
          <button
            onClick={() => setActiveTab("description")}
            className={`w-32 h-12 flex items-center justify-center
      font-semibold transition-colors duration-300
      border-b-2
      ${
        activeTab === "description"
          ? "text-primary-dark border-primary-dark"
          : "text-gray-800 border-transparent hover:text-orange-400"
      }`}
          >
            Description
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`w-32 h-12 flex items-center justify-center
      font-semibold transition-colors duration-300
      border-b-2
      ${
        activeTab === "reviews"
          ? "text-primary-dark border-primary-dark"
          : "text-gray-800 border-transparent hover:text-orange-400"
      }`}
          >
            Reviews
          </button>
        </div>

        {/* Content Container with fixed height */}
        <div
          className="relative overflow-hidden mt-6 transition-all duration-500 ease-in-out"
          style={{ height: contentHeight }}
          ref={contentRef}
        >
          {/* Description Tab */}
          <div
            className={`tab-content-description absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
              activeTab === "description"
                ? "opacity-100 visible translate-x-0"
                : "opacity-0 invisible -translate-x-4"
            }`}
          >
            <p className="text-gray-800 text-lg">{item.description.fullDes}</p>
          </div>

          {/* Reviews Tab */}
          <div
            className={`tab-content-reviews absolute top-0 left-0 w-full transition-all duration-500 ease-in-out ${
              activeTab === "reviews"
                ? "opacity-100 visible translate-x-0"
                : "opacity-0 invisible translate-x-4"
            }`}
          >
            {item.reviews && item.reviews.length > 0 ? (
              <div className="space-y-6">
                {item.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-300 pb-6 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-text-gray-800 text-lg">
                          {review.user}
                        </h4>
                        <span className="text-sm text-gray-600">
                          {review.date}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-xl">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                        <span className="ml-2 text-sm text-gray-600">
                          ({review.rating}/5)
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="">
                <p className="text-gray-600 text-lg">
                  No reviews yet. Be the first one to review this item!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {relatedItems.length > 0 && (
        <div className="mt-24">
          <h3 className="text-4xl font-satisfy text-primary-dark text-center mb-12">
            You Might Also Like
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedItems.map((suggestedItem) => (
              <Link
                key={suggestedItem.name}
                to={`/menu/${encodeURIComponent(suggestedItem.name)}`}
                className="block"
              >
                <div className="menu-item suggested-card cursor-pointer">
                  <div className="menu-item-img-wrapper !h-[300px] relative">
                    <img
                      src={suggestedItem.images.main}
                      alt={suggestedItem.name}
                      className="menu-item-img w-full h-full object-cover rounded-lg"
                    />
                    <div
                      className="card-front-overlay absolute bottom-[15px] left-[15px] right-[15px] 
                              flex justify-between items-center p-2 rounded-lg text-white font-semibold bg-black bg-opacity-40"
                    >
                      <span className="front-name text-[1.3rem] text-primary-dark font-satisfy drop-shadow-lg">
                        {suggestedItem.name}
                      </span>
                      <span className="front-price font-bold text-[1.1rem] text-white drop-shadow-md">
                        {suggestedItem.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuItemDetails;



