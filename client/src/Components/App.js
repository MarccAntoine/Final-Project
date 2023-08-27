import React from "react";
import { Route, BrowserRouter, Routes, useLocation } from 'react-router-dom';
import GlobalStyles from "./GlobalStyles";
import Navbar from "./navbarcomponents/Navbar";
import DefPage from "./DefPage";
import Homepage from "./Homepage";
import Stocks from "./Stocks";
import Planner from "./Planner";
import Grocery from "./Grocery";
import Recipes from "./Recipes";
import Profile from "./Profile";
import Error from "./Error";
import NewUserSetup from "./newUserSetup/SetupContainer";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRoutes />
    </BrowserRouter>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const showNavbar = (location.pathname !== "/" && location.pathname !== "/profile/setup" && location.pathname !== "/profile/join");

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<DefPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/grocery" element={<Grocery />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/setup" element={<NewUserSetup />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
