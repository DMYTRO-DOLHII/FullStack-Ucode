function start() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/");
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8")

    xhr.onload = () => {
        if (xhr.readyState == 4 && (xhr.status == 201 || xhr.status == 200)) {
            response = JSON.parse(xhr.response);
            document.getElementById("login").innerText = response.login;
            document.getElementById("user_avatar").src = "/avatar/" + response.login + ".jpg"
        } else {
            console.error(`Error: ${xhr.status}`);
        }
    };
    xhr.send();
}
start();

function submit() {
    location.href = '/';
}

const socket = io();

let myLogin = "";
let opLogin = "";
let timer;
let myMana;
turn = false;

socket.on("waiting_for_opponent", () => {
    document.getElementById("waiting_for_opponent").style.display = "block";
    document.querySelector("body").classList.add("background");
});

socket.on("opponent_connected", (data) => {
    opLogin = data.opLogin;
    myLogin = data.myLogin;
    document.querySelector("body").classList.add("background");
    document.getElementById("waiting_for_opponent").style.display = "none";
    document.getElementById("opponent_login").style.display = "block";
    document.getElementById("opponent").textContent = opLogin;
});

socket.on("opponent_disconnected", () => {
    document.querySelector("body").classList.add("background");
    document.getElementById("game_board").style.display = "none";
    document.getElementById("opponent_disconnected").style.display = "block";
    document.getElementById("loading-container").style.display = "block";
});

socket.on("disconnect", () => {
    document.querySelector("body").classList.add("background");
    document.location.href = "/login";
});

socket.on("err_second_window", () => {
    document.querySelector("body").classList.add("background");
    document.getElementById("err_second_window").style.display = "block";
});

socket.on("err_not_enough_money", () => {
    document.querySelector("body").classList.add("background");
    document.getElementById("err_not_enough_money").style.display = "block";
});

socket.on("game_start", (data) => {
    turn = data.turn;
    myMana = data.myMana;
    document.getElementById("game_board").style.display = "block";
    document.getElementById("loading-container").style.display = "none";
    document.getElementById("card-deck").setAttribute("title", data.deck_length + " cards left");

    data.myHand.forEach((element) => {
        renderCard(element);
    });

    data.enemyHand.forEach(() => {
        renderCardBack();
    });

    document.getElementById("enemy-name").innerText = opLogin;
    document.getElementById("my-name").innerText = myLogin;

    document.getElementById("enemy_icon").src = "/avatar/" + opLogin + ".jpg";
    document.getElementById("my_icon").src = "/avatar/" + myLogin + ".jpg";

    document.getElementById("enemy-hp").innerText = data.enemyHp;
    document.getElementById("my-hp").innerText = data.myHp;
    document.getElementById("enemy-mana").innerText = data.enemyMana;
    document.getElementById("my-mana").innerText = data.myMana;
});

socket.on("timer", (data) => {
    document.getElementById("timer").innerText = data.timer;
});

socket.on("turn", (data) => {
    turn = data.turn;
    if (data.turn) {
        document.getElementById("turn_nickname").innerText = myLogin + " turn";
        document.getElementById("enemy-mana").innerText = data.enemyMana;
        document.getElementById("my-mana").innerText = data.myMana;
        document.getElementById("cards").style.backgroundColor = "rgba(109, 109, 109, 0.78)";
        document.getElementById("done").style.display = "block";
    } else {
        document.getElementById("turn_nickname").innerText = opLogin + " turn";
        document.getElementById("enemy-mana").innerText = data.enemyMana;
        document.getElementById("my-mana").innerText = data.myMana;
        document.getElementById("cards").style.backgroundColor = "rgba(224, 0, 0, 0.8)";
        document.getElementById("done").style.display = "none";
    }
});

socket.on("mana", (data) => {
    myMana = data.myMana;
    document.getElementById("my-mana").innerText = data.myMana;
    document.getElementById("enemy-mana").innerText = data.enemyMana;
});

socket.on("hp", (data) => {
    document.getElementById("my-hp").innerText = data.myHp;
    document.getElementById("enemy-hp").innerText = data.enemyHp;
});

socket.on("take_card", (data) => {
    document.getElementById("cards").innerHTML = "";
    document.getElementById("enemy-cards").innerHTML = "";
    document.getElementById("card-deck").setAttribute("title", data.deck_length + " cards left");
    data.myHand.forEach((element) => {
        renderCard(element);
    });
    data.enemyHand.forEach(() => {
        renderCardBack();
    });
})

function doneOnClick() {
    socket.emit("next_turn");
}

const playCard = (card) => {
    socket.emit("play_card", card);
};

socket.on("play_card", (data) => {
    document.getElementById("enemy-cards").innerHTML = "";
    data.cards.forEach(() => {
        renderCardBack();
    });
});

const renderCard = (card) => {
    const div = document.createElement("div");
    div.classList.add('card-container');
    const image = document.createElement("img");
    image.src = card.src;
    image.classList.add('card');
    image.addEventListener("click", (event) => {
        if (myMana < card.cost || !turn) {
            return;
        } else {
            //! animation for playing card
            playCard(card);
            event.currentTarget.remove();
        }
    });
    div.appendChild(image);
    document.getElementById("cards").appendChild(div);
};


const renderCardBack = () => {
};

socket.on("game_over", (data) => {
    document.getElementById("game_over").style.display = "block";

    document.getElementById("game_over").style.display = "block";

    document.querySelector("body").style.overflow = 'hidden'

    if (data.winner) {
        document.getElementById("game_over_message").innerText = "You win";
    } else {
        document.getElementById("game_over_message").innerText = "You lose";
    }
})