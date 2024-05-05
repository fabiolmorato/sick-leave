import { IRenderer } from "../protocols/renderer.js";

import { IElement } from "../protocols/element.js";
import { IElementRenderer } from "../protocols/element-renderer.js";
import { Entity } from "../entity/index.js";
import { IEntityRenderer } from "../protocols/entity-renderer.js";

import { EventEmitter } from "../utils/event-emitter.js";

type TGetElementRenderer = (elementTypeName: string) => IElementRenderer;
type TGetEntityRenderer = (entityTypeName: string) => IEntityRenderer<Entity>;

export interface ILayer {
  elements?: IElement[];
  entities?: Entity[];
  inactive?: boolean;
  hidden?: boolean;
  x?: number;
  y?: number;
  fixedEntities?: boolean;
}

export abstract class Scene extends EventEmitter {
  protected layers: ILayer[] = [];

  public render (renderer: IRenderer, getElementRenderer: TGetElementRenderer, getEntityRenderer: TGetEntityRenderer) {
    const [width] = renderer.getDimensions();
    const furthestHorizontalRenderedPoint = this.getFurthestHorizontalRenderedPoint();
    const now = Date.now();
    
    for (const layer of this.layers) {
      if (layer.hidden) continue;

      const horizontalDisplacement = layer.x ? -Math.min(furthestHorizontalRenderedPoint - width, layer.x) : 0;

      if (layer.elements) {
        for (const element of layer.elements) {
          if (element.hide) continue;
          if (element.deleteAt && element.deleteAt < now) continue;
    
          const elementRenderer = getElementRenderer(element.type);
          elementRenderer.render(renderer, element, {
            translate: {
              x: horizontalDisplacement,
              y: -(layer.y ?? 0)
            }
          });
        }
      }

      if (layer.entities) {
        for (const entity of layer.entities) {
          const entityRenderer = getEntityRenderer(entity.getType());
          entityRenderer.render(renderer, entity, {
            translate: {
              x: horizontalDisplacement,
              y: -(layer.y ?? 0)
            }
          });
        }
      }
    }

    this.cleanup();
  }

  protected getFurthestHorizontalRenderedPoint () {
    const furthestPoints = this.layers.map((layer) => Math.max(...[
      -Infinity,
      ...(layer?.elements?.map((element) => element.x + (typeof element.width === "number" ? element.width : 0)) || []),
      ...(!layer?.fixedEntities ? (layer?.entities?.map((entity) => entity.getX() + entity.getWidth()) || []) : [])
    ]));

    return Math.max(...furthestPoints);
  }

  public tick () {
    for (const layer of this.layers) {
      if (layer.inactive) continue;
      
      if (layer.entities) {
        for (const entity of layer.entities) {
          entity.tick();
        }
      }
    }
  }

  public onLeave () {}
  public onEnter () {}

  public getLayers () {
    return this.layers;
  }

  protected cleanup () {
    const now = Date.now();
    for (const layer of this.layers) {
      if (layer.elements) {
        layer.elements = layer.elements.filter((element) => !(element.deleteAt && element.deleteAt <= now));
      }

      if (layer.entities) {
        layer.entities = layer.entities.filter((entity) => !(entity.getDeleteAt() && entity.getDeleteAt() <= now));
      }
    }
  }
}
