// Liste des pays et leurs drapeaux
const flags = [
  {
    country: "Maroc",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg",
  },
  {
    country: "France",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg",
  },
  {
    country: "Italie",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
  },
  {
    country: "Pays-Bas",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg",
  },
  {
    country: "Espagne",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg",
  },
  {
    country: "Canada",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg",
  },
  {
    country: "Japon",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
  },
  {
    country: "Algérie",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/Flag_of_Algeria.svg",
  },
  {
    country: "Allemagne",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  },
  {
    country: "Corée du Sud",
    flagUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/0f/Flag_of_South_Korea.svg",
  },
];

let currentFlag = 0;
let score = 0;
let timer;
let timeLeft = 10;
let timerElement = document.getElementById("timer");

document.getElementById("start-button").addEventListener("click", startGame);

function startGame() {
  // Masquer le bouton de démarrage
  document.getElementById("start-button").style.display = "none";

  // Afficher les éléments du jeu
  document.getElementById("timer").style.display = "block";
  document.querySelector(".flag-container").style.display = "block";
  document.getElementById("answer-container").style.display = "block";
  document.getElementById("feedback").style.display = "block";
  document.getElementById("score").style.display = "block";

  // Lancer le jeu
  showFlag();
}

function showFlag() {
  const flag = flags[currentFlag];
  document.getElementById("flag-image").src = flag.flagUrl;
  document.getElementById("feedback").textContent = "";
  timeLeft = 10;
  timerElement.textContent = `Temps restant: ${timeLeft}s`;

  timer = setInterval(updateTimer, 1000);

  const shuffledFlags = shuffle([...flags]);
  const options = getOptions(flag, shuffledFlags);

  const answerContainer = document.getElementById("answer-container");
  answerContainer.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.country;
    button.onclick = () => checkAnswer(option);
    answerContainer.appendChild(button);
  });
}

function updateTimer() {
  timeLeft--;
  timerElement.textContent = `Temps restant: ${timeLeft}s`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById(
      "feedback"
    ).textContent = `⏰ Temps écoulé ! La bonne réponse était ${flags[currentFlag].country}.`;
    nextFlag();
  }
}

function checkAnswer(selectedFlag) {
  clearInterval(timer);

  const correctFlag = flags[currentFlag];

  if (selectedFlag.country === correctFlag.country) {
    score++;
    document.getElementById("feedback").textContent =
      " Bravo ! C'est correct ! 🎉";
  } else {
    document.getElementById(
      "feedback"
    ).textContent = `😕 Dommage ! La bonne réponse était ${correctFlag.country}.`;
  }

  document.getElementById("score-value").textContent = score;

  setTimeout(nextFlag, 2000);
}

function nextFlag() {
  currentFlag = (currentFlag + 1) % flags.length;
  if (currentFlag === 0) {
    setTimeout(showFinalScore, 1000);
  } else {
    showFlag();
  }
}

function showFinalScore() {
  document.getElementById("flag-image").style.display = "none";
  document.getElementById("answer-container").innerHTML = "";
  document.getElementById(
    "feedback"
  ).textContent = `🎉 Le jeu est terminé ! 🎉 Votre score final est : ${score}`;
  document.getElementById("score-value").textContent = score;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getOptions(correctFlag, shuffledFlags) {
  const options = [correctFlag];
  while (options.length < 4) {
    const randomFlag =
      shuffledFlags[Math.floor(Math.random() * shuffledFlags.length)];
    if (!options.includes(randomFlag)) {
      options.push(randomFlag);
    }
  }
  return shuffle(options);
}
