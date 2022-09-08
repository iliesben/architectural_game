import React from "react";

interface PropsImage {
    source: string
}

export const ImageElement = ({ source }: PropsImage) => {
    return (
        <img src={source} alt="" />
    );
}