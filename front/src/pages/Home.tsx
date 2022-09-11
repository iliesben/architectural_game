import React from "react";
import { Title } from "../components/Text/Title.text";
import { ButtonLink } from "../components/Button/Link.button";;

export const Home = () => (
  <div className="flex flex-col justify-center items-center mt-40">
    <Title content="Bienvenu sur le meilleur chifoumi de ta vie!" />
    <div className="flex flex-row flex-wrap justify-center items-center mt-10">
      <ButtonLink link="/create" color="green" label="Créer une partie" />
      <ButtonLink link="/join" color="blue" label="Rejoindre une partie" />
      <ButtonLink link="/tuto" color="red" label="Voir le tuto" />
    </div>
  </div>
);
