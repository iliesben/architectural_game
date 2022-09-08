import React from "react";
import { Title } from "../Text/Title";
import { ButtonColor } from "../Button/ButtonColor";

export const ContainerHome = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <Title content="Bienvenu sur le meilleur chifoumi de ta vie!" />
      <div className="flex flex-row flex-wrap justify-center items-center mt-10">
        <ButtonColor color="green" text="Créer une partie" />
        <ButtonColor color="blue" text="Rejoindre une partie" />
        <ButtonColor color="red" text="Voir le tuto" />
      </div>
    </div>
  );
};
