import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;



// Inside App.jsx
// useEffect(() => {
//   localStorage.setItem('cart', JSON.stringify(cartItems));
// }, [cartItems]);

// // When initializing state
// const [cartItems, setCartItems] = useState(
//   JSON.parse(localStorage.getItem('cart')) || []
// );

//inside footer
// const handleReload = () => {
//     // This force-reloads the window to the new URL
//     window.location.href = to;
// };
