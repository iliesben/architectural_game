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

test("Test function game Turn with same element", () => {
  const sameElementGrass = gameTurn(grass, grass)
  const sameElementWater = gameTurn(water, water)
  const sameElementFire = gameTurn(fire, fire)
  expect(sameElementGrass).toEqual('Same')
  expect(sameElementWater).toEqual('Same')
  expect(sameElementFire).toEqual('Same')
});

test("Test function game Turn with grass lose or win", () => {
  const loseGrass = gameTurn(grass, fire)
  const winGrass = gameTurn(fire, grass)
  expect(loseGrass).toEqual('Lose')
  expect(winGrass).toEqual('Win')
});

test("Test function game Turn with fire lose or win", () => {
  const loseFire = gameTurn(fire, water)
  const winFire = gameTurn(fire, grass)
  expect(loseFire).toEqual('Lose')
  expect(winFire).toEqual('Win')
});

test("Test function game Turn with water lose or win", () => {
  const loseWater = gameTurn(water, grass)
  const winWater = gameTurn(water, fire)
  expect(loseWater).toEqual('Lose')
  expect(winWater).toEqual('Win')
});