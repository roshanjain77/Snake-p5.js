class Game {

    constructor(width, height, rez) {
        this.snake = new Snake();
        this.food = createVector();

        this.rez = rez;
        this.w = floor(width / rez);
        this.h = floor(height/ rez);

        this.obstacles = []

        this.newFood();
    }

    update() {
        this.snake.update();
        this.boundaryCase();
        if(this.snake.eat(this.food)) {
            this.newFood();
        }
    }

    boundaryCase() {
        let head = this.snake.getHead();
        head.x = (head.x % this.w + this.w) % this.w;
        head.y = (head.y % this.h + this.h) % this.h;
        this.snake.body[0] = head;
    }

    isValidLocation(loc) {
        for(let obstacle of this.obstacles) {
            let x1 = obstacle[0], x2 = obstacle[0]+obstacle[2], y1 = obstacle[1], y2 = obstacle[1] + obstacle[3];
            let x = loc.x, y = loc.y;

            if( (x1 - x) * (x2 - x) < 0 && (y1 - y) * (y2 - y) < 0 ) return false;
        }

        return true;
    }

    newFood() {
        this.food.x = floor(random(this.w));
        this.food.y = floor(random(this.h));
        while(!this.isValidLocation(this.food)) {
            this.food.x = floor(random(this.w));
            this.food.y = floor(random(this.h));
        }
        print("New location: ")
        print(this.food, this.w, this.h);
    }

    over() {
        return this.snake.isDead() || !this.isValidLocation(this.snake.getHead());
    }

    addObstacle(obstacle) {
        if(obstacle[2] != 0 && obstacle[3] != 0) {
            this.obstacles.push([obstacle[0], obstacle[1], obstacle[2], obstacle[3]]);
        }
    }

    showObstacles() {
        fill(125);
        noStroke();
        for(let obstacle of this.obstacles) {
            rect(obstacle[0], obstacle[1], obstacle[2], obstacle[3]);
        }
    }

    showFood() {
        fill(255, 0, 0);
        noStroke();
        rect(this.food.x, this.food.y, 1, 1);
    }

    show() {
        this.snake.show();
        this.showObstacles();
        this.showFood();
    }

}