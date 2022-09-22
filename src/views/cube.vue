<template>
  <div class="container" ref="containerDom"></div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ref, onMounted } from "vue";

// 建立圖片材質
const getRoomMaterialsByImages = (imgList) => {
  return imgList.map(({ position, source }) => {
    const texture = new THREE.TextureLoader().load(source);

    // 調整頂部、底部照片角度
    if (position === "top" || position === "bottom") {
      texture.rotation = Math.PI;
      texture.center = new THREE.Vector2(0.5, 0.5);
    }

    // 創建材質
    return new THREE.MeshBasicMaterial({ map: texture });
  });
};

// 客廳 image
const livingRoomImageList = [
  {
    position: "right",
    source: require("@/assets/images/livingroom/0_right.jpeg"),
  },
  {
    position: "left",
    source: require("@/assets/images/livingroom/0_left.jpeg"),
  },
  { position: "top", source: require("@/assets/images/livingroom/0_top.jpeg") },
  {
    position: "bottom",
    source: require("@/assets/images/livingroom/0_bottom.jpeg"),
  },
  {
    position: "front",
    source: require("@/assets/images/livingroom/0_front.jpeg"),
  },
  {
    position: "back",
    source: require("@/assets/images/livingroom/0_back.jpeg"),
  },
];

// 客廳 Materials
const livingRoomMaterials = getRoomMaterialsByImages(livingRoomImageList);

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

// 房間地方體
const geometry = new THREE.BoxGeometry(10, 10, 10);
const cube = new THREE.Mesh(geometry, livingRoomMaterials);
// 反過來到內部
cube.geometry.scale(1, 1, -1);
scene.add(cube);

// 軌道控制器
const initControls = () => {
  const controls = new OrbitControls(camera, containerDom.value);
  // 控制方向反轉
  controls.rotateSpeed *= -1;

  controls.enableDamping = true;
};

// Mounted
onMounted(() => {
  containerDom.value.appendChild(renderer.domElement);

  initControls();

  render();
});
</script>
