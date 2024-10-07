const display = document.getElementById("display");
const output = document.getElementById("output");

// Function to display user input to screen
function appendToDisplay(input) {
  display.value += input;
}

// Function to clear input
function clearDisplay() {
  display.value = "";
}

// Function to clear output
function clearOutput() {
  output.value = "";
}

// Function to delete a number
function backspace() {
  // Remove the last character from the display value
  display.value = display.value.slice(0, -1);
}

// Function if user use keyboard keys
function keyPress(event) {
  const key = event.key;

  // Check for specific keys and append to the display
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      appendToDisplay(key);
      break;
    case '(':
      appendToDisplay('(');
      break;
    case ')':
      appendToDisplay(')');
      break;
    case '.':
      appendToDisplay('.');
      break;
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
      appendToDisplay(key);
      break;
    case 'Enter':
      event.preventDefault();
      calculate();
      break;
    case 'Escape':
      event.preventDefault();
      clearDisplay();
      break;
    case 'Backspace':
      event.preventDefault();
      backspace();
      break;
    case '^':
      appendToDisplay('**');
      break;
    default:
      // Ignore other keys
      break;
  }
}

// Function to calculate expression
function calculate() {
  try {

    // For parenthesis problem. 
    let userInput = display.value.replace(/([\d.]+)(?=\()/g, "$1*");

    // Check if userInput is empty
    if (!userInput.trim()) {
      output.value = "No expression";
      setTimeout(clearOutput, 2000);
      return;
    }

    const result = eval(userInput);

    if (!isNaN(result) && isFinite(result)) {
      output.value = result;
      setTimeout(clearDisplay, 250);
    } else {
      throw new Error("Error");
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      output.value = "Invalid expression";
      setTimeout(clearOutput, 2000);
    } else if (error instanceof Error && error.message === "Error") {
      output.value = "Undefined";
      setTimeout(clearOutput, 2000);
    }
    setTimeout(clearDisplay, 250);
  }
}