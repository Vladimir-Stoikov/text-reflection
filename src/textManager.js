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
    this.loadFont('optimer', 'bold');
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
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });
    const textMesh = new THREE.Mesh(textGeo, material);

    textMesh.position.x = centerOffset;
    textMesh.position.y = 30;

    this.group.add(textMesh);
  }

  updateText(newText) {
    this.text = newText;
    this.createText();
  }
}
