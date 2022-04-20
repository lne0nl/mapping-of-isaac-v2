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
  supersecret: "Super Secret Room",
};

export const obstacleList = [
  [],
  ["top"],
  ["right"],
  ["bottom"],
  ["left"],
  ["top", "bottom"],
  ["right", "left"],
  ["top", "right"],
  ["right", "bottom"],
  ["bottom", "left"],
  ["top", "left"],
  ["top", "right", "left"],
  ["top", "right", "bottom"],
  ["right", "bottom", "left"],
  ["top", "bottom", "left"],
  ["top", "right", "bottom", "left"],
];
