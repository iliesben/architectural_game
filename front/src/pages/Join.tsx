import { HomeButton } from "../components/Button/Home.button";
import { Title } from "../components/Text/Title.text";
import { JoinForm } from "../components/Form/Join.Form";
import React from "react";

export const Join = () => (
  <div className="flex flex-col justify-center items-center mt-40">
    <HomeButton link="/" label="Retour à l'accueil" />
    <Title content="Pour rejoindre une salle, rentre ton pseudo et le nom de la salle!" />
    <JoinForm />
  </div>
);
