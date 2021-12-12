import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./updateCustomProperty.js";

const groundElems = document.querySelectorAll('[data-ground]');
const SPEED = 0.05

export const setupGround = () => {
  setCustomProperty(groundElems[0], "--left", 0) // 0%
  setCustomProperty(groundElems[1], "--left", 300) // 300%
}

export const updateGround = (delta, speedScale) => {
  groundElems.forEach( ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    // -300 + 600 = 300 => 300%
    if (getCustomProperty(ground, "--left") <= -300) 
      incrementCustomProperty(ground, "--left", 600)
  })
}
