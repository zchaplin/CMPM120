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
        this.load.audio('weow', 'assets/weow.wav');
        this.load.audio('bounce', 'assets/bounce.wav');
    }
    
    create() {
        ball = this.physics.add.image(0, 300, 'ball');
        ball.setScale(.5);
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(60, 150);
        timeScale = 1;
        // Record the start time
        startTime = this.time.now;
        var text1 = this.add.text(600, 100, 'ME', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        text1.alpha = 0;
    
        var text2 = this.add.text(440, 100, 'Immersion', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        text2.alpha = 0;
    
        var text3 = this.add.text(240, 100, 'Tottal', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        text3.alpha = 0;
        const sound = this.sound.add('bounce');
        this.time.addEvent({
            delay: 1000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                sound.play();
            },
            loop: false
        });
        //this.sound.play('bounce');
        var tween1 = this.tweens.add(
            {
                targets: text3,
                alpha: 1,
                duration: 3500,
                ease: 'Power2',
                delay: 1000,
                //onComplete: this.playSound
            });
        tween1.on('complete', () => {
                const sound = this.sound.add('bounce');
                sound.play();
        });
        //tween1.onComplete.add(playSound, this);
        var tween2 = this.tweens.add(
            {
                targets: text2,
                alpha: 1,
                duration: 3700,
                ease: 'Power2',
                delay: 4500
            });
        tween2.on('complete', () => {
                const sound = this.sound.add('bounce');
                sound.play();
        });
        var tween3 = this.tweens.add(
            {
                targets: text1,
                alpha: 1,
                duration: 3600,
                ease: 'Power2',
                delay: 8200
        });
        tween3.on('complete', () => {
            const sound = this.sound.add('bounce');
            sound.play();
    });
            const self = this;
            this.time.addEvent({
            delay: 13000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                self.scene.start('midScene');
            },
            loop: false
        });

    }
    
    update(time, delta) {
        this.physics.world.timeScale  = timeScale;
    }
    playSound() {
        this.sound.play('bounce');
    }
    
}
class midScene extends Phaser.Scene {
    constructor() {
        super({ key: 'midScene' });
    }
    preload() {
        // Load the assets needed for the game scene
        this.load.audio('loud', 'assets/Loud.wav');
        this.load.image('ball', 'assets/BALL.png');
        this.load.image('Clock1', 'assets/Clock1.png');
        this.load.image('CLock2', 'assets/CLock2.png');
        this.load.image('Clock3', 'assets/Clock3.png');
    }

    create() {
        var text1 = this.add.text(50, 50, 'When two travelers pass each other\nare they not both going forward to \nthemselves… ', { fontSize: '32px', fill: '#fff' }).setScale(0.75);
        var text2 = this.add.text(100, 500, 'But backwards to each other…', { fontSize: '32px', fill: '#fff' }).setScale(0.75);
        text2.setVisible(false);
        const ball = this.add.sprite(-50, 300, 'ball');
        ball.setScale(.5);
        // Create a tween to move the ball to its initial position over 2 seconds
        this.tweens.add({
            targets: ball,
            x: 350,
            duration: 2000
        });
        var sound1 = this.sound.add('loud');
        var image1 = this.add.image(500, 300, 'Clock1');
        var image2 = this.add.image(600, 300, 'CLock2').setVisible(false);
        var image3 = this.add.image(700, 400, 'Clock3').setVisible(false);

        this.time.addEvent({
            delay: 2000, // time to wait before showing image2 (in milliseconds)
            callback: function() {
                image1.setVisible(false);
                image2.setVisible(true);
            },
        loop: false
        });
 
        this.time.addEvent({
            delay: 3000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                image2.setVisible(false);
                image3.setVisible(true);
            },
            loop: false
        });
        this.time.addEvent({
            delay: 4000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                sound1.play();
                text2.setVisible(true);
            },
            loop: false
        });
        this.time.addEvent({
            delay: 6000,
            callback: function() {
                image3.setVisible(false);
                image2.setVisible(true);
            },
        loop: false
        });

        this.time.addEvent({
            delay: 7000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                image2.setVisible(false);
                image1.setVisible(true);
            },
            loop: false
        });
        this.tweens.add({
            targets: ball,
            x: -50,
            duration: 2000,
            delay: 7000
        });
        const self = this;
        this.time.addEvent({
            delay: 9000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                self.scene.start('thirdScene');
            },
            loop: false
        });
        
        
    }   
    
    update(time, delta) {
    }
}
class thirdScene extends Phaser.Scene {
    constructor() {
        super({ key: 'thirdScene' });
    }
    preload() {
        // Load the assets needed for the game scene
        this.load.image('ball', 'assets/BALL.png');
        this.load.audio('bounce', 'assets/bounce.wav');
        this.load.audio('weow', 'assets/weow.wav');
    }

