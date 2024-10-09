let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

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

let healthBar = {
    width: 24,
    height: 32,
    maxHealth: 100,
    maxWidth: healthBar.width,
    health: healthBar.maxHealth,
    healthBarX : player.x,
    healthBarY : player.y - healthBar.height - 5
};


// Function to update the player's health
function updatePlayerHealth() {
    // Update player's health (insert your code here)
    healthBar.width = (healthBar.health / healthBar.maxHealth) * healthBar.maxWidth;
    // Check if the player and mob are colliding
    if (
      player.x < mob.x + mob.width &&
      player.x + player.width > mob.x &&
      player.y < mob.y + mob.height &&
      player.y + player.height > mob.y
    ) {
      // Reduce player's health when there is a collision
      healthBar.health -= 20; 
    }
    // Calculate health bar position relative to the player
    healthBar.healthBarX = player.x - (healthBar.width / 2); // Position the health bar horizontally relative to the player's center
    healthBar.healthBarY = player.y - 10; // Position the health bar vertically above the player
  
    // Ensure that the health bar stays within the canvas
    if (healthBar.healthBarX < 0) {
        healthBar.healthBarX = 0;
    } else if (healthBar.healthBarX + healthBarWidth > canvasWidth) {
        healthBar.healthBarX = canvasWidth - healthBarWidth;
    }
  
    if (healthBar.healthBarY < 0) {
        healthBar.healthBarY = 0;
    } else if (healthBar.healthBarY + healthBarHeight > canvasHeight) {
        healthBar.healthBarY = canvasHeight - healthBarHeight;
    }
    // Draw health bar
    context.fillStyle = 'gray';
    context.fillRect(healthBar.healthBarX, healthBar.healthBarY, healthBar.width, healthBar.height);
    
    let currentHealthWidth = (healthBar.health / 100) * healthBar.width;
 
    // Draw the current health bar
    context.fillStyle = 'green';
    context.fillRect(healthBar.healthBarX, healthBar.healthBarY, currentHealthWidth, healthBar.height);

    // Draw the current health level
    context.fillStyle = 'red';
    context.fillRect(player.x, player.y - 10, currentHealthWidth, 5)
}
  
let mob = {
    x: 0,
    y: 0,
    width: 48,
    height: 56,
    frameX: 0,
    frameY: 0,
    speed: 4,
  };

function generateRandomPosition() {
    mob.x = Math.random() * (canvas.width - mob.width);
    mob.y = Math.random() * (canvas.height - mob.height);
}


function updateMob() {
    // Calculate the direction from the mob to the player
    let dx = player.x - mob.x;
    let dy = player.y - mob.y;
    
    // Normalize the direction vector
    let distance = Math.sqrt(dx * dx + dy * dy);
    let directionX = dx / distance;
    let directionY = dy / distance;
    
    // Move the mob towards the player by multiplying the direction vector by the mob's speed
    mob.x += directionX * mob.speed * 0.65;
    mob.y += directionY * mob.speed * 0.55;
    
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

//Music 
let backgroundMusic = new Audio('battleThemeA.mp3');
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowUp') {
        backgroundMusic.play();
    }
});

let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

let playerImage = new Image();
let backgroundImage = new Image();
let mobImage = new Image();

let tilesPerRow = 10;
let tileSize = 10;

let background =
    [   [63,64,65,66,67,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68],
        [73,74,75,76,77,78,78,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
        [83,84,85,86,87,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88,88],
    ];

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    player.x = canvas.width / 2;
    player.y = canvas.height - player.height;

    generateRandomPosition(); // Set initial position of the mob

    playerImage.src = "devil/devil.png";
    backgroundImage.src = "tiles.png";
    mobImage.src = "crabs.png";

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    //draw();
    load_assets([
        { "var": playerImage, "url": "devil.png" },
        { "var": backgroundImage, "url": "tiles.png" },
        { "var": mobImage, "url": "crabs.png" }
    ], draw);
}


function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Draw background on canvas 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#87cefa";// light blue sky 
    context.fillRect(0, 0, canvas.width, canvas.height);
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

    updateMob();
    
    updatePlayerHealth();

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

    // Update the other objects 
    
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
    player.yChange *= friction;

    //Collisions 


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

