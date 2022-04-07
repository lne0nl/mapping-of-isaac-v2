<template>
  <header>
    <h1>
      <img :src="'/src/assets/logo.png'" alt="The Mapping of Isaac" title="The Mapping of Isaac" />
    </h1>
  </header>
  <main>
    <div class="room-wrapper" :style="{ width: floorSize }">
      <template v-for="(line) in rooms">
        <Room
          v-for="(room) in line"
          :title="room.type ? store.getTitle(room.type) : ''"
          :class="room.type ? 'type' : ''"
          :id="room.id"
          :key="room.id"
          :type="room.type"
          :obstacles="room.obstacles"
          :tabindex="showTypes ? -1 : 0"
          :data-x="room.x"
          :data-y="room.y"
          @click="store.toggleType"
        />
      </template>
    </div>
    <Types v-if="showTypes" />
    <div class="actions">
      <button title="Destroy Floor" class="button" @click="raz" :tabindex="showTypes ? -1 : 0">
        <img :src="'/src/assets/bomb.png'" alt="Destroy Floor" />
        <br />Destroy the floor
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import Room from '@/components/Room.vue';
import { storeToRefs } from 'pinia';
import { useRoomStore } from '@/stores/useRoom';
import Types from '@/components/Types.vue';

const store = useRoomStore();
const { rooms, showTypes, floorSize } = storeToRefs(store);
// const roomsPerLine = rooms.value.filter((room) => room.y === 0).length;
// const roomWrapperWidth = 58 * roomsPerLine + 2 + roomsPerLine * 4;
const raz = store.raz;
</script>

<style lang="scss">
body,
html,
* {
  box-sizing: border-box;
}
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

h1 {
  padding: 0;
  margin: 0;
  text-align: center;
}

button {
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
}

.room-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  border-radius: 5px;
  border: 1px solid black;
  background-color: black;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

button:focus,
div:focus {
  outline: 2px solid red;
}
</style>
