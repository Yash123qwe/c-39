class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite (200,200)
    car2 = createSprite (500,200)
    car3 = createSprite (800,200)
    car4 = createSprite (1100,200)

    cars = [car1,car2,car3,car4]
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
     
      var place = 0 //index of cars (array) //cars[place] = cars[0] -> car1

      //   *       => 50
      //   *       => 100
      // * * * *  ypos => 150

      var x =0;
      var y;

      //allPlayers-> [player1,player2,player3,player4]
      for(var plr in allPlayers){
       
        place = place + 1

        //player1 --> car1 --> cars[place-1] --> cars[0] -> car1

        x = x + 200

        y = displayHeight - allPlayers[plr].distance

        cars[place-1].x = x
        cars[place-1].y = y


        if(place === player.index){
          cars[place-1].shapeColor = "red"

          camera.position.x = displayWidth/2
          camera.position.y = cars[place-1].y

        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites()
  }
}

/*for(var i = 0 ; i<= 3; i++){
  console.log("best")
}

for(var i in cars){
  console.log(cars[i])
}
o/p-> car1 , car2,car3,car4 */