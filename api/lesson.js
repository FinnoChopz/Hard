const SYSTEM_PROMPT = `
You are Quantum Tutor, a classroom-safe AI tutor for an education project called "To Struggle Well."

Your job is to scaffold the learner without substituting for the learner.
The design is informed by research-based active tutoring principles, including Kestin et al.'s finding that AI tutoring is useful when it is carefully designed as pedagogy rather than generic answer generation.

The lesson topic is quantum entanglement for a learner with literally zero physics background. Teach this simple model:
1. Ordinary correlation is like two prepared boxes: learning one side can reveal the other, but the values were already fixed.
2. A quantum measurement is different: before measurement, the state gives probabilities, and measurement produces one definite outcome.
3. Entangled particles are described by one shared quantum state, even when separated.
4. Each individual result looks random, but the pair results are strongly correlated.
5. Entanglement cannot send a controllable faster-than-light message because neither side can choose its random result.

Rules:
- Diagnose before explaining. Ask what the student already thinks when their understanding is unclear.
- Give one short step, hint, analogy, question, or practice task at a time.
- Preserve productive struggle. Do not write final answers, final essays, or complete graded work.
- If the student asks for a checkpoint answer, redirect to an attempt-first scaffold and give a hint without naming the option.
- Adapt to zero background: define terms, avoid equations unless asked, and use everyday analogies while naming where the analogy breaks.
- Make uncertainty visible. If a factual claim is uncertain, say what would need checking.
- Route privacy, safety, emotional, medical, sexual, legal, or high-stakes issues to a teacher or trusted adult.
- Keep responses concise: 80 to 140 words.
- End with one question, retrieval check, or transfer task the student must answer.
`;

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object') return req.body;
  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

function demoReply(message, move) {
  const lowered = String(message).toLowerCase();
  if (lowered.includes('answer') || lowered.includes('which option') || lowered.includes('do it for me')) {
    return 'I can help you reason it out, but I should not give away the checkpoint. Ask yourself: is the option describing ordinary prewritten values, random individual outcomes, linked pair outcomes, or a controllable message?';
  }
  if (lowered.includes('superposition')) {
    return 'A simple way to begin: superposition means the quantum state carries several possible measurement outcomes with probabilities. It is not just a normal hidden coin you have not looked at yet. Measurement gives one definite result.';
  }
  if (lowered.includes('message') || lowered.includes('faster') || lowered.includes('light')) {
    return 'Entanglement cannot send a faster-than-light message because each local result is random. The strange part is that when both sides later compare results, the pair shows a pattern stronger than ordinary classical explanations allow.';
  }
  if (lowered.includes('box') || lowered.includes('glove') || lowered.includes('token')) {
    return 'The box or glove analogy is useful for ordinary correlation: if one box has red, the other has blue. But entanglement is stranger because the pair is treated as one shared quantum state, not just two objects with prewritten labels.';
  }
  if (lowered.includes('random') || lowered.includes('correlat') || lowered.includes('connected') || lowered.includes('linked')) {
    return 'Yes: each individual measurement looks random, but the two results are linked when compared. Entanglement lives in the relationship between the systems, not in either particle alone.';
  }
  return 'Start here: entangled particles share one quantum state. When measured, each side gets an unpredictable result, but the two results fit together in a reliable pattern. What is confusing you most: superposition, measurement, correlation, or no faster-than-light messages?';
}

function extractText(data) {
  if (typeof data.output_text === 'string') return data.output_text.trim();

  const pieces = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) {
        pieces.push(content.text);
      }
    }
  }
  return pieces.join('\n').trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = parseBody(req);
  const message = String(body.message || '').slice(0, 1600).trim();
  const tutorMove = String(body.tutorMove || 'diagnose').slice(0, 40);
  const learnerState = String(body.learnerState || 'ready').slice(0, 40);
  const lesson = body.lesson || {};
  const history = Array.isArray(body.history) ? body.history.slice(-8) : [];

  if (!message) {
    return res.status(400).json({ error: 'Missing student message' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(200).json({
      demo: true,
      reply: demoReply(message, tutorMove)
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.5-2026-04-23',
        instructions: SYSTEM_PROMPT,
        input: JSON.stringify({
          lesson,
          learnerState,
          tutorMove,
          recentConversation: history,
          latestStudentMessage: message
        }),
        reasoning: { effort: 'low' },
        max_output_tokens: 520,
        store: false
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'OpenAI request failed'
      });
    }

    const reply = extractText(data);
    if (!reply) {
      return res.status(502).json({ error: 'No tutor response returned' });
    }

    return res.status(200).json({ demo: false, reply });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Lesson tutor failed' });
  }
};
