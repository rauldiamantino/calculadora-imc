const $calcButton = document.querySelector("#calculateButton");
const $clearButton = document.querySelector("#clearButton");

/* add event listeners */
$calcButton.addEventListener("click", () => getInputs());
$clearButton.addEventListener("click", () => clearImcResult());
document.addEventListener("keypress", e => (e.key === "Enter" ? getInputs() : false));

/* get input values */
const getInputs = () => {
     const $height = formatNumber(document.querySelector("#txtHeight"));
     const $weight = formatNumber(document.querySelector("#txtWeight"));

     verifyIfEmpty($height, $weight);
     $clearButton.focus();
};

/* format number captured in input */
const formatNumber = number => number.value.replace(",", ".");

/* checks if the number is valid and prints an error message*/
const verifyIfEmpty = ($height, $weight) =>
     $height == 0 || $weight == 0 ? printError() : calculateImc($height, $weight);

const printError = fn => {
     const $height = document.querySelector("#txtHeight");
     const $weight = document.querySelector("#txtWeight");
     const $msg = document.querySelector(".otherMsg");

     errorMsg($height, $weight, $msg);
     clearErrorMsg($height, $weight, $msg);
};

const errorMsg = ($height, $weight, $msg) => {
     $height.focus();
     $height.classList.add("inputBackGround");
     $weight.classList.add("inputBackGround");
     $msg.innerText = "Preencha os campos corretamente";
     $msg.classList.remove("hide-msg");
};

const clearErrorMsg = ($height, $weight, $msg) => {
     setTimeout(function () {
          $height.classList.remove("inputBackGround");
          $weight.classList.remove("inputBackGround");
          $msg.innerText = "";
          $msg.classList.add("hide-msg");
          $height.focus();
     }, 2000);
};

/* calculate imc with input data  */
const calculateImc = (height, weight) => {
     const imcFactor = weight / (height * height);
     const alternativeImcFactor = weight / ((height / 100) * (height / 100));
     const ifHeightWithoutComma = height % 1 === 0;

     return ifHeightWithoutComma ? printImc(alternativeImcFactor) : printImc(imcFactor);
};

const printImc = fn => {
     const $msg = document.querySelector(".resultImc");
     $msg.classList.remove("hide-msg");
     $msg.innerText = fn.toFixed(2);

     /* access the table and set class */
     const getTable = () => {
          const $tableImc = document.querySelectorAll("tbody tr");
          return $tableImc.forEach(verify);
     };

     /* checks if tr element of the table is equal to imcRating, and paint the tr */
     const verify = (element, index) => {
          removeRating(element);
          if (index == imcRating(fn)) {
               return addRating(element);
          }
     };

     return getTable();
};

/* add and remove table paint class */
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

/* clear Button function */
const clearImcResult = () => {
     const $resultImc = document.querySelector(".resultImc");
     const $height = document.querySelector("#txtHeight");
     const $weight = document.querySelector("#txtWeight");
     const $tableImc = document.querySelectorAll("tbody tr");

     $height.value = "";
     $weight.value = "";
     $resultImc.classList.add("hide-msg");
     $tableImc.forEach(removeRating);
     $height.focus();
};
