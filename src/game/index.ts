import { GameEngine } from "../engine/index.js";
import { Canvas2DContextRenderer } from "../engine/utils/canvas-2d-context-renderer.js";

import { InputHandlerPlugin } from "./plugins/input-handler.js";
import { KeyboardHandlerPlugin } from "./plugins/keyboard-handler.js";
import { DebugGridPlugin } from "../engine/utils/plugins/debug-grid.js";
import { CollisionBoxPlugin } from "../engine/utils/plugins/collision-box.js";

import { TextRenderer } from "./renderers/text-renderer.js";
import { RectangleRenderer } from "./renderers/rectangle-renderer.js";
import { LogoElementRenderer } from "./renderers/logo-renderer.js";

import { PlayerEntityRenderer } from "./renderers/player-renderer.js";
import { CactusRenderer } from "./renderers/cactus-renderer.js";
import { YogaRenderer } from "./renderers/yoga-renderer.js";
import { BeeRenderer } from "./renderers/bee-renderer.js";
import { VitaminPillRenderer } from "./renderers/vitamin-pill-renderer.js";

import { LoadingScene } from "./scenes/loading.js";
import { StartMenuScene } from "./scenes/start-menu.js";
import { CreditsScene } from "./scenes/credits-scene.js";
import { PreGameScene } from "./scenes/pre-game-scene.js";
import { GameScene } from "./scenes/game-scene.js";

import { logo } from "./images/logo.js";
import { SidePainRenderer } from "./renderers/side-pain-renderer.js";

export class Game {
  private engine: GameEngine;
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor (canvas: HTMLCanvasElement) {
    const renderer = new Canvas2DContextRenderer(canvas);

    this.engine = new GameEngine(renderer);
    this.engine.setResolution(1600, 1200);

    window.addEventListener("resize", () => {
      this.engine.setResolution(1600, 1200);
    });

    const inputHandler = new InputHandlerPlugin(["up", "down", "left", "right", "start", "back", "a"]);
    this.engine.addPlugin(inputHandler);

    const keyboardHandler = new KeyboardHandlerPlugin({
      up: ["w", "W", "ArrowUp"],
      down: ["s", "S", "ArrowDown"],
      start: [" ", "Enter"],
      back: ["Escape"],
      left: ["a", "A", "ArrowLeft"],
      right: ["d", "D", "ArrowRight"]
    });
    this.engine.addPlugin(keyboardHandler);

    const debugGrid = new DebugGridPlugin(100, 2);
    this.engine.addPlugin(debugGrid);

    const collisionBox = new CollisionBoxPlugin();
    this.engine.addPlugin(collisionBox);

    window.addEventListener("keypress", (event) => {
      if (event.key === "g") {
        debugGrid.toggle();
      } else if (event.key === "c") {
        collisionBox.toggle();
      }
    });

    this.engine.addElementRenderer("text", new TextRenderer());
    this.engine.addElementRenderer("rectangle", new RectangleRenderer());
    this.engine.addElementRenderer("logo", new LogoElementRenderer());

    this.engine.addEntityRenderer("player", new PlayerEntityRenderer());
    this.engine.addEntityRenderer("cactus", new CactusRenderer());
    this.engine.addEntityRenderer("yoga", new YogaRenderer());
    this.engine.addEntityRenderer("bee", new BeeRenderer());
    this.engine.addEntityRenderer("vitamin-pill", new VitaminPillRenderer());
    this.engine.addEntityRenderer("side-pain", new SidePainRenderer());

    const loadingScene = new LoadingScene();
    const startMenuScene = new StartMenuScene();
    const creditsScene = new CreditsScene();
    const preGameScene = new PreGameScene();
    const gameScene = new GameScene();

    startMenuScene.on("start-game", () => {
      this.engine.setScene("pre-game");
    });

    startMenuScene.on("credits", () => {
      this.engine.setScene("credits");
    });

    creditsScene.on("back", () => {
      this.engine.setScene("startMenu");
    });

    preGameScene.on("back", () => {
      this.engine.setScene("startMenu");
    });

    preGameScene.on("start", () => {
      this.engine.setScene("game");
    });

    this.engine.addScene("loading", loadingScene);
    this.engine.addScene("startMenu", startMenuScene);
    this.engine.addScene("credits", creditsScene);
    this.engine.addScene("pre-game", preGameScene);
    this.engine.addScene("game", gameScene);

    this.engine.setScene("loading");

    if (logo.complete) {
      this.engine.setScene("startMenu");
    }

    logo.onload = () => this.engine.setScene("startMenu");
  }

  init () {
    this.interval = setInterval(() => {
      this.engine.tick()
    }, 1000 / 60);
  }

  stop () {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
