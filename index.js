var btnColors = ["red", "blue", "green", "yellow"];
var gamePressOrder = [];
var userPressOrder = [];
var order = 0;
var level = 1;

function levelUp() {
    $("#level-title").text("Level " + level);
}

function gameOverText() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
}

function generateRng() {
    var rng = Math.floor(Math.random() * 4);
    console.log(rng);
    return rng;
}

function gameLogic(buttonColor) {
    if (buttonColor == gamePressOrder[order]) {
        /*btnFunctionality(buttonColor);*/
        order += 1;

        if (order == gamePressOrder.length) {
            order = 0;
            level += 1;
            addNewButton();
            levelUp();
        }
    } else {
        $("body").toggleClass("game-over");
        setTimeout(function() {$("body").toggleClass("game-over")}, 200);
        gameOverText();
        gamePressOrder = [];
        console.log(gamePressOrder);
        order = 0;
        level = 1;
        var gameOverSound = new Audio("./sounds/wrong.mp3");
        gameOverSound.play();
    }
}

function btnFunctionality(btnPressed) { 
     /*Play's sound coresponding to the button that's pressed via the e parametar
            from the object initialized through the .on method and passed through the
            callback method gameStart(e).*/
            switch (btnPressed) {
                case "red":
                    var red = new Audio("sounds/red.mp3");
                    red.play();
                    break;
                
                case "green":
                    var green = new Audio("sounds/green.mp3");
                    green.play();
                    break;
        
                case "blue":
                    var blue = new Audio("sounds/blue.mp3");
                    blue.play();
                    break;
        
                case "yellow":
                    var yellow = new Audio("sounds/yellow.mp3");
                    yellow.play();
                    break;
            
                default:
                    break;
            }
            /*Toggles animation off after 110ms. (class='pressed')*/
            $("#" + btnPressed).toggleClass("pressed");
            setTimeout(function () {
                $("#" + btnPressed).toggleClass("pressed");
            }, 110);
}

function addNewButton() {
    /* Pick's a random button color. */
    var currentBtn = btnColors[generateRng()];
    /* Adds the current button color to the button order. */
    gamePressOrder.push(currentBtn); 
    /* Animates and plays sound for the current button. */
    setTimeout(btnFunctionality, 500, currentBtn);
    console.log(gamePressOrder);
}

function gameStart(e) {
    if (e.key === " ") {
        levelUp();
        addNewButton();
}}

$('.btn').on("click", function(e){
    var pressedBtn = e.target.id;
    btnFunctionality(pressedBtn);
    gameLogic(pressedBtn);
    console.log(userPressOrder);  

});

$(document).on("keydown", gameStart);





