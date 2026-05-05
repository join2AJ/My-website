import * as THREE from 'three';

// ── Renderer / Scene / Camera ────────────────────────────────────────────────
const canvas   = document.getElementById('bg-canvas');
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;

// ── Lights ───────────────────────────────────────────────────────────────────
scene.add(new THREE.AmbientLight(0x4040aa, 1.0));

const pl1 = new THREE.PointLight(0x6366f1, 4, 25);
pl1.position.set(3, 3, 2);
scene.add(pl1);

const pl2 = new THREE.PointLight(0x22d3ee, 4, 25);
pl2.position.set(-3, -3, 2);
scene.add(pl2);

const pl3 = new THREE.PointLight(0xa855f7, 2.5, 18);
pl3.position.set(0, 5, -2);
scene.add(pl3);

// ── Galaxy particles ─────────────────────────────────────────────────────────
const PARTICLE_COUNT = 9000;
const pPositions  = new Float32Array(PARTICLE_COUNT * 3);
const pColors     = new Float32Array(PARTICLE_COUNT * 3);

// Three spiral arms, colour gradient from center (white) to edge (accent)
const armColors = [
  [0.39, 0.40, 0.95],  // indigo
  [0.13, 0.83, 0.93],  // cyan
  [0.66, 0.33, 0.97],  // purple
];
const white = [0.94, 0.95, 0.98];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const i3 = i * 3;
  const arm = i % 3;
  const r   = Math.pow(Math.random(), 0.4) * 28 + 1;
  const spin = r * 0.22;
  const branchAngle = arm * ((Math.PI * 2) / 3);
  const angle  = branchAngle + spin;
  const spread = Math.pow(Math.random(), 4) * 2.5;
  const sign   = Math.random() < 0.5 ? 1 : -1;

  pPositions[i3]     = Math.cos(angle) * r + (Math.random() - 0.5) * spread;
  pPositions[i3 + 1] = (Math.random() - 0.5) * 2;
  pPositions[i3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * spread - 14;

  const t  = Math.min(r / 28, 1);  // 0 = center, 1 = edge
  const ac = armColors[arm];
  pColors[i3]     = white[0] * (1 - t) + ac[0] * t;
  pColors[i3 + 1] = white[1] * (1 - t) + ac[1] * t;
  pColors[i3 + 2] = white[2] * (1 - t) + ac[2] * t;
}

const pgeo = new THREE.BufferGeometry();
pgeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
pgeo.setAttribute('color',    new THREE.BufferAttribute(pColors, 3));

const galaxy = new THREE.Points(pgeo, new THREE.PointsMaterial({
  size: 0.055,
  sizeAttenuation: true,
  vertexColors: true,
  transparent: true,
  opacity: 0.9,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
}));
scene.add(galaxy);

// ── Hero — torus knot ────────────────────────────────────────────────────────
const hero = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.4, 0.46, 220, 36, 2, 3),
  new THREE.MeshStandardMaterial({
    color: 0x5254e8,
    emissive: 0x1a1a99,
    emissiveIntensity: 0.5,
    metalness: 0.95,
    roughness: 0.04,
  })
);
scene.add(hero);

// Wireframe overlay
const wire = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.43, 0.47, 100, 18, 2, 3),
  new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    wireframe: true,
    transparent: true,
    opacity: 0.1,
  })
);
scene.add(wire);

// Soft glow sphere around hero
const glow = new THREE.Mesh(
  new THREE.SphereGeometry(2.8, 32, 32),
  new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    transparent: true,
    opacity: 0.04,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
);
scene.add(glow);

// ── Orbital rings ────────────────────────────────────────────────────────────
function makeRing(r, color, opacity, rx, ry) {
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(r, 0.007, 2, 140),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity,
                                   blending: THREE.AdditiveBlending, depthWrite: false })
  );
  mesh.rotation.set(rx, ry, 0);
  scene.add(mesh);
  return mesh;
}

const ring1 = makeRing(2.3, 0x6366f1, 0.6, Math.PI / 3, 0);
const ring2 = makeRing(2.7, 0x22d3ee, 0.4, Math.PI / 4, Math.PI / 5);
const ring3 = makeRing(3.2, 0xa855f7, 0.28, Math.PI / 6, Math.PI / 3);

// ── Floating gems ────────────────────────────────────────────────────────────
const gemDefs = [
  { p: [-5.5,  2.0, -2.5], c: 0x6366f1, e: 0x2c2db0 },
  { p: [ 5.5, -2.0, -2.5], c: 0x22d3ee, e: 0x117799 },
  { p: [-4.0, -3.5, -5.0], c: 0xa855f7, e: 0x661199 },
  { p: [ 4.5,  3.5, -5.5], c: 0x6366f1, e: 0x2c2db0 },
  { p: [-3.0,  5.0, -8.0], c: 0x22d3ee, e: 0x117799 },
  { p: [ 3.5, -5.0, -8.0], c: 0xa855f7, e: 0x661199 },
  { p: [ 7.0,  0.5, -6.0], c: 0x6366f1, e: 0x2c2db0 },
  { p: [-7.0, -0.5, -6.0], c: 0x22d3ee, e: 0x117799 },
];

