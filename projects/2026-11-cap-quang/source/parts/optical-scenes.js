import { opticalFiber } from "../vignettes/optical-fiber/optical-fiber.js";
import { lightPulse } from "../vignettes/light-pulse/light-pulse.js";
import { transceiver } from "../vignettes/transceiver/transceiver.js";
import { dataPacket } from "../vignettes/data-packet/data-packet.js";
import { smartphone } from "../vignettes/smartphone/smartphone.js";

// A compact diagram stage. All geometry is created once; seek only moves existing objects.
export async function opticalScene(kit, id) {
  const { THREE: T, PALETTE: P } = kit;
  const scene = kit.stage({ surroundings: false });
  const group = kit.group;
  scene.add(group);
  const camera = kit.camera({ pos: [0, 2.0, 15], look: [0, 2.0, 0], fov: 35 });
  const models = [], updates = [];
  const add = (object, x = 0, y = 2, z = 0, scale = 1) => {
    object.position.set(x, y, z); object.scale.setScalar(scale); group.add(object); return object;
  };
  const box = (w, h, d, color, x, y, z = 0) => add(new T.Mesh(new T.BoxGeometry(w, h, d), kit.toon(color)), x, y, z);
  const line = (points, color, radius = 0.035) => {
    const path = new T.CatmullRomCurve3(points.map(p => new T.Vector3(...p)));
    const mesh = new T.Mesh(new T.TubeGeometry(path, 32, radius, 7, false), kit.toon(color));
    group.add(mesh); return mesh;
  };
  const disk = (radius, color, x, y, z = 0) => add(new T.Mesh(new T.CylinderGeometry(radius, radius, 0.14, 32), kit.toon(color)), x, y, z);
  const fiber = (x = 0, y = 2, scale = 1) => {
    const item = opticalFiber(kit); add(item.group, x, y, 0, scale); models.push(item); return item;
  };
  const pulse = (x = 0, y = 2, scale = 1, opts = {}) => {
    const item = lightPulse(kit, opts); add(item.group, x, y, 0.25, scale); models.push(item); return item;
  };
  const terminal = (x = 0, y = 2, scale = 0.7, direction = 'transmit') => {
    const item = transceiver(kit, { direction }); add(item.group, x, y, 0, scale); models.push(item); return item;
  };
  const packet = (x = 0, y = 2, scale = 1) => {
    const item = dataPacket(kit, { color: P.good }); add(item.group, x, y, 0.7, scale); models.push(item); return item;
  };
  const label = (text, beat, y = 1220, hold = 2.3) => kit.label({ text, at: kit.beat(beat), hold, y });
  const move = (object, x0, x1, y, duration = 4, phase = 0) => updates.push(t => {
    const p = ((t / duration + phase) % 1 + 1) % 1;
    object.position.x = x0 + (x1 - x0) * p;
    object.position.y = y;
  });
  const marker = (color, x, y, r = 0.12) => add(new T.Mesh(new T.SphereGeometry(r, 12, 8), kit.toon(color, { emissive: color })), x, y, 0.7);
  const pulseTrain = (y, level = 1) => {
    const a = pulse(0, y, 0.8, { count: 3, length: 4, speed: 0.7 });
    updates.push(t => a.update(t, { level })); return a;
  };
  const crossSection = (x, y, scale = 1) => {
    const back = disk(1.1, P.ink, x, y, 0); back.rotation.x = Math.PI / 2;
    const clad = disk(0.82, P.card, x, y, 0.11); clad.rotation.x = Math.PI / 2;
    const core = disk(0.46, P.shade, x, y, 0.22); core.rotation.x = Math.PI / 2;
    const edge = new T.Mesh(new T.TorusGeometry(0.46, 0.035, 8, 40), kit.toon(P.accent));
    add(edge, x, y, 0.34); [back, clad, core, edge].forEach(o => o.scale.setScalar(scale));
    return { back, clad, core, edge };
  };
  const ray = (pts, color = P.highlight) => line(pts.map(([x,y]) => [x,y,0.5]), color, 0.04);
  const lineDot = (pts, duration = 4, offset = 0, radius = 0.13) => {
    const dot = marker(P.highlight, pts[0][0], pts[0][1], radius);
    updates.push(t => {
      const q = (((t / duration + offset) % 1) + 1) % 1 * (pts.length - 1);
      const i = Math.min(pts.length - 2, Math.floor(q)), u = q - i;
      dot.position.x = pts[i][0] * (1-u) + pts[i+1][0] * u;
      dot.position.y = pts[i][1] * (1-u) + pts[i+1][1] * u;
    });
    return dot;
  };

  if (id === 'route') {
    box(1.2, 1.8, 0.15, P.grass, -2, 2); box(1.2, 1.8, 0.15, P.grass, 2, 2);
    const path = [[-1.7,2],[-0.9,1.75],[0,1.55],[0.9,1.75],[1.7,2]];
    ray(path, P.ink); lineDot(path, 5); label('THEO DẤU TÍN HIỆU', 'map');
    const f = fiber(0, 0.7, 0.55);
    updates.push(t => { f.group.visible = t >= kit.beat('cutaway'); });
  } else if (id === 'core') {
    crossSection(0, 2.2, 1.15); const f = fiber(0, 0.45, 0.62); pulseTrain(0.45);
    label('SỢI QUANG', 'fibers'); label('LÕI', 'core', 1240);
    updates.push(t => { f.group.rotation.y = Math.sin(t * 0.3) * 0.18; });
  } else if (id === 'layers') {
    crossSection(-0.75, 2.2, 0.9); const f = fiber(0.7, 0.65, 0.65);
    const tx = terminal(1.55, 2.3, 0.42); pulseTrain(0.65);
    label('VỎ BẢO VỆ', 'sheath'); label('LỚP BỌC QUANG', 'guide'); label('ĐẦU PHÁT', 'sender');
    updates.push(t => { tx.group.visible = t >= kit.beat('sender'); f.update(t); });
  } else if (id === 'encode' || id === 'read') {
    const receiving = id === 'read';
    terminal(0, 2.2, 0.65, receiving ? 'receive' : 'transmit');
    const p = packet(receiving ? 1.5 : -1.5, 2.3, 2);
    const lights = [pulse(1.15, 1.2, 0.43, { length: 1 }), pulse(1.7, 1.2, 0.43, { length: 1 })];
    if (receiving) { lights.forEach(a => { a.group.position.x *= -1; }); }
    updates.push(t => { p.update(t, { pulse: 0.5 }); lights[0].update(t, { level: 1, speed: 0 }); lights[1].update(t, { level: 0.25, speed: 0 }); });
    if (receiving) {
      label('ĐỌC LẠI DỮ LIỆU', 'decode'); label('VÍ DỤ HAI MỨC', 'example', 1240);
      move(p.group, 0.7, 1.9, 2.3, 3);
    } else {
      label('MÃ HÓA', 'encode'); label('1  ·  0', 'bits', 1180); label('CAO  ·  THẤP', 'levels', 1240);
      updates.push(t => { const reverse = t >= kit.beat('reorder'); lights[0].update(t, { level: reverse ? 0.25 : 1, speed: 0 }); lights[1].update(t, { level: reverse ? 1 : 0.25, speed: 0 }); });
      move(p.group, -2, -0.8, 2.3, 3);
    }
  } else if (id === 'boundary') {
    const f = fiber(0, 2.1, 1.0); pulseTrain(2.1);
    label('RANH GIỚI', 'boundary'); label('LÕI: CHIẾT SUẤT CAO HƠN', 'index', 1240);
    updates.push(t => f.update(t));
  } else if (id === 'angle' || id === 'reflect') {
    box(4.2, 1.3, 0.1, P.shade, 0, 1.55, -0.1); box(4.2, 1.2, 0.1, P.card, 0, 2.8, -0.1);
    ray([[-2,2.2],[2,2.2]], P.accent); ray([[0,1.2],[0,3.1]], P.ink);
    const incoming = id === 'reflect' ? [[-0.65,1.25],[0,2.2]] : [[-1.7,1.25],[0,2.2]];
    const inRay = ray(incoming), inDot = lineDot(incoming, 2.5);
    if (id === 'angle') {
      const arc = new T.Mesh(new T.TorusGeometry(0.48, 0.025, 6, 32, Math.PI / 3), kit.toon(P.good));
      arc.rotation.z = Math.PI * 1.17; add(arc, 0, 2.2, 0.6);
      label('PHÁP TUYẾN', 'normal'); label('GÓC TỚI', 'incidence', 1235);
      updates.push(t => { arc.visible = t >= kit.beat('incidence'); });
    } else {
      const transmitted = ray([[0,2.2],[0.95,3.25]]), reflectedLow = ray([[0,2.2],[0.65,1.25]]);
      const steep = [[-1.7,1.25],[0,2.2]], highRay = ray(steep), highDot = lineDot(steep, 2.5);
      const reflected = ray([[0,2.2],[1.7,1.25]]);
      label('GÓC NHỎ HƠN', 'below'); label('PHẢN XẠ TOÀN PHẦN', 'reflection', 1235);
      updates.push(t => { const above = t >= kit.beat('above'); transmitted.visible = reflectedLow.visible = inRay.visible = inDot.visible = !above; highRay.visible = highDot.visible = reflected.visible = above; });
    }
  } else if (id === 'guide') {
    const f = fiber(0, 2.2); const pts = [[-1.8,2.2],[-1.1,2.38],[-0.4,2.04],[0.3,2.38],[1,2.04],[1.8,2.38]];
    ray(pts); lineDot(pts, 3); label('PHẢN XẠ', 'bounce'); label('UỐN NHẸ', 'bend', 1220);
    updates.push(t => f.update(t, { bent: t >= kit.beat('bend') }));
  } else if (id === 'loss') {
    fiber(0, 2.1); const p = pulseTrain(2.1);
    const bar = box(2.8, 0.2, 0.1, P.highlight, 0, 1.15, 0.4);
    label('SUY HAO', 'attenuate');
    updates.push(t => { const progress = t < kit.beat('attenuate') ? 0 : Math.min(1, (t-kit.beat('attenuate'))/3); bar.scale.x = 1-0.7*progress; p.update(t, { level: 1-0.7*progress }); });
  } else if (id === 'boost') {
    fiber(0, 2.1); box(0.95, 1.1, 0.75, P.card, 0, 2.1, 0.2);
    const left = pulse(-1.2, 2.1, 0.55, { count: 2, length: 1.5 });
    const right = pulse(1.2, 2.1, 0.55, { count: 2, length: 1.5 });
    box(0.35, 0.3, 0.1, P.highlight, -1.4, 1.1); box(0.35, 0.8, 0.1, P.highlight, 1.4, 1.35);
    updates.push(t => { left.update(t, { level: 0.3 }); right.update(t, { level: t >= kit.beat('boost') ? 1 : 0.3 }); });
    label('BỘ LẶP QUANG', 'repeaters'); label('NÂNG CÔNG SUẤT', 'boost', 1235);
  } else if (id === 'receive') {
    terminal(0, 2.1, 0.65, 'receive'); const p = packet(1.4, 2.1, 2);
    const a = pulse(-1.3, 2.1, 0.6, { count: 2, length: 1.8 });
    updates.push(t => { a.update(t); p.update(t, { pulse: 0.5 }); }); move(p.group, 0.9, 2, 2.1, 3);
    label('QUANG → ĐIỆN', 'convert'); label('MẠNG ĐẤT LIỀN', 'onward', 1235);
  } else if (id === 'grace') {
    box(1, 1.6, 0.15, P.grass, -1.9, 2.2); box(0.8, 1.4, 0.15, P.grass, 1.85, 2.2);
    const path = [[-1.8,2.1],[-0.5,2.15],[0.5,2.3],[1.8,2.75]];
    const branch = [[0.5,2.3],[1.3,1.9],[1.8,1.7]];
    ray(path, P.ink); ray(branch, P.ink); lineDot(path, 4); lineDot(branch, 4, 0.35);
    label('GRACE HOPPER', 'route'); label('HOA KỲ  ·  ANH  ·  TÂY BAN NHA', 'landings', 1235);
  } else if (id === 'pairs') {
    crossSection(-1.35, 2.2, 0.95);
    const sheathMat = kit.toon(P.ink);
    sheathMat.transparent = true;
    sheathMat.opacity = 0.25;
    sheathMat.side = T.DoubleSide;
    const sheath = new T.Mesh(new T.CylinderGeometry(1.05, 1.05, 2.5, 24, 1, true), sheathMat);
    sheath.rotation.z = Math.PI / 2;
    add(sheath, 0.65, 2.2, -0.15);
    const streamCount = 8;
    for (let i = 0; i < streamCount; i++) {
      const yy = 1.38 + i * 0.23;
      const path = [[-0.55, yy], [1.85, yy]];
      ray(path, P.shade);
      lineDot(path, 2.4, i / streamCount, 0.055);
    }
    for (let i = 0; i < 16; i++) {
      const a = i * Math.PI * 2 / 16;
      for (const r of [0.5, 0.65]) {
        const s = marker(P.highlight, -1.35 + Math.cos(a) * r, 2.2 + Math.sin(a) * r, 0.04);
        s.position.z = 0.7;
        updates.push(t => { s.scale.setScalar(0.65 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2 + i))); });
      }
    }
    label('16 CẶP SỢI', 'pairs'); label('NHIỀU LUỒNG SONG SONG', 'capacity', 1235);
  } else if (id === 'mux' || id === 'demux') {
    const split = id === 'demux';
    terminal(split ? 0.4 : -0.4, 2.2, 0.45, split ? 'receive' : 'transmit');
    const colors = ['#18191E', '#3B5B6D', '#6E5A4F'];
    const freqs = [2.2, 3.8, 6.0];
    for (let i = 0; i < 3; i++) {
      const yy = 1.45 + i * 0.75;
      const pts = [];
      const steps = 28;
      for (let s = 0; s <= steps; s++) {
        const u = s / steps;
        const x = split ? (0.4 + u * 1.8) : (-2.2 + u * 1.8);
        const env = split ? u : (1 - u);
        const yBase = split ? (2.2 * (1 - u) + yy * u) : (yy * (1 - u) + 2.2 * u);
        const wave = Math.sin(u * Math.PI * freqs[i]) * 0.14 * env;
        pts.push([x, yBase + wave]);
      }
      const shared = split ? [[-2.2, 2.2], [0.4, 2.2]] : [[-0.4, 2.2], [2.2, 2.2]];
      const fullPath = split ? [...shared, ...pts] : [...pts, ...shared];
      ray(pts, colors[i]);
      if (i === 0) ray(shared, P.shade);
      lineDot(fullPath, 3.4, i / 3);
    }
    if (!split) {
      const rulerGroup = new T.Group();
      const bar = new T.Mesh(new T.BoxGeometry(0.75, 0.045, 0.05), kit.toon(P.ink));
      const t1 = new T.Mesh(new T.BoxGeometry(0.045, 0.22, 0.05), kit.toon(P.ink));
      const t2 = t1.clone();
      t1.position.x = -0.375; t2.position.x = 0.375;
      rulerGroup.add(bar, t1, t2);
      add(rulerGroup, -1.35, 3.25, 0.75);
      updates.push(t => { rulerGroup.visible = t >= kit.beat('wavelength'); });
    }
    label(split ? 'TÁCH KÊNH' : 'GHÉP KÊNH', split ? 'split' : 'mux');
    label(split ? 'CHUNG MỘT SỢI' : 'BƯỚC SÓNG KHÁC NHAU', split ? 'shared' : 'wavelength', 1235);
  } else if (id === 'conductor') {
    const cs = crossSection(0, 2.35, 1.05);
    const wire = new T.Mesh(new T.TorusGeometry(0.92, 0.1, 8, 48), kit.toon('#3B5B6D'));
    add(wire, 0, 2.35, 0.6);
    const coreDot = marker(P.highlight, 0, 2.35, 0.11);
    const wireDot = marker('#18191E', 0.92, 2.35, 0.09);
    updates.push(t => {
      const sep = t < kit.beat('conductor') ? 0 : Math.min(1, (t - kit.beat('conductor')) / 1.5);
      wire.position.z = 0.6 + sep * 0.55;
      cs.core.position.z = 0.22 - sep * 0.2;
      cs.edge.position.z = 0.34 - sep * 0.2;
      wire.rotation.y = Math.sin(t * 0.6) * 0.35;
      const a = t * 1.8;
      wireDot.position.set(Math.cos(a) * 0.92, 2.35 + Math.sin(a) * 0.92, wire.position.z + 0.12);
      coreDot.position.set(Math.cos(-a) * 0.2, 2.35 + Math.sin(-a) * 0.2, 0.75);
    });
    label('DẪN ĐIỆN', 'electric'); label('SỢI QUANG + DÂY DẪN', 'conductor', 1235);
  } else if (id === 'power') {
    fiber(0, 2.4, 0.95);
    const repMat = kit.toon(P.card);
    repMat.transparent = true;
    repMat.opacity = 0.65;
    const repBox = new T.Mesh(new T.BoxGeometry(0.8, 0.85, 0.55), repMat);
    add(repBox, 0, 2.38, -0.05);
    const signal = pulseTrain(2.4);
    for (let d = 0; d < 8; d++) {
      const dash = new T.Mesh(new T.BoxGeometry(0.16, 0.055, 0.055), kit.toon('#3B5B6D'));
      add(dash, -2.0 + d * 0.26, 1.45, 0.5);
    }
    for (let v = 0; v < 2; v++) {
      const vDash = new T.Mesh(new T.BoxGeometry(0.055, 0.16, 0.055), kit.toon('#3B5B6D'));
      add(vDash, 0, 1.56 + v * 0.24, 0.5);
    }
    const powerDot = marker('#18191E', -2, 1.45, 0.09);
    const feedPts = [[-2, 1.45], [0, 1.45], [0, 1.96]];
    updates.push(t => {
      signal.update(t);
      const q = ((t / 3) % 1) * (feedPts.length - 1);
      const idx = Math.min(1, Math.floor(q)), u = q - idx;
      powerDot.position.x = feedPts[idx][0] * (1 - u) + feedPts[idx + 1][0] * u;
      powerDot.position.y = feedPts[idx][1] * (1 - u) + feedPts[idx + 1][1] * u;
    });
    label('ĐIỆN NUÔI BỘ LẶP', 'feed'); label('DỮ LIỆU BẰNG ÁNH SÁNG', 'light', 1235);
  } else if (id === 'payoff') {
    box(0.7, 1.4, 0.2, P.grass, -2.1, 2.2); box(0.7, 1.4, 0.2, P.grass, 2.1, 2.2);
    fiber(0, 1.4, 0.9); pulseTrain(1.4); terminal(1.6, 2.2, 0.3, 'receive');
    const phone = smartphone(kit); add(phone.group, 0, 2.5, 0.5, 1.3); phone.group.rotation.x = Math.PI/2;
    const texture = kit.canvasTexture(192, 360, (g, w, h) => {
      g.fillStyle = P.card; g.fillRect(0, 0, w, h);
      g.fillStyle = P.good; g.beginPath(); g.arc(w/2, 115, 42, 0, Math.PI*2); g.fill();
      g.fillStyle = P.pill; g.beginPath(); g.arc(w/2, 104, 13, 0, Math.PI*2); g.fill();
      g.beginPath(); g.arc(w/2, 139, 25, Math.PI, 0); g.fill();
      g.fillStyle = P.accent; g.beginPath(); g.arc(w/2, 270, 24, 0, Math.PI*2); g.fill();
    });
    const screen = new T.Mesh(new T.PlaneGeometry(0.46, 0.94), kit.toon(P.card, { map: texture })); screen.rotation.x = -Math.PI/2; screen.position.y = 0.05; phone.group.add(screen);
    label('TÍN HIỆU VƯỢT BIỂN', 'crossing'); label('CUỘC GỌI', 'payoff', 1235);
    updates.push(t => { phone.group.visible = t >= kit.beat('payoff'); phone.update(t); });
  }
  kit.ink(group);
  return { scene, camera, hero: group, update(t) {
    models.forEach(m => m.update(t)); updates.forEach(fn => fn(t));
    kit.setPose(camera, { pos: [Math.sin(t*0.12)*0.12, 2.05, 15 - Math.min(t, 8)*0.025], look: [0, 2, 0], fov: 35 });
  } };
}
