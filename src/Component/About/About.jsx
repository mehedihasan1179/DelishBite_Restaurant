import React, { useState, useRef, useEffect } from "react";
import "./about.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import PrimaryBtn from "../Buttons/PrimaryBtn/PrimaryBtn";
import TeamSection from "../TeamSection/TeamSection";

const imageList = [
  { id: 1, 
    src: "./assets/set-menu_1.jpg", 
    alt: "Restaurant 1", 
    size: "large" 
  },
  {
    id: 2,
    src: "./assets/set-menu_2.avif",
    alt: "Restaurant 2",
    size: "small",
  },
  { id: 3, 
    src: "./assets/set-menu_3.jpg", 
    alt: "Restaurant 3", 
    size: "small" 
  },
  {
    id: 4,
    src: "./assets/set-menu_4.avif",
    alt: "Restaurant 4",
    size: "large",
  },
];

const About = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [modalMemberName, setModalMemberName] = useState("");
  const [isTeamImage, setIsTeamImage] = useState(false);
  const zoomRef = useRef(null);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = modalImageSrc;
    if (isTeamImage && modalMemberName) {
      const filename = `${modalMemberName
        .replace(/\s+/g, "-")
        .toLocaleLowerCase()}.jpg`;
      link.download = filename;
    } else {
      link.download = "member-image.jpg";
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openModal = (src, isTeam = false, memberName = "") => {
    setModalImageSrc(src);
    setModalOpen(true);
    setIsZoomed(false);
    setIsTeamImage(isTeam);
    setModalMemberName(memberName);

    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageSrc("");
    setModalMemberName("");
    setIsTeamImage(false);

    setIsZoomed(false);

    document.body.classList.remove("modal-open");
  };

  const [offsetY, setOffsetY] = useState(window.pageYOffset);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageContainerClasses = {
    1: "col-start-1 col-end-2 row-start-1 row-end-2",
    2: "absolute top-[16%] right-0 w-[calc(50%-0.5rem)] h-[200px] lg:h-[190px] xl:h-[200px]",
    3: "col-start-1 col-end-2 row-start-2 row-end-3",
    4: "col-start-2 col-end-3 row-start-2 row-end-3",
  };

  return (
    <section className="about-section px-2 md:px-4 lg:px-8 py-4 lg:py-8 bg-gradient-to-bl from-[#ffe6cc] from-0% via-[#fae2ca] via-30% via-[#f7d9b5] via-50% via-[#ffbf8a] via-70% to-[#fcc47c] to-100%">
      <div className="about-container max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 pt-[120px] lg:gap-16">
        <div className="about-images flex-1 grid grid-cols-2 grid-rows-2 gap-4 relative order-1">
          {imageList.map((img) => (
            <div
              key={img.id}
              className={`image-container rounded-lg overflow-hidden lazy-loading ${
                img.size === "large"
                  ? "h-[300px] md:h-[280px] lg:h-[300px]"
                  : "h-[200px] md:h-[190px] lg:h-[200px]"
              } ${imageContainerClasses[img.id]}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover block cursor-pointer transition-transform duration-400 ease-in-out hover:scale-110"
                onClick={() => openModal(img.src, false)}
              />
            </div>
          ))}
        </div>

        <div className="about-content flex-1 flex flex-col items-start justify-start text-view order-2">
          <h2
            className="relative w-fit mt-8 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110"
          >
            About Us
          </h2>
          <p className="mb-4 text-base text-text-primary">
            At DelishBite, we blend tradition with innovation to serve food that
            not only satisfies your hunger but also feeds your soul. From
            hand-picked ingredients to warm hospitality, our mission is to give
            you a memorable dining experience — every time.
          </p>
          <p className="mb-4 text-base text-text-primary">
            Whether it's a casual lunch, a romantic dinner, or a family
            gathering, DelishBite welcomes you with open arms and full plates.
          </p>
          <PrimaryBtn>Read More</PrimaryBtn>
        </div>
      </div>

      {modalOpen && (
        <div
          id="imageModal"
          className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm overflow-hidden"
          onClick={(e) => e.target.id === "imageModal" && closeModal()}
        >
          <div className="fixed top-0 left-0 right-0 h-[60px] bg-gradient-to-b from-black/70 to-transparent flex items-center justify-end px-4 md:px-8 z-50">
            <div className="flex items-center gap-2">
              {isTeamImage && (
                <button
                  className="bg-[var(--text-primary-dark)] text-white text-md md:text-xl p-2 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)]"
                  onClick={downloadImage}
                  title={`Download ${modalMemberName}'s photo`}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </button>
              )}

              <button
                className="bg-[var(--text-primary-dark)] text-white text-md md:text-xl p-2 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)]"
                onClick={handleZoomToggle}
              >
                <FontAwesomeIcon
                  icon={
                    isZoomed ? faMagnifyingGlassMinus : faMagnifyingGlassPlus
                  }
                />
              </button>

              <button
                className="bg-[var(--text-primary-dark)] text-white text-md md:text-xl p-2 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)]"
                onClick={closeModal}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>

          <div className="fixed inset-0 pt-[60px] pb-4 overflow-auto">
            <div className="min-h-full flex items-start justify-center p-4">
              <div className="relative">
                <img
                  ref={zoomRef}
                  className={`modal-content max-w-full max-h-[calc(100vh-100px)] object-contain rounded-lg shadow-2xl animate-zoom transition-transform duration-300 ease-out origin-center ${
                    isZoomed
                      ? "scale-150 cursor-zoom-out"
                      : "scale-100 cursor-zoom-in"
                  }`}
                  id="modalImage"
                  src={modalImageSrc}
                  alt="Enlarged view"
                  onClick={handleZoomToggle}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <CardSlider /> */}
      <TeamSection offsetY={offsetY} openModal={openModal} />
    </section>
  );
};

export default About;
