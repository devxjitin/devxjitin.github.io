// Theme toggle (persisted, wrapped for blocked storage)
(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) root.dataset.theme = saved;
  const btn = document.getElementById("theme");
  if (btn) btn.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

// Scroll reveal
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.1 });
  els.forEach(e => io.observe(e));
})();

// Helpers
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function tags(list) { return `<div class="tags">${list.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>`; }
function card(p) {
  const badge = p.private ? `<span class="badge private">private · demo on request</span>` : `<span class="badge">open source</span>`;
  return `<a class="card reveal" href="project.html?p=${p.slug}">
    ${badge}<h3>${esc(p.name)}</h3><p>${esc(p.pitch)}</p>${tags(p.stack)}</a>`;
}

// Projects grids
const feat = document.getElementById("featured");
if (feat) feat.innerHTML = PROJECTS.filter(p => p.featured).map(card).join("");
const more = document.getElementById("more");
if (more) more.innerHTML = PROJECTS.filter(p => !p.featured).map(card).join("");

// Ecosystem layers
const eco = document.getElementById("ecosystem");
if (eco) eco.innerHTML = ECOSYSTEM.map(l => `<div class="layer reveal"><b>${esc(l.layer)}</b>
  <div class="pkgs">${l.pkgs.map(n => `<a href="${GH}/${n}" target="_blank" rel="noopener">${n}</a>`).join("")}</div></div>`).join("");

// Agent trace animation
const trace = document.getElementById("trace");
if (trace) {
  const lines = [
    ["t-thought", "Thought: I need the latest build status before answering."],
    ["t-action", 'Action: get_build_status(project="portfolio")'],
    ["t-obs", "Observation: passed · 42 checks · 1m 12s"],
    ["t-thought", "Thought: I have enough information."],
    ["t-final", "Final Answer: The build is green. Ready to deploy."]
  ];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const render = n => trace.innerHTML = lines.slice(0, n).map(l => `<span class="${l[0]}">${esc(l[1])}</span>`).join("\n") + '\n<span class="cursor"></span>';
  if (reduce) render(lines.length);
  else {
    let i = 0;
    const step = () => { render(++i); if (i < lines.length) setTimeout(step, 1100); else setTimeout(() => { i = 0; render(0); setTimeout(step, 600); }, 5000); };
    render(0); setTimeout(step, 500);
  }
}

// Project detail page
const detail = document.getElementById("detail");
if (detail) {
  const slug = new URLSearchParams(location.search).get("p");
  const p = PROJECTS.find(x => x.slug === slug);
  if (!p) detail.innerHTML = `<p>Project not found. <a href="index.html#projects" style="color:var(--accent)">Back to projects</a></p>`;
  else {
    document.title = `${p.name} · Jitin Kumar Sengar`;
    const links = [
      p.repo ? `<a class="btn primary" href="${p.repo}" target="_blank" rel="noopener">View on GitHub</a>` : "",
      p.pypi ? `<a class="btn" href="${p.pypi}" target="_blank" rel="noopener">PyPI</a>` : "",
      p.private ? `<span class="badge private">Private repository — demo on request</span>` : ""
    ].join(" ");
    detail.innerHTML = `<a class="back" href="index.html#projects">← all projects</a>
      <div class="label">// case study</div><h1 style="font-size:40px">${esc(p.name)}</h1>
      <p class="lead">${esc(p.pitch)}</p>${tags(p.stack)}<div class="btns" style="margin-top:20px">${links}</div>
      <div class="case">
        ${p.problem ? `<h3>problem</h3><p>${esc(p.problem)}</p>` : ""}
        ${p.built ? `<h3>what I built</h3><p>${esc(p.built)}</p>` : ""}
        ${p.decisions ? `<h3>key decisions</h3><ul>${p.decisions.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
      </div>`;
  }
}
