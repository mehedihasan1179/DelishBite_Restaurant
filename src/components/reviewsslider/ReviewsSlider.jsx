import React, { useState, useEffect, useRef, useCallback } from 'react';
import './reviewsslider.css';

const AUTOPLAY_INTERVAL = 5000;

// ⭐ Star Generation Function (Moved into the component or a utility)
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
  const [reviewsData, setReviewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Refs to access the DOM elements for measurements
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const totalSlides = reviewsData.length;

  // --- 1. Data Fetching (Replaces fetch in DOMContentLoaded) ---
  useEffect(() => {
    fetch("../../../reviews.json")
      .then((response) => response.json())
      .then((data) => {
        setReviewsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading reviews data:", error);
        setLoading(false);
      });
  }, []);

  // --- Core Slider Logic (Replaces the updateSlider function) ---
  const updateSlider = useCallback(() => {
    if (totalSlides === 0 || !sliderRef.current || !containerRef.current) return;

    // We must find the slide width dynamically, using a child element
    const slides = Array.from(sliderRef.current.children);
    if (slides.length === 0) return;
    
    // Get the first slide's dimensions to determine all slide sizes (assuming uniform width)
    const currentSlide = slides[currentIndex]; 
    if (!currentSlide) return; // Safety check

    let offset = 0;
    
    // Find computed style for margin/gap (assuming 30px from your original logic)
    // In a real project, you'd pull this from a CSS variable if possible.
    const slideGap = 30; 

    if (window.innerWidth > 768) {
      const containerWidth = containerRef.current.offsetWidth;
      const slideWidth = currentSlide.offsetWidth + slideGap;
      
      // Calculation for centering the active slide
      offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
    } else {
      const slideWidth = currentSlide.offsetWidth;
      // Calculation for left-aligning (mobile)
      offset = -(currentIndex * (slideWidth + 20)); // Assuming 20px gap on mobile
    }

    // Apply the transformation
    sliderRef.current.style.transform = `translateX(${offset}px)`;

  }, [currentIndex, totalSlides]);

  // --- Navigation Handlers (Replaces handleNext/handlePrev) ---
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);


  // --- 2. Update Slider on Index or Data Change ---
  // Runs updateSlider whenever the active index changes or data loads
  useEffect(() => {
    // We update the transform style directly here
    updateSlider();
  }, [currentIndex, updateSlider, totalSlides]); 
  
  // --- 3. Autoplay Timer (Replaces startAutoplay) ---
  useEffect(() => {
    let autoplayInterval = setInterval(handleNext, AUTOPLAY_INTERVAL);
    
    // Cleanup function: clears the interval when the component unmounts or state changes
    return () => clearInterval(autoplayInterval);
  }, [handleNext]); 

  // --- 4. Window Resize Listener (Replaces window.addEventListener("resize")) ---
  useEffect(() => {
    window.addEventListener("resize", updateSlider);

    // Cleanup function: removes the listener when the component unmounts
    return () => window.removeEventListener("resize", updateSlider);
  }, [updateSlider]); 


  // --- Render Functions ---
  if (loading) {
    return (
      <section className="reviews-section">
        <div className="container">
          <p>Loading customer reviews...</p>
        </div>
      </section>
    );
  }

  const ReviewSlide = ({ review, index }) => (
    // Use an index-specific class for the CSS 'slide' selector
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
        <h2>Customer Reviews</h2> {/* Assuming this section is for reviews */}
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
