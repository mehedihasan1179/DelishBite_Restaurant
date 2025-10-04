import React, { useState, useEffect, useCallback } from 'react';
import PrimaryButton from '../../pages/PrimaryButton';
import './foodcarousel.css'; 
import burgerImg from '../../assets/hero-images/burger.png';
import tacoImg from '../../assets/hero-images/taco.png';
import pizzaImg from '../../assets/hero-images/pizza.png';
import chickenFryImg from '../../assets/hero-images/chicken-fry.png';

const carouselItems = [
  {
    title: "The Stacked Flavor Fortress",
    price: "$ 50",
    description: "A towering masterpiece of savory delight, with each layer a fresh burst of flavor. It features multiple juicy patties, molten cheese, and a fresh array of crisp vegetables.",
    imageSrc: burgerImg,
    style: { background: "transparent" }
  },
  {
    title: "Taco Verde Vortex",
    price: "$ 40",
    description: "Ready for a flavor explosion? Sink your teeth into a crispy shell bursting with spiced meat, fresh lettuce, and ripe tomatoes. Topped with a zesty salsa, this dish is an absolute essential, and it's ready to be delivered straight to you!",
    imageSrc: tacoImg,
    style: {}
  },
  {
    title: "The Pepperoni Party",
    price: "$ 30",
    description: "Dive into our pepperoni pizza, loaded with stretchy mozzarella and fiery pepperoni, just waiting for you to take a bite. It's the ultimate treat for the taste buds, ready to be enjoyed right now. Order today and get your slice of happiness!",
    imageSrc: pizzaImg,
    style: {}
  },
  {
    title: "Spicy Crunch Inferno",
    price: "$ 20",
    description: "Feeling adventurous? Get ready for a fiery crunch! Our crispy chicken is tossed in a perfect blend of spices, delivering a taste that will ignite the senses. This explosive flavor is ready to be delivered hot and fresh.",
    imageSrc: chickenFryImg,
    style: { height: 'calc(60% + 40px)' }
  }
];

const AUTO_PLAY_INTERVAL = 5000;

const FoodCarousel = () => {
  const countItem = carouselItems.length;
  const [activeIndex, setActiveIndex] = useState(0); // Start from 0 instead of 1
  
  const other_1 = (activeIndex - 1 + countItem) % countItem;
  const other_2 = (activeIndex + 1) % countItem;

  const nextSlide = useCallback(() => {
    setActiveIndex(prevIndex => (prevIndex + 1) % countItem);
  }, [countItem]);
  
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };
  
  const getItemClassName = (index) => {
    let className = 'item';
    
    if (index === activeIndex) {
      className += ' active';
    } else if (index === other_1) {
      className += ' other_1';
    } else if (index === other_2) {
      className += ' other_2';
    }
    // All other items will just have class 'item' (hidden by default)
    return className;
  };

  // AutoPlay logic
  useEffect(() => {
    const autoPlay = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(autoPlay);
  }, [nextSlide]);
  
  // Animation Reset logic
  useEffect(() => {
    const items = document.querySelectorAll(".carousel .item");
    if (items.length) {
      items.forEach((item) => {
        const img = item.querySelector(".image img");
        const caption = item.querySelector(".image figcaption");

        if (img && caption) {
          img.style.animation = 'none';
          caption.style.animation = 'none';
          void img.offsetWidth;
          img.style.animation = '';
          caption.style.animation = '';
        }
      });
    }
  }, [activeIndex]);

  return (
    <section className="carousel next">
      <div className="list">
        {carouselItems.map((item, index) => (
          <article 
            key={index} 
            className={getItemClassName(index)}
          >
            <div className="main-content">
              <div className="content">
                <h2>{item.title}</h2>
                <p className="price">{item.price}</p>
                <p className="description">{item.description}</p>
                <PrimaryButton className="hero-btn">Add To Card</PrimaryButton>
              </div>
            </div>
            <figure className="image">
              <img
                src={item.imageSrc} 
                alt={item.title}
                style={item.style}
              />
              <figcaption>{item.title}</figcaption>
            </figure>
          </article>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="dots">
        {carouselItems.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? 'active-dot' : ''}`}
            data-index={index}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default FoodCarousel;