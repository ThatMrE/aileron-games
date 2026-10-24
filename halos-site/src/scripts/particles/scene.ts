// The hero's living object: ~9,000 soft particles that settle into the HALOS
// symbol, then morph ring → vial → wheel → drift as the hero scrolls.
// All interpolation happens in the vertex shader from one uMorph value.
// The cursor (or a finger) parts the particles where it passes and the object
// tilts gently toward it.
import {
  BufferAttribute,
  BufferGeometry,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';
import { COUNT, cloud, colors, drift, ringBar, vial, wheel } from './shapes';

const vertex = /* glsl */ `
  attribute vec3 aCloud;
  attribute vec3 aRing;
  attribute vec3 aVial;
  attribute vec3 aWheel;
  attribute vec3 aDrift;
  attribute vec3 aColor;
  attribute float aSize;
  attribute float aSeed;
  uniform float uMorph;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform vec2 uPointer;   // cursor on the z = 0 plane, world units
  uniform float uPull;     // 0 to 1, eased in while the cursor is near
  uniform float uRadius;   // reach of the parting, world units
  varying vec3 vColor;
  varying float vAlpha;

  float seg(float m, float i) {
    // Each particle starts its move a little early or late, so shapes flow.
    float t = clamp(m - i + (aSeed - 0.5) * 0.35, 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  void main() {
    vec3 p = aCloud;
    p = mix(p, aRing, seg(uMorph, 0.0));
    p = mix(p, aVial, seg(uMorph, 1.0));
    p = mix(p, aWheel, seg(uMorph, 2.0));
    p = mix(p, aDrift, seg(uMorph, 3.0));

    // Breathing and a slow individual shimmer.
    float t = uTime;
    p *= 1.0 + 0.012 * sin(t * 1.1);
    p += 0.018 * vec3(sin(t * 0.7 + aSeed * 40.0), cos(t * 0.6 + aSeed * 31.0), sin(t * 0.5 + aSeed * 17.0));

    // Part around the cursor: push out with a slight swirl and lift toward the
    // viewer, falling off smoothly with distance.
    vec4 world = modelMatrix * vec4(p, 1.0);
    vec2 d = world.xy - uPointer;
    float dist = length(d);
    float fall = exp(-(dist * dist) / (uRadius * uRadius)) * uPull;
    vec2 dir = d / max(dist, 1e-4);
    world.xy += (dir * 0.55 + vec2(-dir.y, dir.x) * 0.16) * fall * (0.7 + aSeed * 0.6);
    world.z += fall * 0.25;

    gl_Position = projectionMatrix * viewMatrix * world;
    gl_PointSize = aSize * uPixelRatio * uScale * (1.0 + fall * 0.5);
    vColor = aColor;
    // Released particles fade out as the next section arrives.
    vAlpha = 1.0 - smoothstep(3.2, 4.0, uMorph);
  }
`;

const fragment = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a * vAlpha * uOpacity);
  }
