const canvas = document.getElementById('sakura-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class SakuraPetal {
    constructor(x, y, speed, size) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.angle = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI;
        this.fallSpeed = Math.random() * 2 + 1;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.fallSpeed;
        this.angle += Math.random() * 0.2 - 0.1;
        this.rotation += Math.random() * 0.02 - 0.01;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size);
        ctx.quadraticCurveTo(this.size / 2, -this.size / 2, 0, 0);
        ctx.fillStyle = 'pink';
        ctx.fill();
        ctx.restore();
    }
}

const sakuraPetals = [];

for (let i = 0; i < 25; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 2 + 1;
    const size = Math.random() * 10 + 10;
    sakuraPetals.push(new SakuraPetal(x, y, speed, size));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sakuraPetals.forEach((petal) => {
        petal.draw();
    });
}

function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function update() {
    sakuraPetals.forEach((petal) => {
        petal.update();
        if (petal.y > canvas.height + petal.size) {
            petal.y = -petal.size;
            petal.x = Math.random() * canvas.width;
        }
    });
    draw();
    requestAnimationFrame(update);
}

window.addEventListener("resize", onResize);

update();
