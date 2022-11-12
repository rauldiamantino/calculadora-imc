const calcButton = document.querySelector("#calculateButton");
calcButton.addEventListener("click", () => getInputs());

const clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => clearImcResult());

/* get input values */
const getInputs = () => {
     const height = formatNumber(document.querySelector("#txtHeight"));
     const weight = formatNumber(document.querySelector("#txtWeight"));
     return verifyIfEmpty(height, weight);
};

/* format number captured in input */
const formatNumber = number => number.value.replace(",", ".");

/* checks if the number is valid and prints an error message*/
const verifyIfEmpty = (a, b) => (a == 0 || b == 0 ? printError() : calculateImc(a, b));

const printError = fn => {
     const height = document.querySelector("#txtHeight");
     height.focus();
     height.classList.add("inputBackGround");

     const weight = document.querySelector("#txtWeight");
     weight.classList.add("inputBackGround");

     const msg = document.querySelector(".otherMsg");
     msg.innerText = "Preencha os campos corretamente";
     msg.classList.remove("hide-msg");

     setTimeout(function () {
          height.classList.remove("inputBackGround");
          weight.classList.remove("inputBackGround");

          msg.innerText = "";
          msg.classList.add("hide-msg");
     }, 2000);
};

/* calculate imc with input data  */
const calculateImc = (h, w) => printImc(w / (h * h));

const printImc = fn => {
     const msg = document.querySelector(".resultImc");
     msg.classList.remove("hide-msg");
     msg.innerText = fn.toFixed(2);

     /* access the table and set class */
     const getTable = () => {
          const tableImc = document.querySelectorAll("tbody tr");
          return tableImc.forEach(verify);
     };

     const verify = (el, index) => {
          removeRating(el);
          if (index == imcRating(fn)) {
               return addRating(el);
          }
     };

     getTable();
};

/* add and remove table class */
const addRating = element => element.classList.add("imcRating");
const removeRating = element => element.classList.remove("imcRating");

/* Imc rating */
const imcRating = fn => {
     if (fn >= 40.0) {
          return 5; // obesity3
     } else if (fn >= 35.0) {
          return 4; // obesity2
     } else if (fn >= 30.0) {
          return 3; // obesity1
     } else if (fn >= 25.0) {
          return 2; // overWeight
     } else if (fn >= 18.5) {
          return 1; // normal
     } else {
          return 0; // underWeight
     }
};

const clearImcResult = () => {
     const resultImc = document.querySelector(".resultImc");
     resultImc.classList.add("hide-msg");

     const height = document.querySelector("#txtHeight");
     height.value = "";
     height.focus();

     const weight = document.querySelector("#txtWeight");
     weight.value = "";

     const tableImc = document.querySelectorAll("tbody tr");
     tableImc.forEach(removeRating);
};
