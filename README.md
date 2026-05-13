# To Struggle Well

This folder contains the final essay and an enhanced static presentation site.

- `essay.md` is the full longform essay.
- `index.html` is the interactive presentation website.
- `styles.css` and `script.js` power the visual layout, slides, hook dial, argument map, objection room, and the gated quantum entanglement lesson.
- `api/lesson.js` is the Vercel serverless quantum tutor endpoint. It keeps the system prompt and OpenAI API key server-side, and returns a local demo response if no key is configured.
- `assets/hero-ai-classroom.png` is the generated hero image used by the site.

Open `index.html` in a browser to read or present it. The site includes a print stylesheet, so browser print/export can produce a clean PDF from the essay view.

The interactive lesson starts with a short NOVA/PBS video, then walks a zero-background learner through ordinary correlation, superposition, entangled measurement, no-faster-than-light messaging, and a final teach-back checkpoint.

To enable the live tutor on Vercel, set `OPENAI_API_KEY` in the project environment. `OPENAI_MODEL` is optional and defaults to `gpt-5-mini`.
