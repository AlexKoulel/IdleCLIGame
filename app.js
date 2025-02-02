const { resolve } = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let gameRunning = true;
let earnings = 0;
let donutsMade = 0;
let hiredCooks = 1;
let donutMachines = 1;
let shopLevel = 1;

if (earnings <= 0) {
  earnings = 0;
}
if (donutsMade <= 0) {
  donutsMade = 0;
}
function makeDonuts() {
  donutsMade += 1 * hiredCooks * donutMachines * shopLevel;
  earnings += 1 * shopLevel;
}

function showCommandsAndInventory() {
  console.clear();
  console.log(
    "Donut Idle Shop.\n----------------------------------------------------------------------------------------"
  );
  console.log(
    "Press enter to sell a donut,or to upgrade type:\n[coo] - Hire Cook (50$) , [mac]- Buy Donut Machine (150$) , [sho]- Upgrade Shop (300$)."
  );
  console.log(
    "----------------------------------------------------------------------------------------"
  );
  console.log(
    `Hired Cooks:${hiredCooks} | Owned Donut Machines:${donutMachines} | Shop Level:${shopLevel}`
  );
  console.log(`Donuts Made: ${donutsMade} | Earnings: ${earnings}$ `);
}

function resolveAfterSeconds(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, delay);
  });
}
async function asyncCall() {
  while (gameRunning) {
    const promise1 = await resolveAfterSeconds(1000);
    showCommandsAndInventory();
    const promise2 = await resolveAfterSeconds(800);
    makeDonuts();

    if (earnings >= 999) {
      gameRunning = false;
      console.clear();
      console.log("YOU WON!");
    }

    await Promise.all([promise1, promise2]);
  }
}

function askForInput() {
  if (!gameRunning) return;
  rl.question("", (response) => {
    if (response.toLowerCase() === "") {
      if (donutsMade != 0) {
        earnings += 1;
        donutsMade -= 1;
      } else {
        console.log("Donut not made.");
      }
    } else if (response.toLowerCase() == "coo") {
      if (!(earnings < 50)) {
        hiredCooks += 1;
        earnings -= 50;
      } else {
        console.log("Not enough money!");
      }
    } else if (response.toLowerCase() == "mac") {
      if (!(earnings < 150)) {
        donutMachines += 1;
        earnings -= 100;
      } else {
        console.log("Not enough money!");
      }
    } else if (response.toLowerCase() == "sho") {
      if (!(earnings < 300)) {
        shopLevel += 1;
        earnings -= 300;
      } else {
        console.log("Not enough money!");
      }
    } else if (response.toLowerCase() == "exit") {
      process.exit(0);
    }

    if (gameRunning) {
      askForInput();
      showCommandsAndInventory();
    }
  });
}
asyncCall();
askForInput();
