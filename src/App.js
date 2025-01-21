import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LetsGetStarted from "./components/LetsGetStarted";
import ImproveDopeCoin from "./components/ImproveDopeCoin";
import SecretRecoveryPhrase from "./components/SecretRecoveryPhrase";
import CreatePassword from "./components/CreatePassword";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing screen  */}
        <Route path="/" element={<LetsGetStarted />} />

        {/* Possibly after user chooses “Create Wallet,” you go here */}
        <Route path="/improve" element={<ImproveDopeCoin />} />

        {/* “Import an existing wallet” goes here */}
        <Route path="/recovery" element={<SecretRecoveryPhrase />} />

        {/* “Create Password */}
        <Route path="/create-password" element={<CreatePassword />} />
      </Routes>
    </Router>
  );
};

export default App;
