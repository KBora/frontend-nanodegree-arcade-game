// ---------------- ENEMY CLASS ---------------- //
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * this.speed) ;
    if( !Enemy.prototype.insideBoard(this.x)) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.randomSpeed = function() {
    return 4 * (Math.random() * (20 - 1) + 1);
}

Enemy.prototype.randomXStartPosition = function() {
    return -(Math.random() * (200 - 100) + 100);
}

Enemy.prototype.reset = function() {
   // this.x = -(Math.random() * (200 - 100) + 100);
    this.x = this.randomXStartPosition();
    this.speed = this.randomSpeed();
}


Enemy.prototype.insideBoard = function(newX) {
    if (newX > 510) return false;
    return true;
}

// ---------------- PLAYER CLASS ---------------- //
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
};
Player.prototype.update = function(x, y) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        this.x = x;
        this.y = y;
    }
}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(keyPressed) {
    var newX, newY;

    switch (keyPressed) {
        case 'up':
            newY = this.y - 83;
            newX = this.x;
            break;
        case 'down':
            newY = this.y + 83;
            newX = this.x;
            break;
        case 'left':
            newX = this.x - 101;
            newY = this.y;
            break;
        case 'right':
            newX = this.x + 101;
            newY = this.y;
            break;
        default:
            newX = this.x;
            newY = this.y;
    }


    if (this.reachWater(newX, newY)) {
        game.updateScore(10);
        this.reset();
    }
    else {
        if (this.insideBoard(newX, newY)) {
            this.update(newX, newY);
        }  else {
            console.log('new coordinates will move sprite off board');
        }
    }


}
Player.prototype.insideBoard = function(newX, newY) {
    if (newX < 0 || newX > 404) return false;
    if (newY < -12 || newY > 402) return false;
    return true;
}
Player.prototype.reachWater = function(newX, newY) {
    if (newX >= 0 && newX <=404) {
        if (newY <= -12) {
            return true;
        } 
    }
    return false;
}
Player.prototype.reset = function() {
    this.update(202, 402);
    // 202, 383
}

// ---------------- GAME CLASS ---------------- //
// For keeping score
var Game = function() {
    this.score = 0;
};

Game.prototype.updateScore = function(amount) {
    var updatedScore = this.score + amount;
    updatedScore = updatedScore < 0 ? 0 : updatedScore;
    this.score = updatedScore;
}
Game.prototype.displayScore = function(ctx) {
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.font = "bold 26px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(this.score, 495, 80);
    ctx.font = "normal 18px sans-serif";
    ctx.fillText("Score:", 495, 60);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var enemy1 = new Enemy(Enemy.prototype.randomXStartPosition(), 63, Enemy.prototype.randomSpeed() );
var enemy2 = new Enemy(Enemy.prototype.randomXStartPosition(), 146, Enemy.prototype.randomSpeed() );
var enemy3 = new Enemy(Enemy.prototype.randomXStartPosition(), 229, Enemy.prototype.randomSpeed() );

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

var player = new Player();

var game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
