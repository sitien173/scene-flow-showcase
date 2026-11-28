import { smartphone } from './smartphone/smartphone.js';
import { oledStack } from './oled-stack/oled-stack.js';
import { subpixelGrid } from './subpixel-grid/subpixel-grid.js';
import { lcdBacklight } from './lcd-backlight/lcd-backlight.js';
import { chargeParticle } from './charge-particle/charge-particle.js';

const definitions = {
  h1: { models:['phone'], labels:[['paradox','TỰ TẮT?'],['moon','VẦNG TRĂNG']] },
  h2: { models:['phone','grid'], labels:[['dot','MỘT CHẤM SÁNG'],['zoom','PHÓNG TO']] },
  r1: { models:['grid'], labels:[['pixel','ĐIỂM ẢNH'],['rgb','ĐỎ · XANH LÁ · XANH DƯƠNG'],['lamps','TỰ PHÁT SÁNG']] },
  r2: { models:['grid','stack'], labels:[['no_bl','KHÔNG CẦN ĐÈN NỀN'],['organic','VẬT LIỆU HỮU CƠ'],['cutaway','CẮT NGANG']] },
  m1: { models:['stack'], labels:[['electrodes','HAI ĐIỆN CỰC'],['layers','CÁC LỚP HỮU CƠ'],['path','LỚP DẪN → PHÁT SÁNG']] },
  m2: { models:['stack','charge'], labels:[['electron','ELECTRON (−)'],['hole','LỖ TRỐNG (+)']] },
  m3: { models:['charge'], labels:[['row','CHỖ TRỐNG'],['shift','ELECTRON ĐỔI CHỖ'],['opposite','CHIỀU NGƯỢC LẠI']] },
  m4: { models:['stack','charge'], labels:[['meet','KẾT HỢP'],['excited','TRẠNG THÁI GIÀU NĂNG LƯỢNG'],['emit','PHÁT ÁNH SÁNG']] },
  m5: { models:['stack','charge'], labels:[['exit','ÁNH SÁNG ĐI RA'],['rgb_emit','ĐỎ · XANH LÁ · XANH DƯƠNG']] },
  m6: { models:['stack','charge'], labels:[['valve','VAN DÒNG ĐIỆN'],['stronger','DÒNG LỚN → SÁNG HƠN'],['dim_red','GIẢM SÁNG, KHÔNG ĐỔI MÀU']] },
  m7: { models:['grid'], labels:[['pullback','CÁC ĐIỂM CON'],['merge','KHÔNG THẤY TÁCH RỜI'],['blend','MÀU PHA']] },
  m8: { models:['grid'], labels:[['yellow','ĐỎ + XANH LÁ = VÀNG'],['orange','GIẢM XANH LÁ → CAM'],['white','BA ÁNH SÁNG → TRẮNG']] },
  m9: { models:['grid'], labels:[['indep','MỨC SÁNG RIÊNG'],['edge','MÉP TRĂNG · TRỜI TỐI']] },
  a1: { models:['phone'], labels:[['toggle','GIAO DIỆN TỐI'],['white_bg','NỀN TRẮNG'],['black_bg','NỀN ĐEN']] },
  a2: { models:['phone'], labels:[['gray','XÁM ĐẬM VẪN PHÁT SÁNG'],['less_pwr','CÓ THỂ GIẢM ĐIỆN'],['depends','TÙY NỘI DUNG VÀ ĐỘ SÁNG']] },
  a3: { models:['stack','lcd'], labels:[['side_by_side','OLED · LCD'],['backlight','ĐÈN NỀN'],['filters','TINH THỂ LỎNG + BỘ LỌC'],['lcd_black','ĐÈN NỀN KHÔNG NHẤT THIẾT TẮT']] },
  e1: { models:['phone','grid'], labels:[['sky_px','ĐIỂM ẢNH NỀN TRỜI'],['stop_cur','NGỪNG CẤP DÒNG'],['moon_lit','TRĂNG VẪN ĐƯỢC CẤP DÒNG']] },
  e2: { models:['phone'], labels:[['reflect','PHẢN CHIẾU MẶT KÍNH'],['payoff','KHÔNG TỰ PHÁT SÁNG']] },
};

