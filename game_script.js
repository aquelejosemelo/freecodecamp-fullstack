let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {name: "stick", power: 5},
    {name: "dagger", power: 30},
    {name: "claw hammer", power: 50},
    {name: "sword", power: 100}
 ];

 const monsters = [
    {name: "slime", level:2,health:15},
    {name: "fanged beast", level:8, health:60},
    {name: "slime", level:20, health:300}
 ]

const locations = [
    {
        name: "town sqare",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions":[goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"store\"."
    },
    {
        name: "store",
        "button text":["Buy 10 heath (10 gold)","Buy weapon (30 gold)","Go to town sqare"],
        "button functions":[buyHealth,buyWeapon,goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text":["Fight slime","Fight beast","Go to town sqare"],
        "button functions":[fightSlime,fightBeast,goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text":["Atack","Dodge","Run"],
        "button functions":[atack,dodge,goTown],
        text: "You are figthing the monster."
    }
]

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

const goltTextUpdate = () => goldText.innerText = gold;
const healthTextUpdate = () => healthText.innerText = health;

function update(locations) {
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    text.innerText = locations.text;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {

    if(gold >= 10){
        gold -= 10;
        health += 10;
        goltTextUpdate()
        healthTextUpdate()
    } else {
        text.innerText = "You do not have enough gold to buy health.";
    }

}

function buyWeapon() {
    if (currentWeapon < weapons.length -1 ){
        if(gold >=30){
            gold -=30;
            currentWeapon++;
            goltTextUpdate()
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
     if(inventory.length > 1) {
        gold += 15;
        goltTextUpdate()
        let currentWeapon = inventory.shift();
        text.innerText = "you sold a " + currentWeapon + ".";
        text.innerText -= " In your inventory you have: " + inventory;
     } else {
        text.innerText = "Don't sell your only weapon!";
     }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.sytle.display = "block;"
    monsterNameText.innerText = mosnters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function atack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerHTML += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random *xp)+1;
    healthTextUpdate();
    monsterHealthText.innerText = monsterHealth;
    if(health <=0){
        lose();
    } else {}
}

function dodge(){

}

function lose(){

}