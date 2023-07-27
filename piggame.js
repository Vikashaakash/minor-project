"use strict";
//selecting element

const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1"); //both upper one and lower one have samesyntax

const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let currentscore, playing, scores, activeplayer;
const diceroll = document.querySelector(".dice");

const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");
//getelementbyid is little bit faster than queryselector it is irrelevant if we select thousands of lines

diceroll.classList.add("hidden");
const init = function () {
  currentscore = 0;
  playing = true;
  scores = [0, 0];
  activeplayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceroll.classList.add("hidden");

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();
let switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  currentscore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

btnroll.addEventListener("click", function () {
  if (playing) {
    //generate a random dice no
    const dices = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceroll.classList.remove("hidden");
    //display any rondom dice no
    diceroll.src = `dice-${dices}.png`;
    //check for rolled 1
    if (dices !== 1) {
      currentscore = currentscore + dices;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      //switch player
      switchplayer();
    }
  }
});
btnhold.addEventListener("click", function () {
  if (playing) {
    //add cyrrent score to active player
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    //check score>=100
    if (scores[activeplayer] >= 100) {
      playing = false; //use to stop the programme when one of the player wins;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      //switch player
      switchplayer();
    }
  }
});
btnnew.addEventListener("click", init);
