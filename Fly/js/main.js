    //獲得主界面
var mainDiv=document.getElementById("maindiv");
    //獲得開始界面
var startdiv=document.getElementById("startdiv");
    //獲得遊戲中分數顯示界面
var scorediv=document.getElementById("scorediv");
    //獲得分數界面
var scorelabel=document.getElementById("label");
    //獲得暫停界面
var suspenddiv=document.getElementById("suspenddiv");
    //獲得遊戲結束界面
var enddiv=document.getElementById("enddiv");
    //獲得遊戲結束後分數統計界面
var planscore=document.getElementById("planscore");
    //初始化分數
var scores=0;

/*
 創建飛機類
 */
function plan(hp,X,Y,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    this.planX=X;
    this.planY=Y;
    this.imagenode=null;
    this.planhp=hp;
    this.planscore=score;
    this.plansizeX=sizeX;
    this.plansizeY=sizeY;
    this.planboomimage=boomimage;
    this.planisdie=false;
    this.plandietimes=0;
    this.plandietime=dietime;
    this.plansudu=sudu;
//行為
/*
移動行為
     */
    this.planmove=function(){
        if(scores<=50000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+"px";
        }
        else if(scores>50000&&scores<=100000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+1+"px";
        }
        else if(scores>100000&&scores<=150000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+2+"px";
        }
        else if(scores>150000&&scores<=200000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+3+"px";
        }
        else if(scores>200000&&scores<=300000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+4+"px";
        }
        else{
            this.imagenode.style.top=this.imagenode.offsetTop+this.plansudu+5+"px";
        }
    }
    this.init=function(){
        this.imagenode=document.createElement("img");
        this.imagenode.style.left=this.planX+"px";
        this.imagenode.style.top=this.planY+"px";
        this.imagenode.src=imagesrc;
        mainDiv.appendChild(this.imagenode);
    }
    this.init();
}

/*
創建子彈類
 */
function bullet(X,Y,sizeX,sizeY,imagesrc){
    this.bulletX=X;
    this.bulletY=Y;
    this.bulletimage=null;
    this.bulletattach=1;
    this.bulletsizeX=sizeX;
    this.bulletsizeY=sizeY;
//行為
/*
 移動行為
 */
    this.bulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop-20+"px";
    }
    this.init=function(){
        this.bulletimage=document.createElement("img");
        this.bulletimage.style.left= this.bulletX+"px";
        this.bulletimage.style.top= this.bulletY+"px";
        this.bulletimage.src=imagesrc;
        mainDiv.appendChild(this.bulletimage);
    }
    this.init();
}

/*
 創建單行子彈類
 */
function oddbullet(X,Y){
    bullet.call(this,X,Y,6,14,"image/bullet1.png");
}

/*
創建敵機類
 */
function enemy(hp,a,b,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc){
    plan.call(this,hp,random(a,b),-100,sizeX,sizeY,score,dietime,sudu,boomimage,imagesrc);
}
//產生min到max之間的隨機數
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

/*
創建本方飛機類
 */
function ourplan(X,Y){
    var imagesrc="image/我的飛機.gif";
    plan.call(this,1,X,Y,66,80,0,660,0,"image/本方飛機爆炸.gif",imagesrc);
    this.imagenode.setAttribute('id','ourplan');
}

/*
 創建本方飛機
 */
var selfplan=new ourplan(120,485);
//移動事件
var ourPlan=document.getElementById('ourplan');
var yidong=function(){
    var oevent=window.event||arguments[0];
    var chufa=oevent.srcElement||oevent.target;
    var selfplanX=oevent.clientX-500;
    var selfplanY=oevent.clientY;
    ourPlan.style.left=selfplanX-selfplan.plansizeX/2+"px";
    ourPlan.style.top=selfplanY-selfplan.plansizeY/2+"px";
//    document.getElementsByTagName('img')[0].style.left=selfplanX-selfplan.plansizeX/2+"px";
//    document.getElementsByTagName('img')[0]..style.top=selfplanY-selfplan.plansizeY/2+"px";
}
/*
暫停事件
 */
