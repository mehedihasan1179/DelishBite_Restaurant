import React, { useState, useEffect, useRef } from "react";
import PrimaryBtn from "../../Component/Buttons/PrimaryBtn/PrimaryBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faCirclePause,
  faVolumeHigh,
  faVolumeMute,
  faExpand,
  faCompress,
} from "@fortawesome/free-solid-svg-icons";

const ReservationSection = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    people: "",
    date: "",
    time: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setMinDate(`${year}-${month}-${day}`);
    ["date", "time"].forEach((type) => {
      const input = document.getElementById(type);
      if (input) {
        const handleClick = () => {
          if (typeof input.showPicker === "function") {
            input.showPicker();
          }
          input.focus();
        };
        input.addEventListener("click", handleClick);
        // Cleanup listener on unmount
        return () => {
          input.removeEventListener("click", handleClick);
        };
      }
      return undefined;
    });
  }, []);

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{4}[-.\s]?\d{4}$/;

  const isToday = (someDate) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) error = `${name === "firstName" ? "First" : "Last"} name is required.`;
        break;
      case "email":
        if (!value.trim()) error = "Email is required.";
        else if (!emailRegex.test(value.trim())) error = "Please enter a valid email address.";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required.";
        else if (!phoneRegex.test(value.trim())) error = "Please enter a valid number";
        break;
      case "people":
        if (!value) error = "Select number of people.";
        break;
      case "date":
        if (!value) error = "Please select a date.";
        else if (new Date(value) < new Date(minDate)) error = "Please select a valid date.";
        break;
      case "time":
        if (!value) error = "Please select a time.";
        else if (form.date && isToday(new Date(form.date))) {
          const [hr, min] = value.split(":");
          const selectedTime = new Date();
          selectedTime.setHours(parseInt(hr), parseInt(min), 0, 0);
          if (selectedTime < new Date()) error = "Please select a valid time.";
        }
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
      alert("Reservation submitted successfully! We'll contact you soon.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        people: "",
        date: "",
        time: "",
        additionalInfo: "",
      });
      setErrors({});
    }
  };

  // Utility for floating label active state
  const isActive = (field) => form[field] && form[field].length > 0;

  // Video overlay play/pause
  const videoRef = useRef(null);
  const [isHoveringVideo, setIsHoveringVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const onPlay = () => setIsVideoPlaying(true);
    const onPause = () => setIsVideoPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    // set initial state
    setIsVideoPlaying(!v.paused && !v.ended);
    // sync muted state
    setIsMuted(!!v.muted);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const onFsChange = () => {
      const fs = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      setIsFullScreen(!!fs);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    document.addEventListener("msfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      document.removeEventListener("msfullscreenchange", onFsChange);
    };
  }, []);

  const toggleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!isFullScreen) {
      const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
      if (req) req.call(el).catch(() => {});
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
      if (exit) exit.call(document).catch(() => {});
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(!!v.muted);
  };

  const toggleVideoPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section
      id="reservation-section"
      className="bg-[url('../assets/nano-banana-2025-09-06T18-13-15.png')] relative bg-[#f9f9f9] py-20 px-2 md:px-4 lg:px-8 text-center"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110">
        Make a Reservation
      </h2>
          <p
            className="des text-orange-600 text-lg mx-auto"
          >
            Book your table today and enjoy an unforgettable dining experience at DelishBite.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto gap-4">
          <div className="bg-white rounded-lg px-2 md:px-4 py-4 md:pt-6 lg:pt-4 lg:flex-1 shadow-lg">
            <form id="reservation-form" onSubmit={handleSubmit} noValidate>
              <div className="flex flex-wrap gap-9 mb-9">
                {["firstName", "lastName"].map((name, i) => (
                  <div key={name} className="flex-1 lg:min-w-0 min-w-[250px] relative">
                    <input
                      type="text"
                      id={name}
                      name={name}
                      value={form[name]}
                      onChange={handleChange}
                      className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                        errors[name]
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#f8c471]"
                      }`}
                    />
                    <label
                      htmlFor={name}
                      className={`absolute left-4 top-1/2 focus:top-1 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                        isActive(name)
                          ? "absolute !top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                          : ""
                      }`}
                    >
                      {name === "firstName" ? "First Name" : "Last Name"}
                    </label>
                    {errors[name] && (
                      <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="relative mb-9">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
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

              <div className="relative mb-9">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                    errors.phone
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#f8c471]"
                  }`}
                />
                <label
                  htmlFor="phone"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-lg transition-all ${
                    isActive("phone")
                      ? "!top-1 text-sm py-1 bg-[#e67e22] px-2 rounded text-white"
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

              <div className="flex flex-wrap gap-9 lg:gap-2 mb-9">
                <div className="flex-1 lg:min-w-0 min-w-[200px] relative">
                  <select
                    id="people"
                    name="people"
                    value={form.people}
                    onChange={handleChange}
                    className={`w-full appearance-none border rounded-lg p-4 pr-10 cursor-pointer text-lg transition-colors outline-none ${
                      errors.people
                        ? "border-red-500"
                        : "border-gray-300 focus:border-[#f8c471]"
                    }`}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 5px center",
                      backgroundSize: "20px",
                    }}
                  >
                    <option value=""></option>
                    {[...Array(16)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                    <option value="16+">16+</option>
                  </select>
                  <label
                    htmlFor="people"
                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-md transition-all ${
                      isActive("people")
                        ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                        : ""
                    }`}
                  >
                    No. of people
                  </label>
                  {errors.people && (
                    <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                      {errors.people}
                    </p>
                  )}
                </div>

                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    min={minDate}
                    value={form.date}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                      errors.date
                        ? "border-red-500 text-black"
                        : `border-gray-300 focus:border-[#f8c471] ${
                            form.date ? "text-gray-800" : "text-white"
                          }`
                    }`}
                  />
                  <label
                    htmlFor="date"
                    className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-lg transition-all ${
                      isActive("date")
                        ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                        : "text-gray-600"
                    }`}
                  >
                    Date
                  </label>
                  {errors.date && (
                    <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                      {errors.date}
                    </p>
                  )}
                </div>

                <div className="flex-1 min-w-[200px] relative">
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className={`w-full border rounded-lg p-4 text-lg transition-colors outline-none ${
                      errors.date
                        ? "border-red-500 text-black"
                        : `border-gray-300 focus:border-[#f8c471] ${
                            form.time ? "text-gray-800" : "text-white"
                          }`
                    }`}
                  />
                  <label
                    htmlFor="time"
                    className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-lg transition-all ${
                      isActive("time")
                        ? "!top-1 text-sm bg-[#e67e22] px-2 py-1 rounded text-white"
                        : "text-gray-600"
                    }`}
                  >
                    Time
                  </label>
                  {errors.time && (
                    <p className="absolute text-red-600 text-sm bottom-[-25px] left-2">
                      {errors.time}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 ms-2 text-left">
                <p className="text-lg font-sans ms-2 mb-2">Additional Information</p>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows="4"
                  value={form.additionalInfo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-4 text-lg resize-none focus:border-[#f8c471] focus:outline-none"
                />
              </div>

              <PrimaryBtn className="w-full flex justify-center md:w-auto" type="submit">
                Reserve
              </PrimaryBtn>
            </form>
          </div>

          <div className="right-video flex-1 flex justify-center items-start h-[680px]">
            <div
              className="relative w-full h-full flex items-center justify-center"
              onMouseEnter={() => setIsHoveringVideo(true)}
              onMouseLeave={() => setIsHoveringVideo(false)}
            >
              <video
                ref={videoRef}
                className="rounded-2xl shadow-lg w-full h-full object-cover"
                autoPlay
                muted
                playsInline
                src="./assets/Direk Mandy Reyes Food Reel 2017.mp4"
              >
                Your browser does not support the video tag.
              </video>

              {/* Fullscreen + Mute buttons (top-right) - visible on hover */}
              {isHoveringVideo && (
                <div className="absolute top-2 md:top-4 right-2 md:right-4 z-30 flex gap-2">
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    title={isMuted ? "Unmute" : "Mute"}
                    className="bg-[var(--text-primary-dark)] text-white text-sm lg:text-xl p-1 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10"
                  >
                    {isMuted ? (
                      <FontAwesomeIcon icon={faVolumeHigh} /> 
                    ) : (
                      <FontAwesomeIcon icon={faVolumeMute} />
                    )}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    aria-label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
                    title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}
                    className="bg-[var(--text-primary-dark)] text-white text-sm lg:text-xl p-1 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10"
                  >
                    {isFullScreen ? (
                      <FontAwesomeIcon icon={faCompress} />
                    ) : (
                      <FontAwesomeIcon icon={faExpand} />
                      
                    )}
                  </button>            
                </div>
              )}

              {/* Center play/pause overlay — visible on hover */}
              {isHoveringVideo && (
                <button
                  onClick={toggleVideoPlay}
                  aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                  title={isVideoPlaying ? "Pause" : "Play"}
                  className="absolute bg-[var(--text-primary-dark)] text-white text-xl md:text-3xl p-1 md:p-3 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10"
                >
                  {!isVideoPlaying ? (
                    <FontAwesomeIcon icon={faCirclePlay} />
                  ) : (
                    <FontAwesomeIcon icon={faCirclePause} />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;




