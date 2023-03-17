const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
scoreTag = document.querySelector(".score b"),
playBtn = document.querySelector(".details .playAgn"),
lvlBtn = document.querySelector(".details .nxtLvl"),
lvlText = document.querySelector("header h3 b");

let maxTime = 36;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;
let lvl = 1;
let score = 0;


function changeTime(){
    lvl += 1;
    if (lvl <= 3){
        lvlText.innerText = lvl;
        maxTime -= 9;
        shuffleCard();
    }
    else {
        lvl = 1;
        lvlText.innerText = lvl;
        maxTime = 36;
        shuffleCard();
        alert("Game Over");
    }
    lvlBtn.disabled = true;
}

function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        score += 16;
        scoreTag.innerText = score;
        if(matchedCard == 8 && timeLeft > 0) {
            lvlBtn.disabled = false;
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    else{
        var temp = score;
        temp = temp-2;
        if (temp < 0){
            score = 0;
        } else{
            score -= 2;
        }
    }
    setTimeout(() => {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 800);
    scoreTag.innerText = score;
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = score = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    scoreTag.innerText = score;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

playBtn.addEventListener("click", shuffleCard);
lvlBtn.addEventListener('click',changeTime);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});