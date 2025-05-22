import * as THREE from 'three';
import { TextManager } from './textManager.js';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.getElementById('container').appendChild(renderer.domElement);

const fov = 30;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 400, 700);
const cameraTarget = new THREE.Vector3(0, 150, 0);

const scene = new THREE.Scene();

const textManager = new TextManager(scene);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
dirLight.position.set(0, 0, 1).normalize();
scene.add(dirLight);

const pointLight = new THREE.PointLight(0xffffff, 4.5, 0, 0);
pointLight.position.set(0, 100, 90);
scene.add(pointLight);

// Rotation controls
let targetRotation = 0;
let targetRotationOnPointerDown = 0;
let pointerX = 0;
let pointerXOnPointerDown = 0;
const windowHalfX = window.innerWidth / 2;

// Pointer events
const container = document.getElementById('container');
container.style.touchAction = 'none';
container.addEventListener('pointerdown', onPointerDown);

function onPointerDown(event) {
  if (event.isPrimary === false) return;

  pointerXOnPointerDown = event.clientX - windowHalfX;
  targetRotationOnPointerDown = targetRotation;

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(event) {
  if (event.isPrimary === false) return;

  pointerX = event.clientX - windowHalfX;
  targetRotation = targetRotationOnPointerDown + (pointerX - pointerXOnPointerDown) * 0.005;
}

function onPointerUp(event) {
  if (event.isPrimary === false) return;

  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  textManager.group.rotation.y += (targetRotation - textManager.group.rotation.y) * 0.005;
  camera.lookAt(cameraTarget);
  renderer.render(scene, camera);
}

animate();

// Window resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Basic interaction
document.addEventListener('keypress', event => {
  const ch = String.fromCharCode(event.which);
  textManager.updateText(textManager.text + ch);
});

document.addEventListener('keydown', event => {
  if (event.keyCode === 8) {
    // Backspace
    event.preventDefault();
    textManager.updateText(textManager.text.substring(0, textManager.text.length - 1));
  }
});
