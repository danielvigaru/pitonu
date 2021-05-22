window.onload = function () {
  // daca suntem pe pagina principala
  // alege o tema random pentru tot site-ul
  if (document.title == 'Pitonu - Home') {

    let gradient;
    let gradient_reverse;
    let culoare_text_buton;
    let varianta = getRandomInt(1, 3)

    switch (varianta) {
      case 1:
        gradient = 'linear-gradient(to right, red, purple)';
        gradient_reverse = 'linear-gradient(to right, purple, red)';
        culoare_text_buton = 'white';
        break;

      case 2:
        gradient = 'white';
        gradient_reverse = 'white';
        culoare_text_buton = 'black';
        break;

      case 3:
        gradient = 'linear-gradient(to right, #0b8793, #5e115a)';
        gradient_reverse = 'linear-gradient(to right, #5e115a, #0b8793)';
        culoare_text_buton = 'white';
        break;

      default:
        break;
    }

    window.localStorage.setItem("gradient", gradient);
    window.localStorage.setItem("gradient_reverse", gradient_reverse);
    window.localStorage.setItem("culoare_text_buton", culoare_text_buton);

    // dupa ce s-a incarcat pagina ataseaza la fiecare card functia de highlight
    for (let index = 1; index <= 4; index++) {
      let card = document.getElementById('card' + index);
      card.addEventListener('click', highlightCard);
    }
  } else {
    replaceContent('./lectia1.html', 'lectia1');
  }

  let root = document.documentElement;
  root.style.setProperty('--gradient', window.localStorage.getItem("gradient"));
  root.style.setProperty('--gradient-reverse', window.localStorage.getItem("gradient_reverse"));
  root.style.setProperty('--culoare_text_buton', window.localStorage.getItem("culoare_text_buton"));

  /*
   * failsafe
   * daca nu se acceseaza home prima data, deci nu sunt setate variabilele
   * se folosesc culorile default
   */
  if (!window.localStorage.getItem("gradient")) {
    root.style.setProperty('--gradient', 'linear-gradient(to right, red, purple)');
    root.style.setProperty('--gradient-reverse', 'linear-gradient(to right, purple, red)');
  }

}

var highlightCard = function (e) {
  // primeste ca argument ceva event idk, trebuie pentru detectarea carui card s-a apasat
  var clickedElement = e.target || e.srcElement; // elementul pe care s-a dat click

  if (clickedElement.classList.contains('title')) {
    // daca am dat click pe textul din card selecteaza cardul
    clickedElement = clickedElement.parentElement;
  }

  if (clickedElement.id == 'card1' || clickedElement.id == 'card2' || clickedElement.id == 'card3' || clickedElement.id == 'card4') {
    for (let i = 1; i <= 4; i++) {
      // ascunde toate cardurile in afara de cel pe care s-a dat click
      let id = 'card' + i
      if (id != clickedElement.id) {
        document.getElementById(id).classList.toggle('hidden');
        document.getElementById(id).parentElement.classList.toggle('hidden');
      }
    }

    // muta cardul pe prima pozitie
    clickedElement.classList.remove('pos1');
    clickedElement.classList.remove('pos2');
    clickedElement.classList.remove('pos3');
    clickedElement.classList.remove('pos4');
    clickedElement.classList.add('pos1');

    // schimba gridul de la 4 coloane (1 1 1 1) la 2 coloane (1 3)
    document.getElementById('container').classList.toggle('grid-container-info');


    // afiseaza info
    document.getElementById('info').classList.toggle('hidden');
    document.getElementById('info').parentElement.classList.toggle('hidden');

    // in functie de cardul apasat afiseaza continutul 
    let info_card;
    switch (clickedElement.id) {
      case 'card1':
        info_card = 'cap1';
        break;
      case 'card2':
        info_card = 'cap2';
        break;
      case 'card3':
        info_card = 'cap3';
        break;
      case 'card4':
        info_card = 'echipa';
        break;

      default:
        console.log('problema la switch');
        break;
    }
    document.getElementById(info_card).classList.toggle('hidden');


    // adauga functia care readuce totul la default la element
    clickedElement.addEventListener('click', showAllCards);
  }
}

var showAllCards = function () {
  for (let i = 1; i <= 4; i++) {
    let id = 'card' + i
    // toate cardurile sunt afisate si ordonate
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.remove('pos1');
    document.getElementById(id).classList.remove('pos2');
    document.getElementById(id).classList.remove('pos3');
    document.getElementById(id).classList.remove('pos4');
    document.getElementById(id).classList.add('pos' + i);
    document.getElementById(id).parentElement.classList.remove('hidden');


    // schimba gridul la 4 coloane
    document.getElementById('container').classList.toggle('grid-container-info');

    // ascunde info
    // document.getElementById('info').classList.toggle('hidden');
    document.getElementById('info').classList.toggle('hidden');

    // functia se deataseaza singura de la element
    document.getElementById(id).removeEventListener('click', showAllCards)
  }
}

/**
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function replaceContent(pageToLoad, sidenavHighlight) {
  let content = document.getElementById("lesson");
  let sidenavToHighlight = document.getElementById(sidenavHighlight);

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", pageToLoad, false);
  xmlhttp.send();
  content.innerHTML = xmlhttp.responseText;


  let sidenavToClear = Array.from(document.getElementsByClassName('current_lesson'));
  sidenavToClear.forEach(element => {
    element.classList.remove('current_lesson');
  });

  sidenavToHighlight.classList.add('current_lesson');

}