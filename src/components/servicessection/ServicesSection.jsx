import React, { useState, useEffect } from 'react';

// Data fetching and rendering for the services section
const ServicesSection = () => {
  // State to hold the fetched service items
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- useEffect for Data Fetching ---
  useEffect(() => {
    // Fetch data from services.json when the component mounts
    fetch("../../../services.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading services:", err);
        setError("Failed to load services data.");
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs only once on mount

  // --- JSX for a Single Service Item (Sub-component) ---
  const ServiceItem = ({ service }) => (
    <div className="service-item sevice-reveal">
      {/* Web Components like <dotlottie-wc> can be used directly in JSX.
        The styles are passed as an object instead of a string.
      */}
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
          {loading && <p>Loading services...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {/* Render the list of services if data is available */}
          {!loading && !error && services.map((service, index) => (
            <ServiceItem key={index} service={service} />
          ))}
          
          {/* Optionally show a message if no services are loaded */}
          {!loading && services.length === 0 && <p>No services currently available.</p>}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;