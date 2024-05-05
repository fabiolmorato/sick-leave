import { GameEngine } from "../../engine/index.js";
import { EngineHooks } from "../../engine/contants.js";

import { IPlugin } from "../../engine/protocols/plugin.js";

const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

export class KeyboardHandlerPlugin implements IPlugin {
  private lastButtonStatus: { [name: string]: boolean } = {};
  private buttonStatus: { [name: string]: boolean } = {};
  private buttons: { [name: string]: string[] };
  
  constructor (buttons: { [name: string]: string[] }) {
    this.buttons = buttons;

    window.addEventListener("keydown", (e) => {
      for (const button in buttons) {
        for (const key of buttons[button]) {
          if (e.key === key) {
            e.preventDefault();
            this.buttonStatus[button] = true;
            return;
          }
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      for (const button in buttons) {
        for (const key of buttons[button]) {
          if (e.key === key) {
            e.preventDefault();
            this.buttonStatus[button] = false;
            return;
          }
        }
      }
    });
  }
  
  install (engine: GameEngine) {
    engine.use(EngineHooks.BEFORE_TICK, () => {
      const scene = engine.getCurrentScene() as any;

      if (scene) {
        for (const button in this.buttons) {
          if (`handle${capitalize(button)}` in scene && this.buttonStatus[button]) {
            scene[`handle${capitalize(button)}`](this.buttonStatus[button] !== this.lastButtonStatus[button]);
          }
        }
      }

      for (const button in this.buttons) {
        this.lastButtonStatus[button] = this.buttonStatus[button];
      }
    });
  }
}
