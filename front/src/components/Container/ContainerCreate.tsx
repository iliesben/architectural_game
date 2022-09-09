import React from "react";
import { Title } from "../Text/Title";
import { ButtonHome } from "../Button/ButtonHome";
import { FormCreate } from "../Form/FormCreate";

export const ContainerCreate = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <ButtonHome link="/" text="Retour à l'accueil" />
      <Title content="Pour créer une salle, rentre ton pseudo et clic sur le bouton!" />
      <FormCreate />
    </div>
  );
};
