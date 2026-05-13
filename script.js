const slides = [...document.querySelectorAll(".slide")];
const counter = document.querySelector("[data-slide-count]");
let active = 0;

function showSlide(index) {
  if (!slides.length || !counter) return;
  active = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
  counter.textContent = `${active + 1} / ${slides.length}`;
}

document.querySelector("[data-prev]")?.addEventListener("click", () => showSlide(active - 1));
document.querySelector("[data-next]")?.addEventListener("click", () => showSlide(active + 1));
document.querySelector("[data-print]")?.addEventListener("click", () => window.print());

document.addEventListener("keydown", (event) => {
  if (!slides.length) return;
  if (event.key === "ArrowRight") showSlide(active + 1);
  if (event.key === "ArrowLeft") showSlide(active - 1);
});

const progress = document.querySelector(".progress");
function updateProgress() {
  if (!progress) return;
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

const lessonSteps = [
  {
    kicker: 'Watch',
    title: 'Start with a short human explainer.',
    body: 'Watch this NOVA/PBS clip for the big mystery. You do not need equations. Listen for one phrase: shared state.',
    type: 'video',
    button: 'I watched it. Start the lab.',
    activity: `
      <div class="video-shell">
        <iframe src="https://www.youtube.com/embed/rNBT3B73jqg?rel=0" title="The Most Baffling Idea in Physics, Explained | NOVA | PBS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      <div class="lesson-note">Video source: NOVA PBS Official, "The Most Baffling Idea in Physics, Explained." The lab below rebuilds the concept from scratch.</div>
    `,
    success: 'Good. Now we will build the idea slowly, starting with an everyday case that is not yet quantum.'
  },
  {
    kicker: 'Checkpoint 1',
    title: 'Start with ordinary correlation.',
    body: 'Imagine two sealed boxes. One contains a red token and one contains a blue token. They are shuffled and carried far apart. Open the demo, then answer: what does opening Box A tell you?',
    type: 'choice',
    button: 'Check correlation',
    activity: `
      <div class="quantum-demo pair-demo" data-pair-demo>
        <div class="particle-card" data-box-a>Box A<br><strong>?</strong></div>
        <div class="pair-link" aria-hidden="true"></div>
        <div class="particle-card" data-box-b>Box B<br><strong>?</strong></div>
        <button type="button" data-reveal-pair>Open Box A</button>
      </div>
      <div class="lesson-note">This is ordinary correlation: the tokens already had definite colors before you looked.</div>
    `,
    options: [
      ['a', 'It tells me the other box must contain the opposite color, because the tokens were prepared as a pair.'],
      ['b', 'It changes the color of the other token by sending a physical signal.'],
      ['c', 'It proves the boxes are quantum entangled.'],
      ['d', 'It tells me nothing at all about the other box.']
    ],
    correct: 'a',
    hint: 'The boxes were prepared together. Opening one can reveal information about the other without doing anything quantum yet.',
    success: 'Right. Ordinary paired objects can be correlated. Entanglement is stranger because quantum particles are not best described as having a simple pre-written answer for every possible measurement.'
  },
  {
    kicker: 'Checkpoint 2',
    title: 'Meet a quantum coin.',
    body: 'A quantum measurement is not like quietly peeking at a normal coin. Before measurement, the setup gives probabilities. When you measure, you get one definite result.',
    type: 'choice',
    button: 'Check superposition',
    activity: `
      <div class="quantum-demo single-demo" data-single-demo>
        <div class="quantum-coin" data-single-coin>?</div>
        <div class="wave-label" data-single-label>Before measuring: possible heads and possible tails</div>
        <button type="button" data-measure-single>Measure</button>
        <button type="button" data-reset-single>Reset</button>
      </div>
      <div class="lesson-note">Beginner translation: superposition means the quantum state carries multiple possible outcomes until the measurement gives one result.</div>
    `,
    options: [
      ['a', 'It means the particle is secretly one definite thing, and we merely do not know which.'],
      ['b', 'It means the state describes possible outcomes, and measurement produces one definite outcome.'],
      ['c', 'It means the particle is literally a large everyday coin spinning in space.'],
      ['d', 'It means measurement has no effect on what we can say about the particle.']
    ],
    correct: 'b',
    hint: 'Do not picture a normal hidden coin. Picture a rule for probabilities that becomes one result when measured.',
    success: 'Correct. A quantum state is not just ordinary ignorance. It tells us the possible measurement outcomes and their probabilities.'
  },
  {
    kicker: 'Checkpoint 3',
    title: 'Now entangle two quantum coins.',
    body: 'In this simplified demo, neither side has a definite result before measurement. But once you measure one side, the other side is perfectly linked to it.',
    type: 'choice',
    button: 'Check entanglement',
    activity: `
      <div class="quantum-demo entangle-demo" data-entangle-demo>
        <div class="particle-card quantum" data-left-particle>A<br><strong>?</strong></div>
        <div class="entangle-beam" aria-hidden="true"></div>
        <div class="particle-card quantum" data-right-particle>B<br><strong>?</strong></div>
        <button type="button" data-measure-entangled>Measure A</button>
        <button type="button" data-reset-entangled>Prepare new pair</button>
      </div>
      <div class="lesson-note">The key beginner idea: the pair behaves like one shared quantum state, even when the particles are separated.</div>
    `,
    options: [
      ['a', 'Before measurement, each particle is best treated as holding a complete hidden instruction card for every possible question.'],
      ['b', 'The two particles are described together; measuring one gives a random result, while the partner result is linked to it.'],
      ['c', 'Particle A sends a text message to Particle B telling it what answer to display.'],
      ['d', 'Entanglement only works if the two particles are touching.']
    ],
    correct: 'b',
    hint: 'Hold both ideas at once: the local result is random, but the pair results are strongly connected.',
    success: 'Exactly. Entanglement means the pair has a shared state: each individual result is uncertain, but the relationship between results is not random.'
  },
  {
    kicker: 'Checkpoint 4',
    title: 'Can entanglement send a message?',
    body: 'Try to force the left particle to send a chosen bit. The result keeps coming out random, even though the partner will be correlated when compared later.',
    type: 'choice',
    button: 'Check no-signal rule',
    activity: `
      <div class="quantum-demo signal-demo" data-signal-demo>
        <label>Message you wish you could send
          <select data-signal-choice>
            <option value="UP">UP</option>
            <option value="DOWN">DOWN</option>
          </select>
        </label>
        <button type="button" data-send-signal>Try measurement</button>
        <div class="signal-readout" data-signal-readout>No attempts yet.</div>
      </div>
      <div class="lesson-note">Entanglement gives correlations, not controllable faster-than-light messages.</div>
    `,
    options: [
      ['a', 'Yes. If Alice wants to send UP, she can force her particle to measure UP.'],
      ['b', 'No. Alice cannot control her random result, so Bob cannot read a message until they later compare results normally.'],
      ['c', 'Yes, but only if Bob believes in quantum physics.'],
      ['d', 'No, because entanglement is the same as ordinary sealed boxes.']
    ],
    correct: 'b',
    hint: 'Ask whether Alice can choose the actual measurement result. If she cannot choose it, she cannot encode a message in it.',
    success: 'Right. Entanglement does not let anyone send usable information faster than light. The weirdness appears in the correlations after both sides compare notes.'
  },
  {
    kicker: 'Checkpoint 5',
    title: 'Teach it back.',
    body: 'In two or three sentences, explain entanglement to someone with no physics background. Include these ideas: random individual result, linked pair results, and no faster-than-light message.',
    type: 'text',
    button: 'Finish lesson',
    placeholder: 'Entanglement is...',
    validate: (answer) => {
      const text = answer.toLowerCase();
      const hasRandom = text.includes('random') || text.includes('uncertain') || text.includes('unpredictable');
      const hasLink = text.includes('linked') || text.includes('connected') || text.includes('correlated') || text.includes('shared');
      const hasNoSignal = text.includes('no message') || text.includes('not a message') || text.includes('faster than light') || text.includes('cannot send') || text.includes("can't send");
      return hasRandom && hasLink && hasNoSignal;
    },
    hint: 'Make sure your explanation says all three things: each side looks random alone, the two sides are linked as a pair, and the link cannot be used to send a controllable instant message.',
    success: 'Lesson complete. You have the core intuition: entanglement is a shared quantum state whose individual outcomes are random, whose paired outcomes are correlated, and whose weirdness still cannot be used as faster-than-light texting.'
  }
];

const lessonForm = document.querySelector('[data-lesson-form]');
const lessonInput = document.querySelector('[data-lesson-input]');
const lessonChat = document.querySelector('[data-lesson-chat]');
const lessonStatus = document.querySelector('[data-lesson-status]');
const tutorMode = document.querySelector('[data-tutor-mode]');
const lessonProgress = document.querySelector('[data-lesson-progress]');
const stepKicker = document.querySelector('[data-step-kicker]');
const stepTitle = document.querySelector('[data-step-title]');
const stepBody = document.querySelector('[data-step-body]');
const stepActivity = document.querySelector('[data-step-activity]');
const checkForm = document.querySelector('[data-check-form]');
const feedback = document.querySelector('[data-feedback]');
const nextStepButton = document.querySelector('[data-next-step]');
let currentLessonStep = 0;
let unlockedLessonStep = 0;
let currentStepPassed = false;
const lessonHistory = [
  {
    role: 'assistant',
    content: 'Ask me about entanglement while you work. I can use everyday analogies, slow down, give hints, or check your reasoning, but I will not simply hand you the checkpoint answer.'
  }
];

function appendLessonMessage(role, content) {
  if (!lessonChat) return;
  const message = document.createElement('article');
  message.className = `lesson-message ${role === 'user' ? 'student' : 'tutor'}`;

  const label = document.createElement('span');
  label.textContent = role === 'user' ? 'Student' : 'Tutor';

  const body = document.createElement('p');
  body.textContent = content;

  message.append(label, body);
  lessonChat.append(message);
  lessonChat.scrollTop = lessonChat.scrollHeight;
}

function localLessonReply(text) {
  const lowered = text.toLowerCase();
  if (lowered.includes('answer') || lowered.includes('which option') || lowered.includes('do it for me')) {
    return 'I can help you reason it out, but I should not give away the checkpoint. Ask yourself: is this describing an ordinary prewritten answer, a random result, a linked pair result, or a controllable message?';
  }
  if (lowered.includes('superposition')) {
    return 'A beginner way to think about superposition is: before measurement, the quantum state gives a set of possible outcomes and probabilities, not a normal hidden answer you simply have not peeked at yet.';
  }
  if (lowered.includes('message') || lowered.includes('faster') || lowered.includes('light')) {
    return 'Entanglement cannot send a faster-than-light message because neither person can choose their measurement result. The results look random locally. The pattern only appears when both sides compare results later through normal communication.';
  }
  if (lowered.includes('box') || lowered.includes('glove') || lowered.includes('token')) {
    return 'The box or glove analogy explains correlation: learning one side tells you the other. Entanglement goes beyond that because the quantum pair is described as one shared state, and measurement choices reveal correlations that ordinary hidden tokens cannot fully explain.';
  }
  if (lowered.includes('random') || lowered.includes('correlat') || lowered.includes('linked')) {
    return 'That is the central tension: each single result is random, but the pair results line up in a reliable relationship. Entanglement lives in the relationship between the two systems, not in either particle alone.';
  }
  return 'The simplest version is: two particles can share one quantum state. When measured, each individual result is unpredictable, but the two results are linked. What part feels fuzzy: superposition, measurement, correlation, or why it cannot send messages?';
}

function lessonStepContext() {
  const step = lessonSteps[currentLessonStep];
  return {
    index: currentLessonStep + 1,
    total: lessonSteps.length,
    title: step?.title,
    body: step?.body,
    checkpointType: step?.type,
    hint: step?.hint
  };
}

async function requestLessonReply(message) {
  const payload = {
    message,
    learnerState: `Working on lesson step ${currentLessonStep + 1} of ${lessonSteps.length}`,
    tutorMove: 'student-question',
    lesson: {
      title: 'Quantum Entanglement From Zero',
      objective: 'Teach the learner that entanglement is a shared quantum state with random individual outcomes, correlated pair outcomes, and no controllable faster-than-light messaging.',
      boundary: 'Scaffold with simple analogies, short hints, visual intuition, and checks for understanding. Do not reveal checkpoint answers directly.',
      currentStep: lessonStepContext()
    },
    history: lessonHistory.slice(-8)
  };

  const response = await fetch('/api/lesson', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.reply) {
    throw new Error(data.error || 'Lesson endpoint unavailable');
  }
  return data;
}

function setFeedback(message, isCorrect = false) {
  if (!feedback) return;
  feedback.textContent = message;
  feedback.classList.toggle('is-visible', Boolean(message));
  feedback.classList.toggle('is-correct', isCorrect);
}

function renderProgress() {
  if (!lessonProgress) return;
  lessonProgress.innerHTML = '';
  lessonSteps.forEach((step, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = index === 0 ? 'Video' : `Check ${index}`;
    button.classList.toggle('is-active', index === currentLessonStep);
    button.classList.toggle('is-complete', index < unlockedLessonStep);
    button.disabled = index > unlockedLessonStep;
    button.addEventListener('click', () => {
      if (index <= unlockedLessonStep) renderLessonStep(index);
    });
    lessonProgress.append(button);
  });
}

function buildChoiceStep(step) {
  if (!checkForm) return;
  const fieldset = document.createElement('fieldset');
  const options = document.createElement('div');
  options.className = 'option-list';
  step.options.forEach(([value, labelText]) => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'checkpoint-answer';
    radio.value = value;
    label.append(radio, document.createTextNode(labelText));
    options.append(label);
  });
  fieldset.append(options);
  checkForm.append(fieldset);
}

