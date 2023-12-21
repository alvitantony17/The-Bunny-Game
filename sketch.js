const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var rope;
var rope2;
var rope3;
var fruit;
var fruit_con;
var fruit_con2;
var fruit_con3;
var backgroundImage;
var rabbit;
var rabbitImage;
var melon;
var melonImage;
var scissor;
var button;
var button2;
var button3;
var sad;
var eat;
var blink;
var airSound;
var cutSound;
var bgSound;
var eatSound;
var sadSound;
var blower;
var mute;
var muteImage;
var edges;
var star;
var starImage;
var star2;
var starImage2;
var greyStar;
var greyStarImage;
var greyStar2;
var greyStar2Image;


function preload(){
  backgroundImage=loadImage("background.png")
  rabbitImage=loadImage("Rabbit-01.png")
  melonImage=loadImage("melon.png")
  //balloonImage=loadImage("balloon.png")
  muteImage=loadImage("mute.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  airSound=loadSound("air.wav")
  eatSound=loadSound("eating_sound.mp3")
  cutSound=loadSound("rope_cut.mp3")
  bgSound=loadSound("sound1.mp3")
  sadSound=loadSound("sad.wav")
  starImage=loadImage("Stars.png")
  starImage2=loadImage("Stars.png")
  greyStarImage=loadImage("greystar.png")
  greyStar2Image=loadImage("greystar.png")

  blink.playing=true
  eat.playing=true
  sad.playing=true
  sad.looping=false
  eat.looping=false
}

function setup() 
{
  createCanvas(600,700);
  

  bgSound.play()
  bgSound.setVolume(0.8)
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,705,800,20)
  rope = new Rope(8,{x:80,y:120})
  rope2 = new Rope(4,{x:370,y:40})
  rope3 = new Rope(6,{x:550,y:100})
  
  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20
  rabbit = createSprite(450,620,100,100)
  rabbit.addAnimation("blink",blink)
  rabbit.changeAnimation("blink")
  rabbit.addAnimation("eat",eat)
  rabbit.addAnimation("sad",sad)
  rabbit.velocityX=-3
  
  star = createSprite(530,200,20,20)
  star.addImage("star",starImage)
  star.scale=0.1

  star2 = createSprite(50,250,20,20)
  star2.addImage("star2",starImage2)
  star2.scale=0.1

  greyStar = createSprite(30,30,20,20)
  greyStar.addImage("greyStar",greyStarImage)
  greyStar.scale=0.1

  greyStar2 = createSprite(80,30,20,20)
  greyStar2.addImage("greyStar2",greyStar2Image)
  greyStar2.scale=0.1
  

  rabbit.scale=0.2

  blower=createImg("blower.png")
  blower.position(200,350)
  blower.size(100,150)
  blower.mouseClicked(blow)

  mute=createImg("mute.png")
  mute.position(420,5)
  mute.size(50,50)
  mute.mouseClicked(stopSound)

  

  //melon = createSprite(270,300,20,20)
  //melon.addImage(melonImage)
  //melon.scale=0.1
  button=createImg("cut_btn.png")
  button.position(320,40)
  button.size(80,80)
  button.mouseClicked(drop2)

  button2=createImg("cut_btn.png")
  button2.position(490,50)
  button2.size(80,80)
  button2.mouseClicked(drop3)

  button3=createImg("cut_btn.png")
  button3.position(30,80)
  button3.size(80,80)
  button3.mouseClicked(drop)




  fruit = Bodies.circle(270,300,20)
  
  Matter.Composite.add(rope.body,fruit)
  fruit_con= new Link(rope,fruit)
  
  //Matter.Composite.add(rope2.body,fruit)
  fruit_con2= new Link(rope2,fruit)

  //Matter.Composite.add(rope3.body,fruit)
  fruit_con3= new Link(rope3,fruit)
 

  //melon.position=fruit.position
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}

function draw() 
{
  background(51);
  image(backgroundImage,0,0,600,700)
  imageMode(CENTER)

  if(fruit != null){
    image(melonImage,fruit.position.x,fruit.position.y,70,70)
  }

  
 
  
  Engine.update(engine);
  ground.display()
  rope.show()
  rope2.show()
  rope3.show()
  
  
  //ellipse (fruit.position.x,fruit.position.y,30,30)
  if(collide(fruit,rabbit)==true){
    rabbit.changeAnimation("eat")
    eatSound.play()
    eatSound.setVolume=10
  }

  if(collide(fruit,ground.body)==true){
    rabbit.changeAnimation("sad")
    sadSound.play()
    sadSound.setVolume=10
    bgSound.stop()
  }

  if(collision(fruit,star2,40)==true){
    star2.visible=false
    star2 = createSprite(30,30,20,20)
    star2.addImage("star2",starImage2)
    star2.scale=0.1

  }

  if(collision(fruit,star,40)==true){
    star.visible=false
    star = createSprite(80,30,20,20)
    star.addImage("star3",starImage)
    star.scale=0.1

  }

  if(rabbit.x<0){
    rabbit.velocityX=3
  }

  if(rabbit.x>600){
    rabbit.velocityX=-3
  }
 
  drawSprites()
}

function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con=null
}

function drop2(){
  rope2.break()
  fruit_con2.detach()
  fruit_con2=null
}

function drop3(){
  rope3.break()
  fruit_con3.detach()
  fruit_con3=null
}

function collide(body,sprite){
 if(body != null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(d <= 80){
    World.remove(world,fruit)
    fruit=null
    return true
  }
  else{
    return false
  }
 }
}

function collision(body,sprite,x){
  if(body !=null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=x){
     return true
     }
     else{
      return false
     }
    
  
}
}

function stopSound(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }
  else{
    bgSound.play()
  }
}

function blow(){
  console.log("Working?")
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.05})
}






