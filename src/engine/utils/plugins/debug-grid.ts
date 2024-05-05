import { EngineHooks } from "../../contants.js";
import { GameEngine } from "../../index.js";
import { IPlugin } from "../../protocols/plugin.js";

export class DebugGridPlugin implements IPlugin {
  private granularity: number = 0;
  private thickness: number = 1;
  private enabled = false;

  constructor (granularity: number, thickness = 1) {
    this.granularity = granularity;
    this.thickness = thickness;
  }

  install (engine: GameEngine) {
    const [width, height] = engine.getResolution();
    const renderer = engine.getRenderer();

    engine.use(EngineHooks.AFTER_TICK, () => {
      if (this.enabled) {
        for (let i = 0; i < width; i += this.granularity) {
          renderer.drawRectangle(i, 0, this.thickness, height, "white");
          renderer.writeText(i + 2, 24, `${i}`, "white", { fontSize: 24 });
        }
    
        for (let i = this.granularity; i < height; i += this.granularity) {
          renderer.drawRectangle(0, i, width, this.thickness, "white");
          renderer.writeText(2, i + 22, `${i}`, "white", { fontSize: 24 });
        }
      }
    });
  }

  public enable () {
    this.enabled = true;
  }

  public disable () {
    this.enabled = false;
  }

  public toggle () {
    this.enabled = !this.enabled;
  }
}
