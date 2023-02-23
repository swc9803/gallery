<template>
  <div class="wrapper">
    <Transition name="fade">
      <div v-show="loading" class="loading">Loading...</div>
    </Transition>
    <Transition name="fade">
      <div v-show="!loading" ref="containerRef" class="container" />
    </Transition>
    <h2 v-show="!loading">{{ message }}</h2>
    <div v-show="clicked" @click="reSelection" class="retry">Retry</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";

const containerRef = ref();
const loading = ref(false);
const clicked = ref(false);
let camera;
let mixer;
const message = ref("Choose your favorite!");

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setClearColor(0x000000);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/"
);
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// 바닥
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true;
floor.rotation.x = Math.PI / 2;
floor.position.set(0, -1, 0);
scene.add(floor);

// 벽
const planeGeometry = new THREE.PlaneGeometry(7, 5);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 10;
plane.position.set(0, -1, -0.1);
scene.add(plane);

const light1 = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 15, 1);
light1.castShadow = true;
light1.target.position.set(-0.5, 0, 0);
scene.add(light1);
scene.add(light1.target);
const light2 = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 15, 1);
light2.castShadow = true;
light2.target.position.set(0.5, 0, 0);
scene.add(light2);
scene.add(light2.target);

// The source of models are https://market.pmnd.rs/
let model1, model2, model3;
gltfLoader.load(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/druid/model.gltf",
  (model) => {
    model1 = model;
    model.scene.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
        node.name = "model1";
      }
    });
    model.scene.scale.set(0.5, 0.5, 0.5);
    model.scene.position.set(-1, -1, 0);
    scene.add(model.scene);
  }
);
gltfLoader.load(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-hat/model.gltf",
  (model) => {
    model2 = model;
    model.scene.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
        node.name = "model2";
      }
    });
    model.scene.position.set(0, -1, 0);
    scene.add(model.scene);
    camera.lookAt(model.scene.position);
  }
);
gltfLoader.load(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/korrigan-wolf/model.gltf",
  (model) => {
    model3 = model;
    model.scene.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
        node.name = "model3";
      }
    });
    model.scene.scale.set(0.85, 0.85, 0.85);
    model.scene.position.set(1, -1, 0);
    scene.add(model.scene);
    loading.value = false;
  }
);

function init() {
  loading.value = true;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(
    containerRef.value.offsetWidth,
    containerRef.value.offsetHeight
  );
  containerRef.value.appendChild(renderer.domElement);
}

let raf;
function animate() {
  camera.updateMatrixWorld();
  if (mixer) mixer.update(0.01);
  renderer.render(scene, camera);
  raf = requestAnimationFrame(animate);
}

let lightRaf;
let angle = 0;
function moveLight() {
  angle += 0.03;
  light1.position.set(Math.cos(angle) * 1.5, 3, Math.sin(angle) * 1.5);
  light2.position.set(Math.cos(angle) * -1.5, 3, Math.sin(angle) * -1.5);
  lightRaf = requestAnimationFrame(moveLight);
}

function onClick(e) {
  e.preventDefault();
  mouse.x = (e.clientX / containerRef.value.offsetWidth) * 2 - 1;
  mouse.y = -(e.clientY / containerRef.value.offsetHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    if (object.name === "model1") {
      cancelAnimationFrame(lightRaf);
      message.value = "The winner is Druid!";
      mixer = new THREE.AnimationMixer(model1.scene);
      mixer.clipAction(model1.animations[0]).play();
      gsap.to(camera.position, {
        x: -1,
        y: -0.1,
        z: 1,
        duration: 1,
      });
      gsap.to(light1.target.position, {
        x: -1,
        duration: 1,
      });
      gsap.to(light2.target.position, {
        x: -1,
        duration: 1,
        onComplete: () => {
          clicked.value = true;
        },
      });
    } else if (object.name === "model2") {
      cancelAnimationFrame(lightRaf);
      message.value = "The winner is Korrigan Hat!";
      mixer = new THREE.AnimationMixer(model2.scene);
      mixer.clipAction(model2.animations[0]).play();
      gsap.to(camera.position, {
        x: 0,
        y: -0.1,
        z: 1,
        duration: 1,
      });
      gsap.to(light1.target.position, {
        x: 0,
        duration: 1,
      });
      gsap.to(light2.target.position, {
        x: 0,
        duration: 1,
        onComplete: () => {
          clicked.value = true;
        },
      });
    } else if (object.name === "model3") {
      message.value = "The winner is Korrigan Wolf!";
      mixer = new THREE.AnimationMixer(model3.scene);
      mixer.clipAction(model3.animations[0]).play();
      mixer.clipAction(model3.animations[2]).play();
      gsap.to(camera.position, {
        x: 1,
        y: -0.1,
        z: 1,
        duration: 1,
      });
      gsap.to(light1.target.position, {
        x: 1,
        duration: 1,
      });
      gsap.to(light2.target.position, {
        x: 1,
        duration: 1,
        onComplete: () => {
          clicked.value = true;
        },
      });
      cancelAnimationFrame(lightRaf);
    }
  }
}

function reSelection() {
  clicked.value = false;
  message.value = "Choose your favorite!";
  mixer.clipAction(model1.animations[0]).stop();
  mixer.clipAction(model2.animations[0]).stop();
  mixer.clipAction(model3.animations[0]).stop();
  mixer.clipAction(model3.animations[2]).stop();
  gsap.to(camera.position, {
    x: 0,
    y: 0.5,
    z: 3,
    duration: 1,
  });
  gsap.to(light1.target.position, {
    x: -0.5,
    y: 0,
    z: 0,
    duration: 0.3,
  });
  gsap.to(light2.target.position, {
    x: 0.5,
    y: 0,
    z: 0,
    duration: 0.3,
    onComplete: () => {
      moveLight();
    },
  });
}

const onResize = () => {
  camera.aspect =
    containerRef.value.offsetWidth / containerRef.value.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    containerRef.value.offsetWidth,
    containerRef.value.offsetHeight
  );
};

onMounted(() => {
  camera = new THREE.PerspectiveCamera(
    75,
    containerRef.value.offsetWidth / containerRef.value.offsetHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0.5, 3);

  init();
  animate();
  moveLight();

  renderer.domElement.addEventListener("click", onClick);
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  cancelAnimationFrame(lightRaf);
  renderer.dispose();
  renderer.shadowMap.enabled = false;
  light1.castShadow = false;
  light2.castShadow = false;

  scene.remove(plane);
  plane.geometry.dispose();
  plane.material.dispose();
  scene.remove(floor);
  floor.geometry.dispose();
  floor.material.dispose();

  model1.scene.traverse(function (node) {
    if (node.isMesh) {
      node.geometry.dispose();
      node.material.dispose();
    }
  });
  model2.scene.traverse(function (node) {
    if (node.isMesh) {
      node.geometry.dispose();
      node.material.dispose();
    }
  });
  model3.scene.traverse(function (node) {
    if (node.isMesh) {
      node.geometry.dispose();
      node.material.dispose();
    }
  });
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: calc(var(--vh) * 100);
  background: black;
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: red;
    color: white;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  h2 {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    color: white;
    text-align: center;
    pointer-events: none;
  }
  .retry {
    position: fixed;
    bottom: 10%;
    right: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    color: rgb(0, 0, 0);
    font-weight: 600;
    background: rgb(200, 255, 0);
    border-radius: 50%;
    cursor: pointer;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
