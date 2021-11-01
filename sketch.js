let game, rez = 20;
let tmpobstacle = [0,0,0,0]

let restartButton;

function newGame() {
    game = new Game(width, height, rez);
    frameRate(20);
    loop();
}

function setup() {
    createCanvas(windowWidth, windowHeight - 50);
    restartButton = createButton("Restart");
    restartButton.mousePressed(newGame);
    newGame();
}

function draw() {
    scale(rez);
    background(0);


    if(mouseIsPressed) {
        tmpobstacle[2] = (floor(mouseX / rez) - tmpobstacle[0]);
        tmpobstacle[3] = (floor(mouseY / rez) - tmpobstacle[1]);

        fill(0, 255, 0);
        noStroke();
        rect(tmpobstacle[0], tmpobstacle[1], tmpobstacle[2], tmpobstacle[3]);
    }

    game.update();
    game.show();

    if(game.over()) {
        textSize(3);
        textAlign(CENTER, CENTER);

        text('You Dead, Beech!!', game.w/2, game.h/2);
        noLoop();
    }

}


function keyPressed() {
    if(keyCode == LEFT_ARROW) {
        game.snake.go('left');
    } else if (keyCode == RIGHT_ARROW) {
        game.snake.go('right');
    } else if (keyCode == UP_ARROW) {
        game.snake.go('up');
    } else if (keyCode == DOWN_ARROW) {
        game.snake.go('down');
    }
}



function mousePressed() {
    tmpobstacle[0] = floor(mouseX / rez);
    tmpobstacle[1] = floor(mouseY / rez);
}


function mouseReleased() {
    tmpobstacle[2] = (floor(mouseX / rez) - tmpobstacle[0]);
    tmpobstacle[3] = (floor(mouseY / rez) - tmpobstacle[1]);

    game.addObstacle(tmpobstacle);
}