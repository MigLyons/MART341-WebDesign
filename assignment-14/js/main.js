const canvas = document.getElementById('pile');
const ctx = canvas.getContext('2d');

const particles = [];

function Particle(x, y, size, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.speedX = Math.random() * 3 - 1.5;
  this.speedY = Math.random() * -3;
}

Particle.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;
  if (this.size > 0.2) this.size -= 0.1;
};

Particle.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

function createParticles(x, y, numParticles) {
  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 5 + 2;
    const color = 'rgba(255, ' + Math.floor(Math.random() * 100) + ', 0, 1)';
    particles.push(new Particle(x, y, size, color));
  }
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height, 50, canvas.width / 2, canvas.height, canvas.width);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animateBonfire() {
  drawBackground();

  const fireHeight = Math.sin(Date.now() * 0.002) * 50 + 150;

  drawBonfire(fireHeight);

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.size <= 0.2) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateBonfire);
}

function drawBonfire(fireHeight) {
  ctx.fillStyle = 'rgba(255, 100, 0, 1)';
  ctx.fillRect(250, 400 - fireHeight, 100, fireHeight);

  createParticles(canvas.width / 2, canvas.height, 2);
}

animateBonfire();
