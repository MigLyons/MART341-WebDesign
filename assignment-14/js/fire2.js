const canvas = document.getElementById('pile');
const ctx = canvas.getContext('2d');

const particles = [];
const flames = [];

function Particle(x, y, size, color, speedX, speedY) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;
  this.speedX = speedX;
  this.speedY = speedY;
}

Particle.prototype.update = function() {
  this.x += this.speedX;
  this.y += this.speedY;
  this.size -= 0.1;
};

Particle.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};

function createParticles(x, y, numParticles, spacing) {
  for (let i = 0; i < numParticles; i++) {
    const size = Math.random() * 5 + 2;
    const speedX = Math.random() * 3 - 1.5;
    const speedY = Math.random() * -3;
    const offsetX = Math.random() * spacing - spacing / 2;
    const offsetY = Math.random() * spacing - spacing / 2;

    // Generate random color (red, orange, yellow)
    const randomColor = getRandomColor();
    
    particles.push(new Particle(x + offsetX, y + offsetY, size, randomColor, speedX, speedY));
  }
}

function createFlames(x, y, numFlames, maxHeight) {
  for (let i = 0; i < numFlames; i++) {
    const height = Math.random() * maxHeight;
    const angle = Math.random() * Math.PI * 2; // Random angle in radians
    const randomColor = getRandomColor();

    flames.push({ x, y, height, angle, randomColor });
  }
}

function getRandomColor() {
  const colors = ['#FF0000', '#FFA500', '#FFFF00']; // Red, Orange, Yellow
  return colors[Math.floor(Math.random() * colors.length)];
}

function drawBackground() {
  const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height, 50, canvas.width / 2, canvas.height, canvas.width);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBaseLogs() {
  ctx.fillStyle = '#8B4513'; // Brown color
  ctx.fillRect(180, canvas.height - 10, 40, 10);
  ctx.fillRect(250, canvas.height - 15, 50, 15);
  ctx.fillRect(320, canvas.height - 10, 40, 10);
}

function animateBonfire() {
  drawBackground();

  drawBaseLogs();

  flames.forEach((flame, index) => {
    drawFlames(flame.x, flame.y, flame.height, flame.angle);
    createParticles(flame.x, flame.y, 2, 20); // Adjust spacing here
    flames[index].height += Math.random() * 2 - 1; // Add some randomness to flame height
  });

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    if (particle.size <= 0.2) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateBonfire);
}

function drawFlames(x, y, height, angle) {
  ctx.fillStyle = getRandomColor();
  ctx.beginPath();
  ctx.moveTo(x, y);
  const tipX = x + Math.cos(angle) * height;
  const tipY = y + Math.sin(angle) * height;
  ctx.lineTo(tipX, tipY);
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.closePath();
}

createFlames(canvas.width / 2, canvas.height - 50, 5, 100); // Create 5 flames starting from the middle
animateBonfire();