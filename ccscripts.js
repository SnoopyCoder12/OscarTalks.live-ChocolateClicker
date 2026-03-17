var chocolateCount = 0;
let lastTimestamp = 0;

var clickAddValue = 1;

var elvescost = 15;
var chocolateElves = 0;
var elvesCPS = 0.1

var dwarvescost = 100;
var dwarvesCount = 0;
var dwarvesCPS = 1;

var ogrescost = 1100;
var ogresCount = 0;
var ogresCPS = 8;

var chocolatepersecond = 0;

const chocolateButton = document.getElementById("chocolatebarimage");
const counterDisplay = document.getElementById("chocolate-count");

const elves = document.getElementById("chocolate-elves");
const chocolateElvesCountDisplay = document.getElementById("chocolate-elves-count-value");
const chocolateElfCostDisplay = document.getElementById("chocolate-elf-cost");

const dwarves = document.getElementById("chocolate-dwarves");
const dwarvesCountDisplay = document.getElementById("dwarves-count-value");
const dwarvesCostDisplay = document.getElementById("dwarves-cost");

const ogres = document.getElementById("chocolate-ogres");
const ogresCountDisplay = document.getElementById("ogres-count-value");
const ogresCostDisplay = document.getElementById("ogres-cost");

const cpsDisplay = document.getElementById("chocolate-per-second-display");

const scaleKeyframes = [
     { transform: "scale(1)" },
     { transform: "scale(0.8)" },
     { transform: "scale(1)" },
];

const timingOptions = {
     duration: 100,
     iterations: 1,
     easing: "ease-in-out",
     fill: "forwards",
};

function addChocolate() {
     chocolateButton.animate(scaleKeyframes, timingOptions);
     chocolateCount += clickAddValue;
     counterDisplay.textContent = chocolateCount;
}

function buyChocolateElf() {
     if (chocolateCount >= elvescost) {
          chocolateCount -= elvescost;
          chocolateElves++;
          chocolatepersecond += elvesCPS;
          chocolateElvesCountDisplay.textContent = chocolateElves;
          counterDisplay.textContent = chocolateCount;
          cpsDisplay.textContent = chocolatepersecond;
          elvescost = Math.floor(elvescost * 1.15);
          elvescost = Math.round(elvescost);
          chocolateElfCostDisplay.textContent = elvescost;
     }
}

function buyDwarf() {
     if (chocolateCount >= dwarvescost) {
          chocolateCount -= dwarvescost;
          dwarvesCount++;
          chocolatepersecond += dwarvesCPS;
          dwarvesCountDisplay.textContent = dwarvesCount;
          counterDisplay.textContent = chocolateCount;
          cpsDisplay.textContent = chocolatepersecond;
          dwarvescost = Math.floor(dwarvescost * 1.15);
          dwarvescost = Math.round(dwarvescost);
          dwarvesCostDisplay.textContent = dwarvescost;
     }
}

function buyOgre() {
     if (chocolateCount >= ogrescost) {
          chocolateCount -= ogrescost;
          ogresCount++;
          chocolatepersecond += ogresCPS;
          ogresCountDisplay.textContent = ogresCount;
          counterDisplay.textContent = chocolateCount;
          cpsDisplay.textContent = chocolatepersecond;
          ogrescost = Math.floor(ogrescost * 1.15);
          ogrescost = Math.round(ogrescost);
          ogresCostDisplay.textContent = ogrescost;
     }
}

function update(timestamp) {
     // Make the building be a darker color if the player can't afford it, and normal color if they can with the text red.
     if (chocolateCount < elvescost) {
          elves.style.backgroundColor = "rgb(100, 100, 100)";
          elves.style.color = "red";
     } else if (chocolateCount >= elvescost) {
          elves.style.backgroundColor = "rgb(200, 200, 200)";
          elves.style.color = "black";
     }

     // Now do the same for dwarves
     if (chocolateCount < dwarvescost) {
          dwarves.style.backgroundColor = "rgb(100, 100, 100)";
          dwarves.style.color = "red";
     } else if (chocolateCount >= dwarvescost) {
          dwarves.style.backgroundColor = "rgb(200, 200, 200)";
          dwarves.style.color = "black";
     }

     // And for ogres     
     if (chocolateCount < ogrescost) {
          ogres.style.backgroundColor = "rgb(100, 100, 100)";
          ogres.style.color = "red";
     } else if (chocolateCount >= ogrescost) {
          ogres.style.backgroundColor = "rgb(200, 200, 200)";
          ogres.style.color = "black";
     }

     // This will round the CPS to 1 decimal place for display, but keep the full precision for calculations
     cpsDisplay.textContent = Math.round(chocolatepersecond * 10) / 10;

     // 1. Calculate how much time has passed since last frame
     if (!lastTimestamp) lastTimestamp = timestamp;
     const deltaTime = (timestamp - lastTimestamp) / 1000;
     lastTimestamp = timestamp;

     // 2. Add the fractional amount of chocolate
     chocolateCount += chocolatepersecond * deltaTime;

     // 3. Update the display (rounding to the whole number for the user)
     counterDisplay.innerText = Math.floor(chocolateCount).toLocaleString();

     // 4. Request the next frame
     requestAnimationFrame(update);
}

chocolateButton.addEventListener("click", addChocolate);

elves.addEventListener("click", buyChocolateElf);
dwarves.addEventListener("click", buyDwarf);
ogres.addEventListener("click", buyOgre);

requestAnimationFrame(update);