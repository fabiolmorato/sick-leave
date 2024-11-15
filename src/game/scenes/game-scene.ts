import { Scene } from "../../engine/scene/index.js";

import { createText } from "../elements/text.js";
import { createRectangle } from "../elements/rectangle.js";
import { PlayerEntity } from "../entities/player.js";
import { CactusEntity } from "../entities/cactus.js";
import { YogaEntity } from "../entities/yoga.js";
import { BeeEntity } from "../entities/bee.js";
import { VitaminPillEntity } from "../entities/vitamin-pill.js";
import { SidePainEntity } from "../entities/side-pain.js";

interface IColumn {
  columnId: number;
  height: number;
}

export class GameScene extends Scene {
  private player: PlayerEntity;
  private columns: IColumn[] = [];
  private healthPoints = 0;
  private healthUpdateInterval: ReturnType<typeof setInterval> | null = null;
  private daysUpdateInterval: ReturnType<typeof setInterval> | null = null;
  private columnCorrection = 0;
  private playerDirection: "left" | "right" | "none" = "none";
  private jumping = false;
  private daysPassed = 0;

  constructor () {
    super();

    this.player = new PlayerEntity(25, 687);
    this.columns = new Array(24).fill(0).map((_, index) => {
      return {
        columnId: index,
        height: 4
      }
    });

    this.layers.push({
      elements: [
        createRectangle(0, 0, "100%", "100%", "blue")
      ]
    }, {
      elements: [
        ...(this.columns
          .map((column, indexX) =>
            new Array(column.height).fill(0)
              .map((_, indexY) =>
                createRectangle(indexX * 100, 1100 - indexY * 100, 100, 100, "orange", {
                  border: {
                    color: "black",
                    width: 2
                  }
                })
              )
          )
        ).flat()
      ],
      entities: [
        this.player
      ],
      x: 0,
      fixedEntities: true
    }, {
      elements: [
        createText("Health", 50, 88, "black", { fontSize: 48 }),
        createRectangle(250, 50, 800, 50, "black", { filled: false, border: { width: 4, color: "black" } }),
        createRectangle(254, 54, 0, 42, "red"),
        createText("0 days", 1100, 88, "black", { fontSize: 36 })
      ]
    }, {
      elements: [],
      entities: [
        new CactusEntity(520, 702)
      ],
      x: 0
    });
  }

  public tick () {
    super.tick();
    this.player.stop();
    this.correctPlayerPosition();
    this.correctLayerDisplacement();
    this.updateHealthBar();
    this.generateMap();
    this.handleConsumableCollision();
    this.correctVitaminPillPosition();
    this.updateDaysPassedText();
    this.playerDirection = "none";
  }

  public handleLeft () {
    this.player.left();
    this.playerDirection = "left";
  }

  public handleRight () {
    this.player.right();
    this.playerDirection = "right";
  }

  public handleUp (immediate: boolean) {
    if (!immediate || this.jumping) return;
    this.player.jump();
    this.jumping = true;
  }

  public handleA (immediate: boolean) {
    if (!immediate || this.jumping) return;
    this.player.jump();
    this.jumping = true;
  }

  public onEnter () {
    this.healthUpdateInterval = setInterval(() => {
      if (this.healthPoints < 255) {
        this.healthPoints++;
      }
    }, 400);

    this.daysUpdateInterval = setInterval(() => {
      if (this.healthPoints < 255) {
        this.daysPassed++;
      }
    }, 3000);

    this.daysPassed = 0;
    this.healthPoints = 0;
  }

  public onLeave() {
    if (this.healthUpdateInterval) {
      clearInterval(this.healthUpdateInterval);
    }

    if (this.daysUpdateInterval) {
      clearInterval(this.daysUpdateInterval);
    }
  }

  private correctPlayerPosition () {
    const currentColumnIndex = this.getCurrentColumn();
    const currentColumn = this.columns[currentColumnIndex];

    const possibleCollisionBlocks = this.layers[1].elements?.filter(element => element.x >= (currentColumn.columnId - 1) * 100 && element.x <= currentColumn.columnId * 100 + 100);

    for (const block of possibleCollisionBlocks || []) {
      if (
        this.player.getX() + this.player.getWidth() > block.x &&
        this.player.getX() < block.x &&
        this.player.getY() + this.player.getHeight() > block.y + 50
      ) {
        this.player.correctPosition(block.x - this.player.getWidth() - 1, this.player.getY(), { keepVelocityY: true });
      }

      if (
        this.player.getX() < block.x + (block.width as number) &&
        this.player.getX() > block.x &&
        this.player.getY() + this.player.getHeight() > block.y + 50
      ) {
        this.player.correctPosition(block.x + (block.width as number) + 1, this.player.getY(), { keepVelocityY: true });
      }
      
      if (
        this.player.getY() + this.player.getHeight() > block.y &&
        this.player.getX() < block.x + (block.width as number) &&
        this.player.getX() + this.player.getWidth() > block.x &&
        this.player.getVelocityY() > 0
      ) {
        this.player.correctPosition(this.player.getX(), block.y - this.player.getHeight());
        this.jumping = false;
      }
    }

    const furthestLayerPoint = this.getFurthestHorizontalRenderedPoint();

    if (this.player.getX() < this.columnCorrection) {
      this.player.correctPosition(this.columnCorrection, this.player.getY());
    } else if (this.player.getX() >= furthestLayerPoint - this.player.getWidth()) {
      this.player.correctPosition(furthestLayerPoint - this.player.getWidth(), this.player.getY());
    }
  }

