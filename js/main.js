let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');
for (let i = 1; i < 101; i++) {
    let excel = document.createElement('div');
    field.appendChild(excel);
    excel.classList.add('excel');
}
let excel = document.querySelectorAll('.excel');
let i = 0;

for (let y = 10; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }

}

function generateSnake() {
    let posX = Math.round(Math.random() * (10 - 3) + 3);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
}
let coordinates = generateSnake();

let snakeBody = [document.querySelector(`[posx="${coordinates[0]}"][posy="${coordinates[1]}"]`), document.querySelector(`[posx="${coordinates[0]-1}"][posy="${coordinates[1]}"]`), document.querySelector(`[posx="${coordinates[0]-2}"][posy="${coordinates[1]}"]`)];
for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add('snake-body');
}
snakeBody[0].classList.add('snake-head');

let mouse;

function createMouse() {
    function generateMouse() {

        let posX = Math.round(Math.random() * (10 - 3) + 3);
        let posY = Math.round(Math.random() * (10 - 1) + 1);
        return [posX, posY];
    }
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector(`[posx="${mouseCoordinates[0]}"][posy="${mouseCoordinates[1]}"]`);
    while (mouse.classList.contains('snake-body')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector(`[posx="${mouseCoordinates[0]}"][posy="${mouseCoordinates[1]}"]`);
    }
    mouse.classList.add('mouse');
}
createMouse();
let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.style.cssText = `margin: auto;margin-top:40px;font-size: 20px;display: block;`;

let score = 0;
input.value = `Ваши очки: ${score}`;

function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posx'), snakeBody[0].getAttribute('posy')]
    snakeBody[0].classList.remove('snake-head');
    snakeBody[snakeBody.length - 1].classList.remove('snake-body');
    snakeBody.pop();

    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCoordinates[0]+1}"][posy="${+snakeCoordinates[1]}"]`));
        } else {
            snakeBody.unshift(document.querySelector(`[posx="1"][posy="${+snakeCoordinates[1]}"]`));
        } 
    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCoordinates[0]-1}"][posy="${+snakeCoordinates[1]}"]`));
        } else {
            snakeBody.unshift(document.querySelector(`[posx="10"][posy="${+snakeCoordinates[1]}"]`));
        } 
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCoordinates[0]}"][posy="${+snakeCoordinates[1]+1}"]`));
        } else {
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCoordinates[0]}"][posy="1"]`));
        } 
    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCoordinates[0]}"][posy="${+snakeCoordinates[1]-1}"]`));
        } else {
            snakeBody.unshift(document.querySelector(`[posx="${+snakeCoordinates[0]}"][posy="10"]`));
        } 
    }

    if (snakeBody[0].getAttribute('posx') == mouse.getAttribute('posx') && snakeBody[1].getAttribute('posy') == mouse.getAttribute('posy')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length-1].getAttribute('posx');
        let b = snakeBody[snakeBody.length-1].getAttribute('posy');
        snakeBody.push(document.querySelector(`[posx="${a}"][posy="${b}"]`));
        createMouse();
        score ++;
        input.value = `Ваши очки: ${score}`;
        
    }
if (snakeBody[0].classList.contains('snake-body')) {
    setTimeout(() => {
        alert(`Игра окончена! Ваши очки: ${score}`);
    }, 200);
    
    clearInterval(interval);
    snakeBody[0].style.background = 'green';
}
    snakeBody[0].classList.add('snake-head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snake-body');
    }
    steps = true;
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', function(e) {
    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        }
        if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        }
        if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        }
        if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }

});