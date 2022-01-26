// A script to make the canvas a canvas. You know, you draw on the canvas (IRL).

// Why does JavaScript not define the RGB function but it does inside a string. How confusing is that?
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
};

window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    canvas.height = innerHeight;
    canvas.width = innerWidth;

    var mouseover = false;

    /* let painting = false;
    let mousein = false;

    function paint(mouse) {
        if (!mousein) { painting = false; ctx.beginPath(); return };
        if (!painting) return;
        ctx.lineWidth = 10;
        ctx.lineCap = "round";

        ctx.lineTo(mouse.clientX, mouse.clientY);
        ctx.strokeStyle = rgb(204, 204, 204);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouse.clientX, mouse.clientY);
    };

    // Event listeners
    canvas.addEventListener("mousedown", (input) => { painting = true; paint(input) });
    window.addEventListener("mouseup", () => { painting = false; ctx.beginPath() });
    canvas.addEventListener("mousemove", paint);
    canvas.addEventListener("mouseout", () => { mousein = false; ctx.beginPath() });
    canvas.addEventListener("mouseover", () => { mousein = true }); */

    var mouse = {
        x: undefined,
        y: undefined
    }

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    })

    window.addEventListener("mouseover", () => {
        mouseover = true;
    });

    window.addEventListener("mouseout", () => {
        mouseover = false;
    });

    function circle(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;

        this.draw = () => {
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = rgb(204, 204, 204);
            ctx.fill();
            ctx.beginPath();
        };

        this.update = () => {
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = (Math.random() - 0.5) * 1
                this.dx = -this.dx;
            } else if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = (Math.random() - 0.5) * 1
                this.dy = -this.dy;
            };

            this.x += this.dx;
            this.y += this.dy;

            // interract
            if (mouseover == true && mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < 5) {
                this.radius += 1;
            } else if (this.radius > 1) {
                this.radius -= 1;
            }

            this.draw();
        };
    }

    var circleArray = [];
    var radius = 1;

    for (var i = 0; i < ((canvas.height * canvas.width) / 1000); i++) {
        circleArray.push(new circle(Math.random() * (innerWidth - radius * 2) + radius, Math.random() * (innerHeight - radius * 2) + radius, (Math.random() - 0.5) * 1, (Math.random() - 0.5) * 1, radius))
    };

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (var i = 0; i < circleArray.length; i++) {
            circleArray[i].update();
        };
    };

    animate()

    console.log()

    /* for (var i = 0; i < 100; i++) {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        ctx.arc(x, y, 20, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.beginPath();
    }; */
});

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
});