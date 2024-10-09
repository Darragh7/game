let canvas;
let context;
let now;
// Outcome messages
let outcome_element_l = document.querySelector('#loss');
let outcome_element_nl = document.querySelector('#nextLevel');
// Fps declarations 
let fpsInterval = 1000 / 30;
let then = Date.now();
// These are declarations for the game loop, or the timer.
let startTime = 0;
let gameDuration = 20000; // 20 seconds in milliseconds
let gameRunning = false;     // May not need this.
// These are declarations for the player and mob.
let player = {
    x: 0,
    y: 0,
    width: 24,
    height: 32,
    frameX: 0,
    frameY: 0,
    xChange: 0,
    yChange: 0,
};
let mob = {   
    x: 0,
    y: 0,
    width: 48,
    height: 56,
    frameX: 0,
    frameY: 0,
    speed: 4.5,
  };
let mob2 = {   
    x: 0,
    y: 0,
    width: 48,
    height: 56,
    frameX: 0,
    frameY: 0,
    speed: 5,
  };
let mob3 = {   
    x: 0,
    y: 0,
    width: 48,
    height: 56,
    frameX: 0,
    frameY: 0,
    speed: 4,
  };
// *Include other mob declarations here*
// Music 
let backgroundMusic = new Audio('battleThemeA.mp3');
// Function to start the game and play music
function startGameWithMusic() {
    outcome_element_nl.style.display = 'none';
    window.addEventListener('keydown', activate, true);
    window.addEventListener('keyup', activate, true); 
    resetGame();
    // Start the game
    startGame();
    // Play the background music
    backgroundMusic.play();
    // Spawn mob
    generateRandomPosition(); // Set initial position of the mob
    draw();
}
// Event listener for keydown
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') { // Check for the space key
        startGameWithMusic();
    }
});
// These two functions are to stop and start game respectively , they may have to be moved from here.
function startGame(){
    gameRunning = true;
    startTime = Date.now(); 
}
function stopGame() {
    window.removeEventListener('keydown', activate, false);
    window.removeEventListener('keyup', activate, false);
    window.cancelAnimationFrame(draw);
    //let outcome_element = document.querySelector('#outcome'); 
    //outcome_element.innerHTML = outcome;
    gameRunning = false;  //may not need this
}
function resetGame () {
    player.x = canvas.width / 2;
    player.y = canvas.height - player.height;
}
// This function is used to spawn the mob in a random location.
function generateRandomPosition() {
    mob.x = Math.random() * (canvas.width - mob.width);
    mob.y = Math.random() * (canvas.height - mob.height);
    mob2.x = Math.random() * (canvas.width - mob2.width);
    mob2.y = Math.random() * (canvas.height - mob2.height);
    mob3.x = Math.random() * (canvas.width - mob3.width);
    mob3.y = Math.random() * (canvas.height - mob3.height);
}
// This function updates the mobs position based on the player's position.
function updateMob() {
    // Calculate the direction from the mob to the player
    let dx = player.x - mob.x;
    let dy = player.y - mob.y;
    // Normalize the direction vector
    let distance = Math.sqrt(dx * dx + dy * dy);
    let directionX = dx / distance;
    let directionY = dy / distance;
    // Move the mob towards the player by multiplying the direction vector by the mob's speed
    mob.x += directionX * mob.speed * 0.7;
    mob.y += directionY * mob.speed * 0.6;
    // Check if the mob is out of bounds and adjust its position if necessary
    if (mob.x < 0) {
        mob.x = 0;
    } else if (mob.x > canvas.width - mob.width) {
        mob.x = canvas.width - mob.width;
    }
    if (mob.y < 0) {
        mob.y = 0;
    } else if (mob.y > canvas.height - mob.height) {
        mob.y = canvas.height - mob.height;
    }
}
function updateMob2() {
    // Calculate the direction from the mob to the player
    let dx = player.x - mob2.x;
    let dy = player.y - mob2.y;
    // Normalize the direction vector
    let distance = Math.sqrt(dx * dx + dy * dy);
    let directionX = dx / distance;
    let directionY = dy / distance;
    // Move the mob towards the player by multiplying the direction vector by the mob's speed
    mob2.x += directionX * mob2.speed * 0.75;
    mob2.y += directionY * mob2.speed * 0.65;
    // Check if the mob is out of bounds and adjust its position if necessary
    if (mob2.x < 0) {
        mob2.x = 0;
    } else if (mob2.x > canvas.width - mob2.width) {
        mob2.x = canvas.width - mob2.width;
    }
    if (mob2.y < 0) {
        mob2.y = 0;
    } else if (mob2.y > canvas.height - mob2.height) {
        mob2.y = canvas.height - mob2.height;
    }
}
function updateMob3() {
    // Calculate the direction from the mob to the player
    let dx = player.x - mob3.x;
    let dy = player.y - mob3.y;
    // Normalize the direction vector
    let distance = Math.sqrt(dx * dx + dy * dy);
    let directionX = dx / distance;
    let directionY = dy / distance;
    // Move the mob towards the player by multiplying the direction vector by the mob's speed
    mob3.x += directionX * mob3.speed * 0.65;
    mob3.y += directionY * mob3.speed * 0.55;
    // Check if the mob is out of bounds and adjust its position if necessary
    if (mob3.x < 0) {
        mob3.x = 0;
    } else if (mob3.x > canvas.width - mob3.width) {
        mob3.x = canvas.width - mob3.width;
    }
    if (mob3.y < 0) {
        mob3.y = 0;
    } else if (mob3.y > canvas.height - mob3.height) {
        mob3.y = canvas.height - mob3.height;
    }
}
// This function will later be used to draw text on the canvas.
function drawText(text, x, y, color, size) {
    context.fillStyle = color;
    context.font = size + "px Arial";
    context.fillText(text, x, y);
}
// Loss message 
function showLoseMessage() {
    outcome_element_l.style.display = 'block';
    // Hide the message after a certain delay (e.g., 3 seconds)
    setTimeout(() => {
        outcome_element_l.style.display = 'none';
    }, 2500); // 2500 milliseconds (2.5 seconds)
}
// These declarations are for the player's movement.
let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;
// These declarions are for the player's animation.
let playerImage = new Image();
let backgroundImage = new Image();
let mobImage = new Image();
let mob2Image = new Image();
let mob3Image = new Image();

