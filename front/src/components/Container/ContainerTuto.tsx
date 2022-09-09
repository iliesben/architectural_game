import React from "react";
import { Title } from "../Text/Title";
import { TextTuto } from "../Tuto/TextTuto";
import { ButtonHome } from "../Button/ButtonHome";

export const ContainerTuto = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <ButtonHome opacity="75" text="Retour à l'accueil" />
      <Title content="Quoi ? Pour de vrai tu connais pas le chifoumi ?" />
      <TextTuto />
    </div>
  );
};
