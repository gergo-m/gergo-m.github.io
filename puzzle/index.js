/*function resize(event) {
    visualViewport.height = document.documentElement.clientHeight;
    visualViewport.width = document.documentElement.clientWidth;
}
window.addEventListener("resize", resize, false);
resize();*/

/*for (let i = 1; i <= 15; i++) {
    dragElement(document.getElementById("box" + i));
    document.getElementById("box" + i).style.top = String((document.documentElement.clientHeight-374)*Math.random()) + "px";
    document.getElementById("box" + i).style.left = String((document.documentElement.clientWidth-392)*Math.random()) + "px";
}*/

/*console.log(window.innerHeight, window.innerWidth);
console.log(visualViewport.height, visualViewport.width)
console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);*/

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

for (let i = 1; i <=14; i++) {
    var rand = Math.floor(Math.random() * 15) + 1;
    console.log(rand);
    if (document.getElementById("pl"+i)) {
        //while (nums[rand] == 0) {
            var prLastChild = document.getElementById("pl"+i).children[document.getElementById("pl"+i).childElementCount-1];
            document.getElementById("pl"+i).appendChild(document.getElementById("pl"+rand).children[document.getElementById("pl"+rand).childElementCount-1]);
            document.getElementById("pl"+rand).appendChild(prLastChild);
        //    rand = Math.floor(Math.random() * 15);
        //}
        //nums[rand] = 0;
    }
}

const dirs = ["left", "right", "down", "up"];
const dirsc = ["-1", "+1", "+3", "-3"];

for (let i = 0; i <=3; i++) {
    for (let j = 1; j <=15; j++) {
        /*console.log("1worked");
        console.log(dirs[i]+j);
        console.log(dirsc[i]);
        console.log(j+Number(dirsc[i]));      */                                       // i = 3       j = 14
        if (document.getElementById(dirs[i] + j)) {
            document.getElementById(dirs[i] + j).onclick = function() {
                console.log("2worked");
                var prLastChild = document.getElementById("pl" + (j+Number(dirsc[i]))).children[document.getElementById("pl" + (j+Number(dirsc[i]))).childElementCount-1];
                console.log(document.getElementById("pl" + (j)).children[document.getElementById("pl" + (j)).childElementCount-1]);
                console.log(document.getElementById("pl" + (j+Number(dirsc[i]))).children[document.getElementById("pl" + (j+Number(dirsc[i]))).childElementCount-1]);
                document.getElementById("pl" + (j+Number(dirsc[i]))).appendChild(document.getElementById("pl" + (j)).children[document.getElementById("pl" + (j)).childElementCount-1]);
                document.getElementById("pl" + j).appendChild(prLastChild);
            }
        }
    }
}

/*for (let i = 1; i <= 15; i++) {
    console.log("1worked")
    if (document.getElementById("up" + i)) {
        document.getElementById("up" + i).onclick = function() {
            console.log("2worked")
            var spos = document.getElementById("up" + (i-3));
            var prLastChild = document.getElementById("pl" + (i-3)).children[document.getElementById("pl" + (i-3)).childElementCount-1];
            console.log(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1])
            console.log(document.getElementById("pl" + (i-3)).children[document.getElementById("pl" + (i-3)).childElementCount-1])
            document.getElementById("pl" + (i-3)).appendChild(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1]);
            document.getElementById("pl" + i).appendChild(prLastChild);
        }
    }
    if (document.getElementById("down" + i)) {
        document.getElementById("down" + i).onclick = function() {
            console.log("2worked")
            var spos = document.getElementById("down" + (i+3));
            var prLastChild = document.getElementById("pl" + (i+3)).children[document.getElementById("pl" + (i+3)).childElementCount-1];
            console.log(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1])
            console.log(document.getElementById("pl" + (i+3)).children[document.getElementById("pl" + (i+3)).childElementCount-1])
            document.getElementById("pl" + (i+3)).appendChild(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1]);
            document.getElementById("pl" + i).appendChild(prLastChild);
        }
    }
    if (document.getElementById("right" + i)) {
        document.getElementById("right" + i).onclick = function() {
            console.log("2worked")
            var spos = document.getElementById("right" + (i+1));
            var prLastChild = document.getElementById("pl" + (i+1)).children[document.getElementById("pl" + (i+1)).childElementCount-1];
            console.log(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1])
            console.log(document.getElementById("pl" + (i+1)).children[document.getElementById("pl" + (i+1)).childElementCount-1])
            document.getElementById("pl" + (i+1)).appendChild(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1]);
            document.getElementById("pl" + i).appendChild(prLastChild);
        }
    }
    if (document.getElementById("left" + i)) {
        document.getElementById("left" + i).onclick = function() {
            console.log("2worked")
            var spos = document.getElementById("left" + (i-1));
            var prLastChild = document.getElementById("pl" + (i-1)).children[document.getElementById("pl" + (i-1)).childElementCount-1];
            console.log(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1])
            console.log(document.getElementById("pl" + (i-1)).children[document.getElementById("pl" + (i-1)).childElementCount-1])
            document.getElementById("pl" + (i-1)).appendChild(document.getElementById("pl" + (i)).children[document.getElementById("pl" + (i)).childElementCount-1]);
            document.getElementById("pl" + i).appendChild(prLastChild);
        }
    }
}*/


/*let highestZindex = 0

function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (element) {
        element.onmousedown = dragMouseDown;
    } else {
        element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        highestZindex += 1
        element.style.zIndex = highestZindex;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        element.style.top = roundToNum(98, element.offsetTop - pos2) + "px";
        element.style.left = roundToNum(93.5, element.offsetLeft - pos1) + "px";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function roundToNum(roundTo, num) {
    num = Number(num);
    roundTo = Number(roundTo);
    return roundTo * Math.round(num / roundTo);
}

window.onload = function() {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // find the element that you want to drag.
    for (let i = 1; i <= 15; i++) {
        touchEvent(document.getElementById("box" + i));
    }
    
    /* listen to the touchMove event,
    every time it fires, grab the location
    of touch and assign it to box */

    /*function touchEvent(element) {
        element.addEventListener("touchstart", function(e) {
            pos3 = e.targetTouches[0].clientX;
            pos4 = e.targetTouches[0].clientY;
        });
        element.addEventListener('touchmove', function(e) {
            // grab the location of touch
            pos1 = pos3 - e.targetTouches[0].clientX;
            pos2 = pos4 - e.targetTouches[0].clientY;
            pos3 = e.targetTouches[0].clientX;
            pos4 = e.targetTouches[0].clientY;
            // assign box new coordinates based on the touch.
            element.style.top = (element.offsetTop - pos2) + 'px';
            element.style.left = (element.offsetLeft - pos1) + 'px';
        });
        element.addEventListener('touchend', function(e) {
            // current box position.
            element.style.top = roundToNum(98, element.offsetTop - pos2) + "px";
            element.style.left = roundToNum(93.5, element.offsetLeft - pos1) + "px";
        });
    }    
  }*/