  private correctVitaminPillPosition () {
    if (this.layers[1]?.elements && this.layers[3]?.entities) {
      for (const block of this.layers[1].elements) {
        for (const entity of this.layers[3]?.entities) {
          if (entity instanceof VitaminPillEntity) {
            if (
              entity.getX() < block.x + (block.width as number) &&
              entity.getX() > block.x &&
              entity.getY() + entity.getHeight() > block.y + 50
            ) {
              entity.hitLeft(block.x + (block.width as number));
            }

            // check floor
            if (
              entity.getY() + entity.getHeight() > block.y &&
              entity.getX() < block.x + (block.width as number) &&
              entity.getX() + entity.getWidth() > block.x
            ) {
              entity.hitFloor(block.y);
            }
          }
        }
      }
    }
  }

  private updateDaysPassedText () {
    if (this.layers[2].elements && this.layers[2].elements[3]) {
      this.layers[2].elements[3].metadata.text = `${this.daysPassed} days`;
    }
  }

  private handleConsumableCollision () {
    const closeConsumables = this.layers[3].entities?.filter(entity => entity.getX() <= this.player.getX() + 100 && entity.getX() >= this.player.getX() - 100) || [];
    for (const consumable of closeConsumables) {
      if (this.player.isColliding(consumable)) {
        if ("effect" in consumable && typeof consumable.effect === "function") {
          const effect = consumable.effect();
          if (effect.type === "health") {
            this.healthPoints = Math.max(Math.min(this.healthPoints + effect.amount, 255), 0);
            this.layers[3].elements?.push(
              createText(effect.text, this.player.getX(), this.player.getY() - 50, "black", { fontSize: 36, align: "center", ttl: 2500 })
            );
          }
        }

        this.layers[3].entities = this.layers[3].entities?.filter(entity => entity !== consumable);
      }
    }
  }

  private correctLayerDisplacement () {
    if (this.player.getX() > 500) {
      this.layers[1].x = this.player.getX() - 500;
      this.layers[3].x = this.player.getX() - 500;
    }
  }

  private updateHealthBar () {
    if (this.layers[2]?.elements && this.layers[2].elements[2]) {
      this.layers[2].elements[2].width = (792 / 255) * this.healthPoints;
      this.layers[2].elements[2].metadata.color = `rgb(${255 - this.healthPoints}, ${this.healthPoints}, 0)`;
    }
  }

  private generateMap () {
    if (this.player.getX() > 700 + this.columnCorrection) {
      this.deleteFirstColumn();

      const lastColumn = this.columns[this.columns.length - 1];
      const delta = Math.random() > 0.5 ? 1 : 0;
      const deltaDirection = Math.random() > 0.5 ? delta : -delta;
      const potentialNewHeight = lastColumn.height + deltaDirection;
      const newHeight = Math.min(Math.max(potentialNewHeight, 2), 9);

      this.columns.push({
        columnId: lastColumn.columnId + 1,
        height: newHeight
      });

      this.columnCorrection += 100;

      this.addConsumableItem(lastColumn.columnId, newHeight);

      this.layers[1].elements?.push(
        ...new Array(newHeight)
          .fill(0)
          .map((_, indexY) => (
            createRectangle(
              (lastColumn.columnId - 1) * 100,
              1100 - indexY * 100,
              100,
              100,
              "orange",
              { border: { color: "black", width: 2 } }
            )
          ))
      );
    }
  }

  private deleteFirstColumn () {
    const firstColumn = this.columns[0];
    this.layers[1].elements?.splice(0, firstColumn.height);
    this.columns.splice(0, 1);

    if (this.layers[3].entities) {
      this.layers[3].entities = this.layers[3].entities.filter(entity => entity.getX() > (firstColumn.columnId + 1) * 100);
    }
  }

  private getCurrentColumn () {
    return this.columns.findIndex(
      column => (this.player.getX() + this.player.getWidth()) >= (column.columnId) * 100 &&
        this.player.getX() <= (column.columnId + 1) * 100
    );
  }

  private addConsumableItem (columnId: number, height: number) {
    if (Math.random() < 0.2) {
      if (Math.random() > 0.6) {
        this.layers[3].entities?.push(
          new YogaEntity((columnId - 1) * 100 + 20, 1200 - height * 100 - 80)
        );
      } else {
        if (Math.random() < 0.9) {
          this.layers[3].entities?.push(
            new CactusEntity((columnId - 1) * 100 + 20, 1200 - height * 100 - 92)
          );
        } else {
          this.layers[3].entities?.push(
            new SidePainEntity((columnId - 1) * 100 + 20, 1200 - height * 100 - 77)
          );
        }
      }
    }

    if (Math.random() < 0.03) {
      const x = this.columns[18].columnId * 100;
      const y = Math.min(400, 1200 - Math.max(...this.columns.map(column => column.height)) * 100 - 190);
      this.layers[3].entities?.push(
        new BeeEntity(x, 400)
      );
    }

    if (Math.random() < 0.04) {
      const x = this.columns[18].columnId * 100;
      const y = 400;
      this.layers[3].entities?.push(
        new VitaminPillEntity(x, y)
      );
    }
  }
}
