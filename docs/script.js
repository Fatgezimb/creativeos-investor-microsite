const slides = Array.from(document.querySelectorAll(".slide"));
const indexRoot = document.querySelector("#slideIndex");
const progressBar = document.querySelector("#progressBar");
const progressLabel = document.querySelector("#progressLabel");
const prevButton = document.querySelector("#prevSlide");
const nextButton = document.querySelector("#nextSlide");
const stageTabs = Array.from(document.querySelectorAll(".stage-tab"));
const sideItems = Array.from(document.querySelectorAll(".side-item"));

let activeIndex = 0;

const demoStages = {
  sell: {
    eyebrow: "Pipeline command center",
    title: "Sell new creative work",
    status: "Lead captured 4m ago",
    primaryLabel: "Qualified pipeline",
    primary: "$84.2k",
    primaryNote: "12 open creative opportunities",
    workTitle: "Proposal room",
    workNote: "Scope and estimate ready",
    milestoneTitle: "3 client actions",
    milestones: ["Approve estimate", "Pick shoot date", "Pay deposit"],
    secondaryLabel: "Deposits ready",
    secondary: "$18.4k",
    secondaryNote: "4 invoices can be triggered",
    activity: [
      ["Acme Studio", "Viewed proposal"],
      ["Northline", "Requested date change"],
      ["Pulse Co.", "Approved deposit terms"],
    ],
    chartValue: "$18,240",
    chartPath: "M4 74 L42 66 L80 58 L118 48 L156 36 L198 26 L232 14",
    chartFill: "M4 74 L42 66 L80 58 L118 48 L156 36 L198 26 L232 14 L232 88 L4 88 Z",
    dot: [232, 14],
    bars: ["78%", "58%", "42%"],
  },
  schedule: {
    eyebrow: "Booking and capacity",
    title: "Schedule the right client slot",
    status: "Calendar hold sent",
    primaryLabel: "Booked capacity",
    primary: "71%",
    primaryNote: "Next 30 days planned",
    workTitle: "Shoot calendar",
    workNote: "Crew and studio aligned",
    milestoneTitle: "4 schedule steps",
    milestones: ["Confirm crew", "Lock location", "Send reminder", "Collect balance"],
    secondaryLabel: "Open windows",
    secondary: "6",
    secondaryNote: "Slots available this month",
    activity: [
      ["Apex Labs", "Moved review to Friday"],
      ["Summit LLC", "Confirmed studio slot"],
      ["Acme Studio", "Reminder scheduled"],
    ],
    chartValue: "92%",
    chartPath: "M4 68 L44 52 L84 55 L124 38 L164 32 L204 22 L232 24",
    chartFill: "M4 68 L44 52 L84 55 L124 38 L164 32 L204 22 L232 24 L232 88 L4 88 Z",
    dot: [232, 24],
    bars: ["72%", "64%", "51%"],
  },
  produce: {
    eyebrow: "Production workspace",
    title: "Produce with fewer handoff gaps",
    status: "Task automation running",
    primaryLabel: "Active productions",
    primary: "4",
    primaryNote: "Across video, photo, and podcast work",
    workTitle: "Campaign workspace",
    workNote: "Tasks, files, and notes",
    milestoneTitle: "5 production tasks",
    milestones: ["Upload selects", "Assign editor", "Prepare rough cut", "QA exports", "Notify client"],
    secondaryLabel: "Admin hours saved",
    secondary: "12.5",
    secondaryNote: "Illustrative weekly estimate",
    activity: [
      ["Taylor", "Uploaded selects"],
      ["Jordan", "Assigned editor"],
      ["Maya", "Tagged final files"],
    ],
    chartValue: "86%",
    chartPath: "M4 76 L42 69 L80 64 L118 50 L156 46 L198 30 L232 22",
    chartFill: "M4 76 L42 69 L80 64 L118 50 L156 46 L198 30 L232 22 L232 88 L4 88 Z",
    dot: [232, 22],
    bars: ["86%", "69%", "44%"],
  },
  review: {
    eyebrow: "Review and approvals",
    title: "Turn feedback into approved delivery",
    status: "Client comment resolved",
    primaryLabel: "Approval velocity",
    primary: "2.1d",
    primaryNote: "Illustrative review cycle",
    workTitle: "Media review v3",
    workNote: "Timestamped approvals",
    milestoneTitle: "3 review moments",
    milestones: ["Resolve comment", "Request approval", "Trigger invoice"],
    secondaryLabel: "Open comments",
    secondary: "7",
    secondaryNote: "Down from 18 yesterday",
    activity: [
      ["Acme Studio", "Approved v3"],
      ["Taylor", "Resolved highlight note"],
      ["Pulse Co.", "Requested contrast change"],
    ],
    chartValue: "64%",
    chartPath: "M4 70 L42 73 L80 60 L118 64 L156 44 L198 38 L232 26",
    chartFill: "M4 70 L42 73 L80 60 L118 64 L156 44 L198 38 L232 26 L232 88 L4 88 Z",
    dot: [232, 26],
    bars: ["64%", "49%", "36%"],
  },
  deliver: {
    eyebrow: "Billing and handoff",
    title: "Deliver the work and keep the next job warm",
    status: "Final portal opened",
    primaryLabel: "Ready to invoice",
    primary: "$24.8k",
    primaryNote: "Outstanding delivery-linked billing",
    workTitle: "Client portal",
    workNote: "Files, invoice, next step",
    milestoneTitle: "4 delivery actions",
    milestones: ["Send final files", "Invoice balance", "Archive project", "Start upsell"],
    secondaryLabel: "Repeat signals",
    secondary: "9",
    secondaryNote: "Clients with follow-up opportunities",
    activity: [
      ["Apex Labs", "Downloaded final files"],
      ["Summit LLC", "Paid remaining balance"],
      ["Acme Studio", "Requested retainer quote"],
    ],
    chartValue: "$24,850",
    chartPath: "M4 78 L42 70 L80 62 L118 54 L156 46 L198 28 L232 18",
    chartFill: "M4 78 L42 70 L80 62 L118 54 L156 46 L198 28 L232 18 L232 88 L4 88 Z",
    dot: [232, 18],
    bars: ["88%", "74%", "57%"],
  },
};

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

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function renderList(selector, rows, renderer) {
  const node = document.querySelector(selector);
  if (!node) return;
  node.innerHTML = rows.map(renderer).join("");
}

