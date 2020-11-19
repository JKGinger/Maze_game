/* når man giver slip på en tast, bliver den registreret.
Brug den til at finde ud af "key info"
document.addEventListener("keyup", (e)=>{
    console.log(e);
})
*/
document.onkeydown = KD;
       function KD(event) {
         event.returnValue = false;
       }

let knap = document.querySelector('#knap');
knap.addEventListener('click', () => {
  location.reload();
});


let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 3, 1, 1, 1, 1, 1, 5, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 3, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 3, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 5, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1],
  [1, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 3, 5, 0, 1, 1, 1, 3, 1],
  [1, 1, 5, 1, 1, 5, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 4, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [2, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 1, 3, 1, 3, 0, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let tileSize = 35;
let playerPosition = { x: 0, y: 0 };
let playerimg = new Image();
playerimg.src = 'images/player.png';

let roadimg = new Image();
roadimg.src = 'images/road.png';

let wallimg = new Image();
wallimg.src = 'images/wall.png';

let coinimg = new Image();
coinimg.src = 'images/coin.png';

let goal1img = new Image();
goal1img.src = 'images/goal1.png';

let goal2img = new Image();
goal2img.src = 'images/goal2.png';

let spikesimg = new Image();
spikesimg.src = 'images/spikes.png';

let road = 0;
let wall = 1;
let player = 2;
let coin = 3;
let goal = 4;
let spikes = 5;


let score = 0;
let maxscore = 8;
function drawMaze() {
  window.addEventListener('load', drawMaze);
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === road) {
        ctx.drawImage(
          roadimg,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      } else if (maze[y][x] === wall) {
        ctx.drawImage(
          wallimg,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      } else if (maze[y][x] === player) {
        playerPosition.x = x;
        playerPosition.y = y;
        ctx.drawImage(
          playerimg,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      } else if (maze[y][x] === coin) {
        ctx.drawImage(
          coinimg,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      } else if (maze[y][x] === goal) {
        if(score === maxscore){
         ctx.drawImage(
          goal2img,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        ); 
        } else {
          ctx.drawImage(
            goal1img,
            x * tileSize,
            y * tileSize,
            tileSize,
            tileSize
          ); 
        }
        document.querySelector('#points').innerHTML =
          '<h3>' + score + ' points </h3>';
      } else if (maze[y][x] === spikes) {
        ctx.drawImage(
          spikesimg,
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize
        );
      }
    }
  }
}

function walkSound() {
  let gameSound = new Audio('gameSound/walk.wav');
  gameSound.volume = 0.1;
  gameSound.play();
}

function coinSound() {
  let gameSound = new Audio('gameSound/coin.wav');
  gameSound.volume = 0.1;
  gameSound.play();
}

function winSound() {
  let gameSound = new Audio('gameSound/win.wav');
  gameSound.volume = 0.1;
  gameSound.play();
}

// player movement
window.addEventListener('keydown', (e) => {
    // left 37, up 38, right 39, down 40
    switch (event.keyCode) {
      case 37:
        if (maze[playerPosition.y][playerPosition.x - 1] === road) {
          maze[playerPosition.y][playerPosition.x - 1] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          walkSound();
          console.log(maze[14][13]);
        } else if (maze[playerPosition.y][playerPosition.x - 1] === coin) {
          maze[playerPosition.y][playerPosition.x - 1] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          score++;
          drawMaze();
          coinSound();
          switch (score) {
            case 1:
            maze[15][2] = 0;
                break;
            case 2:
            maze[18][8] = 0;
                break;
            case 3:
            maze[18][14] = 0;
                break;
            case 4:
            maze[6][2] = 0;
            maze[5][8] = 0;
                break;
            case 5:
            maze[14][13] = 0;
            maze[1][8] = 0;
                break;
            case 6:
            maze[5][14] = 0;
            maze[1][12] = 0;
                break;
            case 7:
            maze[4][12] = 0;
                break;
            case 8:
            maze[15][5] = 0;
                break;
        }  
        } else if (
          maze[playerPosition.y][playerPosition.x - 1] === goal &&
          score === 8
        ) {
          maze[playerPosition.y][playerPosition.x - 1] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          winSound();
          document.querySelector('#win-msg').innerHTML =
          '<h3> You won </h3>';
          myStopFunction();
        } else if (maze[playerPosition.y][playerPosition.x -1] === spikes) {
            maze[playerPosition.y][playerPosition.x - 1] = 2; //players nye position
            maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
            drawMaze();
            walkSound();
            document.getElementById('dead').play();
            alert("You've died");
            location.reload();
        }
        break;
      case 38:
        if (maze[playerPosition.y - 1][playerPosition.x] === road) {
          maze[playerPosition.y - 1][playerPosition.x] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          walkSound();
          console.log(maze[14][13]);
        } else if (maze[playerPosition.y - 1][playerPosition.x] === coin) {
          maze[playerPosition.y - 1][playerPosition.x] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          score++;
          drawMaze();
          coinSound();
          switch (score) {
            case 1:
            maze[15][2] = 0;
                break;
            case 2:
            maze[18][8] = 0;
                break;
            case 3:
            maze[18][14] = 0;
                break;
            case 4:
            maze[6][2] = 0;
            maze[5][8] = 0;
                break;
            case 5:
            maze[14][13] = 0;
            maze[1][8] = 0;
                break;
            case 6:
            maze[5][14] = 0;
            maze[1][12] = 0;
                break;
            case 7:
            maze[4][12] = 0;
                break;
            case 8:
            maze[15][5] = 0;
                break;
        }
        } else if (
          maze[playerPosition.y - 1][playerPosition.x] === goal &&
          score === 8
        ) {
          maze[playerPosition.y - 1][playerPosition.x] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          winSound();
          document.querySelector('#win-msg').innerHTML =
          '<h3> You won </h3>';
          myStopFunction();
        } else if (maze[playerPosition.y - 1][playerPosition.x] === spikes) {
            maze[playerPosition.y - 1][playerPosition.x] = 2; //players nye position
            maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
            drawMaze();
            walkSound();
            document.getElementById('dead').play();
            alert("You've died");
            location.reload();
        }
        break;
      case 39:
        if (maze[playerPosition.y][playerPosition.x + 1] === road) {
          maze[playerPosition.y][playerPosition.x + 1] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          walkSound();
          console.log(maze[14][13]);
        } else if (maze[playerPosition.y][playerPosition.x + 1] === coin) {
          maze[playerPosition.y][playerPosition.x + 1] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          score++;
          drawMaze();
          coinSound();
          switch (score) {
            case 1:
            maze[15][2] = 0;
                break;
            case 2:
            maze[18][8] = 0;
                break;
            case 3:
            maze[18][14] = 0;
                break;
            case 4:
            maze[6][2] = 0;
            maze[5][8] = 0;
                break;
            case 5:
            maze[14][13] = 0;
            maze[1][8] = 0;
                break;
            case 6:
            maze[5][14] = 0;
            maze[1][12] = 0;
                break;
            case 7:
            maze[4][12] = 0;
                break;
            case 8:
            maze[15][5] = 0;
                break;
        }
        } else if (
          maze[playerPosition.y][playerPosition.x + 1] === goal &&
          score === 8
        ) {
          maze[playerPosition.y][playerPosition.x + 1] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          winSound();
          document.querySelector('#win-msg').innerHTML =
          '<h3> You won </h3>';
          myStopFunction();
        } else if (maze[playerPosition.y][playerPosition.x + 1] === spikes) {
            maze[playerPosition.y][playerPosition.x + 1] = 2; //players nye position
            maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
            drawMaze();
            walkSound();
            document.getElementById('dead').play();
            alert("You've died");
            location.reload();
        }
        break;
      case 40:
        if (maze[playerPosition.y + 1][playerPosition.x] === road) {
          maze[playerPosition.y + 1][playerPosition.x] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          walkSound();
          console.log(maze[14][13]);
        } else if (maze[playerPosition.y + 1][playerPosition.x] === coin) {
          maze[playerPosition.y + 1][playerPosition.x] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          score++;
          drawMaze();
          coinSound();   
          switch (score) {
            case 1:
            maze[15][2] = 0;
                break;
            case 2:
            maze[18][8] = 0;
                break;
            case 3:
            maze[18][14] = 0;
                break;
            case 4:
            maze[6][2] = 0;
            maze[5][8] = 0;
                break;
            case 5:
            maze[14][13] = 0;
            maze[1][8] = 0;
                break;
            case 6:
            maze[5][14] = 0;
            maze[1][12] = 0;
                break;
            case 7:
            maze[4][12] = 0;
                break;
            case 8:
            maze[15][5] = 0;
                break;
        }
        } else if (
          maze[playerPosition.y + 1][playerPosition.x] === goal &&
          score === 8
        ) {
          maze[playerPosition.y + 1][playerPosition.x] = 2; //players nye position
          maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
          drawMaze();
          winSound();
          document.querySelector('#win-msg').innerHTML =
          '<h3> You won </h3>';
          myStopFunction();
        } else if (maze[playerPosition.y + 1][playerPosition.x] === spikes) {
            maze[playerPosition.y + 1][playerPosition.x] = 2; //players nye position
            maze[playerPosition.y][playerPosition.x] = 0; //stedet hvor spilleren stod
            drawMaze();
            walkSound();
            document.getElementById('dead').play();
            alert("You've died");
            location.reload();
        }
        break;
    }
});


let myVar = setInterval(function(){ myTimer(); }, 1000);
let secondlimit = 59;

function myStopFunction() {
    clearInterval(myVar);   
}

function myTimer() {
if(secondlimit === 0)
{
    myStopFunction();{
      alert("You lost");
      location.reload;}
}

document.getElementById("safeTimerDisplay").innerHTML = 'Time left: ' + zeroPad(secondlimit,2);
secondlimit = secondlimit  - 1;

}

function zeroPad(num, places) {
  let zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}


drawMaze();

/* TO DO

New level
spikes that dissapere after picking up some coins

Highscore med php


*/
