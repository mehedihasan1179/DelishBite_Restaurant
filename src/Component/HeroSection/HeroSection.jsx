import React, { useState, useEffect, useCallback } from "react";
// import PrimaryButton from '../../pages/PrimaryButton';
// Import the new custom CSS file
import "./heroSection.css";
import burgerImg from "../../../assets/hero-images/burger.png";
import tacoImg from "../../../assets/hero-images/taco.png";
import pizzaImg from "../../../assets/hero-images/pizza.png";
import chickenFryImg from "../../../assets/hero-images/chicken-fry.png";

const carouselItems = [
  {
    title: "The Stacked Flavor Fortress",
    price: "$ 50",
    description:
      "A towering masterpiece of savory delight, with each layer a fresh burst of flavor. It features multiple juicy patties, molten cheese, and a fresh array of crisp vegetables.",
    imageSrc: burgerImg,
    style: { background: "transparent" },
  },
  {
    title: "Taco Verde Vortex",
    price: "$ 40",
    description:
      "Ready for a flavor explosion? Sink your teeth into a crispy shell bursting with spiced meat, fresh lettuce, and ripe tomatoes. Topped with a zesty salsa, this dish is an absolute essential, and it's ready to be delivered straight to you!",
    imageSrc: tacoImg,
    style: {},
  },
  {
    title: "The Pepperoni Party",
    price: "$ 30",
    description:
      "Dive into our pepperoni pizza, loaded with stretchy mozzarella and fiery pepperoni, just waiting for you to take a bite. It's the ultimate treat for the taste buds, ready to be enjoyed right now. Order today and get your slice of happiness!",
    imageSrc: pizzaImg,
    style: {},
  },
  {
    title: "Spicy Crunch Inferno",
    price: "$ 20",
    description:
      "Feeling adventurous? Get ready for a fiery crunch! Our crispy chicken is tossed in a perfect blend of spices, delivering a taste that will ignite the senses. This explosive flavor is ready to be delivered hot and fresh.",
    imageSrc: chickenFryImg,
    style: { height: "calc(60% + 40px)" },
  },
];

const AUTO_PLAY_INTERVAL = 6000;

const HeroSection = () => {
  const countItem = carouselItems.length;
  const [activeIndex, setActiveIndex] = useState(0);

  const other_1 = (activeIndex - 1 + countItem) % countItem;
  const other_2 = (activeIndex + 1) % countItem;
  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % countItem);
  }, [countItem]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const getItemClassName = (index) => {
    let className = "item";

    if (index === activeIndex) {
      className += " active";
    } else if (index === other_1) {
      className += " other-1";
    } else if (index === other_2) {
      className += " other-2";
    }
    className += ` item-${index + 1}`;

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
          img.style.animation = "none";
          caption.style.animation = "none";
          void img.offsetWidth;
          img.style.animation = "";
          caption.style.animation = "";
        }
      });
    }
  }, [activeIndex]);

  return (
    <section className="carousel mt-[var(--navbar-height)] w-full h-[93vh] overflow-hidden relative z-0 next">
      <div className="list h-full relative">
        {carouselItems.map((item, index) => (
          <article key={index} className={getItemClassName(index)}>
            <div className="main-content h-full">
              <div className="content px-5 pt-[150px] pb-5 lg:pl-20 sm:px-5 sm:pt-[30px] sm:pb-5 text-center sm:text-left">
                <h2>{item.title}</h2>

                <p className="price text-[#333] font-aboreto text-5xl my-5 sm:text-[3em] sm:my-5 sm:m-0">
                  {item.price}
                </p>
                <p className="description text-[#333] mb-5">
                  {item.description}
                </p>
                {/* PrimaryButton (assuming it uses Tailwind internally) */}
                {/* <PrimaryButton className="hero-btn mt-5 px-4 py-2 text-base">Add To Card</PrimaryButton> */}
              </div>
            </div>
            {/* Image container. Uses custom CSS for exact positioning and size */}
            <figure className="image flex flex-col justify-end items-center font-medium p-5">
              <img
                src={item.imageSrc}
                alt={item.title}
                style={item.style}
                className="w-[90%] h-[55%] mb-5"
              />
              <figcaption>{item.title}</figcaption>
            </figure>
          </article>
        ))}
      </div>

      {/* <div class="dots absolute left-0 bottom-5 w-full flex justify-start gap-2 md:mx-5">
                {carouselItems.map((_, index) => (
                    <span
                        key={index}
                        className={`dot inline-block w-4 h-4 transparent border mx-1 border-gray-700 rounded-full cursor-pointer transition duration-300 ease z-[99] ${index === activeIndex ? 'active-dot' : ''}`}
                        data-index={index}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div> */}

      <div className="dots absolute left-0 bottom-5 w-full flex justify-start gap-2 md:px-5 lg:px-[70px] z-50">
        {carouselItems.map((_, index) => (
          <div
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
        cursor-pointer rounded-full transition-all duration-300
        ${
          index === activeIndex
            ? "w-8 md:w-10 lg:w-12 h-2 md:h-3 lg:h-4 hero-indicator-active bg-[#bdc3c7]"
            : "w-2 md:w-3 lg:w-4 h-2 md:h-3 lg:h-4 bg-[#bdc3c7]"
        }
      `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
