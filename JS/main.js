import { setupGround, updateGround } from "./ground.js";
import { getDinoRect, setDinoLose, setupDino, updateDino } from "./dino.js";
import { getCactusRects, setupCactus, updateCactus } from "./cactus.js";

const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoredElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");

const setPixelToWorldScale = () => {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  else worldToPixelScale = window.innerHeight / WORLD_HEIGHT;

  worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
};

let lastTime;
let speedScale;
let score;

const update = (time) => {
  if (lastTime == null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta, speedScale);
  updateDino(delta, speedScale);

  updateSpeedScale(delta);
  updateScore(delta);
  updateCactus(delta, speedScale);
  
  if (checkLose()) return handleLose();

  lastTime = time;
  window.requestAnimationFrame(update);
};

const updateSpeedScale = (delta) => {
  speedScale += delta * SPEED_SCALE_INCREASE;
};

const updateScore = (delta) => {
  score += delta * 0.01;
  scoredElem.textContent = Math.ceil(score);
};

const checkLose = () => {
  const dinoRect = getDinoRect();
  return getCactusRects().some((rect) => isCollision(rect, dinoRect));
};

const isCollision = (rect1, rect2) => {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
};

const handleStart = () => {
  lastTime = null;
  speedScale = 1;
  score = 0;
  startScreenElem.classList.add("hide");
  setupGround();
  setupDino();
  setupCactus();
  window.requestAnimationFrame(update);
};

const handleLose = () => {
  setDinoLose()

  setTimeout(() => {
    document.addEventListener('keydown', handleStart, {once: true})
  startScreenElem.classList.remove("hide");
  }, 100)
}

setPixelToWorldScale();
window.addEventListener("keydown", handleStart, { once: true });
window.addEventListener("resize", setPixelToWorldScale);