function setDemoStage(stageName) {
  const stage = demoStages[stageName] || demoStages.sell;

  stageTabs.forEach((tab) => {
    const isActive = tab.dataset.stage === stageName;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  setText("#demoEyebrow", stage.eyebrow);
  setText("#demoTitle", stage.title);
  setText("#demoStatus", stage.status);
  setText("#primaryKpiLabel", stage.primaryLabel);
  setText("#primaryKpi", stage.primary);
  setText("#primaryKpiNote", stage.primaryNote);
  setText("#workCardTitle", stage.workTitle);
  setText("#workCardNote", stage.workNote);
  setText("#milestoneTitle", stage.milestoneTitle);
  setText("#secondaryKpiLabel", stage.secondaryLabel);
  setText("#secondaryKpi", stage.secondary);
  setText("#secondaryKpiNote", stage.secondaryNote);
  setText("#chartValue", stage.chartValue);

  renderList("#milestoneList", stage.milestones, (item) => `<li>${item}</li>`);
  renderList(
    "#activityList",
    stage.activity,
    ([name, action]) => `<li><b>${name}</b><span>${action}</span></li>`
  );

  document.querySelectorAll(".mini-bars i").forEach((bar, index) => {
    bar.style.setProperty("--value", stage.bars[index] || "40%");
  });

  const chartPath = document.querySelector("#chartPath");
  const chartFill = document.querySelector("#chartFill");
  const chartDot = document.querySelector("#chartDot");
  if (chartPath && chartFill && chartDot) {
    chartPath.setAttribute("d", stage.chartPath);
    chartFill.setAttribute("d", stage.chartFill);
    chartDot.setAttribute("cx", stage.dot[0]);
    chartDot.setAttribute("cy", stage.dot[1]);
    chartPath.style.animation = "none";
    chartDot.style.animation = "none";
    chartPath.getBoundingClientRect();
    chartPath.style.animation = "";
    chartDot.style.animation = "";
  }
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
setDemoStage("sell");

stageTabs.forEach((tab) => {
  tab.addEventListener("click", () => setDemoStage(tab.dataset.stage));
});

sideItems.forEach((item) => {
  item.addEventListener("click", () => {
    sideItems.forEach((sideItem) => sideItem.classList.remove("active"));
    item.classList.add("active");
  });
});

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
