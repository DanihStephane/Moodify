export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface MoodElement {
  id: string;
  type: 'image' | 'emoji' | 'text' | 'color';
  content: string;
  position: Position;
  size: Size;
  style?: {
    backgroundColor?: string;
    opacity?: number;
    fontSize?: number;
    fontFamily?: string;
    color?: string;
  };
}