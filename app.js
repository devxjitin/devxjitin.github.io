/**
 * ANIME CYBERPUNK PORTFOLIO SCRIPT
 * Jitin Kumar Sengar (devxjitin) · Agentic AI Engineer
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Web Audio API Synthesizer (Zero-Dependency Anime UI Sounds)
     ========================================================================== */
  let audioCtx = null;
  let sfxEnabled = false;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type = 'sine', duration = 0.08, vol = 0.05) {
    if (!sfxEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  const sfx = {
    hover: () => playTone(900, 'sine', 0.04, 0.02),
    click: () => {
      playTone(520, 'sine', 0.06, 0.06);
      setTimeout(() => playTone(880, 'sine', 0.08, 0.05), 40);
    },
    toggle: () => {
      playTone(400, 'triangle', 0.05, 0.05);
      setTimeout(() => playTone(720, 'triangle', 0.08, 0.05), 50);
    },
    chime: () => {
      playTone(587.33, 'sine', 0.1, 0.05); // D5
      setTimeout(() => playTone(880, 'sine', 0.12, 0.05), 80); // A5
      setTimeout(() => playTone(1174.66, 'sine', 0.18, 0.06), 160); // D6
    }
  };

  const sfxToggleBtn = document.getElementById('sfx-toggle');
  if (sfxToggleBtn) {
    sfxToggleBtn.addEventListener('click', () => {
      initAudio();
      sfxEnabled = !sfxEnabled;
      sfxToggleBtn.classList.toggle('active', sfxEnabled);
      sfxToggleBtn.innerHTML = sfxEnabled ? '🔊 SFX: ON' : '🔇 SFX: OFF';
      if (sfxEnabled) sfx.chime();
    });
  }

  /* ==========================================================================
     2. Canvas Atmosphere Particle System (Sakura & Cyber Sparks)
     ========================================================================== */
  const canvas = document.getElementById('anime-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let currentMode = 'sakura'; // 'sakura' | 'cyber' | 'cosmos'
    const mouse = { x: width / 2, y: height / 2, vx: 0, vy: 0, lastX: width / 2, lastY: height / 2 };

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.x = mouse.lastX = e.clientX;
      mouse.y = mouse.lastY = e.clientY;
    });

    // Sakura Petal Object
    class SakuraPetal {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * -100;
        this.size = Math.random() * 8 + 8; // 8 - 16px
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.02 - 0.01;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = Math.random() * 0.03 + 0.01;
        this.opacity = Math.random() * 0.4 + 0.45;
        this.color = Math.random() > 0.4 ? '#ff79af' : '#ffb3d0';
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.angle) * 0.5;
        this.angle += this.angleSpeed;
        this.flip += this.flipSpeed;

        // Mouse breeze influence
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 3;
          this.y += (dy / dist) * force * 3;
        }

        if (this.y > height + 20 || this.x < -40 || this.x > width + 40) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(Math.cos(this.flip), 1);
        ctx.globalAlpha = this.opacity;

        // Draw delicate sakura petal path
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size / 1.5, this.size / 2, 0, this.size);
        ctx.bezierCurveTo(-this.size / 1.5, this.size / 2, -this.size / 2, -this.size / 2, 0, -this.size / 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Cyber Energy Spark Object
    class CyberSpark {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.color = Math.random() > 0.5 ? '#00f0ff' : '#ff388b';
        this.alpha = Math.random() * 0.7 + 0.3;
        this.life = Math.random() * 80 + 40;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life--;
        if (this.life <= 0 || this.y < -10) this.reset();
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha * (this.life / 80);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = Array.from({ length: 42 }, () => new SakuraPetal());
    const sparks = Array.from({ length: 55 }, () => new CyberSpark());

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      if (currentMode === 'sakura') {
        petals.forEach((p) => {
          p.update();
          p.draw();
        });
      } else if (currentMode === 'cyber') {
        sparks.forEach((s) => {
          s.update();
          s.draw();
        });
      } else {
        // Cosmos mode: gentle twinkling stars
        ctx.save();
        sparks.slice(0, 30).forEach((s) => {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = Math.sin(Date.now() * 0.003 + s.x) * 0.4 + 0.4;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      requestAnimationFrame(renderParticles);
    }
    renderParticles();

    // Atmosphere Mode Switcher
    const modeBtn = document.getElementById('particle-mode-btn');
    if (modeBtn) {
      modeBtn.addEventListener('click', () => {
        initAudio();
        sfx.toggle();
        if (currentMode === 'sakura') {
          currentMode = 'cyber';
          modeBtn.innerHTML = '⚡ CYBER';
        } else if (currentMode === 'cyber') {
          currentMode = 'cosmos';
          modeBtn.innerHTML = '🌌 COSMOS';
        } else {
          currentMode = 'sakura';
          modeBtn.innerHTML = '🌸 SAKURA';
        }
      });
    }
  }

  /* ==========================================================================
     3. Custom Anime Cursor
     ========================================================================== */
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorRing = document.querySelector('.custom-cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function loopCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(loopCursor);
    }
    loopCursor();

    const hoverTargets = 'a, button, input, textarea, .filter-tab, .stat-node, .mission-card, .eco-pkg-card';
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        sfx.hover();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  /* ==========================================================================
     4. Dual Avatar Switcher (Photo vs Anime Avatar)
     ========================================================================== */
  const photoView = document.getElementById('avatar-photo');
  const animeView = document.getElementById('avatar-anime');
  const btnPhoto = document.getElementById('btn-view-photo');
  const btnAnime = document.getElementById('btn-view-anime');

  if (btnPhoto && btnAnime && photoView && animeView) {
    btnPhoto.addEventListener('click', () => {
      initAudio();
      sfx.toggle();
      btnPhoto.classList.add('active');
      btnAnime.classList.remove('active');
      photoView.classList.add('active');
      animeView.classList.remove('active');
    });

    btnAnime.addEventListener('click', () => {
      initAudio();
      sfx.toggle();
      btnAnime.classList.add('active');
      btnPhoto.classList.remove('active');
      animeView.classList.add('active');
      photoView.classList.remove('active');
    });
  }

  /* ==========================================================================
     5. 3D Parallax Tilt for Avatar Pod & Cards
     ========================================================================== */
  const holoPod = document.querySelector('.avatar-holo-pod');
  if (holoPod) {
    holoPod.addEventListener('mousemove', (e) => {
      const rect = holoPod.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / (rect.height / 2)) * -10;
      const rotY = (x / (rect.width / 2)) * 10;
      holoPod.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });

    holoPod.addEventListener('mouseleave', () => {
      holoPod.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  /* ==========================================================================
     6. Live Agent Trace Terminal HUD (Typewriter Simulation)
     ========================================================================== */
  const termBody = document.getElementById('agent-terminal-content');
  if (termBody) {
    const traces = [
      { tag: 'INIT', cls: '', text: 'Autourgos Agent runtime initialized with LLM fallback pipeline.' },
      { tag: 'THOUGHT', cls: 'thought', text: 'Target requested: Build multimodal AI agent with vision, memory & tools.' },
      { tag: 'ACTION', cls: 'action', text: 'invoke("autourgos-cua-screenshot-understanding", viewport="1920x1080")' },
      { tag: 'OBS', cls: 'obs', text: 'Spatial target located at coordinate (x: 1420, y: 780). Accuracy: 99.8%.' },
      { tag: 'ACTION', cls: 'action', text: 'invoke("autourgos-live", stream="audio/websocket", latency="240ms")' },
      { tag: 'ANSWER', cls: 'ans', text: 'Autonomous loop verified. 17 PyPI modules active with zero stdlib external deps.' }
    ];

    let traceIdx = 0;
    function printNextTrace() {
      if (traceIdx < traces.length) {
        const item = traces[traceIdx];
        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = `<span class="term-tag ${item.cls}">[${item.tag}]</span> <span>${item.text}</span>`;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
        traceIdx++;
        setTimeout(printNextTrace, 1400);
      } else {
        // Loop after a brief pause
        setTimeout(() => {
          termBody.innerHTML = '';
          traceIdx = 0;
          printNextTrace();
        }, 5000);
      }
    }
    setTimeout(printNextTrace, 800);
  }

  /* ==========================================================================
     7. Render Featured Projects & Auxiliary Missions
     ========================================================================== */
  function esc(s) {
    return String(s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  const featContainer = document.getElementById('featured-missions-list');
  if (featContainer && window.PROJECTS) {
    const featuredProjects = window.PROJECTS.filter((p) => p.featured);
    const CAMPUS_IMG = 'https://raw.githubusercontent.com/devxjitin/CampusGrade/main/docs/screenshots/02-teacher-home.png';

    featContainer.innerHTML = featuredProjects
      .map((p, idx) => {
        const decisionsHtml = p.decisions
          ? `<details class="mission-dossier-details"><summary>MISSION ARCHITECTURE &amp; KEY DECISIONS</summary>
               <div class="dossier-drawer-body">
                 ${p.problem ? `<h5>[ PROBLEM STATEMENT ]</h5><p>${esc(p.problem)}</p>` : ''}
                 <h5>[ ARCHITECTURAL DECISIONS ]</h5>
                 <ul>${p.decisions.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
               </div>
             </details>`
          : '';

        const tagsHtml = `<div class="mission-tags">${(p.stack || [])
          .map((t) => `<span class="anime-tag">${esc(t)}</span>`)
          .join('')}</div>`;

        const actionsHtml = `
          <div class="mission-actions">
            ${p.repo ? `<a class="cyber-btn primary" href="${p.repo}" target="_blank" rel="noopener">SOURCE REPO ↗</a>` : ''}
            ${p.pypi ? `<a class="cyber-btn secondary" href="${p.pypi}" target="_blank" rel="noopener">PYPI PACKAGE ↗</a>` : ''}
            ${p.site ? `<a class="cyber-btn outline" href="${p.site}" target="_blank" rel="noopener">LIVE APP ↗</a>` : ''}
            ${p.private ? `<span class="cyber-btn outline" style="opacity: 0.7; cursor: default;">🔒 PRIVATE ARCHIVE</span>` : ''}
          </div>
        `;

        const visualHtml =
          p.slug === 'campusgrade'
            ? `<div class="mission-visual"><img class="mission-visual-img" src="${CAMPUS_IMG}" alt="CampusGrade Interface" loading="lazy"></div>`
            : `<div class="mission-visual">
                 <div class="mission-visual-art">
                   <div class="mission-sigil">${esc(p.name.substring(0, 2).toUpperCase())}</div>
                   <div class="mission-badge-floater">MISSION // ${esc(p.slug.toUpperCase())}</div>
                 </div>
               </div>`;

        return `
          <article class="mission-card reveal-item" data-tier="${p.tier}">
            <div class="mission-info">
              <div class="mission-tier-row">
                <span class="tier-badge ${p.tier.toLowerCase()}">${p.tier} CLASS</span>
                <span class="mission-jp-tag">${esc(p.jpName || '自律開発')}</span>
              </div>
              <h3 class="mission-title">${esc(p.name)}</h3>
              <p class="mission-pitch">${esc(p.built || p.pitch)}</p>
              ${tagsHtml}
              ${decisionsHtml}
              ${actionsHtml}
            </div>
            ${visualHtml}
          </article>
        `;
      })
      .join('');
  }

  // Auxiliary Missions Grid
  const auxContainer = document.getElementById('aux-missions-grid');
  if (auxContainer && window.PROJECTS) {
    const auxProjects = window.PROJECTS.filter((p) => !p.featured);
    auxContainer.innerHTML = auxProjects
      .map((p) => {
        const stackTags = (p.stack || []).map((t) => `<span class="anime-tag">${esc(t)}</span>`).join('');
        const links = [
          p.repo ? `<a class="cyber-btn primary" style="padding: 6px 14px; font-size: 11px;" href="${p.repo}" target="_blank" rel="noopener">REPO</a>` : '',
          p.site ? `<a class="cyber-btn outline" style="padding: 6px 14px; font-size: 11px;" href="${p.site}" target="_blank" rel="noopener">SITE</a>` : ''
        ].join('');

        return `
          <div class="aux-card reveal-item">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                <span class="tier-badge ${p.tier.toLowerCase()}" style="font-size: 10px;">${p.tier}</span>
                <span style="font-family: var(--font-jp); font-size: 11px; color: var(--cyan);">${esc(p.jpName || '')}</span>
              </div>
              <h4>${esc(p.name)}</h4>
              <p>${esc(p.pitch)}</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div class="mission-tags">${stackTags}</div>
              <div style="display: flex; gap: 8px;">${links}</div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  /* ==========================================================================
     8. Render Autourgos Ecosystem Matrix & Filter Tabs
     ========================================================================== */
  const ecoContainer = document.getElementById('ecosystem-layers-list');
  const tabsContainer = document.getElementById('eco-filter-tabs');

  function renderEcosystem(filterLayer = 'all') {
    if (!ecoContainer || !window.ECOSYSTEM) return;

    const layersToDisplay =
      filterLayer === 'all'
        ? window.ECOSYSTEM
        : window.ECOSYSTEM.filter((l) => l.layer.toLowerCase().includes(filterLayer.toLowerCase()));

    ecoContainer.innerHTML = layersToDisplay
      .map((layer) => {
        const pkgsHtml = layer.pkgs
          .map((pkg) => {
            return `
              <div class="eco-pkg-card">
                <div>
                  <div class="pkg-header-row">
                    <a class="pkg-name-link" href="${window.GH}/${pkg.n}" target="_blank" rel="noopener">${esc(pkg.n)}</a>
                    ${pkg.v ? `<span class="pkg-ver-badge">v${pkg.v}</span>` : ''}
                  </div>
                  <p class="pkg-desc-text">${esc(pkg.d)}</p>
                </div>
                <div class="pkg-footer-row">
                  <span class="pkg-tag-pill">${esc(pkg.tag || 'Python')}</span>
                  <div class="pkg-action-links">
                    <a href="${window.GH}/${pkg.n}" target="_blank" rel="noopener">GitHub ↗</a>
                    ${pkg.v ? `<a href="https://pypi.org/project/${pkg.n}/" target="_blank" rel="noopener">PyPI ↗</a>` : ''}
                  </div>
                </div>
              </div>
            `;
          })
          .join('');

        return `
          <div class="eco-layer-block reveal-item">
            <div class="eco-layer-head">
              <div class="eco-layer-title">
                <span>${layer.icon}</span>
                <span>${esc(layer.layer)}</span>
              </div>
              <span class="eco-layer-jp">${esc(layer.jpLayer)}</span>
            </div>
            <div class="eco-pkgs-grid">${pkgsHtml}</div>
          </div>
        `;
      })
      .join('');

    observeReveals();
  }

  if (tabsContainer) {
    tabsContainer.querySelectorAll('.filter-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        initAudio();
        sfx.click();
        tabsContainer.querySelectorAll('.filter-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter') || 'all';
        renderEcosystem(filter);
      });
    });
  }

  renderEcosystem('all');

  /* ==========================================================================
     9. Pip Command Copy with Confetti / Anime Reaction
     ========================================================================== */
  const copyPipBtn = document.getElementById('copy-pip-cmd');
  if (copyPipBtn) {
    copyPipBtn.addEventListener('click', () => {
      initAudio();
      sfx.chime();
      const codeText = 'pip install autourgos-agent';
      navigator.clipboard.writeText(codeText).then(() => {
        copyPipBtn.innerHTML = 'COPIED! ✨';
        copyPipBtn.style.background = 'var(--magenta)';
        copyPipBtn.style.color = '#fff';
        setTimeout(() => {
          copyPipBtn.innerHTML = 'COPY 📋';
          copyPipBtn.style.background = '';
          copyPipBtn.style.color = '';
        }, 2200);
      });
    });
  }

  /* ==========================================================================
     10. Animated Counter Numbers
     ========================================================================== */
  function animateValue(elem, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      elem.innerText = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        elem.innerText = end;
      }
    };
    window.requestAnimationFrame(step);
  }

  const statVals = document.querySelectorAll('.counter-val');
  let animatedStats = false;
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !animatedStats) {
          animatedStats = true;
          statVals.forEach((el) => {
            const target = parseInt(el.getAttribute('data-target') || '0', 10);
            animateValue(el, 0, target, 1400);
          });
        }
      });
    },
    { threshold: 0.2 }
  );

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  /* ==========================================================================
     11. Scroll Reveal Animations
     ========================================================================== */
  function observeReveals() {
    const items = document.querySelectorAll('.reveal-item:not(.revealed)');
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
  observeReveals();

  /* ==========================================================================
     12. Mobile Menu Toggle
     ========================================================================== */
  const navToggleBtn = document.getElementById('nav-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (navToggleBtn && mobileDrawer) {
    navToggleBtn.addEventListener('click', () => {
      initAudio();
      sfx.click();
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     13. Contact Form Submission
     ========================================================================== */
  const contactForm = document.getElementById('transmission-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      initAudio();
      sfx.chime();
      const fd = new FormData(contactForm);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const msg = fd.get('message') || '';

      const subject = encodeURIComponent(`[TRANSMISSION] Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`${msg}\n\n// IDENTIFIER:\nName: ${name}\nEmail: ${email}`);

      window.location.href = `mailto:devxjitin@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
