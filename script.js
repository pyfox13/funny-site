const thoughts = [
    "I considered making a real app, but I also considered folding my laundry. And here we are.",
    "This website took 3 cups of coffee and 0 real planning.",
    "They said ‘touch grass’… I touched the keyboard instead.",
    "I had two choices: clean my room or build this. Clearly, I chose chaos.",
    "At least this site doesn’t ask you to accept cookies. 🍪"
  ];
  
  const motoLines = [
    "Because last week I texted ‘goodnight’ to a food delivery app.",
    "Because I once clapped when my laundry finished drying. Alone.",
    "Because the last person who held my hand was a blood pressure machine.",
    "Because I needed a hobby that didn’t involve stalking dogs on Instagram.",
    "Because I mistook my houseplant's leaf for a high five.",
    "Because my phone’s 'You up?' was from Duolingo."
  ];
  
  window.addEventListener("DOMContentLoaded", () => {
    const random = motoLines[Math.floor(Math.random() * motoLines.length)];
    const motoEl = document.getElementById("motoLine");
    if (motoEl) {
      motoEl.textContent = random;
    }
  });
  
  document.getElementById('showMessageBtn').addEventListener('click', () => {
    const line = document.getElementById('funnyLine');
    const random = thoughts[Math.floor(Math.random() * thoughts.length)];
    line.textContent = random;
    line.classList.remove('hidden');
  });
  