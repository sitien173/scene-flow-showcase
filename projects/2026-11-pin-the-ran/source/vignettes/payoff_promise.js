// Sentences 48 to 49: pull back from one pressed solid-state cell to a grid of many cells beside the EV
// ("hàng tỉ"); the closing word: still a promise ("lời hứa").
import { solidStateCellCutaway } from "./solid-state-cell-cutaway/solid-state-cell-cutaway.js";
import { evCar } from "./ev-car/ev-car.js";
import { labWorld, station, pose, put, track, ION, ELECTRON, ELECTROLYTE, ENERGY } from "./hook_ev.js";

export async function build(kit) {
  const world = await kit.world("ep11-lab", labWorld);
  const THREE = kit.THREE;
  const st = station("payoff_promise");
  const billions = kit.beat("billions");
  const promise = kit.beat("promise");

  const ss = put(kit, solidStateCellCutaway(kit, { electrolyteColor: ELECTROLYTE, ionColor: ION, energyColor: ENERGY, stackPressure: 1, openCutaway: 1 }), st, [0, 0, 1.2], 0.6);
  const car = put(kit, evCar(kit, { energyColor: ENERGY, electronColor: ELECTRON }), st, [3.6, 0, -2.4], 1);

  // A grid of simple pressed cells: casing, solid electrolyte core band, and the two electrode bands.
  const caseMat = kit.toon("#4C536B");
  const coreMat = kit.toon(ELECTROLYTE);
  const anodeMat = kit.toon("#D98245");
  const cathodeMat = kit.toon("#B4BCCB");
  const cells = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
      if (row === 0 && (col === 2 || col === 3)) continue;
      const g = new THREE.Group();
      const box = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.0, 0.7), caseMat);
      box.position.y = 0.5;
      g.add(box);
      [[-0.5, anodeMat], [0, coreMat], [0.5, cathodeMat]].forEach(([x, m]) => {
        const band = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.78, 0.04), m);
        band.position.set(x, 0.5, 0.37);
        g.add(band);
      });
      g.position.set(st[0] + (col - 2.5) * 1.95, 0, st[2] + 1.2 - row * 1.3);
      kit.ink(g);
      kit.group.add(g);
      cells.push(g);
    }
  }

  const close = pose(st, [0.15, 1.5, 4.8], [0, 0.6, 1.2]);
  const wide = pose(st, [0.6, 7.0, 15.0], [0.6, 0.6, -0.8]);
  const keys = [
    { at: 0, pose: close },
    { at: 0.2, pose: pose(st, [-0.3, 1.6, 5.4], [0, 0.6, 1.2]), dur: 1.4, ease: "drift" },
    { at: billions - 0.5, pose: wide, dur: 2.2, ease: "inOut" },
    { at: billions + 2.0, pose: pose(st, [-1.0, 7.4, 15.4], [0.6, 0.6, -0.8]), dur: 3.6, ease: "drift" },
  ];
  const camera = kit.camera(close);

  // Overlays register once at setup; the stage draws them each frame.
  kit.label({ text: "HÀNG TỈ VIÊN PIN KHÍT NHAU", at: billions, hold: 3.6, y: 560 });
  kit.bigText({ text: "VẪN LÀ LỜI HỨA", at: promise, hold: 1.2, y: 600 });
  return {
    scene: world.scene,
    camera,
    hero: [ss.group, car.group],
    update(t) {
      track(kit, camera, t, keys);
      ss.update(t, { openCutaway: 1, mode: "idle", stackPressure: 1 });
      car.update(t, { mode: "idle", bayOpen: 1, batteryGlow: 0.8 });
      kit.popSeq(cells, t, billions - 0.2, { span: 1.2, dur: 0.3 });
    },
  };
}
