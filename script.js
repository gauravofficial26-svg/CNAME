const nav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const cursorGlow = document.querySelector(".cursor-glow");
const modal = document.querySelector(".video-modal");
const modalFrame = modal.querySelector("iframe");
const closeModal = document.querySelector(".modal-close");

const aiPanels = {
  avatars: {
    title: "Brand Avatars",
    copy: "A custom AI presenter for your brand, ready to deliver any message, anytime, without booking a spokesperson or a studio.",
  },
  products: {
    title: "No-Shoot Product Videos",
    copy: "Professional product videos and demos generated from images and specs, with no camera, studio, or shoot day required.",
  },
  voice: {
    title: "Voice-to-Brand Content",
    copy: "Turn a script, or even just your voice, into polished video content without being on camera yourself.",
  },
  reels: {
    title: "Rapid Social Reels",
    copy: "Multiple platform-ready reels and cutdowns generated and turned around fast for campaigns that need volume.",
  },
  motion: {
    title: "AI-Assisted Motion & Animation",
    copy: "Faster explainers and motion graphics built with AI-accelerated workflows and hands-on creative direction.",
  },
};

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("pointermove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const counter = document.querySelector("[data-count]");
let counterStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting || counterStarted) return;
  counterStarted = true;
  const target = Number(counter.dataset.count);
  let value = 0;
  const timer = setInterval(() => {
    value += 1;
    counter.textContent = `${value}+`;
    if (value >= target) clearInterval(timer);
  }, 70);
});
counterObserver.observe(counter);

document.querySelectorAll(".ai-card").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".ai-card").forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    const panel = aiPanels[card.dataset.panel];
    document.querySelector("#ai-title").textContent = panel.title;
    document.querySelector("#ai-copy").textContent = panel.copy;
  });
});

document.querySelectorAll(".filter").forEach((filter) => {
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const selected = filter.dataset.filter;
    document.querySelectorAll(".work-card").forEach((card) => {
      const types = card.dataset.type.split(" ");
      card.hidden = selected !== "all" && !types.includes(selected);
    });
  });
});

document.querySelectorAll(".video-card").forEach((card) => {
  card.addEventListener("click", () => {
    const separator = card.dataset.video.includes("?") ? "&" : "?";
    modalFrame.src = `${card.dataset.video}${separator}autoplay=1`;
    modal.showModal();
  });
});

function stopVideo() {
  modalFrame.src = "";
  modal.close();
}

closeModal.addEventListener("click", stopVideo);
modal.addEventListener("click", (event) => {
  if (event.target === modal) stopVideo();
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => navObserver.observe(section));
