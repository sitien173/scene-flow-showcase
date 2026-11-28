// Vignette 1 (hook, sentences 1-2): opening crane onto the smartphone on the desk, rotating to expose
// the glowing battery-cell inside the translucent/open back cover, plus "PIN NHỎ?" bigText.
// Also exports mainWorld(kit) shared by cutaway, anode, split, separator, circuit, cathode,
// intercalate, charger, reverse, payoff, and degrade.
import { smartphone } from "./smartphone/smartphone.js";
import { batteryCell } from "./battery-cell/battery-cell.js";
import { cellCutaway } from "./cell-cutaway/cell-cutaway.js";
import { electrolyteMedium } from "./electrolyte-medium/electrolyte-medium.js";
import { externalCircuit } from "./external-circuit/external-circuit.js";

export function mainWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ yard: 10, clear: 6, seed: 7 });

  // Left desk zone (x = -5.5): smartphone + embedded mini battery-cell for hook & degrade
  const deskPad = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.12, 1.9),
    kit.toon("#C8C2B4")
  );
  deskPad.position.set(-5.5, 0.06, 0);
  kit.ink(deskPad);
  scene.add(deskPad);

  const deskPivot = new THREE.Group();
  deskPivot.position.set(-5.5, 0.78, 0);
  scene.add(deskPivot);

  const deskPhone = smartphone(kit, { screenMode: "applePay" });
  deskPhone.group.rotation.x = Math.PI / 2;
  deskPhone.group.scale.setScalar(1.35);
  deskPivot.add(deskPhone.group);

  const miniCell = batteryCell(kit);
  miniCell.group.scale.setScalar(0.50);
  miniCell.group.rotation.y = Math.PI / 2;
  miniCell.group.rotation.x = Math.PI;
  miniCell.group.position.set(0, -0.055, 0.04);
  deskPhone.group.add(miniCell.group);

  // Desk charging cable plug (shown in degrade when plugged in)
  const deskCable = new THREE.Group();
  const plugBox = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.22, 0.14), kit.toon("#FAFCFB"));
  plugBox.position.set(0, -0.78, 0);
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.88, 0),
    new THREE.Vector3(0.08, -1.10, 0.12),
    new THREE.Vector3(0.35, -1.25, 0.25),
  ]);
  const cord = new THREE.Mesh(new THREE.TubeGeometry(cordCurve, 12, 0.032, 6, false), kit.toon("#2B2D38"));
  deskCable.add(plugBox, cord);
  kit.ink(deskCable);
  deskPivot.add(deskCable);

  // Center battery lab stage (x = 0): cell-cutaway + electrolyte-medium + external-circuit + topPhone
  const cell = cellCutaway(kit);
  cell.group.position.set(0, 0.02, 0);
  scene.add(cell.group);

  const electrolyte = electrolyteMedium(kit);
  electrolyte.group.position.set(0, 0.13, -0.02);
  scene.add(electrolyte.group);

  const circuit = externalCircuit(kit);
  circuit.group.position.set(0, 1.94, 0);
  scene.add(circuit.group);

  const topPhone = smartphone(kit, { screenMode: "applePay" });
  topPhone.group.position.set(0, 3.85, -0.25);
  topPhone.group.rotation.x = Math.PI / 2;
  topPhone.group.scale.setScalar(1.05);
  scene.add(topPhone.group);

  function set(t, {
    deskRotY = Math.PI,
    deskCutaway = 0,
    deskCharge = 0.75,
    deskPulse = 0,
    deskCableOn = false,
    miniCellOn = true,
    cellState = {},
    electrolyteVisible = true,
    electrolyteState = {},
    circuitVisible = false,
    circuitState = {},
    topPhoneVisible = false,
    topPhoneState = {},
  } = {}) {
    deskPivot.rotation.y = deskRotY;
    deskPhone.update(t, { cutaway: deskCutaway, cardPulse: deskPulse, coilGlow: deskPulse });
    miniCell.group.visible = miniCellOn;
    miniCell.update(t, { charge: deskCharge, dcOut: 0.85, acIn: 0.4, rectGlow: 0.6, regGlow: 0.6, chargerGlow: 0.7 });
    deskCable.visible = deskCableOn;

    cell.update(t, cellState);
    electrolyte.group.visible = electrolyteVisible;
    electrolyte.update(t, electrolyteState);
    circuit.group.visible = circuitVisible;
    circuit.update(t, circuitState);
    topPhone.group.visible = topPhoneVisible;
    topPhone.update(t, topPhoneState);
  }

  return { scene, deskPivot, deskPhone, miniCell, cell, electrolyte, circuit, topPhone, set };
}

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [-5.5, 1.45, 4.4], look: [-5.5, 1.05, 0], fov: 40 };
  const closePose = { pos: [-4.25, 1.25, 2.95], look: [-5.5, 0.82, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const battery = kit.beat("battery");
  const inside = kit.beat("inside");
  kit.bigText({ text: "PIN NHỎ?", at: inside, hold: 1.85, y: 580 });

  return {
    scene: world.scene,
    camera,
    hero: [world.deskPhone.group, world.miniCell.group],
    update(t) {
      // Turn phone from front screen (0..1.4s) to 3/4 back side so cutaway lid opens clear of miniCell
      const turn = kit.ease(kit.progress(t, 0.8, 1.4), "inOut");
      const openBack = kit.ease(kit.progress(t, battery + 0.4, 1.4), "inOut");
      const pulse = 0.55 + 0.45 * Math.sin(t * 4.5);

      world.set(t, {
        deskRotY: kit.lerp(0.25, Math.PI - 0.65, turn),
        deskCutaway: openBack,
        deskCharge: 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2.2)),
        deskPulse: pulse,
        miniCellOn: openBack > 0.05,
        cellState: { openCutaway: 0, mode: "idle", soc: 1, showIons: false },
        electrolyteVisible: false,
        circuitVisible: false,
        topPhoneVisible: false,
      });

      // Push in closely onto the exposed battery cell on sentence 2
      kit.fly(camera, t, { from: startPose, to: closePose, start: 2.5, dur: 2.6, ease: "drift" });
    },
  };
}
