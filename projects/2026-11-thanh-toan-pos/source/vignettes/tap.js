// c1 / tap: Opening crane onto the cafe counter as smartphone approaches POS reader.
// Exports cafeWorld(kit) shared by all cafe vignettes.
import { cafeCounter } from "./cafe-counter/cafe-counter.js";
import { posReader } from "./pos-reader/pos-reader.js";
import { smartphone } from "./smartphone/smartphone.js";
import { emField } from "./em-field/em-field.js";
import { paymentNetwork } from "./payment-network/payment-network.js";
import { coffeeCup } from "./coffee-cup/coffee-cup.js";

export function cafeWorld(kit) {
  const scene = kit.stage({ yard: 11 });

  const counter = cafeCounter(kit, {});
  scene.add(counter.group);

  const pos = posReader(kit, {});
  pos.group.position.copy(counter.anchors.posSlot.position);
  scene.add(pos.group);

  const cup = coffeeCup(kit, {});
  cup.group.position.copy(counter.anchors.coffeeSlot.position);
  scene.add(cup.group);

  const phone = smartphone(kit, {});
  scene.add(phone.group);

  const field = emField(kit, {});
  field.group.position.set(
    counter.anchors.posSlot.position.x,
    counter.anchors.posSlot.position.y + 0.44,
    counter.anchors.posSlot.position.z - 0.14
  );
  scene.add(field.group);

  const network = paymentNetwork(kit, {});
  network.group.position.copy(counter.anchors.networkSlot.position);
  scene.add(network.group);

  const defaultPhonePos = [
    counter.anchors.posSlot.position.x,
    counter.anchors.posSlot.position.y + 0.88,
    counter.anchors.posSlot.position.z + 0.08,
  ];

  function set(t, {
    posCut = 0,
    posGlow = 0,
    posStatus = "idle",
    phoneCut = 0,
    phoneGlow = 0,
    cardPulse = 0,
    phonePos = defaultPhonePos,
    phoneRot = [-0.28, 0, 0],
    phoneVisible = true,
    fieldIntensity = 0,
    fieldScale = 1,
    cupSteam = 1,
    netScan = 0,
    netVerified = 0,
    netApproved = 0,
  } = {}) {
    pos.update(t, { cutaway: posCut, coilGlow: posGlow, status: posStatus });
    phone.group.visible = phoneVisible;
    phone.group.position.set(...phonePos);
    phone.group.rotation.set(...phoneRot);
    phone.update(t, { cutaway: phoneCut, coilGlow: phoneGlow, cardPulse });
    field.update(t, { intensity: fieldIntensity, radiusScale: fieldScale });
    cup.update(t, { steam: cupSteam });
    network.update(t, { scanning: netScan, verified: netVerified, approved: netApproved });
  }

  return { scene, counter, pos, cup, phone, field, network, set };
}

export async function build(kit) {
  const world = await kit.world("cafe", cafeWorld);
  const pose = { pos: [0.35, 2.38, 3.25], look: [0.0, 1.52, 0.18], fov: 36 };
  const camera = kit.camera(pose);
  const result = kit.beat("result");
  kit.callout({
    text: "GỬI GÌ?",
    anchor: [0.35, 1.78, 0.12],
    at: result,
    hold: 1.1,
  });

  return {
    scene: world.scene,
    camera,
    hero: [world.pos.group, world.phone.group],
    update(t) {
      const approach = kit.ease(kit.progress(t, 0.5, 2.2), "inOut");
      const py = kit.lerp(2.45, 1.88, approach);
      const pz = kit.lerp(0.65, 0.16, approach);
      world.set(t, {
        phonePos: [0.35, py, pz],
        phoneRot: [-0.32, 0, 0],
      });
      kit.crane(camera, t, { ...pose, height: -0.25, dur: 2.8 });
    },
  };
}
