// w1b: Energy balance Qh = Qc + W (dusk) & IEA household heat pump COP ~ 4 column comparison.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const fromPose = { pos: [-0.35, 1.85, 6.60], look: [-0.15, 1.35, 0.0], fov: 38 };
  const toPose = { pos: [1.05, 1.95, 7.10], look: [1.15, 1.45, 0.15], fov: 38 };
  const camera = kit.camera(fromPose);

  const elecIn = kit.beat("elec_in");
  const sumHeat = kit.beat("sum_heat");
  const cop4 = kit.beat("cop4");

  // Electrical work W (#FCD53E) entering compressor bay
  const elecWork = kit.beads(
    [[-2.20, 0.25, 0.55], [-1.35, 0.35, 0.35], [-0.85, 0.52, 0.12]],
    { distance: 6.6, color: "#FCD53E", glow: "#FFF6C8", start: 0.2, onTop: true }
  );
  // Outdoor heat Qc (#F08A4B) joining work W into total indoor heat Qh (#F08A4B)
  const totalHeat = kit.beads(
    [[-2.75, 1.00, 0.15], [-1.55, 0.95, 0.05], [-0.78, 0.58, -0.12], [0.25, 1.41, -0.18], [1.35, 1.75, 0.10], [1.65, 1.10, 0.35]],
    { distance: 6.6, color: "#F08A4B", glow: "#FCD53E", start: 0.4, onTop: true }
  );

  // 3D COP ~ 4 bar chart standing on right side of room yard (1 unit elec #FCD53E -> 4 units heat #F08A4B)
  const copGroup = new THREE.Group();
  copGroup.position.set(2.95, 0.10, 0.75);
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.14, 0.75), kit.toon("#5B5E70"));
  plinth.position.y = 0.07;
  const elecBlock = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.46), kit.toon("#FCD53E", { emissive: "#786008" }));
  elecBlock.position.set(-0.42, 0.38, 0);
  const heatBlocks = [];
  for (let i = 0; i < 4; i++) {
    const hb = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.44, 0.46), kit.toon("#F08A4B", { emissive: "#693210" }));
    hb.position.set(0.42, 0.38 + i * 0.48, 0);
    heatBlocks.push(hb);
  }
  const copFrame = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.10, 0.54), kit.toon("#2D884E"));
  copFrame.position.set(0.42, 2.24, 0);
  copGroup.add(plinth, elecBlock, ...heatBlocks, copFrame);
  kit.ink(copGroup);

  kit.group.add(elecWork.group, totalHeat.group, copGroup);

  kit.callout({ text: "ĐIỆN MÁY NÉN", anchor: world.hp.anchors.outdoor, at: elecIn, hold: 2.4 });
  kit.callout({ text: "NHIỆT + CÔNG NÉN", anchor: world.hp.anchors.shell, at: sumHeat, hold: 2.6 });
  kit.bigText({ text: "COP ≈ 4 LẦN (IEA)", at: cop4, hold: 1.2, y: 1080, size: 88 });

  return {
    scene: world.scene,
    camera,
    hero: [world.hp.group, copGroup],
    update(t) {
      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpHeatFlow: 1,
        roomCutaway: 1,
        roomWarmth: 0.9,
        outCoilMode: "induced",
        inCoilMode: "ac",
      });

      kit.drift(camera, t, { from: fromPose, to: toPose, start: sumHeat, dur: 4.0 });
      elecWork.update(t);
      totalHeat.update(t);
      kit.popIn(plinth, t, sumHeat - 0.4, { dur: 0.25 });
      kit.popIn(elecBlock, t, elecIn, { dur: 0.3 });
      kit.popSeq(heatBlocks, t, sumHeat, { span: 1.8, dur: 0.3 });
      kit.popIn(copFrame, t, cop4 - 0.2, { dur: 0.3 });
    },
  };
}
