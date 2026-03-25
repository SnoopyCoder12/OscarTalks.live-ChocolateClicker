var chocolateCount = 0;
var totalChocolateEarned = 0;
let lastTimestamp = 0;

var totalChocolateClicks = 0;

var clickAddValue = 1;

var elvescost = 15;
var chocolateElves = 0;
var elvesCPS = 0.1
var elvesShowAt = 5;

var dwarvescost = 100;
var dwarvesCount = 0;
var dwarvesCPS = 1;
var dwarvesShowAt = 100;

var ogrescost = 1100;
var ogresCount = 0;
var ogresCPS = 8;
var ogresShowAt = 1100;

var goblinscost = 12000;
var goblinsCount = 0;
var goblinsCPS = 47;
var goblinsShowAt = 12000;

var chocolatepersecond = 0;

var tenseconds = 0;

// All upgrade related variables
var gamerMouseUpgradeCost = 50;
var gamerMouseUpgradeShowAt = 25;
const gamerMouse = document.getElementById("gamermouse-upgrade");
var gamerMouseUpgradePurchased = false;

var twoDofxmasUpgradeCost = 50;
var twoDofxmasUpgradeShowAt = 25;
const twoDofxmas = document.getElementById("twodaysxmas-upgrade");
var twoDofxmasUpgradePurchased = false;

var reinforcedPickaxesUpgradeCost = 1000;
const reinforcedPickaxes = document.getElementById("reinforcedpickaxes-upgrade");
var reinforcedPickaxesUpgradePurchased = false;

// Get references to all the necessary DOM elements
const chocolateButton = document.getElementById("chocolatebarimage");
const counterDisplay = document.getElementById("chocolate-count");

const totalClicksDisplay = document.getElementById("total-clicks");

const openStatsButton = document.getElementById("open-stats-button");
const closeStatsButton = document.getElementById("close-stats-button");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");

const totalChocolateEarnedDisplay = document.getElementById("total-chocolate-earned");

const elves = document.getElementById("chocolate-elves");
const chocolateElvesCountDisplay = document.getElementById("chocolate-elves-count-value");
const chocolateElfCostDisplay = document.getElementById("chocolate-elf-cost");

const dwarves = document.getElementById("chocolate-dwarves");
const dwarvesCountDisplay = document.getElementById("dwarves-count-value");
const dwarvesCostDisplay = document.getElementById("dwarves-cost");

const ogres = document.getElementById("chocolate-ogres");
const ogresCountDisplay = document.getElementById("ogres-count-value");
const ogresCostDisplay = document.getElementById("ogres-cost");

const goblins = document.getElementById("chocolate-goblins");
const goblinsCountDisplay = document.getElementById("goblins-count-value");
const goblinsCostDisplay = document.getElementById("goblins-cost");

const cpsDisplay = document.getElementById("chocolate-per-second-display");
const gameTitleChocolateDisplay = document.getElementById("game-title-chocolate");

const resetButton = document.getElementById("reset-button");

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

function applyGameData(saveData) {
     // Validate the data structure
     if (!saveData || typeof saveData !== "object") {
          return false;
     }

     // Load all game state with defaults
     chocolateCount = saveData.chocolateCount ?? 0;
     totalChocolateEarned = saveData.totalChocolateEarned ?? 0;
     totalChocolateClicks = saveData.totalChocolateClicks ?? 0;

     chocolateElves = saveData.chocolateElves ?? 0;
     dwarvesCount = saveData.dwarvesCount ?? 0;
     ogresCount = saveData.ogresCount ?? 0;
     goblinsCount = saveData.goblinsCount ?? 0;

     elvescost = saveData.elvescost ?? 15;
     dwarvescost = saveData.dwarvescost ?? 100;
     ogrescost = saveData.ogrescost ?? 1100;
     goblinscost = saveData.goblinscost ?? 12000;

     gamerMouseUpgradePurchased = saveData.gamerMouseUpgradePurchased ?? false;
     twoDofxmasUpgradePurchased = saveData.twoDofxmasUpgradePurchased ?? false;
     reinforcedPickaxesUpgradePurchased = saveData.reinforcedPickaxesUpgradePurchased ?? false;

     if (gamerMouseUpgradePurchased) {
          clickAddValue *= 2;
          gamerMouse.style.display = "none";
     }

     if (twoDofxmasUpgradePurchased) {
          elvesCPS *= 2;
          twoDofxmas.style.display = "none";
     }

     if (reinforcedPickaxesUpgradePurchased) {
          dwarvesCPS *= 2;
          reinforcedPickaxes.style.display = "none";
     }

     // Recalculate CPS based on loaded data
     chocolatepersecond = chocolateElves * elvesCPS + dwarvesCount * dwarvesCPS + ogresCount * ogresCPS + goblinsCount * goblinsCPS;
     updateGameDisplay();
     return true;
}

