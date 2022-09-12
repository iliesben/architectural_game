import React, { useRef } from "react";
import styled, { ColorsNames } from "styled-components";
import { ElementType } from "@/types/game.type";

interface Props {
  onClick: (e: ElementType) => void;
}

export const ChooseGame = (props: Props) => {

  const ref = useRef<HTMLDivElement | null>(null)

  const setElement = (e: React.MouseEvent<HTMLDivElement>) => {

    if (ref.current) {
      ref.current.childNodes.forEach(div => (div as HTMLDivElement).classList.remove("selected"))
    }

    (e.target as HTMLDivElement).classList.add("selected");
    props.onClick(
      (e.target as HTMLDivElement).getAttribute("data-element") as ElementType
    )
  };

  return (
    <ArenaContainer>
      <img src="/assets/choose.png" />
      <div className="absolute top-0 w-full flex justify-around" ref={ref}>
        <ChooseType color="emerald" data-element="grass" onClick={setElement}>
          Plante
        </ChooseType>
        <ChooseFire color="amber" data-element="fire" onClick={setElement}>
          Feu
        </ChooseFire>
        <ChooseType color="cyan" data-element="water" onClick={setElement}>
          Eau
        </ChooseType>
      </div>
    </ArenaContainer>
  );
};

const ArenaContainer = styled.div`
  position: relative;
`;

const ChooseType = styled.div.attrs({
  className:
    "flex justify-center items-center flex-1 text-2xl font-semibold",
})<{ color: ColorsNames}>`
  height: 24rem;
  background: #0808087a;
  box-shadow: 0px 0px 8px -4px #000000;
  cursor: pointer;
  :hover {
    color: ${({ theme, color }) => theme.colors[color][200]};
    background: transparent;
  }
  &.selected{
    color: ${({ theme, color }) => theme.colors[color][200]};
    background: transparent;
  }
`;

const ChooseFire = styled(ChooseType)`
  flex: 1.1;
`;
