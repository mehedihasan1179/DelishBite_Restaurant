import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import MenuSection from "./Component/MenuSection/MenuSection";
import Cart from "./Pages/Cart/Cart";
import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import Reviews from "./Pages/ReviewPage/Reviews";
import Blog from "./Pages/Blog/Blog";
import BlogPost from "./Pages/BlogPost/BlogPost";
import ServicesSection from './Component/ServiceSection/ServicesSection';
import ReservationSection from "./Pages/Reservation/Reservation";
import Footer from "./Component/Footer/Footer";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FAQAccordion from "./Component/Faq/Faq";
import Address from "./Pages/Address/Address";
import PrivacyPolicy from "./Pages/Privacy/PrivacyPolicy";
import Help from "./Pages/Help/Help";
import BlogSlider from "./Pages/BlogSlider/BlogSlider";
import Contact from "./Pages/Contact/Contact";
import MenuItemDetails from "./Pages/MenuItemDetails/MenuItemDetails";

export default function App() {
  const [cartItems, setCartItems] = useState([]);


  return (
    <div>
      <Router>
        <Navbar cartItems={cartItems} setCartItems={setCartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuSection />} />
          <Route path="/menu/:name" element={<MenuItemDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/others" element={<Address />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/reservation" element={<ReservationSection />} />    
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route path='/faq' element={<FAQAccordion />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/help' element={<Help />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/blogslider' element={<BlogSlider />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          theme="light"
          bodyClassName="toastBody"
          toastStyle={{
          fontSize: "1rem",
          color: "var(--primary-dark)",
          background: "#ffd2ad",
        }}
        />
      </Router>
    </div>
  );
}
