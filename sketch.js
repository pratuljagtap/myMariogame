var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backGround,ground,groundImage;
var mario 
var coinImage,coinGroup;
var score=0;

function preload(){
 backGround = loadImage("IMAGES/BACKGROUND.jpg");
 groundImage = loadImage("IMAGES/Ground.png");
 marioImage = loadAnimation("IMAGES/MARIO-0.png","IMAGES/MARIO-1.png","IMAGES/MARIO-2.png","IMAGES/MARIO-3.png","IMAGES/MARIO-4.png","IMAGES/MARIO-5.png","IMAGES/MARIO-6.png","IMAGES/MARIO-7.png","IMAGES/MARIO-8.png","IMAGES/MARIO-9.png","IMAGES/MARIO-10.png","IMAGES/MARIO-11.png");
coinImage = loadAnimation("IMAGES/COIN-0.png","IMAGES/COIN-1.png","IMAGES/COIN-2.png","IMAGES/COIN-3.png","IMAGES/COIN-4.png","IMAGES/COIN-5.png");
snakeImage = loadAnimation("IMAGES/snakes-0.png","IMAGES/snakes-1.png","IMAGES/snakes-2.png","IMAGES/snakes-3.png","IMAGES/snakes-4.png","IMAGES/snakes-5.png","IMAGES/snakes-6.png","IMAGES/snakes-7.png","IMAGES/snakes-8.png","IMAGES/snakes-9.png","IMAGES/snakes-10.png","IMAGES/snakes-11.png","IMAGES/snakes-12.png","IMAGES/snakes-13.png","IMAGES/snakes-14.png","IMAGES/snakes-15.png")
turtleImage = loadAnimation("IMAGES/turtle-0.png","IMAGES/turtle-1.png","IMAGES/turtle-2.png","IMAGES/turtle-3.png","IMAGES/turtle-4.png","IMAGES/turtle-5.png","IMAGES/turtle-6.png","IMAGES/turtle-7.png","IMAGES/turtle-8.png","IMAGES/turtle-9.png","IMAGES/turtle-10.png","IMAGES/turtle-11.png")
mDeath = loadImage("IMAGES/mario_death.png");
gameOverImg = loadImage("IMAGES/gameOver.png");
restartImg  = loadImage("IMAGES/restart.png");


}


function setup(){
createCanvas(1950,970);

ground = createSprite(970,350,1980,5);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -6
  ground.scale= 6;

  mario = createSprite(150,750,50,5);
  mario.addAnimation("mario",marioImage);
  mario.debug = true
  mario.setCollider("circle", 0,0 , 80)

  gameOver = createSprite(900,450);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(900,500);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  

  invisibleGround = createSprite(170,880,52100,10)
  invisibleGround.visible = false;

  coinGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
}

function draw(){
background(backGround)
if(gameState== PLAY){

if (ground.x < 0){
  ground.x = ground.width/2;
}

if(keyDown("space") && mario.y >= 750) {
  mario.velocityY = -25;  
}

mario.velocityY = mario.velocityY + 0.8 
spawnCoins();
spawnObstacles();

if(mario.isTouching(coinGroup)){
  score = score+1;
  coinGroup[0].destroy();
  
}
if(mario.isTouching(obstaclesGroup)){
  mario.changeImage("mario",mDeath);
  gameState = END;
}
}

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    mario.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    
    
   
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  

}
mario.collide(invisibleGround);
drawSprites()
textSize(30)
fill ("white")
text("score: "+ score,1750,25);
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var coin = createSprite(1920,820,40,10);
    coin.debug= true
    coin.addAnimation("coin",coinImage);
    coin.y = Math.round(random(380,700));
    coin.scale = 0.3;
    coin.velocityX = -3;
    
     //assign lifetime to the variable
    coin.lifetime = 800;
    
    //adjust the depth
    coin.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    //add each cloud to the group
    coinGroup.add(coin);

  }

}


function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1910,800,10,40);
    obstacle.debug = true;
    obstacle.setCollider("rectangle", 0,0, 50,50);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addAnimation("snake",snakeImage);
              break;
      case 2: obstacle.addAnimation("turlte",turtleImage);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 800;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  coinGroup.destroyEach();
  
  mario.changeAnimation("mario",marioImage);
  
 score = 0;
  
}
