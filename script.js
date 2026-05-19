const TIMER_SECONDS = 300;
const state = {
  timeLeft: TIMER_SECONDS,
  score: 0,
  highScore: 0,
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
    description: "Baca petunjuk dan pilih jawaban yang benar dari buah, hewan, dan benda sehari-hari.",
    questions: [
      { prompt: "Binatang peliharaan yang suka menggonggong.", image: "🐶", answer: "Anjing", choices: ["Kucing", "Anjing", "Ayam", "Kelinci"] },
      { prompt: "Buah hijau dengan daging lembut dan biji besar.", image: "🥑", answer: "Alpukat", choices: ["Pisang", "Alpukat", "Mangga", "Jeruk"] },
      { prompt: "Buah kecil, ungu, dan sering dijadikan jus.", image: "🍇", answer: "Anggur", choices: ["Anggur", "Ceri", "Apel", "Nanas"] },
      { prompt: "Binatang berkantung yang melompat.", image: "🦘", answer: "Kanguru", choices: ["Kancil", "Kanguru", "Kelinci", "Kuda"] },
      { prompt: "Buah kuning, manis, dan harum tropis.", image: "🥭", answer: "Mangga", choices: ["Nanas", "Pepaya", "Mangga", "Leci"] },
    ],
  },
  tebakBuahHewan: {
    title: "Tebak Buah & Hewan",
    description: "Pilih jawaban yang tepat dari nama buah dan hewan populer di Indonesia.",
    questions: [
      { prompt: "Buah berkulit berduri dan harum khas tropis.", image: "🌴", answer: "Durian", choices: ["Nangka", "Durian", "Sawo", "Melon"] },
      { prompt: "Binatang besar dengan belalai panjang.", image: "🐘", answer: "Gajah", choices: ["Harimau", "Gajah", "Kuda", "Singa"] },
      { prompt: "Buah berbentuk lonjong hijau yang sering dibuat jus.", image: "🥝", answer: "Kiwi", choices: ["Kiwi", "Avokad", "Anggur", "Lime"] },
      { prompt: "Binatang kecil berbulu yang suka wortel.", image: "🐇", answer: "Kelinci", choices: ["Kucing", "Kelinci", "Kuda", "Bebek"] },
      { prompt: "Buah oranye dengan rasa asam segar.", image: "🍋", answer: "Lemon", choices: ["Jeruk", "Lemon", "Nanas", "Markisa"] },
      { prompt: "Binatang pemangsa dengan corak belang.", image: "🐅", answer: "Harimau", choices: ["Jerapah", "Harimau", "Kuda Nil", "Badak"] },
      { prompt: "Buah merah kecil dengan bintik-bintik manis.", image: "🍓", answer: "Stroberi", choices: ["Ceri", "Stroberi", "Rambutan", "Delima"] },
    ],
  },
  tebakNegara: {
    title: "Tebak Negara",
    description: "Pilih nama negara berdasarkan petunjuk atau bendera.",
    questions: [
      { prompt: "Negara ini beribu kota Jakarta.", image: "🇮🇩", answer: "Indonesia", choices: ["Malaysia", "Thailand", "Indonesia", "Filipina"] },
      { prompt: "Ibu kota: Tokyo.", image: "🇯🇵", answer: "Jepang", choices: ["Korea", "Jepang", "China", "India"] },
      { prompt: "Terkenal dengan hutan Amazon.", image: "🇧🇷", answer: "Brasil", choices: ["Argentina", "Brasil", "Meksiko", "Chile"] },
      { prompt: "Negara ini beribukota Paris.", image: "🇫🇷", answer: "Prancis", choices: ["Spanyol", "Prancis", "Italia", "Jerman"] },
      { prompt: "Negara ini berada di benua Oceania.", image: "🇦🇺", answer: "Australia", choices: ["Australia", "Selandia Baru", "Kanada", "Afrika Selatan"] },
    ],
  },
  quizKata: {
    title: "Quiz Kata",
    description: "Jawab pertanyaan edukatif dengan cepat.",
    questions: [
      { prompt: "Benda yang kita gunakan untuk makan sup.", image: "🥄", answer: "Sendok", choices: ["Sendok", "Pisau", "Piring", "Gelas"] },
      { prompt: "Anak kucing disebut...", image: "🐱", answer: "Anak Kucing", choices: ["Anak Kambing", "Anak Kucing", "Anak Ayam", "Anak Sapi"] },
      { prompt: "Warna campuran merah dan putih.", image: "🌸", answer: "Merah Muda", choices: ["Ungu", "Merah Muda", "Oranye", "Hijau"] },
      { prompt: "Bulan ke-12 dalam kalender.", image: "🎄", answer: "Desember", choices: ["November", "Desember", "Januari", "Oktober"] },
      { prompt: "Rumah yang terbuat dari es di kutub utara.", image: "🏠", answer: "Igloo", choices: ["Tenda", "Igloo", "Rumah", "Gudang"] },
    ],
  },
  hitungCepat: {
    title: "Hitung Cepat",
    description: "Latih cepat hitung angka dan pilih jawaban yang benar.",
    questions: [
      { prompt: "5 + 3 = ?", image: "➕", answer: "8", choices: ["7", "8", "9", "6"] },
      { prompt: "7 - 2 = ?", image: "➖", answer: "5", choices: ["3", "5", "6", "4"] },
      { prompt: "4 x 2 = ?", image: "✖️", answer: "8", choices: ["6", "7", "8", "9"] },
      { prompt: "9 - 5 = ?", image: "➖", answer: "4", choices: ["3", "4", "5", "6"] },
      { prompt: "3 + 4 = ?", image: "➕", answer: "7", choices: ["6", "7", "8", "5"] },
    ],
  },
  susunKata: {
    title: "Susun Kata",
    description: "Cari kata yang benar dari huruf campur.",
    questions: [
      { prompt: "Huruf: S A Y U R", image: "🥕", answer: "Sayur", choices: ["Sayur", "Buah", "Kue", "Air"] },
      { prompt: "Huruf: B O L A", image: "⚽", answer: "Bola", choices: ["Bola", "Kuda", "Kasur", "Buku"] },
      { prompt: "Huruf: R U M A H", image: "🏠", answer: "Rumah", choices: ["Rumah", "Meja", "Buku", "Kapal"] },
      { prompt: "Huruf: A N J I N G", image: "🐶", answer: "Anjing", choices: ["Kucing", "Anjing", "Ikan", "Burung"] },
      { prompt: "Huruf: P E N S I L", image: "✏️", answer: "Pensil", choices: ["Pensil", "Meja", "Tas", "Buku"] },
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
const highScoreEl = document.getElementById("highScore");
const finalScoreEl = document.getElementById("finalScore");
const finalHighScoreEl = document.getElementById("finalHighScore");
const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");
const promptText = document.getElementById("promptText");
const visualHint = document.getElementById("visualHint");
const optionsGrid = document.getElementById("optionsGrid");

function init() {
  state.activeGame = "tabakGambar";
  state.score = 0;
  state.timeLeft = TIMER_SECONDS;
  state.highScore = loadHighScore();
  updateScore();
  updateTimerDisplay();
  updateHighScoreDisplay();
  bindGameSelection();
}

function loadHighScore() {
  return Number(localStorage.getItem("imamGamesHighScore") || 0);
}

function saveHighScore() {
  localStorage.setItem("imamGamesHighScore", String(state.highScore));
}

function updateHighScoreDisplay() {
  highScoreEl.textContent = state.highScore;
}

function bindGameSelection() {
  document.querySelectorAll(".game-card").forEach((button) => {
    if (button.dataset.game === state.activeGame) {
      button.classList.add("active-card");
    }
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
  if (state.score > state.highScore) {
    state.highScore = state.score;
    saveHighScore();
    updateHighScoreDisplay();
  }
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
  if (state.score > state.highScore) {
    state.highScore = state.score;
    saveHighScore();
  }
  finalScoreEl.textContent = state.score;
  finalHighScoreEl.textContent = state.highScore;
  updateHighScoreDisplay();
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
