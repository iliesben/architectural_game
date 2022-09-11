import React from "react";
import styled from "styled-components";

interface Props {
  children: JSX.Element;
}

const PlaceContainer = styled.div`
  position: absolute;
`;

export const FirstPlace = styled(PlaceContainer)`
  bottom: 22%;
  left: 29%;
`;

export const SecondPlace = styled(PlaceContainer)`
  top: 36%;
  right: 28%;
`