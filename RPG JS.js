var currentRoom=1;
var moveBtnPress = new Array(4);
var p1 = new player();
var e1 = new enemy();
var textbox;
var botonesMain;
var botonesMove;
var botonesCombat;
var inventory = new Array(2);
var potionInRoom = false;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("movebtn").disabled = true;
  document.getElementById("lookbtn").disabled = true;
  document.getElementById("restbtn").disabled = true;
  document.getElementById("takebtn").disabled = true;
  document.getElementById("inventorybtn").disabled = true;
  document.getElementById("mapbtn").disabled = true;
  document.getElementById("statusbtn").disabled = true;
}, false);

window.onload = function() {
  init();
}

function init() {
  textBox=document.getElementById("userinputs");
  botonesMain=document.getElementById("mainButtons");
  writeMap();
}

function player () {
  this.HP=40;
  this.maxHP=40;
  this.level=1;
  this.XP=0;
  this.ATT=0;
  this.raiseOnlyOnce=0;
  this.currentSpell;
  this.levelUpStops=1;
  this.numberOfPotions=0;
  
  this.setFighterValues=function(usuario){
    this.name=usuario;
    this.clase="Fighter";
    this.weapon="Sword";
    this.STR=8;
    this.AGI=7;
    this.INT=6;
    this.MP=15;
    this.maxMP=15;
    this.wpnSTR=12;
    this.wpnDFS=4;
    this.ATT=this.STR+this.wpnSTR;
    this.DFS=this.STR/2+this.AGI+this.wpnDFS; 
    this.knownSpells=0;
    this.fireballPWR=0;
  };
  this.setThiefValues=function(usuario){
    this.name=usuario;
    this.clase="Thief";
    this.weapon="Knife";
    this.STR=6;
    this.AGI=12;
    this.INT=10;
    this.MP=20;
    this.maxMP=20;
    this.wpnSTR=8;
    this.wpnDFS=1;
    this.ATT=this.STR+this.wpnSTR;
    this.DFS=this.STR/2+this.AGI+this.wpnDFS;
    this.knownSpells=0;
    this.fireballPWR=2;
  };
  this.setMageValues=function(usuario){
    this.name=usuario;
    this.clase="Mage";
    this.weapon="Staff";
    this.STR=4;
    this.AGI=5;
    this.INT=10;
    this.MP=25;
    this.maxMP=25;
    this.wpnSTR=6;
    this.wpnDFS=1;
    this.ATT=this.STR+this.wpnSTR;
    this.DFS=this.STR/2+this.AGI+this.wpnDFS;
    this.knownSpells=1;
    this.fireballPWR=5;
    this.lightningPWR=8;
  };
}

function enemy() {
  this.HP=0;

  this.setBatValues=function(){
    this.clase="Bat";
    this.weapon="None";
    this.HP=12;
    this.STR=4;
    this.AGI=10;
    this.INT=7;
    this.wpnSTR=4;
    this.wpnDFS=4;
    this.ATT=this.STR+this.wpnSTR;
    this.DFS=this.STR/2+this.AGI+this.wpnDFS; 
  };
  this.setGoblinValues=function(){
    this.clase="Goblin";
    this.weapon="Knife";
    this.HP=20;
    this.STR=6;
    this.AGI=6;
    this.INT=6;
    this.wpnSTR=10;
    this.wpnDFS=2;
    this.ATT=this.STR+this.wpnSTR;
    this.DFS=this.STR/2+this.AGI+this.wpnDFS; 
  };
  this.setGhoulValues=function(){
    this.clase="Ghoul";
    this.weapon="None";
    this.HP=20;
    this.STR=8;
    this.AGI=4;
    this.INT=2;
    this.wpnSTR=8;
    this.wpnDFS=6;
    this.ATT=this.STR+this.wpnSTR;
    this.DFS=this.STR/2+this.AGI+this.wpnDFS; 
  };
}

