<script setup lang="ts">
defineProps<{
  obstacles?: string[];
}>();

const getClassName = (obstacles: string[] | undefined) => {
  let className = '';
  obstacles?.forEach((position, index) => {
    if (index === 0) className += position;
    else className += `-${position}`;
  });
  return className;
}
// const getClassName = (obstacles: string[] | undefined) => {
//   let className = '[';
//   obstacles?.forEach((position, index) => {
//     if (index !== obstacles.length) className += position;
//     else className += `${position}]`
//   })
//   return className;
// }
</script>

<template>
  <button :class="getClassName(obstacles)" :data-obstacles="obstacles"></button>
</template>

<style lang="scss" scoped>
@mixin box-shadow($shadow...) {
  box-shadow: $shadow;
}
.obstacle {
  position: relative;
  margin: 2px;
  width: 58px;
  height: 48px;
  border-radius: 5px;
  border: 2px solid black;
  cursor: pointer;

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
</style>
