// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from "jest-extended";

import { gameTurn } from "./game.util";
import { gameResult } from "./game.util";
import { Element } from "../types/game.type";
import { grass, fire, water } from "./element.util";


expect.extend(matchers);

test("That's a test!", () => {
  expect(1 + 1).toEqual(2);
});

test("Test function game Turn with undefined element", () => {
  const iron: Element = {
    name: "iron", 
    weakness: "iron", 
    strength: "iron"
  }
  const gameTest = gameTurn(grass, iron)
  expect(gameTest).toEqual(undefined)
});

test("Test function game Turn with grass lose or win", () => {
  const loseGrass = gameTurn(grass, fire)
  const winGrass = gameTurn(fire, grass)
  expect(loseGrass).toEqual('Lose')
  expect(winGrass).toEqual('Win')
});