import React from "react";
import { HomeButton } from "../components/Button/Home.button";
import { Title } from "../components/Text/Title.text";
import { JoinForm } from "../components/Form/Join.Form";
import { TutoContainer } from "../components/Container/Tuto/Tuto.container";

export const Tuto = () => (
  <div className="flex flex-col justify-center items-center mt-40">
    <HomeButton link="/" label="Retour à l'accueil" />
    <Title content="Quoi ? Pour de vrai tu connais pas le chifoumi ?" />
    <TutoContainer />
  </div>
)
