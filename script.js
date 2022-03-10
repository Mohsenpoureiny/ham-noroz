window.addEventListener('load', function () {
    const canvas = document.getElementById("canvas-1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particleList = [];
    let mouse = {
        x: undefined,
        y: undefined,
    }
    let colorDeg = 270;
    let colorDegRatio = 1;
    class Particle {
        constructor() {
            this.speedX = Math.random() * 4 - 1;
            this.speedY = Math.random() * 4 - 1;
            this.color = `hsl(${colorDeg},100%,50%)`;
            this.size = Math.floor(Math.random() * 4) + 1;
            this.x = mouse.x;
            this.y = mouse.y;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedX -= 0.01;
            this.speedY -= 0.01;
            this.size += 0.01;
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    function render() {
        ctx.fillStyle = "rgba(0,0,0,0.01)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particleList.forEach(function (particle, i) {
            particle.update();
            if (particle.speedX < 0.2 && particle.speedY < 0.2) {
                particleList.splice(i, 1);
            } else {
                particle.draw();
            }
        });
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "rgba(255,255,255)";
        ctx.fillText("Shake mouse !", canvas.width / 2 - 50, canvas.height / 2 - 100);
        ctx.font = "bold 100px Arial";
        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillText("Hamravesh", canvas.width / 2 - 250, canvas.height / 2);
        requestAnimationFrame(render);
    }
    window.addEventListener('mousemove', function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
        colorDeg += colorDegRatio;
        console.log(colorDeg,colorDegRatio , colorDeg > 330|| colorDeg < 270);
        if (colorDeg > 330 || colorDeg < 270) {
            colorDegRatio *= -1;
        }
        for (let index = 0; index < 6; index++) {
            let particle = new Particle();
            particleList.push(particle);
        }
    });
    render();
});