'use strict'

// Global var and const
var gBoard
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0
}


var gLivesLeft = 3
// stopWatch vars
var isFirstClick = true
var gTime
var gTimeNow
var gTextmode
var gMinuteAmount = 0

// global query selectors
const elScore = document.querySelector(`.scorePoints`)
const elReset = document.querySelector(`.reset`)
const elLives = document.querySelector(`.lives`)
const elSmilyIcon = document.querySelector('.smiley')
const elFlagsCount = document.querySelector(`.flagCount`)
const elVictory = document.querySelector(`.victory`)

// Shapes 
const mine = '💣'
const flag = '🚩'


function initGame() {
    if (gLevel.SIZE === 4) {
        gLivesLeft = 1
    } else {
        gLivesLeft = 3
    }

    // variables 
    gMinuteAmount = 0
    gGame.shownCount = 0
    gGame.markedCount = 0
    // document query
    elSmilyIcon.innerText = '😁😁😁'
    elReset.style.display = `none`
    elVictory.style.display = 'none'
    elScore.innerText = gGame.shownCount
    elFlagsCount.innerText = `Flags count (${gLevel.MINES}): ` + gGame.markedCount
    elLives.innerText = `Lives left : ` + gLivesLeft
    // booleans 
    gGame.isOn = true
    isFirstClick = true
    // stopWatch
    clearInterval(gTime)
    time()

    // gBoard and render 
    gBoard = buildBoard(gLevel.SIZE)

    renderBoard(gBoard)

}


function changeDifficulty(elDifficulty) {
    if (elDifficulty.innerText === 'Easy (16)') {
        gLevel.SIZE = 4
        gLevel.MINES = 2
        initGame()
    }
    if (elDifficulty.innerText === 'Hard (64)') {
        gLevel.SIZE = 8
        gLevel.MINES = 14
        initGame()

    }
    if (elDifficulty.innerText === 'Extreme (144)') {
        gLevel.SIZE = 12
        gLevel.MINES = 32
        initGame()
    }
}

function CellClicked(elCell, i, j) {
    gGame.shownCount = 0
    if (!gGame.isOn) return

    if (isFirstClick) {
        createMines(gLevel.MINES)
        gTimeNow = Date.now()
        gTime = setInterval(time, 1000);
        isFirstClick = false
    }
    if (gBoard[i][j].isShown) {
        return
    }
    if (elCell.innerText === flag) {
        return
    }
    // check if mine
    if (gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true
        renderCell({ i: i, j: j }, mine)
        gLivesLeft--
        elLives.innerText = `Lives left : ` + gLivesLeft
        if (gLivesLeft === 0) {
            gameOver()
            elCell.style.backgroundColor = 'red'
            for (let i = 0; i < gBoard.length; i++) {
                for (let j = 0; j < gBoard.length; j++) {
                    if (gBoard[i][j].isMine) {
                        gBoard[i][j].isShown = true
                        renderCell({ i: i, j: j }, mine)
                    }
                }
            }
        }
        return
    } else {
        // Open a cell
        gBoard[i][j].isShown = true
        elCell.innerText = setMinesNegsCount(i, j, gBoard)
        elCell.style.backgroundColor = 'grey'
    }
    // expanding
    if (setMinesNegsCount(i, j, gBoard) === 0) {
        elCell.innerText = ''
        elCell.style.backgroundColor = 'grey'
        showNieghbors(i, j, gBoard)

    }
    // count isShown
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isShown &&
                gBoard[i][j].isMine === false) {
                gGame.shownCount++
                // score is shown
                elScore.innerText = gGame.shownCount + ` (${((gLevel.SIZE ** 2) - gLevel.MINES)} to win)`
            }
            // check victory with every click
            if (gGame.shownCount === ((gLevel.SIZE ** 2) - gLevel.MINES)) {

                victory()
            }

        }
    }
}

function createMines(NumOfMines) {

    for (var i = 0; i < NumOfMines; i++) {
        var d = getRandomInt(0, gLevel.SIZE)
        var j = getRandomInt(0, gLevel.SIZE)
        if (gBoard[d][j].isMine === true) {
            i--
        } else {
            gBoard[d][j].isMine = true
        }

    }
}

function redFlag(elFlag, i, j) {
    if (isFirstClick) {
        gTimeNow = Date.now()
        gTime = setInterval(time, 1000);
        isFirstClick = false
    }
    if (!gGame.isOn) return

    if (gBoard[i][j].isShown) {
        return
    }

    if (gBoard[i][j].isMarked === false) {
        gGame.markedCount++
        gBoard[i][j].isMarked = true
        // checking the flags count
        if (gGame.markedCount > gLevel.MINES) {
            gGame.markedCount--
            gBoard[i][j].isMarked = false
        } else {
            elFlag.innerText = flag
        }
    } else if (gBoard[i][j].isMarked) {
        elFlag.innerText = ''
        gBoard[i][j].isMarked = false
        gGame.markedCount--

    }
    elFlagsCount.innerText = `Flags count (${gLevel.MINES}): ` + gGame.markedCount
}

function victory() {

    clearInterval(gTime)
    restartModal()
    gGame.isOn = false
    elSmilyIcon.innerText = '🤠🤠🤠'
    elVictory.style.display = 'block'
    elReset.innerHTML = ` <button onclick="initGame()">Start Over 😋</button>`
}

function gameOver() {
    clearInterval(gTime)
    restartModal()
    gGame.isOn = false
    elSmilyIcon.innerText = '🤯🤯🤯'
}

function restartModal() {
    if (gGame.isOn) {
        elReset.innerHTML = ` <button onclick="initGame()">Try Again 😋</button>`
        elReset.style.display = `block`
    } else {
        elReset.innerHTML = ``
        return
    }
}