let buttons = document.querySelectorAll(".btn")

let playButton = document.querySelector(".btn-play")

let body = document.querySelector("body")

let buttonColors = ["red", "blue", "green", "yellow"]

let gamePattern = []

let userClickedPattern = []

var started = false

var level = 0

let levelTitle = document.querySelector('#level-title')

// let userChosenColor = buttons.getAttribute('id')



playButton.addEventListener("click", () => {
   if (!started) {
      levelTitle.innerHTML = `Level ${level}`
      nextSequence()
      started = true
      playButton.style.display = "none"
  }
})

function nextSequence() {
   userClickedPattern = []
   let randomNumber = Math.floor(Math.random()*4)
   let randomChosenColor = buttonColors[randomNumber]
   gamePattern.push(randomChosenColor)
   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor)
   level++;
   levelTitle.innerHTML = `Level ${level}`
}

buttons.forEach(button => button.addEventListener('click', () => {
   let userChosenColor = button.getAttribute('id')
   userClickedPattern.push(userChosenColor)
   playSound(userChosenColor)
   $(`#${userChosenColor}`).fadeIn(50).fadeOut(50).fadeIn(50) // used jquery to animation
   checkAnswer(userClickedPattern.length-1);
}));

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
         if (userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
            nextSequence()
         }, 1000); 
      }
   } else {
      playSound("wrong")
      body.classList.add("game-over")
      levelTitle.innerHTML = ("Игра окончена.")
      playButton.style.display = "block"
      playButton.innerHTML = ("Еще раз")

      setTimeout(() => {
        body.classList.remove("game-over")
      }, 200)

      startOver()
   }
}

function playSound(name) {
   let audio = new Audio(`sounds/${name}.mp3`)
   audio.play()
}

function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
}