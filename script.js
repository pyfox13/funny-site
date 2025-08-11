/* =====================================
   Get Well Soon — JavaScript (Modern)
   Interactions: confetti, tissues, bubbles, rotating kind notes
   ===================================== */

// DOM refs
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const btnConfetti = document.getElementById('btnConfetti');
const btnTissue = document.getElementById('btnTissue');
const noteEl = document.getElementById('noteText');
const btnNote = document.getElementById('btnNote');

// Pixel ratio handling for crisp canvas
const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));
const resizeCanvas = () => {
  canvas.width = Math.floor(window.innerWidth * DPR);
  canvas.height = Math.floor(window.innerHeight * DPR);
};
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

// Confetti particle system
const state = { confetti: [] };
const burst = (x, y, n = 140) => {
  for (let i = 0; i < n; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    state.confetti.push({
      x: x * DPR,
      y: y * DPR,
      vx: Math.cos(angle) * speed * DPR,
      vy: Math.sin(angle) * speed * DPR - 2,
      g: 0.06 * DPR,
      size: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      hue: Math.floor(180 + Math.random() * 160),
      life: 120 + Math.random() * 80
    });
  }
};

const tick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state.confetti = state.confetti.filter(p => p.life > 0);
  for (const p of state.confetti) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life--;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = `hsl(${p.hue} 80% 60%)`;
    ctx.fillRect(-p.size, -p.size/2, p.size*2, p.size);
    ctx.restore();
  }
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);

// Calm floating bubbles
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

// Tissues animation (drops 🧻)
const spawnTissue = () => {
  const t = document.createElement('div');
  t.textContent = '🧻';
  t.style.position = 'fixed';
  t.style.fontSize = `${18 + Math.random() * 22}px`;
  t.style.left = `${Math.random() * 100}vw`;
  t.style.top = '-40px';
  t.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
  document.body.appendChild(t);
  const endY = window.innerHeight + 80;
  const drift = Math.random() * 60 - 30;
  t.animate([
    { transform: 'translate(0, 0) rotate(0deg)' },
    { transform: `translate(${drift}px, ${endY}px) rotate(360deg)` }
  ], { duration: 3500 + Math.random() * 1500, easing: 'ease-in', iterations: 1 });
  setTimeout(() => t.remove(), 5200);
};

let tissueBurst = 0;
btnConfetti.addEventListener('click', (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  burst(r.left + r.width/2, r.top + r.height/2, 180);
});
btnTissue.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) spawnTissue();
  tissueBurst++;
  if (tissueBurst % 3 === 0) burst(window.innerWidth/2, 120, 80);
});

// Auto welcome burst
window.addEventListener('load', () => {
  burst(window.innerWidth/2, window.innerHeight * 0.25, 140);
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
  noteIndex = (noteIndex + 1) % notes.length;
  const card = noteEl.parentElement;
  card.classList.remove('fade'); // reset anim
  void card.offsetWidth; // reflow
  noteEl.textContent = notes[noteIndex];
  card.classList.add('fade');
});