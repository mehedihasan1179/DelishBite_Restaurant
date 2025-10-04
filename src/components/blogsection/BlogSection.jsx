import React, { useState } from 'react';

const blogPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f',
    date: 'June 15, 2023',
    author: 'John Doe',
    title: 'Exploring Seasonal Flavors',
    description: 'Learn about our new fall menu featuring fresh, locally-sourced ingredients that bring warmth to every bite.',
    readMoreLink: './blogs/pesto-pasta.html',
    seeAllLink: './blogs/main.html',
  },
  {
    id: 2,
    image: 'https://www.reluctantgourmet.com/wp-content/uploads/2009/08/r2-chef-instructor-student.jpeg',
    date: 'June 15, 2023',
    author: 'John Doe',
    title: 'Behind the Kitchen Doors',
    description: 'Get a glimpse into the passion and creativity of our chefs as they craft your favorite dishes.',
    readMoreLink: './blogs/pesto-pasta.html',
    seeAllLink: './blogs/main.html',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    date: 'June 15, 2023',
    author: 'John Doe',
    title: 'Elevating Your Dining Experience',
    description: 'Discover tips to make your visit unforgettable, from wine pairings to ambiance.',
    readMoreLink: './blogs/pesto-pasta.html',
    seeAllLink: './blogs/main.html',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1551780433-1254f53f8d54?auto=format&fit=crop&w=800&q=60',
    date: 'October 10, 2025',
    author: 'By Jane Smith',
    title: 'The Art of Wine Pairing',
    description: 'Discover how to perfectly pair wines with your meals to enhance flavors and elevate your dining experience.',
    readMoreLink: './blogs/wine-pairing.html',
    seeAllLink: './blogs/main.html',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60',
    date: 'November 5, 2025',
    author: 'By Mike Johnson',
    title: '5 Must-Try Dishes This Winter',
    description: 'Warm up this winter with our top 5 must-try dishes that are sure to satisfy your cravings.',
    readMoreLink: './blogs/winter-dishes.html',
    seeAllLink: './blogs/main.html',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=800&q=60',
    date: 'December 20, 2025',
    author: 'By Emily Davis',
    title: 'Holiday Entertaining Tips',
    description: 'Make your holiday gatherings memorable with our expert entertaining tips and festive recipes.',
    readMoreLink: './blogs/holiday-entertaining.html',
    seeAllLink: './blogs/main.html',
  }
];

// --- BlogCard Sub-Component ---
// Handles the structure and the interactive heart icon logic
const BlogCard = ({ post }) => {
  // Local state to manage the heart icon's class (replaces the JS click listener)
  const [isLiked, setIsLiked] = useState(false);

  // Function to toggle the heart icon's state
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  
  // Use a style object for the background image
  const cardImageStyle = {
    backgroundImage: `url('${post.image}')`,
  };
  
  return (
    <div className="blog-card blog-reveal">
      {/* Blog Card Image: Using inline style for the background image */}
      <div className="blog-card-image" style={cardImageStyle}></div>
      
      <div className="blog-card-top">
        <div className="date">
          <i className="fa-solid fa-calendar-days"></i>{post.date}
        </div>
        {/* Heart Icon with React Click Handler */}
        <div className="icon-container" onClick={handleLikeClick}>
          <i 
            className={`fa-solid fa-heart blog-fav-icon ${isLiked ? 'animated' : ''}`}
          ></i>
        </div>
      </div>
      
      <div className="blog-card-bottom">
        <div className="author">
          <i className="fa-solid fa-user-tie"></i>By {post.author}
        </div>
        <div className="title">{post.title}</div>
        <div className="description-text">{post.description}</div>
        
        <div className="buttons">
          {/* Read More Button */}
          <a href={post.readMoreLink}>
            {/* Note: In React, a button inside a link tag is generally discouraged 
                unless you prevent event propagation. Here, we'll keep the structure
                but note that typically you'd style the <a> tag as a button.
                If you MUST use a button, you need to use the `PrimaryButton` 
                or `SecondaryButton` component you created previously.
            */}
            <button className="secondary-btn btn-read">
              Read More
              <i className="fa-solid fa-chevron-right animated-chevron"></i>
            </button>
          </a>
          
          {/* See All Button */}
          <a href={post.seeAllLink}>
            <button className="secondary-btn btn-share">See All</button>
          </a>
        </div>
      </div>
    </div>
  );
};


// --- Main BlogSection Component ---
const BlogSection = () => {
  return (
    <section className="blog-section">
      <div className="container blog-header text-view">
        <h2>Our Blog</h2>
        <p>Discover our latest stories, recipes, and restaurant updates.</p>
      </div>
      
      <div className="container">
        <div className="blog-grid">
          {/* Map over the data array to render the cards */}
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;