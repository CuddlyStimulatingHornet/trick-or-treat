const startForm = document.getElementById("start-form");
const inputPlayer = document.getElementById("input-player");
const addPlayerBtn = document.getElementById("add-player-btn");
const playersList = document.getElementById("players-list");

const startBtn = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");

const gameScreen = document.getElementById("game-screen");
const currentCard = document.getElementById("current-card");
const currentPlayerDiv = document.getElementById("current-player");
const currentPlayerAvatar = document.getElementById("current-player-avatar");
const currentPlayerName = document.getElementById("current-player-name");
const currentGameField = document.getElementById("game-field");
const currentTreat = document.getElementById("game-treat");
const currentTask = document.getElementById("game-task");
const gameNextBtn = document.getElementById("game-next-btn");

const players = [];
let generatedPlayers = [];

const tricks = [
  { text: "Потрогай и угадай с закрытыми глазами, что это.", used: false },
  { text: "Спой песню в караоке и получи от судей оценку 10.", used: false },
  {
    text: "Станцуй танец из TikTok — у тебя три попытки, чтобы набрать 10 баллов.",
    used: false,
  },
  {
    text: "За одну минуту сделай фото мумии в очках (используй туалетную бумагу).",
    used: false,
  },
  {
    text: "Попади ручкой, привязанной к поясу, в горлышко бутылки за минуту.",
    used: false,
  },
  { text: "Съешь дольку лимона и не сморщись.", used: false },
  {
    text: "Сделай селфи за минуту с игроком, у которого есть вещь жёлтого цвета.",
    used: false,
  },
];

function renderPlayers() {
  playersList.innerHTML = "";

  players.forEach((player) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const p = document.createElement("p");
    const button = document.createElement("button");

    li.className = "players__item";
    div.className = "players__avatar";
    p.className = "players__name";
    button.className = "players__delete-player";

    li.dataset.id = player.id;
    div.dataset.avatar = player.avatar;
    p.dataset.id = player.id;
    button.dataset.id = player.id;

    button.dataset.js = "delete-button";

    p.textContent = player.name;
    button.textContent = "X";

    div.style.backgroundImage = `url("../../images/avatars/${div.dataset.avatar}.png")`;

    li.appendChild(div);
    li.appendChild(p);
    li.appendChild(button);

    playersList.appendChild(li);
  });
}

function addPlayer() {
  const name = inputPlayer.value.trim();
  const userId = Math.floor(Math.random() * 100000000);
  const avatarNum = Math.floor(Math.random() * 24 + 1);
  players.push({ name, treat: false, id: userId, avatar: avatarNum });
  inputPlayer.value = "";
}

playersList.addEventListener("click", (event) => {
  const index = players.findIndex((player) => {
    return String(player.id) === event.target.dataset.id;
  });
  if (event.target.dataset.js === "delete-button") {
    players.splice(index, 1);
  }

  renderPlayers();
});

startForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addPlayer();
  renderPlayers();
  inputPlayer.focus();
});

function weightedRandom(itemsWithWeights) {
  const cumulativeWeights = [];
  let totalWeight = 0;
  for (const item of itemsWithWeights) {
    totalWeight += item.weight;
    cumulativeWeights.push(totalWeight);
  }

  const randomNumber = Math.random() * totalWeight;

  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (randomNumber < cumulativeWeights[i]) {
      return itemsWithWeights[i].treat;
    }
  }
}

function generatePlayersWins(players) {
  const treatsWithWeights = [
    { treat: "Сладость", weight: 40 },
    { treat: "Гадость", weight: 60 },
  ];

  const updatedPlayers = players.map((player) => {
    const newTreat = weightedRandom(treatsWithWeights);
    return { ...player, treat: newTreat };
  });

  generatedPlayers = updatedPlayers.map((player) => {
    if (player.treat === "Гадость") {
      for (let i = 0; i < tricks.length; i++) {
        if (!tricks[i].used) {
          player.task = tricks[i].text;
          tricks[i].used = true;
          break;
        }
      }
    }

    return player;
  });

  console.log(generatedPlayers);
}

startBtn.addEventListener("click", () => {
  startScreen.classList.add("visually-hidden");
  gameScreen.classList.remove("visually-hidden");

  generatePlayersWins(players);
  console.log(generatedPlayers);
});

let currentIndex = 0;

function displayCurrentUser() {
  currentTreat.textContent = "";
  currentTask.innerHTML = "";
  const currentPlayer = generatedPlayers[currentIndex];
  currentPlayerAvatar.style.backgroundImage = `url("../../images/avatars/${currentPlayer.avatar}.png")`;
  currentPlayerName.textContent = currentPlayer.name;

  if (currentPlayer.treat === "Гадость") {
    currentTask.classList.remove("treat-win");
    currentTreat.textContent = "Гадость";
    const p = document.createElement("p");
    p.className = "game__task-text";
    p.textContent = currentPlayer.task;
    currentTask.appendChild(p);
  } else if (currentPlayer.treat === "Сладость") {
    currentTreat.textContent = "Сладость";
    currentTask.classList.add("treat-win");
  }
}

function showNextUser() {
  currentPlayerDiv.classList.remove("animate-fade-in");
  currentGameField.classList.remove("animate-fade-in");

  // Хитрость JS: нужно немного подождать, чтобы браузер "забыл" об анимации,
  // прежде чем запустить ее снова для нового контента.
  setTimeout(() => {
    // 2. Обновляем данные
    currentIndex++;
    if (currentIndex >= generatedPlayers.length) {
      const h2 = document.createElement("h2");
      h2.textContent = "Теперь битва за главный приз";
      currentGameField.innerHTML = "";
      currentGameField.appendChild(h2);
    }
    displayCurrentUser();

    // 3. Добавляем класс, который запускает анимацию для нового контента
    currentPlayerDiv.classList.add("animate-fade-in");
    currentGameField.classList.add("animate-fade-in");
  }, 10); // Задержка в 10 миллисекунд достаточна
}

gameNextBtn.addEventListener("click", showNextUser);
displayCurrentUser();
playerCardEl.classList.add("animate-fade-in");
