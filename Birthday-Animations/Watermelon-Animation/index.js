// TODO: Move seed logic into a Seed class
const SEED_LOCATIONS = [ // Represents positions in percentages
  { top: 63, left: 42 },
  { top: 60, left: 74 },
  { top: 74, left: 29 },
  { top: 65, left: 61 },
  { top: 73, left: 76 },
  { top: 77, left: 65 },
  { top: 82, left: 40 },
  { top: 64, left: 20 },
  { top: 60, left: 31 },
  { top: 73, left: 49 }
];

const CONFETTI_COUNT = 400;
let birthdayTriggered = false;

function createSeed(id, topPosition, leftPosition) {
  let seed = document.createElement("div");
  seed.classList.add("watermelon-feature", "watermelon-seed");
  seed.style.top = `${topPosition}%`
  seed.style.left = `${leftPosition}%`

  document.querySelector("div#watermelon-container").appendChild(seed);
}

SEED_LOCATIONS.forEach((position, index) => {
  createSeed(index, position.top, position.left);
});

function triggerBirthday() {
  if (birthdayTriggered) {
    return;
  }

  document.querySelector("div#anticipation-face-container").style.opacity = 0;
  document.querySelector("div#celebration-face-container").style.opacity = 1;

  document.querySelector("div#watermelon-container").style.animation = "celebration 1s ease-out infinite alternate";
  
  let topText = document.querySelector("div#top-text");
  topText.innerHTML = "HAPPY BIRTHDAY GAB!!!"
  topText.style.fontStyle = "normal";
  topText.style.fontSize = "3.5em";
  topText.style.backgroundImage = "linear-gradient(to right, red, orange , yellow, green, cyan, blue, violet)";

  // Text gradient
  topText.style.filter = "drop-shadow(0 0 10px #ccc);";
  topText.style.backgroundClip = "text";
  topText.style.webkitBackgroundClip = "text";
  topText.style.webkitTextFillColor = "transparent";

  // Confetti
  burstConfetti();
  dropConfetti();

  birthdayTriggered = true;
}

// TODO: Move all confetti logic into a Confetti Class
function burstConfetti() {
  const interval = setInterval(() => {
    const confettiContainer = document.querySelector("div#confetti-container");
    let confetti = document.createElement("div");

    let dimensions = getRandomDimension();
    let color = getRandomColor();
    let endPosition = getRandomBurstEndPosition();
    let rotation = getRandomRotation();
    let duration = 0.5;

    confetti.classList.add("confetti", "confetti-burst");
    confetti.style.width = `${dimensions.width}px`;
    confetti.style.height = `${dimensions.height}px`;
    confetti.style.backgroundColor = `${color}`;
    confetti.style.transform = `translate(50vw, 110vh) rotate(${rotation}deg)`;
    confetti.style.transition = `transform ${duration}s ease-out`;
    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.style.transform = `translate(${endPosition}vw, -20px) rotate(${rotation}deg)`;
    }, 10);
    setTimeout(() => {
      confettiContainer.removeChild(confetti);
    }, (duration * 1000 + 1000));
  }, 4);

  setTimeout(() => clearInterval(interval), 1000);
}

function dropConfetti() {
  setInterval(() => {
    const confettiContainer = document.querySelector("div#confetti-container");
    let confetti = document.createElement("div");

    let dimensions = getRandomDimension();
    let duration = getRandomDuration();
    let startPosition = getRandomStartPosition();
    let endPosition = getRandomFallEndPosition(startPosition);
    let rotation = getRandomRotation();
    let color = getRandomColor();

    confetti.classList.add("confetti", "confetti-falling");
    confetti.style.width = `${dimensions.width}px`;
    confetti.style.height = `${dimensions.height}px`;
    confetti.style.backgroundColor = `${color}`;
    confetti.style.transform = `translate(${startPosition}vw, -20px) rotate(${rotation}deg)`;
    confetti.style.transition = `transform ${duration}s ease-out`;
    confettiContainer.appendChild(confetti);

    setTimeout(() => {
      confetti.style.transform = `translate(${endPosition}vw, 110vh) rotate(${rotation}deg)`;
    }, 800);
    setTimeout(() => {
      confettiContainer.removeChild(confetti);
    }, (duration * 1000 + 500));
  }, 10);
}

function getRandomDimension() {
  return {
    width: randomNumberGenerator(5, 15),
    height: randomNumberGenerator(5, 15),
  };
}

function getRandomDuration() {
  return randomNumberGenerator(1, 4);
}

function getRandomStartPosition() {
  return randomNumberGenerator(1, 99);
}

function getRandomBurstEndPosition() {
  return randomNumberGenerator(-50, 150);
}

function getRandomFallEndPosition(start) {
  return randomNumberGenerator(start - 20, start + 20);
}

function getRandomRotation() {
  return randomNumberGenerator(0, 360);
}

function getRandomColor() {
  return `#${(randomNumberGenerator(0, 0xffffff)).toString(16)}`;
}

function randomNumberGenerator(min, max) {
  return Math.round(min + (max - min) * Math.random());
}
