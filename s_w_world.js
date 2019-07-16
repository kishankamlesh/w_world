var n_g =document.getElementById("new");
var mess = document.querySelectorAll(".text");
var box = document.querySelectorAll(".g_items");
var indi = document.getElementById("nam");
var disp_l = document.getElementById("lt_inf");
var disp_r = document.getElementById("lt_inf_1");

var w_sq, p_sq, g_sq;
var p_pos = 8;
var clk_vld = false;
var g_gold = false;
var count = 0, score = 1000;
var g_over = false;

init();

for(var i =0; i<box.length;i++){
  box[i].addEventListener("mouseover", function(){
    if(!(this.style.backgroundColor === "green" || this.style.backgroundColor === "yellow" || this.style.backgroundColor === "orange" || this.style.backgroundColor === "red"))
    {
        this.style.backgroundColor = "lightGrey";
    }
  });
  box[i].addEventListener("mouseout", function(){
    if(!(this.style.backgroundColor === "green" || this.style.backgroundColor === "yellow" || this.style.backgroundColor === "orange" || this.style.backgroundColor === "red"))
    {
        this.style.backgroundColor = "grey";
    }
  });
}

function gen_sq(){

  w_sq = (Math.floor(Math.random() * 13)+1);
  p_sq = (Math.floor(Math.random() * 13)+1);
  g_sq = (Math.floor(Math.random() * 13)+1);
  console.log(w_sq, p_sq, g_sq);
  if(p_sq === 13 || p_sq === 9 || p_sq === 5 || p_sq === 10){
    gen_sq();
  }
  if(w_sq === 13 || w_sq === 9 || w_sq === 5 || w_sq === 10){
    gen_sq();
  }
  if(g_sq === 13 || g_sq === 9){
    gen_sq();
  }
  if(p_sq === w_sq || g_sq == p_sq || g_sq == w_sq){
    gen_sq();
  }
}
function init(){
  gen_sq();
}
set_pos(w_sq, p_sq, g_sq);
function set_pos(w_sq, p_sq, g_sq){
box[w_sq-1].style.backgroundColor = "grey";
box[p_sq-1].style.backgroundColor = "grey";
box[g_sq-1].style.backgroundColor = "grey";
box[8].style.backgroundColor = "green";
}
function rem_all(){
  for(var i =0;i<=box.length;i++){
    if(i === w_sq){
      box[i-1].style.backgroundColor = "grey";
    }
    if(i === p_sq){
      box[i-1].style.backgroundColor = "grey";
    }
    if(i === g_sq){
      box[i-1].style.backgroundColor = "grey";
    }
  }
}
n_g.addEventListener("click", function (){
  rem_all();
  init();
  set_pos(w_sq, p_sq, g_sq);
  indi.style.backgroundColor = "steelBlue";
  disp_l.textContent = "Welcome!";
  disp_r.textContent = "Click on a valid sqaure to begin!";
});
//set up event listerners on each of the squares

$(".g_items").click(function(){
  count= count +1;
  validate(($(".g_items").index(this)));
  final(g_gold);
  over(g_over);
});

//on the click create a function which checks if the click was valid
function validate(clk){
  if(clk === p_pos+1 || clk === p_pos-1 || clk === p_pos-4 || clk === p_pos+4)
  {
    clk_vld = true;
      if(clk_vld)
      {
        disp_l.textContent = "Amazing!";
        disp_r.textContent = "Lets Go!";
        if(count === 4){
          disp_l.textContent = "Great Going!";
        }
        box[clk].style.backgroundColor = "green";
        box[p_pos].style.backgroundColor = "grey";
        p_pos = clk;
      }
      if((clk_vld) && (clk === w_sq-1))
      {
        disp_l.textContent = "OOPS!"
        disp_r.textContent = "Game Over!! Eaten by Wumpus!";
        //alert("Game Over!! Eaten by Wumpus!");
        for(var i =0;i<box.length;i++)
        {
          box[i].style.backgroundColor= "red";
        }
      }
      if((clk_vld) && (clk === p_sq-1))
      {
        disp_l.textContent = "OOPS!"
        disp_r.textContent = "Game Over!! Fell into Pit!";
        //alert("Game Over!! Fell into Pit!");
        for(var i =0;i<box.length;i++)
        {
          box[i].style.backgroundColor= "orange";
        }
      }
      if((clk_vld) && (clk === g_sq-1))
      {
        disp_r.textContent = "Got the Gold! Return To Home Square!";
        //alert("Got the Gold! Return To Home Square!");
        g_gold = true;
        indi.style.backgroundColor = "yellow";
        if(g_gold)
        {
          box[p_pos].style.backgroundColor = "yellow";
          box[clk].style.backgroundColor = "yellow";
        }
      }
      warnings(clk);
  }
    else
      {
        clk_vld = false;
      }
  console.log(clk, clk_vld);
}
function final(g_gld){
  var f_scr = score - count;
  if((g_gld) && (p_pos === 8)){
    disp_l.textContent = "Congratulations! You Won!!!";
    disp_r.textContent = "Your Score is: " + f_scr;
    g_over = true;

    //alert("Congratulations! You Won!!! Your Score is: " + f_scr);
  }
}
function warnings(m_clk){
  var clk = m_clk+1;
  if((clk_vld) && (clk != w_sq) && (clk === w_sq+1 || clk === w_sq-1 || clk === w_sq-4 || clk === w_sq+4))
  {
    disp_l.textContent = "Danger! Wumpus Nearby!";
  }
  if((clk_vld) && (clk != w_sq) && (clk === p_sq+1 || clk === p_sq-1 || clk === p_sq-4 || clk === p_sq+4))
  {
    disp_l.textContent = "Danger! Pit Nearby!";
  }
  console.log(clk, w_sq, p_sq);
}

function over(g_over){
  console.log(g_over);
  if(g_over)
  {
    for(var i =0;i<=box.length;i++){
      box[i].style.backgroundColor = "yellow";
    }
  }
}
//control the validity via a boolean variable
