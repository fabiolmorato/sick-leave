import { IImageOptions, IRectangleOptions, IRenderer, ITextOptions } from "../protocols/renderer.js";

export class Canvas2DContextRenderer implements IRenderer {
  private canvas: HTMLCanvasElement | OffscreenCanvas;
  private context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

  private width = 800;
  private height = 600;
  private horizontalProportion = 1;
  private verticalProportion = 1;

  constructor (canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  }

  drawRectangle (x: number, y: number, width: number | string, height: number | string, color: string, options?: IRectangleOptions): void {
    if (options?.border && options?.border.width > 0) {
      this.drawRectangle(x, y, width, options.border.width, options.border.color, {
        filled: true
      });

      this.drawRectangle(x, y, options.border.width, height, options.border.color, {
        filled: true
      });

      this.drawRectangle(x, y + (height as number) - options.border.width, width, options.border.width, options.border.color, {
        filled: true
      });

      this.drawRectangle(x + (width as number) - options.border.width, y, options.border.width, height, options.border.color, {
        filled: true
      });
    }

    let radius = options?.radius || 0;
    const filled = options?.filled ?? true;

    if (typeof width === "string") width = +width.split("%")[0] / 100 * this.width;
    if (typeof height === "string") height = +height.split("%")[0] / 100 * this.height;

    if (options?.border && options.border.width > 0) {
      width -= options.border.width * 2;
      height -= options.border.width * 2;
      x += options.border.width;
      y += options.border.width;
    }

    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;

    if (filled) this.context.fillStyle = color;
    else this.context.fillStyle = "transparent";
    this.context.strokeStyle = color;

    this.context.beginPath();
    this.context.moveTo(x + radius, y);
    this.context.arcTo(x + width, y, x + width, y + height, radius);
    this.context.arcTo(x + width, y + height, x, y + height, radius);
    this.context.arcTo(x, y + height, x, y, radius);
    this.context.arcTo(x, y, x + width, y, radius);
    this.context.closePath();
    
    if (filled) this.context.fill();
    else this.context.stroke();
  }

  drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number, options?: IImageOptions): void {
    if (typeof options?.startX === "number" && typeof options?.startY === "number" && typeof options?.width === "number" && typeof options?.height === "number") {
      this.context.drawImage(image, options.startX, options.startY, options.width, options.height, x, y, width, height);
    } else {
      this.context.drawImage(image, x, y, width, height);
    }
  }

  writeText(x: number, y: number, text: string, color: string, options?: ITextOptions): void {
    this.context.fillStyle = color;

    const fontSize = options?.fontSize || 16;
    this.context.font = `${fontSize}px 'Anonymous Pro'`;
    this.context.textAlign = (options?.align || "left") as CanvasTextAlign;

    this.context.fillText(text, x, y);
  }

  setDimenstions(width: number, height: number): void {
    this.width = width;
    this.height = height;

    this.setProportions();
  }

  private setProportions () {
    this.horizontalProportion = this.canvas.width / this.width;
    this.verticalProportion = this.canvas.height / this.height;

    this.context.scale(this.horizontalProportion, this.verticalProportion);
  }

  public getDimensions () {
    return [this.width, this.height];
  }
}
