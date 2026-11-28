// Direct RGB subpixels separated by pixel-definition barriers.
export function subpixelGrid(kit, opts = {}) {
  const { THREE } = kit; const group = new THREE.Group(); group.name = 'subpixel-grid';
  const colors = ['#DD3428', '#2D884E', '#2D7FF9']; const cells = [];
  const box = (w,h,d,color,x,y,z,name) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), kit.toon(color)); m.position.set(x,y,z); m.name=name; group.add(m); return m; };
  box(3.5,.13,2.35,'#18191E',0,-.1,0,'substrate');
  for (let row=0;row<3;row++) for (let col=0;col<3;col++) {
    const pixel=[];
    for(let c=0;c<3;c++) pixel.push(box(.26,.10,.58,colors[c], (col-1)*1.1+(c-1)*.3,0,(row-1)*.72,`pixel-${row}-${col}-${c}`));
    cells.push(pixel);
  }
  kit.ink(group);
  function update(t,state={}) {
    const levels = state.levels ?? opts.levels ?? [1,1,1];
    cells.forEach((pixel,i) => pixel.forEach((m,c) => {
      const off = (state.offPixels ?? opts.offPixels ?? []).includes(i);
      const level = off ? 0 : kit.clamp01(levels[c] ?? 0);
      m.material.color.set(colors[c]).multiplyScalar(level);
      m.scale.y = .25 + .75*level;
    }));
  }
  update(0); return {group, hero: cells.flat(), update};
}
