/* =====================================
   Get Well Soon — JavaScript (Modern)
   Interactions: confetti, tissues, bubbles, photo upload
   ===================================== */

// Cache DOM elements
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const btnConfetti = document.getElementById('btnConfetti');
const btnTissue = document.getElementById('btnTissue');
const fileInput = document.getElementById('fileInput');
const photoBox = document.getElementById('photoBox');
const photo = document.getElementById('photo');
const illustration = document.getElementById('illustration');

// Respect device pixel ratio for crisp canvas rendering
const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1));

// Resize canvas to full viewport
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
    p.vy += p.g;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life--;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = `hsl(${p.hue} 80% 60%)`;
    ctx.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
    ctx.restore();
  }
  requestAnimationFrame(tick);
};
requestAnimationFrame(tick);

// Calm floating bubbles using simple DOM nodes
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

// Tissues animation (drops 🧻 emojis)
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

// Button handlers
btnConfetti.addEventListener('click', (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 180);
});

btnTissue.addEventListener('click', () => {
  for (let i = 0; i < 10; i++) spawnTissue();
  tissueBurst++;
  if (tissueBurst % 3 === 0) {
    // Small celebratory burst every third click
    burst(window.innerWidth / 2, 120, 80);
  }
});

// Auto welcome burst on load
window.addEventListener('load', () => {
  burst(window.innerWidth / 2, window.innerHeight * 0.25, 140);
});

// Photo uploader (local preview only)
fileInput?.addEventListener('change', (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    photo.src = reader.result;
    photoBox.hidden = false;
    illustration.hidden = true;
  };
  reader.readAsDataURL(file);
});