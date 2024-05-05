export interface IElementMetadata {
  [key: string]: any;
}

export interface IElement {
  type: string;

  x: number;
  y: number;
  width?: number | string;
  height?: number | string;

  hide?: boolean;

  metadata: IElementMetadata;
}
