import Navbar from './components/navbar/Navbar';
// Try adding the extension explicitly
import FoodCarousel from './components/foodcarousel/FoodCarousel';
import AboutSection from './components/aboutsection/AboutSection';
import './App.css'
import MenuSection from './components/menusection/MenuSection';
import ServicesSection from './components/servicessection/ServicesSection';
import ReviewsSlider from './components/reviewsslider/ReviewsSlider';
import BlogSection from './components/blogsection/BlogSection';
import ReservationSection from './components/reservationsection/ReservationSection';
import Footer from './components/footer/Footer';

// import { createBrowserRouter } from 'react-router-dom';

 // Adjust the path as needed
function App() {
  
  return (
    <div className='App'>
      <Navbar />
      <FoodCarousel />
      <AboutSection />
      <MenuSection />
      <ServicesSection />
      <ReviewsSlider />
      <BlogSection />
      <ReservationSection />
      <Footer />
    </div>
  );
}

export default App

