import React, { useState } from 'react';
import './menusection.css';

// ------------------------------------------------------------------
// --- 1. Menu Data (JSON array placed directly in the file) ---
// ------------------------------------------------------------------
const menuItems = [
  {
    "category": "desserts",
    "name": "Tiramisu",
    "price": "$7.99",
    "desc": "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    "img": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "pizza",
    "name": "Pepperoni Pizza",
    "price": "$14.99",
    "desc": "Traditional pizza topped with spicy pepperoni and mozzarella cheese.",
    "img": "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "burgers",
    "name": "Classic Burger",
    "price": "$9.99",
    "desc": "Juicy beef patty with lettuce, tomato, onion, and our special sauce.",
    "img": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "salads",
    "name": "Greek Salad",
    "price": "$9.99",
    "desc": "Fresh vegetables, feta cheese, olives, and olive oil dressing.",
    "img": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "pizza",
    "name": "Margherita Pizza",
    "price": "$12.99",
    "desc": "Classic pizza with tomato sauce, fresh mozzarella, and basil leaves.",
    "img": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "burgers",
    "name": "Bacon Cheeseburger",
    "price": "$11.99",
    "desc": "Classic cheeseburger with crispy bacon and cheddar cheese.",
    "img": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "desserts",
    "name": "Chocolate Cake",
    "price": "$6.99",
    "desc": "Rich chocolate cake with layers of chocolate ganache.",
    "img": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "pasta",
    "name": "Spaghetti Carbonara",
    "price": "$13.99",
    "desc": "Classic Italian pasta with eggs, cheese, pancetta, and black pepper.",
    "img": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "salads",
    "name": "Caesar Salad",
    "price": "$8.99",
    "desc": "Romaine lettuce, croutons, parmesan cheese with our famous Caesar dressing.",
    "img": "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=60"
  },
  {
    "category": "pasta",
    "name": "Fettuccine Alfredo",
    "price": "$12.99",
    "desc": "Rich and creamy pasta with parmesan cheese and butter.",
    "img": "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=500&q=60"
  }
];
// ------------------------------------------------------------------


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
  
  // 2. Initialize menuData state directly with the local data array
  const [menuData] = useState(menuItems);
  
  // State to track the currently active filter category
  const [activeCategory, setActiveCategory] = useState('all');

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
          {/* Loop through the filtered items */}
          {filteredItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
