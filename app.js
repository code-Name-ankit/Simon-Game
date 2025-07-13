let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highScore = 0;

let btns = ["red", "purple", "green", "yellow"];
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keydown", function (event) {
  if (started == false) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

function levelUp() {
  level++;

  h2.innerText = "Level " + level;

  let randIx = Math.floor(Math.random() * 4);
  let randColor = btns[randIx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  gameFlash(randBtn);
   console.log(` ${gameSeq}`);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

let allBtn = document.querySelectorAll(".btn");
for (let btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function btnPress() {
  let btn = this;
  //    console.log(this)
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}



function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp(), 2000);
      userSeq = [];
    }
  } else {
    h2.innerHTML = `Game Over,Your score was <b>${level}</b><br> Press Any Key to Restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    if (level > highScore) {
      highScore = level;
      h3.innerText = `High Score: ${highScore}`;
    }
    resetGame();
  }
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  started = false;
  level = 0;
  //   h2.innerText = "Press Any Key to Start";
}
