import { defineStore } from "pinia";
import type { Line, RoomState, ActiveElement, Room } from "@/interfaces";
import {
  getEmptyFloor,
  addNewRooms,
  getTopRoom,
  getRightRoom,
  getBottomRoom,
  getLeftRoom,
} from "@/utils";

import { types, obstacleList } from "@/utils/fixtures";

const rooms: Line[] = getEmptyFloor();

export const useRoomStore = defineStore("roomStore", {
  state: (): RoomState => {
    return {
      showTypes: false,
      showObstacles: false,
      showRooms: true,
      activeElement: { x: 0, y: 0 },
      floorSize: "188px",
      rooms,
    };
  },
  actions: {
    raz() {
      this.rooms = getEmptyFloor();
      this.floorSize = "188px";
    },
    toggleType(event?: Event) {
      if (event) {
        const lineIndex = (event.target as HTMLInputElement).dataset.y;
        const columnIndex = (event.target as HTMLInputElement).dataset.x;
        const obstacles = (event.target as HTMLInputElement).dataset.obstacles;
        const hasType = (event.target as HTMLInputElement).dataset.type;
        let eventSource = "";

        if (columnIndex && lineIndex) {
          eventSource = "fromMap";
          this.activeElement = { y: +lineIndex, x: +columnIndex };
        }
        if (columnIndex && lineIndex && hasType)
          eventSource = "fromMapWithType";
        if (obstacles) eventSource = "fromObstacles";

        switch (eventSource) {
          case "fromMap":
            this.showTypes = true;
            this.showRooms = true;
            this.showObstacles = false;
            break;
          case "fromObstacles":
            this.showTypes = false;
            this.showRooms = true;
            this.showObstacles = false;
            break;
          case "fromMapWithType":
            this.showTypes = true;
            this.showRooms = true;
            this.showObstacles = true;
            break;
          default:
            this.showTypes = false;
            this.showRooms = true;
            this.showObstacles = false;
        }
      }
    },
    changeType(event: Event) {
      const newType = (event.target as HTMLInputElement).dataset.type;
      if (this.activeElement && newType) {
        this.rooms[this.activeElement.y][this.activeElement.x].type = newType;
        addNewRooms(this.$state);
      } else if (this.activeElement && !newType)
        this.rooms[this.activeElement.y][this.activeElement.x].type = "";
    },
    getTitle(type: string) {
      // Which is the best way ?
      // return types[type as keyof Types]; // Works with an interface
      return types[type as keyof typeof types]; // Works when no interface
      // return (types as never)[type];
    },
    addObstacles(obstacles: string[]) {
      this.rooms[this.activeElement.y][this.activeElement.x].obstacles =
        obstacles;
    },
    setSecret() {
      const secretRooms: ActiveElement[] = [];
      const jockerSecretRooms: ActiveElement[] = [];

      this.rooms.forEach((line) => {
        line.forEach((room) => {
          if (room.type === "secret") this.rooms[room.y][room.x].type = "";
          if (room.type) return;

          const topRoom = this.rooms[room.y - 1]
            ? this.rooms[room.y - 1].filter(
                (roomToTest) => roomToTest.x === room.x && roomToTest.type
              )[0]
            : null;

          const rightRoom = this.rooms[room.y].filter(
            (roomToTest) => roomToTest.x === room.x + 1 && roomToTest.type
          )[0];

          const bottomRoom = this.rooms[room.y + 1]
            ? this.rooms[room.y + 1].filter(
                (roomToTest) => roomToTest.x === room.x && roomToTest.type
              )[0]
            : null;

          const leftRoom = this.rooms[room.y].filter(
            (roomToTest) => roomToTest.x === room.x - 1 && roomToTest.type
          )[0];

          if (
            topRoom &&
            (topRoom.obstacles.includes("bottom") ||
              topRoom.type === "boss" ||
              topRoom.type === "corridor_v" ||
              topRoom.type === "corridor_h")
          )
            return;
          if (
            rightRoom &&
            (rightRoom.obstacles.includes("left") ||
              rightRoom.type === "boss" ||
              rightRoom.type === "corridor_v" ||
              rightRoom.type === "corridor_h")
          )
            return;
          if (
            bottomRoom &&
            (bottomRoom.obstacles.includes("top") ||
              bottomRoom.type === "boss" ||
              bottomRoom.type === "corridor_v" ||
              bottomRoom.type === "corridor_h")
          )
            return;
          if (
            leftRoom &&
            (leftRoom.obstacles.includes("right") ||
              leftRoom.type === "boss" ||
              leftRoom.type === "corridor_v" ||
              leftRoom.type === "corridor_h")
          )
            return;

          let validRoomCount = 0;

          if (
            topRoom &&
            topRoom.type &&
            topRoom.type !== "secret" &&
            topRoom.type !== "supersecret"
          )
            validRoomCount += 1;
          if (
            rightRoom &&
            rightRoom.type &&
            rightRoom.type !== "secret" &&
            rightRoom.type !== "supersecret"
          )
            validRoomCount += 1;
          if (
            bottomRoom &&
            bottomRoom.type &&
            bottomRoom.type !== "secret" &&
            bottomRoom.type !== "supersecret"
          )
            validRoomCount += 1;
          if (
            leftRoom &&
            leftRoom.type &&
            leftRoom.type !== "secret" &&
            leftRoom.type !== "supersecret"
          )
            validRoomCount += 1;

          if (validRoomCount >= 3) secretRooms.push({ x: room.x, y: room.y });
          if (validRoomCount === 2)
            jockerSecretRooms.push({ x: room.x, y: room.y });
        });
      });

      if (!secretRooms.length && !jockerSecretRooms.length) return;
      if (secretRooms.length) {
        secretRooms.forEach((room) => {
          this.rooms[room.y][room.x].type = "secret";
          return;
        });
      } else if (jockerSecretRooms.length) {
        jockerSecretRooms.forEach(
          (room) => (this.rooms[room.y][room.x].type = "secret")
        );
      }
    },
    setSuperSecret() {
      let bossRoom = false;
      this.rooms.forEach((line) => {
        line.forEach((room) => {
          if (room.type === "supersecret") room.type = "";
        });
      });
      this.rooms.forEach((line) => {
        if (line.filter((room) => room.type === "boss")[0]) {
          bossRoom = true;
          return;
        }
      });
      if (!bossRoom) return;
      const superSecretRoom: Room[] = [];

      this.rooms.forEach((line) => {
        line.forEach((room) => {
          let adjacentRoomsCount = 0;

          const topRoom = getTopRoom(room, this.$state);
          const rightRoom = getRightRoom(room, this.$state);
          const bottomRoom = getBottomRoom(room, this.$state);
          const leftRoom = getLeftRoom(room, this.$state);

          if (
            topRoom &&
            topRoom.type &&
            topRoom.type !== "boss" &&
            topRoom.type !== "supersecret" &&
            topRoom.type !== "secret" &&
            topRoom.type !== "corridor_v" &&
            topRoom.type !== "corridor_h" &&
            !topRoom.obstacles.includes("bottom")
          ) {
            adjacentRoomsCount += 1;
          }
          if (
            rightRoom &&
            rightRoom.type &&
            rightRoom.type !== "boss" &&
            rightRoom.type !== "supersecret" &&
            rightRoom.type !== "secret" &&
            rightRoom.type !== "corridor_v" &&
            rightRoom.type !== "corridor_h" &&
            !rightRoom.obstacles.includes("left")
          ) {
            adjacentRoomsCount += 1;
          }
          if (
            bottomRoom &&
            bottomRoom.type &&
            bottomRoom.type !== "boss" &&
            bottomRoom.type !== "supersecret" &&
            bottomRoom.type !== "secret" &&
            bottomRoom.type !== "corridor_v" &&
            bottomRoom.type !== "corridor_h" &&
            !bottomRoom.obstacles.includes("top")
          ) {
            adjacentRoomsCount += 1;
          }
          if (
            leftRoom &&
            leftRoom.type &&
            leftRoom.type !== "boss" &&
            leftRoom.type !== "supersecret" &&
            leftRoom.type !== "secret" &&
            leftRoom.type !== "corridor_v" &&
            leftRoom.type !== "corridor_h" &&
            !leftRoom.obstacles.includes("right")
          ) {
            adjacentRoomsCount += 1;
          }

          if (adjacentRoomsCount === 1 && !room.type)
            superSecretRoom.push(room);
        });
      });
      superSecretRoom.forEach((room) => {
        // Recheck conditions
        const topRoom = getTopRoom(room, this.$state);
        const rightRoom = getRightRoom(room, this.$state);
        const bottomRoom = getBottomRoom(room, this.$state);
        const leftRoom = getLeftRoom(room, this.$state);
        if (!room.type) room.type = "supersecret";
        if (
          topRoom?.obstacles.includes("bottom") ||
          topRoom?.type === "boss" ||
          topRoom?.type === 'corridor_v' ||
          topRoom?.type === 'corridor_h' ||
          rightRoom?.obstacles.includes("left") ||
          rightRoom?.type === "boss" ||
          rightRoom?.type === 'corridor_v' ||
          rightRoom?.type === 'corridor_h' ||
          bottomRoom?.obstacles.includes("top") ||
          bottomRoom?.type === "boss" ||
          bottomRoom?.type === 'corridor_v' ||
          bottomRoom?.type === 'corridor_h' ||
          leftRoom?.obstacles.includes("right") ||
          leftRoom?.type === "boss" ||
          leftRoom?.type === 'corridor_v' ||
          leftRoom?.type === 'corridor_h'
        )
          room.type = "";
      });
    },
  },
  getters: {
    getTypes() {
      return types;
    },
    getObstacles() {
      return obstacleList;
    },
  },
});
