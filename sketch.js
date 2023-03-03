var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, bullet;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup, bulletGroup;

var score = 0;
var life = 3;
var bullets = 60;

var heart1, heart2, heart3

var gameState = "fight"

var lose, winning, explosionSound;


function preload(){
  bgImg = loadImage("./assets/bg.jpeg");
  shooterImg = loadImage("./assets/shooter_2.png");
  shooter_shooting = loadImage("./assets/shooter_3.png");
  zombieImg = loadImage("./assets/zombie.png");

  heart1Img = loadImage("./assets/heart_1.png");
  heart2Img = loadImage("./assets/heart_2.png");
  heart3Img = loadImage("./assets/heart_3.png");

  lose = loadSound("./assets/lose.mp3");
  winning = loadSound("./assets/win.mp3");
  explosionSound = loadSound("./assets/explosion.mp3");
 

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding background
  bg = createSprite(windowWidth - 700, windowHeight - 120, width/2, height/2);
  bg.addImage('back', bgImg);
  bg.scale = 1.1;

  //adding the player sprite
  player = createSprite(windowWidth - 1100, windowHeight - 200, width/2 - 550 , height/2 - 100);
  player.addImage(shooterImg);
  player.scale = 0.3;
  //player.debug = true;
  player.setCollider("rectangle", 0, 0, 300, 300);

  //adding heart sprites
  heart1 = createSprite(windowWidth - 150, 40, 20, 20);
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4;
    
  heart2 = createSprite(windowWidth - 150, 40, 20, 20);
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(windowWidth - 150, 40, 20, 20);
  heart3.visible = false;
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4;

  //creating groups  
  bulletGroup = new Group();
  zombieGroup = new Group();

    

}

function draw() {
  background(0); 


if(gameState === "fight"){

  //displaying hearts
  if(life === 1){
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  }
  if(life === 2){
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = false;
  }
  if(life === 3){
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = true;
  }

  
  if(life === 0){
    gameState = "lost";
    
  }


  
  if(score === 100){
    gameState = "won";
    winning.play();
  }

  //moving the player up and down
if(keyDown("UP_ARROW")){
  player.y = player.y-30;
}
if(keyDown("DOWN_ARROW")){
 player.y = player.y+30;
}

if(zombieGroup.x < 0){
  lose.play();
 

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].x < 0){
        zombieGroup[i].destroy();
       
       life -= 1;
        } 
  
  }
}


//release bullets and change the image of shooter
if(keyWentDown("space")){
  bullet = createSprite(windowWidth-1150,player.y-30,10,5);
  bullet.velocityX = 35;
  
  bulletGroup.add(bullet);
  player.depth = bullet.depth;
  player.depth = player.depth+2;
  player.addImage(shooter_shooting);
  bullets = bullets-1;
  explosionSound.play();
}
else if(keyWentUp("space")){
  player.addImage(shooterImg);
}


if(bullets === 0){
  gameState = "over"
  lose.play();
    
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        explosionSound.play();
 
        score = score+2;
        } 
  
  }
}

//reduce life and destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 
   lose.play();
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy();
      
      life -= 1;
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}




drawSprites();

//displaying the score and remaining lives and bullets
textSize(20)
  fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("Score = " + score,displayWidth-200,displayHeight/2-220)
text("Lives = " + life,displayWidth-200,displayHeight/2-280)

//destroy zombie and player and display a message in gameState "lost"
if(gameState === "lost"){
  
  textSize(100)
  fill("red")
  text("You Are Dead! ",400,300)
  zombieGroup.destroyEach();
  player.destroy();

  heart1.visible = false;
}

//destroy zombie and player and display a message in gameState "won"
else if(gameState === "won"){
 
  textSize(100)
  fill("yellow")
  text("You Killed All Of Them! ",200,300)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState === "over"){
 
  textSize(50)
  fill("blue")
  text("You Ran Out Of Bullets!",400,290);
  textSize(60);
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount % 50 === 0){

    
    zombie = createSprite(1370,random(100,500),40,40);

    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -7;
   // zombie.debug= true;
    zombie.setCollider("rectangle",0,0,400,900);
   
    zombie.lifetime = 400;
   zombieGroup.add(zombie);
  }
 drawSprites();
}
