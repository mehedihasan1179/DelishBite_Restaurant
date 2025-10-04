import React, { useState, useEffect } from 'react';
import './menusection.css';
// Note: No import for SecondaryButton is needed.

// Data for filter buttons
const categories = [
  { label: "All", category: "all" },
  { label: "Pizza", category: "pizza" },
  { label: "Burgers", category: "burgers" },
  { label: "Pasta", category: "pasta" },
  { label: "Salads", category: "salads" },
  { label: "Desserts", category: "desserts" },
];

const MenuSection = () => {
  // State to hold the full menu data
  const [menuData, setMenuData] = useState([]);
  // State to track the currently active filter category
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // --- useEffect for Data Fetching (Replaces document.addEventListener("DOMContentLoaded")) ---
  useEffect(() => {
    // In a real application, replace this with the correct path or API call
    fetch('../../../menu.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMenuData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading menu data:", error);
        setLoading(false); 
      });
  }, []); // Runs only ONCE after initial render

  // --- Logic to Handle Filtering ---
  // Calculates the items to display based on the active category
  const filteredItems = menuData.filter(item => {
    return activeCategory === 'all' || item.category === activeCategory;
  });

  // --- Handler for Button Clicks ---
  const handleFilterClick = (category) => {
    setActiveCategory(category);
  };

  // --- JSX for a Single Menu Item (Sub-component) ---
  const MenuItem = ({ item }) => (
    <div className="menu-item" data-category={item.category}>
      <div className="menu-item-img-wrapper">
        <div className="card-inner">
          <div className="card-front">
            <img
              src={item.img}
              alt={item.name}
              className="menu-item-img"
            />
            <div className="card-front-overlay">
              <span className="front-name">{item.name}</span>
              <span className="front-price">{item.price}</span>
            </div>
          </div>
          {/* Using inline style object for the background image */}
          <div 
            className="card-back" 
            style={{ '--back-img': `url(${item.img})` }}
          >
            <div className="overlay-icons">
              <i className="fa-solid fa-eye" title="Preview"></i>
              <i className="fa-solid fa-cart-flatbed" title="Add to cart"></i>
            </div>
            <div className="menu-item-content">
              <div className="menu-item-text">
                <div className="menu-item-title"><h3>{item.name}</h3></div>
                <p className="menu-item-desc">{item.desc}</p>
              </div>
              <span className="menu-item-price">{item.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="menu-section">
      <div className="container">
        
        {/* Menu Header */}
        <div className="menu-header text-view">
          <h2>Our Delicious Menu</h2>
          <p>
            Discover our carefully crafted dishes made with the finest
            ingredients
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {categories.map((btn) => (
            // Using a standard HTML button element
            <button
              key={btn.category}
              className={`secondary-btn ${activeCategory === btn.category ? 'active' : ''}`}
              data-category={btn.category}
              onClick={() => handleFilterClick(btn.category)}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Menu Items Container */}
        <div className="menu-items" id="menu-container">
          {loading && <p>Loading menu...</p>}
          {!loading && filteredItems.length === 0 && <p>No items found in this category.</p>}
          {!loading && filteredItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;