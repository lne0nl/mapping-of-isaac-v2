<script setup lang="ts">
import Room from '@/components/Room.vue';
import Obstacles from './Obstacles.vue';
import { useRoomStore } from '@/stores/useRoom';
import { storeToRefs } from 'pinia';

const store = useRoomStore();
const types = Object.keys(store.getTypes);
const obstacles = store.getObstacles;
const { showRooms, showObstacles } = storeToRefs(store);
types.splice(types.indexOf('super') - 1, 2);
const selectType = (e: Event) => {
  store.changeType(e);
  showObstacles.value = true;
  showRooms.value = false;
}
const selectObstacle = (e: Event) => {
  let dataObstacles = (e.target as HTMLInputElement).dataset.obstacles;
  let obstacles: string[] = [];
  if (dataObstacles) obstacles = dataObstacles.split(",").map((value) => value.trim());
  store.addObstacles(obstacles);
  store.setSuperSecret();
  store.setSecret();
  store.toggleType(e);
}
</script>

<template>
  <div class="backdrop" @click.self="store.toggleType"></div>
  <div class="types" data-cy="modal">
    <template v-if="showRooms">
      <div class="container" data-cy="modal-types">
        <Room tabindex="0" @click="selectType" />
        <Room v-for="(type) in types" :title="store.getTitle(type)" :key="type" :class="[
          'type',
          type === 'corridor_v' ? 'corridor-v' : '',
          type === 'corridor_h' ? 'corridor-h' : '',
        ]" :type="type" tabindex="0" @click="selectType" />
      </div>
    </template>
    <template v-if="showObstacles">
      <div class="container" data-cy="modal-obstacles">
        <Obstacles v-for="(obstacle, index) in obstacles" :key="index" @click="selectObstacle"
          :obstacles="obstacle.data" class="obstacle" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.types {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 40px;
  border-radius: 10px;

  background-color: white;

  transform: translate(-50%, -50%);
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 250px;
}
</style>