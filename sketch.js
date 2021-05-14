const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var archer1,archer2;
var player,enemy;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {

    backgroundImg = loadImage("sprites/bg.png");
    player = loadImage("sprites/shoot_stand_005.png");
    enemy = loadImage("sprites/New Project.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    archer1 = createSprite(100,150,50,50);
    archer1.addImage(player);
    archer1.scale = 0.15;

    archer2 = createSprite(1100,150,50,50);
    archer2.addImage(enemy);
    archer2.scale = 0.2;

    ground = new Ground(600,height,1200,20);

    pig1 = new Pig(600, 350);

    pig3 = new Pig(600, 220);

    bird = new Bird(120,120);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:120, y:120});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);

    ground.display();
    pig1.display();
    pig1.score();


    pig3.display();
    pig3.score();


    bird.display();
    //log6.display();
    slingshot.display();
    
    drawSprites();
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        bird.trajectory=[];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
       slingshot.attach(bird.body);
    }
}

/*async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}*/