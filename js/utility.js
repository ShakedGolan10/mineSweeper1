'use strict'

function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


// builds BOARD ACCORDING TO GLOBAL SIZE VAR 
function buildBoard(gSize) {
    const board = []
    for (var i = 0; i < gSize; i++) {
        board.push([])
        for (var j = 0; j < gSize; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false

            }

        }

    }


    return board
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var minesAroundCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (mat[i][j].isMine) minesAroundCount++
        }
    }

    return minesAroundCount
}
//


function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine === true) {
                cell = mine
            } else {
                cell = cell.minesAroundCount
            }



            const className = `cell cell-${i}-${j}`
            // data-i="${i}" data-j="${j}"
            strHTML += `<td onclick="CellClicked(this, ${i}, ${j})" 
            oncontextmenu="redFlag(this, ${i}, ${j})"
             class="${className} ">${(board[i][j].isShown) ? cell : ''}</td>`
        }
        strHTML += '</tr>'

    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML


}


function showNieghbors(cellI, cellJ, mat) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            mat[i][j].isShown = true
            const elCell = document.querySelector(`.cell-${i}-${j}`)
            elCell.innerText = setMinesNegsCount(i, j, gBoard)
            elCell.style.backgroundColor = 'grey'
            if (setMinesNegsCount(i, j, gBoard) === 0) {
                elCell.innerText = ''
                elCell.style.backgroundColor = 'grey'
            }
            // renderCell({ i: i, j: j }, mine)
        }

    }

}

function time() {

    var minute = document.querySelector(`.minutes`)
    var seconed = document.querySelector(`.seconds`)
    if (isFirstClick) {

        minute.innerText = `00 : `
        seconed.innerText = `00`

    } else {

        if ((Math.floor((Date.now() - gTimeNow) / 1000)) === 60) {
            gMinuteAmount++
            minute.innerText = `0${gMinuteAmount}:`
            gTimeNow = Date.now()
            return (seconed.innerText = Math.floor((Date.now() - gTimeNow) / 1000))
        } else {
            return (seconed.innerText = Math.floor((Date.now() - gTimeNow) / 1000))
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// //function for suming the diagonal in matrix

// function sumDiagonal(mat) {
//     var sum = 0
//     for (var i = 0; i < mat.length; i++) {
//         var currNum = mat[i][i]
//         sum += currNum

//     }
//     // console.log(sum);
//     return sum
// }

// //function for suming the secondary diagonal in matrix

// function sumOpDiagonal(mat) {
//     var sum = 0

//     for (var i = 0; i < mat.length; i++) {

//         var colIdx = mat.length - i - 1
//         sum += mat[i][colIdx]

//     }

//     return sum

// }

// //if you need a function for random apearens in a board

// function rendomSomethingApear(board) {
//     const emptyCell = []

//     for (var i = 0; i < board.length; i++) {
//         // console.log(gBoard[i]);

//         for (var j = 0; j < board[0].length; j++) {
//             var currCell = board[i][j]

//             emptyCell.push(currCell)

//         }

//     }

// // neg counter



