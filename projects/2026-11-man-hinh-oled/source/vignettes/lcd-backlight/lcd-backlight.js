// Illustrative LCD cross-section: backlight, liquid crystal modulator, RGB filters.
export function lcdBacklight(kit, opts = {}) {
  const { THREE } = kit; const group = new THREE.Group(); group.name='lcd-backlight';
  const box=(name,w,h,d,color,x,y,z)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),kit.toon(color));m.name=name;m.position.set(x,y,z);group.add(m);return m;};
  const backlight=box('backlight',2.5,.22,1.6,'#FFF3B0',0,-.5,0);
  const liquid=box('liquid-crystal',2.35,.16,1.45,'#9DCADB',0,-.15,0);
  const filters=['#DD3428','#2D884E','#2D7FF9'].map((color,i)=>box('filter-'+i,.72,.15,1.4,color,(i-1)*.78,.16,0));
  const rays=[]; for(let i=0;i<3;i++) rays.push(box('light-path-'+i,.12,.42,.12,'#FCD53E',(i-1)*.78,-.29,.4));
  kit.ink(group);
  function update(t,state={}) {
    const separation=kit.clamp01(state.exploded ?? opts.exploded ?? 0);
    liquid.position.y=-.15 + separation*.25;
    filters.forEach(f=>{f.position.y=.16+separation*.5;});
    const light=kit.clamp01(state.backlight ?? opts.backlight ?? 1);
    backlight.material.color.set('#FFF3B0').multiplyScalar(.15+.85*light);
    const transmission=kit.clamp01(state.transmission ?? opts.transmission ?? 1);
    rays.forEach(ray=>{ray.scale.y=.08+.92*transmission; ray.visible=light>0;});
  }
  update(0); return {group,hero:[backlight,liquid,...filters],update};
}
