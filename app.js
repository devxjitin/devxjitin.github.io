/**
 * Portfolio script - Jitin Kumar Sengar (devxjitin)
 * Renders projects + Autourgos packages from data.js, plus small UI helpers.
 */
(function () {
  'use strict';

  function esc(s) {
    return String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  /* ---------- Icons (Lucide-style outline paths, inline so no dependency) ---------- */
  const ICONS = {
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    pointer: '<path d="m9 9 5 12 1.8-5.2L21 14Z"/><path d="M7.2 2.2 8 5.1"/><path d="m5.1 8-2.9-.8"/><path d="M14 4.1 12 6"/><path d="m6 12-1.9 2"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    server: '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
    layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
  };

  const LAYER_ICONS = {
    'Core Framework': 'cpu',
    'LLM Clients': 'zap',
    'Agent Middleware': 'shield',
    'Computer-Use Tools (CUA)': 'eye',
    'Voice & Realtime I/O': 'mic'
  };

  function icon(name) {
    return `<i class="ico" data-icon="${name}"></i>`;
  }

  function paintIcons(root = document) {
    root.querySelectorAll('i.ico[data-icon]:empty').forEach((el) => {
      const paths = ICONS[el.getAttribute('data-icon')];
      if (!paths) return;
      el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
    });
  }

  /* ---------- Scroll reveal ---------- */
  function observeReveals() {
    const items = document.querySelectorAll('.reveal:not(.revealed)');
    if (!('IntersectionObserver' in window)) {
      items.forEach((i) => i.classList.add('revealed'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    items.forEach((i) => io.observe(i));
  }

  /* ---------- Generated art for projects without a screenshot ---------- */
  const ART = {
    'autourgos-agent': { icon: 'cpu', tint: '#fbd9e0' },
    ultron: { icon: 'eye', tint: '#d9e4fb' },
    drishti: { icon: 'mic', tint: '#fbeab8' },
    examina: { icon: 'pointer', tint: '#d6f0e0' },
    portfolio: { icon: 'layout', tint: '#e6dcf7' }
  };

  function projectArt(p) {
    const art = ART[p.slug] || { icon: 'cpu', tint: '#fbd9e0' };
    const chips = (p.stack || []).slice(0, 3).map((t) => `<li>${esc(t)}</li>`).join('');
    return `
      <div class="art-card" style="--tint:${art.tint}" aria-hidden="true">
        <div class="art-bar"><i></i><i></i><i></i></div>
        <div class="art-main">
          <span class="art-icon">${icon(art.icon)}</span>
          <strong>${esc(p.name)}</strong>
          <ul class="chips">${chips}</ul>
        </div>
      </div>`;
  }

  /* ---------- Featured projects ---------- */
  const featContainer = document.getElementById('featured-missions-list');
  if (featContainer && window.PROJECTS) {
    const CAMPUS_IMG = 'https://raw.githubusercontent.com/devxjitin/CampusGrade/main/docs/screenshots/02-teacher-home.png';

    featContainer.innerHTML = window.PROJECTS.filter((p) => p.featured)
      .map((p, idx) => {
        const details = p.decisions
          ? `<details>
               <summary>How it works &amp; why I built it this way</summary>
               <div class="detail-body">
                 ${p.problem ? `<h5>The problem</h5><p>${esc(p.problem)}</p>` : ''}
                 <h5>Key decisions</h5>
                 <ul>${p.decisions.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
               </div>
             </details>`
          : '';

        const links = [
          p.repo ? `<a class="btn primary" href="${p.repo}" target="_blank" rel="noopener">Source ↗</a>` : '',
          p.pypi ? `<a class="btn" href="${p.pypi}" target="_blank" rel="noopener">PyPI ↗</a>` : '',
          p.site ? `<a class="btn" href="${p.site}" target="_blank" rel="noopener">Live ↗</a>` : '',
          p.private ? `<span class="private-note">${icon('lock')} Private project. Happy to walk you through it.</span>` : ''
        ].join('');

        const art =
          p.slug === 'campusgrade'
            ? `<img src="${CAMPUS_IMG}" alt="CampusGrade teacher dashboard screenshot" loading="lazy">`
            : projectArt(p);

        return `
          <article class="project reveal">
            <div>
              <p class="project-no">Story ${String(idx + 1).padStart(2, '0')}</p>
              <h3>${esc(p.name)}</h3>
              <p>${esc(p.built || p.pitch)}</p>
              <ul class="chips">${(p.stack || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
              ${details}
              <div class="btn-row">${links}</div>
            </div>
            <div class="panel project-art">${art}</div>
          </article>`;
      })
      .join('');
  }

  /* ---------- Smaller projects ---------- */
  const auxContainer = document.getElementById('aux-missions-grid');
  if (auxContainer && window.PROJECTS) {
    const auxProjects = window.PROJECTS.filter((p) => !p.featured);
    const auxHead = document.getElementById('aux-head');
    if (auxHead) auxHead.hidden = auxProjects.length === 0;
    auxContainer.innerHTML = auxProjects
      .map((p) => {
        const links = [
          p.repo ? `<a class="btn small" href="${p.repo}" target="_blank" rel="noopener">Repo ↗</a>` : '',
          p.site ? `<a class="btn small" href="${p.site}" target="_blank" rel="noopener">Site ↗</a>` : '',
          p.private && !p.site ? `<span class="private-note">${icon('lock')} Private</span>` : ''
        ].join('');
        return `
          <article class="panel aux reveal">
            <div>
              <h4>${esc(p.name)}</h4>
              <p>${esc(p.pitch)}</p>
            </div>
            <ul class="chips">${(p.stack || []).map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
            <div class="aux-links">${links}</div>
          </article>`;
      })
      .join('');
  }

  /* ---------- Autourgos packages ---------- */
  const ecoContainer = document.getElementById('ecosystem-layers-list');
  const tabsContainer = document.getElementById('eco-filter-tabs');

  function renderEcosystem(filterLayer = 'all') {
    if (!ecoContainer || !window.ECOSYSTEM) return;
    const layers =
      filterLayer === 'all'
        ? window.ECOSYSTEM
        : window.ECOSYSTEM.filter((l) => l.layer.toLowerCase().includes(filterLayer.toLowerCase()));

    ecoContainer.innerHTML = layers
      .map((layer) => {
        const pkgs = layer.pkgs
          .map(
            (pkg) => `
            <div class="pkg">
              <div>
                <div class="pkg-top">
                  <a class="pkg-name" href="${window.GH}/${pkg.n}" target="_blank" rel="noopener">${esc(pkg.n)}</a>
                  ${pkg.v ? `<span class="pkg-ver">v${esc(pkg.v)}</span>` : ''}
                </div>
                <p>${esc(pkg.d)}</p>
              </div>
              <div class="pkg-foot">
                <span class="chip">${esc(pkg.tag || 'Python')}</span>
                <span>
                  <a href="${window.GH}/${pkg.n}" target="_blank" rel="noopener">GitHub</a>${pkg.v ? `<a href="https://pypi.org/project/${pkg.n}/" target="_blank" rel="noopener">PyPI</a>` : ''}
                </span>
              </div>
            </div>`
          )
          .join('');

        return `
          <div class="eco-layer reveal">
            <div class="eco-layer-head">${icon(LAYER_ICONS[layer.layer] || 'cpu')}<h4>${esc(layer.layer)}</h4></div>
            <div class="eco-pkgs">${pkgs}</div>
          </div>`;
      })
      .join('');

    paintIcons(ecoContainer);
    observeReveals();
  }

  if (tabsContainer) {
    tabsContainer.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        renderEcosystem(tab.getAttribute('data-filter') || 'all');
      });
    });
  }
  renderEcosystem('all');

  /* ---------- Copy pip command ---------- */
  const copyBtn = document.getElementById('copy-pip-cmd');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('pip install autourgos-agent autourgos-openaichat').then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = 'Copy'), 2000);
      }).catch(() => {});
    });
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.getElementById('nav-toggle-btn');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Contact form (opens email app) ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const msg = fd.get('message') || '';
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n${name}\n${email}`);
      window.location.href = `mailto:devxjitin@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Education photos: styled fallback when a photo is missing ---------- */
  document.querySelectorAll('.edu-art img').forEach((img) => {
    img.addEventListener('error', () => {
      const box = document.createElement('div');
      box.className = 'art-fallback';
      box.setAttribute('aria-hidden', 'true');
      box.textContent = img.getAttribute('data-fallback') || '';
      img.replaceWith(box);
    });
  });

  /* ---------- Photo lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg && typeof lightbox.showModal === 'function') {
    document.querySelectorAll('.shot').forEach((btn) => {
      btn.addEventListener('click', () => {
        const thumb = btn.querySelector('img');
        lightboxImg.src = btn.getAttribute('data-full');
        lightboxImg.alt = thumb ? thumb.alt : '';
        lightbox.showModal();
      });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.close();
    });
  }

  /* ---------- Sakura burst on click (fine pointers, motion allowed) ---------- */
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('click', (e) => {
      for (let i = 0; i < 6; i++) {
        const petal = document.createElement('span');
        const angle = (Math.PI * 2 * i) / 6 + Math.random() * 0.6;
        const dist = 26 + Math.random() * 22;
        petal.className = 'petal';
        petal.style.left = e.clientX + 'px';
        petal.style.top = e.clientY + 'px';
        petal.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
        petal.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
        petal.style.setProperty('--rot', Math.round(Math.random() * 240 - 120) + 'deg');
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 750);
      }
    });
  }

  /* ---------- Highlight the menu item for the section in view ---------- */
  const navAnchors = [...document.querySelectorAll('#nav-links a')];
  const spyTargets = navAnchors
    .map((a) => ({ a, section: document.querySelector(a.getAttribute('href')) }))
    .filter((t) => t.section);

  function updateActiveNav() {
    let current = null;
    spyTargets.forEach((t) => {
      if (t.section.getBoundingClientRect().top <= 140) current = t;
    });
    spyTargets.forEach((t) => {
      const on = t === current;
      t.a.classList.toggle('active', on);
      if (on) t.a.setAttribute('aria-current', 'true');
      else t.a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();

  paintIcons();
  observeReveals();
})();
