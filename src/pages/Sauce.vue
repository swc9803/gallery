<template>
  <div class="container">
    <p>
      ⚠️Because it uses svg filter, animation breaks can occur on large screens
    </p>
    <div class="retry" @click="retry">retry</div>
    <img />
    <canvas ref="canvasRef" />
    <svg>
      <defs>
        <filter id="blob" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="15" />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10"
          />
          <feBlend mode="normal" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvasRef = ref();
let sauceAnimation;
let ctx;
let effect;

class Ball {
  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 80 + 30;
    this.x = Math.floor(Math.random() * 201) - 100 + canvasRef.value.width / 2;
    this.y = -this.radius;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.gravity = Math.random() * 0.003;
    this.vy = 0;
    this.scaleY = 1;
  }
  update(ballArray) {
    if (this.effect.height + this.radius < this.y) {
      this.radius = Math.random() * 80 + 30;
      this.y = -this.radius;
      this.vy = 0;
      this.speedY = Math.random() * 1 + 1;
    }

    if (this.y > this.radius) {
      this.vy += this.gravity;
      this.speedY += this.vy;
    }

    if (this.y <= this.effect.height - this.radius / 2) {
      this.y += this.speedY;
    } else {
      ballArray.forEach((ball) => {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = this.radius / 2 + ball.radius / 2;
        if (dist < minDist) {
          this.speedY = this.radius * 0.1;
          this.x += this.speedY * Math.sign(dx);
        }
      });
      if (this.scaleY >= 0.5) {
        this.scaleY -= 0.01;
      }
    }
  }
  draw(context) {
    context.beginPath();
    context.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius * this.scaleY,
      0,
      0,
      2 * Math.PI
    );
    context.fill();
  }
  resize() {
    this.x = this.effect.width * 0.5;
    this.y = this.effect.height * 0.5;
  }
}

class BallsEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.ballsArray = [];
  }
  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.ballsArray.push(new Ball(this));
    }
  }
  update() {
    this.ballsArray.forEach((ball, index, arr) => ball.update(arr));
  }
  draw(context) {
    ctx.fillStyle = "#b47d05";
    this.ballsArray.forEach((ball) => ball.draw(context));
  }
  resize(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    this.ballsArray.forEach((ball) => ball.resize());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  effect.update();
  effect.draw(ctx);
  sauceAnimation = requestAnimationFrame(animate);
}

const onResize = () => {
  canvasRef.value.width = window.innerWidth;
  canvasRef.value.height = window.innerHeight;
  effect = new BallsEffect(canvasRef.value.width, canvasRef.value.height);
  effect.resize(canvasRef.value.width, canvasRef.value.height);
  if (matchMedia("(max-width: 768px)").matches) {
    effect.init(20);
  } else {
    effect.init(30);
  }
};

const retry = () => {
  effect = new BallsEffect(canvasRef.value.width, canvasRef.value.height);
  effect.resize(canvasRef.value.width, canvasRef.value.height);
  if (matchMedia("(max-width: 768px)").matches) {
    effect.init(20);
  } else {
    effect.init(30);
  }
};

onMounted(() => {
  ctx = canvasRef.value.getContext("2d");
  onResize();
  animate();

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(sauceAnimation);
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #ffffff;
  overflow: hidden;
  p {
    position: absolute;
    top: 12%;
    left: 50%;
    transform: translate(-50%, -12%);
    color: red;
    text-align: center;
    font-size: 1.2em;
  }
  .retry {
    position: fixed;
    top: 50%;
    right: 10%;
    transform: translate(0, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    background: rgb(200, 255, 0);
    color: rgb(0, 0, 0);
    font-weight: 600;
    border-radius: 50%;
    z-index: 1;
    cursor: pointer;
  }
  img {
    position: absolute;
    background: url("~@/assets/tang.webp") no-repeat center/cover;
    bottom: -1px;
    width: 100%;
    height: 20%;
  }
  canvas {
    position: relative;
    opacity: 0.7;
    filter: url("#blob");
  }
  svg {
    position: absolute;
    height: 0;
  }
}
</style>
