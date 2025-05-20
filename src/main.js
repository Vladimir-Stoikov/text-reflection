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

function animate() {
  requestAnimationFrame(animate);
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
