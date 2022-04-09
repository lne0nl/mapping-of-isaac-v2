import { defineStore } from "pinia";
import type { Line, RoomState, ActiveElement, Obstacle } from "@/interfaces";
import { getEmptyFloor, addNewRooms } from "@/utils";

const types = {
  arcade: "Arcade Room",
  bedroom: "Bedroom",
  boss: "Boss Room",
  challenge: "Challenge Room",
  curse: "Curse Room",
  dice: "Dice Room",
  library: "Library",
  miniboss: "Mini Boss Room",
  planetarium: "Planetarium",
  sacrifice: "Sacrifice Room",
  shop: "Shop",
  superchallenge: "Super Challenge Room",
  treasure: "Treasure Room",
  vault: "Vault",
  empty: "Empty",
  secret: "Secret Room",
  super: "Super Secret Room",
};

const obstacleList: Obstacle[] = [
  {
    data: [],
    class: "",
  },
  {
    data: ["top"],
    class: "",
  },
  {
    data: ["right"],
    class: "",
  },
  {
    data: ["bottom"],
    class: "",
  },
  {
    data: ["left"],
    class: "",
  },
  {
    data: ["top", "bottom"],
    class: "",
  },
  {
    data: ["right", "left"],
    class: "",
  },
  {
    data: ["top", "right"],
    class: "",
  },
  {
    data: ["right", "bottom"],
    class: "",
  },
  {
    data: ["bottom", "left"],
    class: "",
  },
  {
    data: ["top", "left"],
    class: "",
  },
  {
    data: ["top", "right", "left"],
    class: "",
  },
  {
    data: ["top", "right", "bottom"],
    class: "",
  },
  {
    data: ["right", "bottom", "left"],
    class: "",
  },
  {
    data: ["top", "bottom", "left"],
    class: "",
  },
  {
    data: ["top", "right", "bottom", "left"],
    class: "",
  },
];

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
        let eventSource = '';

        if (columnIndex && lineIndex) {
          eventSource = 'fromMap';
          this.activeElement = { y: +lineIndex, x: +columnIndex };
        }
        if (obstacles) eventSource = 'fromObstacles';

        switch (eventSource) {
          case 'fromMap':
            this.showTypes = true;
            this.showRooms = true;
            this.showObstacles = false;
          break;
          case 'fromObstacles':
            this.showTypes = false;
            this.showRooms = true;
            this.showObstacles = false;
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
        // @TODO: remove rooms, perhaps
        this.rooms[this.activeElement.y][this.activeElement.x].type = "";
    },
    getTitle(type: string) {
      // Which is the best way ?
      // return types[type as keyof Types]; // Works with an interface
      return types[type as keyof typeof types]; // Works when no interface
      // return (types as never)[type];
    },
    addObstacles(obstacles: string[]) {
      this.rooms[this.activeElement.y][this.activeElement.x].obstacles = obstacles;
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
              topRoom.type === "corridor_h" ||
              topRoom.type === "super")
          )
            return;
          if (
            rightRoom &&
            (rightRoom.obstacles.includes("left") ||
              rightRoom.type === "boss" ||
              rightRoom.type === "corridor_v" ||
              rightRoom.type === "corridor_h" ||
              rightRoom.type === "super")
          )
            return;
          if (
            bottomRoom &&
            (bottomRoom.obstacles.includes("top") ||
              bottomRoom.type === "boss" ||
              bottomRoom.type === "corridor_v" ||
              bottomRoom.type === "corridor_h" ||
              bottomRoom.type === "super")
          )
            return;
          if (
            leftRoom &&
            (leftRoom.obstacles.includes("right") ||
              leftRoom.type === "boss" ||
              leftRoom.type === "corridor_v" ||
              leftRoom.type === "corridor_h" ||
              leftRoom.type === "super")
          )
            return;

          let validRoomCount = 0;

          if (topRoom && topRoom.type && topRoom.type !== "secret")
            validRoomCount += 1;
          if (rightRoom && rightRoom.type && rightRoom.type !== "secret")
            validRoomCount += 1;
          if (bottomRoom && bottomRoom.type && bottomRoom.type !== "secret")
            validRoomCount += 1;
          if (leftRoom && leftRoom.type && leftRoom.type !== "secret")
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
  },
  getters: {
    getTypes() {
      return types;
    },
    getObstacles() {
      return obstacleList;
    }
  },
});
