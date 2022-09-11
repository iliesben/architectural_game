import React from "react";
import { Title } from "../components/Text/Title.text"
import { HomeButton } from "../components/Button/Home.button";
import { CreateForm } from "../components/Form/Create.Form";

export const Create = () => (
  <div className="flex flex-col justify-center items-center mt-40">
    <HomeButton link="/" label="Retour à l'accueil" />
    <Title content="Pour créer une salle, rentre ton pseudo et clic sur le bouton!" />
    <CreateForm />
  </div>
);