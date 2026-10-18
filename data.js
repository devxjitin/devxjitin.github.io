// Single source of truth for projects and the Autourgos ecosystem.
const GH = "https://github.com/devxjitin";

window.PROJECTS = [
  {
    slug: "autourgos-agent",
    name: "Autourgos Agent",
    pitch: "Zero-dependency ReAct agent framework that works with any OpenAI-compatible LLM.",
    stack: ["Python", "Agents", "Tool calling", "Async"],
    repo: GH + "/autourgos-agent",
    pypi: "https://pypi.org/project/autourgos-agent/",
    featured: true,
    problem: "Most agent frameworks pull in heavy SDKs, lock you to one provider, or hide the loop. I wanted a small, readable agent core that runs on any LLM and stays easy to extend.",
    built: "A self-contained agent that alternates Thought, Action and Observation until it reaches a Final Answer. Only dependency is autourgos-core, a stdlib-only utility library.",
    decisions: [
      "Works with anything exposing .invoke() / .ainvoke(): OpenAI, Groq, Together, Mistral, DeepSeek, Perplexity, Ollama, LM Studio, vLLM.",
      "JSON-driven loop plus native structured tool-calling mode, with parallel tool calls.",
      "Every method has an async twin (a-prefixed).",
      "CallbackHandler middleware with 11 lifecycle hooks, sync or async, plus approval callbacks for human-in-the-loop gates.",
      "Lazy-loaded toolboxes for large tool catalogs, run history to disk with secrets redacted, pause/resume of in-flight runs."
    ]
  },
  {
    slug: "campusgrade",
    name: "CampusGrade",
    pitch: "GitHub-native assignment and grading platform with code-similarity detection and privacy-safe AI evaluation.",
    stack: ["FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Docker"],
    repo: GH + "/CampusGrade",
    featured: true,
    problem: "Teachers need to collect GitHub-based assignments, catch copied code and grade against a rubric without leaking student identity to external AI tools.",
    built: "A full platform: teachers publish assignments with rubrics, students submit a public repository, the system snapshots and analyses each submission, flags copying and supports rubric grading before results are released.",
    decisions: [
      "Repository is downloaded and analysed once, at the deadline or when evaluation starts, so later pushes do not count.",
      "Near-duplicate code above 70% similarity caps both students at 50% of marks until a teacher reviews it.",
      "AI prompts never contain names, roll numbers, e-mails or GitHub logins. Students appear as Student-NN and the mapping lives only in a signed token in the teacher's browser.",
      "Programs, batches, sections, subjects, session rollover, per-area admin levels and an audit log.",
      "Production setup: async FastAPI, separate job worker, S3-compatible storage, Caddy HTTPS, nightly backups with tested restore, one-command deploy and rollback."
    ]
  },
  {
    slug: "sanchar",
    name: "Sanchar",
    pitch: "Multi-tenant voice assistant platform built around the Gemini Live API.",
    stack: ["FastAPI", "TypeScript", "Gemini Live", "SaaS"],
    private: true,
    featured: true,
    problem: "Businesses want their own voice assistant without building realtime audio infrastructure each time.",
    built: "A multi-tenant SaaS where each tenant gets its own voice assistant, powered by Gemini Live for realtime conversation.",
    decisions: ["Multi-tenant architecture on a FastAPI backend.", "Realtime voice via the Gemini Live API."]
  },
  {
    slug: "ultron",
    name: "ULTRON",
    pitch: "Voice-controlled Windows desktop assistant with vision and automation.",
    stack: ["Python", "Computer vision", "Speech-to-text", "Automation"],
    repo: GH + "/ULTRON",
    featured: true,
    problem: "Controlling a desktop hands-free needs speech, screen understanding and actions working together.",
    built: "A Windows assistant that listens to voice commands, understands the screen and automates desktop actions.",
    decisions: ["Combines speech recognition, computer vision and desktop automation in one Python app."]
  },
  {
    slug: "drishti",
    name: "Drishti",
    pitch: "A voice assistant kiosk that holds natural conversations grounded in your own knowledge.",
    stack: ["Kotlin", "Jetpack Compose", "Gemini", "RAG"],
    private: true,
    featured: true,
    problem: "Front desks and counters need an assistant that answers from the organisation's own information, not generic replies.",
    built: "An Android kiosk app with a voice interface, using retrieval so answers are grounded in the owner's knowledge base.",
    decisions: ["Android kiosk built with Kotlin and Jetpack Compose.", "Retrieval-augmented answers with Gemini."]
  },
  {
    slug: "rag-dataset-studio",
    name: "RAG Dataset Studio",
    pitch: "Workspace for turning documents and websites into an inspectable, traceable RAG dataset.",
    stack: ["FastAPI", "React", "Vite", "TypeScript", "RAG"],
    private: true,
    featured: true,
    problem: "RAG quality depends on the dataset, but preparation pipelines are usually opaque.",
    built: "A workspace that ingests documents and websites and produces a dataset you can inspect and trace back to its sources.",
    decisions: ["Traceability from each dataset item back to its source.", "FastAPI backend with a React + Vite frontend."]
  },
  { slug: "project-loop", name: "Project-loop", pitch: "AI-powered customer feedback intelligence platform.", stack: ["TypeScript"], repo: GH + "/Project-loop" },
  { slug: "nirman-lab", name: "Nirman Lab Voice Assistant", pitch: "Voice assistant for Nirman Labs using the Gemini Live API.", stack: ["React", "TypeScript", "Gemini Live"], repo: GH + "/Nirman-Lab-Voice-Assistant" },
  { slug: "aircursor", name: "AirCursor", pitch: "Control your cursor with finger movements using computer vision.", stack: ["Python", "Computer vision"], repo: GH + "/AirCursor" },
  { slug: "examguard", name: "ExamGuard", pitch: "Online examination platform with AI proctoring and integrity reporting.", stack: ["FastAPI", "React", "Face recognition"], private: true },
  { slug: "trustid", name: "TrustID", pitch: "Licensing and authentication system: FastAPI backend, Android admin app, Python SDK.", stack: ["FastAPI", "Kotlin", "Python"], private: true }
];

window.ECOSYSTEM = [
  { layer: "Core", pkgs: ["autourgos-core", "autourgos-agent", "autourgos-starter"] },
  { layer: "LLM clients", pkgs: ["autourgos-openaichat", "autourgos-openaichat-js", "autourgos-responses", "autourgos-live"] },
  { layer: "Agent middleware", pkgs: ["autourgos-memory", "autourgos-skills", "autourgos-hcix"] },
  { layer: "Computer-use tools", pkgs: ["autourgos-cua-coordinate-tool", "autourgos-cua-mouse-click-tool", "autourgos-cua-scroll-tool", "autourgos-cua-screenshot-understanding-tool"] },
  { layer: "Voice & I/O", pkgs: ["autourgos-whisperstt", "autourgos-windowstt", "autourgos-micinput", "autourgos-textinput", "autourgos-textoutput"] }
];
window.GH = GH;
