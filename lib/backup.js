// Define the different scenes
class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'startScene' });
    }

    preload() {
        // Load the assets needed for the start screen
        //this.load.image('background', 'assets/background.png');
    }

    create() {
        // Add the background image
        //this.add.image(400, 300, 'background');

        // Add the text for the start screen
        this.add.text(400, 250, 'What is TIME?', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // Add a button to start the game
        var startButton = this.add.text(400, 350, 'START', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', function() {
            this.scene.start('gameScene');
        }, this);
    }
}
var ball;
var startTime;
var timeScale;
let once = 0;
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'gameScene' });
    }

    preload() {
        // Load the assets needed for the game scene
        this.load.image('ball', 'assets/BALL.png');
    }

    create() {
        ball = this.physics.add.image(0, 300, 'ball');
        ball.setScale(.5);
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);

        // Record the start time
        startTime = this.time.now;
        this.add.text(400, 100, 'Tottal Immersion Me', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        var startButton = this.add.text(400, 350, 'START', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', function() {
            this.scene.start('thirdScene');
        }, this);

    }

    update(time, delta) {
        if (once == 0) {
            once = 1;
            ball.setVelocity(60, 150);
            timeScale = 1;
        }
        // Slow down the update function based on the time scale factor
        if (time > startTime + 7500) {
            timeScale = 2.5;
        }
        if (time > startTime + 10000) {
            timeScale = 1;
        }
        this.physics.world.timeScale  = timeScale;
    }
}
class thirdScene extends Phaser.Scene {
    constructor() {
        super({ key: 'thirdScene' });
    }
    preload() {
        // Load the assets needed for the game scene
        this.load.image('ball', 'assets/BALL.png');
    }

    create() {
        ball = this.physics.add.image(800, 300, 'ball');
        ball.setScale(.5);
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);

        // Record the start time
        startTime = this.time.now;
        this.add.text(400, 100, 'Tottal Immersion Me', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    }
    update(time, delta) {
        if (once == 1) {
            once = once + 1;
            ball.setVelocity(-60, 150);
            timeScale = 1;
        }
        // Slow down the update function based on the time scale factor
        if (time > startTime + 7500) {
            timeScale = 2.5;
        }
        if (time > startTime + 10000) {
            timeScale = 1;
        }
        this.physics.world.timeScale  = timeScale;
    }
}
// Define the configuration for the game
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [ StartScene, GameScene,thirdScene ]
};

// Create a new game with the configuration
var game = new Phaser.Game(config);