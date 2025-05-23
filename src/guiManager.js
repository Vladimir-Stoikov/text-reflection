import { GUI } from './GUI';

export class GUIManager {
  constructor(textManager, pointLight) {
    this.textManager = textManager;
    this.pointLight = pointLight;
    this.fontIndex = 1;

    this.fontMap = {
      helvetiker: 0,
      optimer: 1,
      gentilis: 2,
      'droid/droid_sans': 3,
      'droid/droid_serif': 4,
    };

    this.reverseFontmap = [];
    Object.entries(this.fontMap).forEach(([key, value]) => {
      this.reverseFontMap[value] = key;
    });
    this.initGUI();
  }

  initGUI() {
    const gui = new GUI();

    const params = {
      changeColor: () => {
        this.pointLight.color.setHSL(Math.random(), 1, 0.5);
      },
      changeFont: () => {
        this.fontIndex++;
        const fontName = this.reverseFontMap[this.fontIndex % this.reverseFontMap.length];
        this.textManager.loadFont(fontName, this.textManager.fontWeight);
      },
      changeWeight: () => {
        const fontWeight = this.textManager.fontWeight === 'bold' ? 'regular' : 'bold';
        this.textManager.loadFont(this.textManager.fontName, fontWeight);
      },
      changeBevel: () => {
        this.textManager.belevEnabled = !this.textManager.belevEnabled;
        this.textManager.createText();
      },
    };

    gui.add(params, 'changeColor').name('change color');
    gui.add(params, 'changeFont').name('change font');
    gui.add(params, 'changeWeight').name('change weight');
    gui.add(params, 'changeBevel').name('change bevel');
  }
}
