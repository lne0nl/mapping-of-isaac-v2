export interface Room {
  id: string;
  type: string;
  x: number;
  y: number;
  obstacles: string[];
}

export type Line = Array<Room>;

export interface ActiveElement {
  x: number;
  y: number;
}

export interface RoomState {
  showTypes: boolean;
  showRooms: boolean;
  showObstacles: boolean;
  activeElement: ActiveElement;
  floorSize: string;
  rooms: Line[];
}
