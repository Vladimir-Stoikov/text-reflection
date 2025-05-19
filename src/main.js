import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.getElementById('container').appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.005;
const detail = 24;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xfff000,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(0, 0, 1).normalize();
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
pointLight.position.set(0, 100, 90);
scene.add(pointLight);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
  controls.update();
}

animate();

// Window resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
