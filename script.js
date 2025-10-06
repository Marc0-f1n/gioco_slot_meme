const simboli = ["🍒", "🍋", "🍀", "💎", "🔔", "⭐", "🧁", "🐲"];
const costoPartita = 1;
const probJackpot = 1 / 50;
const vincitaJackpot = 10;

let monete = 0;

// Mostra/Nasconde le regole
document.getElementById("btn-regole").addEventListener("click", () => {
  document.getElementById("regole").classList.toggle("hidden");
});

// Inserisci monete
document.getElementById("btn-inserisci").addEventListener("click", () => {
  const input = prompt("Quante monete vuoi inserire?");
  const valore = parseInt(input);
  if (!isNaN(valore) && valore > 0) {
    monete += valore;
    document.getElementById("monete").textContent = monete;
    document.getElementById("btn-gioca").disabled = false;
    alert(`Hai inserito ${valore} monete!`);
  } else {
    alert("Inserisci un numero valido.");
  }
});

// Avvia il gioco
document.getElementById("btn-gioca").addEventListener("click", () => {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
});

// Gira la slot
document.getElementById("play").addEventListener("click", () => {
  if (monete < costoPartita) {
    document.getElementById("result").textContent = "💸 Hai finito le monete!";
    document.getElementById("game-screen").classList.add("hidden");
    document.getElementById("game-over").classList.remove("hidden");

    setTimeout(() => {
      document.getElementById("game-over").classList.add("hidden");
      document.getElementById("start-screen").classList.remove("hidden");
      document.getElementById("btn-gioca").disabled = true;
      monete = 0;
      document.getElementById("monete").textContent = monete;
      document.getElementById("result").textContent = "";
      ["s1", "s2", "s3"].forEach(id => {
        const el = document.getElementById(id);
        el.textContent = "❔";
        el.classList.remove("spin", "win-glow");
      });
    }, 3000);
    return;
  }

  monete -= costoPartita;

  const rulli = [
    simboli[Math.floor(Math.random() * simboli.length)],
    simboli[Math.floor(Math.random() * simboli.length)],
    simboli[Math.floor(Math.random() * simboli.length)]
  ];

  let vincita = 0;
  let vincitori = [];

  if (rulli[0] === rulli[1] && rulli[1] === rulli[2]) {
    vincita = 5;
    vincitori = ["s1", "s2", "s3"];
  } else if (rulli[0] === rulli[1]) {
    vincita = 2;
    vincitori = ["s1", "s2"];
  } else if (rulli[1] === rulli[2]) {
    vincita = 2;
    vincitori = ["s2", "s3"];
  } else if (rulli[0] === rulli[2]) {
    vincita = 2;
    vincitori = ["s1", "s3"];
  }

  // Mostra simboli con animazione
  ["s1", "s2", "s3"].forEach((id, i) => {
    const el = document.getElementById(id);
    el.classList.remove("spin", "win-glow");
    void el.offsetWidth;
    el.textContent = rulli[i];
    el.classList.add("spin");
  });

  // Illuminazione simboli vincenti
  vincitori.forEach(id => {
    document.getElementById(id).classList.add("win-glow");
  });

  // Jackpot
  if (Math.random() < probJackpot) {
    vincita += vincitaJackpot;
    document.getElementById("result").textContent = `🎉🎰 JACKPOT! Hai vinto ${vincitaJackpot} monete! 🎰🎉`;
    lanciaCoriandoli();
  } else if (vincita > 0) {
    document.getElementById("result").textContent = `🎉 Hai vinto ${vincita} monete!`;
  } else {
    document.getElementById("result").textContent = "💀 Coglione hai perso, continua a pagarmi!";
  }

  monete += vincita;
  document.getElementById("monete").textContent = monete;
});

// Effetto coriandoli
function lanciaCoriandoli() {
  for (let i = 0; i < 30; i++) {
    const confetto = document.createElement("div");
    confetto.classList.add("confetto");
    confetto.style.left = Math.random() * 100 + "vw";
    confetto.style.top = "-10px";
    confetto.style.setProperty("--hue", Math.floor(Math.random() * 360));
    document.getElementById("confetti-container").appendChild(confetto);

    setTimeout(() => {
      confetto.remove();
    }, 2000);
  }
}