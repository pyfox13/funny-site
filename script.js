function showSurprise() {
  const messages = [
    "You're out of this world, Miss Yangchen! 🚀",
    "Stars shine brighter when you're around ✨",
    "Beauty, brains, and cosmic charm 🌠",
    "From Earth to Mars — you're the star of the galaxy 🌌"
  ];
  
  const msg = messages[Math.floor(Math.random() * messages.length)];
  alert(msg);
}
