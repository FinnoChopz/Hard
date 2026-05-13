const slides = [...document.querySelectorAll(".slide")];
const counter = document.querySelector("[data-slide-count]");
let active = 0;

function showSlide(index) {
  active = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
  counter.textContent = `${active + 1} / ${slides.length}`;
}

document.querySelector("[data-prev]").addEventListener("click", () => showSlide(active - 1));
document.querySelector("[data-next]").addEventListener("click", () => showSlide(active + 1));
document.querySelector("[data-print]").addEventListener("click", () => window.print());

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showSlide(active + 1);
  if (event.key === "ArrowLeft") showSlide(active - 1);
});

const progress = document.querySelector(".progress");
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.width = `${Math.max(0, Math.min(1, pct)) * 100}%`;
}
updateProgress();
window.addEventListener("scroll", updateProgress, { passive: true });

const tension = document.querySelector('[data-tension]');
const tensionReadout = document.querySelector('[data-tension-readout]');
const tensionStates = [
  { max: 34, title: 'Scaffold the student.', body: 'Give hints, critique, counterarguments, visuals, and practice while the student remains the thinker.' },
  { max: 67, title: 'The dangerous middle.', body: 'The tool is useful, but the design must keep ownership visible: who asked, who revised, who defended, who learned?' },
  { max: 101, title: 'The student disappears.', body: 'When AI writes, solves, summarizes, and decides too quickly, fluency replaces formation and school rewards absence.' }
];
function updateTension() {
  if (!tension || !tensionReadout) return;
  const value = Number(tension.value);
  const state = tensionStates.find((item) => value < item.max) || tensionStates[0];
  tensionReadout.innerHTML = "<strong>" + state.title + "</strong><p>" + state.body + "</p>";
}
if (tension) {
  tension.addEventListener('input', updateTension);
  updateTension();
}

const mapContent = {
  resource: ['New Scarcity', 'When answers become abundant, judgment becomes the scarce resource.', 'AI can shorten the distance between confusion and help. That makes the deeper work harder to avoid: deciding what is worth learning, what must remain human, and what kind of help forms the mind.', '#the-new-scarcity'],
  struggle: ['Help or Substitution', 'The tool must support the learner without performing the learner away.', 'The educational line is not AI versus no AI. It is whether the system removes wasteful friction while preserving the struggle that builds capacity.', '#the-line-between-help-and-substitution'],
  literacy: ['Self-Government', 'Prompting is too small a skill.', 'AI literacy is metacognition under pressure: ask for the right help, challenge fluent answers, verify claims, and know when to close the screen.', '#ai-literacy-as-self-government'],
  governance: ['Public Guardrails', 'Democratization has to be built.', 'Privacy, pluralism, audits, teacher authority, and public rules determine whether AI expands opportunity or sells advantage.', '#democracy-capture-and-the-public-tool'],
  giftedness: ['Giftedness After Output', 'Polish gets cheaper. Depth matters more.', 'Talent shows up in questions, creative defiance, practical judgment, wisdom about consequences, and standards strong enough to survive convenience.', '#giftedness-after-the-answer-machine'],
  frontier: ['Scaffold to the Frontier', 'The portfolio is the live signal.', 'Higher education should bring students to real problems, let AI scaffold the path, and judge the contribution that survives.', '#scaffold-to-the-frontier']
};
const mapNodes = [...document.querySelectorAll('[data-map]')];
const mapKicker = document.querySelector('[data-map-kicker]');
const mapTitle = document.querySelector('[data-map-title]');
const mapBody = document.querySelector('[data-map-body]');
const mapLink = document.querySelector('[data-map-link]');
mapNodes.forEach((node) => {
  node.addEventListener('click', () => {
    const content = mapContent[node.dataset.map];
    if (!content || !mapKicker || !mapTitle || !mapBody || !mapLink) return;
    mapNodes.forEach((item) => item.classList.toggle('is-active', item === node));
    mapKicker.textContent = content[0];
    mapTitle.textContent = content[1];
    mapBody.textContent = content[2];
    mapLink.href = content[3];
  });
});

const objectionContent = {
  dependence: [
    'Hard objection',
    'Will AI make students mentally weaker?',
    'It can, if schools reward completion without understanding. The answer is not prohibition. It is design: attempts before answers, hints before solutions, oral defense, unaided writing, and AI use that leaves authorship visible.'
  ],
  capture: [
    'Democratic objection',
    'Who gets to shape the machine that shapes the child?',
    'No single vendor or national narrator should become the hidden curriculum. Public guardrails, plural tools, teacher authority, audits, and local contestability keep education from becoming ideological infrastructure.'
  ],
  optimization: [
    'Philosophical objection',
    'What if the deeper danger is making efficiency sacred?',
    'That worry is real. The answer is to judge AI by human formation, not smoothness: some silence, difficulty, face-to-face argument, slow reading, and unaided thought must remain protected.'
  ],
  zombification: [
    'Hard objection',
    'Will students just turn their lives over to AI?',
    'This is Owen Yingling\'s worry, made through Scott Alexander\'s image of the Whispering Earring. The answer is not to refuse the tool. It is to give students a real problem at the edge of a real field, where AI can scaffold but not solve.'
  ]
};
const objectionTabs = [...document.querySelectorAll('[data-objection]')];
const objectionKicker = document.querySelector('[data-objection-kicker]');
const objectionTitle = document.querySelector('[data-objection-title]');
const objectionBody = document.querySelector('[data-objection-body]');
objectionTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const content = objectionContent[tab.dataset.objection];
    if (!content || !objectionKicker || !objectionTitle || !objectionBody) return;
    objectionTabs.forEach((item) => item.classList.toggle('is-active', item === tab));
    objectionKicker.textContent = content[0];
    objectionTitle.textContent = content[1];
    objectionBody.textContent = content[2];
  });
});


const essayTabs = [...document.querySelectorAll('[data-essay-tab]')];
const essayPanels = [...document.querySelectorAll('[data-essay-panel]')];

function activateEssayTab(tabName, shouldScroll = false) {
  if (!essayTabs.length || !essayPanels.length) return;
  essayTabs.forEach((tab) => {
    const active = tab.dataset.essayTab === tabName;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  essayPanels.forEach((panel) => {
    const active = panel.dataset.essayPanel === tabName;
    panel.classList.toggle('is-active', active);
    panel.hidden = !active;
  });
  if (shouldScroll) {
    document.getElementById('essay')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function tabForHash() {
  const id = window.location.hash.replace('#', '');
  if (!id) return null;
  const target = document.getElementById(id);
  if (!target) return null;
  const panel = target.closest('[data-essay-panel]');
  return panel?.dataset.essayPanel || null;
}

essayTabs.forEach((tab) => {
  tab.addEventListener('click', () => activateEssayTab(tab.dataset.essayTab, false));
});

document.querySelectorAll('[data-tab-target]').forEach((link) => {
  link.addEventListener('click', () => activateEssayTab(link.dataset.tabTarget, false));
});

function syncEssayTabToHash() {
  const id = window.location.hash.replace('#', '');
  const tab = tabForHash();
  if (tab) {
    activateEssayTab(tab, false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

window.addEventListener('hashchange', syncEssayTabToHash);
syncEssayTabToHash();