function buildTextStep(step) {
  if (!checkForm) return;
  const label = document.createElement('label');
  label.className = 'short-answer';
  label.textContent = 'Your answer';
  const textarea = document.createElement('textarea');
  textarea.name = 'checkpoint-answer';
  textarea.rows = 4;
  textarea.placeholder = step.placeholder || 'Write your answer...';
  label.append(textarea);
  checkForm.append(label);
}

function initLessonVisuals() {
  const pairDemo = document.querySelector('[data-pair-demo]');
  if (pairDemo) {
    const boxA = pairDemo.querySelector('[data-box-a]');
    const boxB = pairDemo.querySelector('[data-box-b]');
    const reveal = pairDemo.querySelector('[data-reveal-pair]');
    reveal?.addEventListener('click', () => {
      const aIsRed = Math.random() > 0.5;
      boxA.innerHTML = `Box A<br><strong class="${aIsRed ? 'red-token' : 'blue-token'}">${aIsRed ? 'Red' : 'Blue'}</strong>`;
      boxB.innerHTML = `Box B<br><strong class="${aIsRed ? 'blue-token' : 'red-token'}">${aIsRed ? 'Blue' : 'Red'}</strong>`;
      reveal.textContent = 'Shuffle again';
    });
  }

  const singleDemo = document.querySelector('[data-single-demo]');
  if (singleDemo) {
    const coin = singleDemo.querySelector('[data-single-coin]');
    const label = singleDemo.querySelector('[data-single-label]');
    singleDemo.querySelector('[data-measure-single]')?.addEventListener('click', () => {
      const result = Math.random() > 0.5 ? 'H' : 'T';
      coin.textContent = result;
      coin.classList.add('is-measured');
      label.textContent = `Measured result: ${result === 'H' ? 'Heads' : 'Tails'}. Before measuring, the demo only gave probabilities.`;
    });
    singleDemo.querySelector('[data-reset-single]')?.addEventListener('click', () => {
      coin.textContent = '?';
      coin.classList.remove('is-measured');
      label.textContent = 'Before measuring: possible heads and possible tails';
    });
  }

  const entangleDemo = document.querySelector('[data-entangle-demo]');
  if (entangleDemo) {
    const left = entangleDemo.querySelector('[data-left-particle]');
    const right = entangleDemo.querySelector('[data-right-particle]');
    const resetPair = () => {
      left.innerHTML = 'A<br><strong>?</strong>';
      right.innerHTML = 'B<br><strong>?</strong>';
      left.classList.remove('measured-up', 'measured-down');
      right.classList.remove('measured-up', 'measured-down');
    };
    entangleDemo.querySelector('[data-measure-entangled]')?.addEventListener('click', () => {
      const leftUp = Math.random() > 0.5;
      left.innerHTML = `A<br><strong>${leftUp ? 'Up' : 'Down'}</strong>`;
      right.innerHTML = `B<br><strong>${leftUp ? 'Down' : 'Up'}</strong>`;
      left.classList.toggle('measured-up', leftUp);
      left.classList.toggle('measured-down', !leftUp);
      right.classList.toggle('measured-up', !leftUp);
      right.classList.toggle('measured-down', leftUp);
    });
    entangleDemo.querySelector('[data-reset-entangled]')?.addEventListener('click', resetPair);
  }

  const signalDemo = document.querySelector('[data-signal-demo]');
  if (signalDemo) {
    let attempts = 0;
    let matched = 0;
    const choice = signalDemo.querySelector('[data-signal-choice]');
    const readout = signalDemo.querySelector('[data-signal-readout]');
    signalDemo.querySelector('[data-send-signal]')?.addEventListener('click', () => {
      attempts += 1;
      const desired = choice?.value || 'UP';
      const measured = Math.random() > 0.5 ? 'UP' : 'DOWN';
      if (desired === measured) matched += 1;
      readout.textContent = `Wanted ${desired}. Got ${measured}. Matches so far: ${matched}/${attempts}. The result is not controllable.`;
    });
  }
}

