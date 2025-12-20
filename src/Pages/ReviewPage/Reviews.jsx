import React, { useState, useEffect, useRef } from "react";
import "./reviews.css";
import QuotoSlider from "../../Component/QuotoSlider/quotoSilder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const reviewsData = [
  {
    title: "Fast and Reliable",
    text: "DelishBite never disappoints! The food is always fresh and flavorful. Highly recommend the Pepperoni Pizza.",
    name: "john deo",
    location: "New York, NY",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4.5,
  },
  {
    title: "Amazing Taste",
    text: "The burgers are absolutely delicious! Juicy patties and fresh ingredients make this my go-to spot.",
    name: "sarah smith",
    location: "Los Angeles, CA",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.5,
  },
  {
    title: "Great Service",
    text: "Delivery was quick and food arrived hot. Customer service was excellent when I had a question.",
    name: "mike johnson",
    location: "Chicago, IL",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    rating: 4.5,
  },
  {
    title: "Best in Town",
    text: "I've tried many food delivery services, but DelishBite stands out with their quality and consistency.",
    name: "emily davis",
    location: "Miami, FL",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 4.5,
  },
  {
    title: "Always Fresh",
    text: "The ingredients taste so fresh! You can tell they use high-quality products in all their dishes.",
    name: "david wilson",
    location: "Seattle, WA",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 4.5,
  },
];

const TOTAL_SLIDES = reviewsData.length;
const AUTOPLAY_DELAY = 5000;

const Star = ({ type }) => (
  <FontAwesomeIcon
    icon={type === "half" ? faStarHalfAlt : faStar}
    className="text-[#ffd65b]"
  />
);

const generateStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let starsHTML = [];

  for (let i = 0; i < fullStars; i++) {
    starsHTML.push(<Star key={`full-${i}`} type="full" />);
  }

  if (halfStar) {
    starsHTML.push(<Star key="half" type="half" />);
  }

  return starsHTML;
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const slideRefs = useRef([]);

  const updateSlider = () => {
    if (!sliderRef.current || !slideRefs.current[currentIndex]) return;

    let offset = 0;
    const currentSlide = slideRefs.current[currentIndex];

    if (!currentSlide) return;

    if (window.innerWidth > 768) {
      const containerWidth = sliderRef.current.parentElement.offsetWidth;
      const slideWidth = currentSlide.offsetWidth + 30;
      offset = containerWidth / 2 - slideWidth / 2 - currentIndex * slideWidth;
    } else {
      const slideMargin = 20;
      const slideWidth = currentSlide.offsetWidth;
      offset = -(currentIndex * (slideWidth + slideMargin));
    }

    sliderRef.current.style.transform = `translateX(${offset}px)`;
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TOTAL_SLIDES);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + TOTAL_SLIDES) % TOTAL_SLIDES
    );
  };

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);

    const autoplayInterval = setInterval(handleNext, AUTOPLAY_DELAY);

    return () => {
      clearInterval(autoplayInterval);
      window.removeEventListener("resize", updateSlider);
    };
  }, [currentIndex]);

  return (
    <section className="review-section py-24 px-4 text-center">
      <QuotoSlider />
      <div className="container mx-auto h-full">
        <h2 className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110">
        User Feedback
      </h2>
        <p className="text-lg text-[#ff7e00] mb-16">
          We genuinely value every thought shared by our users to drive our
          continuous innovation and improvement.
        </p>

        <div className="reviews-slider-container relative overflow-hidden py-10 my-10 min-h-[480px]">
          <div
            className="reviews-slider flex will-change-transform"
            ref={sliderRef}
          >
            {reviewsData.map((review, index) => (
              <div
                key={index}
                ref={(el) => (slideRefs.current[index] = el)}
                className={`slide flex-shrink-0 bg-[#eee2d6] rounded-xl shadow-lg p-6 mx-[15px] ${
                  currentIndex === index ? "active" : ""
                }`}
                style={{
                  flex: "0 0 300px",
                  ...(currentIndex === index &&
                    window.innerWidth > 768 && { flex: "-1 0 350px" }),
                }}
              >
                <div className="user-content text-center mb-5">
                  <h3 className="title text-xl text-[#2c3e50] mb-4 font-semibold">
                    {review.title}
                  </h3>
                  <p className="text-[#6c757d] px-2 leading-relaxed text-base italic">
                    "{review.text}"
                  </p>
                </div>
                <div className="user-info flex justify-center items-center mt-5">
                  <div className="profile flex flex-col items-center justify-center">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mb-2 border-3 border-[#e9ecef]"
                    />
                    <div className="name-location text-center">
                      <h3 className="mt-1 mb-0 text-[#2c3e50] text-lg leading-tight capitalize">
                        {review.name}
                      </h3>
                      <span className="text-[#6c757d] text-sm">
                        {review.location}
                      </span>
                    </div>
                    {/* The array of star components is rendered here */}
                    <div className="stars my-4 flex space-x-1">
                      {generateStars(review.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ⬅️ Controls ➡️ */}
        {/* <div className="controls flex justify-center mt-8 gap-4"> */}
        {/* <button 
            id="prev-btn" 
            onClick={handlePrev}
            className="bg-[#ffc30e] text-white w-10 h-10 rounded-full text-xl cursor-pointer flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition duration-300"
            aria-label="Previous review"
          > */}
        {/* <button 
            id="prev-btn" 
            onClick={handlePrev}
            className="flex items-center justify-center bg-[var(--text-primary-dark)] !text-white text-xl p-2 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:!border-[var(--text-primary-dark)] hover:!text-[var(--text-primary-dark)] z-10"
            aria-label="Previous review"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button 
            id="next-btn" 
            onClick={handleNext}
            className="flex items-center justify-center bg-[var(--text-primary-dark)] !text-white text-xl p-2 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:!border-[var(--text-primary-dark)] hover:!text-[var(--text-primary-dark)] z-10"
            aria-label="Next review"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button> */}
        {/* </div> */}

        {/* 🔘 Indicators 🔘 */}
        {/* <div className="indicators flex justify-center -mt-8 gap-2">
          {reviewsData.map((_, index) => (
            <div 
              key={`indicator-${index}`} 
              className={`indicator space-x-2 rounded-full cursor-pointer transition duration-300 ${currentIndex === index ? 'w-6 h-2 bg-[var(--text-primary-dark)] scale-125' : 'w-2 h-2 bg-[#bdc3c7]'}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to review ${index + 1}`}
            ></div>
          ))}
        </div>
      </div> */}
        {/* 🔘 Indicators with Progress Bar Animation 🔘 */}
        <div className="indicators flex justify-center mt-5 gap-2">
          {reviewsData.map((_, index) => (
            <div
              key={`indicator-${index}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              className={`
                        indicator rounded-full cursor-pointer transition-all duration-300 overflow-hidden
                        ${
                          currentIndex === index
                            ? "w-8 h-2 indicator-active-container relative before:content-['']                           before:absolute before:top-0 before:left-0 before:h-full before:rounded-full before:z-10 indicator-fill-primary"
                            : "w-2 h-2 bg-[#bdc3c7]"
                        }
                    `}
            >
              {currentIndex === index && (
                <div className="absolute inset-0 bg-[#bdc3c7] rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
