<template>
  <div class="container" ref="containerDom"></div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { ref, onMounted } from "vue";

const containerDom = ref(null);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 0.1;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Loop render
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// 房間球體
const geometry = new THREE.SphereGeometry(10, 10, 10);
const loader = new RGBELoader();

// 需要改用 hdr 檔案資源
loader.load(require("@/assets/images/sphere.jpeg"), (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.geometry.scale(1, 1, -1);
  scene.add(sphere);
});

// 軌道控制器
const initControls = () => {
  const controls = new OrbitControls(camera, containerDom.value);
  controls.enableDamping = true;
};

// Mounted
onMounted(() => {
  containerDom.value.appendChild(renderer.domElement);

  initControls();

  render();
});
</script>
