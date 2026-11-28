// w1c: Payoff (day restored) — 1 unit electricity -> ~4 units heat, 3-5x more efficient than gas boilers,
// pulling back to warm winter home receiving steady outdoor thermal energy.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const closePose = { pos: [0.45, 2.25, 8.20], look: [0.35, 1.45, 0.0], fov: 40 };
  const camera = kit.camera(closePose);

  const ratioBeat = kit.beat("ratio");
  const boilerBeat = kit.beat("boiler");
  const payoffBeat = kit.beat("payoff");

  // 1 electrical block (#FCD53E) -> 4 heat blocks (#F08A4B) beside the warm house
  const ratioGroup = new THREE.Group();
  ratioGroup.position.set(-3.45, 0.05, 1.35);
  const eBlock = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), kit.toon("#FCD53E", { emissive: "#786008" }));
  eBlock.position.set(-0.62, 0.25, 0);
  const hBlocks = [];
  for (let i = 0; i < 4; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.36, 0.42), kit.toon("#F08A4B", { emissive: "#693210" }));
    b.position.set(0.28, 0.22 + i * 0.40, 0);
    hBlocks.push(b);
  }
  ratioGroup.add(eBlock, ...hBlocks);
  kit.ink(ratioGroup);

  // Continuous outdoor heat flow gathered into warm house
  const outdoorGather = kit.beads(
    [[-3.30, 1.30, 0.60], [-2.40, 1.05, 0.25], [-1.55, 0.95, 0.05], [-0.20, 1.35, -0.05], [1.35, 1.75, 0.10], [1.65, 1.05, 0.35]],
    { distance: 9.2, color: "#F08A4B", glow: "#FCD53E", start: 0.3, onTop: true }
  );

  kit.group.add(ratioGroup, outdoorGather.group);

  kit.card({
    title: "TỶ LỆ HIỆU SUẤT",
    body: "1 ĐƠN VỊ ĐIỆN → ~4 ĐƠN VỊ NHIỆT",
    at: ratioBeat,
    hold: 2.4,
    y: 430,
    width: 720,
  });
  kit.label({ text: "HƠN NỒI HƠI KHÍ ĐỐT 3–5×", at: boilerBeat, hold: 2.2, y: 1100 });
  kit.bigText({ text: "KHÔNG KHÍ LẠNH VẪN CÓ NHIỆT", at: payoffBeat, hold: 1.2, y: 520, size: 78 });

  return {
    scene: world.scene,
    camera,
    hero: [world.hp.group, world.room.group],
    update(t) {
      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpHeatFlow: 1,
        roomCutaway: 1,
        roomWarmth: 1.0,
        roomSeason: "winter",
        outCoilMode: "induced",
        inCoilMode: "ac",
      });

      kit.push(camera, t, { ...closePose, amount: -2.1, start: boilerBeat - 0.5, dur: 4.5 });
      kit.popIn(eBlock, t, 0.3, { dur: 0.3 });
      kit.popSeq(hBlocks, t, ratioBeat - 0.3, { span: 1.4, dur: 0.3 });
      outdoorGather.update(t);
    },
  };
}
