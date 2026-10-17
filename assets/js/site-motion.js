/* Site motion — built on Motion (motion.dev, MIT), bundled before this file.
   Apple-style: short distances, soft blur-in, one ease-out curve everywhere.
   Initial hidden states live in custom.css under html.motion-ready, which the
   inline head script only sets when the visitor hasn't asked for reduced motion. */
(function () {
  var root = document.documentElement;
  var M = window.Motion;
  window.__siteMotionStarted = true;

  if (!M || !root.classList.contains("motion-ready")) {
    root.classList.remove("motion-ready");
    initNetwork(true);
    return;
  }

  var animate = M.animate;
  var inView = M.inView;
  var stagger = M.stagger;
  var scroll = M.scroll;
  var EASE = [0.22, 1, 0.36, 1];

  /* --- Home hero and /links: staggered entrance, then the tagline types itself --- */
  var heroItems = document.querySelectorAll(".home-hero [data-hero], [data-links-item]");
  if (heroItems.length) {
    animate(
      heroItems,
      { opacity: [0, 1], y: [24, 0], filter: ["blur(8px)", "blur(0px)"] },
      { duration: 0.9, delay: stagger(0.12, { startDelay: 0.1 }), ease: EASE }
    );
    typeTagline(0.1 + 0.12 * heroItems.length + 0.3);
  }

  /* --- Scroll reveals --- */
  var revealSelector = [
    ".article-link--card",
    ".experience-item",
    ".stat-item",
    ".author",
    ".post-engagement",
    ".article-content > h2",
    ".article-content > h3",
    ".article-content > p > img",
    ".article-content > figure",
    ".article-content > blockquote",
    ".article-content > .admonition",
    "section > h2",
  ].join(",");

  // Elements already on screen animate together; the rest as they scroll in.
  // Siblings entering together are staggered by their position in the batch.
  var pending = [];
  var flushTimer = null;
  function flush() {
    var batch = pending;
    pending = [];
    flushTimer = null;
    animate(
      batch,
      { opacity: [0, 1], y: [28, 0], filter: ["blur(6px)", "blur(0px)"] },
      { duration: 0.8, delay: stagger(0.08), ease: EASE }
    );
  }

  document.querySelectorAll(revealSelector).forEach(function (el) {
    el.classList.add("reveal");
    inView(
      el,
      function () {
        pending.push(el);
        if (!flushTimer) flushTimer = setTimeout(flush, 30);
        if (el.classList.contains("stat-item")) countUp(el.querySelector(".stat-number"));
      },
      { margin: "0px 0px -10% 0px" }
    );
  });

  /* --- Reading progress on posts --- */
  var article = document.querySelector("article .article-content");
  if (article && document.body.querySelector("#single_header")) {
    var bar = document.createElement("div");
    bar.className = "reading-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    scroll(animate(bar, { scaleX: [0, 1] }, { ease: "linear" }), {
      target: article,
      offset: ["start start", "end end"],
    });
  }

  initNetwork(false);

  /* ---------------------------------------------------------------- */

  function typeTagline(startDelay) {
    var el = document.querySelector(".home-hero .typed");
    if (!el) return;
    var text = el.getAttribute("data-text") || el.textContent;
    el.textContent = "";
    var i = 0;
    setTimeout(function tick() {
      el.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, text.charAt(i - 1) === "·" ? 180 : 28);
    }, startDelay * 1000);
  }

  function countUp(el) {
    if (!el || el.dataset.counted) return;
    el.dataset.counted = "1";
    var match = el.textContent.trim().match(/^(\d+)(.*)$/);
    if (!match) return;
    var target = parseInt(match[1], 10);
    var suffix = match[2];
    animate(0, target, {
      duration: 1.4,
      ease: EASE,
      onUpdate: function (v) {
        el.textContent = Math.round(v) + suffix;
      },
    });
  }

  /* Node network: drifting nodes, links between neighbours, and blue
     "signals" travelling along links — the brand mark's node, in motion. */
  function initNetwork(staticOnly) {
    var canvas = document.querySelector(".hero-network");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, nodes = [], signals = [], running = false, raf = 0;
    var LINK = 150;

    function palette() {
      // /links is always on the ink background
      var dark = root.classList.contains("dark") || root.classList.contains("links-root");
      return {
        node: dark ? "rgba(226,232,240,0.55)" : "rgba(15,23,42,0.4)",
        link: dark ? "226,232,240" : "15,23,42",
        linkAlpha: dark ? 0.16 : 0.14,
        signal: dark ? "#60A5FA" : "#1D4ED8",
      };
    }
    var colors = palette();
    new MutationObserver(function () {
      colors = palette();
      if (!running) draw();
    }).observe(root, { attributes: true, attributeFilter: ["class"] });

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(56, Math.max(18, (W * H) / 12000)));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.4 + 1,
        });
      }
      signals = [];
      draw();
    }

    function neighbours(a) {
      var out = [];
      for (var j = 0; j < nodes.length; j++) {
        var b = nodes[j];
        if (a === b) continue;
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK) out.push(b);
      }
      return out;
    }

    function spawnSignal() {
      var a = nodes[(Math.random() * nodes.length) | 0];
      var n = neighbours(a);
      if (!n.length) return;
      signals.push({ from: a, to: n[(Math.random() * n.length) | 0], t: 0, hops: 3 });
    }

    function step() {
      for (var i = 0; i < nodes.length; i++) {
        var p = nodes[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (var k = signals.length - 1; k >= 0; k--) {
        var s = signals[k];
        s.t += 0.018;
        if (s.t >= 1) {
          var next = neighbours(s.to).filter(function (n) { return n !== s.from; });
          if (--s.hops > 0 && next.length) {
            s.from = s.to;
            s.to = next[(Math.random() * next.length) | 0];
            s.t = 0;
          } else {
            signals.splice(k, 1);
          }
        }
      }
      if (signals.length < 4 && Math.random() < 0.03) spawnSignal();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < nodes.length; i++) {
        var a = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
          var b = nodes[j];
          var d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = "rgba(" + colors.link + "," + colors.linkAlpha * (1 - d / LINK) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = colors.node;
      for (var n = 0; n < nodes.length; n++) {
        ctx.beginPath();
        ctx.arc(nodes[n].x, nodes[n].y, nodes[n].r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (var k = 0; k < signals.length; k++) {
        var s = signals[k];
        var x = s.from.x + (s.to.x - s.from.x) * s.t;
        var y = s.from.y + (s.to.y - s.from.y) * s.t;
        ctx.fillStyle = colors.signal;
        ctx.shadowColor = colors.signal;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function loop() {
      step();
      draw();
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || staticOnly) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    if (staticOnly) return;

    // Only animate while the hero is on screen and the tab is visible.
    var visible = true;
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible && !document.hidden ? start() : stop();
    }).observe(canvas);
    document.addEventListener("visibilitychange", function () {
      visible && !document.hidden ? start() : stop();
    });
    canvas.classList.add("is-live");
  }
})();
