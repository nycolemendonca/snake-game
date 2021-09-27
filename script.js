let canvas = document.getElementById("snake"); // cria o elemento que vai rodar o jogo 
let context = canvas.getContext("2d"); // renderiza o elemento do canvas em um plano 2d 
let box = 32;
let snake = []; // criar cobrinha como lista, pois ela será composta de uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

let direction = "right"; // determina a direção da snake
let food ={
    x: Math.floor(Math.random() * 15 + 1 * box), 
    y: Math.floor(Math.random() * 15 + 1 * box)
}

function criarBG(){
    context.fillStyle = "lightgreen"; // cor do plano 2d que contém o jogo
    context.fillRect (0, 0, 16 * box, 16 * box); // desenha o retângulo usando x e y e a largura e a altura setadas
}

function criarSnake(){
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green"; // cor snake 
        context.fillRect (snake[i].x, snake[i].y, box, box); // tamanho snake
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// ao apertar uma tecla, o addEventListener vai chamar o update a vai passar como evento de tecla os números 37,38,39,40.
document.addEventListener('keydown', update); // keydown = evento de click. em todo click haverá um update

function update(event){
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down'; 
}

function iniciarJogo(){
    if(snake[0].x > 15*box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(');
        } 
    }

    criarBG();
    criarSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food){
        snake.pop(); 
    }
    else{
        food.x = Math.floor(Math.random() * 15 +1 * box);
        food.y = Math.floor(Math.random() * 15 +1 * box);
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // método unshift adiciona como primeiro pixel o da cobrinha
}

let jogo = setInterval(iniciarJogo, 100); // a cada 100 ms, a function iniciarJogo é atualizada