`;

export interface Halo { destroy(): void; setMorph(m: number | null): void }

export function mountHalo(host: HTMLElement, progress: () => number): Halo | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power', failIfMajorPerformanceCaveat: true });
  } catch {
    return null;
  }
  // Software WebGL (no usable GPU) would stall the page for seconds; keep the
  // static ring instead.
  const gl = renderer.getContext();
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
  if (/swiftshader|llvmpipe|softpipe|software/i.test(name)) {
    renderer.dispose();
    return null;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = 'halo__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0, 8.2);

  const geo = new BufferGeometry();
  const { col, size, seed } = colors();
  const start = cloud();
  geo.setAttribute('position', new BufferAttribute(start, 3));
  geo.setAttribute('aCloud', new BufferAttribute(start, 3));
  geo.setAttribute('aRing', new BufferAttribute(ringBar(), 3));
  geo.setAttribute('aVial', new BufferAttribute(vial(), 3));
  geo.setAttribute('aWheel', new BufferAttribute(wheel(), 3));
  geo.setAttribute('aDrift', new BufferAttribute(drift(), 3));
  geo.setAttribute('aColor', new BufferAttribute(col, 3));
  geo.setAttribute('aSize', new BufferAttribute(size, 1));
  geo.setAttribute('aSeed', new BufferAttribute(seed, 1));
  geo.setDrawRange(0, COUNT);

  const uniforms = {
    uMorph: { value: 0 },
    uTime: { value: 0 },
    uPixelRatio: { value: dpr },
    uScale: { value: 1 },
    uOpacity: { value: 1 },
    uPointer: { value: [99, 99] as [number, number] },
    uPull: { value: 0 },
    uRadius: { value: 0.6 },
  };
  const material = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: NormalBlending,
  });
  const points = new Points(geo, material);
  points.frustumCulled = false;
  scene.add(points);

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the object about the same size within a narrow or wide box.
    camera.position.z = camera.aspect < 0.8 ? 8.2 / camera.aspect * 0.8 : 8.2;
    camera.updateProjectionMatrix();
    // Particles grow a touch on large canvases so the ring keeps its weight.
    uniforms.uScale.value = Math.min(1.6, Math.max(1, h / 520));
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // Cursor or finger, as normalized device coordinates of this canvas.
  let tx = 0;
  let ty = 0;
  let near = false;
  let px = 0;
  let py = 0;
  const track = (cx: number, cy: number) => {
    const r = canvas.getBoundingClientRect();
    tx = ((cx - r.left) / r.width) * 2 - 1;
    ty = -(((cy - r.top) / r.height) * 2 - 1);
    // Respond a little beyond the canvas edge so the effect eases in.
    near = Math.abs(tx) < 1.15 && Math.abs(ty) < 1.15;
  };
  const onMove = (e: PointerEvent) => { if (e.pointerType !== 'touch') track(e.clientX, e.clientY); };
  const onTouch = (e: TouchEvent) => { const t = e.touches[0]; if (t) track(t.clientX, t.clientY); };
  const onLeave = () => (near = false);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('touchstart', onTouch, { passive: true });
  window.addEventListener('touchmove', onTouch, { passive: true });
  window.addEventListener('touchend', onLeave, { passive: true });
  window.addEventListener('touchcancel', onLeave, { passive: true });
  document.addEventListener('pointerleave', onLeave);

  // Intro: drift in from the cloud and settle into the ring.
  let intro = 0;
  let introStart = performance.now();
  const introStartAt = (t: number) => (introStart = t);
  let forced: number | null = null;

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
  io.observe(host);

  let raf = 0;
  let t0 = performance.now();
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = (now - t0) / 1000;
    intro = Math.min(1, (now - introStart) / 2600);
    const eased = 1 - Math.pow(1 - intro, 3);
    uniforms.uMorph.value = forced ?? eased + progress() * 3.6;
    uniforms.uTime.value = t;
    // Ease the pointer so the parting trails the cursor, then map it onto the
    // z = 0 plane the object sits on.
    px += (tx - px) * 0.12;
    py += (ty - py) * 0.12;
    const pull = uniforms.uPull;
    pull.value += ((near ? 1 : 0) - pull.value) * 0.06;
    const halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    uniforms.uPointer.value = [px * halfH * camera.aspect, py * halfH];
    // Gentle rotation within ±8 degrees, leaning toward the cursor while it is near.
    // Idle sway and lean together stay within 0.14 rad (8 degrees).
    points.rotation.y = Math.sin(t * 0.35) * 0.07 + px * 0.07 * pull.value;
    points.rotation.x = Math.sin(t * 0.23) * 0.04 - py * 0.05 * pull.value;
    renderer.render(scene, camera);
  };
  // Compile the shader off the main thread where the browser supports it,
  // then start the intro.
  renderer.compileAsync(scene, camera).catch(() => {}).finally(() => {
    t0 = performance.now();
    introStartAt(t0);
    raf = requestAnimationFrame(frame);
    host.classList.add('is-live');
  });

  return {
    setMorph(m) { forced = m; },
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onLeave);
      window.removeEventListener('touchcancel', onLeave);
      document.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      io.disconnect();
      geo.dispose();
      material.dispose();
      renderer.dispose();
      canvas.remove();
      host.classList.remove('is-live');
    },
  };
}
