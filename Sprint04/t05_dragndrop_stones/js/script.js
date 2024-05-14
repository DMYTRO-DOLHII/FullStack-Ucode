let button = {
    target: null
}
let container = document.getElementById("container");

container.addEventListener("mouseup", () => {
    event.target.style.cursor = "default";
    button.target = null;
});


container.addEventListener("mousemove", e => {
    if (button.target != null) {
        button.target.style.top = ( - button.offsetY + e.pageY) + "px";
        button.target.style.left = ( - button.offsetX + e.pageX) + "px";
       
    }
});

container.addEventListener("dblclick", event => {
    if (event.target.classList.contains("stone") && event.target != null ) {
        if (event.target.getAttribute("value") !== "on") {
            event.target.setAttribute("value", "on");
        }
        else {
            event.target.setAttribute("value", "off");
        }
    }
});

container.addEventListener("mousedown", event => {
    if (event.target.getAttribute("value") === "on" && event.target != null && event.target.classList.contains("stone")) {
        button.target = event.target;
        button.offsetY = event.offsetY;
        button.offsetX = event.offsetX;
        event.target.style.cursor = "none";

    }
});