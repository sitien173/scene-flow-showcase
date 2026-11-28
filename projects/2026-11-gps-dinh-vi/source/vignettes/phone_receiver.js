// r2 / phone_receiver: Cutaway back of smartphone exposes GPS receiver chip;
// three #00B4D8 PRN-coded signal streams arrive and separate by code before isolating one satellite.
import { streetWorld } from "./hook_dot.js";
import { signalPulse } from "./signal-pulse/signal-pulse.js";

export async function build(kit) {
  const world = await kit.world("street", streetWorld);

  const p0 = { pos: [0.05, 1.55, 2.85], look: [0.0, 1.18, 0.0], fov: 38 };
  const p1 = { pos: [0.0, 1.42, 2.42], look: [0.0, 1.18, 0.0], fov: 36 };
  const camera = kit.camera(p0);

  const rxChip = kit.beat("rx_chip");
  const prnCode = kit.beat("prn_code");
  const firstSat = kit.beat("first_sat");

  const sources = [
    [-1.45, 3.05, -0.4],
    [0.0, 3.25, -0.5],
    [1.45, 3.05, -0.4],
  ];
  const streams = sources.map((src, idx) => {
    const s = signalPulse(kit, { mode: "prn", prnIndex: idx, length: 2.35, color: "#00B4D8" });
    s.group.position.set(...src);
    s.group.lookAt(0, 1.18, 0.04);
    kit.group.add(s.group);
    return s;
  });

  kit.callout({
    text: "BỘ THU GPS",
    anchor: world.phone.anchors.chip,
    at: Math.max(rxChip, 0.9),
    hold: prnCode - Math.max(rxChip, 0.9) - 0.35,
  });
  kit.card({
    title: "MÃ RIÊNG TỪNG VỆ TINH",
    body: "PHÂN BIỆT TỪNG LUỒNG TÍN HIỆU",
    at: prnCode,
    hold: 2.5,
    anchor: world.phone.anchors.chip,
    y: 460,
    width: 680,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.phone.group],
    update(t) {
      const cut = kit.ease(kit.progress(t, rxChip - 0.2, 0.7), "out");
      const iso = kit.ease(kit.progress(t, firstSat, 0.6), "inOut");
      world.set(t, {
        phonePos: [0, 1.18, 0],
        phoneRot: [-0.85, 0, 0],
        cutaway: cut,
        coilGlow: t >= rxChip ? 0.85 : 0.2,
        cardPulse: t >= firstSat ? 0.9 : 0.3,
        canyon: 0,
      });

      streams.forEach((s, idx) => {
        const active = idx === 0 ? 1 : kit.lerp(1, 0.18, iso);
        s.update(t, {
          active: t >= 0.4 ? active : 0,
          progress: kit.ease(kit.progress(t, 0.4 + idx * 0.2, 0.9), "out"),
          showTimeCode: idx === 0 && t >= prnCode ? 0.8 : 0,
        });
      });

      kit.fly(camera, t, { from: p0, to: p1, start: rxChip, dur: 2.4, ease: "drift" });
    },
  };
}
