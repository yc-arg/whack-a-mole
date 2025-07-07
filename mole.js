let currMoleTile; //will help us keep track of which tile has the mole
let currGirlTile1;
let currGirlTile2;
let score = 0;
let gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    //set up the grid for the game board in html
    for (let i=0; i<9; i++) // i goes from 0 to 8, stops at 9
    {
        //create div tag in javascript with ids 0-8 for each tile
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click",selectTile);
        document.getElementById("board").appendChild(tile); //assigning ids to tiles inside the board div

    }

    setInterval(setMole, 1500); //every 2 sec setMole will be called and it will set a mole on a tile
    setInterval(setGirl1, 2000);
    setInterval(setGirl2, 3000);
}

function getRandomTile() {
    //math.random returns a number between (0-1)*9 = round down to (0-8)int
    let num = Math.floor(Math.random()*9);
    return num.toString();
}

function setMole()
{
    if (gameOver)
    {
        return;
    }
    //clear previous tile when mole appears in new tile
    if(currMoleTile)
    {
        currMoleTile.innerHTML = "";
    }

    let num = getRandomTile();

    if((currGirlTile1 && currGirlTile1.id == num) || (currGirlTile2 && currGirlTile2.id == num)){
        return;
    }

    let mole = document.createElement("img");
    mole.src = "./mole_nosmack.png";

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setGirl1()
{
    if (gameOver)
    {
        return;
    }
    if(currGirlTile1)
    {
        currGirlTile1.innerHTML = "";
    }

    let num = getRandomTile();
    if((currMoleTile && currMoleTile.id == num) || (currGirlTile2 && currGirlTile2.id == num)){
        return;
    }

    let girl = document.createElement("img");
    girl.src = "./girl_nosmack.png";
    
    currGirlTile1 = document.getElementById(num);
    currGirlTile1.appendChild(girl);
}

function setGirl2()
{
    if (gameOver)
    {
        return;
    }
    if(currGirlTile2)
    {
        currGirlTile2.innerHTML = "";
    }

    let num = getRandomTile();
    if((currGirlTile1 && currGirlTile1.id === num) || (currMoleTile && currMoleTile.id == num)){
        return;
    }

    let girl = document.createElement("img");
    girl.src = "./girl_nosmack.png";
    
    currGirlTile2 = document.getElementById(num);
    currGirlTile2.appendChild(girl);
}

function selectTile() 
{
    if (gameOver)
        {
            return;
        }
    if(this == currMoleTile)
    {
        let moleImg = this.querySelector("img");
        if (moleImg) {
            moleImg.src = "./mole_smack.png"; // Change to smacked image and keep it
        }

        score += 10;
        document.getElementById("score").innerText = score.toString(); //updates score
    }

    else if (this === currGirlTile1 || this === currGirlTile2)
    {
        let girlImg = this.querySelector("img");
        if (girlImg) {
            girlImg.src = "./girl_smack.png"; // change to smack image
        }

        //document.getElementById("score").innerText = "GAME OVER T-T, score: " + score.toString();
        //gameOver = true;

        gameOver = true;
        document.getElementById("finalScore").innerText = "Score: " + score;
        document.getElementById("gameOverMenu").classList.remove("hidden");

    }
}

function restartGame() {
    // Reset variables
    score = 0;
    gameOver = false;
    currMoleTile = null;
    currGirlTile1 = null;
    currGirlTile2 = null;
    document.getElementById("score").innerText = "0";

    // Clear all tiles
    for (let i = 0; i < 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";
    }

    // Hide game over menu
    document.getElementById("gameOverMenu").classList.add("hidden");
}