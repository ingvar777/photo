const cards = document.querySelectorAll(".memory-card");
const step = document.querySelector(".step");

let hasFlippedCard = false;
let lockBoard = false;
let move = 0;
let firstCard, secondCard;
let pairCards = cards.length / 2;
let countPair = pairCards;
let isGameOver = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  move++;
  console.log(move);
  step.textContent = move;
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.face === secondCard.dataset.face;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  countPair--;
  if (!!countPair === false) gameOver();

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 20);
    card.style.order = randomPos;
  });
})();

function getResults(move) {
  let results = JSON.parse(localStorage.getItem("step"));
  if (!Array.isArray(results)) {
    results = [];
  }
  results.push(move);
  localStorage.setItem("step", JSON.stringify(results));
}

cards.forEach((card) => card.addEventListener("click", flipCard));

// https://rolling-scopes-school.github.io/seagirl1110-JSFEPRESCHOOL/memory-game/
// https://rolling-scopes-school.github.io/sylarbrest-JSFEPRESCHOOL/memory-game/
