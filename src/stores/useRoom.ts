import { defineStore } from "pinia";
import type { Line, RoomState } from "@/interfaces";
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
};

const rooms: Line[] = getEmptyFloor();

export const useRoomStore = defineStore("roomStore", {
  state: (): RoomState => {
    return {
      showTypes: false,
      showObstacles: false,
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

        if (columnIndex && lineIndex) {
          this.activeElement = { y: +lineIndex, x: +columnIndex };
          this.showObstacles = !!this.rooms[+lineIndex][+columnIndex].type;
        }
      }
      this.showTypes = !this.showTypes;
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
  },
  getters: {
    getTypes() {
      return types;
    },
  },
});
