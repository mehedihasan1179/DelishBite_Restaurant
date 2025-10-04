import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ReviewsSlider.css';

const AUTOPLAY_INTERVAL = 5000;

const reviewItems = [
  {
    "title": "Fast and Reliable",
    "text": "DelishBite never disappoints! The food is always fresh and flavorful. Highly recommend the Pepperoni Pizza.",
    "name": "john deo",
    "location": "New York, NY",
    "image": "https://randomuser.me/api/portraits/men/1.jpg",
    "rating": 4.5
  },
  {
    "title": "Amazing Taste",
    "text": "The burgers are absolutely delicious! Juicy patties and fresh ingredients make this my go-to spot.",
    "name": "sarah smith",
    "location": "Los Angeles, CA",
    "image": "https://randomuser.me/api/portraits/women/2.jpg",
    "rating": 4.5
  },
  {
    "title": "Great Service",
    "text": "Delivery was quick and food arrived hot. Customer service was excellent when I had a question.",
    "name": "mike johnson",
    "location": "Chicago, IL",
    "image": "https://randomuser.me/api/portraits/men/8.jpg",
    "rating": 4.5
  },
  {
    "title": "Best in Town",
    "text": "I've tried many food delivery services, but DelishBite stands out with their quality and consistency.",
    "name": "emily davis",
    "location": "Miami, FL",
    "image": "https://randomuser.me/api/portraits/women/12.jpg",
    "rating": 4.5
  },
  {
    "title": "Always Fresh",
    "text": "The ingredients taste so fresh! You can tell they use high-quality products in all their dishes.",
    "name": "david wilson",
    "location": "Seattle, WA",
    "image": "https://randomuser.me/api/portraits/men/6.jpg",
    "rating": 4.5
  }
];


// ⭐ Star Generation Function
const generateStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let starsHTML = [];

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML.push(<i key={`full-${i}`} className="fas fa-star"></i>);
  }
  // Half star
  if (halfStar) {
    starsHTML.push(<i key="half" className="fas fa-star-half-alt"></i>);
  }

  return starsHTML;
};

const ReviewsSlider = () => {
  // 2. Initialize state directly with local data, removing loading state
  const [reviewsData] = useState(reviewItems); 
  const [currentIndex, setCurrentIndex] = useState(0);

  // Refs to access the DOM elements for measurements
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const totalSlides = reviewsData.length;

  // --- Data Fetching (REMOVED - data is now local) ---
  /* useEffect(() => {
    // ... removed fetch call ...
  }, []); 
  */


  // --- Core Slider Logic (Remains the same) ---
  const updateSlider = useCallback(() => {
    if (totalSlides === 0 || !sliderRef.current || !containerRef.current) return;

    const slides = Array.from(sliderRef.current.children);
    if (slides.length === 0) return;
    
    const currentSlide = slides[currentIndex]; 
    if (!currentSlide) return;

    let offset = 0;
    const slideGap = 30; 

    if (window.innerWidth > 768) {
      const containerWidth = containerRef.current.offsetWidth;
      const slideWidth = currentSlide.offsetWidth + slideGap;
      
      offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
    } else {
      const slideWidth = currentSlide.offsetWidth;
      offset = -(currentIndex * (slideWidth + 20)); 
    }

    sliderRef.current.style.transform = `translateX(${offset}px)`;

  }, [currentIndex, totalSlides]);

  // --- Navigation Handlers (Remains the same) ---
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);


  // --- Update Slider on Index or Data Change (Remains the same) ---
  useEffect(() => {
    if (totalSlides > 0) { // Only run if data is loaded
      updateSlider();
    }
  }, [currentIndex, updateSlider, totalSlides]); 
  
  // --- Autoplay Timer (Remains the same) ---
  useEffect(() => {
    if (totalSlides === 0) return; // Prevent interval if no data
    let autoplayInterval = setInterval(handleNext, AUTOPLAY_INTERVAL);
    
    return () => clearInterval(autoplayInterval);
  }, [handleNext, totalSlides]); 

  // --- Window Resize Listener (Remains the same) ---
  useEffect(() => {
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]); 


  // --- Render Functions ---
  // We can simplify the loading block since loading is instant
  if (totalSlides === 0) {
    return (
      <section className="reviews-section">
        <div className="container">
          <p>No reviews available at this time.</p>
        </div>
      </section>
    );
  }

  const ReviewSlide = ({ review, index }) => (
    <div 
      className={`slide slide${index} review-reveal ${index === currentIndex ? "active" : ""}`}
    >
      <div className="user-content">
        <h3 className="title">{review.title}</h3>
        <p>"{review.text}"</p>
      </div>
      <div className="user-info">
        <div className="profile">
          <img src={review.image} alt={review.name} />
          <div className="name-location">
            <h3>{review.name}</h3>
            <span>{review.location}</span>
          </div>
          <div className="stars">
            {generateStars(review.rating)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="reviews-section">
      <div className="container services-header text-view">
        <h2>Customer Reviews</h2>
        <p>What our guests are saying about their experience.</p>
      </div>
      
      <div className="container">
        <div className="reviews-slider-container" ref={containerRef}>
          <div className="reviews-slider" ref={sliderRef}>
            {reviewsData.map((review, index) => (
              <ReviewSlide key={index} review={review} index={index} />
            ))}
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <div className="controls">
          <button id="prev-btn" onClick={handlePrev}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <button id="next-btn" onClick={handleNext}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSlider;
