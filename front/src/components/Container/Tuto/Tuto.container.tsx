import React from "react";
import { List } from "../../Text/List.text";
import { Content } from "../../Text/Content.text";

export const TutoContainer = () => (
  <div className="flex flex-wrap flex-row justify-center w-full">
    <div className="max-w-lg my-20 mx-10">
      <Content text="Bon vas-y je t'explique rapidement." />
      <Content text="En gros tu as trois personnages :" />
      <div className="flex flex-row justify-around items-center mt-10">
        <img src="/assets/water.gif" />
        <img src="/assets/fire.gif" />
        <img src="/assets/grass.gif" />
      </div>
    </div>
    <div className="max-w-lg my-20 mx-10">
      <Content text="A tour de rôle tu vas devoir choisir un des trois éléments présentés." />
      <Content text="Au décompte, vos choix vont être révélés. Pour info :" />
      <ul className="mt-10 text-center">
        <List color="red" text="Le feu bat l'herbe" />
        <List color="blue" text="L'eau bat le feu" />
        <List color="green" text="Et l'herbe bat l'eau" />
      </ul>
    </div>
  </div>
);
