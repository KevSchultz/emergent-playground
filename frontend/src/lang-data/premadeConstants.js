import gameOfLifeShader from "../shaders/gameOfLife.frag?raw";
import seedsShader from "../shaders/seeds.frag?raw";
import briansBrainShader from "../shaders/briansBrain.frag?raw";
import wireworldShader from "../shaders/wireworld.frag?raw";

const gameOfLife = {
  name: "Game of Life",
  tupleList: [
    { color: "#ffffff", name: "live" },
    { color: "#000000", name: "dead" },
  ],
  defaultDraw: "#ffffff",
  defaultBackground: "#000000",
  url: "https://lh3.googleusercontent.com/iZwB2p3rX7D7h-4QWSmKXy-_4FBRVCB8A8vrGwQduZzqfU-1ZMewoumgw3HOTiOsrN3Ax_vnOuUGRFnWuIbGoOWpAnpCoxGqvxg",
  shader: gameOfLifeShader,
  neighborhood: "moore",
  range: 1,
  includeSelf: false,
};

const seeds = {
  name: "Seeds",
  tupleList: [
    { color: "#ffffff", name: "live" },
    { color: "#000000", name: "dead" },
  ],
  defaultDraw: "#ffffff",
  defaultBackground: "#000000",
  url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Seeds_140_generations.gif",
  shader: seedsShader,
  neighborhood: "moore",
  range: 1,
  includeSelf: false,
};

const briansBrain = {
  name: "Brian's Brain",
  tupleList: [
    { color: "#ffffff", name: "live" },
    { color: "#000000", name: "dead" },
    { color: "#0026ff", name: "dying" },
  ],
  defaultDraw: "#ffffff",
  defaultBackground: "#000000",
  url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Brian%27s_brain.gif",
  shader: briansBrainShader,
  neighborhood: "moore",
  range: 1,
  includeSelf: false,
};

const wireworld = {
  name: "Wireworld",
  tupleList: [
    { color: "#000000", name: "empty" },
    { color: "#00ffff", name: "electron_head" },
    { color: "#ff0000", name: "electron_tail" },
    { color: "#ffff00", name: "conductor" },
  ],
  defaultDraw: "#ffff00",
  defaultBackground: "#000000",
  url: "https://upload.wikimedia.org/wikipedia/commons/1/13/Wireworld_XOR-gate.gif",
  shader: wireworldShader,
  neighborhood: "moore",
  range: 1,
  includeSelf: false,
};

export default [gameOfLife, seeds, briansBrain, wireworld];
