import React from "react";
import { TitleHome } from "../Text/TitleHome";
import { ButtonCreateGame } from "../Button/ButtonCreateGame";
import { ButtonJoinGame } from "../Button/ButtonJoinGame";
import { ButtonTuto } from "../Button/ButtonTuto";
import { ButtonHome } from "../Button/ButtonHome";


export const ContainerHome = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-40">
            <ButtonHome />
            <TitleHome />
            <div className="flex flex-row flex-wrap justify-center items-center mt-10">
                <ButtonCreateGame />
                <ButtonJoinGame/>
                <ButtonTuto />
            </div>
        </div>  
);
}