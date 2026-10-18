// Single source of truth for projects and the Autourgos ecosystem.
const GH = "https://github.com/devxjitin";

window.PROJECTS = [
  {
    slug: "autourgos-agent",
    name: "Autourgos",
    jpName: "自律代理人 · 仮想知能",
    tier: "SSR",
    badge: "FLAGSHIP",
    category: "agentic",
    pitch: "Zero-dependency Python framework for building LLM agents that works with any OpenAI-compatible model.",
    stack: ["Python", "Agents", "Tool Calling", "Async", "Zero-Dep"],
    repo: GH + "/autourgos-agent",
    pypi: "https://pypi.org/project/autourgos-agent/",
    featured: true,
    stats: { dep: "0 deps", hooks: "11 hooks", pypi: "v3.11.0" },
    problem: "Most agent frameworks pull in heavy SDKs, lock you to one provider, or hide the reasoning loop. I wanted a small, transparent, and ultra-fast agent core that runs on any LLM and stays effortless to extend.",
    built: "A modular framework of small, composable packages. Its agent loop alternates Thought, Action and Observation until it reaches a verified Final Answer, and the only dependency is `autourgos-core`, a stdlib-only utility library.",
    decisions: [
      "Works with anything exposing .invoke() / .ainvoke(), including OpenAI, Groq, Together, Mistral, DeepSeek, Perplexity, Ollama, LM Studio, vLLM.",
      "JSON-driven loop plus native structured tool-calling mode, with parallel tool execution.",
      "Every single method has an async twin (a-prefixed) for non-blocking realtime execution.",
      "CallbackHandler middleware with 11 lifecycle hooks, sync or async, plus approval callbacks for human-in-the-loop gates.",
      "Lazy-loaded toolboxes for massive tool catalogs, run history saved to disk with secrets automatically redacted, and pause/resume of in-flight runs."
    ]
  },
  {
    slug: "campusgrade",
    name: "CampusGrade",
    jpName: "評価知能 · コード分析",
    tier: "SSR",
    badge: "FULL PLATFORM",
    category: "fullstack",
    pitch: "GitHub-native assignment and grading platform with code-similarity detection and privacy-safe AI evaluation.",
    stack: ["FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Docker"],
    repo: GH + "/CampusGrade",
    featured: true,
    stats: { arch: "Next.js + FastAPI", sim: "70% Dup Cap", privacy: "Zero-PII Leak" },
    problem: "Educators need to collect GitHub-based coding assignments, catch copied code across batches, and grade against complex rubrics without leaking student identity to external AI tools.",
    built: "A production platform where teachers publish assignments with structured rubrics, students submit repository URLs, and the system snapshots and analyzes submissions with plagiarism scoring and rubric-guided AI evaluation.",
    decisions: [
      "Repository is cloned and analyzed once at the deadline or upon evaluation start, ensuring post-deadline pushes never affect results.",
      "Near-duplicate code above 70% similarity automatically caps both submissions at 50% marks until reviewed by an instructor.",
      "AI prompts never contain names, roll numbers, emails, or GitHub logins. Students appear as Student-NN, and the mapping resides strictly in a signed browser token.",
      "Comprehensive multi-tenant hierarchy covering programs, batches, sections, subjects, session rollover, and per-area admin access control.",
      "Production-grade infrastructure with async FastAPI, separate Celery/worker queues, S3-compatible storage, Caddy HTTPS, and nightly automated backups."
    ]
  },
  {
    slug: "ultron",
    name: "ULTRON",
    jpName: "電脳執事 · デスクトップ自動化",
    tier: "SSR",
    badge: "AUTONOMOUS OS",
    category: "agentic",
    pitch: "Voice-controlled Windows desktop assistant with real-time vision, screen understanding, and system automation.",
    stack: ["Python", "Computer Vision", "Speech-to-Text", "Windows Automation"],
    repo: GH + "/ULTRON",
    featured: true,
    stats: { os: "Windows 11", input: "Voice + Screen", tech: "CV + STT" },
    problem: "Controlling a desktop hands-free requires seamless integration of live speech recognition, real-time screen coordinate resolution, and robotic OS automation.",
    built: "A Windows desktop copilot that listens to verbal instructions, parses on-screen elements via computer vision, and autonomously triggers keyboard, mouse, and system actions.",
    decisions: [
      "Combines continuous speech recognition, multi-scale screen understanding, and precision desktop automation in a unified Python runtime."
    ]
  },
  {
    slug: "drishti",
    name: "Drishti",
    jpName: "知識対話 · 視覚キオスク",
    tier: "SSR",
    badge: "PHYSICAL AI",
    category: "voice",
    pitch: "Interactive voice assistant kiosk that conducts natural conversations grounded in private organizational knowledge.",
    stack: ["Kotlin", "Jetpack Compose", "Gemini", "RAG", "Android"],
    private: true,
    featured: true,
    stats: { ui: "Compose Android", engine: "Gemini RAG", deploy: "Kiosk OS" },
    problem: "Front-desk kiosks and physical reception counters need conversational assistants that deliver verified answers from institutional documentation rather than generic LLM hallucinations.",
    built: "An Android kiosk application with a futuristic voice UI, combining on-device speech processing with retrieval-augmented generation grounded in proprietary enterprise knowledge.",
    decisions: [
      "Native Android kiosk built with modern Kotlin and declarative Jetpack Compose UI.",
      "Strict retrieval-augmented generation pipeline with Gemini to prevent hallucinated organizational answers."
    ]
  },
  {
    slug: "examina",
    name: "Examina",
    tier: "SSR",
    category: "vision",
    pitch: "Windows study copilot that reads on-screen MCQ, theory and coding questions with Gemini Vision and answers through global hotkeys.",
    stack: ["Python", "Gemini Vision", "PyAutoGUI", "PyInstaller", "Windows"],
    private: true,
    featured: true,
    site: "https://examina.devxjitin.dev",
    problem: "Working through long question sets on a Windows machine means constantly switching between the question and a separate AI tool. I wanted a helper that understands what is already on screen and stays out of the way.",
    built: "A packaged Windows desktop app that captures the screen on a hotkey, understands different question types (MCQ, theory, coding) with Gemini Vision, and returns an accurate answer without breaking your flow.",
    decisions: [
      "Global hotkey controls, so it works over any window without switching apps.",
      "Screen capture plus vision-model understanding, rather than copy-paste, so it handles whatever is displayed.",
      "Runs quietly in the background as a single installable Windows executable built with PyInstaller."
    ]
  },
  {
    slug: "portfolio",
    name: "This Portfolio",
    tier: "SSR",
    category: "web",
    pitch: "The site you are on right now, a hand-built, framework-free portfolio in a warm manga style.",
    stack: ["HTML", "CSS", "JavaScript"],
    featured: true,
    repo: GH + "/devxjitin.github.io",
    site: "https://devxjitin.github.io",
    problem: "Most developer portfolios are templates that look the same and say very little about the person. I wanted one that feels like me, loads fast and is easy to keep up to date.",
    built: "A static site written in plain HTML, CSS and vanilla JavaScript, with no framework and no build step. Projects and Autourgos packages are rendered from a single data file, and it is hosted on GitHub Pages.",
    decisions: [
      "No framework or bundler, so there is nothing to install and the whole site stays small and fast.",
      "One data.js file feeds the project cards and the Autourgos package list, so adding a project is a single edit.",
      "Inline SVG icons and generated project art instead of icon libraries or stock images.",
      "Responsive layout, keyboard-friendly focus styles and reduced-motion support."
    ]
  }
];

