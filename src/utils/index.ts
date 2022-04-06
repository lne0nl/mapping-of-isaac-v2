import type { RoomState } from "@/interfaces";

// export const getEmptyFloor = () => {
//   return [
//     { id: "0", type: "", x: 0, y: 0, obstacles: [] },
//     { id: "1", type: "", x: 1, y: 0, obstacles: [] },
//     { id: "2", type: "", x: 2, y: 0, obstacles: [] },
//     { id: "3", type: "", x: 0, y: 1, obstacles: [] },
//     { id: "4", type: "empty", x: 1, y: 1, obstacles: [] },
//     { id: "5", type: "", x: 2, y: 1, obstacles: [] },
//     { id: "6", type: "", x: 0, y: 2, obstacles: [] },
//     { id: "7", type: "", x: 1, y: 2, obstacles: [] },
//     { id: "8", type: "", x: 2, y: 2, obstacles: [] },
//   ]
// }

export const getEmptyFloor = () => [
  [
    { id: "0", type: "", x: 0, y: 0, obstacles: [] },
    { id: "1", type: "", x: 1, y: 0, obstacles: [] },
    { id: "2", type: "", x: 2, y: 0, obstacles: [] },
  ],
  [
    { id: "3", type: "", x: 0, y: 1, obstacles: [] },
    { id: "4", type: "empty", x: 1, y: 1, obstacles: [] },
    { id: "5", type: "", x: 2, y: 1, obstacles: [] },
  ],
  [
    { id: "6", type: "", x: 0, y: 2, obstacles: [] },
    { id: "7", type: "", x: 1, y: 2, obstacles: [] },
    { id: "8", type: "", x: 2, y: 2, obstacles: [] },
  ],
];

export const addNewRooms = (state: RoomState) => {
  const activeElement = state.activeElement;
  if (activeElement) {
    const activeX = +state.rooms[+activeElement].x;
    const activeY = +state.rooms[+activeElement].y;

    const topRoom = state.rooms.filter(
      (room) => room.y === activeY - 1 && room.x === activeX
    )[0];
    const rightRoom = state.rooms.filter(
      (room) => room.y === activeY && room.x === activeX + 1
    )[0];
    const bottomRoom = state.rooms.filter(
      (room) => room.y === activeY + 1 && room.x === activeX
    )[0];
    const leftRoom = state.rooms.filter(
      (room) => room.y === activeY && room.x === activeX - 1
    )[0];

    // if (!topRoom) this.rooms.push({ id: "", type: "", x: activeX, y: activeY - 1, obstacles: [] });
    // if (!rightRoom) this.rooms.push({ id: "", type: "", x: activeX + 1, y: activeY, obstacles: [] });
    // if (!bottomRoom) this.rooms.push({ id: "", type: "", x: activeX, y: activeY + 1, obstacles: [] });
    // if (!leftRoom) this.rooms.push({ id: "", type: "", x: activeX - 1, y: activeY, obstacles: [] });

    if (topRoom && rightRoom && bottomRoom && leftRoom) return;

    if (!rightRoom)
      state.rooms.splice(+activeElement + 1, 0, {
        id: "",
        type: "treasure",
        x: activeX + 1,
        y: activeY,
        obstacles: [],
      });
    if (!leftRoom)
      state.rooms.splice(+activeElement, 0, {
        id: "",
        type: "treasure",
        x: activeX - 1,
        y: activeY,
        obstacles: [],
      });

    state.rooms.forEach((room, index) => (room.id = index.toString()));

    const roomsPerLine = state.rooms.filter((room) => room.y === 0).length;
    state.floorSize = 58 * roomsPerLine + 2 + roomsPerLine * 4 + "px";

    console.log(state.rooms);
  }
};
