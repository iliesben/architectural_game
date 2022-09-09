import React from "react";
import { Title } from "../Text/Title";
import { ButtonLink } from "../Button/ButtonLink";

export const ContainerHome = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <Title content="Bienvenu sur le meilleur chifoumi de ta vie!" />
      <div className="flex flex-row flex-wrap justify-center items-center mt-10">
        <ButtonLink link="/create" color="green" text="Créer une partie" />
        <ButtonLink link="/join" color="blue" text="Rejoindre une partie" />
        <ButtonLink link="/tuto" color="red" text="Voir le tuto" />
      </div>
    </div>
  );
};
