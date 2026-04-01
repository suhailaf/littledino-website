// =============================
// MOBILE NAVIGATION
// =============================
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

// =============================
// SMOOTH SCROLL
// =============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {
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

// =============================
// ANALYTICS COUNTER
// =============================
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

// =============================
// BUTTON CLICK FEEDBACK
// =============================
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.97)";
    setTimeout(() => {
      button.style.transform = "";
    }, 160);
  });
});

// =============================
// SPARKLE BACKGROUND
// =============================
const sparklesContainer = document.getElementById("sparkles");

if (sparklesContainer) {
  const sparkleCount = 22;

  for (let i = 0; i < sparkleCount; i++) {
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

// =============================
// REVEAL ON SCROLL
// =============================
const revealItems = document.querySelectorAll(
  ".feature-card, .step-card, .about-panel, .safety-card, .plan-card, .testimonial-card, .analytics-card, .contact-card, .phone-card"
);

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
