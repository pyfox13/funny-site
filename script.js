/* =====================================
   Get Well Soon — JavaScript (Modern Effects)
   Adds: confetti + heart mode, button ripple, mouse heart trail,
         floating stars, animated bubbles, rotating kind notes
   ===================================== */

// DOM refs
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const btnConfetti = document.getElementById('btnConfetti');
const btnTissue = document.getElementById('btnTissue');
const btnHearts = document.getElementById('btnHearts');
const noteEl = document.getElementById('noteText');
const btnNote = document.getElementById('btnNote');
const fxLayer = document.getElementById('fx-layer');

// Crisp canvas
const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
const resizeCanvas = () => { canvas.width = Math.floor(innerWidth * DPR); canvas.height = Math.floor(innerHeight * DPR); };
resizeCanvas(); addEventListener('resize', resizeCanvas, { passive: true });

// Confetti particles
const state = { confetti: [], heartMode: false };
const burst = (x, y, n = 140, shape = 'rect') => {
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    state.confetti.push({
      x: x * DPR, y: y * DPR,
      vx: Math.cos(angle) * speed * DPR,
      vy: Math.sin(angle) * speed * DPR - 2,
      g: 0.06 * DPR,
      size: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      hue: Math.floor(180 + Math.random() * 160),
      life: 120 + Math.random() * 80,
      shape
    });
  }
};

const draw = (p) => {
  ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
  ctx.fillStyle = `hsl(${p.hue} 80% 60%)`;
  if (p.shape === 'heart') { // draw a small heart using text for simplicity
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `${p.size * 3}px system-ui`;
    ctx.fillText('❤', 0, 0);
  } else {
    ctx.fillRect(-p.size, -p.size/2, p.size*2, p.size);
  }
  ctx.restore();
};

const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state.confetti = state.confetti.filter(p => p.life > 0);
  for (const p of state.confetti) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--; draw(p);
  }
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);

// Button ripple helper
const addRipple = (btn, e) => {
  const r = btn.getBoundingClientRect();
  const span = document.createElement('span');
  span.className = 'ripple';
  const size = Math.max(r.width, r.height);
  span.style.width = span.style.height = size + 'px';
  span.style.left = (e.clientX - r.left - size/2) + 'px';
  span.style.top = (e.clientY - r.top - size/2) + 'px';
  btn.appendChild(span);
  setTimeout(() => span.remove(), 600);
};

// Bubble background
const spawnBubble = () => {
  const b = document.createElement('div');
  b.className = 'bubble';
  const size = 8 + Math.random() * 24;
  b.style.width = b.style.height = `${size}px`;
  b.style.left = `${Math.random() * 100}vw`;
  b.style.bottom = '-40px';
  b.style.animationDuration = `${7 + Math.random() * 7}s`;
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 15000);
};
setInterval(spawnBubble, 900);

// Falling tissues (🧻)
const spawnTissue = () => {
  const t = document.createElement('div');
  t.textContent = '🧻'; t.className = 'fx';
  const fs = 18 + Math.random() * 22;
  t.style.fontSize = `${fs}px`;
  t.style.left = `${Math.random() * 100}vw`;
  t.style.top = '-40px';
  fxLayer.appendChild(t);
  const endY = innerHeight + 80; const drift = Math.random() * 60 - 30;
  t.animate([{ transform: 'translate(0,0)' },{ transform: `translate(${drift}px, ${endY}px)` }], { duration: 3500 + Math.random()*1500, easing: 'ease-in' });
  setTimeout(() => t.remove(), 5200);
};

// Floating stars ✦
const spawnStar = () => {
  const s = document.createElement('div'); s.className = 'fx star'; s.textContent = '✦';
  s.style.left = `${Math.random() * 100}vw`; s.style.top = `${Math.random() * 30}vh`;
  s.style.fontSize = `${12 + Math.random()*18}px`; s.style.opacity = '0.8';
  fxLayer.appendChild(s);
  s.animate([{ transform: 'scale(0.8)' }, { transform: 'scale(1.1)' }, { transform: 'scale(0.9)' }], { duration: 2400, iterations: 2, easing: 'ease-in-out' });
  setTimeout(() => s.remove(), 5000);
};
setInterval(spawnStar, 1800);

// Mouse heart trail
addEventListener('mousemove', (e) => {
  if (Math.random() > 0.35) return; // keep it light
  const h = document.createElement('div'); h.className = 'fx heart'; h.textContent = '❤';
  h.style.left = e.clientX + 'px'; h.style.top = e.clientY + 'px';
  h.style.fontSize = (10 + Math.random()*14) + 'px'; h.style.opacity = '0.9';
  fxLayer.appendChild(h);
  const dx = (Math.random()*30-15), dy = -40 - Math.random()*40;
  h.animate([{ transform:`translate(0,0)`, opacity:0.9 }, { transform:`translate(${dx}px, ${dy}px)`, opacity:0 }], { duration: 900, easing: 'ease-out' });
  setTimeout(() => h.remove(), 950);
});

// Buttons
btnConfetti.addEventListener('click', (e) => {
  addRipple(e.currentTarget, e);
  const r = e.currentTarget.getBoundingClientRect();
  const shape = state.heartMode ? 'heart' : 'rect';
  burst(r.left + r.width/2, r.top + r.height/2, 200, shape);
});

btnTissue.addEventListener('click', (e) => {
  addRipple(e.currentTarget, e);
  for (let i = 0; i < 12; i++) spawnTissue();
});

btnHearts.addEventListener('click', (e) => {
  addRipple(e.currentTarget, e);
  state.heartMode = !state.heartMode;
  e.currentTarget.textContent = state.heartMode ? 'Hearts: On' : 'Heart mode';
});

// Auto welcome effects
addEventListener('load', () => {
  burst(innerWidth/2, innerHeight * 0.25, 160, 'rect');
});

// Kind note generator
const notes = [
  'Breathing in calm, breathing out worries. You are loved, Yangchen.',
  'Warm tea, soft blanket, and a day of easy rest — you deserve it.',
  'Tiny steps count. Your body is healing while you rest.',
  'Noses run, legends keep going. You got this.',
  'Hydration, naps, and a little sunshine. Better days are close.',
  'Sending comfort and silly memes in spirit. Feel better soon!',
  'If coughs had trophies, you’d still win best smile today.',
  'One deep breath at a time. I’m cheering for you.'
];
let noteIndex = 0;
btnNote?.addEventListener('click', () => {
  const card = noteEl.parentElement; noteIndex = (noteIndex + 1) % notes.length;
  card.classList.remove('fade'); void card.offsetWidth; noteEl.textContent = notes[noteIndex]; card.classList.add('fade');
});