// Background array for the map.
let tilesPerRow = 10;
let tileSize = 10;
let background = [
    [81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],  
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [70, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72, 71, 72],
    [80, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82, 81, 82],
    [90, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94, 91, 92, 93, 94]
];
// Initialize the game function
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    player.x = canvas.width / 2;
    player.y = canvas.height - player.height;
    playerImage.src = "devil/devil.png";
    backgroundImage.src = "tiles.png";
    mobImage.src = "frog.png";
    mob2Image.src = "frog.png";
    mob3Image.src = "frog.png";
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    load_assets([
        { "var": playerImage, "url": "devil.png" },
        { "var": backgroundImage, "url": "tiles.png" },
        { "var": mobImage, "url": "frog.png" },
        { "var": mob2Image, "url": "frog.png" },
        { "var": mob3Image, "url": "frog.png" }
    ], draw);

}

// Draw , update function
function draw() {
    // Set the fps
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    let elapsedTimer = now - startTime
    if (elapsedTimer > gameDuration) {
        outcome_element_nl.style.display = 'block';
        console.log(outcome_element_nl)   // Show the 'nextLevel' message after the game duration
        setTimeout(() => {
            outcome_element_nl.style.display = 'none';
            stopGame();
        }, 100000); // 100000 milliseconds (10 seconds)
        return;
    }
    //May have to move this invocation 
    updateMob();
    updateMob2();
    updateMob3();
    // Collisions
    if (
        player.x < mob.x + mob.width &&
        player.x + player.width > mob.x &&
        player.y < mob.y + mob.height &&
        player.y + player.height > mob.y
      )  {stopGame(); showLoseMessage(); return;} // If the player collides with the mob, restart the game)}
    if (
        player.x < mob2.x + mob2.width &&
        player.x + player.width > mob2.x &&
        player.y < mob2.y + mob2.height &&
        player.y + player.height > mob2.y
      )  {stopGame(); showLoseMessage(); return;} 
    if (
        player.x < mob3.x + mob3.width &&
        player.x + player.width > mob3.x &&
        player.y < mob3.y + mob3.height &&
        player.y + player.height > mob3.y
      )  {stopGame(); showLoseMessage(); return;}
    // Draw background on canvas 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Draw background tiles
    for (let r = 0; r < 50; r += 1) {
        for (let c = 0; c < 65; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage, tileCol * tileSize, tileRow * tileSize,
                    tileSize, tileSize, c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }
    
    //Draw player 
    context.drawImage(playerImage,
        player.width * player.frameX, player.height * player.frameY, player.width, player.height,
        player.x, player.y, player.width, player.height);
    if ((moveLeft || moveRight) &&
        !(moveRight && moveLeft) ) {
        player.frameX = (player.frameX + 1) % 4;
    }
    if ((moveUp || moveDown) &&
    !(moveDown && moveUp) ) {
    player.frameX = (player.frameX + 1) % 4;
    }
    //Draw Mob
    context.drawImage(mobImage, mob.x, mob.y, mob.width, mob.height);
    if ((moveLeft || moveRight) &&
        !(moveRight && moveLeft) ) {
        player.frameX = (player.frameX + 1) % 4;
    }
    if ((moveUp || moveDown) &&
    !(moveDown && moveUp) ) {
    player.frameX = (player.frameX + 1) % 4;
    }
    //Draw Mob2
    context.drawImage(mob2Image, mob2.x, mob2.y, mob2.width, mob2.height);
    if ((moveLeft || moveRight) &&
        !(moveRight && moveLeft) ) {
        player.frameX = (player.frameX + 1) % 4;
    }
    if ((moveUp || moveDown) &&
        !(moveDown && moveUp) ) {
        player.frameX = (player.frameX + 1) % 4;
    }
    //Draw Mob3
    context.drawImage(mob3Image, mob3.x, mob3.y, mob3.width, mob3.height);
    if ((moveLeft || moveRight) &&
        !(moveRight && moveLeft) ) {
        player.frameX = (player.frameX + 1) % 4;
    }
    if ((moveUp || moveDown) &&
    !(moveDown && moveUp) ) {
    player.frameX = (player.frameX + 1) % 4;
    }
    // Draw the timer 
    let currentTime = Date.now();
    let elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
    context.fillStyle = "white";
    context.font = "24px Arial";
    context.fillText("Time: " + elapsedTime.toFixed(2) + "s", 10, 30);
    // Handle Key presses 
    if (moveLeft) {
        // player.xChange = -2;
        player.xChange = player.xChange - 0.5;
        player.frameY = 3;
    }
    if (moveRight) {
        // player.xChange = -2;
        player.xChange = player.xChange + 0.5;
        player.frameY = 1;
    }
    if (moveUp) {
        player.yChange = player.yChange - 0.5;
        player.frameY = 4;
    }
    if (moveDown) {
        player.yChange = player.yChange + 0.5;
        player.frameY = 2;
    }
    // Update the player 
    player.x += player.xChange;
    player.y += player.yChange;
    // Boundary Checks 
    // Check left boundary
    if (player.x < 0) {
        player.x = 0;
    }
    // Check right boundary
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    // Check top boundary
    if (player.y < 0) {
        player.y = 0;
    }
    // Check bottom boundary
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
    // Physics      
    let friction = 0.9;    
    player.xChange *= friction;       // Apply friction to the horizontal movement
    player.yChange *= friction;       // Apply friction to the vertical movement
    //Going left or right , up or down
    if (player.x + player.width < 0) {
        player.x = canvas.width;
    } else if (player.x > canvas.width) {
        player.x = -player.width;
    }
    if (player.y + player.width < 0) {
        player.y = canvas.width;
    } else if (player.y > canvas.width) {
        player.y = -player.width;
    }
    if (gameRunning) {
      requestAnimationFrame(draw);
    }
}
function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown")
        moveDown = true;
}
function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowDown")
        moveDown = false;
}
function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function () {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}
