// c1a: Opening crane onto the winter house & heat pump cutaway (closed shell) + faint outdoor heat beads.
// Also exports homeWorld(kit) shared by all 16 EP09 vignettes so every move stays inside one world.
import { indoorRoom } from "./indoor-room/indoor-room.js";
import { heatPumpCutaway } from "./heat-pump-cutaway/heat-pump-cutaway.js";
import { copperCoil } from "./copper-coil/copper-coil.js";
import { refrigerantLoop } from "./refrigerant-loop/refrigerant-loop.js";
import { compressor } from "./compressor/compressor.js";
import { expansionValve } from "./expansion-valve/expansion-valve.js";

export function homeWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ yard: 14, clear: 7, seed: 7 });

  // 1. Main house + split heat pump at origin
  const room = indoorRoom(kit, { cutaway: 1 });
  scene.add(room.group);

  const hpGroup = new THREE.Group();
  hpGroup.name = "home-heat-pump-mount";
  hpGroup.position.set(0, 0.06, 0);
  scene.add(hpGroup);

  const hp = heatPumpCutaway(kit, { cutaway: 0, mode: "heating", fanSpeed: 1 });
  hpGroup.add(hp.group);

  // Helical solenoid copper coils inside outdoor & indoor unit bays (variant: "solenoid", voltage: 0)
  const outCoil = copperCoil(kit, {
    variant: "solenoid",
    turns: 6,
    outerRadius: 0.21,
    wireRadius: 0.022,
    length: 0.96,
    withBobbin: false,
  });
  outCoil.group.position.set(-1.61, 0.96, -0.10);
  outCoil.group.rotation.y = Math.PI / 2;
  hpGroup.add(outCoil.group);

  const inCoil = copperCoil(kit, {
    variant: "solenoid",
    turns: 6,
    outerRadius: 0.14,
    wireRadius: 0.018,
    length: 1.24,
    withBobbin: false,
  });
  inCoil.group.position.set(1.35, 1.92, 0.06);
  inCoil.group.rotation.y = Math.PI / 2;
  hpGroup.add(inCoil.group);

  // 2. Schematic 4-step cycle bench at x = 8.5, z = 1.5 (r1b, m1c, m1d, m1f, m1g)
  const bench = new THREE.Group();
  bench.name = "cycle-bench";
  bench.position.set(8.5, 0, 1.5);
  scene.add(bench);

  const loop = refrigerantLoop(kit, { width: 4.0, height: 2.4, baseY: 1.05, pipeRadius: 0.065 });
  bench.add(loop.group);

  // Expansion valve cutaway bay placed cleanly in front-left of bench so its -x (hot) -> +x (cold) flow reads true
  const valve = expansionValve(kit, { cutaway: 1 });
  valve.group.position.set(4.8, 0, 5.4);
  scene.add(valve.group);

  const comp = compressor(kit, { cutaway: 1, rate: 1.4 });
  comp.group.position.set(0, 1.945, 0.04);
  comp.group.scale.setScalar(0.70);
  bench.add(comp.group);

  const benchEvapCoil = copperCoil(kit, {
    variant: "solenoid",
    turns: 6,
    outerRadius: 0.23,
    wireRadius: 0.022,
    length: 1.15,
    withBobbin: false,
  });
  benchEvapCoil.group.position.set(-2.0, 2.25, 0.04);
  benchEvapCoil.group.rotation.x = Math.PI / 2;
  bench.add(benchEvapCoil.group);

  const benchCondCoil = copperCoil(kit, {
    variant: "solenoid",
    turns: 6,
    outerRadius: 0.23,
    wireRadius: 0.022,
    length: 1.15,
    withBobbin: false,
  });
  benchCondCoil.group.position.set(2.0, 2.25, 0.04);
  benchCondCoil.group.rotation.x = Math.PI / 2;
  bench.add(benchCondCoil.group);

  scene.updateMatrixWorld(true);

  function set(t, state = {}) {
    const geo = kit.clamp01(state.geo ?? 0);
    const geoEase = kit.ease(geo, "out");
    hpGroup.position.y = 0.06 + geoEase * 0.78;

    room.update(t, {
      cutaway: state.roomCutaway ?? 1,
      warmth: state.roomWarmth ?? 0.65,
      season: state.roomSeason ?? "winter",
      geo,
      tank: state.tank ?? 0,
    });

    hp.update(t, {
      cutaway: state.hpCutaway ?? 1,
      active: state.hpActive ?? 1,
      mode: state.hpMode ?? "heating",
      fanSpeed: state.fanSpeed ?? 1,
      heatFlow: state.hpHeatFlow ?? 1,
    });

    outCoil.update(t, {
      mode: state.outCoilMode ?? "idle",
      intensity: state.outCoilIntensity ?? 0.85,
      voltage: 0,
    });
    inCoil.update(t, {
      mode: state.inCoilMode ?? "idle",
      intensity: state.inCoilIntensity ?? 0.85,
      voltage: 0,
    });

    loop.update(t, {
      active: state.benchActive ?? 0,
      reverse: state.benchReverse ?? false,
      phaseSplit: state.benchPhaseSplit ?? 1,
      boil: state.benchBoil ?? 0,
      condense: state.benchCondense ?? 0,
    });
    valve.update(t, {
      flow: state.valveFlow ?? 1,
      drop: state.valveDrop ?? 1,
      reverse: state.benchReverse ?? false,
    });
    comp.update(t, {
      electric: state.compElec ?? 0.8,
      heat: state.compHeat ?? 0.8,
      active: state.compActive ?? 1,
      rate: state.compRate ?? 1.4,
      squeeze: state.compSqueeze,
    });
    benchEvapCoil.update(t, {
      mode: state.benchEvapMode ?? "induced",
      intensity: state.benchActive ?? 0.85,
      voltage: 0,
    });
    benchCondCoil.update(t, {
      mode: state.benchCondMode ?? "ac",
      intensity: state.benchActive ?? 0.85,
      voltage: 0,
    });
  }

  return {
    scene,
    room,
    hpGroup,
    hp,
    outCoil,
    inCoil,
    bench,
    loop,
    valve,
    comp,
    benchEvapCoil,
    benchCondCoil,
    set,
  };
}

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("home", homeWorld);
  const basePose = { pos: [0.3, 3.0, 10.8], look: [0.0, 1.45, 0.0], fov: 40 };
  const camera = kit.camera(basePose);

  const question = kit.beat("question");
  const noWarmth = kit.beat("no_warmth");

  // Faint outdoor heat energy beads present even in cold winter air (#F08A4B)
  const ambientHeat = kit.beads(
    [[-3.4, 1.6, 0.9], [-2.7, 1.35, 0.6], [-2.1, 1.05, 0.4], [-1.55, 0.92, 0.25]],
    { distance: 10.5, color: "#F08A4B", glow: "#FCD53E", start: 2.2, onTop: true }
  );

  // Subtle icy winter air flakes on the left outdoor side (#A9C7DA)
  const snowGroup = new THREE.Group();
  const snowMat = kit.toon("#A9C7DA");
  const flakes = [];
  for (let i = 0; i < 8; i++) {
    const f = new THREE.Mesh(new THREE.OctahedronGeometry(0.06, 0), snowMat);
    const sx = -3.4 + kit.hash(i * 3 + 1) * 2.2;
    const sz = -0.7 + kit.hash(i * 3 + 2) * 1.8;
    const phase = kit.hash(i * 3 + 3);
    f.position.set(sx, 2.2, sz);
    snowGroup.add(f);
    flakes.push({ mesh: f, sx, sz, phase });
  }
  kit.ink(snowGroup, { width: 1.5, shadows: false });

  const airAnchor = new THREE.Object3D();
  airAnchor.position.set(-2.55, 1.35, 0.55);
  kit.group.add(ambientHeat.group, snowGroup, airAnchor);

  kit.callout({ text: "NHIỆT TỪ ĐÂU?", anchor: world.hp.anchors.outdoor, at: question, hold: 2.0 });
  kit.callout({ text: "TRỜI LẠNH VẪN CÓ NHIỆT", anchor: airAnchor, at: noWarmth, hold: 1.2 });

  return {
    scene: world.scene,
    camera,
    hero: [world.hp.group, world.room.group],
    update(t) {
      world.set(t, {
        hpCutaway: 0,
        hpActive: 0,
        hpHeatFlow: 0.3,
        roomCutaway: 1,
        roomWarmth: 0.75,
        fanSpeed: 0.9,
        outCoilMode: "idle",
        inCoilMode: "idle",
      });
      kit.push(camera, t, { ...basePose, amount: 1.1, start: 4.0, dur: 4.0 });
      ambientHeat.update(t);
      flakes.forEach((f, idx) => {
        const u = ((t * 0.22 + f.phase) % 1 + 1) % 1;
        f.mesh.position.y = 2.7 - u * 2.4;
        f.mesh.position.x = f.sx + Math.sin(t * 1.6 + idx) * 0.12;
        f.mesh.rotation.y = t * 1.2 + idx;
      });
    },
  };
}
