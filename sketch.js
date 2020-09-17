//Create variables here
var dogHungryImage, dogHappyImage
var dogSprite;
var database;
var foodStockRef;
var foodStock;

function preload(){
  dogHungryImage = loadImage("images/dogImg.png");
  dogHappyImage = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);
  dogSprite = createSprite(420, 250);
  dogSprite.addImage("dogImg.png",dogHungryImage);
  dogSprite.addImage("dogImg1.png",dogHappyImage);
  dogSprite.scale = 0.2;

  database = firebase.database();
  foodStockRef = database.ref("food");
  foodStockRef.on("value",readStock);

  
}


function draw() {  
  background(46,139,87);
  if(keyWentDown("up")){
    dogSprite.changeImage("dogImg1.png",dogHappyImage);
    writeStock(foodStock);
  }

  drawSprites();
  textSize(20);
  fill("white");
  stroke("black");
  text("foodStock remaining = "+foodStock,100,100);
}

function readStock(data){
foodStock = data.val();
}

function writeStock(f){
  if(f<=0){
    f = 0
  }
  else{
    f = f-1;
  }
 database.ref("/").update({
   food:f
 })
}



