export interface IRectangleOptions {
  filled?: boolean;
  radius?: number;
  border?: {
    color: string;
    width: number;
  };
}

export interface IImageOptions {
  startX?: number;
  startY?: number;
  width?: number;
  height?: number;
}

export interface ITextOptions {
  fontSize?: number;
  outline?: boolean;
  align?: string;
}

export interface IRenderer {
  drawRectangle (x: number, y: number, width: number | string, height: number | string, color: string, options?: IRectangleOptions): void;
  drawImage (image: HTMLImageElement, x: number, y: number, width: number | string, height: number | string, options?: IImageOptions): void;
  writeText (x: number, y: number, text: string, color: string, options?: ITextOptions): void;
  setDimenstions (width: number | string, height: number | string): void;
  getDimensions (): number[];
}
