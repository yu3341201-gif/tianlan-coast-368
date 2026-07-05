const c = window.SITE_CONTENT;
const main = document.querySelector("main");

const trackEvent = (action, label) => {
  window._hmt = window._hmt || [];
  window._hmt.push(["_trackEvent", "website", action, label]);
};

// Mobile browsers (including WeChat) may restore a previous scroll offset on load.
// Force fresh page opens to start at the hero section.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

const resetInitialScroll = () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
};

window.addEventListener("pageshow", resetInitialScroll);
requestAnimationFrame(resetInitialScroll);

const factRows = c.facts.map(([label, value, note]) => `
  <div class="fact"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join("");
const highlights = c.highlights.map(x => `
  <article class="highlight"><span>${x.n}</span><h3>${x.title}</h3><p>${x.text}</p></article>`).join("");
const audiences = c.audiences.map(([title, text]) => `
  <article class="audience"><h3>${title}</h3><p>${text}</p></article>`).join("");
const cooperation = c.cooperation.items.map((x, i) =>
  `<li${i === 1 || i === 4 ? ' class="cooperation-highlight"' : ""}>${x}</li>`
).join("");
const priceRows = c.price.map(([title, text], i) => `
  <div class="strategy-row${i === 3 ? " strategy-highlight" : ""}"><strong>${title}</strong><p>${text}</p></div>`).join("");
const showing = c.showing.map(([title, text], i) => `
  <div class="step"><span>0${i + 1}</span><div><h3>${title}</h3><p>${text}</p></div></div>`).join("");

main.innerHTML = `
  <section class="hero">
    <div class="river-lines"></div>
    <div class="hero-copy">
      <p class="eyebrow">${c.hero.eyebrow}</p>
      <h1>${c.hero.title}</h1>
      <p class="hero-subtitle">${c.hero.subtitle}</p>
      <p class="hero-intro">${c.hero.intro}</p>
      <div class="tags">${c.hero.tags.map(t => `<span>${t}</span>`).join("")}</div>
    </div>
    <div class="hero-note">${c.hero.note}</div>
    <a class="scroll" href="#overview">向下探索 <i></i></a>
  </section>

  <section id="overview" class="section facts-wrap">
    <div class="section-heading">
      <p class="eyebrow dark">RESIDENCE PROFILE</p>
      <h2>房源概览</h2>
      <p>城市核心江岸，一套兼顾尺度、景观与生活质感的改善型住宅。</p>
    </div>
    <div class="facts">${factRows}</div>
  </section>

  <section class="positioning">
    <div class="positioning-copy">
      <p class="eyebrow">${c.positioning.kicker}</p>
      <h2>${c.positioning.title}</h2>
      <p>${c.positioning.body}</p>
      <div class="metrics">${c.positioning.metrics.map(([n,l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join("")}</div>
    </div>
    <div class="vista" aria-hidden="true"><div class="sun"></div><div class="skyline"></div><div class="water"></div></div>
  </section>

  <section class="project-entry">
    <div class="project-entry-copy">
      <p class="eyebrow">ABOUT THE COMMUNITY</p>
      <h2>不止一线江景<br>更是一座完整社区</h2>
      <p>从滨水区位、建筑立面，到园林、公区与归家动线，进一步了解天澜海岸的项目价值。</p>
      <a href="project.html">了解天澜海岸 <span>→</span></a>
    </div>
  </section>

  <section id="highlights" class="section">
    <div class="section-heading split">
      <div><p class="eyebrow dark">DISTINCTIVE VALUES</p><h2>六大核心价值</h2></div>
      <p>从第一眼的江景，到长期居住的舒适与从容，每一个细节都服务于真正的改善生活。</p>
    </div>
    <div class="highlight-grid">${highlights}</div>
  </section>

  <section class="audience-section">
    <div class="section-heading light">
      <p class="eyebrow">IDEAL RESIDENTS</p><h2>适合怎样的客户</h2>
    </div>
    <div class="audience-grid">${audiences}</div>
  </section>

  <section id="cooperation" class="section cooperation-section">
    <div class="cooperation-card">
      <div><p class="eyebrow dark">OPEN COOPERATION</p><h2>${c.cooperation.title}</h2></div>
      <ul>${cooperation}</ul>
    </div>
    <div class="section-heading split strategy-title">
      <div><p class="eyebrow dark">PRICING STRATEGY</p><h2>价格沟通口径</h2></div>
      <p>建议经纪人统一沟通口径，避免房东底价在市场中过度传播。</p>
    </div>
    <div class="strategy">${priceRows}</div>
  </section>

  <section class="showing-section">
    <div class="section-heading light">
      <p class="eyebrow">PRIVATE VIEWING</p><h2>预约带看流程</h2>
    </div>
    <div class="steps">${showing}</div>
  </section>

  <section id="contact" class="contact-section">
    <p class="eyebrow dark">CONTACT</p>
    <h2>预约一场江岸私享带看</h2>
    <p class="contact-note">${c.contact.note}</p>
    <div class="contact-grid">
      <div><span>业主</span><strong>${c.contact.owner}</strong></div>
      <div><span>电话</span><strong>${c.contact.phone}</strong></div>
      <div><span>微信</span><strong>${c.contact.wechat}</strong></div>
    </div>
    <p class="disclaimer">${c.disclaimer}</p>
  </section>`;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".section-heading, .fact, .highlight, .audience, .step, .strategy-row").forEach(el => observer.observe(el));

document.addEventListener("click", event => {
  const link = event.target.closest("a[href]");
  if (!link) return;

  const target = link.getAttribute("href");
  if (target === "#contact") {
    trackEvent("contact_entry_click", link.textContent.trim());
  } else if (target?.startsWith("#")) {
    trackEvent("navigation_click", target);
  }
});

const contactSection = document.querySelector("#contact");
if (contactSection) {
  const contactObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      trackEvent("contact_section_view", "contact");
      contactObserver.disconnect();
    }
  }, { threshold: 0.5 });
  contactObserver.observe(contactSection);
}

const reachedDepths = new Set();
const trackScrollDepth = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return;

  const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
  [25, 50, 75, 100].forEach(mark => {
    if (depth >= mark && !reachedDepths.has(mark)) {
      reachedDepths.add(mark);
      trackEvent("scroll_depth", `${mark}%`);
    }
  });
};

window.addEventListener("scroll", trackScrollDepth, { passive: true });
trackScrollDepth();