function updateGameDisplay() {
     counterDisplay.textContent = Math.floor(chocolateCount).toLocaleString();
     totalChocolateEarnedDisplay.textContent = Math.floor(totalChocolateEarned).toLocaleString();
     totalClicksDisplay.textContent = Math.floor(totalChocolateClicks).toLocaleString();

     chocolateElvesCountDisplay.textContent = chocolateElves;
     chocolateElfCostDisplay.textContent = elvescost;
     dwarvesCountDisplay.textContent = dwarvesCount;
     dwarvesCostDisplay.textContent = dwarvescost;
     ogresCountDisplay.textContent = ogresCount;
     ogresCostDisplay.textContent = ogrescost;
     goblinsCountDisplay.textContent = goblinsCount;
     goblinsCostDisplay.textContent = goblinscost;

     document.title = `${Math.floor(chocolateCount).toLocaleString()} Chocolate - Chocolate Clicker`;
}



function loadGame() {
     try {
          const savedData = localStorage.getItem("chocolateClickerSave");
          if (savedData) {
               const saveData = JSON.parse(savedData);
               applyGameData(saveData);
          }
     } catch (error) {
          console.error("Error loading game data:", error);
          localStorage.removeItem("chocolateClickerSave"); //Clear the corrupted save data
     }
}

function exportSave() {
     prompt("Copy your save data below:", localStorage.getItem("chocolateClickerSave"));
}

function importSave() {
     const saveDataString = prompt("Paste your save data below:");
     if (!saveDataString) return;

     try {
          const saveData = JSON.parse(saveDataString);
          if (applyGameData(saveData)) {
               alert("Save data imported successfully!");
          } else {
               alert("Invalid save data format.");
          }
     } catch (error) {
          console.error("Error importing save data:", error);
          alert("Failed to import save data. Make sure you copied it correctly.");
     }
}

function resetGame() {
     if (confirm("Are you sure you want to reset your progress? This cannot be undone.")) {
          localStorage.removeItem("chocolateClickerSave");
          location.reload();
     }
}

function showCreatures(element) {
     if (element) {
          element.classList.remove("upgrade-row-hidden");
          element.classList.add("upgrade-row-shown");
     }
}

function openStats() {
     totalChocolateEarnedDisplay.textContent = Math.floor(totalChocolateEarned).toLocaleString();
     popup.classList.add('show-popup');
     overlay.classList.add('show-popup');
}

function closeStats() {
     popup.classList.remove('show-popup');
     overlay.classList.remove('show-popup');
}

function addChocolate() {
     chocolateButton.animate(scaleKeyframes, timingOptions);
     chocolateCount += clickAddValue;
     totalChocolateClicks += 1;
     totalClicksDisplay.textContent = totalChocolateClicks;
     totalChocolateEarned += clickAddValue;
     counterDisplay.textContent = chocolateCount;
}

// All upgrade functions
function buyGamerMouseUpgrade() {
     if (chocolateCount >= gamerMouseUpgradeCost) {
          chocolateCount -= gamerMouseUpgradeCost;
          gamerMouseUpgradePurchased = true;
          clickAddValue *= 2;
          gamerMouse.style.display = "none";
     }
}

