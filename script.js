import KMPSearch from "./stringMatchingAlgo.js";

const source = document.querySelector(".text-source");
const wholeCheckmark = document.getElementById("check2");
const isExactCheck = document.getElementById("check1");
const patInput = document.querySelector(".find-input");
const replaceInput = document.querySelector(".replace-input");
const replaceBtn = document.querySelector(".replace-btn");

let string = "aa ba a aa ba";
source.innerHTML = string;
let stringArr = string.split("");
let positionIndex = [];

patInput.addEventListener("keyup", function () {
  getAllMatch(this.value, !wholeCheckmark.checked, isExactCheck.checked);
});

wholeCheckmark.addEventListener("change", function () {
  // source.innerHTML = string;
  getAllMatch(patInput.value, !this.checked, isExactCheck.checked);
});

isExactCheck.addEventListener("change", function () {
  getAllMatch(patInput.value, this.checked, isExactCheck.checked);
});

replaceBtn.addEventListener("click", function () {
  if (patInput.value && replaceInput.value) {
    stringArr = string.split("");
    replaceString2(
      stringArr,
      patInput.value.length,
      positionIndex,
      replaceInput.value
    );
    let res = stringArr.join("");
    string = res;
    source.innerHTML = res;
  }
});

// console.log(positionIndex);

function getAllMatch(value, isAll, isExact) {
  if (value) {
    let pat = value;
    stringArr = string.split("");
    positionIndex = KMPSearch(pat, string, isAll, isExact);
    console.log(positionIndex);
    replaceString(stringArr, pat.length, positionIndex, value);
    let res = stringArr.join("");
    source.innerHTML = res;
  } else {
    source.innerHTML = string;
  }
}

function replaceString(arr, patLength, posIndex, pat) {
  let count = 0;
  for (let i = 0; i < posIndex.length; i++) {
    arr.splice(
      posIndex[i] - count,
      patLength,
      "<span>" + getString(arr, posIndex[i] - count, patLength) + "</span>"
    );
    count = count + patLength - 1;
  }
}

function replaceString2(arr, patLength, posIndex, pat) {
  let count = 0;
  for (let i = 0; i < posIndex.length; i++) {
    arr.splice(posIndex[i] - count, patLength, pat);
    count = count + patLength - 1;
  }
}
// getString(string, posIndex[i] - count, patLength)

function getString(source, from, length) {
  let str = [];
  for (let i = 0; i < length; i++) {
    str.push(source[i + from]);
  }
  // console.log(str.join(" "));
  return str.join("");
}

let res = stringArr.join("");
source.innerHTML = res;

function getRandomString(length) {
  let string = "";
  for (let i = 0; i < length; i++) {
    let random = getRandomInt(0, 3);
    if (random == 1) {
      string += "a";
    } else if (random == 2) {
      string += "b";
    } else if (random == 3) {
      string += " ";
    }
  }
  return string;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
