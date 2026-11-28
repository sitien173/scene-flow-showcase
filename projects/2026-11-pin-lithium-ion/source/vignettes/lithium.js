// Vignette 3 (lithium, sentences 6-7): microscopic world featuring the lithium atom
// (charge-particle customized to purple Li+ core + yellow e- valence shell) beside a simple
// toon3d balance scale showing lithium is the lightest solid element.
// Exports microWorld(kit) shared with ionize.
import { chargeParticle } from "./charge-particle/charge-particle.js";

export function microWorld(kit) {
  const { THREE } = kit;
  const scene = kit.stage({ yard: 8, clear: 6, seed: 11 });

  const atomGroup = new THREE.Group();
  atomGroup.position.set(0, 1.55, 0);
  scene.add(atomGroup);

  const cp = chargeParticle(kit);
  cp.group.scale.setScalar(1.35);
  atomGroup.add(cp.group);

  // Recolor charge-particle carriers to match fixed color roles: Li+ (#8B5CF6 purple), e- (#FCD53E yellow)
  const electronMesh = cp.group.getObjectByName("electron");
  const coreMesh = cp.group.getObjectByName("hole");
  const photonMesh = cp.group.getObjectByName("photon");
  if (electronMesh) electronMesh.material.color.set("#FCD53E");
  if (coreMesh) coreMesh.material.color.set("#8B5CF6");
  if (photonMesh) photonMesh.visible = false;
  cp.group.traverse(child => {
    if (child.name && child.name.startsWith("seat")) child.visible = false;
  });

  // Two subtle orbital rings framing the lithium atom
  const ringMat = kit.toon("#A5B4FC");
  const innerOrbit = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.022, 6, 36), ringMat);
  innerOrbit.rotation.x = Math.PI * 0.42;
  const outerOrbit = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.025, 6, 42), kit.toon("#FCD53E"));
  outerOrbit.rotation.x = Math.PI * 0.36;
  outerOrbit.rotation.y = 0.25;
  kit.ink(innerOrbit);
  kit.ink(outerOrbit);
  atomGroup.add(innerOrbit, outerOrbit);

  const coreAnchor = new THREE.Object3D();
  coreAnchor.position.set(0, 0, 0);
  atomGroup.add(coreAnchor);

  const electronAnchor = new THREE.Object3D();
  electronAnchor.position.set(1.22, 0, 0);
  atomGroup.add(electronAnchor);

  function setAtom(t, { orbitSpeed = 2.2, detach = 0, atomY = 1.55 } = {}) {
    cp.update(t, { recombine: 1 });
    atomGroup.position.y = atomY;
    if (coreMesh) {
      coreMesh.position.set(-detach * 0.35, 0, 0);
      coreMesh.scale.setScalar(1.18);
    }
    const angle = t * orbitSpeed;
    const ox = Math.cos(angle) * 0.90;
    const oz = Math.sin(angle) * 0.42;
    const oy = Math.sin(angle) * 0.24;
    if (electronMesh) {
      const ex = kit.lerp(ox, 1.35, detach);
      const ey = kit.lerp(oy, 0.28 * Math.sin(t * 3.0), detach);
      const ez = kit.lerp(oz, 0.22, detach);
      electronMesh.position.set(ex, ey, ez);
      electronAnchor.position.set(ex * 1.35, ey * 1.35, ez * 1.35);
    }
    outerOrbit.scale.setScalar(1 - detach * 0.15);
    innerOrbit.rotation.z = t * 0.4;
  }

  return { scene, atomGroup, cp, coreAnchor, electronAnchor, outerOrbit, setAtom };
}

export async function build(kit) {
  const { THREE } = kit;
  const world = await kit.world("micro", microWorld);
  const startPose = { pos: [0.35, 1.95, 8.8], look: [0.25, 1.35, 0], fov: 40 };
  const camera = kit.camera(startPose);
  const lithium = kit.beat("lithium");
  const lightest = kit.beat("lightest");

  // Simple toon3d balance scale on the right-lower side comparing heavy metal vs light lithium
  const scaleGroup = new THREE.Group();
  scaleGroup.position.set(0.65, 0, 0.25);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.10, 0.50), kit.toon("#3B4052"));
  base.position.y = 0.05;
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.95, 10), kit.toon("#4C536B"));
  pillar.position.y = 0.52;
  const beam = new THREE.Group();
  beam.position.set(0, 0.96, 0);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.06, 0.08), kit.toon("#D98245"));
  beam.add(bar);

  const panL = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.06, 14), kit.toon("#B4BCCB"));
  panL.position.set(-0.68, -0.14, 0);
  const heavyCube = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), kit.toon("#464C60"));
  heavyCube.position.set(-0.68, 0.03, 0);

  const panR = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.06, 14), kit.toon("#B4BCCB"));
  panR.position.set(0.68, -0.14, 0);
  const liCube = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.20, 0.20), kit.toon("#8B5CF6"));
  liCube.position.set(0.68, -0.01, 0);

  beam.add(panL, heavyCube, panR, liCube);
  scaleGroup.add(base, pillar, beam);
  kit.ink(scaleGroup);
  kit.group.add(scaleGroup);

  kit.callout({ text: "LITHIUM", anchor: world.coreAnchor, at: lithium, hold: 1.1 });
  kit.card({ title: "LITHIUM", body: "RẮN NHẸ NHẤT", at: lightest, hold: 2.6, y: 460, width: 540 });

  return {
    scene: world.scene,
    camera,
    hero: [world.atomGroup, scaleGroup],
    update(t) {
      const floatY = 1.65 + Math.sin(t * 2.1) * 0.10;
      world.setAtom(t, { orbitSpeed: 2.0, detach: 0, atomY: floatY });
      world.atomGroup.position.x = -0.15;

      // Tilt scale so heavy metal sinks (-x down) and light lithium rises (+x up)
      const tilt = kit.ease(kit.progress(t, lightest - 0.6, 1.0), "out");
      beam.rotation.z = 0.26 * tilt;
      kit.popIn(scaleGroup, t, 0.6, { dur: 0.4 });

      kit.push(camera, t, { ...startPose, amount: 0.9, start: 0.9, dur: 3.8, ease: "drift" });
    },
  };
}
