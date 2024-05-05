import { Entity } from "../entity/index.js";
import { IRenderer } from "./renderer.js";

export interface IEntityRendererOptions {
  translate?: {
    x?: number;
    y?: number;
  }
}

export interface IEntityRenderer<EntityType extends Entity> {
  render (renderer: IRenderer, entity: EntityType, options?: IEntityRendererOptions): void;
}
