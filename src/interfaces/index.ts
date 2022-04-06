export interface Room {
  id: string;
  type: string;
  x: number;
  y: number;
  obstacles: string[];
}

export interface RoomState {
  showTypes: boolean;
  showObstacles: boolean;
  activeElement: string | null;
  floorSize: string;
  rooms: Room[][];
}

export interface PotentialSuper {
  room: Room;
  position: string;
}
