function createAIButton() {
  const button = document.createElement("button");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button";
  button.style.marginRight = "8px";
  button.type = "button";
  button.innerText = "AI Reply";
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}

function createToneSelector() {
  const select = document.createElement("select");
  select.className = "ai-tone-select";
  select.style.marginRight = "8px";
  select.style.padding = "2px 5px";
  select.title = "Select Tone";

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "formal", label: "Formal" },
  ];

  tones.forEach((tone) => {
    const option = document.createElement("option");
    option.value = tone.value;
    option.textContent = tone.label;
    select.appendChild(option);
  });

  return select;
}

function getEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return "";
}

function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar && toolbar.offsetParent !== null) {
      return toolbar;
    }
  }
  return null;
}

function injectButton() {
  const toolbar = findComposeToolbar();
  if (!toolbar) {
    console.log("Toolbar not visible yet, retrying...");
    setTimeout(injectButton, 500);
    return;
  }

  if (toolbar.querySelector(".ai-reply-button")) {
    console.log("AI Reply button already exists in this compose box");
    return;
  }

  console.log("Toolbar found, injecting AI button and tone selector");

  const toneSelect = createToneSelector();
  const button = createAIButton();

  button.addEventListener("click", async () => {
    try {
      button.innerText = "Generating...";
      button.disabled = true;

      const selectedTone = toneSelect.value || "professional";
      const emailContent = getEmailContent();

      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: selectedTone,
        }),
      });

      if (!response.ok) throw new Error("API Request Failed");

      const generatedReply = await response.text();
      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );

      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, generatedReply);
      } else {
        console.error("Compose box not found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate reply. Please try again.");
    } finally {
      button.innerText = "AI Reply";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(toneSelect, toolbar.firstChild);
  toolbar.insertBefore(button, toneSelect.nextSibling);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches(".aDh, .btC, [role='dialog']") ||
          node.querySelector(".aDh, .btC, [role='dialog']"))
    );

    if (hasComposeElements) {
      console.log("Compose Window Detected");
      setTimeout(injectButton, 1000);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
