const TIMER_SECONDS = 300;
const state = {
  timeLeft: TIMER_SECONDS,
  score: 0,
  activeGame: null,
  gameData: null,
  timerId: null,
};

const games = {
  tabakGambar: {
    title: "Tabak Gambar",
    description: "Pilih nama yang sesuai dengan gambar emoji.",
    questions: [
      { prompt: "Apa nama gambar ini?", image: "🦁", answer: "Singa", choices: ["Singa", "Kuda", "Kelinci", "Burung"] },
      { prompt: "Apa nama gambar ini?", image: "🚗", answer: "Mobil", choices: ["Pesawat", "Mobil", "Sepeda", "Perahu"] },
      { prompt: "Apa nama gambar ini?", image: "🍎", answer: "Apel", choices: ["Jeruk", "Apel", "Pisang", "Strawberry"] },
      { prompt: "Apa nama gambar ini?", image: "🐘", answer: "Gajah", choices: ["Gajah", "Ikan", "Kucing", "Kuda"] },
      { prompt: "Apa nama gambar ini?", image: "🌲", answer: "Pohon", choices: ["Rumah", "Pohon", "Bintang", "Awan"] },
    ],
  },
  tebakNama: {
    title: "Tebak Nama",
    description: "Baca petunjuk dan pilih jawaban yang benar.",
    questions: [
      { prompt: "Binatang peliharaan yang suka menggonggong.", answer: "Anjing", choices: ["Kucing", "Anjing", "Ayam", "Kelinci"] },
      { prompt: "Alat yang dipakai untuk menulis di kertas.", answer: "Pensil", choices: ["Penggaris", "Pensil", "Gunting", "Sapu"] },
      { prompt: "Benda yang tumbuh di kebun dan bersayap.", answer: "Kupu-kupu", choices: ["Kupu-kupu", "Ikan", "Kelinci", "Buku"] },
      { prompt: "Minuman yang berasal dari buah jeruk.", answer: "Jus", choices: ["Jus", "Susu", "Teh", "Air"] },
      { prompt: "Makanan khas nasi yang digulung dengan rumput laut.", answer: "Sushi", choices: ["Pizza", "Sushi", "Roti", "Burger"] },
    ],
  },
  tebakNegara: {
    title: "Tebak Negara",
    description: "Pilih nama negara berdasarkan petunjuk atau bendera.",
    questions: [
      { prompt: "Bendera: 🇮🇩. Negara ini beribu kota Jakarta.", answer: "Indonesia", choices: ["Malaysia", "Thailand", "Indonesia", "Filipina"] },
      { prompt: "Ibu kota: Tokyo.", answer: "Jepang", choices: ["Korea", "Jepang", "China", "India"] },
      { prompt: "Bendera: 🇧🇷. Terkenal dengan hutan Amazon.", answer: "Brasil", choices: ["Argentina", "Brasil", "Meksiko", "Chile"] },
      { prompt: "Negara ini beribukota Paris.", answer: "Prancis", choices: ["Spanyol", "Prancis", "Italia", "Jerman"] },
      { prompt: "Bendera: 🇦🇺. Negara ini berada di benua Oceania.", answer: "Australia", choices: ["Australia", "Selandia Baru", "Kanada", "Afrika Selatan"] },
    ],
  },
  quizKata: {
    title: "Quiz Kata",
    description: "Jawab pertanyaan edukatif dengan cepat.",
    questions: [
      { prompt: "Benda yang kita gunakan untuk makan sup.", answer: "Sendok", choices: ["Sendok", "Pisau", "Piring", "Gelas"] },
      { prompt: "Anak kucing disebut...",
        answer: "Anak Kucing",
        choices: ["Anak Kambing", "Anak Kucing", "Anak Ayam", "Anak Sapi"] },
      { prompt: "Warna campuran merah dan putih.", answer: "Merah Muda", choices: ["Ungu", "Merah Muda", "Oranye", "Hijau"] },
      { prompt: "Bulan ke-12 dalam kalender.", answer: "Desember", choices: ["November", "Desember", "Januari", "Oktober"] },
      { prompt: "Rumah yang terbuat dari es di kutub utara.", answer: "Igloo", choices: ["Tenda", "Igloo", "Rumah", "Gudang"] },
    ],
  },
};

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const returnHomeButton = document.getElementById("returnHomeButton");
const changeGameButton = document.getElementById("changeGameButton");
const restartButton = document.getElementById("restartButton");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");
const promptText = document.getElementById("promptText");
const visualHint = document.getElementById("visualHint");
const optionsGrid = document.getElementById("optionsGrid");

function init() {
  state.activeGame = "tabakGambar";
  state.score = 0;
  state.timeLeft = TIMER_SECONDS;
  updateScore();
  updateTimerDisplay();
  bindGameSelection();
}

function bindGameSelection() {
  document.querySelectorAll(".game-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeGame = button.dataset.game;
      document.querySelectorAll(".game-card").forEach((item) => item.classList.remove("active-card"));
      button.classList.add("active-card");
    });
  });
}

function startGame() {
  state.score = 0;
  state.timeLeft = TIMER_SECONDS;
  updateScore();
  updateTimerDisplay();
  state.gameData = shuffle([...games[state.activeGame].questions]);
  showScreen(gameScreen);
  gameTitle.textContent = games[state.activeGame].title;
  gameDescription.textContent = games[state.activeGame].description;
  renderQuestion();
  startCountdown();
}

function renderQuestion() {
  if (!state.gameData.length) {
    state.gameData = shuffle([...games[state.activeGame].questions]);
  }
  const question = state.gameData.pop();
  promptText.textContent = question.prompt;
  visualHint.textContent = question.image || "";
  const choices = shuffle([...question.choices]);
  optionsGrid.innerHTML = "";
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "option-button";
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(choice, question.answer, button));
    optionsGrid.appendChild(button);
  });
}

function selectAnswer(choice, expected, button) {
  if (state.timeLeft <= 0) return;
  const isCorrect = choice === expected;
  if (isCorrect) {
    state.score += 10;
    button.classList.add("correct");
  } else {
    state.score = Math.max(0, state.score - 3);
    button.classList.add("wrong");
  }
  updateScore();
  setTimeout(() => {
    renderQuestion();
  }, 400);
}

function updateScore() {
  scoreEl.textContent = state.score;
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(state.timeLeft / 60)).padStart(2, "0");
  const seconds = String(state.timeLeft % 60).padStart(2, "0");
  timerEl.textContent = `${minutes}:${seconds}`;
}

function startCountdown() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(state.timerId);
  finalScoreEl.textContent = state.score;
  showScreen(endScreen);
}

function showScreen(screen) {
  [startScreen, gameScreen, endScreen].forEach((section) => {
    section.classList.toggle("active", section === screen);
  });
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);
returnHomeButton.addEventListener("click", () => {
  showScreen(startScreen);
  clearInterval(state.timerId);
});
changeGameButton.addEventListener("click", () => {
  showScreen(startScreen);
  clearInterval(state.timerId);
});
restartButton.addEventListener("click", startGame);

init();