const gems = gemDefs.map(({ p, c, e }, i) => {
  const size = 0.12 + Math.random() * 0.22;
  const mesh = new THREE.Mesh(
    new THREE.OctahedronGeometry(size, 0),
    new THREE.MeshStandardMaterial({ color: c, emissive: e, emissiveIntensity: 0.7,
                                      metalness: 0.9, roughness: 0.08 })
  );
  mesh.position.set(...p);
  mesh.userData = { baseY: p[1], speed: 0.28 + Math.random() * 0.45, phase: i * 1.3 };
  scene.add(mesh);
  return mesh;
});

// ── Mouse / scroll state ─────────────────────────────────────────────────────
let mouseX = 0, mouseY = 0;
let camTargetX = 0, camTargetY = 0;
let scrollY = 0;

window.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
  mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
});

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;

  // navbar glass
  document.getElementById('navbar')
    .classList.toggle('scrolled', scrollY > 60);

  // scroll bar
  const progress = scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
  document.getElementById('scroll-bar').style.width = (progress * 100) + '%';
});

// ── IntersectionObserver for fade-in ─────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

// ── Typewriter ───────────────────────────────────────────────────────────────
const texts  = ['Creative Developer', '3D Experience Designer', 'WebGL Artist', 'Digital Creator'];
let tIdx = 0, cIdx = 0, deleting = false;

function typeStep() {
  const el = document.querySelector('.hero-typewriter');
  if (!el) return;
  const word = texts[tIdx];
  el.textContent = deleting ? word.slice(0, cIdx - 1) : word.slice(0, cIdx + 1);
  deleting ? cIdx-- : cIdx++;
  let delay = deleting ? 45 : 95;
  if (!deleting && cIdx === word.length) { delay = 2000; deleting = true; }
  else if (deleting && cIdx === 0) { deleting = false; tIdx = (tIdx + 1) % texts.length; delay = 400; }
  setTimeout(typeStep, delay);
}
typeStep();

// ── Loader hide (after first rendered frame) ──────────────────────────────────
let loaderGone = false;
function hideLoader() {
  if (loaderGone) return;
  loaderGone = true;
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 600);
}

// ── Custom cursor ────────────────────────────────────────────────────────────
const cursorEl = document.getElementById('cursor');
const dotEl    = document.getElementById('cursor-dot');

document.addEventListener('mousemove', e => {
  if (cursorEl) { cursorEl.style.left = e.clientX + 'px'; cursorEl.style.top = e.clientY + 'px'; }
  if (dotEl)    { dotEl.style.left    = e.clientX + 'px'; dotEl.style.top    = e.clientY + 'px'; }
});

document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!cursorEl) return;
    cursorEl.style.width = '44px';
    cursorEl.style.height = '44px';
    cursorEl.style.borderColor = '#22d3ee';
  });
  el.addEventListener('mouseleave', () => {
    if (!cursorEl) return;
    cursorEl.style.width = '24px';
    cursorEl.style.height = '24px';
    cursorEl.style.borderColor = '#6366f1';
  });
});

// ── Animation loop ───────────────────────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  hideLoader();

  const t = clock.getElapsedTime();
  const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
  const progress  = Math.min(scrollY / maxScroll, 1);

  // Smooth camera parallax
  camTargetX += (mouseX * 0.45 - camTargetX) * 0.05;
  camTargetY += (mouseY * 0.28 - camTargetY) * 0.05;
  camera.position.x = camTargetX;
  camera.position.y = camTargetY;
  camera.position.z = 6 - progress * 3.5;

  // Hero object
  hero.rotation.x = t * 0.14 + camTargetY * 0.35;
  hero.rotation.y = t * 0.22 + camTargetX * 0.35;
  wire.rotation.copy(hero.rotation);
  glow.rotation.copy(hero.rotation);

  const s = Math.max(0.25, 1 - progress * 0.75);
  hero.scale.setScalar(s);
  wire.scale.setScalar(s);
  glow.scale.setScalar(s);

  const hz = -progress * 4.5;
  hero.position.z = hz;
  wire.position.z = hz;
  glow.position.z = hz;

  // Rings follow hero
  const hp = hero.position;
  ring1.position.copy(hp); ring1.rotation.z = t * 0.13;
  ring2.position.copy(hp); ring2.rotation.z = -t * 0.19;
  ring2.rotation.x = Math.PI / 4 + Math.sin(t * 0.12) * 0.12;
  ring3.position.copy(hp); ring3.rotation.z = t * 0.09;

  // Gems float
  gems.forEach(g => {
    g.position.y = g.userData.baseY + Math.sin(t * g.userData.speed + g.userData.phase) * 0.7;
    g.rotation.x = t * 0.5;
    g.rotation.y = t * 0.7;
  });

  // Galaxy
  galaxy.rotation.y = t * 0.014;
  galaxy.rotation.x = 0.18 + progress * 0.35;

  // Animate lights
  pl1.position.x = Math.sin(t * 0.45) * 5;
  pl1.position.y = Math.cos(t * 0.33) * 5;
  pl2.position.x = Math.cos(t * 0.52) * 5;
  pl2.position.y = Math.sin(t * 0.41) * 5;

  renderer.render(scene, camera);
}

animate();

// ── Resize ───────────────────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
