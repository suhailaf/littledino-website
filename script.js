const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navLinks.classList.remove("show");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId && targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
});

const counters = document.querySelectorAll(".count-up");

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute("data-target"), 10);
  let current = 0;
  const increment = Math.max(1, Math.ceil(target / 60));

  const updateCounter = () => {
    current += increment;

    if (current >= target) {
      counter.textContent = target.toLocaleString();
    } else {
      counter.textContent = current.toLocaleString();
      requestAnimationFrame(updateCounter);
    }
  };

  updateCounter();
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
} else {
  counters.forEach((counter) => animateCounter(counter));
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.97)";
    setTimeout(() => {
      button.style.transform = "";
    }, 160);
  });
});

const sparklesContainer = document.getElementById("sparkles");

if (sparklesContainer) {
  const sparkleCount = 22;

  for (let i = 0; i < sparkleCount; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.classList.add("sparkle");

    const size = Math.random() * 5 + 3;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 8 + 8;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `${top}%`;
    sparkle.style.animationDelay = `${delay}s`;
    sparkle.style.animationDuration = `${duration}s`;

    sparklesContainer.appendChild(sparkle);
  }
}

const revealItems = document.querySelectorAll(
  ".feature-card, .step-card, .about-panel, .safety-main-card, .safety-side-card, .plan-card, .testimonial-card, .analytics-card, .contact-card, .app-phone"
);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });
}

const floatingBackground = document.getElementById("floatingBackground");

if (floatingBackground && window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    floatingBackground.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  });
}

/* Interactive demo */

const demoChatWindow = document.getElementById("demoChatWindow");
const demoRecommendationRow = document.getElementById("demoRecommendationRow");
const demoInputText = document.getElementById("demoInputText");
const demoSendBtn = document.getElementById("demoSendBtn");
const demoStatusText = document.getElementById("demoStatusText");
const demoHelperText = document.getElementById("demoHelperText");
const demoChips = document.querySelectorAll(".demo-chip");

const demoBookTitle = document.getElementById("demoBookTitle");
const demoBookDesc = document.getElementById("demoBookDesc");
const demoVideoTitle = document.getElementById("demoVideoTitle");
const demoVideoDesc = document.getElementById("demoVideoDesc");
const demoBookImage = document.getElementById("demoBookImage");
const demoVideoImage = document.getElementById("demoVideoImage");

const demoScenarios = {
  sharks: {
    user: "sharks",
    botMessages: [
      "Sharks are amazing! They are such interesting animals.",
      "I found a fun animal book and a matching ocean learning video for you."
    ],
    bookTitle: "Shark Adventure",
    bookDesc: "A fun children’s book about sharks and ocean life.",
    videoTitle: "Ocean Animals",
    videoDesc: "A fun kids video about sea creatures and ocean life.",
    bookImage: "sharks-book.jpg",
    videoImage: "sharks-video.jpg"
  },
  space: {
    user: "space",
    botMessages: [
      "Wow, space is exciting!",
      "Here’s a storybook and a learning video about planets and stars."
    ],
    bookTitle: "Space Adventure",
    bookDesc: "A fun journey through stars, planets, and space discovery.",
    videoTitle: "Planets for Kids",
    videoDesc: "A simple educational video introducing the solar system.",
    bookImage: "space-book.jpg",
    videoImage: "space-video.jpg"
  },
  dinosaurs: {
    user: "dinosaurs",
    botMessages: [
      "Dinosaurs are one of my favorites too!",
      "Here’s a dino story and a matching learning video for you."
    ],
    bookTitle: "Dino Explorer",
    bookDesc: "A fun children’s story about dinosaur adventures.",
    videoTitle: "Dinosaur Facts",
    videoDesc: "A playful educational video about different dinosaurs.",
    bookImage: "dino-book.jpg",
    videoImage: "dino-video.jpg"
  },
  bedtime: {
    user: "bedtime story",
    botMessages: [
      "A bedtime story sounds lovely.",
      "I found a gentle storybook and a calm video for bedtime."
    ],
    bookTitle: "Moonlight Story",
    bookDesc: "A soft bedtime story perfect for winding down.",
    videoTitle: "Sleepy Night Tales",
    videoDesc: "A relaxing bedtime video for young children.",
    bookImage: "bedtime-book.jpg",
    videoImage: "bedtime-video.jpg"
  }
};

let selectedScenarioKey = null;
let currentStep = 0;
/*
0 = nothing started
1 = input typed, waiting to send user message
2 = user message shown, waiting to show typing
3 = first bot message shown, waiting for second bot message
4 = second bot message shown, waiting to show cards
5 = completed
*/

function demoWait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function scrollDemoToBottom() {
  if (!demoChatWindow) return;
  demoChatWindow.scrollTop = demoChatWindow.scrollHeight;
}