function validateName() {
  var usuario=document.getElementById("user").value; 
  var clase=document.getElementsByName("classe");
  var claze;

  if (usuario!=""){
      for (var i=0;i<3;i++) {
    if (clase[i].type == "radio" && clase[i].checked) {
      claze=clase[i].value;
      if (clase[0].type == "radio" && clase[0].checked) {
        p1.setFighterValues(usuario);
      } else if (clase[1].type == "radio" && clase[1].checked) {
        p1.setThiefValues(usuario);
      } else if (clase[2].type == "radio" && clase[2].checked) {
        p1.setMageValues(usuario);               
      }
    }
  }
  textBox.innerHTML="Welcome "+usuario+". You chose the path of the "+claze+"."+" Unfortunately, your future doesn't look so bright. You have engaged in a battle with a wizard much stronger than you, and though, you have been defeated. Luckily for you, the wizard is a reasonable man, and instead of killing you, he sends you with a magic spell to the entrance of a dungeon.<br>";
  var but1=document.createElement("button");
  var parBut=document.createElement("p");
  parBut.appendChild(but1);
  but1.innerHTML=">";
  but1.id='fwdButn';
  parBut.style.textAlign="center";
  but1.addEventListener('click', function() { 
    textBox.innerHTML="From across the door, the wizard mumbles: 'In order to live, you'll have  to defeat the numerous monsters that inhabit this dark place. Search the key. If you can obtain it, you are free to leave.'"; 
    document.getElementById("movebtn").disabled = false;
    document.getElementById("lookbtn").disabled = false;
    document.getElementById("restbtn").disabled = false;
    document.getElementById("takebtn").disabled = false;
    document.getElementById("inventorybtn").disabled = false;
    document.getElementById("mapbtn").disabled = false;
    document.getElementById("statusbtn").disabled = false;
  }, false);
  textBox.appendChild(parBut);
  }
}

function look() {
  switch (currentRoom) {
    case 1:
      textBox.innerHTML="You are in a dark and filthy room, barely iluminated by a candle. Besides you is the exit to this dungeon, a locked door. To the north is the only visible path."; //Starting room
      break;
    case 2:
      textBox.innerHTML="This is the second room of the dungeon. Some more candles light this place and you can clearly see you have opening paths in all four directions. You can also see some human bones lying in the ground and realize that was the stench you've been smelling since you got here (you feel relieved that it wasn't your personal body odor).";
      break;
    case 3:
      textBox.innerHTML="A narrow hallway extends from west to east, and it gets darker and creepier every minute. You start to think that maybe fighting that wizard wasn't a great idea in the first place."; //Hallway
      break;
    case 4:
      textBox.innerHTML="This is the end of the hallway, but not the end of the road. You can hear someone screaming in the distance. Only two ways seem open: south, to continue forward, or west, to return to the hallway"; //End of Hallway
      break;      
    case 5:
      textBox.innerHTML="Braverly, or stupidly, you decide to go on. The screaming here is louder and a chill runs down your spine when you look to the east from where the shouts seem to come. North is the way out.";
      break;
    case 6:
      textBox.innerHTML="You see a large cell filled with prisoners in terrible pain. Some of them fear you when you approach, some spit you and some ask you for help. Some of them are torturing the others. Only one person ignores you completely: a mysterious looking old man with his eyes closed."; //Cells room
      break;
    case 7:
      textBox.innerHTML="7";
      break;
    case 8:
      textBox.innerHTML="8";
      break;
    case 9:
      textBox.innerHTML="9";
      break;
    case 10:
      textBox.innerHTML="10";
      break;
    case 11:
      textBox.innerHTML="11";
      break;
    case 12:
      textBox.innerHTML="12";
      break;
    case 13:
      textBox.innerHTML="13";
      break;
    }
}

function diceThrow(max, min) {
  return Math.floor(Math.random()*(max-min+1)+min);
}


