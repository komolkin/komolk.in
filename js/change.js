let old = createNumberArray(5);

/**
 * Funktion zum erzeugen eines Array aus jeder einzelnen Stelle.
 * Dabei werden die Stellen immer auf 6 aufgerundet.
 * @example mit der Zahl 5
 * createNumberArray(5) => [0, 0, 0, 0, 0, 5]
 * @example mit der Zahl 552
 * createNumberArray(5) => [0, 0, 0, 5, 5, 2]
 * @param {number} number Die zu einem Array werden soll.
 */
function createNumberArray(number) {
  let isNegativ = false;
  // Zerlegt die Nummer in einen Array
  const numberArray = number.toString().split("");
  for (let i = 0; numberArray.length < 6; i++) {
    if (numberArray[0] === "-") {
      numberArray[0] = 0;
      isNegativ = true;
    }
    numberArray.unshift(0);
  }
  // setzt sofern es Negativ ist ein Minus
  if (isNegativ) {
    numberArray.unshift("-");
  } else {
    numberArray.unshift("+");
  }
  // gibt den Array zurück
  return numberArray.map((x) => (x === "-" || x === "+" ? x : parseInt(x)));
}

/**
 * Funktion zum erzeugen der Number und dem Anzeigen sowie dem Animieren der einzelnen,
 * Stellen der Number.
 * @param {number} number Nummer die angezeigt werden soll.
 * @param {HTMLelement} element HTML Element in dem die Nummer stehen soll.
 */
function animateNumber(number, element) {
  // Leert das Element
  element.innerHTML = "";
  // Berechnet den neuen Number Array
  const numberArray = createNumberArray(number);
  // Legt alles in das HTML Element
  createNumberHTML(numberArray, old, element);
  // Berechnet die Ticks die verändert werden sollen.
  const ticks = [...element.querySelectorAll("span[data-value]")];
  setTimeout(() => {
    // Animiert die Werte
    for (let tick of ticks) {
      let dist = parseInt(tick.getAttribute("data-value") - 1);
      tick.style.transform = `translateY(-${dist * 100}%)`;
    }
  }, 0);
  // Setzten den Zahlen Array zu dem Alten Status
  old = numberArray;
}

function createNumberHTML(numbers, old, element) {
  for (let i = 0; i < numbers.length; i++) {
    if (isNaN(numbers[i]) || isNaN(old[i])) {
      element.insertAdjacentHTML(
        "beforeend",
        `<span data-value="${
          calcDeltaSight(old[i], numbers[i]).length
        }">${calcDeltaSight(old[i], numbers[i]).join("")}</span>`
      );
    } else {
      element.insertAdjacentHTML(
        "beforeend",
        `<span data-value="${
          calcDeltaBetweenNumbers(old[i], numbers[i]).length
        }">${calcDeltaBetweenNumbers(old[i], numbers[i]).join("")}</span>`
      );
    }
  }
  return element;
}

function calcDeltaSight(oldSight, newSight) {
  return oldSight !== newSight
    ? [`<span>${oldSight}</span>`, `<span>${newSight}</span>`]
    : [`<span>${newSight}</span>`];
}

/**
 * Funktion um das Delta zwischen den einzelnen Zahlen zu erhalten. Diese Funktion erzeugt einen Array aus Spans.
 * @example Beispiel mit den Zahlen 2 und 5
 * calcDeltaBetweenNumbers(2, 5) => 2, 3, 4, 5 => <span>2</span><span>3</span><span>4</span><span>5</span>
 * @example Beispiel mit den Zahlen 7 und 2
 * calcDeltaBetweenNumbers(7, 2) => 7, 8, 9, 0, 1, 2 => <span>7</span><span>8</span><span>9</span><span>0</span><span>1</span><span>2</span>
 * @param {number} oldNumber Alte Number
 * @param {number} newNumber Neue Number
 */
function calcDeltaBetweenNumbers(oldNumber, newNumber) {
  let numberArray = [oldNumber];
  let notFound = true;
  if (oldNumber === newNumber)
    return numberArray.map((x) => `<span>${x}</span>`);
  while (notFound) {
    oldNumber++;
    if (oldNumber > 9) oldNumber = 0;
    numberArray.push(oldNumber);
    if (oldNumber === newNumber) notFound = false;
  }
  return numberArray.map((x) => `<span>${x}</span>`);
}

/**
 * Funktion zum erzeugen eines Random Wertes. (Number)
 * @param {number} min Minimaler Wert den der Random Wert erreichen darf.
 * @param {number} max Maximaler Wert den der Random Wert erreichen darf.
 */
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

setInterval(() => {
  const diff = randomNumber(-20, 20);
  document.querySelector(".diff").innerHTML = diff;
  const value = parseInt(old.join("")) + diff;
  animateNumber(value, document.querySelector(".stock-price-cents"));
}, 2500);
