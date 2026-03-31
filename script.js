// =============================
// NAVIGATION MENU (YOUR ORIGINAL - IMPROVED)
// =============================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navLinks.classList.remove("show");
    }
  });
}

// =============================
// SMOOTH SCROLL (BETTER UX)
// =============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
// ANALYTICS COUNTER (NEW)
// =============================
const counters = document.querySelectorAll(".count-up");

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute("data-target"));
  let current = 0;

  const increment = Math.ceil(target / 60); // speed control

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

// Trigger animation when visible
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Apply observer
counters.forEach(counter => {
  observer.observe(counter);
});

// =============================
// OPTIONAL: SIMPLE BUTTON CLICK FEEDBACK
// =============================
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    button.style.transform = "scale(0.96)";
    setTimeout(() => {
      button.style.transform = "";
    }, 150);
  });
});