function status() {
  textBox.innerHTML="Name: "+p1.name+"<br>Class: "+p1.clase+"<br>Level: "+p1.level+"<br>HP: "+p1.HP+"/"+p1.maxHP+"&emsp;MP: "+p1.MP+"/"+p1.maxMP+"&emsp;XP: "+p1.XP+"<br>Weapon: "+p1.weapon+"<br>Attack: "+p1.ATT+"&emsp;Defense: "+p1.DFS+"<br>STR: "+p1.STR+"&emsp;AGI: "+p1.AGI+"&emsp;INT: "+p1.INT;
}
function onMove() {
  botonesMain.style.display="none";
  botonesMove=document.getElementById("directionButtons").style.display="block";
}
function onCancel(){ 
  botonesMain.style.display="block";
  document.getElementById("directionButtons").style.display="none";
}
function onCancel2() {
  document.getElementById("combatButtons").style.display="block";
  document.getElementById("magicButtons").style.display="none";
}
function moveNorth() {
  moveBtnPress[0]=true;
  moveBtnPress[1]=false;
  moveBtnPress[2]=false;
  moveBtnPress[3]=false;
}
function moveEast() {
  moveBtnPress[0]=false;
  moveBtnPress[1]=true;
  moveBtnPress[2]=false;
  moveBtnPress[3]=false;
}
function moveSouth() {
  moveBtnPress[0]=false;
  moveBtnPress[1]=false;
  moveBtnPress[2]=true;
  moveBtnPress[3]=false;
}
function moveWest() {
  moveBtnPress[0]=false;
  moveBtnPress[1]=false;
  moveBtnPress[2]=false;
  moveBtnPress[3]=true;
}

function changeRoom(newRoom) {
  document.getElementById("map").style.display="none";
  potionInRoom=false;
  currentRoom=newRoom;
  look();
  writeMap();
  appearPotion();
  combat();
}

