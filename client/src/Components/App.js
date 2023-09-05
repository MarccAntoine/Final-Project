import React from "react";
import { Route, BrowserRouter, Routes, useLocation, Navigate } from 'react-router-dom';
import GlobalStyles from "./GlobalStyles";
import Navbar from "./navbarcomponents/Navbar";
import DefPage from "./DefPage";
import Homepage from "./Homepage";
import Stocks from "./stocks/Stocks";
import Planner from "./Planner";
import Grocery from "./Grocery";
import Recipes from "./Recipes";
import Profile from "./Profile";
import Error from "./Error";
import NewUserSetup from "./newUserSetup/SetupContainer";
import { useAuth0 } from "@auth0/auth0-react";
import InvitePage from "./InvitePage";

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
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<DefPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/stocks" element={isAuthenticated ? (<Stocks />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/planner" element={isAuthenticated ? (<Planner />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/grocery" element={isAuthenticated ? (<Grocery />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/recipes" element={isAuthenticated ? (<Recipes />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/recipes/:recipeId" element={isAuthenticated ? (<Recipes />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/profile" element={isAuthenticated ? (<Profile />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/profile/setup" element={isAuthenticated ? (<NewUserSetup />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/invite" element={isAuthenticated ? (<InvitePage />) : (<Navigate to={"/"} replace/>)} />
        <Route path="/error" element={isAuthenticated ? (<Error />) : (<Navigate to={"/"} replace/>)} />
        <Route path="*" element={isAuthenticated ? (<Error />) : (<Navigate to={"/"} replace/>)} />
      </Routes>
    </>
  );
}

export default App;
