import * as THREE from 'three';
import { FontLoader } from 'FontLoader';
import { TextGeometry } from 'TextGeometry';

export class TextManager {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.y = 100;
    this.scene.add(this.group);

    this.font = null;
    this.text = 'three.js';
    this.mirror = true;
    this.hover = 35;
    this.depth = 50;
    this.fontName = 'optimer';
    this.fontWeight = 'bold';
    this.loadFont('optimer', 'bold');

    // Add plane
    const planeGeo = new THREE.PlaneGeometry(10000, 10000);
    const planeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.position.y = 100;
    plane.rotation.x = -Math.PI / 2;
    this.scene.add(plane);
  }

  loadFont(fontName, fontWeight) {
    const loader = new FontLoader();
    loader.load(`src/fonts/${fontName}_${fontWeight}.typeface.json`, response => {
      this.font = response;
      this.createText();
    });
  }

  createText() {
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }

    if (!this.font || !this.text) return;

    const textGeo = new TextGeometry(this.text, {
      font: this.font,
      size: 70,
      height: 20,
      curveSegments: 4,
      bevelThickness: 2,
      bevelSize: 1.5,
      bevelEnabled: true,
    });

    textGeo.computeBoundingBox();
    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
    ];

    // Main text
    const textMesh1 = new THREE.Mesh(textGeo, materials);
    textMesh1.position.x = centerOffset;
    textMesh1.position.y = this.hover;
    textMesh1.position.z = 0;
    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = Math.PI * 2;
    this.group.add(textMesh1);

    // Mirror text
    if (this.mirror) {
      const textMesh2 = new THREE.Mesh(textGeo, materials);
      textMesh2.position.x = centerOffset;
      textMesh2.position.y = -this.hover;
      textMesh2.position.z = this.depth;
      textMesh2.rotation.x = Math.PI;
      textMesh2.rotation.y = Math.PI * 2;
      this.group.add(textMesh2);
    }
  }

  updateText(newText) {
    this.text = newText;
    this.createText();
  }
}
