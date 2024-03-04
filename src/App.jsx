// App.js

import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/footer";
import HomePage from "./components/Homepage";
import AboutPage from "./components/Aboutpage";
import ProjectListing from "./components/ProjectListing";
import Login from "./components/login"; // Adjust the path as needed
import RegisterForm from "./components/register";
import PostProjectForm from "./components/PostProjectForm";
import { initialState, reducer } from "./Reducer/UserReducer";
import Logout from "./components/Logout";
import ManageProjects from "./components/ManageProjects";
export const UserContext = createContext();
const Routnig = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/about" element={<AboutPage />} />{" "}
          <Route path="/projects" element={<ProjectListing />} />
          <Route path="/ManageProjects" element={<ManageProjects />} />
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/register" element={<RegisterForm />} />{" "}
          <Route path="/post-project" element={<PostProjectForm />} />{" "}
          <Route path="/Logout" element={<Logout />} />{" "}
          {/* Add more routes for other components/pages */}{" "}
        </Routes>{" "}
        <Footer />
      </div>{" "}
    </Router>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Routnig />
    </UserContext.Provider>
  );
};

export default App;
