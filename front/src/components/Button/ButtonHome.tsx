import React from "react";
import { Link } from "react-router-dom";

export const ButtonHome = () => {
    return (
        <Link to="/" className="absolute top-5 left-5 px-4 py-6 bg-gray-600 bg-opacity-50 rounded-lg font-mono text-white hover:bg-opacity-75">Retour à l'accueil</Link>    
    );
}