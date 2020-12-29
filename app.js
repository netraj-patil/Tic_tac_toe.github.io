//HTML selector
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');//to grab all elements with the class name game-cell

//game symbol
const xSymbol = '×';
const oSymbol = '○';
//game variables
let gameIsLive = true;
let xIsNext = true;


//functions
//const letterToSymbol = (letter) => letter = 'x' ? xSymbol : oSymbol;

const handleWin = (letter) =>{
    gameIsLive = false;
    
    if(letter === 'x')
    {
        statusDiv.innerHTML = 'x has won!';
    }else{
        statusDiv.innerHTML = "<span>○ has won!</span>";
    }
};
const checkGameStatus = () =>{
    const topLeft = cellDivs[0].classList[1];   //classList[2] keeps the track of x and o so it is used
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    //is there a winner
    if(topLeft && topLeft === topMiddle && topLeft === topRight){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if(topRight && topRight === middleRight && topRight === bottomRight){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topLeft && topLeft === middleMiddle && topLeft===bottomRight){
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topRight && topRight===middleMiddle && topRight===bottomLeft){
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }else if(topLeft && topRight && topMiddle && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        gameIsLive = false;
        statusDiv.innerHTML = 'DRAW !';
    }else{
        xIsNext = !xIsNext;

        if(xIsNext){
            statusDiv.innerHTML = 'x is next';
        }else{
            statusDiv.innerHTML = '<span>○ is next</span>';
        }
    }
};


//event handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = 'x is next';
    
    gameIsLive=true;
    for(const cellDiv of cellDivs)
    {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
};

const handleCellClick =(e) => {
    const classList = e.target.classList;

    if(!gameIsLive || classList[1] == 'x' || classList[1] == 'o')
    {
        return;
    }
    if(xIsNext)
    {
        classList.add('x');
        checkGameStatus();

        //xIsNext = !xIsNext;
    }
    else{
        classList.add('o');
        checkGameStatus();

        //xIsNext = !xIsNext;
    }
};

//event listeners
resetDiv.addEventListener('click', handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click', handleCellClick);
}