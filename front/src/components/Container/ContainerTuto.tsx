import React from "react";
import { TitleTuto } from "../Text/TitleTuto";
import { TextTuto } from "../Text/TextTuto";
import { ButtonHome } from "../Button/ButtonHome";

export const ContainerTuto = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-40">
            <ButtonHome />
            <TitleTuto />
            <TextTuto />
        </div>  
);
}