// r1b: Closed refrigerant loop connecting outdoor & indoor coils with low-boiling-point cold refrigerant (#2D7FF9).
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const camera = kit.camera({ pos: [8.5, 2.5, 8.9], look: [8.5, 2.15, 1.54], fov: 40 });

  const loopBeat = kit.beat("loop");
  const coolantBeat = kit.beat("coolant");
  const boilLow = kit.beat("boil_low");
  const warmerAir = kit.beat("warmer_air");

  // Full-loop cold refrigerant beads (#2D7FF9) circulating through the closed loop
  const coldFlow = kit.beads(world.loop.path("loop"), {
    distance: 8.6,
    color: "#2D7FF9",
    glow: "#A9D2FF",
    closed: true,
    start: loopBeat - 0.2,
    onTop: true,
  });

  // Thermometer comparison prop (refrigerant boiling point below water freezing vs outdoor air)
  const thermo = new THREE.Group();
  thermo.position.set(5.95, 0.35, 2.2);
  const tubeMat = kit.toon("#FAFCFB");
  const frameMat = kit.toon("#5B5E70");
  const coldColMat = kit.toon("#2D7FF9");
  const airColMat = kit.toon("#F08A4B");
  const board = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.65, 0.12), frameMat);
  board.position.y = 0.85;
  const tubeL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.25, 10), tubeMat);
  tubeL.position.set(-0.20, 0.88, 0.08);
  const colL = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.42, 8), coldColMat);
  colL.position.set(-0.20, 0.48, 0.10);
  const tubeR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.25, 10), tubeMat);
  tubeR.position.set(0.20, 0.88, 0.08);
  const colR = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.86, 8), airColMat);
  colR.position.set(0.20, 0.70, 0.10);
  thermo.add(board, tubeL, colL, tubeR, colR);
  kit.ink(thermo);

  kit.group.add(coldFlow.group, thermo);

  kit.callout({ text: "VÒNG ỐNG KHÉP KÍN", anchor: world.loop.anchors.compressor, at: loopBeat, hold: 2.2 });
  kit.callout({ text: "MÔI CHẤT LẠNH", anchor: world.loop.anchors.evaporator, at: coolantBeat, hold: 2.0 });
  kit.card({
    title: "ĐIỂM SÔI CỰC THẤP",
    body: "THẤP HƠN ĐIỂM ĐÓNG BĂNG CỦA NƯỚC\nTRỜI RÉT VẪN ẤM HƠN",
    at: warmerAir,
    hold: 1.9,
    y: 430,
    width: 720,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.loop.group, world.benchEvapCoil.group, world.benchCondCoil.group],
    update(t) {
      // phaseSplit = 0 renders the entire closed circuit in cold refrigerant #2D7FF9
      world.set(t, {
        benchActive: 1,
        benchPhaseSplit: 0,
        benchBoil: 0,
        benchCondense: 0,
        benchEvapMode: "induced",
        benchCondMode: "induced",
        compElec: 0,
        compHeat: 0,
        compActive: 1,
        compRate: 0.4,
        valveFlow: 1,
        valveDrop: 1,
      });

      kit.orbit(camera, t, {
        center: [8.5, 2.15, 1.54],
        radius: 7.4,
        height: 0.35,
        angle: -0.12,
        speed: 0.015,
        fov: 40,
      });
      coldFlow.update(t);
      kit.popIn(thermo, t, boilLow - 0.2, { dur: 0.35 });
    },
  };
}
