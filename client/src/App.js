import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Login, CreateAccount, Dashboard, Account } from "./pagesImport.js";
import Nav from "./components/Nav";

import { useEffect, useState } from "react";
import auth from "./auth/auth.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuth = async () => {
    const { success } = await auth();
    setIsLoggedIn(success);
  };

  useEffect(() => {
    isAuth();
  }, []);

  const handleSetIsLoggedIn = (isLogged) => {
    setIsLoggedIn(isLogged);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav isLoggedIn={isLoggedIn} handleSetIsLoggedIn={handleSetIsLoggedIn} />
        <Routes>
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} handleSetIsLoggedIn={handleSetIsLoggedIn} />} />
          <Route path="/createAccount" element={<CreateAccount isLoggedIn={isLoggedIn} handleSetIsLoggedIn={handleSetIsLoggedIn} />} />
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} handleSetIsLoggedIn={handleSetIsLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} handleSetIsLoggedIn={handleSetIsLoggedIn} />} />
          <Route path="/account" element={<Account isLoggedIn={isLoggedIn} handleSetIsLoggedIn={handleSetIsLoggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
