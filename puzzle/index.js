/*function resize(event) {
    visualViewport.height = document.documentElement.clientHeight;
    visualViewport.width = document.documentElement.clientWidth;
}
window.addEventListener("resize", resize, false);
resize();*/

for (let i = 1; i <= 15; i++) {
    dragElement(document.getElementById("box" + i));
    document.getElementById("box" + i).style.top = String((document.documentElement.clientHeight-374)*Math.random()) + "px";
    document.getElementById("box" + i).style.left = String((document.documentElement.clientWidth-392)*Math.random()) + "px";
}

console.log(window.innerHeight, window.innerWidth);
console.log(visualViewport.height, visualViewport.width)
console.log(document.documentElement.clientHeight, document.documentElement.clientWidth);


let highestZindex = 0

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

    function touchEvent(element) {
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
  }