import React, { useState } from 'react';
import PrimaryButton from '../../pages/PrimaryButton'; 
import './aboutsection.css';

import setMenu1 from '../../assets/set-menu_1.jpg';
import setMenu2 from '../../assets/set-menu_2.avif';
import setMenu3 from '../../assets/set-menu_3.jpg';
import setMenu4 from '../../assets/set-menu_4.avif';

const aboutImages = [
  { src: setMenu1, alt: "Restaurant 1", classes: "large-img set-menu_1-container" },
  { src: setMenu2, alt: "Restaurant 2", classes: "small-img set-menu_2-container" },
  { src: setMenu3, alt: "Restaurant 3", classes: "small-img set-menu_3-container" },
  { src: setMenu4, alt: "Restaurant 4", classes: "large-img set-menu_4-container" },
];

const AboutSection = () => {
  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState('');

  // Function to open the modal
  const openModal = (src) => {
    setModalSrc(src);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalSrc(''); // Clear image source
  };
  
  // Handler for closing the modal when clicking the overlay
  const handleOverlayClick = (e) => {
    if (e.target.id === 'imageModal') {
      closeModal();
    }
  };

  return (
    <section className="about-section">
      <div className="about-container container">
        
        {/* About Images Section */}
        <div className="about-images">
          {aboutImages.map((image, index) => (
            <div 
              key={index} 
              className={`image-container ${image.classes} lazy-loading`}
              // Event handler replaces the manual click listener
              onClick={() => openModal(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`lightbox-img set-menu_${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* About Content Section */}
        <div className="about-content text-view">
          <h2>About Us</h2>
          <p>
            At DelishBite, we blend tradition with innovation to serve food that
            not only satisfies your hunger but also feeds your soul. From
            hand-picked ingredients to warm hospitality, our mission is to give
            you a memorable dining experience — every time.
          </p>
          <p>
            Whether it's a casual lunch, a romantic dinner, or a family
            gathering, DelishBite welcomes you with open arms and full plates.
          </p>
          {/* Using the reusable PrimaryButton component */}
          <PrimaryButton href="about.html" className="read-more-btn">
            Read More
          </PrimaryButton>
        </div>
      </div>

      {/* Modal - Conditional rendering based on state */}
      <div 
        id="imageModal" 
        className="modal" 
        style={{ display: isModalOpen ? 'block' : 'none' }}
        onClick={handleOverlayClick}
      >
        <span className="modal-close" onClick={closeModal}>&times;</span>
        <img 
          className="modal-content" 
          id="modalImage" 
          src={modalSrc} 
          alt="" 
        />
      </div>
    </section>
  );
};

export default AboutSection;