var number=0;
var zanting=function(){
    if(number==0){
        suspenddiv.style.display="block";
        if(document.removeEventListener){
            mainDiv.removeEventListener("mousemove",yidong,true);
            bodyobj.removeEventListener("mousemove",bianjie,true);
        }
        else if(document.detachEvent){
            mainDiv.detachEvent("onmousemove",yidong);
            bodyobj.detachEvent("onmousemove",bianjie);
        }
        clearInterval(set);
        number=1;
    }
    else{
        suspenddiv.style.display="none";
        if(document.addEventListener){
            mainDiv.addEventListener("mousemove",yidong,true);
            bodyobj.addEventListener("mousemove",bianjie,true);
        }
        else if(document.attachEvent){
            mainDiv.attachEvent("onmousemove",yidong);
            bodyobj.attachEvent("onmousemove",bianjie);
        }
        set=setInterval(start,20);
        number=0;
    }
}
//判斷本方飛機是否移出邊界,如果移出邊界,則取消mousemove事件,反之加上mousemove事件
var bianjie=function(){
    var oevent=window.event||arguments[0];
    var bodyobjX=oevent.clientX;
    var bodyobjY=oevent.clientY;
    if(bodyobjX<505||bodyobjX>815||bodyobjY<0||bodyobjY>568){
        if(document.removeEventListener){
            mainDiv.removeEventListener("mousemove",yidong,true);
        }
        else if(document.detachEvent){
            mainDiv.detachEvent("onmousemove",yidong);
        }
    }
    else{
        if(document.addEventListener){
            mainDiv.addEventListener("mousemove",yidong,true);
        }
        else if(document.attachEvent){
            mainDiv.attachEvent("nomousemove",yidong);
        }
    }
}
//暫停界面重新開始事件
//function chongxinkaishi(){
//    location.reload(true);
//    startdiv.style.display="none";
//    maindiv.style.display="block";
//}
var bodyobj=document.getElementsByTagName("body")[0];
if(document.addEventListener){
    //為本方飛機添加移動和暫停
    mainDiv.addEventListener("mousemove",yidong,true);
    //為本方飛機添加暫停事件
    selfplan.imagenode.addEventListener("click",zanting,true);
    //為body添加判斷本方飛機移出邊界事件
    bodyobj.addEventListener("mousemove",bianjie,true);
    //為暫停界面的繼續按鈕添加暫停事件
    suspenddiv.getElementsByTagName("button")[0].addEventListener("click",zanting,true);
//    suspenddiv.getElementsByTagName("button")[1].addEventListener("click",chongxinkaishi,true);
    //為暫停界面的返回主頁按鈕添加事件
    suspenddiv.getElementsByTagName("button")[2].addEventListener("click",jixu,true);
}
else if(document.attachEvent){
    //為本方飛機添加移動
    mainDiv.attachEvent("onmousemove",yidong);
    //為本方飛機添加暫停事件
    selfplan.imagenode.attachEvent("onclick",zanting);
    //為body添加判斷本方飛機移出邊界事件
    bodyobj.attachEvent("onmousemove",bianjie);
    //為暫停界面的繼續按鈕添加暫停事件
    suspenddiv.getElementsByTagName("button")[0].attachEvent("onclick",zanting);
//    suspenddiv.getElementsByTagName("button")[1].attachEvent("click",chongxinkaishi,true);
    //為暫停界面的返回主頁按鈕添加事件
    suspenddiv.getElementsByTagName("button")[2].attachEvent("click",jixu,true);
}
//初始化隱藏本方飛機
selfplan.imagenode.style.display="none";

/*
敵機對像數組
 */
var enemys=[];

/*
子彈對像數組
 */
var bullets=[];
var mark=0;
var mark1=0;
var backgroundPositionY=0;
/*
開始函數
 */
