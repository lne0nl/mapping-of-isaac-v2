import type { RoomState } from "@/interfaces";

export const getEmptyFloor = () => {
  return [
    [
      { id: "00", type: "", x: 0, y: 0, obstacles: [] },
      { id: "01", type: "", x: 1, y: 0, obstacles: [] },
      { id: "02", type: "", x: 2, y: 0, obstacles: [] },
    ],
    [
      { id: "10", type: "", x: 0, y: 1, obstacles: [] },
      { id: "11", type: "empty", x: 1, y: 1, obstacles: [] },
      { id: "12", type: "", x: 2, y: 1, obstacles: [] },
    ],
    [
      { id: "20", type: "", x: 0, y: 2, obstacles: [] },
      { id: "21", type: "", x: 1, y: 2, obstacles: [] },
      { id: "22", type: "", x: 2, y: 2, obstacles: [] },
    ],
  ];
};

export const addNewRooms = (state: RoomState) => {
  const activeElement = state.activeElement;

  const topRoom = state.rooms[activeElement.y - 1]
    ? state.rooms[activeElement.y - 1][activeElement.x]
    : null;
  const rightRoom = state.rooms[activeElement.y][activeElement.x + 1];
  const bottomRoom = state.rooms[activeElement.y + 1]
    ? state.rooms[activeElement.y + 1][activeElement.x]
    : null;
  const leftRoom = state.rooms[activeElement.y][activeElement.x - 1];

  if (topRoom && rightRoom && bottomRoom && leftRoom) return;

  if (!topRoom) {
    const newLine = [];
    for (let n = 0; n < state.rooms[0].length; n += 1) {
      newLine.push({ id: `0${n}`, type: "", x: n, y: 0, obstacles: [] });
    }
    state.rooms.splice(0, 0, newLine);
    state.rooms.forEach((rooms, index) => {
      if (index > 0) {
        rooms.forEach((room) => {
          room.y = room.y + 1;
        });
      }
    });
  }

  if (!rightRoom) {
    state.rooms.forEach((line, index) => {
      line.push({ id: "", type: "", x: line.length, y: index, obstacles: [] });
    });
  }

  if (!bottomRoom) {
    const newLine = [];
    for (let n = 0; n < state.rooms[0].length; n += 1) {
      newLine.push({
        id: "",
        type: "",
        x: n,
        y: state.rooms.length,
        obstacles: [],
      });
    }
    state.rooms.push(newLine);
  }

  if (!leftRoom) {
    state.rooms.forEach((line, index) => {
      line.unshift({
        id: `${index}0`,
        type: "",
        x: 0,
        y: index,
        obstacles: [],
      });
      line.forEach((room, index) => {
        if (index > 0) {
          room.x = room.x + 1;
          room.id = `${room.y.toString()}${room.x.toString()}`;
        }
      });
    });
  }

  state.rooms.forEach((line) => {
    line.forEach((room) => {
      room.id = `${room.y.toString()}${room.x.toString()}`;
    });
  });

  const roomsPerLine = state.rooms[0].filter((room) => room.y === 0).length;
  state.floorSize = 58 * roomsPerLine + 2 + roomsPerLine * 4 + "px";
};
