"use strict";
var generate = document.getElementById("generate");
var copyButton = document.getElementById("copy");
var generatedPassword = (document.getElementById("generated-password"));
var passwordLengthInput = (document.getElementById("length-input"));
var uppercaseCheckbox = (document.getElementById("uppercase-checkbox"));
var lowercaseCheckbox = (document.getElementById("lowercase-checkbox"));
var numberCheckbox = (document.getElementById("numbers-checkbox"));
var symbolCheckbox = (document.getElementById("symbols-checkbox"));
function copyPassword() {
    if (generatedPassword.value !== "") {
        navigator.clipboard
            .writeText(generatedPassword.value)
            .then(function () { return alert("Copied to the clipboard"); })
            .catch(function () { return alert("Uh oh... Something went wrong"); });
    }
}
copyButton.onclick = function () { return copyPassword(); };
generatedPassword.onclick = function () { return copyPassword(); };
var arrayOfOptions = [
    uppercaseCheckbox,
    lowercaseCheckbox,
    numberCheckbox,
    symbolCheckbox,
];
function randomNumber(num) {
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
    var symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[randomNumber(symbols.length - 1)];
}
var randomFunctionsDictionary = {
    lowercase: randomLowercase,
    uppercase: randomUppercase,
    numbers: getRandomNumber,
    symbols: randomSymbol,
};
function generatePassword() {
    var password = "";
    var passwordLength = passwordLengthInput.valueAsNumber;
    var selectedOptions = arrayOfOptions
        .filter(function (option) { return option.checked; })
        .map(function (option) { return option.name; });
    if (selectedOptions.length) {
        for (var i = 0; i < passwordLength; i += 1) {
            password +=
                randomFunctionsDictionary[selectedOptions[randomNumber(selectedOptions.length - 1)]]();
        }
        generatedPassword.value = password;
    }
    else
        generatedPassword.value = "P@SSW0RD :(";
}
generate.addEventListener("click", function () { return generatePassword(); });
