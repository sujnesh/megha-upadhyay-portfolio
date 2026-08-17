document.documentElement.classList.add("js");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Scroll progress
const updateScrollProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  document.documentElement.style.setProperty("--scroll", `${progress}%`);
};
updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

// Reveal on scroll
const revealEls = [...document.querySelectorAll("[data-reveal]")];
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 38, 260)}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Cinematic cursor
const cursorDot = document.querySelector(".cursor--dot");
const cursorRing = document.querySelector(".cursor--ring");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

if (finePointer && cursorDot && cursorRing && !prefersReducedMotion) {
  window.addEventListener("pointermove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  document.querySelectorAll("a, button, .work-card").forEach((el) => {
    el.addEventListener("pointerenter", () => cursorRing.classList.add("is-active"));
    el.addEventListener("pointerleave", () => cursorRing.classList.remove("is-active"));
  });
}

// Magnetic buttons / links
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.16}px, ${y * 0.2}px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  });
}

// Work-card keyboard affordance
const videoTriggers = [...document.querySelectorAll("[data-video]")];
videoTriggers.forEach((trigger) => {
  if (!trigger.matches("button")) {
    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", `Play ${trigger.dataset.title || "selected video"}`);
  }
});

// Video modal
const modal = document.querySelector(".video-modal");
const frame = document.querySelector("#video-frame");
const modalTitle = document.querySelector("#video-title");
const closeButton = document.querySelector(".video-modal__close");
let lastActiveElement = null;

const openVideo = (videoId, title = "Selected video") => {
  if (!modal || !frame || !videoId) return;
  lastActiveElement = document.activeElement;
  modalTitle.textContent = title;
  frame.innerHTML = `
    <iframe
      src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1"
      title="${title.replace(/"/g, "&quot;")}"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  `;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton?.focus();
};

const closeVideo = () => {
  if (!modal || !frame) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  frame.innerHTML = "";
  document.body.style.overflow = "";
  if (lastActiveElement && typeof lastActiveElement.focus === "function") {
    lastActiveElement.focus();
  }
};

videoTriggers.forEach((trigger) => {
  const launch = () => openVideo(trigger.dataset.video, trigger.dataset.title);
  trigger.addEventListener("click", launch);
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      launch();
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeVideo));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) closeVideo();
});

// Gentle 3D tilt on selected work cards
if (finePointer && !prefersReducedMotion) {
  document.querySelectorAll(".work-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}
