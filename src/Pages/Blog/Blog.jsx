import React, { useState } from "react";
import "./blog.css";
import { Link } from "react-router-dom";
import blogPosts from "../BlogPost/blogPostData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUserTie,
  faHeart,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import SecondaryBtn from "../../Component/Buttons/SecondaryBtn/SecondaryBtn";

const Blog = () => {
  const [favorites, setFavorites] = useState(
    blogPosts.map((post) => ({ id: post.id, isFavorite: post.isFavorite }))
  );

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((fav) =>
        fav.id === id ? { ...fav, isFavorite: !fav.isFavorite } : fav
      )
    );
  };

  return (
    <section className="blog-section mt-10 md:mt-12 lg:mt-14 py-8 px-2 md:px-4 lg:px-8 text-center bg-gray-50">
      <div className="container max-w-7xl mx-auto blog-header text-view mb-10">
        <h2
          className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110"
        >
          Our Blog
        </h2>

        <p className="mt-4 text-xl text-[#ff7e00]">
          Discover our latest stories, recipes, and restaurant updates.
        </p>
      </div>

      <div className="container max-w-9xl mx-auto">
        <div className="blog-grid grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 md:gap-4 mt-10">
          {blogPosts.map((post) => {
            const isFav = favorites.find(
              (fav) => fav.id === post.id
            )?.isFavorite;
            const favClass = isFav ? "animated" : "";

            return (
              <div
                key={post.id}
                className="blog-card w-full h-[450px] rounded-xl overflow-hidden relative shadow-xl transition-transform duration-500 hover:shadow-2xl"
              >
                <div
                  className="blog-card-image w-full h-full bg-cover bg-center absolute top-0 left-0"
                  style={{ backgroundImage: `url('${post.imageUrl}')` }}
                ></div>

                <div className="blog-card-top absolute top-2 left-2 right-2 flex flex-col gap-2 z-10">
                  {/* Date */}
                  <div className="date text-sm py-1 px-4 rounded-full font-semibold text-gray-100 bg-black bg-opacity-30 self-start">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="mr-1 text-[#d95e06e1]"
                    />
                    {post.date}
                  </div>

                  {/* Category - Added just below the date */}
                  <div className="category text-xs tracking-wider py-1 px-4 rounded-full font-semibold text-gray-100 bg-black bg-opacity-30 self-start">
                    {post.category.toUpperCase()}
                  </div>

                  {/* Favorite Heart */}
                  <div className="icon-container self-end absolute ">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={`blog-fav-icon text-2xl text-gray-100 cursor-pointer transition-colors duration-400 ${favClass}`}
                      onClick={() => toggleFavorite(post.id)}
                    />
                  </div>
                </div>

                <div className="blog-card-bottom absolute bottom-0 left-0 w-full p-5 text-white z-10">
                  <div className="author text-md mb-1 font-bold opacity-90">
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="mr-1 text-[#d95e06e1]"
                    />
                    By {post.author}
                  </div>

                  <div className="title lg:text-2xl md:text-xl text-[#ff7e00] font-semibold leading-tight mb-0">
                    {post.title}
                  </div>

                  <div className="description-text mt-0 text-base leading-relaxed">
                    {post.description}
                  </div>

                  <div className="buttons flex justify-between mt-0">
                    <Link to={post.readMoreLink}>
                      <SecondaryBtn>
                        Read More
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="animated-chevron ml-2 transition-transform duration-500"
                        />
                      </SecondaryBtn>
                    </Link>

                    <Link to="/blogslider">
                      <SecondaryBtn>See All</SecondaryBtn>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Blog;
