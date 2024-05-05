import { Scene } from "./scene/index.js";
import { Entity } from "./entity/index.js";

import { EngineHooks } from "./contants.js";

import { IRenderer } from "./protocols/renderer.js";
import { IElementRenderer } from "./protocols/element-renderer.js";
import { IPlugin } from "./protocols/plugin.js";
import { IEntityRenderer } from "./protocols/entity-renderer.js";

export class GameEngine {
  private renderer: IRenderer;
  private elementRenderers: { [elementTypeName: string]: IElementRenderer } = {};
  private entityRenderers: { [entityTypeName: string]: IEntityRenderer<Entity> } = {};
  private scenes: { [sceneName: string]: Scene } = {};
  private currentSceneName = "";
  private currentScene: Scene | null = null;
  private hooks: { [name: number]: Function[] } = {};

  private width = 800;
  private height = 600;
  
  constructor (renderer: IRenderer) {
    this.renderer = renderer;
  }

  public setResolution (width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderer.setDimenstions(width, height);
  }

  public addElementRenderer (elementTypeName: string, elementRenderer: IElementRenderer) {
    this.elementRenderers[elementTypeName] = elementRenderer;
  }

  public addEntityRenderer (entityTypeName: string, entityRenderer: IEntityRenderer<Entity>) {
    this.entityRenderers[entityTypeName] = entityRenderer;
  }

  public addScene (sceneName: string, scene: Scene) {
    this.scenes[sceneName] = scene;
  }

  public setScene (sceneName: string) {
    if (this.currentScene && this.currentScene["onLeave"]) {
      this.currentScene.onLeave();
    }

    this.currentSceneName = sceneName;
    this.currentScene = this.scenes[sceneName];

    if (this.currentScene["onEnter"]) {
      this.currentScene["onEnter"]();
    }
  }

  public tick () {
    this.runHooks(EngineHooks.BEFORE_TICK);

    this.currentScene?.render(
      this.renderer,
      (name: string) => this.elementRenderers[name],
      (name: string) => this.entityRenderers[name]
    );
    this.currentScene?.tick();

    this.runHooks(EngineHooks.AFTER_TICK);
  }

  private runHooks (name: EngineHooks) {
    const hooks =  this.hooks[name];
    if (!(hooks instanceof Array)) return;
    
    for (const hook of hooks) {
      hook();
    }
  }

  public getCurrentSceneName () {
    return this.currentSceneName;
  }

  public getCurrentScene () {
    return this.currentScene;
  }

  public getRenderer () {
    return this.renderer;
  }

  public use (hook: EngineHooks, fn: Function) {
    if (!this.hooks[hook]) {
      this.hooks[hook] = [];
    }

    this.hooks[hook].push(fn);
  }

  public addPlugin (plugin: IPlugin) {
    plugin.install(this);
  }

  public getResolution () {
    return [this.width, this.height];
  }
}
