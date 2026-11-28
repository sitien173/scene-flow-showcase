// Vignette 11 (charger, sentences 27-28): hard cut to full cell + external circuit,
// charger plug docks into top port and voltage pressure reverses flow direction.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const world = await kit.world("main", mainWorld);
  const widePose = { pos: [0.35, 2.15, 10.6], look: [0.28, 1.72, 0], fov: 42 };
  const camera = kit.camera(widePose);
  const plug = kit.beat("plug");
  const voltage = kit.beat("voltage");
  kit.card({ title: "PIN CẠN · CẮM SẠC", body: "NGUỒN ĐIỆN ĐẢO CHIỀU", at: plug, hold: 2.6, y: 450, width: 620 });
  kit.bigText({ text: "ĐẢO CHIỀU", at: voltage, hold: 2.2, y: 550 });

  return {
    scene: world.scene,
    camera,
    hero: [world.cell.group, world.circuit.group],
    update(t) {
      const plugged = kit.ease(kit.progress(t, plug, 0.8), "out");
      const reversed = t >= voltage;
      world.set(t, {
        deskCutaway: 1,
        cellState: {
          openCutaway: 1,
          mode: reversed ? "charge" : "idle",
          soc: 0.15,
          showIons: true,
        },
        electrolyteVisible: true,
        electrolyteState: {
          fill: 1,
          flowDir: reversed ? -1 : 0,
          showBlock: 0,
          showIons: reversed,
        },
        circuitVisible: true,
        circuitState: {
          mode: reversed ? "charge" : "idle",
          chipGlow: reversed ? 0.65 : 0.05,
          loadGlow: reversed ? 0.55 : 0.05,
          chargerPlug: plugged,
        },
        topPhoneVisible: false,
      });

      kit.push(camera, t, { ...widePose, amount: 1.8, start: voltage - 0.6, dur: 2.6, ease: "inOut" });
    },
  };
}
