import React from "react";
import { Title } from "../components/Text/Title"
import { ButtonHome } from "../components/Button/ButtonHome";
import { FormCreate } from "../components/Form/FormCreate";

export const Create = () => (
  <div className="flex flex-col justify-center items-center mt-40">
    <ButtonHome link="/" text="Retour à l'accueil" />
    <Title content="Pour créer une salle, rentre ton pseudo et clic sur le bouton!" />
    <FormCreate />
  </div>
);