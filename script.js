var currentInput = "";
var previousInput = "";
var operator = "";

// ---- arithmetic functions ----
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b)   { return b === 0 ? "Error" : a / b; }

function updateDisplay() {
  var sym = { "+": "+", "-": "-", "*": "\u00D7", "/": "\u00F7" };
  document.getElementById("expression").textContent =
    previousInput + (operator ? " " + sym[operator] + " " : "");
  document.getElementById("result").textContent = currentInput || "0";
}

function appendNumber(n) {
  if (n === "." && currentInput.includes(".")) return;
  currentInput += n;
  updateDisplay();
}

function setOperator(op) {
  if (currentInput === "" && previousInput === "") return;
  if (currentInput !== "" && previousInput !== "") calculate();
  if (currentInput !== "") { previousInput = currentInput; currentInput = ""; }
  operator = op;
  updateDisplay();
}

function calculate() {
  if (previousInput === "" || currentInput === "" || operator === "") return;
  var a = parseFloat(previousInput), b = parseFloat(currentInput), r;
  switch (operator) {
    case "+": r = add(a, b); break;
    case "-": r = subtract(a, b); break;
    case "*": r = multiply(a, b); break;
    case "/": r = divide(a, b); break;
  }
  operator = ""; previousInput = "";
  currentInput = (r === "Error") ? "Error" : String(parseFloat(r.toFixed(10)));
  updateDisplay();
  if (currentInput === "Error") currentInput = "";
}

function clearAll() {
  currentInput = ""; previousInput = ""; operator = "";
  updateDisplay();
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

// ---- keyboard support (extra credit) ----
document.addEventListener("keydown", function (e) {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") appendNumber(e.key);
  else if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
  else if (e.key === "Enter" || e.key === "=") { e.preventDefault(); calculate(); }
  else if (e.key === "Backspace") backspace();
  else if (e.key === "Escape" || e.key.toLowerCase() === "c") clearAll();
});
