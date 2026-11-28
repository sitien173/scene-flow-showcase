// Vignette 6 (threshold_v): More trapped #22D3EE electrons raise the #F59E0B threshold voltage,
// making the neutral-ink (#18191E) conduction channel harder to open.
// Exports cellLabWorld(kit) shared by threshold_v, read_sense, slc_one_bit, mlc_two_bit, mlc_tradeoff.
import { memoryCell } from "./memory-cell/memory-cell.js";

export function cellLabWorld(kit) {
  const scene = kit.stage({ yard: 15, clear: 6, seed: 11 });
  return { scene };
}

export async function build(kit) {
  const world = await kit.world("cell_lab", cellLabWorld);
  const X = -11;
  const cell = memoryCell(kit, { mode: "trapped_charge" });
  cell.group.position.set(X, 0, 0);
  kit.group.add(cell.group);

  const pose = { pos: [X + 0.16, 1.56, 5.9], look: [X + 0.16, 0.78, 0], fov: 38 };
  const camera = kit.camera(pose);
  const shift = kit.beat("shift");
  const vth = kit.beat("vth");
  const harder = kit.beat("harder");

  kit.callout({
    text: "ĐIỆN TÍCH TĂNG",
    anchor: cell.anchors.chargeTrap,
    at: shift + 0.25,
    hold: 5.0,
    gap: 230,
  });
  kit.callout({
    text: "ĐIỆN ÁP NGƯỠNG",
    anchor: cell.anchors.thresholdGauge,
    at: vth,
    hold: 2.6,
    gap: 220,
  });
  kit.label({
    text: "NHIỀU ELECTRON → NGƯỠNG CAO",
    at: harder,
    hold: 2.2,
    y: 470,
    size: 46,
  });

  return {
    scene: world.scene,
    camera,
    hero: [cell.group],
    update(t) {
      const chargeRamp = kit.ease(kit.progress(t, shift, harder - shift + 1.0), "inOut");
      const charge = kit.lerp(0.22, 0.90, chargeRamp);
      const probe = kit.lerp(0.35, 0.85, kit.clamp01(kit.progress(t, vth - 1.2, 4.2)));
      const conducting = probe > charge && t >= vth - 1.0;

      cell.update(t, {
        mode: conducting ? "threshold_read_pass" : "threshold_read_block",
        charge,
        probe: t >= shift ? probe : null,
        conducting,
        gateGlow: t >= vth - 0.5 ? 0.85 : 0.3,
        showGauge: true,
      });

      kit.push(camera, t, { ...pose, amount: 0.55, start: vth, dur: 3.4 });
    },
  };
}
