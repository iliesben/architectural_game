import React from "react";
import { Routes, Route } from "react-router-dom";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Tuto } from "./pages/Tuto";


export const Router = () => {
    return (
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/game/:uuid" element={<Game />}/>
        <Route path="/tuto" element={<Tuto />} />
      </Routes>
    );
};