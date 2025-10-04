import React, { useState } from 'react'; // Removed useEffect since data is local

const serviceItems = [
  {
    "title": "Dine-In",
    "description": "Enjoy our comfortable and welcoming atmosphere while savoring our delicious dishes.",
    "animation": "https://lottie.host/1ac46b25-bac2-4b5a-9761-5ce36d2770aa/mwnHt1o4qQ.lottie"
  },
  {
    "title": "Takeout",
    "description": "Order your favorites to go and enjoy them in the comfort of your home.",
    "animation": "https://lottie.host/69a3c172-e759-4dd6-a089-2b4ebe3f62e7/12P2QYJpfO.lottie"
  },
  {
    "title": "Delivery",
    "description": "Have our mouth-watering meals delivered right to your doorstep.",
    "animation": "https://lottie.host/d1086e59-1074-4ac9-9a5c-baf27cb845ea/Yw92WISm1L.lottie"
  },
  {
    "title": "Catering",
    "description": "Let us cater your next event with our exceptional food and service.",
    "animation": "https://lottie.host/c86d8847-c1f3-416b-b97b-b10421fa480b/MDYd3fkQum.lottie"
  },
  {
    "title": "Reservations",
    "description": "Book a table in advance for a seamless dining experience.",
    "animation": "https://lottie.host/754f6315-234f-4c3f-b5a2-e9eff19404a9/7g0vXyWwx0.lottie"
  },
  {
    "title": "Private Events",
    "description": "Host your special occasions with us in our private dining areas.",
    "animation": "https://lottie.host/4dee593d-8dea-4cde-a3eb-a529b5c381f8/gl0kjBMLBR.lottie"
  }
];


// Data fetching and rendering for the services section
const ServicesSection = () => {
  
  // 2. Initialize the state directly with the local data.
  // We can remove loading and error states as the data is instant and guaranteed.
  const [services] = useState(serviceItems);
  
  // --- JSX for a Single Service Item (Sub-component) ---
  const ServiceItem = ({ service }) => (
    <div className="service-item sevice-reveal">
      {/* Web Components like <dotlottie-wc> can be used directly in JSX. */}
      <dotlottie-wc
        src={service.animation}
        style={{ width: '250px', height: '200px', margin: '0 auto' }}
        speed="1"
        autoplay
        loop
      ></dotlottie-wc>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );

  return (
    <section className="services-section">
      {/* Services Header */}
      <div className="container services-header text-view">
        <h2>Our Services</h2>
        <p>We offer a variety of services to enhance your dining experience.</p>
      </div>
      
      {/* Services Grid Container */}
      <div className="container">
        <div className="services-grid" id="services-container">
          
          {/* Render the list of services */}
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} />
          ))}
          
          {/* Optional fallback for empty data set */}
          {services.length === 0 && <p>No services currently available.</p>}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
