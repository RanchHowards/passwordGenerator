const generate = <HTMLDivElement>document.getElementById("generate");
const generatedPassword = <HTMLInputElement>(
  document.getElementById("generated-password")
);
const passwordLengthInput = <HTMLInputElement>(
  document.getElementById("length-input")
);
const uppercaseCheckbox = <HTMLInputElement>(
  document.getElementById("uppercase-checkbox")
);
const lowercaseCheckbox = <HTMLInputElement>(
  document.getElementById("lowercase-checkbox")
);
const numberCheckbox = <HTMLInputElement>(
  document.getElementById("numbers-checkbox")
);
const symbolCheckbox = <HTMLInputElement>(
  document.getElementById("symbols-checkbox")
);

const arrayOfOptions = [
  uppercaseCheckbox,
  lowercaseCheckbox,
  numberCheckbox,
  symbolCheckbox,
];

function randomNumber(num: number) {
  return Math.floor(Math.random() * (num + 1));
}
function randomLowercase() {
  return String.fromCharCode(randomNumber(25) + 97);
}
function randomUppercase() {
  return String.fromCharCode(randomNumber(25) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(randomNumber(9) + 48);
}
function randomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[randomNumber(symbols.length - 1)];
}

const randomFunctionsDictionary = {
  lowercase: randomLowercase,
  uppercase: randomUppercase,
  numbers: getRandomNumber,
  symbols: randomSymbol,
};

function generatePassword() {
  let password = "";
  const passwordLength = passwordLengthInput.valueAsNumber;
  const selectedOptions = arrayOfOptions
    .filter((option) => option.checked)
    .map((option) => option.name as keyof typeof randomFunctionsDictionary);
  if (selectedOptions.length) {
    for (let i = 0; i < passwordLength; i += 1) {
      password +=
        randomFunctionsDictionary[
          selectedOptions[randomNumber(selectedOptions.length - 1)]
        ]();
    }
    generatedPassword.value = password;
  } else generatedPassword.value = "P@SSW0RD :(";
}

generate.addEventListener("click", () => generatePassword());
