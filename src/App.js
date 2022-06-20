import React from "react";
import { Routes, Route } from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import Home from "./components/views/Home/Home";
import Login from "./components/views/Login/Login";
import Register from "./components/views/Register/Register";
import Donate from "./components/views/Donate/Donate";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          {/* Register Route */}
          <Route path="/register" element={<Register />} />

          {/* Home Route */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* Missing Route */}
          <Route element={<RequireAuth />}>
            <Route path="*" element={<Home />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/donate" element={<Donate />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
