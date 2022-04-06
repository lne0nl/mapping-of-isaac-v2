<script setup lang="ts">
import Room from '@/components/Room.vue';
import { useRoomStore } from '@/stores/useRoom';

const store = useRoomStore();
const types = Object.keys(store.getTypes);
const selectType = (e: Event) => {
  store.changeType(e);
  store.toggleType(e);
}
</script>

<template>
  <div class="backdrop" @click.self="store.toggleType"></div>
  <div class="types">
    <div class="container">
      <Room tabindex="0" @click="selectType" />
      <Room
        v-for="(type) in types"
        :title="store.getTitle(type)"
        :key="type"
        class="type"
        :type="type"
        tabindex="0"
        @click="selectType"
      />
    </div>
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