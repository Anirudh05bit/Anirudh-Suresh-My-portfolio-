let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newgamebtn=document.querySelector("#new-btn");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let isConfettiActive = false;

const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiArray = [];
const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7'];
const confettiCount = 150;

class Confetti {
  constructor(x, y, size, color, velocityX, velocityY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.05 - 0.025;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height) {
      this.y = -10;
      this.x = Math.random() * canvas.width;
    }
  }
}
function createConfetti() {
  confettiArray = [];
  isConfettiActive=true;
  for (let i = 0; i < confettiCount; i++) {
    const size = Math.random() * 10 + 5;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocityX = Math.random() * 2 - 1;
    const velocityY = Math.random() * 3 + 2;

    confettiArray.push(new Confetti(x, y, size, color, velocityX, velocityY));
  }
}

function animateConfetti() {
  if (!isConfettiActive) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiArray.forEach((confetti) => {
    confetti.update();
    confetti.draw();
  });

  if (confettiArray.length) {
    requestAnimationFrame(animateConfetti);
  }
}

let turn0 = true;
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetgame=()=>{
    turn0=true;
    enablelebox();
    msgcontainer.classList.add("hide");
    isConfettiActive = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const showwinner=(winner)=>{
    msg.innerText=`Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disablebox();

    createConfetti();
    animateConfetti();
}

const disablebox=()=>{
    for(box of boxes){
        box.disabled=true;  
    }
}

const enablelebox=()=>{
    for(box of boxes){
        box.disabled=false; 
        box.innerText=""; 
    }
}

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
    
        if (turn0){
            box.innerText="O";
            turn0=false
        }else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        for(i of winPatterns){
            
            let pos1val=boxes[i[0]].innerText;
            let pos2val=boxes[i[1]].innerText;
            let pos3val=boxes[i[2]].innerText;

            if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
                if(pos1val===pos2val && pos2val===pos3val){
                    console.log("winner",pos1val)
                    showwinner(pos1val);
                }
            }

        };
    })
})

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
