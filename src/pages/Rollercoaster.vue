<template>
  <div>
    <p v-show="!isLoaded">Loading...</p>
    <div ref="canvasRef" class="canvas" />
    <div ref="scrollRef" class="scroll" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const isLoaded = ref(false);
const canvasRef = ref();
const scrollRef = ref();
let camera;
let renderer;
let raf;

const scene = new THREE.Scene();
const setupBackground = () => {
  new RGBELoader().load("/pure_sky.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    isLoaded.value = true;
  });
};

const points = [
  [150, 150, 0],
  [200, 150, 0],
  [320, 180, 30],
  [340, 150, -30],
  [440, 180, 30],
  [540, 150, 0],
  [650, 150, 0],
];
const createTube = (path, index, color) => {
  const geometry = new THREE.TubeGeometry(path, 70, index * 2 + 10, 6, false);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    wireframe: true,
    opacity: (1 - index / 5) * 0.15 + 0.01,
  });
  return new THREE.Mesh(geometry, material);
};

const path = new THREE.CatmullRomCurve3(
  points.map((point) => new THREE.Vector3(point[0], point[1], point[2]))
);
const colors = [0x38cfff, 0xbeeb9f, 0xffff9d];
const setupModel = () => {
  colors.forEach((color, index) => {
    const tube = createTube(path, index, color);
    scene.add(tube);
  });
};

const animate = () => {
  renderer.render(scene, camera);

  raf = requestAnimationFrame(animate);
};

const onResize = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasRef.value.offsetWidth, canvasRef.value.offsetHeight);
  canvasRef.value.appendChild(renderer.domElement);
  camera.aspect = canvasRef.value.offsetWidth / canvasRef.value.offsetHeight;
  camera.updateProjectionMatrix();
};

onMounted(() => {
  window.scrollTo(0, 0);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  camera = new THREE.PerspectiveCamera(
    80,
    canvasRef.value.offsetWidth / canvasRef.value.offsetHeight,
    0.1,
    1000
  );

  const p3 = path.getPointAt(0);
  gsap.to(camera.position, {
    x: p3.x,
    y: p3.y,
    z: p3.z,
    ease: "power3",
    duration: 1,
    onComplete: () => {
      camera.lookAt(path.getPointAt(0.02));
    },
  });
  camera.position.set(-500, 150, 0);
  camera.lookAt(p3);

  const moveCamera = gsap.timeline();
  ScrollTrigger.create({
    animation: moveCamera,
    trigger: scrollRef.value,
    start: "top top",
    end: "bottom bottom",
    markers: true,
    scrub: 4,
  });
  moveCamera.to(
    {},
    {
      onUpdate: () => {
        const p1 = path.getPointAt(moveCamera.progress());
        gsap.to(camera.position, {
          x: p1.x,
          y: p1.y,
          z: p1.z,
          duration: 0.1,
        });
        if (moveCamera.progress() < 0.98) {
          const lookValue = path.getPointAt(moveCamera.progress() + 0.02);
          camera.lookAt(lookValue);
        }
      },
    }
  );

  onResize();
  setupBackground();
  setupModel();
  animate();

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  renderer.dispose();

  window.removeEventListener("resize", onResize);
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<style lang="scss" scoped>
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  width: 100%;
  height: 100vh;
}
.scroll {
  position: absolute;
  height: 1500vh; // vh? +=10000?
}

p {
  display: flex;
}
</style>
