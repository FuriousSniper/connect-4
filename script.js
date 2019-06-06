var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var finished = false
var tab = []
var player = true
var map = new Image()
var winner = null
map.onload = function () {
    ctx.drawImage(map, 0, 100)
}
map.src = "map.png"
function mapInit() {
    for (var i = 0; i < 6; i++) {
        var row = []
        for (var j = 0; j < 7; j++) {
            row.push(0)
        }
        tab.push(row)
    }
    console.log(tab)
}
function drawMap() {
    ctx.drawImage(map, 0, 100)
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            if (tab[i][j] == "R")
                drawCircle(j, i, true)
            if (tab[i][j] == "Y")
                drawCircle(j, i, false)
        }
    }
}
function drawCircle(col, row, player) {
    ctx.beginPath();
    ctx.arc(((col + 1) * 100) - 50, ((row + 1) * 100) + 50, 50, 0, 2 * Math.PI);
    if (player) {
        ctx.fillStyle = "red"
        tab[row][col] = "R"
    }
    else {
        ctx.fillStyle = "yellow"
        tab[row][col] = "Y"
    }
    ctx.fill();
    // console.log(tab)
}
function checkColumn(column) {
    var canPlace = false
    var row
    for (var i = 5; i >= 0; i--) {
        if (tab[i][column] == 0) {
            canPlace = true
            row = i
            break
        }
    }
    if (canPlace) {
        return row
    }
    else
        return "false"
}
function checkMap() { // add more checking
    var full = true
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            if (tab[i][j] == 0) {
                full = false
                break
            }
        }
    }
    if (full) {
        finished = true
        alert("full")
    }

    for (var i = 0; i < 6; i++) { //horizontal ( - )
        for (var j = 0; j < 4; j++) {
            if (tab[i][j] == "R" && tab[i][j + 1] == "R" && tab[i][j + 2] == "R" && tab[i][j + 3] == "R")
                winner = true
            if (tab[i][j] == "Y" && tab[i][j + 1] == "Y" && tab[i][j + 2] == "Y" && tab[i][j + 3] == "Y")
                winner = false
        }
    }
    for (var j = 0; j < 7; j++) { //vertical ( | )
        for (var i = 0; i < 3; i++) {
            if (tab[i][j] == "R" && tab[i + 1][j] == "R" && tab[i + 2][j] == "R" && tab[i + 3][j] == "R")
                winner = true
            if (tab[i][j] == "Y" && tab[i + 1][j] == "Y" && tab[i + 2][j] == "Y" && tab[i + 3][j] == "Y")
                winner = false
        }
    }
    for (var i = 3; i < 6; i++) {//right-top ( / )
        for (var j = 0; j < 4; j++) {
            if (tab[i][j] == "R" && tab[i - 1][j + 1] == "R" && tab[i - 2][j + 2] == "R" && tab[i - 3][j + 3] == "R")
                winner = true
            if (tab[i][j] == "Y" && tab[i - 1][j + 1] == "Y" && tab[i - 2][j + 2] == "Y" && tab[i - 3][j + 3] == "Y")
                winner = false
        }
    }
    for (var i = 5; i > 2; i--) {// left-top ( \ )
        for (var j = 3; j < 6; j++) {
            console.log(i)
            if (tab[i][j] == "R" && tab[i - 1][j - 1] == "R" && tab[i - 2][j - 2] == "R" && tab[i - 3][j - 3] == "R")
                winner = true
            if (tab[i][j] == "Y" && tab[i - 1][j - 1] == "Y" && tab[i - 2][j - 2] == "Y" && tab[i - 3][j - 3] == "Y")
                winner = false
        }
    }
    if (winner != null)
        finished = true

    if (finished) {
        if (winner == null) {
            document.getElementById("playerMove").style.color = "blue"
            document.getElementById("playerMove").innerHTML = "It's a tie!"
        }
        if (winner) {
            document.getElementById("playerMove").style.color = "red"
            document.getElementById("playerMove").innerHTML = "Red player wins!"
        }
        else {
            document.getElementById("playerMove").style.color = "yellow"
            document.getElementById("playerMove").innerHTML = "Yellow player wins!"
        }
    }
    console.log(tab)
}
function animate() {
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#37474f"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        drawMap()
        if (!finished)
            requestAnimationFrame(animate)
    }, 10)
}
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("container").style.height = window.innerHeight + "px"
    document.getElementById("main").style.height = window.innerHeight + "px"
    document.getElementById("begin").addEventListener("click", function () {
        document.getElementById("startingMenu").style.display = "none"
    })
    document.getElementById("playerMove").innerHTML = "Red player moves"
    document.getElementById("playerMove").style.color = "red"
    mapInit()
    animate()
})
canvas.addEventListener("click", function (e) {
    if (!finished) {
        var column = 100
        var columnClick = Math.floor(e.offsetX / column)
        var place = checkColumn(columnClick)
        if (place != "false") {
            drawCircle(columnClick, place, player)
            if (player)
                player = false
            else
                player = true

            if (!player) {
                document.getElementById("playerMove").innerHTML = "Yellow player moves"
                document.getElementById("playerMove").style.color = "yellow"
            }
            else {
                document.getElementById("playerMove").innerHTML = "Red player moves"
                document.getElementById("playerMove").style.color = "red"
            }
        }
        checkMap()
    }
})
