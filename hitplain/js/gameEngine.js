"use strict";var gameEngine={ele:null,allBullets:[],allEnemys:[],totalScore:0,init:function(){return this.ele=document.getElementById("main"),this},start:function(){console.log("游戏开始"),this.loading(function(){console.log("游戏加载完毕！"),console.log("进入游戏主界面"),myPlane().init().move(),myPlane().fire(),gameEngine.listenKeybord(),gameEngine.createEnemy(),gameEngine.crash(),gameEngine.moveBackground()})},loading:function(e){var n=document.createElement("div");gameEngine.ele.appendChild(n),n.className="logo";var l=document.createElement("div");gameEngine.ele.appendChild(l),l.className="load";var a=["images2/loading1.png","images2/loading2.png","images2/loading3.png"],t=0,o=setInterval(function(){t>=5?(clearInterval(o),gameEngine.ele.removeChild(n),gameEngine.ele.removeChild(l),e&&e()):l.style.backgroundImage="url("+a[++t%3]+")"},500)},listenKeybord:function(){var e=0,n=0;window.onkeydown=function(l){37==(l=l||event).keyCode?e=-10:39==l.keyCode?e=10:38==l.keyCode?n=-10:40==l.keyCode&&(n=10)},window.onkeyup=function(l){37==(l=l||event).keyCode||39==l.keyCode?e=0:38!=l.keyCode&&40!=l.keyCode||(n=0)},setInterval(function(){var l=myPlane().ele.offsetLeft+e;l<0&&(l=0),l>gameEngine.ele.offsetWidth-myPlane().ele.offsetWidth&&(l=gameEngine.ele.offsetWidth-myPlane().ele.offsetWidth),myPlane().ele.style.left=l+"px",myPlane().ele.style.top=myPlane().ele.offsetTop+n+"px"},30)},createEnemy:function(){setInterval(function(){Math.random()>.6&&new Enemy(Enemy.prototype.Enemy_Type_Large).init().move()},6e3),setInterval(function(){Math.random()>.5&&new Enemy(Enemy.prototype.Enemy_Type_Middle).init().move()},2e3),setInterval(function(){Math.random()>.3&&new Enemy(Enemy.prototype.Enemy_Type_Small).init().move()},1e3)},crash:function(){var e=setInterval(function(){for(var n=0;n<gameEngine.allEnemys.length;n++){for(var l=0;l<gameEngine.allBullets.length;l++)isCrash(gameEngine.allEnemys[n].ele,gameEngine.allBullets[l].ele)&&(gameEngine.allBullets[l].boom(),gameEngine.allBullets.splice(l,1),gameEngine.allEnemys[n].hurt());if(isCrash(gameEngine.allEnemys[n].ele,myPlane().ele)){clearInterval(e),myPlane().boom(function(){var e=prompt("请留下您的大名， 您当前的分数是:"+gameEngine.totalScore,"");ajax({type:"post",url:"http://60.205.181.47/myPHPCode4/uploadScore.php",data:{name:e,score:gameEngine.totalScore},success:function(e){console.log("提交成功: "+e),location.href="rand.html"}})});break}}},30)},moveBackground:function(){var e=0;setInterval(function(){gameEngine.ele.style.backgroundPositionY=e+++"px"},30)}};