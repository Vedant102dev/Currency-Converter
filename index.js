let dropdown = document.querySelectorAll(".drop select");
const btn = document.querySelector("button");
const from = document.querySelector(".From select");
const to = document.querySelector(".To select");
const msg = document.querySelector(".message");
for (let select of dropdown) {
  for (code in countryList) {
    let opt = document.createElement("option");
    opt.innerText = code;
    opt.value = code;
    if (select.name === "From" && code === "USD") {
      opt.selected = "selected";
    }
    if (select.name === "To" && code === "INR") {
      opt.selected = "selected";
    }
    select.append(opt);
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
}

const updateFlag = (code) => {
  let countryCode = countryList[code.value];
  let newImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = code.parentElement.querySelector("img");
  img.src = newImg;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amt = parseFloat(document.querySelector("input").value);
  if (amt === "" || amt < 1) {
    amt = 1;
    amt.value = "1";
  }
  const url = `https://hexarate.paikama.co/api/rates/latest/${from.value}?target=${to.value}`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data.data.mid;
  let finalAmt = rate * amt;
  msg.innerHTML = `${amt} ${from.value} <strong>=</strong> ${finalAmt} ${to.value}`;
});

document.addEventListener("load", async () => {
  let amt = parseFloat(document.querySelector("input").value);
  if (amt === "" || amt < 1) {
    amt = 1;
    amt.value = "1";
  }
  const url = `https://hexarate.paikama.co/api/rates/latest/${from.value}?target=${to.value}`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data.data.mid;
  let finalAmt = rate * amt;
  msg.innerHTML = `${amt} ${from.value} <strong>=</strong> ${finalAmt} ${to.value}`;
});
