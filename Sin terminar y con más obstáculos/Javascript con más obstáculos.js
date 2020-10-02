
function getCanvas() {
  return document.getElementById("froggerCanvas");
}
function initCanvas() {
  let canvas = getCanvas();
  canvas.width = 700;
  canvas.height = 700;

  window.addEventListener('keydown', function (e) {
    switch (e.key) {
      case "r":
      case "R":
        initGame();
        break;
      case "ArrowUp":
        upPressed = true;
        break;
      case "ArrowDown":
        downPressed = true;
        break;
      case "ArrowLeft":
        leftPressed = true;
        break;
      case "ArrowRight":
        rightPressed = true;
        break;
    }
  }, false);
  window.addEventListener('keyup', function (e) {
    switch (e.key) {
      case "ArrowUp":
        upPressed = false;
        break;
      case "ArrowDown":
        downPressed = false;
        break;
      case "ArrowLeft":
        leftPressed = false;
        break;
      case "ArrowRight":
        rightPressed = false;
        break;
    }
  }, false);
}

const audioMusic = document.querySelector("#music");
let frogMaxSpeed;
let frogXSpeed;
let frogYSpeed;
let frogX;
let frogY;
let frogInLilipad;

let upPressed;
let downPressed;
let leftPressed;
let rightPressed;

let lilipapsSpeed;
let lilipadsX;

let cars1Speed;
let cars1X;
let cars2Speed;
let cars2X;

function initGame() {

  frogMaxSpeed = 5;
  frogXSpeed = 0;
  frogYSpeed = 0;
  frogX = 350;
  frogY = 650;
  frogInLilipad = false;

  upPressed = false;
  downPressed = false;
  leftPressed = false;
  rightPressed = false;

  lilipapsSpeed = -3;
  lilipadsX = [, 100, 400, 750];
  lilipads1X = [, 200, 500, 850];
  lilipads2X = [, 300, 600, 950];

  cars1Speed = 2;
  cars1X = [0, 220, 440, 660];
  cars2Speed = 7;
  cars2X = [0, 450];
}



function update() {
  lilipadsX = lilipadsX.map(function (x) {
    let newX = x + lilipapsSpeed
    return newX < -100 ? 800 : newX;
  });
  lilipads1X = lilipads1X.map(function (x) {
    let newX = x + lilipapsSpeed
    return newX < -100 ? 800 : newX;
  });
  lilipads2X = lilipads2X.map(function (x) {
    let newX = x + lilipapsSpeed
    return newX < -100 ? 800 : newX;
  });

  cars1X = cars1X.map(function (x) {
    let newX = x + cars1Speed
    return newX > 800 ? -100 : newX;
  });
  cars2X = cars2X.map(function (x) {
    let newX = x + cars2Speed
    return newX > 800 ? -100 : newX;
  });

  frogXSpeed = 0;
  frogYSpeed = 0;
  if (upPressed) frogYSpeed -= frogMaxSpeed;
  if (downPressed) frogYSpeed += frogMaxSpeed;
  if (leftPressed) frogXSpeed -= frogMaxSpeed;
  if (rightPressed) frogXSpeed += frogMaxSpeed;

  frogX += frogXSpeed;
  frogY += frogYSpeed;

  frogInLilipad = frogY > 300 && frogY < 400 && lilipadsX.some(function (x) {
    return Math.abs(frogX - x) < 60;



  });

  if (frogInLilipad) {
    frogX += lilipapsSpeed;
  }

  checkVictory();
  checkDeath();
}

function checkVictory() {
  if (frogY < 50) {
    alert("Es peligroso ir solo, toma esto.");
    initGame();
  }
}
function checkDeath() {
  if (frogY > 700 || frogX < 0 || frogX > 700) {
    alert("¡La princesa te espera Link!");
    initGame();
  }
  if (frogY > 520 && frogY < 610 && cars1X.some(function (x) {
    return Math.abs(frogX - x) < 80;
  })) {
    alert("Y con la muerte del héroe, Ganon consumió el mundo.!");
    initGame();
  }
  if (frogY > 80 && frogY < 210 && cars2X.some(function (x) {
    return Math.abs(frogX - x) < 60;
  })) {
    alert("Y así La Trifuerza se perdió para siempre.");
    initGame();
  }
  if (frogY > 180 && frogY < 460 && !lilipadsX.some(function (x) {
    return Math.abs(frogX - x) < 75;
  })) {
    alert("Antes de ahogarse, el héroe recordó las palabras de Impa. La princesa estaba condenada.");
    initGame();
  }

}

function render() {
  let canvas = getCanvas();
  canvas.focus();

  renderBackground(canvas);
  renderEntities(canvas);

}
function renderBackground(canvas) {
  let ctx = canvas.getContext('2d');

  let imgStartEnd = document.getElementById("imgStartEnd");
  let imgMiddle = document.getElementById("imgMiddle");
  let imgRoad = document.getElementById("imgRoad");
  let imgRiver = document.getElementById("imgRiver");

  for (let i = 0; i < 7; i++) {
    ctx.drawImage(imgStartEnd, i * 100, 0, 100, 100);
    ctx.drawImage(imgRoad, i * 100, 100, 100, 100);
    ctx.drawImage(imgRiver, i * 100, 200, 100, 100);
    ctx.drawImage(imgRiver, i * 100, 300, 100, 100);
    ctx.drawImage(imgRiver, i * 100, 400, 100, 100);
    ctx.drawImage(imgRoad, i * 100, 500, 100, 100);
    ctx.drawImage(imgStartEnd, i * 100, 600, 100, 100);

  }
  audioMusic.play();
}
function renderEntities(canvas) {
  let ctx = canvas.getContext('2d');

  let imgLilipad = document.getElementById("imgLilipad");
  let imgCar = document.getElementById("imgCar");
  let imgFrog = document.getElementById("imgFrog");

  lilipadsX.forEach(function (x) {
    ctx.drawImage(imgLilipad, x - 40, 310, 80, 80);
  });
  lilipads1X.forEach(function (x) {
    ctx.drawImage(imgLilipad, x - 50, 410, 90, 90);
  });
  lilipads2X.forEach(function (x) {
    ctx.drawImage(imgLilipad, x - 30, 210, 70, 90);
  });
  cars1X.forEach(function (x) {
    ctx.drawImage(imgCar, x - 40, 510, 80, 80);
  });
  cars2X.forEach(function (x) {
    ctx.drawImage(imgCar, x - 40, 110, 80, 80);
  });
  ctx.drawImage(imgFrog, frogX - 40, frogY - 40, 80, 80);


}

window.onload = function () {
  initGame();
  initCanvas();

  setInterval(function () {
    update();
    render();
  }, 16);
};