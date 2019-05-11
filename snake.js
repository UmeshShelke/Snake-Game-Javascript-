

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const ctx1 = cvs.getContext("2d");


const box = 32;
var h = 350;


// const ground = new Image();
// ground.src = "img/ground.png";

// const foodImg = new Image();
// foodImg.src = "img/food.png";
const ground = document.getElementById('ground');

const foodImg = document.getElementById('food');

const foodImg1 = new Image();
foodImg1.src = "img/food1.png"


let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";



let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};



let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

//let food1 ;

let food1 = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

let score = 0;



let d;
document.getElementById("demo").onclick = function() {Start()};
document.addEventListener("keydown",direction);


function Start()
{
    
    location.reload();
}

function checkscore(score){
    if(localStorage.getItem('highscore') === null){
        
        localStorage.setItem('highscore',score);
    } else {
       
        if(score > localStorage.getItem('highscore')){
            localStorage.setItem('highscore',score);
        }
    }
    
    $('#high_score').html('High Score: '+localStorage.highscore);
    
    var text = " High Score: " + localStorage.highscore;
    ctx.font = "35px Changa one";
    ctx.fillStyle = 'white';
    //ctx.fillText(score_text, 2*box,1.6*box);
    ctx.fillText(text, 12*box,1.6*box);
 
    var score_text = "Score: " + score;
    ctx.font = "35px Changa one";
    ctx.fillStyle = 'white';
    ctx.fillText(score_text, 2*box,1.6*box);
     
}


function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}


			

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
            
           
            
        }
    }
    return false;
    
}

// var scoreText = function() {
//     var score_text = "Score: " + score;
//     ctx.font = "35px Changa one";
//     ctx.fillStyle = 'white';
//     ctx.fillText(score_text, 2*box,1.6*box);
//     //ctx.fillText(score,);
//   }

// function draw1(){

//     ctx.drawImage(foodImg, food.x, food.y);
    
// }

// function draw2()
// {
//     ctx.drawImage(foodImg1, food1.x, food1.y);
// }

// function draw0()
// {

//     ctx.drawImage(foodImg, food.x, food.y);
// }
function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i % 2== 0 )? "green" : "yellow";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
     //ctx.drawImage(foodImg1, food1.x, food1.y);
    // ctx.clearRect(20, 20, 100, 50);
   
    
    checkscore(score);
    
    
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
   
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
     
    
    if( snakeX == food.x && snakeY == food.y) {
        ctx.clearRect(food.x,food.y, foodImg.width ,foodImg.height );
        score++;
       //setInterval(draw2,900);
        eat.play();
        ctx1.drawImage(foodImg1, food1.x, food1.y);
        food1 = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }

      //  ctx.clearRect(food.x,food.y, foodImg.width ,foodImg.height );

        // food = {
        //     x : Math.floor(Math.random()*17+1) * box,
        //     y : Math.floor(Math.random()*15+3) * box
        // }

        // food1 = {
        //     x : Math.floor(Math.random()*17+1) * box,
        //     y : Math.floor(Math.random()*15+3) * box
       
        // }
      
    }
    else if (snakeX == food1.x && snakeY == food1.y)
    {   
        score=score+5;
  
        eat.play();
       
        food= {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }
    
    else{
    
        snake.pop();
        
        
    }
    
    
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
  
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
    clearInterval(game);
    ctx.fillText('Game over 😁',7*box,6.5*box );
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
        $('#final_score').html(score);
			
			$('#overlay').fadeIn(300);
        
        dead.play();
    }
    
    snake.unshift(newHead);
    
    
    
}



let game = setInterval(draw,200);

//let game2 = setInterval(draw0,900);
let game3 = setInterval(checkscore(score),100);








// To move the snake:
// snake.pop(); // we remove the tail
// snake.unshift(newHead); // we add a new head in the new position based on the direction.

// To make the snake bigger :
// we don't remove the tail, so we skip : snake.pop();
// but we add a new head : snake.unshift(newHead);﻿
 