function renderLessonStep(index = currentLessonStep) {
  const step = lessonSteps[index];
  if (!step || !stepKicker || !stepTitle || !stepBody || !stepActivity || !checkForm) return;
  currentLessonStep = index;
  currentStepPassed = index < unlockedLessonStep;
  stepKicker.textContent = step.kicker;
  stepTitle.textContent = step.title;
  stepBody.textContent = step.body;
  stepActivity.innerHTML = step.activity || '';
  checkForm.innerHTML = '';
  setFeedback('', false);
  if (nextStepButton) nextStepButton.hidden = true;
  if (lessonStatus) lessonStatus.textContent = `Step ${index + 1} / ${lessonSteps.length}`;

  if (step.type === 'choice') buildChoiceStep(step);
  if (step.type === 'text') buildTextStep(step);

  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = step.button || 'Check answer';
  checkForm.append(button);
  initLessonVisuals();
  renderProgress();
}

function checkLessonAnswer() {
  const step = lessonSteps[currentLessonStep];
  if (!step) return;

  let correct = false;
  if (step.type === 'video') {
    correct = true;
  } else if (step.type === 'choice') {
    const selected = checkForm?.querySelector('input[name="checkpoint-answer"]:checked');
    correct = selected?.value === step.correct;
  } else if (step.type === 'text') {
    const answer = checkForm?.querySelector('[name="checkpoint-answer"]')?.value.trim() || '';
    correct = step.validate(answer);
  }

  if (!correct) {
    setFeedback(step.hint || 'Not quite. Try again with the main idea in mind.', false);
    return;
  }

  currentStepPassed = true;
  unlockedLessonStep = Math.max(unlockedLessonStep, currentLessonStep + 1);
  setFeedback(step.success || 'Correct.', true);
  renderProgress();

  if (nextStepButton) {
    const finished = currentLessonStep === lessonSteps.length - 1;
    nextStepButton.textContent = finished ? 'Lesson complete' : 'Continue';
    nextStepButton.hidden = false;
    nextStepButton.disabled = finished;
  }
}

if (checkForm) {
  checkForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkLessonAnswer();
  });
  renderLessonStep(0);
}

if (nextStepButton) {
  nextStepButton.addEventListener('click', () => {
    if (currentStepPassed && currentLessonStep < lessonSteps.length - 1) {
      renderLessonStep(currentLessonStep + 1);
    }
  });
}

if (lessonForm && lessonInput) {
  lessonForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = lessonInput.value.trim();
    if (!message) return;

    appendLessonMessage('user', message);
    lessonHistory.push({ role: 'user', content: message });
    lessonInput.value = '';
    if (tutorMode) tutorMode.textContent = 'Thinking';

    try {
      const data = await requestLessonReply(message);
      appendLessonMessage('assistant', data.reply);
      lessonHistory.push({ role: 'assistant', content: data.reply });
      if (tutorMode) tutorMode.textContent = data.demo ? 'Demo mode' : 'Live tutor';
    } catch (error) {
      const reply = localLessonReply(message);
      appendLessonMessage('assistant', reply);
      lessonHistory.push({ role: 'assistant', content: reply });
      if (tutorMode) tutorMode.textContent = 'Local demo';
    }
  });
}