function directions() {
  switch (currentRoom) {
    case 1:
      switch (true) {
        case moveBtnPress[0]:
            changeRoom(2);
          break;
        case moveBtnPress[2]:
          textBox.innerHTML="The door that leads you out of the dungeon is locked.";
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 2:
      switch (true) {
        case moveBtnPress[0]:
          changeRoom(10);
          break;
      case moveBtnPress[1]:
          changeRoom(3);
          break;
      case moveBtnPress[2]:
          changeRoom(1);
          break;
      case moveBtnPress[3]:
          changeRoom(7);
        break;
      }
      break;
    case 3:
      switch (true) {
        case moveBtnPress[1]:
            changeRoom(4);
          break;
        case moveBtnPress[3]:
          changeRoom(2);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;  
    case 4:
      switch (true) {
        case moveBtnPress[2]:
            changeRoom(5);
          break;
        case moveBtnPress[3]:
          changeRoom(3);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 5:
      switch (true) {
        case moveBtnPress[0]:
            changeRoom(4);
          break;
        case moveBtnPress[1]:
          changeRoom(6);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 6:
      switch (true) {
        case moveBtnPress[3]:
            changeRoom(5);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 7:
      switch (true) {
        case moveBtnPress[0]:
            changeRoom(11);
          break;
        case moveBtnPress[1]:
          changeRoom(2);
          break;
        case moveBtnPress[3]:
          changeRoom(8);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 8:
      switch (true) {
        case moveBtnPress[1]:
            changeRoom(7);
          break;
        case moveBtnPress[2]:
          changeRoom(9);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 9:
      switch (true) {
        case moveBtnPress[0]:
            changeRoom(8);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 10:
      switch (true) {
        case moveBtnPress[2]:
            changeRoom(2);
          break;
        case moveBtnPress[3]:
          changeRoom(11);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 11:
      switch (true) {
        case moveBtnPress[0]:
            changeRoom(12);
          break;
        case moveBtnPress[1]:
          changeRoom(10);
          break;
        case moveBtnPress[2]:
          changeRoom(7);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 12:
      switch (true) {
        case moveBtnPress[2]:
            changeRoom(11);
          break;
        case moveBtnPress[3]:
          changeRoom(13);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;
    case 13:
      switch (true) {
        case moveBtnPress[1]:
            changeRoom(12);
          break;
        default:
          textBox.innerHTML="You cant go that way.";
      }
      break;         
   }
}

function disableCombatButtons() {
  document.getElementById("attackbtn").disabled = true;
  document.getElementById("stealbtn").disabled = true;
  document.getElementById("runbtn").disabled = true;
  document.getElementById("spellbtn").disabled = true;
  document.getElementById("fireball").disabled=true;
  document.getElementById("lightning").disabled=true;
}
function enableCombatButtons() {
  document.getElementById("attackbtn").disabled = false;
  document.getElementById("stealbtn").disabled = false;
  document.getElementById("runbtn").disabled = false;
  document.getElementById("spellbtn").disabled = false;
  document.getElementById("fireball").disabled=false;
  document.getElementById("lightning").disabled=false;
}

function combat() {
  var rand=Math.floor((Math.random()*12)+1);
  if (rand<7) {
    rand=0;
  } else if (rand==7 || rand==8){
    textBox.innerHTML="<b>A bat is in your way!</b>";
    e1.setBatValues();
    startCombat();
  } else if (rand==9 || rand==10){
    textBox.innerHTML="<b>A goblin stands in your way!</b>";
    e1.setGoblinValues();
    startCombat();
  } else if (rand==11 || rand==12){
    textBox.innerHTML="<b>A ghoul stands in your way!</b>";
    e1.setGhoulValues();
    startCombat();
  }
}

function startCombat() {
  botonesMain.style.display="none";
  botonesMove=document.getElementById("directionButtons").style.display="none";
  botonesCombat=document.getElementById("combatButtons").style.display="block";
  var divLife=document.getElementById("lifeDiv").style.display="block";
  enableCombatButtons();
  lifeDiv.innerHTML="Player HP: "+p1.HP+" - Enemy HP: "+e1.HP;
  if (e1.AGI>p1.AGI) {
    attackEnemy();
    var par1=document.createElement("p");
    var node = document.createTextNode("The enemy is faster and attacks you first!");
    par1.appendChild(node);
    textBox.appendChild(par1);
  }
}
function endCombat(){
  botonesMain.style.display="block";
  document.getElementById("combatButtons").style.display="none";
  document.getElementById("lifeDiv").style.display="none";
  document.getElementById("magicButtons").style.display="none";
}

function checkHP() {
  if (e1.HP<0) {
    e1.HP=0;
  }
  if (p1.HP<0) {
    p1.HP=0;
  }
  lifeDiv.innerHTML="Player HP: "+p1.HP+" - Enemy HP: "+e1.HP;
}

function attack() {
  disableCombatButtons();
  var maxATT=p1.ATT-e1.AGI;
  var minATT=p1.ATT-e1.DFS;

    textBox.innerHTML="You attack the "+e1.clase+"!";
  if (maxATT<=0) {
    maxATT=3;
  }
  if (minATT<=0) {
    minATT=1;
  }
  var ATTPower=Math.floor(Math.random()*(maxATT-minATT)+minATT);
  var par1=document.createElement("p");
  var node = document.createTextNode("You cause a damage of "+ATTPower+" to the "+e1.clase+"!");
  e1.HP-=ATTPower;
  checkHP();
  par1.appendChild(node);
  textBox.appendChild(par1);
  if (e1.HP>0) {
    setTimeout(attackEnemy, 1500);
  } else {
    var par2=document.createElement("p");
    var node2 = document.createTextNode("Enemy defeated!");
    par2.appendChild(node2);
    textBox.appendChild(par2);
    raiseXP();
    endCombat();
  }
}

function attackEnemy() {
  enableCombatButtons();
  var enemyMaxATT=e1.ATT-p1.AGI;
  var enemyMinATT=e1.ATT-p1.DFS;
  if (enemyMaxATT<=0) {
    enemyMaxATT=3;
  }
  if (enemyMinATT<=0) {
    enemyMinATT=1;
  }
  var enemyATTPower=Math.floor(Math.random()*(enemyMaxATT-enemyMinATT)+enemyMinATT);
  var par2=document.createElement("p");
  var node2 = document.createTextNode("The enemy causes you a damage of "+enemyATTPower+"!");
  p1.HP-=enemyATTPower;
  checkHP();
  par2.appendChild(node2);
  textBox.appendChild(par2);
  if (p1.HP<=0) {
    endCombat();
    gameOver();
  }
}


function rest() {
  if (p1.HP<p1.maxHP) {
    var restHP=Math.floor(Math.random()*3+1);
    p1.HP+=restHP;
    textBox.innerHTML="You take a rest and recover "+restHP+" HP points.";
    if (p1.HP>p1.maxHP) {
      p1.HP=p1.maxHP;
    }
  }
  if (p1.MP<p1.maxMP) {
  var restMP=Math.floor(Math.random()*3+1);
  p1.MP+=restMP;
  var par1=document.createElement("p");
  var node1 = document.createTextNode("You recover "+restMP+" MP points.");
  par1.appendChild(node1);
  textBox.appendChild(par1);
    if (p1.MP>p1.maxMP) {
      p1.MP=p1.maxMP;
    }
  }
  if (p1.HP==p1.maxHP) {
    var par2=document.createElement("p");
    var node2 = document.createTextNode("Life fully restored!");
    par2.appendChild(node2);
    textBox.appendChild(par2);
  }
  combat();
}

function raiseXP() {
  var par4=document.createElement("p");
  switch (e1.clase){
    case "Bat":
      p1.XP+=2;
      var node4 = document.createTextNode("You gain 2 XP points!");
      break;
    case "Goblin":
      p1.XP+=4;
      var node4 = document.createTextNode("You gain 4 XP points!");
      break;
    case "Ghoul":
      p1.XP+=5;
      var node4 = document.createTextNode("You gain 5 XP points!");
      break;
  }
  par4.appendChild(node4);
  textBox.appendChild(par4);
  raiseLevel();
}

function raiseLevel() {
  var par5=document.createElement("p");
  //Level 2
  if (p1.XP>=20 && p1.raiseOnlyOnce==0) {
    p1.level=2;
    p1.raiseOnlyOnce=1;
    var node5 = document.createTextNode("You reached level 2!");
    par5.appendChild(node5);
    textBox.appendChild(par5);
    raiseStats();
  }
  //Level 3
  if (p1.XP>=50 && p1.raiseOnlyOnce==1) {
    p1.level=3;
    p1.raiseOnlyOnce=2;
    var node5 = document.createTextNode("You reached level 3!");
    par5.appendChild(node5);
    textBox.appendChild(par5);
    raiseStats();
  }
  //Level 4 and forward
  if (p1.XP>=(p1.levelUpStops*100) && p1.raiseOnlyOnce==p1.level-1) {
    p1.level+=1;
    p1.raiseOnlyOnce+=1;
    p1.levelUpStops+=1;
    var node5 = document.createTextNode("You reached level "+p1.level+"!");
    par5.appendChild(node5);
    textBox.appendChild(par5);
    raiseStats();
  }
}

function raiseStats() {
  p1.maxHP+=diceThrow(5,3);
  p1.AGI+=diceThrow(3,1);
  p1.INT+=diceThrow(3,1);
  p1.STR+=diceThrow(3,1);
  p1.ATT=Math.floor(p1.STR+p1.wpnSTR);
  p1.DFS=Math.floor(p1.STR/2+p1.AGI+p1.wpnDFS);
  p1.maxMP+=diceThrow(3,1);
  p1.fireballPWR+=diceThrow(3,1);
  if (p1.knownSpells==2) {
    p1.lightningPWR+=diceThrow(3,1);  
  }
  learnSpell();
}

function learnSpell() {
  var par6=document.createElement("p");
  if (p1.knownSpells==0 && p1.fireballPWR>=5) {
    var node6 = document.createTextNode("You learned Fireball!");
    par6.appendChild(node6);
    textBox.appendChild(par6);
    p1.knownSpells+=1;
  } else if (p1.knownSpells==1 && p1.fireballPWR>=8) {
      var node6 = document.createTextNode("You learned Lightning!");
      par6.appendChild(node6);
      textBox.appendChild(par6);
      p1.knownSpells+=1;
  }
}

function escape1() {
  disableCombatButtons();
  textBox.innerHTML="You try to escape...";
  setTimeout(escape2, 2000);
}

function escape2() {
  if (p1.AGI>e1.AGI) {
    switch (diceThrow(6,1)) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        var par5=document.createElement("p");
        var node5 = document.createTextNode("Escape succesful!");
        par5.appendChild(node5);
        textBox.appendChild(par5);
        mainButtons.style.display="block";
        endCombat();
        break;
    case 6:
      var par5=document.createElement("p");
      var node5 = document.createTextNode("Attempt to escape failed!");
      par5.appendChild(node5);
      textBox.appendChild(par5);
      setTimeout(attackEnemy,1500);
      break;
    }
  } else if (e1.AGI>p1.AGI) {
      switch (diceThrow(6,1)) {
        case 1:
        case 2:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("Escape succesful!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          mainButtons.style.display="block";
          endCombat();
          break;
        default:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("Attempt to escape failed!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          setTimeout(attackEnemy,1500);
          break;
      }
  } else {
      switch (diceThrow(6,1)) {
        case 1:
        case 2:
        case 3:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("Escape succesful!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          mainButtons.style.display="block";
          endCombat();
          break;
        default:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("Attempt to escape failed!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          setTimeout(attackEnemy,1500);
          break;    
      }
  }
}

function steal1() {
  disableCombatButtons();
  if (e1.weapon!="None") {
  textBox.innerHTML="You attempt to steal the enemy's weapon...";
  setTimeout(steal2, 2000);
  } else {
    textBox.innerHTML="The enemy isn't carrying anything!";
    setTimeout(attackEnemy,1500);
  }
}

function steal2() {
  if (p1.AGI-e1.AGI>=5) {
    switch (diceThrow(6,1)) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("You disarm your enemy!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          escapingEnemy();
        break;
      case 6:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("Attempt failed!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          setTimeout(attackEnemy,1500);
        break;
      default:
        textBox.innerHTML="Error.";
    }
  } else if (p1.AGI-e1.AGI>=1) {
      switch (diceThrow(6,1)) {
        case 1:
        case 2:
        case 3:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("You disarm your enemy!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          escapingEnemy();
          break;
        case 4:
        case 5:
        case 6:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("Attempt failed!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          setTimeout(attackEnemy,1500);
          break;
        default:
          textBox.innerHTML="Error.";
    }
  } else {
      switch (diceThrow(6,1)) {
        case 1:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("You disarm your enemy!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          escapingEnemy();
          break;
        case 2:
        case 3:  
        case 4:
        case 5:
        case 6:
          var par5=document.createElement("p");
          var node5 = document.createTextNode("Attempt failed!");
          par5.appendChild(node5);
          textBox.appendChild(par5);
          setTimeout(attackEnemy,1500);
          break;
        default:
          textBox.innerHTML="Error";
      }
  }
}

function escapingEnemy() {
  e1.weapon="None";
  e1.wpnSTR=1;
  e1.wpnDFS=1;
  switch (diceThrow(6,1)) {
    case 1:
      setTimeout(attackEnemy,1500);
      break;
    default:
      var par6=document.createElement("p");
      var node6 = document.createTextNode("The enemy escaped!");
      par6.appendChild(node6);
      textBox.appendChild(par6);
      raiseXP();
      endCombat();
      break;
  }
}

function fireball(){
  if (p1.MP>=2) {
    p1.currentSpell="fireball";
    throwSpell();  
  } else {
    textBox.innerHTML="You don't have enough MP!";
    setTimeout(attackEnemy, 1500);
  }
}

function lightning(){
  if (p1.MP>=4) {
    p1.currentSpell="lightning";
    throwSpell();  
  } else {
    textBox.innerHTML="You don't have enough MP!";
    setTimeout(attackEnemy, 1500);
  }
  
}

function castSpell() {
  switch (p1.knownSpells) {
    case 0:
      disableCombatButtons();
      textBox.innerHTML="You don't know any spell!";
      setTimeout(attackEnemy,1500);
      break;
    case 2:
      document.getElementById("lightning").style.display="block";
    case 1:
      enableCombatButtons();
      document.getElementById("combatButtons").style.display="none";
      document.getElementById("magicButtons").style.display="block";
      document.getElementById("fireball").style.display="block";    
      document.getElementById("cancel2btn").style.display="block";
      break;
  }
}

function throwSpell() {
  disableCombatButtons();
  if (p1.currentSpell=="fireball") {
    var maxATT=p1.ATT-e1.AGI+p1.fireballPWR;
    var minATT=p1.ATT-e1.DFS+p1.fireballPWR/2;  
  } else if (p1.currentSpell=="lightning") {
    var maxATT=p1.ATT-e1.AGI+p1.lightningPWR;
    var minATT=p1.ATT-e1.DFS+p1.lightningPWR/2;  
  }
  textBox.innerHTML="You cast a "+p1.currentSpell+" and throw it to the "+e1.clase+"!";
  if (maxATT<=0) {
    maxATT=3;
  }
  if (minATT<=0) {
    minATT=1;
  }
  var ATTPower=Math.floor(Math.random()*(maxATT-minATT)+minATT);
  var par1=document.createElement("p");
  var node = document.createTextNode("You cause a damage of "+ATTPower+" to the "+e1.clase+"!");
  par1.appendChild(node);
  textBox.appendChild(par1);
  e1.HP-=ATTPower;
  downMP();
  checkHP();
  if (e1.HP>0) {
    setTimeout(attackEnemy, 1500);
  } else {
    var par2=document.createElement("p");
    var node2 = document.createTextNode("Enemy defeated!");
    par2.appendChild(node2);
    textBox.appendChild(par2);
    raiseXP();
    endCombat();
  }
}

function downMP() {
  if (p1.currentSpell=="fireball") {
    p1.MP-=2;
  } else if (p1.currentSpell=="lightning") {
    p1.MP-=4;
  }
}

function checkInventory() {
  if (!inventory[0] && !inventory[1]) {
    textBox.innerHTML=("You are carrying nothing.");
  } else if (inventory[0] || inventory[1]) {
    textBox.innerHTML="You are carrying:"
  }
  if (inventory[0]) {
    var par2=document.createElement("p");
    var node2 = document.createTextNode("·"+p1.numberOfPotions+" Potions (recovers 20 HP and 20 MP)");
    par2.appendChild(node2);
    textBox.appendChild(par2);
    potionButton();
  }
  if (inventory[1]) {
    var par3=document.createElement("p");
    var node3 = document.createTextNode("·Key");
    par3.appendChild(node3);
    textBox.appendChild(par3);
  }
}

function appearPotion() {
  if (diceThrow(6,1)==1) {
    potionInRoom=true;
    var par7=document.createElement("p");
    var node7 = document.createTextNode("You can see a potion in the floor.");
    par7.appendChild(node7);
    textBox.appendChild(par7);
  }
}

function takePotion() {
  if (potionInRoom) {
    textBox.innerHTML="You pick up a potion from the floor.";
    inventory[0]=true;
    p1.numberOfPotions+=1;
    !potionInRoom;
  } else {
    textBox.innerHTML="There's nothing to take here!";
  }
}

function potionButton() {
    var butP=document.createElement("button");
    var parBut=document.createElement("p");
    parBut.appendChild(butP);
    butP.innerHTML="Use Potion";
    butP.id='potionBtn';
    textBox.appendChild(parBut);
    butP.addEventListener('click', function() { 
      textBox.innerHTML="You recover 20 HP and 20 MP!";
      p1.numberOfPotions-=1;
      if (p1.numberOfPotions==0) {
        inventory[0]=false;
      }
      p1.HP+=20;
      p1.MP+=20;
      if (p1.HP>p1.maxHP) {
        p1.HP=p1.maxHP;
      }
      if (p1.MP>p1.maxMP) {
        p1.MP=p1.maxMP;
      }
    }, false);
}

function gameOver() {
  document.getElementById("movebtn").disabled = true;
  document.getElementById("lookbtn").disabled = true;
  document.getElementById("restbtn").disabled = true;
  document.getElementById("takebtn").disabled = true;
  document.getElementById("inventorybtn").disabled = true;
  //document.getElementById("statusbtn").disabled = true;
  disableCombatButtons();
  textBox.innerHTML=p1.name+" fought until the end trying to find his way out of the maze."
  if (e1.clase=="Bat") {
    var par1=document.createElement("p");
    var node1 = document.createTextNode("Nevertheless, he couldn't stop the horde of bats that attacked him, ultimately causing his death.");
    par1.appendChild(node1);
    textBox.appendChild(par1);
  } else if (e1.clase=="Goblin") {
    var par1=document.createElement("p");
    var node1 = document.createTextNode("But the knife of a goblin isn't something to understimate, and the numerous wounds made our hero bleed.");
    par1.appendChild(node1);
    textBox.appendChild(par1);
  } else if (e1.clase=="Ghoul") {
    var par1=document.createElement("p");
    var node1 = document.createTextNode("The strength of the ghoul, however, was too much for him, and he's now food for the creatures.");
    par1.appendChild(node1);
    textBox.appendChild(par1);
  } 
  var par2=document.createElement("p");
  var node2 = document.createTextNode("His corpse now decorates the galleries of the dungeon.");
  par2.appendChild(node2);
  textBox.appendChild(par2);
  var par3=document.createElement("p");
  var node3 = document.createTextNode("Game Over!");
  par3.appendChild(node3);
  par3.style.fontWeight="bold";
  textBox.appendChild(par3);
}

function writeMap() {
    var currentCell=null;
    switch (currentRoom) {
    case 1:
      currentCell=map.rows[3].cells[2];
      break;
    case 2:
      currentCell=map.rows[2].cells[2];
      break;
    case 3:
      currentCell=map.rows[2].cells[3];
      break;
    case 4:
      currentCell=map.rows[2].cells[4];
      break;
    case 5:
      currentCell=map.rows[3].cells[4];
      break;
    case 6:
      currentCell=map.rows[3].cells[5];
      break;
    case 7:
      currentCell=map.rows[2].cells[1];
      break;
    case 8:
      currentCell=map.rows[2].cells[0];
      break;
    case 9:
      currentCell=map.rows[3].cells[0];
      break;
    case 10:
      currentCell=map.rows[1].cells[2];
      break;
    case 11:
      currentCell=map.rows[1].cells[1];
      break;
    case 12:
      currentCell=map.rows[0].cells[1];
      break;
    case 13:
      currentCell=map.rows[0].cells[0];
      break;      
  }
  for (i=0; i<4; i++) {
    for (j=0; j<6; j++) {
      map.rows[i].cells[j].innerHTML="";
    } 
  }
  currentCell.style.border="1px solid brown";
  currentCell.style.backgroundColor="#DEB887"
  currentCell.innerHTML="X";
}

function lookMap() { 
  var map2=document.getElementById("map");
  //Shows or hides map
  if (map2.style.display=="block") {
    map2.style.display="none";  
  } else {
    map2.style.display="block";
  }
}

