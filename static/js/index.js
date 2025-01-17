const DURATION="300ms";
const INTERVAL=3000;

var index=1;
var isAutoPlay;
var innerBox=document.querySelector(".inner-box");
var slideNum=document.querySelectorAll('.slide-ele').length;

var moveWidth=document.querySelector('.inner-box').offsetWidth;
var currentOffset=moveWidth;
var dotItems = document.querySelectorAll('.dots');

var animate;
function changeDotsStyle() {
 document.querySelector('.dots.dots-active').classList.remove('dots-active');
  if(index==slideNum){
    dotItems[0].classList.add('dots-active');
  }else{
    dotItems[index - 1].classList.add('dots-active');
  }
}

function carousel(dur=DURATION){
  innerBox.addEventListener('transitionend', () => {
  if(index==slideNum+1){
index=1;
currentOffset = moveWidth;
changeBoxLoc(0,"0ms");
}
} )
if(index<=slideNum){

currentOffset = moveWidth * (index-1);
changeBoxLoc(-currentOffset,dur);
index++;
}

  
}
function changeBoxLoc(offset,duration="0ms"){
  changeDotsStyle() ;
  innerBox.style.transform=`translateX(${offset}px)`;

  innerBox.style.transitionDuration=duration;
}



function autoPlay(){
  if(isAutoPlay){ return; }
	isAutoPlay = true;
  animate=setInterval(carousel,INTERVAL)
}

function stopAutoPlay() {
	if(!isAutoPlay){ return; }
	isAutoPlay = false;
	clearInterval(animate);
}



function changePageStyle(){
  
  var bodyTag=document.getElementsByTagName("body")[0];
  bodyTag.onclick=function(){
    
    var balloon=document.getElementsByClassName("balloon")[0];
    //balloon.style.animation='jumpout 1.2s ease ';
        var firstPage=document.getElementsByClassName("first-page");
    
    var secondPage=document.getElementsByClassName("second-page");
        for(let i=0;i<firstPage.length;i++){
      firstPage[i].style.animation='jumpout 1.2s 1';
     setTimeout(function(){
      firstPage[i].style.display='none';
     },1200);
    }
    for(let i=0;i<secondPage.length;i++){
      setTimeout(function(){
        secondPage[i].style.display='block';
        moveWidth=document.querySelector('.slide-ele').offsetWidth+0.7;
       },1200);
    }
    bodyTag.onclick=null;
  }
 
}



function changeLogin(){
loginTitle=document.querySelectorAll('.login-title');
loginForm=document.querySelectorAll('.login-form');
for(tit of loginTitle)
{
  tit.addEventListener("click",(e)=>{
     
    titleIndex=e.target.getAttribute('title-index')
    formIndex=document.querySelector('.form-active').getAttribute('form-index');
    if(titleIndex!=formIndex){
    activeTitle=document.querySelector('.login-active').classList.remove('login-active');
    activeForm=document.querySelector('.form-active').classList.remove('form-active');
    loginTitle[titleIndex-1].classList.add('login-active')
    loginForm[titleIndex-1].classList.add('form-active');
    }
  })
}
}


window.onload = function() {
  changeLogin();
  changePageStyle();
  autoPlay();
  dotsControl();

}
var overlay = document.getElementById("overlay");

// Buttons to 'switch' the page
var openSignUpButton = document.getElementById("slide-left-button");
var openSignInButton = document.getElementById("slide-right-button");

// The sidebars
var leftText = document.getElementById("sign-in");
var rightText = document.getElementById("sign-up");

// The forms
var accountForm = document.getElementById("sign-in-info")
var signinForm = document.getElementById("sign-up-info");

// Open the Sign Up page
openSignUp = () =>{
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation-out");
  overlay.classList.remove("open-sign-in");
  rightText.classList.remove("overlay-text-right-animation");
  // Add classes for animations
  accountForm.className += " form-left-slide-out"
  rightText.className += " overlay-text-right-animation-out";
  overlay.className += " open-sign-up";
  leftText.className += " overlay-text-left-animation";
  // hide the sign up form once it is out of view
  setTimeout(function(){
    accountForm.classList.remove("form-left-slide-in");
    accountForm.style.display = "none";
    accountForm.classList.remove("form-left-slide-out");
  }, 700);
  // display the sign in form once the overlay begins moving right
  setTimeout(function(){
    signinForm.style.display = "flex";
    signinForm.classList += " form-right-slide-in";
  }, 200);
}

// Open the Sign In page
openSignIn = () =>{
  // Remove classes so that animations can restart on the next 'switch'
  leftText.classList.remove("overlay-text-left-animation");
  overlay.classList.remove("open-sign-up");
  rightText.classList.remove("overlay-text-right-animation-out");
  // Add classes for animations
  signinForm.classList += " form-right-slide-out";
  leftText.className += " overlay-text-left-animation-out";
  overlay.className += " open-sign-in";
  rightText.className += " overlay-text-right-animation";
  // hide the sign in form once it is out of view
  setTimeout(function(){
    signinForm.classList.remove("form-right-slide-in")
    signinForm.style.display = "none";
    signinForm.classList.remove("form-right-slide-out")
  },700);
  // display the sign up form once the overlay begins moving left
  setTimeout(function(){
    accountForm.style.display = "flex";
    accountForm.classList += " form-left-slide-in";
  },200);
}

// When a 'switch' button is pressed, switch page
openSignUpButton.addEventListener("click", openSignUp, false);
openSignInButton.addEventListener("click", openSignIn, false);
