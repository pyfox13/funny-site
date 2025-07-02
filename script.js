document.addEventListener("DOMContentLoaded", function () {
  const compliments = {
    Mercury: "Yangchen's smile is faster than Mercury's orbit! ☀️",
    Venus: "Even Venus can't match Yangchen's beauty 💖",
    Earth: "Earth shines brighter with Yangchen 🌍",
    Mars: "Mars is red because it blushes for Yangchen 😳",
    Jupiter: "Yangchen's presence is mightier than Jupiter 💫",
    Saturn: "Not even Saturn's rings are as graceful as Yangchen's charm 💍",
    Uranus: "Yangchen turns the universe on its axis 💙",
    Neptune: "Deeper than Neptune's blue is Yangchen's soul 🌊",
    Pluto: "Pluto may be small, but Yangchen's heart is infinite ✨"
  };

  document.querySelectorAll(".planet").forEach((planet) => {
    planet.addEventListener("click", () => {
      const name = planet.getAttribute("data-name");

      const comet = document.createElement("div");
      comet.className = "comet";
      comet.style.top = `${Math.random() * (window.innerHeight - 150) + 50}px`;

      const msg = document.createElement("div");
      msg.className = "comet-msg";
      msg.textContent = compliments[name] || "You're amazing, Yangchen!";
      comet.appendChild(msg);

      document.body.appendChild(comet);
      setTimeout(() => comet.remove(), 5000);
    });
  });
});
