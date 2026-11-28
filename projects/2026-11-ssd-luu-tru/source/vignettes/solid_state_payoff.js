// Vignette 19 (solid_state_payoff): SSD has zero moving mechanical parts; uses electronic circuits
// to read charge states (#22D3EE / #F59E0B) via controller (#E879F9) and return data (#2D7FF9).
import { deskOutroWorld } from "./no_spin_hdd.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export async function build(kit) {
  const world = await kit.world("desk_outro", deskOutroWorld);
  const noMech = kit.beat("no_mech");
  const circuit = kit.beat("circuit");
  const payoff = kit.beat("payoff");

  // Showcase memory cell mounted cleanly behind the SSD PCB at payoff
  const cell = memoryCell(kit, { mode: "threshold_read_pass" });
  cell.group.scale.setScalar(0.58);
  cell.group.position.set(0.0, 0.0, -1.65);
  kit.group.add(cell.group);

  const circuitFlow = kit.beads(
    [[0.0, 0.45, -1.55], [0.56, 0.24, -0.28], [0.33, 0.24, 0.36], [0.55, 0.26, 0.95]],
    { distance: 6.4, fov: 38, color: "#E879F9", glow: "#F5C2FF", start: circuit - 0.4, end: 13.0, onTop: true }
  );
  kit.group.add(circuitFlow.group);

  const pose = { pos: [0.0, 3.65, 6.75], look: [0.0, 0.65, -0.25], fov: 38 };
  const camera = kit.camera(pose);

  const mechAt = Math.max(noMech, 0.85);
  kit.mark({
    kind: "x",
    anchor: world.ssd.anchors.emptyBay,
    at: mechAt,
    hold: 2.8,
  });
  kit.label({
    text: "KHÔNG CƠ KHÍ",
    at: mechAt,
    hold: 2.8,
    y: 495,
    size: 56,
    color: "#DD3428",
  });
  kit.callout({
    text: "MẠCH ĐIỆN",
    anchor: world.ssd.anchors.controller,
    at: circuit,
    hold: 3.0,
    gap: 220,
  });
  kit.bigText({
    text: "TRẠNG THÁI\nĐIỆN TÍCH",
    at: payoff,
    hold: 3.0,
    y: 620,
    size: 92,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.ssd.group, cell.group],
    update(t) {
      world.ssd.update(t, {
        mode: "active_circuit",
        cutaway: 1.0,
        power: 1,
        circuit: 1.0,
        nandGlow: 1.0,
        ctrlGlow: 1.0,
        hostGlow: 1.0,
      });

      const ret = kit.ease(kit.progress(t, circuit, 3.0), "inOut");
      world.pkt.group.visible = true;
      world.pkt.group.position.set(0.55, 0.26, kit.lerp(0.85, 1.38, ret));
      world.pkt.update(t, { pulse: 0.9, spin: 0.35 });

      kit.popIn(cell.group, t, circuit - 0.5, { dur: 0.45 });
      cell.update(t, {
        mode: "threshold_read_pass",
        charge: 0.65,
        probe: 0.78,
        conducting: t >= circuit,
        gateGlow: 0.9,
        showGauge: true,
      });

      circuitFlow.update(t);
      kit.push(camera, t, { ...pose, amount: 0.85, start: circuit, dur: 5.0 });
    },
  };
}