function buyTwoDofXmasUpgrade() {
     if (chocolateCount >= twoDofxmasUpgradeCost) {
          chocolateCount -= twoDofxmasUpgradeCost;
          twoDofxmasUpgradePurchased = true;
          elvesCPS *= 2;
          chocolatepersecond = chocolateElves * elvesCPS + dwarvesCount * dwarvesCPS + ogresCount * ogresCPS + goblinsCount * goblinsCPS;
          cpsDisplay.textContent = Math.round(chocolatepersecond * 10) / 10;
          twoDofxmas.style.display = "none";
     }
}

function buyReinforcedPickaxesUpgrade() {
     if (chocolateCount >= reinforcedPickaxesUpgradeCost) {
          chocolateCount -= reinforcedPickaxesUpgradeCost;
          reinforcedPickaxesUpgradePurchased = true;
          dwarvesCPS *= 2;
          chocolatepersecond = chocolateElves * elvesCPS + dwarvesCount * dwarvesCPS + ogresCount * ogresCPS + goblinsCount * goblinsCPS;
          cpsDisplay.textContent = Math.round(chocolatepersecond * 10) / 10;
          reinforcedPickaxes.style.display = "none";
     }
}


function buyChocolateElf() {
     if (chocolateCount >= elvescost) {
          chocolateCount -= elvescost;
          chocolateElves++;
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
          ogresCountDisplay.textContent = ogresCount;
          counterDisplay.textContent = chocolateCount;
          cpsDisplay.textContent = chocolatepersecond;
          ogrescost = Math.floor(ogrescost * 1.15);
          ogrescost = Math.round(ogrescost);
          ogresCostDisplay.textContent = ogrescost;
     }
}

function buyGoblin() {
     if (chocolateCount >= goblinscost) {
          chocolateCount -= goblinscost;
          goblinsCount++;
          goblinsCountDisplay.textContent = goblinsCount;
          counterDisplay.textContent = chocolateCount;
          cpsDisplay.textContent = chocolatepersecond;
          goblinscost = Math.floor(goblinscost * 1.15);
          goblinscost = Math.round(goblinscost);
          goblinsCostDisplay.textContent = goblinscost;
     }
}

