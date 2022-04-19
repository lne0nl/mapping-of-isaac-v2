<template>
  <header>
    <h1>
      <img :src="logo" alt="The Mapping of Isaac" title="The Mapping of Isaac" />
    </h1>
  </header>
  <main>
    <div class="room-wrapper" :style="{ width: floorSize }">
      <template v-for="(line) in rooms">
        <Room v-for="(room) in line" :title="room.type ? store.getTitle(room.type) : ''" :class="[
          room.type ? 'type' : '',
          room.type === 'supersecret' ? 'secret' : '',
          room.type === 'secret' ? 'secret' : '',
          room.type === 'corridor_v' ? 'corridor-v' : '',
          room.type === 'corridor_h' ? 'corridor-h' : '',
          room.obstacles ? getObstaclesClass(room.obstacles) : '',
        ]" :id="room.id" :key="room.id" :type="room.type" :obstacles="room.obstacles" :tabindex="showTypes ? -1 : 0"
          :data-x="room.x" :data-y="room.y" @click="store.toggleType" />
      </template>
    </div>
    <Types v-if="showTypes" />
    <div class="actions">
      <button title="Destroy Floor" class="button" @click="raz" :tabindex="showTypes ? -1 : 0">
        <img :src="bomb" alt="Destroy Floor" />
        <br />Destroy the floor
      </button>
    </div>
  </main>
  <footer>
    Mapping of Isaac V.2 -
    <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
      <img alt="Licence Creative Commons" style="border-width:0"
        src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" />
    </a>
    <br />Cette œuvre est mise à disposition selon les termes de la
    <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Licence Creative Commons Attribution - Pas
      d’Utilisation Commerciale - Partage dans les Mêmes Conditions 4.0 International</a>.
  </footer>
</template>

<script setup lang="ts">
import Room from '@/components/Room.vue';
import { storeToRefs } from 'pinia';
import { useRoomStore } from '@/stores/useRoom';
import Types from '@/components/Types.vue';
import logo from '../src/assets/logo.png';
import bomb from '@/assets/bomb.png';

const store = useRoomStore();
const { rooms, showTypes, floorSize } = storeToRefs(store);
const getObstaclesClass = (obstacles: string[]) => obstacles.toString().trim().split(',').join('-');
const raz = store.raz;
</script>

<style lang="scss">
@mixin box-shadow($shadow...) {
  box-shadow: $shadow;
}

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

footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  padding: 5px 0;
  text-align: center;
  transform: translateX(-50%);
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

.room {
  &.top {
    @include box-shadow(0 6px 0 red inset);
  }

  &.right {
    @include box-shadow(-6px 0 0 red inset);
  }

  &.bottom {
    @include box-shadow(0px -6px 0 red inset);
  }

  &.left {
    @include box-shadow(6px 0 0 red inset);
  }

  &.top-bottom {
    @include box-shadow(0 6px 0 red inset, 0px -6px 0 red inset);
  }

  &.right-left {
    @include box-shadow(-6px 0 0 red inset, 6px 0 0 red inset);
  }

  &.top-right {
    @include box-shadow(0 6px 0 red inset, -6px 0 0 red inset);
  }

  &.right-bottom {
    @include box-shadow(-6px 0 0 red inset, 0px -6px 0 red inset)
  }

  &.bottom-left {
    @include box-shadow(0px -6px 0 red inset, 6px 0 0 red inset)
  }

  &.top-left {
    @include box-shadow(0 6px 0 red inset, 6px 0 0 red inset)
  }

  &.top-right-left {
    @include box-shadow(0 6px 0 red inset, -6px 0 0 red inset, 6px 0 0 red inset);
  }

  &.top-right-bottom {
    @include box-shadow(0 6px 0 red inset, -6px 0 0 red inset, 0px -6px 0 red inset);
  }

  &.right-bottom-left {
    @include box-shadow(-6px 0 0 red inset, 0px -6px 0 red inset, 6px 0 0 red inset)
  }

  &.top-bottom-left {
    @include box-shadow(0 6px 0 red inset, 0px -6px 0 red inset, 6px 0 0 red inset);
  }

  &.top-right-bottom-left {
    @include box-shadow(0 6px 0 red inset, -6px 0 0 red inset, 0px -6px 0 red inset, 6px 0 0 red inset);
  }
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