window.ECOSYSTEM = [
  {
    layer: "Core Framework",
    jpLayer: "コアフレームワーク",
    icon: "🧠",
    color: "#00f0ff",
    pkgs: [
      { n: "autourgos-core", v: "0.11.0", d: "Stdlib-only shared utilities such as retry/backoff, scoped state, SQLite helpers. Pure Python zero dependencies.", tag: "Zero-Dep Core" },
      { n: "autourgos-agent", v: "3.11.0", d: "General-purpose ReAct LLM agent with 11 lifecycle hooks, parallel tool calling, and pause/resume.", tag: "Flagship Agent" },
      { n: "autourgos-starter", v: "1.0.9", d: "Beginner-friendly bootstrap bundle with one pip install, one function call and an instant working autonomous agent.", tag: "Quickstart" }
    ]
  },
  {
    layer: "LLM Clients",
    jpLayer: "言語モデルクライアント",
    icon: "⚡",
    color: "#ff388b",
    pkgs: [
      { n: "autourgos-openaichat", v: "2.6.6", d: "High-performance wrapper for OpenAI Chat Completions API with fallback failover.", tag: "OpenAI Chat" },
      { n: "autourgos-openaichat-js", d: "TypeScript / Node.js client for OpenAI-compatible Chat Completions APIs with streaming.", tag: "TypeScript" },
      { n: "autourgos-responses", v: "2.6.0", d: "Native Python interface for the OpenAI Structured Responses API with schema validation.", tag: "Structured Data" },
      { n: "autourgos-live", v: "0.4.1", d: "Async streaming wrapper for realtime bidirectional audio/video LLM streams (Gemini Live).", tag: "Bidirectional Audio" }
    ]
  },
  {
    layer: "Agent Middleware",
    jpLayer: "エージェントミドルウェア",
    icon: "🛡️",
    color: "#ffe600",
    pkgs: [
      { n: "autourgos-memory", v: "2.1.0", d: "Modular memory engines covering buffer, local, semantic, summary, token, vector, and episodic storage.", tag: "Multi-Memory" },
      { n: "autourgos-skills", v: "1.3.0", d: "Lazy-loading skill instructions only when demanded, preserving LLM context token windows.", tag: "Context Optimization" },
      { n: "autourgos-hcix", v: "3.3.0", d: "Human-in-the-loop interrupt middleware with global hotkey steering and approval checkpoints.", tag: "Human Oversight" }
    ]
  },
  {
    layer: "Computer-Use Tools (CUA)",
    jpLayer: "コンピューター操作ツール",
    icon: "👁️",
    color: "#7928ca",
    pkgs: [
      { n: "autourgos-cua-coordinate-tool", v: "1.2.1", d: "Visual spatial coordinate resolver that locates described UI elements in screen captures with pixel accuracy.", tag: "Spatial Vision" },
      { n: "autourgos-cua-mouse-click-tool", v: "1.0.0", d: "Deterministic mouse click dispatcher for left/right/double click at target pixel coordinates.", tag: "OS Automation" },
      { n: "autourgos-cua-scroll-tool", v: "1.0.0", d: "Horizontal & vertical viewport scrolling with configurable velocity and friction curves.", tag: "Screen Nav" },
      { n: "autourgos-cua-screenshot-understanding-tool", d: "Multimodal LLM-grounded screenshot Q&A with visual bounding box segmentation.", tag: "Visual Grounding" }
    ]
  },
  {
    layer: "Voice & Realtime I/O",
    jpLayer: "音声・入出力インターフェース",
    icon: "🎙️",
    color: "#00ff88",
    pkgs: [
      { n: "autourgos-whisperstt", v: "0.1.2", d: "Local offline speech-to-text powered by faster-whisper with automatic GPU/CPU quantization.", tag: "Offline STT" },
      { n: "autourgos-windowstt", v: "0.1.2", d: "Ultra-low-latency offline speech-to-text leveraging native Windows SAPI COM interfaces.", tag: "Native Windows" },
      { n: "autourgos-micinput", v: "0.1.2", d: "Provider-independent asynchronous microphone audio streaming with noise gate filters.", tag: "Audio Stream" },
      { n: "autourgos-textinput", v: "0.1.4", d: "Global hotkey overlay modal for frictionless natural language agent command input.", tag: "Hotkey HUD" },
      { n: "autourgos-textoutput", v: "0.1.5", d: "Thread-safe desktop output modal featuring real-time streaming Markdown rendering.", tag: "Markdown HUD" }
    ]
  }
];

window.GH = GH;
