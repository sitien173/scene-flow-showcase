// Vignette 15 (nobel, sentences 36-38): bright day museum pedestals showing the 3 Nobel 2019
// breakthroughs in sequence: Whittingham (room temp), Goodenough (~4V cobalt oxide), Yoshino (safe carbon anode).
import { batteryCell } from "./battery-cell/battery-cell.js";
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("nobel", k => {
    const scene = k.stage({ yard: 11, clear: 6, seed: 29 });

    const pedMat = k.toon("#E6E6E1");
    const capMat = k.toon("#4C536B");
    const makePedestal = x => {
      const g = new THREE.Group();
      g.position.set(x, 0, 0);
      const col = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.75, 1.6), pedMat);
      col.position.y = 0.375;
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.10, 1.8), capMat);
      cap.position.y = 0.80;
      g.add(col, cap);
      k.ink(g);
      scene.add(g);
      return g;
    };

    makePedestal(-4.4);
    const cell1 = batteryCell(k);
    cell1.group.scale.setScalar(1.6);
    cell1.group.position.set(-4.4, 0.85, 0);
    scene.add(cell1.group);

    makePedestal(0);
    const cell2 = batteryCell(k, { cellColor: "#3B5C9E", dcColor: "#FCD53E" });
    cell2.group.scale.setScalar(1.65);
    cell2.group.position.set(0, 0.85, 0);
    scene.add(cell2.group);
    const crystalBadge = new THREE.Mesh(new THREE.OctahedronGeometry(0.28, 0), k.toon("#3B5C9E", { emissive: "#FCD53E" }));
    crystalBadge.position.set(0.55, 1.38, 0);
    k.ink(crystalBadge);
    scene.add(crystalBadge);

    makePedestal(4.4);
    const cell3 = cellCutaway(k, { openCutaway: 1, pureLithium: 0, dendrite: 0, soc: 0.85 });
    cell3.group.scale.setScalar(0.78);
    cell3.group.position.set(4.4, 0.85, 0);
    scene.add(cell3.group);

    return { scene, cell1, cell2, cell3, crystalBadge };
  });

  const pose1 = { pos: [-4.15, 2.05, 6.2], look: [-4.25, 1.45, 0], fov: 40 };
  const pose2 = { pos: [0.25, 2.15, 6.4], look: [0.15, 1.45, 0], fov: 40 };
  const pose3 = { pos: [4.65, 2.15, 6.4], look: [4.50, 1.55, 0], fov: 40 };
  const camera = kit.camera(pose1);
  const whittingham = kit.beat("whittingham");
  const goodenough = kit.beat("goodenough");
  const yoshino = kit.beat("yoshino");
  kit.card({ title: "STANLEY WHITTINGHAM", body: "SẠC NHIỆT ĐỘ PHÒNG", at: Math.max(whittingham, 0.92), hold: 4.4, y: 440, width: 660 });
  kit.card({ title: "JOHN GOODENOUGH", body: "GẦN 4 VÔN · OXIT COBAN", at: goodenough, hold: 2.3, y: 440, width: 660 });
  kit.card({ title: "AKIRA YOSHINO", body: "CỰC ÂM CARBON AN TOÀN", at: yoshino, hold: 3.2, y: 440, width: 660 });
  kit.mark({ kind: "check", anchor: world.cell3.anchors.anode, at: yoshino + 0.3, hold: 3.2 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell1.group, world.cell2.group, world.cell3.group],
    update(t) {
      world.cell1.update(t, { charge: 0.78, acIn: 0.5, dcOut: 0.9, rectGlow: 0.7, regGlow: 0.7, chargerGlow: 0.7 });
      world.cell2.update(t, { charge: 0.98, acIn: 0.8, dcOut: 1.0, full: 1, rectGlow: 0.9, regGlow: 0.9, chargerGlow: 0.9 });
      world.crystalBadge.rotation.y = t * 1.4;
      world.cell3.update(t, { openCutaway: 1, pureLithium: 0, dendrite: 0, mode: "idle", soc: 0.85 });

      if (t < goodenough - 0.6) {
        kit.push(camera, t, { ...pose1, amount: 0.6, start: 0.9, dur: 4.5, ease: "drift" });
      } else if (t < yoshino - 0.5) {
        kit.fly(camera, t, { from: pose1, to: pose2, start: goodenough - 0.6, dur: 1.4, ease: "inOut" });
      } else {
        kit.fly(camera, t, { from: pose2, to: pose3, start: yoshino - 0.5, dur: 1.4, ease: "inOut" });
      }
    },
  };
}
