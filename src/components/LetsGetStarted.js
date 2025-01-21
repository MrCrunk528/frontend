import React, { useState, useEffect, useRef, useCallback } from "react";
import logo from "../assets/images/logo.png";
import fox_image from "../assets/images/lets_get_1.png";
import phone_image from "../assets/images/lets_get_2.png";
import globe_image from "../assets/images/lets_get_3.png";

const slides = [
  {
    title: "Let’s get started",
    subtitle:
      "Trusted by millions, MetaMask is a secure wallet making the world of web3 accessible to all.",
    image: fox_image,
  },
  {
    title: "Explore decentralized apps",
    subtitle: "Store, send and spend crypto currencies and assets.",
    image: phone_image,
  },
  {
    title: "Say hello to your wallet",
    subtitle:
      "Use your MetaMask to login to decentralized apps - no signup needed.",
    image: globe_image,
  },
];

const LetsGetStarted = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const autoplayRef = useRef();
  const isNavigating = useRef(false);
  const titleRef = useRef(null);

  // Handler to go to the next slide without looping
  const handleNext = useCallback(() => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    console.log("Next button clicked");

    setCurrentSlide((prevSlide) => {
      if (prevSlide < slides.length - 1) {
        return prevSlide + 1;
      }
      return prevSlide;
    });

    setTimeout(() => {
      isNavigating.current = false;
    }, 500); // Match the transition duration 
    // eslint-disable-next-line
  }, [slides.length]);

  // Handler to go to the previous slide without looping
  const handlePrev = useCallback(() => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    console.log("Previous button clicked");

    setCurrentSlide((prevSlide) => {
      if (prevSlide > 0) {
        return prevSlide - 1;
      }
      return prevSlide;
    });

    setTimeout(() => {
      isNavigating.current = false;
    }, 500); // Match the transition duration
  }, []);

  // Function to navigate to a specific slide
  const goToSlide = (index) => {
    if (isNavigating.current) return;
    isNavigating.current = true;
    console.log(`Navigating to slide ${index + 1}`);

    setCurrentSlide(index);

    setTimeout(() => {
      isNavigating.current = false;
    }, 500); // Match the transition duration
  };

  // Autoplay functionality
  useEffect(() => {
    autoplayRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    if (currentSlide >= slides.length - 1) return; // Stop autoplay at the last slide

    const play = () => {
      autoplayRef.current();
    };
    const interval = setInterval(play, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
    // eslint-disable-next-line
  }, [currentSlide, slides.length]);

  // Swipe gesture handlers
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // Minimum distance for a swipe

    if (deltaX > swipeThreshold) {
      // Swiped left
      handleNext();
    } else if (deltaX < -swipeThreshold) {
      // Swiped right
      handlePrev();
    }
  };

  // Action button handlers
  const handleCreateWallet = () => {
    if (agreed) {
      window.location.href = "/improve"; // Consider using React Router's useNavigate for SPA navigation
    }
  };

  const handleImportWallet = () => {
    if (agreed) {
      window.location.href = "/improve"; // Consider using React Router's useNavigate for SPA navigation
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [currentSlide]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#141618] text-text-default">
      {/* NAVBAR */}
      <nav className="w-11/12 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="MetaMask" className="h-6 w-auto" />
        </div>
        <select className="border border-gray-500 bg-[#141618] text-white px-4 py-2 rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          {/* Add more languages as needed */}
        </select>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-xl p-6 md:p-8 pb-14 border border-zinc-800 focus:outline-none"
          tabIndex="0" // Make div focusable for keyboard navigation
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              handlePrev();
            } else if (e.key === "ArrowRight") {
              handleNext();
            }
          }}
          aria-roledescription="carousel"
          aria-label="Get Started Carousel"
        >
          {/* SLIDE title & subtitle */}
          <h2
            className="text-xl md:text-2xl font-bold text-center mb-2 text-white"
            aria-live="polite"
            ref={titleRef}
          >
            {slides[currentSlide].title}
          </h2>
          <p className="text-center mb-6 px-2 text-white">
            {slides[currentSlide].subtitle}
          </p>

          {/* Flex Container for Arrows and Image */}
          <div className="flex items-center justify-between mb-10">
            {/* Left Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className={`text-gray-400 hover:text-gray-200 z-50 p-4 rounded-full bg-transparent focus:outline-none ${
                currentSlide === 0
                  ? "invisible pointer-events-none"
                  : "visible pointer-events-auto"
              }`}
              aria-label="Previous Slide"
              disabled={currentSlide === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Slide images with slide transition */}
            <div
              className="flex-grow overflow-hidden relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="flex-shrink-0 w-full">
                    <img
                      src={slide.image}
                      alt={`Slide ${index + 1}`}
                      className="max-h-48 sm:max-h-40 md:max-h-48 w-full object-contain mx-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className={`text-gray-400 hover:text-gray-200 z-50 p-4 rounded-full bg-transparent focus:outline-none ${
                currentSlide === slides.length - 1
                  ? "invisible pointer-events-none"
                  : "visible pointer-events-auto"
              }`}
              aria-label="Next Slide"
              disabled={currentSlide === slides.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mb-6 space-x-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full ${
                  i === currentSlide ? "bg-white" : "bg-gray-500"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* "I agree" row */}
          <div className="flex items-center justify-center mb-6 space-x-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="custom-checkbox"
              id="agree-terms"
            />
            <label
              htmlFor="agree-terms"
              className="text-xs text-gray-300 text-center"
            >
              I agree to MetaMask’s{" "}
              <a
                href="https://metamask.io/terms.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#43AEFC]"
              >
                Terms of use
              </a>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col items-center space-y-6">
            {/* "Create a new wallet" */}
            <button
              disabled={!agreed}
              className={`create-button py-3 text-sm rounded-full font-medium ${
                agreed
                  ? "bg-[#43AEFC] hover:bg-opacity-90 text-black"
                  : "bg-[#43AEFC] bg-opacity-40 text-black cursor-not-allowed"
              }`}
              onClick={handleCreateWallet}
            >
              Create a new wallet
            </button>

            {/* "Import an existing wallet" */}
            <button
              disabled={!agreed}
              className={`create-button py-3 text-sm rounded-full font-medium border ${
                agreed
                  ? "border-[#43AEFC] text-[#43AEFC] hover:bg-[#43AEFC] hover:text-white hover:opacity-90"
                  : "border-[#43AEFC] text-[#43AEFC] opacity-40 cursor-not-allowed"
              }`}
              onClick={handleImportWallet}
            >
              Import an existing wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetsGetStarted;
