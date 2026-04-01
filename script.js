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

/* chatbot demo */

const demoChatWindow = document.getElementById("demoChatWindow");
const demoRecommendationRow = document.getElementById("demoRecommendationRow");
const demoInputText = document.getElementById("demoInputText");
const demoSendBtn = document.getElementById("demoSendBtn");

const demoBookTitle = document.getElementById("demoBookTitle");
const demoBookDesc = document.getElementById("demoBookDesc");
const demoVideoTitle = document.getElementById("demoVideoTitle");
const demoVideoDesc = document.getElementById("demoVideoDesc");
const demoBookImage = document.getElementById("demoBookImage");
const demoVideoImage = document.getElementById("demoVideoImage");

const demoScenarios = [
  {
    user: "sharks",
    botMessages: [
      "Sharks are amazing! They are such interesting animals.",
      "I found a fun book and a matching ocean video for you."
    ],
    bookTitle: "The Jungle Book",
    bookDesc: "A classic animal adventure children enjoy reading.",
    videoTitle: "Ocean Animals",
    videoDesc: "A fun kids video about sea creatures and ocean life.",
    bookImage: "book.jpg",
    videoImage: "vid.png"
  },
  {
    user: "space",
    botMessages: [
      "Wow, space is exciting!",
      "Here’s a storybook and a learning video about planets and stars."
    ],
    bookTitle: "Space Adventure",
    bookDesc: "A fun journey through stars, planets, and space discovery.",
    videoTitle: "Planets for Kids",
    videoDesc: "A simple educational video introducing the solar system.",
    bookImage: "book.jpg",
    videoImage: "vid.png"
  },
  {
    user: "dinosaurs",
    botMessages: [
      "Dinosaurs are one of my favorites too!",
      "Here’s a dino story and a matching learning video."
    ],
    bookTitle: "Dino Explorer",
    bookDesc: "A fun children’s story about dinosaur adventures.",
    videoTitle: "Dinosaur Facts",
    videoDesc: "A playful educational video about different dinosaurs.",
    bookImage: "book.jpg",
    videoImage: "vid.png"
  },
  {
    user: "bedtime story",
    botMessages: [
      "A bedtime story sounds lovely.",
      "I found a gentle storybook and a calm video for bedtime."
    ],
    bookTitle: "Moonlight Story",
    bookDesc: "A soft bedtime story perfect for winding down.",
    videoTitle: "Sleepy Night Tales",
    videoDesc: "A relaxing bedtime video for young children.",
    bookImage: "book.jpg",
    videoImage: "vid.png"
  }
];

let demoIndex = 0;
let demoRunning = false;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function scrollDemoToBottom() {
  if (!demoChatWindow) return;
  demoChatWindow.scrollTop = demoChatWindow.scrollHeight;
}

function createMessage(text, className) {
  const message = document.createElement("div");
  message.className = `app-message ${className} demo-new`;
  message.textContent = text;
  return message;
}

function createTypingIndicator() {
  const typing = document.createElement("div");
  typing.className = "app-message demo-typing demo-new";
  typing.innerHTML = "<span></span><span></span><span></span>";
  return typing;
}

function resetDemo() {
  if (!demoChatWindow) return;

  demoChatWindow.innerHTML = `
    <div class="app-message app-message-bot demo-welcome">
      Hi! I’m Little Dino 🦕
      <br />
      Ask me about animals, space, bedtime stories, or fun learning videos!
    </div>
  `;

  if (demoRecommendationRow) {
    demoRecommendationRow.classList.remove("active");
  }

  if (demoInputText) {
    demoInputText.textContent = "Ask Little Dino for a story...";
  }
}

async function typeIntoInput(text) {
  if (!demoInputText) return;

  demoInputText.innerHTML = `<span class="demo-cursor">|</span>`;

  for (let i = 1; i <= text.length; i += 1) {
    demoInputText.innerHTML = `${text.slice(0, i)}<span class="demo-cursor">|</span>`;
    await wait(85);
  }

  await wait(250);
  demoInputText.textContent = text;
}

function updateRecommendationCards(scenario) {
  if (!demoBookTitle || !demoBookDesc || !demoVideoTitle || !demoVideoDesc || !demoBookImage || !demoVideoImage) {
    return;
  }

  demoBookTitle.textContent = scenario.bookTitle;
  demoBookDesc.textContent = scenario.bookDesc;
  demoVideoTitle.textContent = scenario.videoTitle;
  demoVideoDesc.textContent = scenario.videoDesc;
  demoBookImage.src = scenario.bookImage;
  demoVideoImage.src = scenario.videoImage;

  if (demoRecommendationRow) {
    demoRecommendationRow.classList.add("active");
  }
}

async function showBotMessage(text) {
  if (!demoChatWindow) return;

  const typing = createTypingIndicator();
  demoChatWindow.appendChild(typing);
  scrollDemoToBottom();

  await wait(1000);

  typing.remove();
  demoChatWindow.appendChild(createMessage(text, "app-message-bot"));
  scrollDemoToBottom();
}

async function playScenario(scenario) {
  if (!demoChatWindow) return;

  resetDemo();
  await wait(900);

  await typeIntoInput(scenario.user);
  await wait(250);

  if (demoSendBtn) {
    demoSendBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
      demoSendBtn.style.transform = "";
    }, 180);
  }

  demoChatWindow.appendChild(createMessage(scenario.user, "app-message-user"));
  scrollDemoToBottom();

  await wait(650);

  for (const msg of scenario.botMessages) {
    await showBotMessage(msg);
    await wait(500);
  }

  updateRecommendationCards(scenario);
  scrollDemoToBottom();

  await wait(3400);
}

async function startDemoLoop() {
  if (demoRunning || !demoChatWindow) return;
  demoRunning = true;

  while (true) {
    const scenario = demoScenarios[demoIndex];
    await playScenario(scenario);
    demoIndex = (demoIndex + 1) % demoScenarios.length;
  }
}

if ("IntersectionObserver" in window && demoChatWindow) {
  const demoObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !demoRunning) {
          startDemoLoop();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  demoObserver.observe(demoChatWindow);
} else if (demoChatWindow) {
  startDemoLoop();
}
