dragElement(document.getElementById("box1"));
dragElement(document.getElementById("box2"));
dragElement(document.getElementById("box3"));
dragElement(document.getElementById("box4"));
dragElement(document.getElementById("box5"));
dragElement(document.getElementById("box6"));

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
        element.style.top = roundToHundred(element.offsetTop - pos2) + "px";
        element.style.left = roundToHundred(element.offsetLeft - pos1) + "px";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function roundToHundred(num) {
    num = Number(num);
    return 100 * Math.round(num / 100);
}

window.onload = function() {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // find the element that you want to drag.
    touchEvent(document.getElementById('box1'));
    touchEvent(document.getElementById('box2'));
    touchEvent(document.getElementById('box3'));
    touchEvent(document.getElementById('box4'));
    touchEvent(document.getElementById('box5'));
    touchEvent(document.getElementById('box6'));
    
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
            element.style.top = roundToHundred(element.offsetTop - pos2) + "px";
            element.style.left = roundToHundred(element.offsetLeft - pos1) + "px";
        });
    }    
  }