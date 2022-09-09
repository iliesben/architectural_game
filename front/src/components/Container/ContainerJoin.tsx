import React from "react";
import { Title } from "../Text/Title";
import { FormJoin } from "../Form/FormJoin";
import { ButtonHome } from "../Button/ButtonHome";

export const ContainerJoin = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <ButtonHome link="/" text="Retour à l'accueil" />
      <Title content="Pour rejoindre une salle, rentre ton pseudo et le nom de la salle!" />
      <FormJoin />
    </div>
  );
};
