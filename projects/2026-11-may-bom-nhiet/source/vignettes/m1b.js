// m1b: Mechanism step 1b — Outdoor heat energy (#F08A4B) transfers into colder copper coil,
// boiling refrigerant (#2D7FF9) into low-pressure gas carrying captured heat toward the compressor.
import { homeWorld } from "./c1a.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const fromPose = { pos: [-2.65, 1.50, 3.85], look: [-1.45, 0.98, -0.10], fov: 38 };
  const toPose = { pos: [-2.05, 1.55, 4.15], look: [-1.05, 1.05, -0.05], fov: 38 };
  const camera = kit.camera(fromPose);

  const absorb = kit.beat("absorb");
  const boil = kit.beat("boil");
  const carry = kit.beat("carry");

  // Heat energy streams (#F08A4B) from outdoor air converging onto the copper coil
  const heatInA = kit.beads(
    [[-3.20, 1.35, 0.70], [-2.55, 1.18, 0.35], [-1.95, 1.02, 0.05], [-1.55, 0.96, -0.08]],
    { distance: 3.8, color: "#F08A4B", glow: "#FCD53E", start: 0.4, onTop: true }
  );
  const heatInB = kit.beads(
    [[-3.15, 0.65, 0.65], [-2.45, 0.78, 0.28], [-1.85, 0.88, 0.02], [-1.42, 0.96, -0.08]],
    { distance: 3.8, color: "#F08A4B", glow: "#FCD53E", start: 0.9, onTop: true }
  );

  // Refrigerant flowing through coil and exiting toward conduit bridge
  const coilFlow = kit.beads(world.outCoil.path("coil"), {
    distance: 3.8,
    color: "#2D7FF9",
    glow: "#A9D2FF",
    start: 0.2,
    onTop: true,
  });

  // Vapor gas bubbles carrying captured heat along exit pipe
  const vaporExit = kit.beads(
    [[-1.15, 0.96, -0.10], [-0.78, 0.58, -0.12], [-0.20, 0.58, -0.18], [0.25, 1.41, -0.18]],
    { distance: 3.9, color: "#2D7FF9", glow: "#F08A4B", start: boil - 0.3, onTop: true }
  );

  // Expanding boiling vapor spheres around the coil
  const boilGroup = new THREE.Group();
  const bubbleMat = kit.toon("#2D7FF9", { emissive: "#1B4B96" });
  const bubbles = [];
  for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 6), bubbleMat);
    b.position.set(-1.95 + i * 0.14, 0.96, 0.08);
    boilGroup.add(b);
    bubbles.push(b);
  }
  kit.ink(boilGroup, { width: 1.8, shadows: false });

  const heatAnchor = new THREE.Object3D();
  heatAnchor.position.set(-2.35, 1.12, 0.32);
  kit.group.add(heatInA.group, heatInB.group, coilFlow.group, vaporExit.group, boilGroup, heatAnchor);

  kit.callout({ text: "NHIỆT TRUYỀN VÀO", anchor: heatAnchor, at: absorb, hold: 2.2 });
  kit.callout({ text: "SÔI → THỂ KHÍ", anchor: world.outCoil.anchors.center, at: boil, hold: 2.2 });

  return {
    scene: world.scene,
    camera,
    hero: [world.outCoil.group, world.hp.group],
    update(t) {
      const boilAmt = kit.ease(kit.progress(t, boil - 0.6, 2.0), "inOut");
      const carryAmt = kit.ease(kit.progress(t, carry - 0.4, 1.5), "inOut");
      world.set(t, {
        hpCutaway: 1,
        hpActive: 1,
        hpHeatFlow: 0.35 + 0.65 * carryAmt,
        roomCutaway: 1,
        roomWarmth: 0.55,
        fanSpeed: 1.35,
        outCoilMode: "induced",
        outCoilIntensity: 0.95,
        inCoilMode: "idle",
      });

      kit.drift(camera, t, { from: fromPose, to: toPose, start: boil - 0.2, dur: 4.5 });
      heatInA.update(t);
      heatInB.update(t);
      coilFlow.update(t);
      vaporExit.update(t);

      bubbles.forEach((b, i) => {
        b.visible = boilAmt > 0.05;
        if (!b.visible) return;
        const u = ((t * 0.85 + i / bubbles.length) % 1 + 1) % 1;
        b.position.set(-1.98 + i * 0.15, 0.88 + u * 0.55, 0.12);
        b.scale.setScalar((0.45 + 0.85 * u) * boilAmt);
      });
    },
  };
}
