// Vignette 7 (read_sense): Apply #E879F9 test voltage to two cells (low vs high threshold):
// higher than threshold conducts (#18191E channel + check), lower blocks (x).
import { cellLabWorld } from "./threshold_v.js";
import { memoryCell } from "./memory-cell/memory-cell.js";

export async function build(kit) {
  const world = await kit.world("cell_lab", cellLabWorld);
  const X = -5.5;

  // Stacked vertically on X = -5.5 so both fit cleanly within 9:16 width margins
  const cellA = memoryCell(kit, { mode: "threshold_read_pass" });
  cellA.group.position.set(X - 0.12, 1.65, -0.2);
  const cellB = memoryCell(kit, { mode: "threshold_read_block" });
  cellB.group.position.set(X - 0.12, 0.0, 0.2);
  kit.group.add(cellA.group, cellB.group);

  const pose = { pos: [X + 0.06, 2.0, 8.2], look: [X + 0.06, 1.48, 0], fov: 40 };
  const camera = kit.camera(pose);
  const probe = kit.beat("probe");
  const pass = kit.beat("pass");
  const block = kit.beat("block");

  kit.callout({
    text: "ĐIỆN ÁP THỬ",
    anchor: cellA.anchors.gate,
    at: probe,
    hold: 3.4,
    gap: 200,
  });
  kit.mark({
    kind: "check",
    anchor: cellA.anchors.channel,
    at: pass,
    hold: 3.8,
  });
  kit.label({
    text: "DẪN ĐIỆN",
    at: pass + 0.15,
    hold: 3.2,
    y: 495,
    size: 54,
    color: "#2D884E",
  });
  kit.mark({
    kind: "x",
    anchor: cellB.anchors.channel,
    at: block,
    hold: 2.0,
  });
  kit.label({
    text: "KHÔNG DẪN",
    at: block + 0.15,
    hold: 1.8,
    y: 495,
    size: 54,
    color: "#DD3428",
  });

  return {
    scene: world.scene,
    camera,
    hero: [cellA.group, cellB.group],
    update(t) {
      const probeOn = t >= probe - 0.3;
      const probeVal = probeOn ? 0.56 : null;

      cellA.update(t, {
        mode: "threshold_read_pass",
        charge: 0.24,
        probe: probeVal,
        conducting: t >= pass - 0.4,
        gateGlow: probeOn ? 0.9 : 0.15,
      });
      cellB.update(t, {
        mode: "threshold_read_block",
        charge: 0.85,
        probe: probeVal,
        conducting: false,
        gateGlow: probeOn ? 0.9 : 0.15,
      });

      if (t < pass + 0.4) {
        kit.drift(camera, t, {
          from: pose,
          to: { pos: [X + 0.08, 2.55, 6.4], look: [X + 0.08, 2.15, -0.2], fov: 38 },
          start: probe - 0.2,
          dur: Math.max(1.2, pass - probe + 0.4),
        });
      } else {
        kit.fly(camera, t, {
          from: { pos: [X + 0.08, 2.55, 6.4], look: [X + 0.08, 2.15, -0.2], fov: 38 },
          to: { pos: [X + 0.08, 1.45, 6.5], look: [X + 0.08, 0.85, 0.2], fov: 38 },
          start: block - 1.2,
          dur: 1.3,
          ease: "inOut",
        });
      }
    },
  };
}
