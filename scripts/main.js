const startForm = document.getElementById("start-form");
const inputPlayer = document.getElementById("input-player");
const addPlayerBtn = document.getElementById("add-player-btn");
const playersList = document.getElementById("players-list");

const players = [];

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
    div.dataset.id = player.id;
    p.dataset.id = player.id;
    button.dataset.id = player.id;

    button.dataset.js = "delete-button";

    p.textContent = player.name;
    button.textContent = "X";

    li.appendChild(div);
    li.appendChild(p);
    li.appendChild(button);

    playersList.appendChild(li);
  });
}

function addPlayer() {
  const name = inputPlayer.value.trim();
  players.push({ name, treat: false, id: crypto.randomUUID() });
  inputPlayer.value = "";
}

playersList.addEventListener("click", (event) => {
  const index = players.findIndex((player) => {
    return player.id === event.target.dataset.id;
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
});
