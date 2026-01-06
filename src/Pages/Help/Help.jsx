import React from "react";
// import './Help.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faMobile,
  faTruck,
  faCreditCard
} from "@fortawesome/free-solid-svg-icons";

export default function Help() {
  return (
    <div className="min-h-screen py-16 md:py-20 px-2 md:px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110">
        Help & Support
      </h2>

        <section className="rounded-lg  p-2 sm:p-8 mb-6">
          <h2 className="text-primary-dark text-2xl font-bold text-gray-800 mb-4">
            About DelishBite
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to DelishBite, where culinary excellence meets comfort
            dining. We're dedicated to serving you delicious food in a warm,
            welcoming atmosphere.
          </p>
        </section>

        <section className="rounded-lg  p-2 sm:p-8 mb-6">
          
          {/* <h2 className="text-primary-dark text-2xl font-bold text-gray-800 mb-4">
            <FontAwesomeIcon
              icon={faMobile}
              className="mt-1 text-xl lg:text-3xl"
            /> How to Order
          </h2> */}
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faMobile}
              className="mt-1 text-xl lg:text-3xl"
            />
            <h2 className="text-primary-dark text-2xl font-bold text-gray-800 mb-4">How to Order</h2>
          </div>
          
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-orange-500 mr-3">•</span>
              <span>Browse our menu and select your favorite dishes</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-3">•</span>
              <span>Add items to your cart</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-3">•</span>
              <span>Proceed to checkout and enter delivery details</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Choose dine-in, takeout, or delivery</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3">•</span>
              <span>Complete payment securely</span>
            </li>
          </ul>
        </section>

        <section className="rounded-lg  p-2 sm:p-8 mb-6">
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faTruck}
              className="mt-1 text-xl lg:text-3xl"
            />
            <h2 className="text-primary-dark text-2xl font-bold text-gray-800 mb-4">How to Order</h2>
          </div>
          <p className="text-gray-600 leading-relaxed space-y-2">
            <div>
              <strong>Delivery:</strong> Available within 5km. Estimated time:
              30-45 minutes
            </div>
            <div>
              <strong>Pickup:</strong> Ready within 20-30 minutes of order
              confirmation
            </div>
            <div>
              <strong>Dine-in:</strong> Walk-ins welcome! Reserve a table for
              groups.
            </div>
          </p>
        </section>

        <section className="rounded-lg  p-2 mb-6">
          <div className="flex gap-1">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="mt-1 text-xl lg:text-3xl"
            />
            <h2 className="text-primary-dark text-2xl font-bold text-gray-800 mb-4">How to Order</h2>
          </div>
          <p className="text-gray-600">
            We accept credit cards, debit cards, digital wallets, and cash on
            delivery.
          </p>
        </section>

        <section className=" p-2">
         <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mt-1 text-xl lg:text-3xl"
                />
                <div>
                  <p className="text-primary-dark font-bold text-lg md:text-2xl">Phone</p>
                  <p className="text-black">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mt-1 text-xl lg:text-3xl"
                />
                <div>
                  <p className="text-primary-dark font-bold text-lg md:text-2xl">Email</p>
                  <p className="text-black">info@delishbite.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mt-1 text-xl lg:text-3xl"
                />
                <div>
                  <p className="text-primary-dark font-bold text-lg md:text-2xl">Location</p>
                  <p className="text-black">
                    123 Culinary Ave, Food City, FC 90210
                  </p>
                </div>
              </div>
            </div>
        </section>
      </div>
    </div>
  );
}
