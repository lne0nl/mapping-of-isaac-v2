import { defineStore } from "pinia";
import type { Room, RoomState } from "@/interfaces";
import { addNewRooms, getEmptyFloor } from "@/utils";

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

const rooms: Room[] = getEmptyFloor();

export const useRoomStore = defineStore("roomStore", {
  state: (): RoomState => {
    return {
      showTypes: false,
      showObstacles: false,
      activeElement: null,
      floorSize: '188px',
      rooms,
    };
  },
  actions: {
    raz() {
      this.rooms = getEmptyFloor();
      this.floorSize = '188px';
    },
    toggleType(event?: Event) {
      if (event) {
        const activeElementId = (event.target as HTMLInputElement).id;
        if (activeElementId) {
          this.activeElement = activeElementId;
          this.showObstacles = !!this.rooms[+activeElementId].type;
        }
      }
      this.showTypes = !this.showTypes;
    },
    changeType(event: Event) {
      const newType = (event.target as HTMLInputElement).dataset.type;
      if (this.activeElement && newType) {
        this.rooms[+this.activeElement].type = newType;
        addNewRooms(this.$state);
      }
      else if (this.activeElement && !newType)
        this.rooms[+this.activeElement].type = "";
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
