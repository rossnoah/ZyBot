"use strict";

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
// const pageTitle = document.head.getElementsByTagName("title")[0].innerHTML;
// console.log(
//   `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
// );

// // Communicate with background file by sending a message
// chrome.runtime.sendMessage(
//   {
//     type: "GREETINGS",
//     payload: {
//       message: "Hello, my name is Con. I am from ContentScript.",
//     },
//   },
//   (response) => {
//     console.log(response.message);
//   }
// );

// // Listen for message
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === "COUNT") {
//     console.log(`Current count is ${request.payload.count}`);
//   }

//   // Send an empty response
//   // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
//   sendResponse({});
//   return true;
// });

// Existing communication with background script...

// Function to change text of specific spans

function findAndClickButtons() {
  // Query all buttons with the specified class
  const buttons = document.querySelectorAll(
    "button.zb-button.secondary.show-answer-button"
  );

  // Loop through the NodeList of buttons
  buttons.forEach((button) => {
    // Check if the button contains a span with the text 'Test'
    const span = button.querySelector("span.title");
    if (span && span.textContent === "Show answer") {
      // Trigger a click event on the button
      button.click();
    }
  });
}
function simulateTyping(textarea, text, callback) {
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      textarea.value += text.charAt(i);
      i++;
      setTimeout(typeChar, 50); // Delay between each character, adjust as needed
    } else if (callback) {
      callback(); // Call the callback function after typing is complete
    }
  }
  typeChar();
}

// Function to process each question and simulate typing the answer
function processQuestions() {
  // Query all question blocks
  const questionBlocks = document.querySelectorAll(
    ".question-set-question.short-answer-question.ember-view"
  );

  // Loop through each question block
  questionBlocks.forEach((block, index) => {
    // Find the answer span and textarea within this block
    const answerSpan = block.querySelector(".zb-explanation .forfeit-answer");
    const textarea = block.querySelector("textarea");
    const checkButton = block.querySelector(
      "button.zb-button.primary.raised.check-button"
    );

    if (answerSpan && textarea && checkButton) {
      // Simulate typing in the textarea
      simulateTyping(textarea, answerSpan.textContent.trim(), () => {
        // Use setTimeout to stagger the checking of answers
        // setTimeout(() => {
        //   checkButton.click();
        //   console.log(
        //     "Clicked check button after simulating typing:",
        //     answerSpan.textContent.trim()
        //   );
        // }, 300 + 100 * index); // Staggered delay
      });
    }
  });
}

function clickRadioInputs() {
  // Query all radio input elements within the specified container
  const radioInputs = document.querySelectorAll(
    '.question .question-choices .zb-radio-button input[type="radio"]'
  );

  // Loop through each radio input and click it with a delay
  radioInputs.forEach((radioInput, index) => {
    setTimeout(() => {
      radioInput.click();
      console.log("Clicked radio input:", radioInput);
    }, 150 * index); // 150ms delay offset for each radio button
  });
}

// // run findAndClickButtons() at a 3 second delay

function checkElementExists() {
  // Construct the selector string
  const selector =
    'div.zb-chevron.check.title-bar-chevron.orange.filled.large[aria-label="Activity completed"][role="img"]';

  // Use querySelector to find the element
  const element = document.querySelector(selector);

  // Check if the element exists
  if (element) {
    console.log("Element exists in the DOM.");
    return true;
  } else {
    console.log("Element does not exist in the DOM.");
    return false;
  }
}

if (checkElementExists()) {
  console.log("Element exists in the DOM.");
} else {
  setTimeout(findAndClickButtons, 3000);
  setTimeout(findAndClickButtons, 4000);
  setTimeout(processQuestions, 6000);

  setTimeout(clickRadioInputs, 7000);
}

// setTimeout(findAndClickButtons, 3000);
// setTimeout(findAndClickButtons, 4000);
// setTimeout(processQuestions, 6000);

// setTimeout(clickRadioInputs, 7000);
