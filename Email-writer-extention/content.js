// Log when the content script is loaded
console.log("Email Writer Extension - Content Script Loaded");

/**
 * Creates an AI button element styled to match Gmail's UI
 * @returns {HTMLElement} The created button element
 */
function createAIButton() {
  const button = document.createElement("div");

  // Apply Gmail-like styling classes to match the UI
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button"); // Define button role for accessibility
  button.setAttribute("data-tooltip", "Generate AI Reply"); // Tooltip for users
  return button;
}

/**
 * Extracts email content from the Gmail interface
 * @returns {string} The extracted email content or empty string if not found
 */
function getEmailContent() {
  // Array of possible selectors where email content might be located
  const selectors = [
    ".h7", // Gmail header content
    ".a3s.aiL", // Gmail email body
    ".gmail_quote", // Quoted previous messages
    '[role="presentation"]', // Fallback for various email structures
  ];

  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim(); // Return email content with trimmed spaces
    }
  }
  return ""; // Return an empty string if no content is found
}

/**
 * Finds the Gmail compose toolbar
 * @returns {HTMLElement|null} The toolbar element or null if not found
 */
function findComposeToolbar() {
  // Possible toolbar selectors used in Gmail
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];

  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar; // Return the first matched toolbar
    }
  }
  return null; // Return null if toolbar is not found
}

/**
 * Injects the AI button into the Gmail compose window
 */
async function injectButton() {
  // Remove any existing AI button to prevent duplicates
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) {
    existingButton.remove();
  }

  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not found"); // Log if toolbar is not available
    return;
  }

  console.log("Toolbar Found, Creating AI Button");
  const button = createAIButton();
  button.classList.add("ai-reply-button"); // Add a class for identification

  // Event listener to handle AI reply generation on button click
  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating..."; // Show loading state
      button.disabled = true; // Disable button to prevent multiple clicks

      const emailContent = getEmailContent();
      if (!emailContent) {
        throw new Error("No email content found"); // Error if no content is available
      }

      // Send a request to the AI API for generating a reply
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional", // Define the tone of the AI-generated response
        }),
      });

      if (!response.ok) {
        throw new Error(`API Request Failed: ${response.status}`);
      }

      const generatedReply = await response.text(); // Get response text

      // Locate the Gmail compose box
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );

      if (composeBox) {
        composeBox.focus(); // Focus on the compose box before inserting text
        document.execCommand("insertText", false, generatedReply); // Insert AI-generated response
      } else {
        throw new Error("Compose box not found");
      }
    } catch (error) {
      console.error("Error generating reply:", error);
      alert(`Failed to generate reply: ${error.message}`); // Show error alert to user
    } finally {
      button.innerHTML = "AI Reply"; // Reset button text
      button.disabled = false; // Enable button again
    }
  });

  // Insert the AI button into the Gmail toolbar
  toolbar.insertBefore(button, toolbar.firstChild);
}

/**
 * Observes DOM changes to detect when a compose window opens
 */
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btC, [role="dialog"]') ||
          node.querySelector('.aDh, .btC, [role="dialog"]'))
    );

    if (hasComposeElements) {
      console.log("Compose Window Detected");
      setTimeout(injectButton, 500); // Delay injection slightly for UI stability
    }
  }
});

// Start observing DOM changes to detect compose window openings
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

/**
 * Cleanup observer when extension is disabled or removed
 */
window.addEventListener("unload", () => {
  observer.disconnect(); // Stop observing DOM changes
});
