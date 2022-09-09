import React from "react";
import { ImageElement } from "../Image/ImageElement";
import { TextList } from "../Text/TextList";
import { TextContent } from "../Text/TextContent";

export const TextTuto = () => {
  return (
    <div className="flex flex-wrap flex-row justify-center w-full">
      <div className="max-w-lg my-20 mx-10">
        <TextContent text="Bon vas-y je t'explique rapidement." />
        <TextContent text="En gros tu as trois personnages :" />
        <div className="flex flex-row justify-around items-center mt-10">
          <ImageElement source="src/assets/water.gif" />
          <ImageElement source="src/assets/fire.gif" />
          <ImageElement source="src/assets/grass.gif" />
        </div>
      </div>
      <div className="max-w-lg my-20 mx-10">
        <TextContent text="A tour de rôle tu vas devoir choisir un des trois éléments présentés." />
        <TextContent text="Au décompte, vos choix vont être révélés. Pour info :" />
        <ul className="mt-10 text-center">
          <TextList color="red" text="Le feu bas l'herbe" />
          <TextList color="blue" text="L'eau bas le feu" />
          <TextList color="green" text="Et l'herbe bas l'eau" />
        </ul>
      </div>
    </div>
  );
};
