import React, { useState, useEffect, useRef } from "react";
import SecondaryBtn from "../Buttons/SecondaryBtn/SecondaryBtn";
import "./menuSection.css";
import { mockMenuData } from "../../data/mockMenuData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCartFlatbed,
  faChevronLeft,
  faChevronRight,
  faExpand,
  faXmark,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const categories = ["all", "pizza", "burgers", "pasta", "salads", "desserts"];

const MenuItem = ({ item, openModal }) => (
  <div className="menu-item" data-category={item.category}>
    <div className="menu-item-img-wrapper">
      <div className="card-inner">
        {/* Card Front (Image) */}
        <div className="card-front">
          <img
            src={item.images.main}
            alt={item.name}
            className="menu-item-img w-full h-full object-cover"
          />
          <div
            className="card-front-overlay absolute bottom-[15px] left-[15px] right-[15px] 
                            flex justify-between items-center p-2 rounded-lg text-white font-semibold bg-black bg-opacity-40"
          >
            <span className="front-name text-[1.3rem] text-primary-dark font-satisfy">
              {item.name}
            </span>
            <span className="front-price font-bold text-[1.1rem] text-white drop-shadow-md">
              {item.price}
            </span>
          </div>
        </div>

        <div
          className="card-back absolute inset-0 text-white flex flex-col p-5 transform rotate-y-180 z-10"
          style={{ "--back-img": `url(${item.images.main})` }}
        >
          <div className="overlay-icons pt-4 pb-2 flex justify-between gap-3">
            <FontAwesomeIcon
              icon={faEye}
              className="text-xl cursor-pointer text-primary-dark transition-transform duration-700 ease-in-out hover:rotate-y-360 preview-btn"
              title="Preview"
              onClick={() => {
                const index = mockMenuData.findIndex(
                  (dataItem) => dataItem.name === item.name
                );
                openModal(index);
              }}
            />
            <FontAwesomeIcon
              icon={faCartFlatbed}
              className="text-xl cursor-pointer text-primary-dark transition-transform duration-700 ease-in-out hover:rotate-y-360"
              title="Add to cart"
              // onClick={() => window.addToCart(item)}
              onClick={() => {
                window.addToCart(item);
                toast.success(`${item.name} added to cart!`, {
                  position: "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  transition: Flip,
                });
              }}
            />
          </div>

          <Link
            to={`/menu/${encodeURIComponent(item.name)}`}
            className="menu-item-content absolute bottom-0 cursor-pointer w-full"
          >
            <div className="menu-item-content absolute bottom-0 cursor-pointer">
              <div className="menu-item-text">
                <div className="menu-item-title max-w-fit w-10/12 relative block">
                  <h3>{item.name}</h3>
                </div>
                <p className="menu-item-desc w-11/12 text-base text-primary-orange my-0 mb-[15px]">
                  {item.description.shortDes}
                </p>
              </div>
              <span className="menu-item-price text-3xl text-white font-bold drop-shadow-md">
                {item.price}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const MenuSection = () => {
  const [menuData, setMenuData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const modalRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // NEW: State to store the current sort option
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    setMenuData(mockMenuData);
    setFilteredItems(mockMenuData);
  }, []);

  const getPriceValue = (priceString) => {
    return parseFloat(priceString.replace("$", ""));
  };

  const applyFiltersAndSort = (category, sort) => {
    const itemsToFilter = menuData;
    const itemsFiltered =
      category === "all"
        ? itemsToFilter
        : itemsToFilter.filter((item) => item.category === category);

    let sortedItems = [...itemsFiltered];

    if (sort !== "default") {
      sortedItems.sort((a, b) => {
        switch (sort) {
          case "priceLowToHigh":
            return getPriceValue(a.price) - getPriceValue(b.price);
          case "priceHighToLow":
            return getPriceValue(b.price) - getPriceValue(a.price);
          case "nameAToZ":
            return a.name.localeCompare(b.name);
          case "nameZToA":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    setFilteredItems(sortedItems);
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
    applyFiltersAndSort(category, sortOption);
  };

  const handleSort = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    applyFiltersAndSort(activeCategory, newSortOption);
  };

  const openModal = (index) => {
    const itemInFiltered = filteredItems[index];
    const initialIndexInFullData = mockMenuData.findIndex(
      (item) => item.name === itemInFiltered.name
    );
    setInitialSlide(initialIndexInFullData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInitialSlide(0);
  };

  const handleFullScreenToggle = () => {
    if (!modalRef.current) return;

    if (!document.fullscreenElement) {
      const requestFullScreen =
        modalRef.current.requestFullscreen ||
        modalRef.current.webkitRequestFullscreen;
      if (requestFullScreen) {
        requestFullScreen
          .call(modalRef.current)
          .then(() => {
            setIsFullScreen(true);
          })
          .catch((err) => console.error("Error entering fullscreen:", err));
      }
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullScreen(false);
        })
        .catch((err) => console.error("Error exiting fullscreen:", err));
    }
  };

  return (
    <section className="menu-section py-16 lg:py-20 px-2 md:px-4 lg:px-8 relative">
      <div className="max-w-7xl mx-auto mt-4">
        <div className="menu-header text-center text-view !mb-20">
          <h2
            className="relative w-fit mt-8 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110"
          >
            Feast Your Eyes
          </h2>
          <p className="my-4 text-lg text-primary-orange">
            Discover our carefully crafted dishes made with the finest
            ingredients
          </p>
        </div>

        <div className="flex justify-between flex-wrap">
          <div className="filter-buttons flex flex-wrap gap-2">
            {categories.map((category) => (
              <SecondaryBtn
                key={category}
                onClick={() => handleFilter(category)}
                isActive={activeCategory === category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SecondaryBtn>
            ))}
          </div>
          <div>
            <select
              name="sort"
              id="sort-select"
              value={sortOption}
              onChange={handleSort}
              className="bg-transparent text-[#eb8c07] font-medium border-2 !border-[#eb8c07] rounded-md p-2 mb-6 focus:outline-none"
            >
              <option value="default">Sort by Default</option>
              <option value="priceLowToHigh">Low to High</option>
              <option value="priceHighToLow">High to Low</option>
              <option value="nameAToZ">A to Z</option>
              <option value="nameZToA">Z to A</option>
            </select>
          </div>
        </div>

        <div
          className="menu-items grid gap-2 md:gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
          id="menu-container"
        >
          {/* Renders the currently filtered and sorted items */}
          {filteredItems.map((item, index) => (
            <MenuItem
              key={item.name}
              item={item}
              openModal={() => openModal(index)}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 mt-2 bg-black bg-opacity-70 flex justify-center items-center z-[1000] full-screen-modal"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl md:w-[75vw] sm:w-[85vw] w-[88vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Swiper
              modules={[Navigation, Keyboard, FreeMode, Thumbs]}
              spaceBetween={0}
              keyboard={{ enabled: true }}
              slidesPerView={1}
              loop={true}
              thumbs={{ swiper: thumbsSwiper }}
              initialSlide={initialSlide}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              className="w-full h-[70vh] lg:h[75h]"
            >
              {mockMenuData.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col h-full relative">
                    <img
                      src={item.images.main}
                      alt={item.name}
                      className="w-full h-[62vh] object-cover"
                    />
                    <div className="absolute bottom-0 h-20 p-4 w-full bg-black flex justify-between items-center">
                      <div className="text-right">
                        <h3 className="text-xl text-left lg:text-3xl font-semibold text-[var(--text-primary-dark)] font-satisfy">
                          {item.name}
                        </h3>
                        <p className="text-left text-4xl font-bold text-white">
                          {item.price}
                        </p>
                      </div>
                      <SecondaryBtn
                        id="cartModal"
                        className="font-bold text-[12px] lg:text-lg"
                        onClick={() => {
                          window.addToCart(item);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCartFlatbed}
                          className="mr-2"
                        />
                        Add to Cart
                      </SecondaryBtn>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={4}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 4,
                },
                640: {
                  slidesPerView: 3,
                  spaceBetween: 4,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 4,
                },
              }}
              className="mySwiper"
            >
              {mockMenuData.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col h-full relative rounded-md overflow-hidden border border-transparent hover:border-[var(--text-primary-dark)] cursor-pointer ">
                    <img
                      src={item.images.main}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-[6rem] md:h-[8rem] lg:h-[10rem] object-cover rounded-md"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex justify-between bg-gray-100">
              <button className="swiper-button-prev absolute top-1/2 lg:!left-8 sm:left-1 bg-[var(--text-primary-dark)] !text-white !text-xl p-2 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:!border-[var(--text-primary-dark)] hover:!text-[var(--text-primary-dark)] z-10">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button className="swiper-button-next absolute top-1/2 lg:!right-8 sm:!right-1 bg-[var(--text-primary-dark)] !text-white text-xl p-2 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:!border-[var(--text-primary-dark)] hover:!text-[var(--text-primary-dark)] z-10">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <button
              className="absolute top-1 right-6 md:right-8 bg-[var(--text-primary-dark)] text-white text-md md:text-xl p-1 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button
              className="absolute top-1 right-16 md:right-20 bg-[var(--text-primary-dark)] text-white text-md md:text-xl p-1 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10"
              onClick={handleFullScreenToggle}
            >
              <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default MenuSection;



// import React, { useState, useEffect, useRef } from "react";
// import SecondaryBtn from "../Buttons/SecondaryBtn/SecondaryBtn";
// import { mockMenuData } from "../../data/mockMenuData";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEye,
//   faCartFlatbed,
//   faChevronLeft,
//   faChevronRight,
//   faExpand,
//   faXmark,
//   faCompress,
// } from "@fortawesome/free-solid-svg-icons";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Keyboard, FreeMode, Thumbs } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/free-mode";
// import "swiper/css/thumbs";
// import { toast, Flip } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Link } from "react-router-dom";

// const categories = ["all", "pizza", "burgers", "pasta", "salads", "desserts"];

// const MenuItem = ({ item, openModal }) => (
//   <div className="menu-item overflow-hidden rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-transform duration-500">
//     {/* Card Wrapper with Perspective */}
//     <div className="group relative  h-[300px] md:h-[350px] w-full [perspective:1000px]">
//       <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
//         {/* Card Front */}
//         <div className="absolute inset-0 z-10 h-full w-full overflow-hidden rounded-xl [backface-visibility:hidden]">
//           <img
//             src={item.images.main}
//             alt={item.name}
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute bottom-[15px] left-[15px] right-[15px] flex items-center justify-between rounded-lg bg-black/40 p-2 font-semibold text-white">
//             <span className="font-satisfy text-[1.3rem] text-primary-dark">
//               {item.name}
//             </span>
//             <span className="text-[1.1rem] font-bold drop-shadow-md">
//               {item.price}
//             </span>
//           </div>
//         </div>

//         {/* Card Back */}
//         <div className="absolute inset-0 z-0 h-full w-full overflow-hidden rounded-xl bg-black/20 p-5 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
//           {/* Blurred Background */}
//           <div 
//             className="absolute inset-0 -z-10 scale-110 bg-cover bg-center blur-md brightness-90"
//             style={{ backgroundImage: `url(${item.images.main})` }}
//           />
          
//           <div className="relative z-10 flex h-full flex-col">
//             <div className="flex justify-between gap-3 pt-4 pb-2">
//               <FontAwesomeIcon
//                 icon={faEye}
//                 className="cursor-pointer text-xl text-primary-dark transition-transform duration-700 hover:[transform:rotateY(360deg)]"
//                 title="Preview"
//                 onClick={() => openModal()}
//               />
//               <FontAwesomeIcon
//                 icon={faCartFlatbed}
//                 className="cursor-pointer text-xl text-primary-dark transition-transform duration-700 hover:[transform:rotateY(360deg)]"
//                 title="Add to cart"
//                 onClick={() => {
//                   window.addToCart(item);
//                   toast.success(`${item.name} added to cart!`, { transition: Flip, position: "bottom-right" });
//                 }}
//               />
//             </div>

//             <Link
//               to={`/menu/${encodeURIComponent(item.name)}`}
//               className="mt-auto block w-full"
//             >
//               <div className="menu-item-text">
//                 <div className="relative mb-2 inline-block translate-y-20 opacity-0 blur-md transition-all duration-500 delay-200 group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0">
//                   <h3 className="font-satisfy text-3xl text-primary-dark">{item.name}</h3>
//                   <div className="absolute -bottom-1 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-primary-dark transition-all duration-700 delay-500 group-hover:w-full" />
//                 </div>
//                 <p className="mb-[15px] w-11/12 translate-y-20 text-base text-primary-orange opacity-0 blur-md transition-all duration-500 delay-[400ms] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0">
//                   {item.description.shortDes}
//                 </p>
//               </div>
//               <span className="translate-y-20 text-3xl font-bold drop-shadow-md opacity-0 blur-md transition-all duration-500 delay-[600ms] group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-0">
//                 {item.price}
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const MenuSection = () => {
//   const [menuData, setMenuData] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [initialSlide, setInitialSlide] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [sortOption, setSortOption] = useState("default");
//   const modalRef = useRef(null);

//   useEffect(() => {
//     setMenuData(mockMenuData);
//     setFilteredItems(mockMenuData);
//   }, []);

//   const getPriceValue = (priceString) => parseFloat(priceString.replace("$", ""));

//   const applyFiltersAndSort = (category, sort) => {
//     let items = category === "all" ? menuData : menuData.filter(i => i.category === category);
//     let sortedItems = [...items];

//     if (sort !== "default") {
//       sortedItems.sort((a, b) => {
//         if (sort === "priceLowToHigh") return getPriceValue(a.price) - getPriceValue(b.price);
//         if (sort === "priceHighToLow") return getPriceValue(b.price) - getPriceValue(a.price);
//         if (sort === "nameAToZ") return a.name.localeCompare(b.name);
//         if (sort === "nameZToA") return b.name.localeCompare(a.name);
//         return 0;
//       });
//     }
//     setFilteredItems(sortedItems);
//   };

//   const handleFilter = (cat) => {
//     setActiveCategory(cat);
//     applyFiltersAndSort(cat, sortOption);
//   };

//   const handleSort = (e) => {
//     setSortOption(e.target.value);
//     applyFiltersAndSort(activeCategory, e.target.value);
//   };

//   const openModal = (index) => {
//     const itemInFiltered = filteredItems[index];
//     const initialIndexInFullData = mockMenuData.findIndex(item => item.name === itemInFiltered.name);
//     setInitialSlide(initialIndexInFullData);
//     setIsModalOpen(true);
//   };

//   const handleFullScreenToggle = () => {
//     if (!document.fullscreenElement) {
//       modalRef.current.requestFullscreen().then(() => setIsFullScreen(true));
//     } else {
//       document.exitFullscreen().then(() => setIsFullScreen(false));
//     }
//   };

//   return (
//     <section className="relative px-2 py-16 md:px-4 lg:px-8 lg:py-20 bg-[linear-gradient(120deg,#ece9c7,#fffefa,#dfdfa9,#ffd2a4,#fefdf2)]">
//       <div className="mx-auto mt-4 max-w-7xl">
//         <div className="mb-20 text-center">
//           <h2 className="font-satisfy relative mx-auto mt-8 w-fit cursor-pointer text-4xl transition-transform duration-300 hover:scale-[1.05] md:text-5xl lg:text-6xl text-primary-dark after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-primary-dark after:transition-transform after:duration-300 hover:after:scale-x-110">
//             Feast Your Eyes
//           </h2>
//           <p className="my-4 text-lg text-primary-orange">
//             Discover our carefully crafted dishes made with the finest ingredients
//           </p>
//         </div>

//         <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <SecondaryBtn
//                 key={category}
//                 onClick={() => handleFilter(category)}
//                 isActive={activeCategory === category}
//               >
//                 {category.charAt(0).toUpperCase() + category.slice(1)}
//               </SecondaryBtn>
//             ))}
//           </div>
//           <select
//             value={sortOption}
//             onChange={handleSort}
//             className="rounded-md border-2 border-[#eb8c07] bg-transparent p-2 font-medium text-[#eb8c07] focus:outline-none"
//           >
//             <option value="default">Sort by Default</option>
//             <option value="priceLowToHigh">Low to High</option>
//             <option value="priceHighToLow">High to Low</option>
//             <option value="nameAToZ">A to Z</option>
//             <option value="nameZToA">Z to A</option>
//           </select>
//         </div>

//         <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
//           {filteredItems.map((item, index) => (
//             <MenuItem key={item.name} item={item} openModal={() => openModal(index)} />
//           ))}
//         </div>
//       </div>

//       {/* Modal Section */}
//       {isModalOpen && (
//         <div
//           ref={modalRef}
//           className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div
//             className="relative w-[88vw] max-w-4xl overflow-hidden rounded-lg bg-white shadow-2xl sm:w-[85vw] md:w-[75vw]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Swiper
//               modules={[Navigation, Keyboard, FreeMode, Thumbs]}
//               keyboard={{ enabled: true }}
//               loop={true}
//               thumbs={{ swiper: thumbsSwiper }}
//               initialSlide={initialSlide}
//               navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
//               className="h-[70vh] w-full"
//             >
//               {mockMenuData.map((item, idx) => (
//                 <SwiperSlide key={idx}>
//                   <div className="relative flex h-full flex-col">
//                     <img src={item.img} alt={item.name} className="h-[62vh] w-full object-cover" />
//                     <div className="flex h-20 items-center justify-between bg-black p-4">
//                       <div className="text-left text-white">
//                         <h3 className="font-satisfy text-xl lg:text-3xl">{item.name}</h3>
//                         <p className="text-2xl font-bold">{item.price}</p>
//                       </div>
//                       <SecondaryBtn onClick={() => window.addToCart(item)}>
//                         <FontAwesomeIcon icon={faCartFlatbed} className="mr-2" />
//                         Add to Cart
//                       </SecondaryBtn>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Thumbnail Swiper */}
//             <Swiper
//               onSwiper={setThumbsSwiper}
//               spaceBetween={4}
//               slidesPerView={4}
//               watchSlidesProgress={true}
//               modules={[FreeMode, Navigation, Thumbs]}
//               className="bg-black py-1"
//             >
//               {mockMenuData.map((item, idx) => (
//                 <SwiperSlide key={idx}>
//                   <img src={item.img} className="h-24 w-full cursor-pointer object-cover rounded hover:opacity-80" />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Modal Controls */}
//             <button className="prev-btn absolute top-1/2 left-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-primary-dark bg-primary-dark text-white transition-all hover:bg-transparent hover:text-primary-dark">
//               <FontAwesomeIcon icon={faChevronLeft} />
//             </button>
//             <button className="next-btn absolute top-1/2 right-4 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-primary-dark bg-primary-dark text-white transition-all hover:bg-transparent hover:text-primary-dark">
//               <FontAwesomeIcon icon={faChevronRight} />
//             </button>
            
//             <div className="absolute top-2 right-2 z-20 flex gap-2">
//               <button onClick={handleFullScreenToggle} className="rounded-md border border-primary-dark bg-primary-dark p-2 text-white hover:bg-transparent hover:text-primary-dark">
//                 <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
//               </button>
//               <button onClick={() => setIsModalOpen(false)} className="rounded-md border border-primary-dark bg-primary-dark p-2 text-white hover:bg-transparent hover:text-primary-dark">
//                 <FontAwesomeIcon icon={faXmark} />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default MenuSection;