    create() {
        this.time.delayedCall(3000, this.playSound, [], this);
        ball = this.physics.add.image(800, 300, 'ball');
        ball.setScale(.5);
        ball.setBounce(1);
        ball.setCollideWorldBounds(true);
        ball.setVelocity(-60, 150);
        timeScale = .5;
        // Record the start time
        startTime = this.time.now;
        // Create the text objects with alpha set to 0
        var text1 = this.add.text(600, 100, 'ME', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        text1.alpha = 0;
    
        var text2 = this.add.text(440, 100, 'Immersion', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        text2.alpha = 0;
    
        var text3 = this.add.text(240, 100, 'Tottal', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        text3.alpha = 0;
    
        var sound1 = this.sound.play('weow'); // add delay of 4000 milliseconds
        //var sound2 = this.sound.play('weow');
       // sound1.play();
        //sound1.play();
        const sound = this.sound.add('bounce');
        this.time.addEvent({
            delay: 500, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                sound.play();
            },
            loop: false
        });
        this.time.addEvent({
            delay: 1800, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                sound.play();
            },
            loop: false
        });
        this.time.addEvent({
            delay: 3200, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                sound.play();
            },
            loop: false
        });
        this.tweens.add(
            {
                targets: text1,
                alpha: 1,
                duration: 2000,
                ease: 'Power2'
            });
        //tweens.onComplete.add(playSound, this);
        this.tweens.add(
            {
                targets: text2,
                alpha: 1,
                duration: 2000,
                ease: 'Power2',
                delay: 2000
            });
        this.tweens.add(
            {
                targets: text3,
                alpha: 1,
                duration: 2000,
                ease: 'Power2',
                delay: 4000
            });
            const self = this;
        this.time.addEvent({
            delay: 5000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                self.scene.start('endScene');
            },
            loop: false
        });
    }
    update(time, delta) {
        
        this.physics.world.timeScale  = timeScale;
    }
    playSound() {
        this.sound.play('bounce');
      }
      
}
class endScene extends Phaser.Scene {
    constructor() {
        super({ key: 'endScene' });
    }

    preload() {
        // Load the assets needed for the start screen
        this.load.image('time', 'assets/TIME.png');
    }

    create() {
        // Set the alpha of the scene to 0
        this.cameras.main.setAlpha(0);

        this.add.text(400, 250, 'What is', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.add.image(560, 250, 'time').setScale(.3);

        // Add a button to start the game
        var startButton = this.add.text(400, 350, 'Take Control', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        startButton.setVisible(false);
        startButton.setInteractive();
        startButton.on('pointerdown', function() {
            this.scene.start('gameScene');
        }, this);

        // Add a tween to gradually increase the alpha of the scene to 1
        this.tweens.add({
            targets: this.cameras.main,
            alpha: 1,
            duration: 4000,
            ease: 'Linear'
        });
        this.time.addEvent({
            delay: 5000, // time to wait before showing image3 (in milliseconds)
            callback: function() {
                startButton.setVisible(true);
            },
            loop: false
        });
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.strokeRect(startButton.x - startButton.width / 2, startButton.y - startButton.height / 2, startButton.width, startButton.height);
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.strokeCircle(400, 300, 300);
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
    scene: [ StartScene, GameScene,thirdScene,midScene,endScene ]
};

// Create a new game with the configuration
var game = new Phaser.Game(config);