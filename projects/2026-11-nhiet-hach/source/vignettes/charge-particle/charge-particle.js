// Schematic charge carriers and photon: not a microscopic particle simulation.
export function chargeParticle(kit, opts = {}) {
  const { THREE }=kit; const group=new THREE.Group(); group.name='charge-particle';
  const sphere=(name,color,x)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(.24,20,14),kit.toon(color));m.name=name;m.position.x=x;group.add(m);return m;};
  const electron=sphere('electron','#00B4D8',-1); const hole=sphere('hole','#F08A4B',1);
  const bar=(parent,x,y,w,h,color)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,.08),kit.toon(color));m.position.set(x,y,.23);parent.add(m);};
  bar(electron,0,0,.25,.06,'#FFFFFF'); bar(hole,0,0,.25,.06,'#FFFFFF'); bar(hole,0,0,.06,.25,'#FFFFFF');
  const photon=sphere('photon','#DD3428',0); photon.scale.setScalar(0);
  const seats=[]; for(let i=0;i<5;i++){const s=new THREE.Mesh(new THREE.BoxGeometry(.32,.12,.38),kit.toon('#ADBAC5'));s.name='seat-'+i;s.position.set((i-2)*.52,-.8,0);group.add(s);seats.push(s);}
  const occupants=Array.from({length:4},(_,i)=>{const o=sphere(`seat-electron-${i}`,'#00B4D8',0);o.position.y=-.62;o.scale.setScalar(.4);return o;});
  const colors={red:'#DD3428',green:'#2D884E',blue:'#2D7FF9'}; kit.ink(group);
  function update(t,state={}) {
    const p=kit.clamp01(state.recombine ?? opts.recombine ?? 0);
    electron.position.x=-1+p; hole.position.x=1-p;
    photon.material.color.set(colors[state.color ?? opts.color] || colors.red);
    photon.scale.setScalar(kit.clamp01(state.photon ?? opts.photon ?? 0));
    photon.position.set(0,(state.photon ?? opts.photon ?? 0)*.7,0);
    const shift=kit.clamp01(state.seatShift ?? opts.seatShift ?? 0)*4;
    occupants.forEach((o,i)=>{o.position.x=(i-1)*.52-.52*kit.clamp01(shift-i);});
    seats.forEach((s,i)=>{s.material.color.set(i===Math.floor(shift) ? '#F08A4B' : '#ADBAC5');});
  }
  update(0); return {group,hero:[electron,hole,photon],update};
}
