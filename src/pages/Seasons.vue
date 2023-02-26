<template>
  <div class="wrapper">
    <div class="scrollElement" />
    <Scroll class="svg" />
    <Spring />
    <Summer />
    <Fall />
    <Winter />
  </div>
</template>

<script setup>
import Scroll from "@/components/weather/Scroll";
import Spring from "@/components/weather/spring/Spring";
import Summer from "@/components/weather/summer/Summer";
import Fall from "@/components/weather/fall/Fall";
import Winter from "@/components/weather/winter/Winter";
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: white;
}
.svg {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.scrollElement {
  position: absolute;
  top: 0;
  width: 100px;
  height: 1600%;
  opacity: 0;
}
</style>
