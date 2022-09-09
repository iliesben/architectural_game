import React from "react";
import { ImageElement } from "../Image/ImageElement";
import { TextList } from "../Text/TextList";
import { TextContent } from "../Text/TextContent";

export const TextTuto = () => {
  return (
    <div className="flex flex-wrap flex-row justify-center w-full">
      <div className="max-w-lg my-20 mx-10">
        <TextContent text="Bon vasy je t'explique rapidement." />
        <TextContent text="En gros tu as trois personnages, jusqu'à la tu suis ?" />
        <div className="flex flex-row justify-around items-center mt-10">
          <ImageElement source="src/assets/water.gif" />
          <ImageElement source="src/assets/fire.gif" />
          <ImageElement source="src/assets/grass.gif" />
        </div>
      </div>
      <div className="max-w-lg my-20 mx-10">
        <TextContent text="A tour de rôle tu vas devoir choisir un des trois éléments présenté." />
        <TextContent text="Au décompte, vos choix vont être révélés. Pour info:" />
        <ul className="mt-10 text-center">
          <TextList color="red" text="Le feu bat l'herbe" />
          <TextList color="blue" text="L'eau bat le feu" />
          <TextList color="green" text="Et l'herbe bat l'eau" />
        </ul>
      </div>
    </div>
  );
};
