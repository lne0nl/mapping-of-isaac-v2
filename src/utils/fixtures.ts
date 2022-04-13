import type { Obstacle } from "@/interfaces";

export const types = {
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
  corridor_v: "Vertical Corridor",
  corridor_h: "Horizontal Corridor",
  secret: "Secret Room",
  super: "Super Secret Room",
};

export const obstacleList: Obstacle[] = [
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
