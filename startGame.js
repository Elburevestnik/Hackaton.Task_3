'use strict'
var randColor = [];
var currentColor = 'white';
var currentIndexFirst = 'white';
var currentIndex = 'cell_1';
var nextColor = 'white';
var nextIndex = 'cell_1';
var flag = true;
var flagStart = false;
var flagWhite = false;
var count = 0;
var minute = 0;
var second = 0;
var timeId = 0;
var goodCell = [];
var flagClick = true;
function start() {
    document.getElementById('timer').value = '0';
    var arrLen= document.getElementsByTagName('td').length;
    initState(arrLen);
    var colorObject = {
        '1': 'red',
        '2': 'orange',
        '3': 'yellow',
        '4': 'green',
        '5': 'blue',
        '6': 'navy',
        '7': 'indigo',
        '8': 'gray'
    };
    var arrIndexOfColor = getRandColor();

    for(var i = 0; i < arrIndexOfColor.length; i++) {
      window.randColor.push(colorObject[arrIndexOfColor[i]]);
    }
    console.log(window.randColor)
    window.flagStart = true
    document.getElementById('timer').value = window.minute + ':' + window.second;
    startTimer(window.count, arrLen);
}
function initState(arrLen) {
        var arrCell = [];
        for(var i = 1; i <= arrLen; i++) {
            arrCell.push('cell_'+ i);
        }
            for(var j = 0; j < arrLen; j++) {
                document.getElementById(arrCell[j]).setAttribute('bgcolor', 'white');

        }
}

function getRandColor() {
    var arrRandColor = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];
    arrRandColor.sort(function(a, b){
        return Math.random() - 0.5;
    });
    return arrRandColor;
}

function getColor(key) {

    if(!flagStart) {
        alert('Error! Click Start!');
    } else {
        if(!window.flagClick) {

        } else {
            if (find(window.goodCell, 'cell_' + key)) {

            } else {
                document.getElementById('cell_' + key).setAttribute('bgcolor', window.randColor[(+key) - 1]);
                if (window.flag) {
                    window.flagWhite = false;
                    window.currentColor = window.randColor[(+key) - 1];

                    window.currentIndex = 'cell_' + key;
                    window.flag = false;
                } else {
                    window.nextColor = window.randColor[(+key) - 1];
                    window.currentIndexFirst = window.currentIndex;
                    window.nextIndex = 'cell_' + key;
                    window.flagClick = false;
                    window.flagWhite = comparisonColor(window.currentColor, window.nextColor);
                    if (!window.flagWhite) {
                        window.count++;
                        window.goodCell.push(window.currentIndexFirst);
                        window.goodCell.push(window.nextIndex);
                        console.log(window.count)
                    }
                    window.flag = true;

                }

                if (window.flagWhite) {
                    setTimeout(function () {
                        reset()
                    }, 700);
                }
            }
        }
    }
}
function comparisonColor(firstColor, secondColor) {

    if(firstColor === secondColor) {
        window.flagClick = true;
        return false;
    }    else return true;

}
function reset() {
    document.getElementById(window.currentIndexFirst).setAttribute('bgcolor', 'white');
    document.getElementById(window.nextIndex).setAttribute('bgcolor', 'white');
    window.flagClick = true;
}

function timer() {
    if (window.count < 8) {
    document.getElementById('timer').value = window.minute + ':' + window.second;
    window.second++;
    if ((window.second % 60) == 0) {
        window.minute++;
        window.second = 0;
    }

    } else {
        clearInterval(window.timeId);
        alert('You are win! Your time: ' + document.getElementById('timer').value);
    }


}
function startTimer() {

    window.timeId = setInterval(function () {
            timer()
        }, 1000);

}
function find(arr, element) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i] === element) {
            return true;
        }
    }
    return false;
}