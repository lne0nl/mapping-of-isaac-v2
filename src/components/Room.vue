<script setup lang="ts">
defineProps<{
  id?: string;
  type?: string;
  obstacles?: string[];
  title?: string;
}>();
</script>

<template>
  <button :title="title ? title : 'No Room'" :class="'room'" :id="id" v-memo="[type, obstacles]" :data-type="type">
    <img v-if="type && type !== 'empty'" :class="`type-img ${type === 'secret' || 'super' ? 'secret' : ''}`" :src="`/src/assets/rooms/${type}.png`" />
  </button>
</template>

<style lang="scss" scoped>
.room {
  position: relative;
  margin: 2px;
  width: 58px;
  height: 48px;
  border-radius: 5px;
  cursor: pointer;

  &.type {
    background-color: #747474;

    &.secret {
      background-color: black;
    }
  }
}

[class="room"] {
  background-color: #141414;

  &:focus,
  &:hover {
    background-color: #333;
  }
}

.type-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
