const slides = Array.from(document.querySelectorAll(".slide"));
const indexRoot = document.querySelector("#slideIndex");
const progressBar = document.querySelector("#progressBar");
const progressLabel = document.querySelector("#progressLabel");
const prevButton = document.querySelector("#prevSlide");
const nextButton = document.querySelector("#nextSlide");

let activeIndex = 0;

function pad(value) {
  return String(value).padStart(2, "0");
}

function buildIndex() {
  slides.forEach((slide, index) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = `#${slide.id}`;
    link.innerHTML = `<span>${pad(index + 1)}</span><span>${slide.dataset.title}</span>`;
    item.appendChild(link);
    indexRoot.appendChild(item);
  });
}

function updateUi(index) {
  activeIndex = Math.max(0, Math.min(index, slides.length - 1));
  const pct = ((activeIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${pct}%`;
  progressLabel.textContent = `${pad(activeIndex + 1)} / ${pad(slides.length)}`;

  document.querySelectorAll(".slide-index a").forEach((link, linkIndex) => {
    link.classList.toggle("active", linkIndex === activeIndex);
  });
}

function goTo(index) {
  const target = slides[Math.max(0, Math.min(index, slides.length - 1))];
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function currentVisibleIndex() {
  const viewportAnchor = window.scrollY + window.innerHeight * 0.38;
  let index = 0;

  slides.forEach((slide, slideIndex) => {
    if (slide.offsetTop <= viewportAnchor) {
      index = slideIndex;
    }
  });

  return index;
}

buildIndex();
updateUi(0);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      updateUi(slides.indexOf(visible.target));
    }
  },
  { threshold: [0.35, 0.55, 0.75] }
);

slides.forEach((slide) => observer.observe(slide));

window.addEventListener(
  "scroll",
  () => {
    window.requestAnimationFrame(() => updateUi(currentVisibleIndex()));
  },
  { passive: true }
);

prevButton.addEventListener("click", () => goTo(activeIndex - 1));
nextButton.addEventListener("click", () => goTo(activeIndex + 1));

window.addEventListener("keydown", (event) => {
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

  if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    goTo(activeIndex + 1);
  }

  if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    goTo(activeIndex - 1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    goTo(0);
  }

  if (event.key === "End") {
    event.preventDefault();
    goTo(slides.length - 1);
  }
});