function update(timestamp) {
     tenseconds += 1;

     if (tenseconds >= 240) {
          const saveData = {
               chocolateCount: chocolateCount,
               totalChocolateEarned: totalChocolateEarned,
               totalChocolateClicks: totalChocolateClicks,
               chocolateElves: chocolateElves,
               dwarvesCount: dwarvesCount,
               ogresCount: ogresCount,
               goblinsCount: goblinsCount,
               elvescost: elvescost,
               dwarvescost: dwarvescost,
               ogrescost: ogrescost,
               goblinscost: goblinscost,
               twoDofxmasUpgradePurchased: twoDofxmasUpgradePurchased,
               gamerMouseUpgradePurchased: gamerMouseUpgradePurchased,
               reinforcedPickaxesUpgradePurchased: reinforcedPickaxesUpgradePurchased
          };
          localStorage.setItem("chocolateClickerSave", JSON.stringify(saveData));
          tenseconds = 0;
     }

     //All Upgrade related updates
     if (totalChocolateEarned >= gamerMouseUpgradeShowAt && totalChocolateClicks >= 25) {
          gamerMouse.style.visibility = "visible";
     }

     if (chocolateCount < gamerMouseUpgradeCost) {
          gamerMouse.style.filter = "brightness(50%) grayscale(100%)";
     } else {
          gamerMouse.style.filter = "none";
     }

     if (totalChocolateEarned >= twoDofxmasUpgradeShowAt && chocolateElves > 0) {
          twoDofxmas.style.visibility = "visible";
     }

     if (chocolateCount < twoDofxmasUpgradeCost) {
          twoDofxmas.style.filter = "brightness(50%) grayscale(100%)";
     } else {
          twoDofxmas.style.filter = "none";
     }

     if (dwarvesCount > 0) {
          reinforcedPickaxes.style.visibility = "visible";
     }

     if (chocolateCount < reinforcedPickaxesUpgradeCost) {
          reinforcedPickaxes.style.filter = "brightness(50%) grayscale(100%)";
     } else {
          reinforcedPickaxes.style.filter = "none";
     }
     
     // Make the building be a darker color if the player can't afford it, and normal color if they can with the text red.
     if (chocolateCount < elvescost) {
          elves.style.backgroundColor = "rgb(100, 100, 100)";
          elves.style.color = "red";
     } else if (chocolateCount >= elvescost) {
          elves.style.backgroundColor = "rgb(200, 200, 200)";
          elves.style.color = "black";
     }

     if (totalChocolateEarned >= elvesShowAt) {
          showCreatures(elves);
     }

     // Now do the same for dwarves
     if (chocolateCount < dwarvescost) {
          dwarves.style.backgroundColor = "rgb(100, 100, 100)";
          dwarves.style.color = "red";
     } else if (chocolateCount >= dwarvescost) {
          dwarves.style.backgroundColor = "rgb(200, 200, 200)";
          dwarves.style.color = "black";
     }

     if (totalChocolateEarned >= dwarvesShowAt) {
          showCreatures(dwarves);
     }

     // And for ogres     
     if (chocolateCount < ogrescost) {
          ogres.style.backgroundColor = "rgb(100, 100, 100)";
          ogres.style.color = "red";
     } else if (chocolateCount >= ogrescost) {
          ogres.style.backgroundColor = "rgb(200, 200, 200)";
          ogres.style.color = "black";
     }

     if (totalChocolateEarned >= ogresShowAt) {
          showCreatures(ogres);
     }

     // And for goblins
     if (chocolateCount < goblinscost) {
          goblins.style.backgroundColor = "rgb(100, 100, 100)";
          goblins.style.color = "red";
     } else if (chocolateCount >= goblinscost) {
          goblins.style.backgroundColor = "rgb(200, 200, 200)";
          goblins.style.color = "black";
     }

     if (totalChocolateEarned >= goblinsShowAt) {
          showCreatures(goblins);
     }

     // This will round the CPS to 1 decimal place for display, but keep the full precision for calculations
     chocolatepersecond = chocolateElves * elvesCPS + dwarvesCount * dwarvesCPS + ogresCount * ogresCPS + goblinsCount * goblinsCPS;
     cpsDisplay.textContent = Math.round(chocolatepersecond * 10) / 10;

     // 1. Calculate how much time has passed since last frame
     if (!lastTimestamp) lastTimestamp = timestamp;
     const deltaTime = (timestamp - lastTimestamp) / 1000;
     lastTimestamp = timestamp;

     // 2. Add the fractional amount of chocolate
     chocolateCount += chocolatepersecond * deltaTime;
     totalChocolateEarned += chocolatepersecond * deltaTime;

     // 3. Update the display (rounding to the whole number for the user)
     counterDisplay.innerText = Math.floor(chocolateCount).toLocaleString();
     document.title = `${Math.floor(chocolateCount).toLocaleString()} Chocolate - Chocolate Clicker`;

     // 4. Request the next frame
     requestAnimationFrame(update);
}

chocolateButton.addEventListener("click", addChocolate);

elves.addEventListener("click", buyChocolateElf);
dwarves.addEventListener("click", buyDwarf);
ogres.addEventListener("click", buyOgre);
goblins.addEventListener("click", buyGoblin);

gamerMouse.addEventListener("click", buyGamerMouseUpgrade);
twoDofxmas.addEventListener("click", buyTwoDofXmasUpgrade);
reinforcedPickaxes.addEventListener("click", buyReinforcedPickaxesUpgrade);

openStatsButton.addEventListener("click", openStats);
closeStatsButton.addEventListener("click", closeStats);
overlay.addEventListener("click", closeStats);
resetButton.addEventListener("click", resetGame);

loadGame();

requestAnimationFrame(update);