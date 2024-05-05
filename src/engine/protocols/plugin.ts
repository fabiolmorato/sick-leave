import { GameEngine } from "../index.js";

export interface IPlugin {
  install (engine: GameEngine): void;
}
