class Snake {
    constructor() {
        this.body = [createVector(0, 0)];
        this.dir = createVector(1, 0);
        this.lastCell;
    }

    grow() {
        this.body.push(this.lastCell);
    }

    eat(food) {
        if(food.x == this.body[0].x && food.y == this.body[0].y) {
            this.grow();
            return true;
        }
        return false;
    }

    updateDir(x, y) {
        if(this.dir.x == -x && this.dir.y == -y) return;
        this.dir.x = x;
        this.dir.y = y;
    }

    go(dir) {
        if(dir == 'left') {
            this.updateDir(-1, 0);
        } else if(dir == 'right') {
            this.updateDir(1, 0);
        } else if(dir == 'up') {
            this.updateDir(0, -1);
        } else if(dir == 'down') {
            this.updateDir(0, 1);
        }
    }

    update() {
        this.body.unshift(createVector(this.body[0].x + this.dir.x, this.body[0].y + this.dir.y));
        this.lastCell = this.body.pop();
    }

    isDead() {
        for(let i = 1; i < this.body.length; i++) {
            if(this.body[0].x == this.body[i].x && this.body[0].y == this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    getHead() {
        return this.body[0];
    }

    show() {
        fill(255);
        noStroke();
        for(let cell of this.body) {
            rect(cell.x, cell.y, 1, 1);
        }
    }

}

