// Vignette 10 (intercalate, sentences 24-26): close-up on the metal-oxide crystal lattice gaps
// showing Li+ intercalation preserving electrode structure, with a green check on durable crystal.
import { mainWorld } from "./hook.js";

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("main", mainWorld);
  const startPose = { pos: [0.82, 1.12, 3.8], look: [0.84, 0.96, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const xenke = kit.beat("xenke");
  const durable = kit.beat("durable");

  // Small comparison block (cracked old-style electrode) to the right side at durability beat
  const oldCell = new THREE.Group();
  oldCell.position.set(2.35, 0.02, 0.35);
  const crackedA = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.55, 0.42), kit.toon("#5E5654"));
  crackedA.position.set(-0.08, 0.28, 0);
  crackedA.rotation.z = 0.14;
  const crackedB = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.46, 0.40), kit.toon("#464C60"));
  crackedB.position.set(0.18, 0.25, 0.05);
  crackedB.rotation.z = -0.18;
  oldCell.add(crackedA, crackedB);
  kit.ink(oldCell);
  kit.group.add(oldCell);
  kit.callout({ text: "CƠ CHẾ XEN KẼ", anchor: world.cell.anchors.crystalSlot, at: xenke, hold: 2.8 });
  kit.mark({ kind: "check", anchor: world.cell.anchors.crystalSlot, at: durable, hold: 1.5 });

  return {
    scene: world.scene,
    camera,
    hero: world.cell.group,
    update(t) {
      // Gently seat ions into the cathode crystal pockets (ionProgress around 0.85..0.95)
      const settle = 0.72 + 0.24 * kit.ease(kit.progress(t, 1.0, 5.5), "out");
      world.set(t, {
        deskCutaway: 1,
        cellState: { openCutaway: 1, mode: "idle", ionProgress: settle, showIons: true },
        electrolyteVisible: true,
        electrolyteState: { fill: 1, flowDir: 0, showBlock: 0, showIons: false },
        circuitVisible: true,
        circuitState: { mode: "idle", chipGlow: 0.25, loadGlow: 0.25, chargerPlug: 0 },
        topPhoneVisible: false,
      });

      kit.popIn(oldCell, t, durable - 1.0, { dur: 0.4 });
      if (t >= 0.9) {
        kit.orbit(camera, t - 0.9, {
          center: [0.84, 0.96, 0],
          radius: 3.8,
          height: 0.16,
          angle: 0.0,
          speed: 0.05,
          look: [0.84, 0.96, 0],
          fov: 40,
        });
      } else {
        kit.setPose(camera, startPose);
      }
    },
  };
}
