import { ButtonHome } from "@/components/Button/ButtonHome";
import { Title } from "@/components/Text/Title";
import { FormJoin } from "@/components/Form/FormJoin";
import React from "react";

export const Join = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <ButtonHome link="/" text="Retour à l'accueil" />
      <Title content="Pour rejoindre une salle, rentre ton pseudo et le nom de la salle!" />
      <FormJoin />
    </div>
  );
};
