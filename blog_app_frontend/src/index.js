import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AllPost from "./components/AllPost";
import MyPosts from "./components/MyPosts";
import AddPost from "./components/AddPost";
import BlogDetail from "./components/BlogDetail";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col m-5">
      <Navbar />
      <main className="flex-grow mt-3">
        <Outlet />
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="all-posts" element={<AllPost />} />
          <Route path="all-posts/:id" element={<BlogDetail />} />{" "}
          {/* Corrected path */}
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="add-post" element={<AddPost />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
