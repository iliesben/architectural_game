import React from "react";
import { ImageElement } from "../Image/ImageElement";

export const TextTuto = () => {
    return (
        <div className="flex flex-wrap flex-row justify-center w-full text-gray-800 text-xl">
            <div className="max-w-lg my-20 mx-10">
                <p>Bon vasy je t'explique rapidement.</p>
                <p>En gros tu as trois personnages, jusqu'à la tu suis ?</p>
                <div className="flex flex-row justify-around items-center mt-10">
                    <ImageElement source="src/assets/water.gif" />
                    <ImageElement source="src/assets/fire.gif" />
                    <ImageElement source="src/assets/grass.gif" />
                </div>
            </div>
            <div className="max-w-lg my-20 mx-10">
                <p>A tour de rôle tu vas devoir choisir un des trois éléments présenté.</p>
                <p>Au décompte, vos choix vont être révélés. Pour info:</p>
                <ul className="mt-10 text-center">
                    <li className="text-red-700">Le feu bas l'herbe</li>
                    <li className="text-blue-700">L'eau bas le feu</li>
                    <li className="text-green-700">Et l'herbe bas l'eau</li>
                </ul>
            </div>
        </div>
    );
}