export async function compose(kit, id) {
  const def = definitions[id];
  const world = await kit.world('oled_lab', k => ({ scene: k.stage({ surroundings: false }) }));
  const camera = kit.camera({ pos:[0, 6.7, 10.5], look:[0, 0, 0], fov:35 });
  const factories = { phone:smartphone, grid:subpixelGrid, stack:oledStack, lcd:lcdBacklight, charge:chargeParticle };
  const objects = {};
  def.models.forEach((name, i) => {
    const object = factories[name](kit, {});
    objects[name] = object;
    kit.group.add(object.group);
    if (name === 'phone') object.group.scale.setScalar(3.1);
    if (def.models.length > 1) {
      object.group.position.x = (i - (def.models.length - 1) / 2) * (id === 'a3' || id === 'e1' ? 1.35 : 1.65);
      object.group.scale.multiplyScalar(id === 'e1' ? .48 : id === 'a3' ? .5 : .68);
    }
    if (id === 'h2') object.group.position.x = 0;
    // Local cutaway coordinates extend below zero; raise them above the stage.
    if (name === 'stack') object.group.position.y = 1.3 * object.group.scale.y;
    if (name === 'lcd') object.group.position.y = 1.1 * object.group.scale.y;
    if (name === 'charge') object.group.position.y = 1.05 * object.group.scale.y;
    if (name === 'charge' && ['m2','m4','m5','m6'].includes(id)) {
      object.group.position.x = 0;
      object.group.position.y = 1.55;
      object.group.position.z = .9;
    }
    if (name === 'stack' && ['m2','m4','m5','m6'].includes(id)) object.group.position.x = 0;
  });
  // In the reveal, the comparison backlight is explicitly rejected before
  // a current marker enters the OLED's own emissive layer.
  const rejectedBacklight = id === 'r2' ? lcdBacklight(kit, {}) : null;
  const backlightCross = id === 'r2' ? new kit.THREE.Group() : null;
  const currentPulse = id === 'r2' ? new kit.THREE.Mesh(new kit.THREE.SphereGeometry(.15,16,12), kit.toon('#FCD53E')) : null;
  if (rejectedBacklight) {
    rejectedBacklight.group.scale.setScalar(.45);
    rejectedBacklight.group.position.set(-1.0,.65,0);
    rejectedBacklight.update(0,{exploded:.4,backlight:1});
    kit.group.add(rejectedBacklight.group);
    for (const angle of [-Math.PI/4,Math.PI/4]) {
      const bar = new kit.THREE.Mesh(new kit.THREE.BoxGeometry(1.25,.12,.12),kit.toon('#DD3428'));
      bar.rotation.z = angle; backlightCross.add(bar);
    }
    backlightCross.position.set(-1,1.35,.6);
    kit.group.add(backlightCross,currentPulse);
    objects.stack.group.position.x = .6;
    objects.grid.group.position.x = 0;
  }
  const rgbEmitters = id === 'm5' ? ['red','green','blue'].map((color,i) => {
    const emitter = oledStack(kit,{color});
    emitter.group.scale.setScalar(.36);
    emitter.group.position.set((i-1)*1.12,.55,0);
    emitter.update(0,{color,exploded:.5,valve:.8});
    kit.group.add(emitter.group);
    return emitter;
  }) : [];
  const photonColors = ['#DD3428', '#2D884E', '#2D7FF9'];
  const photons = id === 'm5' ? photonColors.map((color, i) => {
    const mesh = new kit.THREE.Mesh(new kit.THREE.SphereGeometry(.22, 16, 12), kit.toon(color));
    mesh.position.set((i - 1) * 1.12, 1.0, 0);
    kit.group.add(mesh);
    return mesh;
  }) : [];
  const result = id === 'm8' ? new kit.THREE.Mesh(new kit.THREE.BoxGeometry(.9,.18,.9), kit.toon('#FCD53E')) : null;
  if (result) { result.position.set(0,.5,-1.8); kit.group.add(result); }
  const blend = id === 'm7' ? new kit.THREE.Mesh(new kit.THREE.BoxGeometry(1.15,.12,.8), kit.toon('#FAFCFB')) : null;
  if (blend) { blend.position.set(0,.35,-1.5); kit.group.add(blend); }
  const blendRays = id === 'm7' ? photonColors.map((color,i) => {
    const ray = new kit.THREE.Mesh(new kit.THREE.CircleGeometry(.48,32), new kit.THREE.MeshBasicMaterial({color, transparent:true, opacity:.7, blending:kit.THREE.AdditiveBlending, depthWrite:false, side:kit.THREE.DoubleSide}));
    ray.name = `blend-ray-${i}`;
    ray.rotation.x = -Math.PI/2;
    kit.group.add(ray);
    return ray;
  }) : [];
  const meter = id === 'a2' ? new kit.THREE.Mesh(new kit.THREE.BoxGeometry(.25,1,.25), kit.toon('#FCD53E')) : null;
  if (meter) { meter.position.set(1.8,.5,0); kit.group.add(meter); }
  // A travelling marker makes the causal input visible in the otherwise
  // schematic layer, valve, switch, LCD and reflection explanations.
  const markerColor = id === 'e2' ? '#FAFCFB' : '#FCD53E';
  const marker = ['m1','m6','a1','a3','e2'].includes(id)
    ? new kit.THREE.Mesh(new kit.THREE.SphereGeometry(.10,16,12),kit.toon(markerColor)) : null;
  if (marker) kit.group.add(marker);
  const beats = Object.fromEntries(def.labels.map(([name]) => [name, kit.beat(name)]));
  const progress = (t, name, duration = 1) => kit.clamp01((t - beats[name]) / duration);
  // Overlay nodes are created once, not on every render or timeline seek.
  def.labels.forEach(([name, text], i) => {
    const next = def.labels[i+1];
    const hold = next ? Math.max(.15, beats[next[0]] - beats[name] - .1) : 1.5;
    kit.label({ text, at:beats[name], hold, y:540, size:54 });
  });
  return {
    scene:world.scene, camera, hero:Object.values(objects).map(o => o.group),
    update(t) {
      const firstBeat = def.labels[0][0];
      const cameraMove = kit.ease(progress(t, firstBeat, 3), 'inOut');
      const pull = id === 'm7' || id === 'e2';
      const lateral = ['r1','m1','m3','m6','m8','a3'].includes(id) ? .55 : 0;
      const cutaway = ['r2','m1','m2','m3','m4','m5','m6','a3'].includes(id);
      kit.setPose(camera, { pos:[lateral * cameraMove, (cutaway ? 4.2 : 6.7) + (pull ? .6 : -.35) * cameraMove, 10.5 + (pull ? 1.0 : -.55) * cameraMove], look:[0,cutaway ? .65 : 0,0], fov:35 });
      if (id === 'h2') {
        const macroDive = kit.ease(progress(t, 'zoom', 2.5), 'inOut');
        kit.setPose(camera, {pos:[0,6.7-2.3*macroDive,10.5-3.5*macroDive],look:[0,0,0],fov:35});
      }
      Object.entries(objects).forEach(([name, object]) => {
        object.group.visible = !(id === 'h2' && name === 'grid' && t < beats.zoom) &&
          !(id === 'r2' && name === 'stack' && t < beats.organic);
      });
      if (id === 'h2') {
        const macroDive = progress(t, 'zoom', 2.5);
        // Grow the grid directly out of the phone's screen: both surfaces
        // coexist throughout the push, so there is no mid-dive model swap.
        objects.grid.group.visible = macroDive > 0;
        objects.grid.group.position.y = .16;
        objects.grid.group.scale.setScalar(.06 + .77 * kit.ease(macroDive, 'inOut'));
      }
      if (id === 'r2') {
        objects.grid.group.visible = t < beats.no_bl;
        rejectedBacklight.group.visible = t >= beats.no_bl && t < beats.organic;
        backlightCross.visible = rejectedBacklight.group.visible;
        currentPulse.visible = t >= beats.organic;
        const travel = progress(t,'organic',2);
        currentPulse.position.set(1.7-1.1*travel,.7,1.1-.75*travel);
      }
      if (id === 'm5') {
        const showRGB = t >= beats.rgb_emit;
        objects.stack.group.visible = !showRGB;
        objects.charge.group.visible = !showRGB;
        rgbEmitters.forEach(emitter => { emitter.group.visible = showRGB; });
      }
      if (objects.phone) {
        let screen = 'moon';
        if (id === 'a1') screen = t >= beats.black_bg ? 'dark' : 'light';
        if (id === 'a2') screen = 'gray';
        if (id === 'e2' && t >= beats.reflect && t < beats.payoff) screen = 'reflection';
        objects.phone.update(t, { screen });
      }
      if (objects.grid) {
        let levels = [1,1,1], offPixels = [];
        if (id === 'r1') {
          if (t < beats.rgb) levels = [.12,.12,.12];
          else if (t >= beats.lamps) {
            const p = progress(t,'lamps',1.2);
            levels = [1, p >= .33 ? 1 : .12, p >= .66 ? 1 : .12];
          }
        }
        if (id === 'm8') levels = t >= beats.white ? [1,1,1] : t >= beats.orange ? [1,.35,0] : [1,1,0];
        if ((id === 'm9' && t >= beats.edge) || (id === 'e1' && t >= beats.stop_cur)) offPixels = [2,5,8];
        objects.grid.update(t, { levels, offPixels });
        if (id === 'm7') objects.grid.group.scale.setScalar(1 - .5 * progress(t, 'merge', 2));
      }
      if (objects.stack) {
        const exploded = id === 'm1' ? progress(t,'layers') : id === 'a3' ? .7 : .25;
        const valve = id === 'm6' ? (t >= beats.dim_red ? .2 : t >= beats.stronger ? 1 : .45) : .6;
        objects.stack.update(t, { exploded, valve });
      }
      if (objects.lcd) objects.lcd.update(t, { exploded:.65, backlight:1, transmission: t >= beats.lcd_black ? .05 : 1 });
      if (objects.charge) {
        const charge = objects.charge.group;
        const seats = ['seat-0','seat-1','seat-2','seat-3','seat-4',...Array.from({length:4},(_,i)=>`seat-electron-${i}`)];
        seats.forEach(name => { const part = charge.getObjectByName(name); if (part) part.visible = id === 'm3'; });
        ['electron','hole'].forEach(name => { const part = charge.getObjectByName(name); if (part) part.visible = id !== 'm3'; });
        if (id === 'm2') {
          const electron = charge.getObjectByName('electron'), hole = charge.getObjectByName('hole');
          if (electron) electron.visible = t >= beats.electron;
          if (hole) hole.visible = t >= beats.hole;
        }
        const recombine = id === 'm4' ? progress(t,'meet') : 0;
        const photon = id === 'm4' ? progress(t,'emit') : id === 'm5' ? progress(t,'exit') : id === 'm6' ? (t >= beats.dim_red ? .3 : t >= beats.stronger ? 1 : .5) : 0;
        const seatShift = id === 'm3' ? progress(t,'row', Math.max(3, beats.opposite - beats.row + 2)) : 0;
        objects.charge.update(t, { recombine, photon, seatShift });
        if (id === 'm2') {
          const electron = charge.getObjectByName('electron'), hole = charge.getObjectByName('hole');
          if (electron) electron.position.x = -1.8 + .8 * kit.ease(progress(t, 'electron', 1.5), 'inOut');
          if (hole) hole.position.x = 1.8 - .8 * kit.ease(progress(t, 'hole', 1.5), 'inOut');
        }
        if (id === 'm4') {
          const electron = charge.getObjectByName('electron'), hole = charge.getObjectByName('hole');
          if (electron) electron.visible = t < beats.emit;
          if (hole) hole.visible = t < beats.emit;
        }
      }
      photons.forEach((photon, i) => {
        photon.visible = t >= beats.rgb_emit;
        photon.position.y = 1.0 + .8 * progress(t, 'rgb_emit', 2);
      });
      if (result) {
        result.visible = t >= beats.yellow;
        result.material.color.set(t >= beats.white ? '#FAFCFB' : t >= beats.orange ? '#F08A4B' : '#FCD53E');
      }
      if (blend) blend.visible = t >= beats.blend;
      blendRays.forEach((ray,i) => {
        ray.visible = t >= beats.merge;
        ray.position.set((i-1)*.8*(1-progress(t,'merge',Math.max(.1,beats.blend-beats.merge))),.55,-1.5);
      });
      if (meter) {
        const level = t >= beats.less_pwr ? .45 : .85;
        meter.scale.y = level;
        meter.position.y = level / 2;
      }
      if (marker) {
        if (id === 'm1') {
          const p = progress(t,'path',2);
          marker.visible = t >= beats.path;
          marker.position.set(-.8 + 1.6*p, .72, .9);
        } else if (id === 'm6') {
          const p = progress(t,'valve',2);
          marker.visible = t >= beats.valve;
          marker.position.set(1.55-1.3*p,.65,.9);
        } else if (id === 'a1') {
          const p = progress(t,'toggle',1);
          marker.visible = t >= beats.toggle && t < beats.white_bg;
          marker.position.set(1.4-p, .27, .55);
        } else if (id === 'a3') {
          const p = progress(t,'backlight',4);
          marker.visible = t >= beats.backlight && t < beats.lcd_black;
          marker.position.set(.67,.45+.85*p,.55);
        } else {
          const p = progress(t,'reflect',1.5);
          marker.visible = t >= beats.reflect && t < beats.payoff;
          marker.position.set(-1.2+1.2*p,1.5-1.25*p,.25);
        }
      }
    },
  };
}
