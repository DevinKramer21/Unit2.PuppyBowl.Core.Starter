const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch player");
    }
    return await response.json();
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    throw err;
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const response = await fetch(`${API_URL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerObj),
    });
    if (!response.ok) {
      throw new Error("Failed to add new player");
    }
    return await response.json();
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
    throw err;
  }
};

const renderAllPlayers = (playerList) => {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = "";

  if (playerList.length === 0) {
    mainElement.textContent = "No players available.";
  } else {
    playerList.forEach((player) => {
      const card = document.createElement("div");
      card.classList.add("player-card");
      card.innerHTML = `
        <img src="${player.image}" alt="${player.name}" />
        <div>
          <h2>${player.name}</h2>
          <p>ID: ${player.id}</p>
        </div>
        <button class="details-btn">See details</button>
        <button class="remove-btn">Remove from roster</button>
      `;
      const detailsBtn = card.querySelector(".details-btn");
      detailsBtn.addEventListener("click", () => renderSinglePlayer(player));
      const removeBtn = card.querySelector(".remove-btn");
      removeBtn.addEventListener("click", () => {
        removePlayer(player.id);
        init();
      });

      mainElement.appendChild(card);
    });
  }
};

const renderSinglePlayer = (player) => {
  const mainElement = document.querySelector("main");
  mainElement.innerHTML = ""; 

  const card = document.createElement("div");
  card.classList.add("player-card");
  card.innerHTML = `
    <img src="${player.image}" alt="${player.name}" />
    <div>
      <h2>${player.name}</h2>
      <p>ID: ${player.id}</p>
      <p>Breed: ${player.breed}</p>
      <p>Team: ${player.team || "Unassigned"}</p>
    </div>
    <button class="back-btn">Back to all players</button>
  `;
  const backBtn = card.querySelector(".back-btn");
  backBtn.addEventListener("click", () => init());

  mainElement.appendChild(card);
};

const renderNewPlayerForm = () => {
  const formElement = document.getElementById("new-player-form");
  formElement.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="breed">Breed:</label>
    <input type="text" id="breed" name="breed">
    <label for="image">Image URL:</label>
    <input type="text" id="image" name="image" required>
    <button type="submit">Add Player</button>
  `;

  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const breed = document.getElementById("breed").value;
    const image = document.getElementById("image").value;

    try {
      await addNewPlayer({ name, breed, image });
      const players = await fetchAllPlayers();
      renderAllPlayers(players);
    } catch (err) {
      console.error("Error adding player:", err);
    }
  });
};

const init = async () => {
  try {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);
    renderNewPlayerForm();
  } catch (err) {
    console.error("Initialization error:", err);
  }
};

if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}

