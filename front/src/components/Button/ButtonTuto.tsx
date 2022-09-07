import React from "react";
import { Link } from "react-router-dom";

export const ButtonTuto = () => {
    return ( 
        <Link to="/tuto" className="m-2 px-4 py-6 bg-red-600 bg-opacity-25 rounded-lg font-mono text-red-700 hover:bg-red-300">Voir le tuto</Link>    
    );
}