const BASE_URL = `https://open.er-api.com/v6/latest`;
const b = `https://api.frankfurter.dev/v2/rates`;
const url = `https://api.frankfurter.dev/v2/rates?base=INR&quotes=USD`;

const dropdown = document.querySelectorAll("select");
// console.log(dropdown);
// console.log(dropdown[0]);
// console.log(dropdown[1]);

const btn = document.getElementById("btn");
// console.log(btn);

const msg = document.getElementById("msg");
// console.log(msg);

const img = document.querySelector("img");
// console.log(img);

const input = document.getElementById("amount");

const swapBtn = document.querySelector("#dropdown > div:nth-child(2)");
// console.log(swapBtn);

const getData = async () => {
  const response = await fetch(BASE_URL);
  if (!response) {
    console.log("failed to fetch");
  }
  const data = await response.json();
  // console.log(data);
  // console.log(data[0].rate);
  const rates = data.rates;
  // console.log(typeof rates); //object
  // console.log(data.rates['AED']);
  const countryArray = Object.keys(rates);
  // console.log(countryArray);
  for (let select = 0; select < dropdown.length; select++) {
    // console.log("select is",dropdown[select]);
    countryArray.forEach((c) => {
      const option = document.createElement("option");
      option.innerHTML = `${c}`;
      option.value = c;
      if (dropdown[select].name === "from" && c === "USD") {
        option.selected = "selected";
      } else if (dropdown[select].name === "to" && c === "INR") {
        option.selected = "selected";
      }
      dropdown[select].append(option);
    });
  }

  dropdown[0].addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
  dropdown[1].addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
  input.addEventListener("change", () => {
    updateExchangeRate();
  });
};

getData();
swapBtn.addEventListener("click", () => {
  const temp = dropdown[0].value;
  dropdown[0].value = dropdown[1].value;
  dropdown[1].value = temp;
  // console.log(dropdown[0].value);
  // console.log(dropdown[1].value);

  updateFlag(dropdown[0]);
  updateFlag(dropdown[1]);
  updateExchangeRate();
});
const updateFlag = (flag) => {
  //   console.log(flag.value);
  let countryCode = flag.value.slice(0, 2);
  //   console.log(countryCode);
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let newImg = flag.parentElement.querySelector("img");
  newImg.src = newSrc;
};

const updateExchangeRate = async () => {
  const fromCurr = dropdown[0].value;
  const toCurr = dropdown[1].value;
  const amount = input.value;

  //   console.log("from currency is", fromCurr);
  //   console.log("to currency is", toCurr);
  //   console.log("amount is", amount);
  let newResponse = await fetch(`${BASE_URL}/${fromCurr}`);
  const newData = await newResponse.json();
  //   console.log(newData);
  const newRates = newData.rates;
  //   console.log(newRates); //object
  const toCountryRate = newData.rates[`${toCurr}`];
  //   console.log(toCountryRate);
  let finalAmount = amount * toCountryRate;
  //   console.log(finalAmount);

  msg.innerHTML = `${amount} ${fromCurr}=${finalAmount} ${toCurr}`;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  //   getData();
  updateExchangeRate();
});
