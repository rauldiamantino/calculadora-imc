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
     document.querySelector("#txtHeight").focus();
     const msg = document.querySelector(".otherMsg");
     msg.innerText = "Preencha os campos corretamente";
     msg.classList.remove("hide-msg");
     setTimeout(function () {
          msg.innerText = "";
          msg.classList.add("hide-msg");
     }, 2000);
};

/* calculate imc with input data  */
const calculateImc = (h, w) => printImc(w / (h * h));

const printImc = fn => {
     const msg = document.querySelector(".resultImc");
     msg.classList.remove("hide-msg");
     msg.innerText = fn.toFixed(1);
};

const clearImcResult = () => {
     const resultImc = document.querySelector(".resultImc");
     resultImc.classList.add("hide-msg");

     const height = document.querySelector("#txtHeight");
     height.value = "";
     height.focus();

     const weight = document.querySelector("#txtWeight");
     weight.value = "";
};
