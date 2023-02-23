<template>
  <div class="main">
    <canvas ref="canvasRef" @mousemove="onMouseMove" @touchmove="onTouchMove" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as PIXI from "pixi.js";
PIXI.settings.RENDER_OPTIONS.hello;

let app;
let displacementFilter;
const canvasRef = ref();
const img = PIXI.Sprite.from(require("@/assets/origin.png"));
const depthMap = PIXI.Sprite.from(require("@/assets/depthMap.png"));

const draw = (app) => {
  app.stage.addChild(img);
  app.stage.addChild(depthMap);
  displacementFilter = new PIXI.DisplacementFilter(depthMap);
  app.stage.filters = [displacementFilter];
};

const onMouseMove = (e) => {
  displacementFilter.scale.x =
    (canvasRef.value.offsetWidth / 2 -
      (e.pageX - (window.innerWidth - img.width) / 2)) /
    100;
  displacementFilter.scale.y =
    (canvasRef.value.offsetHeight / 2 - (e.pageY - 64)) / 100;
};

const onTouchMove = (e) => {
  displacementFilter.scale.x =
    (canvasRef.value.offsetWidth / 2 -
      (e.touches[0].pageX - (window.innerWidth - img.width) / 2)) /
    70;
  displacementFilter.scale.y =
    (canvasRef.value.offsetHeight / 2 - e.touches[0].pageY) / 70;
  e.preventDefault();
};

function onResize() {
  img.width = canvasRef.value.offsetWidth;
  img.height = canvasRef.value.offsetHeight;
  img.position.y = (canvasRef.value.offsetHeight - img.height) / 2;
  depthMap.position.y = (canvasRef.value.offsetHeight - img.height) / 2;
  depthMap.width = img.width;
  depthMap.height = img.height;
  displacementFilter.scale.x = 0;
  displacementFilter.scale.y = 0;
}

onMounted(() => {
  app = new PIXI.Application({
    width: canvasRef.value.offsetWidth,
    height: canvasRef.value.offsetHeight,
    view: canvasRef.value,
    antialias: true,
    backgroundAlpha: true,
    resizeTo: canvasRef.value,
  });
  draw(app);
  onResize();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  app.stage.filters = null;
  displacementFilter.destroy();
  depthMap.destroy();
  img.destroy();
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  max-width: 1920px;
  height: calc(var(--vh, 1vh) * 100 - 128px);
  margin-bottom: 128px;
  @media (width <= 768px) {
    & {
      height: calc(var(--vh, 1vh) * 100 - 256px);
    }
  }
  canvas {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    width: calc(75vh - 96px);
    height: 100%;
    margin-top: 64px;
    border-radius: 2em;
    @media (width <= 768px) {
      & {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: calc(var(--vh, 1vh) * 40);
        height: calc(var(--vh, 1vh) * 53.5);
        margin-top: 0;
      }
    }
  }
}
</style>
