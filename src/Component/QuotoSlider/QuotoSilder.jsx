import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import BACKGROUND_IMAGE from "../../../assets/quotobg02.jpg";

const quotes = [
  {
    id: 1,
    text: "The main facts in human life are five: birth, food, sleep, love and death.",
    author: "E. M. Forster",
  },
  {
    id: 2,
    text: "The discovery of a new dish does more for the happiness of the human race than the discovery of a star.",
    author: "Steve Jean Anthelme Brillat-Savarin",
  },
  {
    id: 3,
    text: "Whoever thought a tiny candy bar should be called fun size was a moron.",
    author: "Glenn Beck",
  },
  { id: 4, 
    text: "After a good dinner one can forgive anybody, even one's own relations.", 
    author: "Oscar Wilde, A Woman of No Importance" 
  },
];

const PARALLAX_SHIFT = 50;

// const IMAGE_OVERFLOW_PERCENT = 170;

const IMAGE_OVERFLOW_PERCENT_SM = 170;
const IMAGE_OVERFLOW_PERCENT_LG = 125;

const FADE_DURATION = 300;

const QuoteSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [bgPositionX, setBgPositionX] = useState(0);

  const [screenSizePercent, setScreenSizePercent] = useState(
    IMAGE_OVERFLOW_PERCENT_SM
  );

  const totalQuotes = quotes.length;
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === totalQuotes - 1;

  useEffect(() => {
    if (currentIndex !== displayIndex) {
      setIsFading(true);

      const timer = setTimeout(() => {
        setDisplayIndex(currentIndex);
        setIsFading(false);
      }, FADE_DURATION);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, displayIndex]);

  useEffect(() => {
    const LG_BREAKPOINT = 1024;

    const handleResize = () => {
      const newPercent =
        window.innerWidth >= LG_BREAKPOINT
          ? IMAGE_OVERFLOW_PERCENT_LG
          : IMAGE_OVERFLOW_PERCENT_SM;

      if (newPercent !== screenSizePercent) {
        setScreenSizePercent(newPercent);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSizePercent]);

  const nextSlide = () => {
    if (isLastSlide) return;

    setCurrentIndex(currentIndex + 1);
    setBgPositionX(bgPositionX - PARALLAX_SHIFT);
  };

  const prevSlide = () => {
    if (isFirstSlide) return;

    setCurrentIndex(currentIndex - 1);
    setBgPositionX(bgPositionX + PARALLAX_SHIFT);
  };

  const currentQuote = quotes[displayIndex];

  const parallaxStyle = {
    backgroundImage: `url('${BACKGROUND_IMAGE}')`,
    // backgroundSize: "cover",
    backgroundSize: `${screenSizePercent}% 100%`,
    backgroundPosition: `calc(50% + ${bgPositionX}px) center`,
    backgrounRepeat: "no-repeat",
    transition: "background-position 0.5s ease-out",
  };

  const contentOpacityClass = isFading ? "opacity-0" : "opacity-100";

  return (
    <>
      <h2
        className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
hover:scale-[1.05] cursor-pointer transform text-center mx-auto
after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110"
      >
        Insightful Thoughts
      </h2>
      <div
        className="w-[calc(100%_-_1rem)] md:w-[calc(100%_-_2rem)] max-w-7xl mx-auto my-12 min-h-[400px]
 p-4 sm:p-6 md:p-8 lg:p-10 mb-32
 shadow-xl rounded-md text-center relative
 text-white"
        style={parallaxStyle}
      >
        {/* Overlay to improve quote readability against the image */}
        <div className="absolute inset-0 bg-black opacity-40 rounded-md z-10"></div>
        {/* Quote Content - Added Opacity Control */}
        <div
          className={`min-h-[40vh] mb-6 flex flex-col justify-center relative z-20 transition-opacity duration-[${FADE_DURATION}ms] ${contentOpacityClass}`}
        >
          <p className="text-4xl md:text-5xl lg:text-6xl w-[85%] mx-auto italic mb-4">
            "{currentQuote.text}"
          </p>
          <p className="font-bold text-lg text-yellow-300">
            - {currentQuote.author}
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center w-full z-20">
          {/* Previous Button (Left) */}
          <button
            onClick={prevSlide}
            disabled={isFirstSlide}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-[var(--text-primary-dark)] text-white text-md md:text-xl -ml-4 md:-ml-5 lg:-ml-6 p-1 md:p-2 lg:p-3 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10 
${isFirstSlide ? "opacity-40 cursor-not-allowed" : ""}
`}
            aria-label="Previous quote"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          {/* Next Button (Right) */}
          <button
            onClick={nextSlide}
            disabled={isLastSlide}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-[var(--text-primary-dark)] text-white text-md md:text-xl -mr-4 md:-mr-5 lg:-mr-6 p-1 md:p-2 lg:p-3 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10 
 ${isLastSlide ? "opacity-40 cursor-not-allowed" : ""}
`}
            aria-label="Next quote"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default QuoteSlider;