function start(){
    mainDiv.style.backgroundPositionY=backgroundPositionY+"px";
    backgroundPositionY+=0.5;
    if(backgroundPositionY==568){
        backgroundPositionY=0;
    }
    mark++;
    /*
    創建敵方飛機
     */

    if(mark==20){
        mark1++;
        //中飛機
        if(mark1%5==0){
            enemys.push(new enemy(6,25,274,46,60,5000,360,random(1,3),"image/中飛機爆炸.gif","image/enemy3_fly_1.png"));
        }
        //大飛機
        if(mark1==20){
            enemys.push(new enemy(12,57,210,110,164,30000,540,1,"image/大飛機爆炸.gif","image/enemy2_fly_1.png"));
            mark1=0;
        }
        //小飛機
        else{
            enemys.push(new enemy(1,19,286,34,24,1000,360,random(1,4),"image/小飛機爆炸.gif","image/enemy1_fly_1.png"));
        }
        mark=0;
    }

/*
移動敵方飛機
 */
    var enemyslen=enemys.length;
    for(var i=0;i<enemyslen;i++){
        if(enemys[i].planisdie!=true){
            enemys[i].planmove();
        }
/*
 如果敵機超出邊界,刪除敵機
 */
        if(enemys[i].imagenode.offsetTop>568){
            mainDiv.removeChild(enemys[i].imagenode);
            enemys.splice(i,1);
            enemyslen--;
        }
        //當敵機死亡標記為true時，經過一段時間後清除敵機
        if(enemys[i].planisdie==true){
            enemys[i].plandietimes+=20;
            if(enemys[i].plandietimes==enemys[i].plandietime){
                mainDiv.removeChild(enemys[i].imagenode);
                enemys.splice(i,1);
                enemyslen--;
            }
        }
    }

/*
創建子彈
*/
    if(mark%5==0){
            bullets.push(new oddbullet(parseInt(selfplan.imagenode.style.left)+31,parseInt(selfplan.imagenode.style.top)-10));
    }

/*
移動子彈
*/
    var bulletslen=bullets.length;
    for(var i=0;i<bulletslen;i++){
        bullets[i].bulletmove();
/*
如果子彈超出邊界,刪除子彈
*/
        if(bullets[i].bulletimage.offsetTop<0){
            mainDiv.removeChild(bullets[i].bulletimage);
            bullets.splice(i,1);
            bulletslen--;
        }
    }

/*
碰撞判斷
*/
    for(var k=0;k<bulletslen;k++){
        for(var j=0;j<enemyslen;j++){
            //判斷碰撞本方飛機
            if(enemys[j].planisdie==false){
                if(enemys[j].imagenode.offsetLeft+enemys[j].plansizeX>=selfplan.imagenode.offsetLeft&&enemys[j].imagenode.offsetLeft<=selfplan.imagenode.offsetLeft+selfplan.plansizeX){
                  if(enemys[j].imagenode.offsetTop+enemys[j].plansizeY>=selfplan.imagenode.offsetTop+40&&enemys[j].imagenode.offsetTop<=selfplan.imagenode.offsetTop-20+selfplan.plansizeY){
                      //碰撞本方飛機，遊戲結束，統計分數
                      selfplan.imagenode.src="image/本方飛機爆炸.gif";
                      enddiv.style.display="block";
                      planscore.innerHTML=scores;
                      if(document.removeEventListener){
                          mainDiv.removeEventListener("mousemove",yidong,true);
                          bodyobj.removeEventListener("mousemove",bianjie,true);
                      }
                      else if(document.detachEvent){
                          mainDiv.detachEvent("onmousemove",yidong);
                          bodyobj.removeEventListener("mousemove",bianjie,true);
                      }
                      clearInterval(set);
                  }
                }
                //判斷子彈與敵機碰撞
                if((bullets[k].bulletimage.offsetLeft+bullets[k].bulletsizeX>enemys[j].imagenode.offsetLeft)&&(bullets[k].bulletimage.offsetLeft<enemys[j].imagenode.offsetLeft+enemys[j].plansizeX)){
                    if(bullets[k].bulletimage.offsetTop<=enemys[j].imagenode.offsetTop+enemys[j].plansizeY&&bullets[k].bulletimage.offsetTop+bullets[k].bulletsizeY>=enemys[j].imagenode.offsetTop){
                        //敵機血量減子彈攻擊力
                        enemys[j].planhp=enemys[j].planhp-bullets[k].bulletattach;
                        //敵機血量為0，敵機圖片換為爆炸圖片，死亡標記為true，計分
                        if(enemys[j].planhp==0){
                            scores=scores+enemys[j].planscore;
                            scorelabel.innerHTML=scores;
                            enemys[j].imagenode.src=enemys[j].planboomimage;
                            enemys[j].planisdie=true;
                        }
                        //刪除子彈
                        mainDiv.removeChild(bullets[k].bulletimage);
                            bullets.splice(k,1);
                            bulletslen--;
                            break;
                    }
                }
            }
        }
    }
}
/*
開始遊戲按鈕點擊事件
 */
var set;
function begin(){

    startdiv.style.display="none";
    mainDiv.style.display="block";
    selfplan.imagenode.style.display="block";
    scorediv.style.display="block";
    /*
     調用開始函數
     */
    set=setInterval(start,20);
}
//遊戲結束後點擊繼續按鈕事件
function jixu(){
    location.reload(true);
}

/*
    完成界面的初始化
    敵方小飛機一個
    我方飛機一個
 */
