// TODO: write your code here

const player1 = { index: 0, name: "Player 1", tiles: document.querySelector("#player1-race").querySelectorAll("td") };
const player2 = { index: 0, name: "Player 2", tiles: document.querySelector("#player2-race").querySelectorAll("td") };
let player;
const raceLength = player1.tiles.length;

const prompt = document.querySelector("h2");

const movePlayer = (thisPlayer, index = null) => {
  thisPlayer.tiles[thisPlayer.index].classList.toggle("active");
  if (index != null) {
    thisPlayer.index = index;
  } else {
    thisPlayer.index += 1;
  }

  thisPlayer.tiles[thisPlayer.index].classList.toggle("active");
};

const restartPlayer = (thisPlayer) => {
  thisPlayer.tiles[thisPlayer.index].classList.toggle("active");
  thisPlayer.index = 0;
  thisPlayer.tiles[thisPlayer.index].classList.toggle("active");
};

const handleKeyUp = (event) => {
  console.log(event.code);
  if (event.code === "KeyQ") {
    player = player1;
  } else if (event.code === "KeyP") {
    player = player2;
  }
  if (player) {
    if (player.index < raceLength - 1) {
      movePlayer(player);
    } else {
      prompt.innerHTML = `<strong>${player.name}</strong> wins!!`;
      document.removeEventListener("keyup", handleKeyUp);
    }
  }
};


const restart = () => {
  const audio = new Audio('sounds/start_sound.mp3');
  audio.volume = 0.3;
  audio.play();
  document.removeEventListener("keyup", handleKeyUp);
  prompt.innerHTML = "Ready!";
  document.querySelectorAll(".fire").forEach((el) => {
    el.classList.remove("go");
    el.classList.add("restart");
    el.offsetWidth = "none";
  });

  document.querySelectorAll(".fire").forEach(el => el.classList.add("restart"));
  console.log(document.querySelectorAll(".fire"));
  setTimeout(() => { prompt.innerHTML = "Set!"; }, 1000);
  setTimeout(() => {
    prompt.innerHTML = "Go!";
    movePlayer(player1, 0);
    movePlayer(player2, 0);
    document.addEventListener("keyup", handleKeyUp);
    document.querySelector("#restart-btn").innerHTML = "Restart";
    document.querySelectorAll(".fire").forEach((el) => {
      el.classList.add("go");
      el.classList.remove("restart");
      el.offsetWidth = "none";
    });

    console.log(document.querySelectorAll(".fire"));
  }, 3000);
};
// restart();
document.querySelector("#restart-btn").addEventListener("click", restart);
