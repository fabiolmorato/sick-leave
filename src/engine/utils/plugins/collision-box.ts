import { EngineHooks } from "../../contants.js";
import { GameEngine } from "../../index.js";
import { IPlugin } from "../../protocols/plugin.js";

export class CollisionBoxPlugin implements IPlugin {
  private enabled = false;

  install (engine: GameEngine) {
    const renderer = engine.getRenderer();

    engine.use(EngineHooks.AFTER_TICK, () => {
      if (this.enabled) {
        const scene = engine.getCurrentScene();
        const [width] = engine.getResolution();
        if (scene) {
          const layers = scene.getLayers();
          const furthestLayerPoint = scene["getFurthestHorizontalRenderedPoint"]();
          for (const layer of layers) {
            if (layer.entities) {
              const horizontalDisplacement = layer.x ? -Math.min(furthestLayerPoint - width, layer.x) : 0;
              for (const entity of layer.entities) {
                const { x, y, width, height } = entity.getCollisionBox();
                renderer.drawRectangle(x + horizontalDisplacement, y, width, height, "white", {
                  filled: false,
                  border: {
                    width: 5,
                    color: "white"
                  }
                });
              }
            }
          }
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
