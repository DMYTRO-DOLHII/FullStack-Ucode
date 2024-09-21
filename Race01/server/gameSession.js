const turnTime = 30;
const hp = 20;
const cardsData = async () => await getCards();

const array = async () =>
    await [...(await cardsData()).cards];

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getCards() {
    try {
        const filePath = "http://localhost:3000/cards.json";
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const cardData = await response.json();
        return cardData;
    } catch (error) {
        //console.error("Error fetching JSON:", error);
    }
}

function coinToss() {
    return Math.random() < 0.5;
}

async function gameSession(firstSocket, secondSocket) {
    let turn = coinToss();
    let timer = turnTime;
    let myHand = [];
    let enemyHand = [];
    let myMana = 1;
    let enemyMana = 1;
    let enemyHp = hp;
    let myHp = hp;
    let firstManaLimit = 1;
    let secondManaLimit = 1;
    const cardArray = await array();

    for (let i = 0; i < 6; i++) {
        myHand.push(cardArray[randomIntFromInterval(0, cardArray.length - 1)]);
        cardArray.splice(cardArray.indexOf(myHand[i]), 1);

        enemyHand.push(cardArray[randomIntFromInterval(0, cardArray.length - 1)]);
        cardArray.splice(cardArray.indexOf(enemyHand[i]), 1);
    }

    firstSocket.emit("game_start", {
        turn: turn,
        cards: array,
        myHand: myHand,
        enemyHand: enemyHand,
        myHp: myHp,
        enemyHp: enemyHp,
        myMana: myMana,
        enemyMana: enemyMana,
        deck_length: cardArray.length,
    });
    secondSocket.emit("game_start", {
        turn: !turn,
        cards: array,
        myHand: enemyHand,
        enemyHand: myHand,
        myHp: enemyHp,
        enemyHp: myHp,
        myMana: enemyMana,
        enemyMana: myMana,
        deck_length: cardArray.length,
    });

    firstSocket.emit("turn", {
        turn: turn,
        myMana: myMana,
        enemyMana: enemyMana,
    });
    secondSocket.emit("turn", {
        turn: !turn,
        myMana: enemyMana,
        enemyMana: myMana,
    });

    let timerI = setInterval(() => {
        firstSocket.emit("timer", { timer: timer });
        secondSocket.emit("timer", { timer: timer });
        if (timer === 0) {
            nextTurn();
        } else {
            timer--;
        }
    }, 1000);

    secondSocket.request.session.data.timerI = timerI;

    function nextTurn() {
        firstSocket.emit("timer", { timer: timer });
        secondSocket.emit("timer", { timer: timer });

        if (firstManaLimit < 10) {
            if (turn) {
                secondManaLimit++;
            } else {
                firstManaLimit++;
            }
        }
        if (turn) {
            enemyMana = secondManaLimit;
        } else {
            myMana = firstManaLimit;
        }

        if (turn && enemyHand.length < 10) {
            enemyHand.push(
                cardArray[randomIntFromInterval(0, cardArray.length - 1)]
            );
            cardArray.splice(cardArray.indexOf(enemyHand[enemyHand.length - 1]), 1);
        } else if (!turn && myHand.length < 10) {
            myHand.push(cardArray[randomIntFromInterval(0, cardArray.length - 1)]);
            cardArray.splice(cardArray.indexOf(myHand[myHand.length - 1]), 1);
        }

        firstSocket.emit("mana", { myMana: myMana, enemyMana: enemyMana });
        secondSocket.emit("mana", { myMana: enemyMana, enemyMana: myMana });
        firstSocket.emit("take_card", { myHand: myHand, enemyHand: enemyHand, deck_length: cardArray.length });
        secondSocket.emit("take_card", { myHand: enemyHand, enemyHand: myHand, deck_length: cardArray.length });

        turn = !turn;
        firstSocket.emit("turn", {
            turn: turn,
            myMana: myMana,
            enemyMana: enemyMana,
        });
        secondSocket.emit("turn", {
            turn: !turn,
            myMana: enemyMana,
            enemyMana: myMana,
        });
        timer = turnTime;
    }

    firstSocket.on("next_turn", () => {
        if (!turn) {
            return;
        }
        //console.log(myMana);
        nextTurn();
    });

    secondSocket.on("next_turn", () => {
        if (turn) {
            return;
        }
        //console.log(enemyMana);
        nextTurn();
    });

    firstSocket.on("play_card", (data) => {
        if (!turn) {
            return;
        }
        if (myMana < data.cost) {
            return;
        }
        myMana -= data.cost;
        //attack logic
        if (data.attack < 0) {
            myHp + Math.abs(data.attack) >= 25
                ? (myHp = 25)
                : (myHp += Math.abs(data.attack));
        } else {
            enemyHp -= data.attack;
        }

        //console.log(enemyHp);

        if (enemyHp <= 0) {
            clearInterval(firstSocket.request.session.data.timerI);
            clearInterval(secondSocket.request.session.data.timerI);

            firstSocket.emit("game_over", { winner: true });
            secondSocket.emit("game_over", { winner: false });
        }

        firstSocket.emit("mana", { myMana: myMana, enemyMana: enemyMana });
        secondSocket.emit("mana", { myMana: enemyMana, enemyMana: myMana });
        firstSocket.emit("hp", { myHp: myHp, enemyHp: enemyHp });
        secondSocket.emit("hp", { myHp: enemyHp, enemyHp: myHp });
        let index = 0;
        for (let i = 0; i < myHand.length; i++) {
            if (myHand[i].id === data.id) {
                index = i;
                break;
            }
        }
        myHand.splice(index, 1);
        secondSocket.emit("play_card", {
            cards: myHand,
            myHp: myHp,
            enemyHp: enemyHp,
        });
    });

    secondSocket.on("play_card", (data) => {
        if (turn) {
            return;
        }
        if (enemyMana < data.cost) {
            return;
        }
        //attack logic
        if (data.attack < 0) {
            enemyHp + Math.abs(data.attack) >= 25
                ? (enemyHp = 25)
                : (enemyHp += Math.abs(data.attack));
        } else {
            myHp -= data.attack;
        }

        if (myHp <= 0) {
            clearInterval(firstSocket.request.session.data.timerI);
            clearInterval(secondSocket.request.session.data.timerI);

            firstSocket.emit("game_over", { winner: false });
            secondSocket.emit("game_over", { winner: true });
        }

        enemyMana -= data.cost;
        firstSocket.emit("mana", { myMana: myMana, enemyMana: enemyMana });
        secondSocket.emit("mana", { myMana: enemyMana, enemyMana: myMana });
        firstSocket.emit("hp", { myHp: myHp, enemyHp: enemyHp });
        secondSocket.emit("hp", { myHp: enemyHp, enemyHp: myHp });
        let index = 0;
        for (let i = 0; i < enemyHand.length; i++) {
            if (enemyHand[i].id === data.id) {
                index = i;
                break;
            }
        }
        enemyHand.splice(index, 1);
        firstSocket.emit("play_card", {
            cards: enemyHand,
            myHp: enemyHp,
            enemyHp: myHp,
        });
    });
}

module.exports = gameSession;
