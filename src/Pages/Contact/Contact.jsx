import React, { useState } from "react";
import PrimaryBtn from "../../Component/Buttons/PrimaryBtn/PrimaryBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  // Contact form logic
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{4}[-.\s]?\d{4}$/;

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required.";
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!emailRegex.test(value.trim()))
          error = "Please enter a valid email address.";
        break;
      case "subject":
        if (!value.trim()) error = "Subject is required.";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required.";
        else if (!phoneRegex.test(value.trim()))
          error = "Please enter a valid phone number.";
        break;
      case "message":
        if (!value.trim()) error = "Message is required.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateForm = () => {
    let valid = true;
    Object.keys(form).forEach((field) => {
      if (!validateField(field, form[field])) valid = false;
    });
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Message sent successfully! We'll get back to you soon.");
      setForm({
        fullName: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
      });
      setErrors({});
    }
  };

  // Utility for floating label active state
  const isActive = (field) => form[field] && form[field].length > 0;
  return (
    <div>
      <div className="w-[calc(100%_-_0.5rem)] md:w-[calc(100%_-_1.5rem)] max-w-7xl mx-auto mt-28 my-32">
        <div className="mb-10">
          <h2
            className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110"
          >
            Contact Us
          </h2>
          <p className="des text-primary-light text-center text-lg max-w-2xl mx-auto">
            Get in touch with us for any inquiries or feedback.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto gap-8">
          {/* Form - top on mobile, right on desktop */}
          <div className="bg-[#fff7f1] rounded-2xl px-2 md:px-4 py-4 md:py-6 lg:py-4 flex-1 shadow-lg order-1 lg:order-2">
            <form id="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="relative mb-9">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full bg-[#ffeddf] border border-[#ffbc88] rounded-lg p-4 text-lg transition-colors outline-none ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#f8c471]"
                  }`}
                />
                <label
                  htmlFor="fullName"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                    isActive("fullName")
                      ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                      : ""
                  }`}
                >
                  Full Name
                </label>
                {errors.fullName && (
                  <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="relative mb-9">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full bg-[#ffeddf] border border-[#ffbc88] rounded-lg p-4 text-lg transition-colors outline-none ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#f8c471]"
                  }`}
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                    isActive("email")
                      ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                      : ""
                  }`}
                >
                  Email
                </label>
                {errors.email && (
                  <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-9 lg:gap-2 mb-9">
                <div className="flex-1 lg:min-w-0 min-w-[200px] relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full bg-[#ffeddf] border border-[#ffbc88] rounded-lg p-4 text-lg transition-colors outline-none ${
                      errors.subject
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#f8c471]"
                    }`}
                  />
                  <label
                    htmlFor="subject"
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                      isActive("subject")
                        ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                        : ""
                    }`}
                  >
                    Subject
                  </label>
                  {errors.subject && (
                    <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="flex-1 lg:min-w-0 min-w-[200px] relative">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full bg-[#ffeddf] border border-[#ffbc88] rounded-lg p-4 text-lg transition-colors outline-none ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#f8c471]"
                    }`}
                  />
                  <label
                    htmlFor="phone"
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                      isActive("phone")
                        ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                        : ""
                    }`}
                  >
                    Phone
                  </label>
                  {errors.phone && (
                    <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 ms-2 text-left">
                <p className="text-lg font-sans ms-2 mb-2">Message</p>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className={`w-full bg-[#ffeddf] border border-[#ffbc88] rounded-lg p-4 text-lg resize-none transition-colors outline-none ${
                    errors.message
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#f8c471]"
                  }`}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-2 ms-2">
                    {errors.message}
                  </p>
                )}
              </div>

              <div class="flex justify-center w-full">
                <PrimaryBtn
                className="w-full flex justify-center md:w-auto"
                type="submit"
              >
                Send Message
              </PrimaryBtn>
              </div> 
            </form>
          </div>

          {/* Map - bottom on mobile, left on desktop */}
          <div className="flex-1 order-2 lg:order-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241264466638!2d-73.98622068458957!3d40.758488979326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f2e9b4b107%3A0x9b3f0c1e0ed9e9e0!2sDelish%20Bite!5e0!3m2!1sen!2sus!4v1631234567890" // Replace with actual map embed URL
              width="100%"
              height="620"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-2xl shadow-lg"
            ></iframe>
          </div>
        </div>

        {/* contact */}
        <div className="bg-[#fff7f1] rounded-2xl p-8 text-primary my-12 shadow-lg flex flex-col justify-between h-full">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
              Contact Information
            </h3>
            <p className="mb-8 text-black text-center">
              We are open for reservations and walk-ins. Feel free to call us
              directly.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mt-1 text-xl lg:text-3xl"
                />
                <div>
                  <p className="font-bold text-lg md:text-2xl">Phone</p>
                  <p className="text-black">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mt-1 text-xl lg:text-3xl"
                />
                <div>
                  <p className="font-bold text-lg md:text-3xl">Email</p>
                  <p className="text-black">info@delishbite.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="mt-1 text-xl lg:text-3xl"
                />
                <div>
                  <p className="font-bold text-lg md:text-2xl">Location</p>
                  <p className="text-black">
                    123 Culinary Ave, Food City, FC 90210
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Optional: Add Social Media Icons here */}
          <div className="mt-10">
            {/*<FontAwesomeIcon icon={faFacebook} />*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
