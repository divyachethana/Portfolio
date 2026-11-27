// ============================================
// TYPING ANIMATION — Hero & Code Editor
// ============================================
const heroRoles = ["AI Engineer", "ML Engineer", "Problem Solver 🚀"];
const codeRoles = ["AI Engineer", "Flutter Dev", "Data Scientist"];

let roleIdx = 0,
  charIdx = 0,
  isDeleting = false;
const typedEl = document.getElementById("typed-text");

function typeHero() {
  const current = heroRoles[roleIdx % heroRoles.length];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }
  let speed = isDeleting ? 55 : 95;
  if (!isDeleting && charIdx === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx++;
    speed = 350;
  }
  setTimeout(typeHero, speed);
}

let cRoleIdx = 0,
  cCharIdx = 0,
  cIsDeleting = false;
const codeTypedEl = document.getElementById("code-typed");

function typeCodeEditor() {
  const current = codeRoles[cRoleIdx % codeRoles.length];
  if (cIsDeleting) {
    codeTypedEl.textContent = current.substring(0, cCharIdx - 1);
    cCharIdx--;
  } else {
    codeTypedEl.textContent = current.substring(0, cCharIdx + 1);
    cCharIdx++;
  }
  let speed = cIsDeleting ? 45 : 75;
  if (!cIsDeleting && cCharIdx === current.length) {
    speed = 2400;
    cIsDeleting = true;
  } else if (cIsDeleting && cCharIdx === 0) {
    cIsDeleting = false;
    cRoleIdx++;
    speed = 420;
  }
  setTimeout(typeCodeEditor, speed);
}

window.addEventListener("load", () => {
  setTimeout(typeHero, 600);
  setTimeout(typeCodeEditor, 950);
});

// ============================================
// NAVBAR — Scroll + Hamburger + Active Link
// ============================================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  highlightActiveSection();
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

function highlightActiveSection() {
  const scrollPos = window.scrollY + 120;
  document.querySelectorAll("section[id]").forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle(
        "active",
        scrollPos >= top && scrollPos < top + height,
      );
    }
  });
}

// ============================================
// SCROLL REVEAL — Intersection Observer
// ============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
);

document
  .querySelectorAll(".fade-up, .fade-in-left, .fade-in-right")
  .forEach((el) => {
    revealObserver.observe(el);
  });

// Stagger animation delays for grid children
document.querySelectorAll(".skills-grid .skill-category").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll(".projects-grid .project-card").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});

// ============================================
// EMOJI INTERACTION — Click to cycle states
// ============================================
const emojiFace = document.getElementById("emoji-face");
const emojiText = document.getElementById("emoji-text");

const emojiStates = [
  { emoji: "👩‍💻", text: "Let's build something amazing together!" },
  { emoji: "🤝", text: "I'd love to collaborate with you!" },
  { emoji: "🚀", text: "Ready to launch the next big thing!" },
  { emoji: "💡", text: "Always exploring new ideas..." },
  { emoji: "✨", text: "Turning ideas into reality!" },
  { emoji: "🤖", text: "Powered by AI & curiosity!" },
  { emoji: "🎯", text: "Focused. Determined. Building." },
];

let emojiIdx = 0;

if (emojiFace) {
  emojiFace.addEventListener("click", () => {
    emojiIdx = (emojiIdx + 1) % emojiStates.length;
    const state = emojiStates[emojiIdx];

    // Pop animation
    emojiFace.style.transform = "scale(1.4) rotate(12deg)";
    emojiFace.style.filter = "drop-shadow(0 0 16px rgba(124,58,237,0.7))";

    setTimeout(() => {
      emojiFace.textContent = state.emoji;
      emojiText.textContent = state.text;
      emojiFace.style.transform = "";
      emojiFace.style.filter = "";
    }, 180);
  });

  // Hover wiggle
  emojiFace.addEventListener("mouseenter", () => {
    emojiFace.style.animationName = "none";
    emojiFace.style.transform = "scale(1.15) rotate(-8deg)";
  });
  emojiFace.addEventListener("mouseleave", () => {
    emojiFace.style.transform = "";
    emojiFace.style.animationName = "";
  });
}

// ============================================
// CONTACT FORM — Simulated send
// ============================================
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submit-btn");
  const origHTML = btn.innerHTML;

  btn.innerHTML = "<span>Sending...</span><span>⏳</span>";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = "<span>Message Sent! 🎉</span>";
    btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
    btn.style.boxShadow = "0 0 32px rgba(16,185,129,0.4)";

    document.getElementById("contact-form").reset();

    setTimeout(() => {
      btn.innerHTML = origHTML;
      btn.style.background = "";
      btn.style.boxShadow = "";
      btn.disabled = false;
    }, 3200);
  }, 1600);
}

// ============================================
// PROJECT CARD — Subtle 3D Tilt on hover
// ============================================
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    this.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// ============================================
// SKILL ITEM — Glow ripple on hover
// ============================================
document.querySelectorAll(".skill-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 0 24px rgba(124,58,237,0.22)";
  });
  item.addEventListener("mouseleave", function () {
    this.style.boxShadow = "";
  });
});

// ============================================
// FLOATING BADGES — Parallax offset on scroll
// ============================================
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const badges = document.querySelectorAll(".floating-badge");
  badges.forEach((badge, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const offset = (scrollY * 0.06 * dir).toFixed(2);
    badge.style.transform = `translateY(${offset}px)`;
  });
});

// ============================================
// CODE EDITOR — 3D Hover Effect (Aceternity UI Clone)
// ============================================
const codeEditorContainer = document.querySelector(".code-editor-container");
const codeEditor = document.querySelector(".code-editor");
const editorHeader = document.querySelector(".editor-header");
const editorBody = document.querySelector(".editor-body");

if (codeEditorContainer && codeEditor) {
  let isMouseEntered = false;

  codeEditorContainer.addEventListener("mousemove", (e) => {
    const rect = codeEditorContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;

    codeEditor.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });

  codeEditorContainer.addEventListener("mouseenter", () => {
    isMouseEntered = true;
    codeEditor.style.transition = "transform 0.1s ease-out";

    if (editorHeader) {
      editorHeader.style.transform = "translateZ(30px)";
    }
    if (editorBody) {
      editorBody.style.transform = "translateZ(50px)";
    }
  });

  codeEditorContainer.addEventListener("mouseleave", () => {
    isMouseEntered = false;
    codeEditor.style.transition = "all 0.5s ease-out";
    codeEditor.style.transform = `rotateY(0deg) rotateX(0deg)`;

    if (editorHeader) {
      editorHeader.style.transform = "translateZ(0px)";
    }
    if (editorBody) {
      editorBody.style.transform = "translateZ(0px)";
    }
  });
}
