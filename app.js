/* Created v0 of matching game. CSS animation and matching works when user plays nicely. 

Next steps/Issues:
Game gets mad if user clicks on more than two photos within 2 seconds. Look into how to removeEvent listener on card that has been revealed. And how to removeEvent listener on ALL cards once two are showing.
*/

const kanyePhotos = ['img/kanye-photo-1.jpg', 'img/kanye-photo-2.jpg', 'img/kanye-photo-3.png', 'img/kanye-photo-4.jpg',
                     'img/kanye-photo-5.jpg', 'img/kanye-photo-6.jpg', 'img/kanye-photo-7.jpg', 'img/kanye-photo-8.jpg'];

kanyePhotos.push(...kanyePhotos);

const cards = document.querySelectorAll('.card');

let turns = 0;
// Load Hidden Kanye Photos
document.addEventListener('DOMContentLoaded', shuffleCards);

// Add event listeners for card
cards.forEach(card => {
  card.addEventListener('mousedown', checkMatch);
  // card.addEventListener('mousedown', resetTurn);
});
/* 
on each click
- check to see if another card is displayed
- if two cards are displayed
  - check to see if it is match.
  - if it is match
    - visibility: hidden
  - else
    - css shake animation
    - cover both cards
- else
  - do nothing  
*/

function cardsShowing() {
  const showingCards = [];
  cards.forEach(card => {
    if (card.lastElementChild.style.transform === "translateY(-100%)") showingCards.push(card);
  });

  return showingCards;
}

function checkMatch(e) {
  let card1 = otherCardDisplayed();
  let card2 = e.target.closest('.card'); 
  if (cardsShowing().length === 1) {
    if (card2.querySelector('.kanye img').src === card1.querySelector('.kanye img').src) {
      console.log('Match!');
      setTimeout(() => {
      card1.className += " spin";
      card2.className += " spin";
      card1.style.visibility = "hidden";
      card2.style.visibility = "hidden";
      }, 1000);
    } else {
      console.log('No match!');
      card1.className += " shake";
      card2.className += " shake";
    }
      resetTurn(e);
  }
}

function resetTurn(e) {
  setTimeout(flipCards, 2000);
  turns =+ 1;
}
function flipCards() {
  cards.forEach(card => {
    card.lastElementChild.style.transform = "none";
    card.lastElementChild.style.transform = "none";
    card.className = "card";
  });
}

function otherCardDisplayed() {
  for (let i = 0; i < cards.length; i += 1) {
    if (cards[i].querySelector('.kanye').style.transform === "translateY(-100%)") {
      return cards[i];
    }
  }
}

function shuffleCards() {
  const shuffledPhotos = shuffle(kanyePhotos);
  cards.forEach((card, idx) => {
    card.querySelector('.kanye img').src = kanyePhotos[idx];
  });
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}