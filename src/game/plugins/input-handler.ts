import { GameEngine } from "../../engine/index.js";
import { EngineHooks } from "../../engine/contants.js";

import { IPlugin } from "../../engine/protocols/plugin.js";

const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

export class InputHandlerPlugin implements IPlugin {
  private lastButtonStatus: { [name: string]: boolean } = {};
  private buttonStatus: { [name: string]: boolean } = {};
  private buttons: string[] = [];
  
  constructor (buttons: string[]) {
    this.buttons.push(...buttons);
    const buttonElements = this.getButtons(this.buttons);

    for (const button in buttonElements) {
      for (const event of ["mousedown", "touchstart"]) {
        buttonElements[button].addEventListener(event, (e) => {
          e.preventDefault();
          this.buttonStatus[button] = true;
        });
      }

      for (const event of ["mouseup", "touchend"]) {
        buttonElements[button].addEventListener(event, (e) => {
          e.preventDefault();
          this.buttonStatus[button] = false;
        });
      }
    }
  }
  
  install (engine: GameEngine) {
    engine.use(EngineHooks.BEFORE_TICK, () => {
      const scene = engine.getCurrentScene() as any;

      if (scene) {
        for (const button of this.buttons) {
          if (`handle${capitalize(button)}` in scene && this.buttonStatus[button]) {
            scene[`handle${capitalize(button)}`](this.buttonStatus[button] !== this.lastButtonStatus[button]);
          }
        }
      }

      for (const button of this.buttons) {
        this.lastButtonStatus[button] = this.buttonStatus[button];
      }
    });
  }

  private getButtons (buttons: string[]) {
    const buttonElements: { [name: string]: HTMLButtonElement } = {};

    for (const button of buttons) {
      buttonElements[button] = document.querySelector(`#game-${button}-button`) as HTMLButtonElement;
    }

    return buttonElements;
  }
}