function setActiveChip(key) {
  demoChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.demo === key);
  });
}

function createDemoMessage(text, className) {
  const message = document.createElement("div");
  message.className = `app-message ${className} demo-new`;
  message.textContent = text;
  return message;
}

function createDemoTypingIndicator() {
  const typing = document.createElement("div");
  typing.className = "app-message demo-typing demo-new";
  typing.id = "demoTypingIndicator";
  typing.innerHTML = "<span></span><span></span><span></span>";
  return typing;
}

function removeTypingIndicator() {
  const typing = document.getElementById("demoTypingIndicator");
  if (typing) typing.remove();
}

function resetDemoChat() {
  if (!demoChatWindow) return;

  removeTypingIndicator();

  demoChatWindow.innerHTML = `
    <div class="app-message app-message-bot demo-new">
      Hi! I’m Little Dino 🦕
      <br />
      Tap a topic above and I’ll show you how I recommend books and videos.
    </div>
  `;

  demoRecommendationRow.classList.remove("active");
  demoInputText.textContent = "Ask Little Dino for a story...";
  demoStatusText.textContent = "Online • Ready to help";
  demoStatusText.className = "demo-status-ready";
  currentStep = 0;
}

async function typeIntoDemoInput(text) {
  demoInputText.innerHTML = `<span class="demo-cursor">|</span>`;

  for (let i = 1; i <= text.length; i += 1) {
    demoInputText.innerHTML = `${text.slice(0, i)}<span class="demo-cursor">|</span>`;
    await demoWait(60);
  }

  await demoWait(120);
  demoInputText.textContent = text;
}

async function showTyping() {
  demoStatusText.textContent = "Little Dino is typing...";
  demoStatusText.className = "demo-status-thinking";
  removeTypingIndicator();
  demoChatWindow.appendChild(createDemoTypingIndicator());
  scrollDemoToBottom();
  await demoWait(850);
}

function showBotReady() {
  demoStatusText.textContent = "Online • Ready to help";
  demoStatusText.className = "demo-status-ready";
}

function updateDemoCards(scenario) {
  demoBookTitle.textContent = scenario.bookTitle;
  demoBookDesc.textContent = scenario.bookDesc;
  demoVideoTitle.textContent = scenario.videoTitle;
  demoVideoDesc.textContent = scenario.videoDesc;
  demoBookImage.src = scenario.bookImage;
  demoVideoImage.src = scenario.videoImage;

  demoBookImage.onerror = () => {
    demoBookImage.src = scenario.bookImage;
  };

  demoVideoImage.onerror = () => {
    demoVideoImage.src = scenario.videoImage;
  };

  demoRecommendationRow.classList.add("active");
}

async function startScenario(key) {
  selectedScenarioKey = key;
  setActiveChip(key);
  resetDemoChat();

  const scenario = demoScenarios[key];
  demoHelperText.textContent = "Press the arrow to send the user message.";
  await typeIntoDemoInput(scenario.user);
  currentStep = 1;
}

async function goNextDemoStep() {
  if (!selectedScenarioKey) {
    demoHelperText.textContent = "Choose a topic above first.";
    return;
  }

  const scenario = demoScenarios[selectedScenarioKey];

  if (currentStep === 1) {
    demoSendBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      demoSendBtn.style.transform = "";
    }, 180);

    demoChatWindow.appendChild(createDemoMessage(scenario.user, "app-message-user"));
    scrollDemoToBottom();
    demoHelperText.textContent = "Press the arrow again to show Little Dino typing.";
    currentStep = 2;
    return;
  }

  if (currentStep === 2) {
    await showTyping();
    removeTypingIndicator();
    demoChatWindow.appendChild(createDemoMessage(scenario.botMessages[0], "app-message-bot"));
    scrollDemoToBottom();
    showBotReady();
    demoHelperText.textContent = "Press the arrow again for the next reply.";
    currentStep = 3;
    return;
  }

  if (currentStep === 3) {
    await showTyping();
    removeTypingIndicator();
    demoChatWindow.appendChild(createDemoMessage(scenario.botMessages[1], "app-message-bot"));
    scrollDemoToBottom();
    showBotReady();
    demoHelperText.textContent = "Press the arrow again to reveal the book and video.";
    currentStep = 4;
    return;
  }

  if (currentStep === 4) {
    updateDemoCards(scenario);
    demoHelperText.textContent = "Demo complete. Choose another topic to try again.";
    currentStep = 5;
    return;
  }

  if (currentStep === 5) {
    demoHelperText.textContent = "Choose another topic above to start a new demo.";
  }
}

demoChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    startScenario(chip.dataset.demo);
  });
});

demoSendBtn.addEventListener("click", () => {
  goNextDemoStep();
});
