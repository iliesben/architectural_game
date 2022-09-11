import React from "react";
import { Routes, Route } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Tuto } from "./pages/Tuto";
import { Join } from "./pages/Join";
import { Create } from "./pages/Create";


export const Router = () => (
  <Routes>
    <Route path="" element={<Home />} />
    <Route path="/game/:uuid" element={<Game />} />
    <Route path="/tuto" element={<Tuto />} />
    <Route path="/join" element={<Join />} />
    <Route path="/create" element={<Create />} />
  </Routes>
);