let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Created by MT 2024`;

let wordgussest = "";
let words = [
  "create",
  "update",
  "delete",
  "master",
  "brunch",
  "mainly",
  "elzero",
  "school",
  "mohammed",
];
wordgussest = words[Math.floor(Math.random() * words.length)];
console.log(wordgussest);
// seetings
let numbersOfTries = 5;
let numbersOfLettiers = wordgussest.length;
let currentTry = 1;
let numberOfhints = 3;

//when reload the page generate the input

function generateinputes() {
  const inputcontener = document.querySelector(".inputes");

  for (let i = 1; i <= numbersOfTries; i++) {
    let trydiv = document.createElement("div");
    trydiv.classList.add(`try-${i}`);
    trydiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) trydiv.classList.add("disabled-inputes");
    //generate the input
    for (let j = 1; j <= numbersOfLettiers; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      trydiv.appendChild(input);
    }
    inputcontener.appendChild(trydiv);
  }
  inputcontener.children[0].children[1].focus();

  let inputdisableddiv = document.querySelectorAll(".disabled-inputes input");

  inputdisableddiv.forEach((input) => (input.disabled = true));
  // when you wriite it's move to the next input
  let inputes = document.querySelectorAll("input");
  inputes.forEach((inp, index) => {
    inp.addEventListener("input", function () {
      let nextinput = inputes[index + 1];
      if (nextinput) {
        nextinput.focus();
      }
    });
    //settings the keys
    inp.addEventListener("keydown", function (events) {
      let currentindex = Array.from(inputes).indexOf(this);
      if (events.key === "ArrowRight") {
        let nextinput = currentindex + 1;
        if (nextinput < inputes.length) inputes[nextinput].focus();
      }
      if (events.key === "ArrowLeft") {
        let previous = currentindex - 1;
        if (previous >= 0) inputes[previous].focus();
      }
      if (events.key === "Backspace") {
        let previous = currentindex - 1;
        if (previous >= 0) {
          events.preventDefault();
          inputes[currentindex].value = "";
          inputes[currentindex].classList = [];
          inputes[previous].focus();
        }
      }
      if (events.key === "Enter") {
        gussbutton.click();
      }
    });
  });
}
// handle check button
let gussbutton = document.querySelector(".check_word");
gussbutton.addEventListener("click", handleGusses);
function handleGusses() {
  let sucssesguss = "";
  let allinputvalu = [];
  // settings numbers of input (number of letters)
  for (let i = 1; i <= numbersOfLettiers; i++) {
    let inputefield = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    let inputevalue = inputefield.value.toLowerCase();
    allinputvalu.push(inputefield.value);
    let realleter = wordgussest[i - 1];
    if (realleter === inputevalue && inputevalue !== "") {
      inputefield.classList.add("in-place");
      if (allinputvalu.join("") === wordgussest) {
        sucssesguss = true;
      }
    } else if (wordgussest.includes(inputevalue) && inputevalue !== "") {
      inputefield.classList.add("not-in-place");
      sucssesguss = false;
    } else if (realleter !== inputevalue && inputevalue !== "") {
      inputefield.classList.add("no");
      sucssesguss = false;
    }
  }
  let massegeArea = document.querySelector(".massege");
  // check the win or lose
  if (sucssesguss) {
    massegeArea.innerHTML = `You win the word is <br><span>${wordgussest.toUpperCase()}</span>`;
    let alltries = document.querySelectorAll(".inputes > div");
    alltries.forEach((trydiv) => {
      trydiv.classList.add("disabled-inputes");
      document.querySelectorAll(".disabled-inputes input").forEach((inp) => {
        inp.disabled = true;
      });
    });
    gussbutton.disabled = true;
    hinbutton.classList.add("disabled-inputes");
    hinbutton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputes");
    let curnettryinpute = document.querySelectorAll(`.try-${currentTry} input`);
    curnettryinpute.forEach((inp) => {
      inp.disabled = true;
    });
    currentTry++; // move to the next try

    if (currentTry <= numbersOfTries) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputes");
      let nexttryinput = document.querySelectorAll(`.try-${currentTry} input`);
      nexttryinput.forEach((inp) => {
        inp.disabled = false;
      });
      nexttryinput[0].focus();
    } else {
      massegeArea.innerHTML = `You lose the word is <br><span>${wordgussest.toUpperCase()}</span>`;
      gussbutton.disabled = true;
    }
  }
}
// handle the hint button
let hinbutton = document.querySelector(".hint");
let hinbuttonspan = document.querySelector(".hint span");

hinbutton.addEventListener("click", handlehint);
let arr = [...wordgussest];
hinbuttonspan.innerHTML = numberOfhints;
function handlehint() {
  if (numberOfhints > 0) {
    let rendomhint = arr[Math.floor(Math.random() * arr.length)];
    let hint = arr.indexOf(rendomhint);
    let curnettryinpute = document.querySelectorAll(`.try-${currentTry} input`);
    let inputarr = Array.from(curnettryinpute);
    inputarr.filter((inp) => {
      inp.value === "";
      inputarr[wordgussest.indexOf(rendomhint)].value = rendomhint;
      inputarr[wordgussest.indexOf(rendomhint)].classList.add(
        "disabled-inputes"
      );
      inputarr[wordgussest.indexOf(rendomhint)].classList.add("in-place");
      inputarr[wordgussest.indexOf(rendomhint)].disabled = true;
    });
    arr.splice(hint, 1);
    numberOfhints--;
    hinbuttonspan.innerHTML = numberOfhints;
    let newarr = [];
    inputarr.map((inp) => {
      if (!inp.hasAttribute("class", "disabled-inputes")) {
        newarr.push(inp);
      }
    });
    newarr[0].focus();
    newarr = [];
  }
}
let restart = document.querySelector(".reload");
restart.onclick = function () {
  window.location.reload();
};

window.onload = function () {
  generateinputes();
};
