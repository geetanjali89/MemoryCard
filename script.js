const cards_item = document.querySelectorAll(".card");

// console.log(cards_item);

let matchedCard = 0;
let cardOne, cardTwo;
let disableDesk = false;

function flipCard(e) {
    let clickedCard = e.target;     //getting user clicked card
    if(clickedCard !== cardOne && !disableDesk) {
        clickedCard.classList.add("flip");

        if(!cardOne) {
            return cardOne = clickedCard; //return cardOnr value to clickcard
        }                                                               
    
        cardTwo = clickedCard;
        disableDesk = true;
        console.log(cardOne, cardTwo);
        // console.log(e.target);

        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
            matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        
        if(matchedCard == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000); //calling fnx after 1 sec
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";  // setting both cards value to blank
        return disableDesk = false;
        // return console.log("card matched");
    }
    // console.log("card not matched");

    setTimeout(() => {
        cardOne.classList.add("shake");  //ad shake class to both the card
        cardTwo.classList.add("shake");
    }, 400);  //400 ms


    setTimeout(() => {
        //removing shake and flip classes from card game after 1.2 sec
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";  //set both cards to blank
        disableDesk = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDesk = false;
    // array of 16 card items
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1 );
    
    cards_item.forEach((card, i) => {
        card.classList.remove("flip");

        let imgTag = card.querySelector("img");
        imgTag.src = `cardimg/img-${arr[i]}.jpeg`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards_item.forEach(card => {         //add click event to cards
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
});