(() => {
  const DEFAULT_CONFIG = {
    cols: 90,
    rows: 30,
    paddleHeight: 6,
    winScore: 7,
    baseBallSpeed: 30, // cells/sec
    speedRamp: 1.05, // per rally
    aiMaxSpeed: 36, // cells/sec
    aiReactionMs: 60,
    levelEveryRallies: 6,
    levelEverySeconds: 18,
    bannerDurationMs: 1600,
    showBorder: true,
    showTime: false,
    ballChar: "Ξ",
    trailChar: ".",
    maxBounceAngleDeg: 60,
    spinStartLevel: 11,
    spinMaxDeg: 8,
    levelNames: [
      "Genesis",
      "The DAO",
      "ICO Boom",
      "DeFi Summer",
      "Lunatics",
      "The Merge",
      "FTX Collapse",
      "Blob City",
      "Memecoin Mania",
      "DAT Summer",
      "Stablecoins, really?",
      "ZK-ify everything",
      "Quantum Resistance",
      "Ossification",
      "Finality",
      "What are you still doing here?",
    ],
  };

  const STATE = {
    ATTRACT: "ATTRACT",
    PLAYING: "PLAYING",
    PAUSED: "PAUSED",
    GAMEOVER: "GAMEOVER",
  };

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function fitText(text, maxLen) {
    if (text.length <= maxLen) return text;
    if (maxLen <= 3) return text.slice(0, maxLen);
    return text.slice(0, maxLen - 3) + "...";
  }

  function mergeConfig(a, b) {
    const out = { ...a };
    if (!b) return out;
    Object.keys(b).forEach((k) => {
      if (b[k] !== undefined) out[k] = b[k];
    });
    return out;
  }

  function initPongHero(containerOrSelector, userConfig) {
    const config = mergeConfig(DEFAULT_CONFIG, userConfig);
    const container =
      typeof containerOrSelector === "string"
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;

    if (!container) return { destroy: () => {} };

    const card = document.createElement("div");
    card.className = "pong-hero-card";
    card.tabIndex = 0;

    const inner = document.createElement("div");
    inner.className = "pong-hero-inner";

    const pre = document.createElement("pre");
    pre.className = "pong-hero-pre";
    pre.setAttribute("aria-label", "Terminal pong");

    inner.appendChild(pre);
    card.appendChild(inner);
    container.appendChild(card);

    let state = STATE.ATTRACT;
    let lastTs = 0;
    let raf = 0;
    let level = 1;
    let rally = 0;
    let elapsed = 0;
    let lastLevelAt = 0;
    let levelBannerUntil = 0;
    let startHoldUntil = 0;
    let aiTargetY = 0;
    let lastAiUpdate = 0;
    let pausedByVisibility = false;
    let active = false;
    let pointerActive = false;
    let destroyed = false;

    const keys = { up: false, down: false };

    const dims = {
      cols: config.cols,
      rows: config.rows,
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      leftX: 0,
      rightX: 0,
    };

    const ball = { x: 0, y: 0, vx: 0, vy: 0, speed: config.baseBallSpeed, px: 0, py: 0 };
    const paddleL = { y: 0, vy: 0 };
    const paddleR = { y: 0, vy: 0 };
    const score = { l: 0, r: 0 };
    let loseOnce = false;

    function setupDimensions() {
      dims.cols = config.cols;
      dims.rows = config.rows;
      const border = config.showBorder ? 1 : 0;
      dims.minX = border;
      dims.maxX = dims.cols - 1 - border;
      dims.minY = border;
      dims.maxY = dims.rows - 1 - border;
      dims.leftX = dims.minX + 1;
      dims.rightX = dims.maxX - 1;
    }

    function resizeToFit() {
      const w = inner.clientWidth;
      const cell = Math.max(2, Math.floor(w / config.cols));
      pre.style.fontSize = `${cell}px`;
      pre.style.lineHeight = `${cell}px`;
    }

    function resetBall(dir = 1) {
      ball.x = Math.floor((dims.minX + dims.maxX) / 2);
      ball.y = Math.floor((dims.minY + dims.maxY) / 2);
      ball.px = ball.x;
      ball.py = ball.y;
      const angle = (Math.random() * 0.6 - 0.3) * Math.PI;
      ball.speed = config.baseBallSpeed * (1 + (level - 1) * 0.08);
      ball.vx = Math.cos(angle) * ball.speed * dir;
      ball.vy = Math.sin(angle) * ball.speed;
    }

    function resetRound(dir = 1) {
      paddleL.y = Math.floor((dims.minY + dims.maxY) / 2);
      paddleR.y = paddleL.y;
      paddleL.vy = 0;
      paddleR.vy = 0;
      rally = 0;
      resetBall(dir);
    }

    function resetGame() {
      score.l = 0;
      score.r = 0;
      loseOnce = false;
      level = 1;
      elapsed = 0;
      lastLevelAt = 0;
      levelBannerUntil = 0;
      startHoldUntil = 0;
      resetRound(Math.random() > 0.5 ? 1 : -1);
    }

    function setState(next) {
      state = next;
      card.dataset.state = next;
      active = next === STATE.PLAYING;
    }

    function addLevel(now) {
      level = Math.min(level + 1, config.levelNames.length);
      levelBannerUntil = now + config.bannerDurationMs;
    }

    function maybeLevelUp(now) {
      const byRally = config.levelEveryRallies > 0 && rally > 0 && rally % config.levelEveryRallies === 0;
      const byTime =
        config.levelEverySeconds > 0 &&
        Math.floor((elapsed - lastLevelAt) / config.levelEverySeconds) >= 1;
      if (byRally || byTime) {
        lastLevelAt = elapsed;
        addLevel(now);
      }
    }

    function updateAi(dt, now) {
      if (now - lastAiUpdate > config.aiReactionMs) {
        aiTargetY = ball.y;
        lastAiUpdate = now;
      }
      const diff = aiTargetY - paddleR.y;
      const maxStep = (config.aiMaxSpeed + level * 2) * dt;
      paddleR.y += clamp(diff, -maxStep, maxStep);
      paddleR.y = clamp(paddleR.y, dims.minY + 1, dims.maxY - 1);
    }

    function updatePlayer(dt) {
      const speed = 30;
      let vy = 0;
      if (keys.up) vy -= speed;
      if (keys.down) vy += speed;
      paddleL.y += vy * dt;
      paddleL.y = clamp(paddleL.y, dims.minY + 1, dims.maxY - 1);
    }

    function stepBall(dt) {
      ball.px = ball.x;
      ball.py = ball.y;
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      if (ball.y <= dims.minY + 1) {
        ball.y = dims.minY + 1;
        ball.vy *= -1;
      } else if (ball.y >= dims.maxY - 1) {
        ball.y = dims.maxY - 1;
        ball.vy *= -1;
      }

      const paddleHalf = Math.floor(config.paddleHeight / 2);
      const leftTop = paddleL.y - paddleHalf;
      const leftBottom = paddleL.y + paddleHalf;
      const rightTop = paddleR.y - paddleHalf;
      const rightBottom = paddleR.y + paddleHalf;

      if (ball.vx < 0 && ball.x <= dims.leftX + 1) {
        if (ball.y >= leftTop && ball.y <= leftBottom) {
          ball.x = dims.leftX + 1;
          const rel = (ball.y - paddleL.y) / paddleHalf;
          const clamped = clamp(rel, -1, 1);
          const baseAngle = (config.maxBounceAngleDeg * Math.PI / 180) * clamped;
          const spin =
            level >= config.spinStartLevel
              ? ((Math.random() * 2 - 1) * config.spinMaxDeg * Math.PI) / 180
              : 0;
          const angle = baseAngle + spin;
          const speed = Math.max(config.baseBallSpeed, Math.hypot(ball.vx, ball.vy)) * config.speedRamp;
          ball.vx = Math.cos(angle) * speed;
          ball.vy = Math.sin(angle) * speed;
          rally += 1;
          maybeLevelUp(performance.now());
        }
      } else if (ball.vx > 0 && ball.x >= dims.rightX - 1) {
        if (ball.y >= rightTop && ball.y <= rightBottom) {
          ball.x = dims.rightX - 1;
          const rel = (ball.y - paddleR.y) / paddleHalf;
          const clamped = clamp(rel, -1, 1);
          const baseAngle = (config.maxBounceAngleDeg * Math.PI / 180) * clamped;
          const spin =
            level >= config.spinStartLevel
              ? ((Math.random() * 2 - 1) * config.spinMaxDeg * Math.PI) / 180
              : 0;
          const angle = baseAngle + spin;
          const speed = Math.max(config.baseBallSpeed, Math.hypot(ball.vx, ball.vy)) * config.speedRamp;
          ball.vx = -Math.cos(angle) * speed;
          ball.vy = Math.sin(angle) * speed;
          rally += 1;
          maybeLevelUp(performance.now());
        }
      }

      if (ball.x < dims.minX) {
        score.r += 1;
        loseOnce = true;
      } else if (ball.x > dims.maxX) {
        score.l += 1;
        resetRound(-1);
      }

      if (loseOnce || score.l >= config.winScore) {
        setState(STATE.GAMEOVER);
        active = false;
      }
    }

    function drawText(grid, x, y, text) {
      if (y < 0 || y >= grid.length) return;
      const row = grid[y];
      for (let i = 0; i < text.length; i++) {
        const xi = x + i;
        if (xi >= 0 && xi < row.length) row[xi] = text[i];
      }
    }

    function render() {
      const grid = Array.from({ length: dims.rows }, () => Array(dims.cols).fill(" "));

      if (config.showBorder) {
        for (let x = 0; x < dims.cols; x++) {
          grid[0][x] = "-";
          grid[dims.rows - 1][x] = "-";
        }
        for (let y = 0; y < dims.rows; y++) {
          grid[y][0] = "|";
          grid[y][dims.cols - 1] = "|";
        }
        grid[0][0] = "+";
        grid[0][dims.cols - 1] = "+";
        grid[dims.rows - 1][0] = "+";
        grid[dims.rows - 1][dims.cols - 1] = "+";
      }

      const hudY = config.showBorder ? 1 : 0;
      const levelText = `EPOCH ${level}`;
      const rallyText = `NONCE ${rally}`;
      const gasGwei = Math.max(1, Math.round(8 + (ball.speed - config.baseBallSpeed) * 1.5 + level * 1.2));
      const gasText = `GAS ${gasGwei} gwei`;
      const timeText = config.showTime ? `TIME ${Math.floor(elapsed)}s` : "";
      let hudX = dims.minX + 2;
      drawText(grid, hudX, hudY, levelText);
      hudX += levelText.length + 3;
      drawText(grid, hudX, hudY, rallyText);
      hudX += rallyText.length + 3;
      drawText(grid, hudX, hudY, gasText);
      hudX += gasText.length + 3;
      if (timeText) drawText(grid, hudX, hudY, timeText);

      if (state === STATE.ATTRACT) {
        const lines = ["ETH-PONG//A HISTORY LESSON", "CLICK TO START"];
        const startY = Math.floor(dims.rows / 2) - 1;
        lines.forEach((line, i) => {
          const x = Math.floor((dims.cols - line.length) / 2);
          drawText(grid, x, startY + i, line);
        });
      } else if (state === STATE.GAMEOVER) {
        const lines = [loseOnce ? "YOU LOSE" : "YOU WIN", "CLICK TO RESTART"];
        const startY = Math.floor(dims.rows / 2) - 1;
        lines.forEach((line, i) => {
          const x = Math.floor((dims.cols - line.length) / 2);
          drawText(grid, x, startY + i, line);
        });
      } else {
        const paddleHalf = Math.floor(config.paddleHeight / 2);
        for (let i = -paddleHalf; i <= paddleHalf; i++) {
          const yL = clamp(Math.round(paddleL.y) + i, dims.minY + 1, dims.maxY - 1);
          const yR = clamp(Math.round(paddleR.y) + i, dims.minY + 1, dims.maxY - 1);
          grid[yL][dims.leftX] = "|";
          grid[yR][dims.rightX] = "|";
        }

        const bx = clamp(Math.round(ball.x), dims.minX + 1, dims.maxX - 1);
        const by = clamp(Math.round(ball.y), dims.minY + 1, dims.maxY - 1);
        const pBx = clamp(Math.round(ball.px), dims.minX + 1, dims.maxX - 1);
        const pBy = clamp(Math.round(ball.py), dims.minY + 1, dims.maxY - 1);
        if (config.trailChar && (pBx !== bx || pBy !== by)) {
          grid[pBy][pBx] = config.trailChar;
        }
        grid[by][bx] = config.ballChar;

        if (state === STATE.PAUSED) {
          const text = "PAUSED";
          const x = Math.floor((dims.cols - text.length) / 2);
          const y = Math.floor(dims.rows / 2);
          drawText(grid, x, y, text);
        }

        if (levelBannerUntil > performance.now()) {
          const banner = `== EPOCH ${level} ==`;
          const nameRaw = (config.levelNames[level - 1] || "").toUpperCase();
          const name = fitText(nameRaw, dims.cols - 4);
          const x = Math.floor((dims.cols - banner.length) / 2);
          const y = Math.floor(dims.rows / 2) - 2;
          drawText(grid, x, y, banner);
          if (name) {
            const x2 = Math.floor((dims.cols - name.length) / 2);
            drawText(grid, x2, y + 1, name);
          }
        }
      }

      pre.textContent = grid.map((r) => r.join("")).join("\n");
    }

    function step(ts) {
      if (destroyed) return;
      if (!lastTs) lastTs = ts;
      const dt = Math.min(0.04, (ts - lastTs) / 1000);
      lastTs = ts;

      if (state === STATE.PLAYING) {
        elapsed += dt;
        updatePlayer(dt);
        updateAi(dt, ts);
        if (startHoldUntil && ts < startHoldUntil) {
          render();
        } else {
          startHoldUntil = 0;
          stepBall(dt);
        }
      }

      render();
      raf = requestAnimationFrame(step);
    }

    function handleStart() {
      if (state === STATE.ATTRACT || state === STATE.GAMEOVER) {
        resetGame();
        setState(STATE.PLAYING);
        startHoldUntil = performance.now() + 1200;
        levelBannerUntil = startHoldUntil;
      } else if (state === STATE.PAUSED) {
        setState(STATE.PLAYING);
      }
    }

    function handlePauseToggle() {
      if (state === STATE.PLAYING) {
        setState(STATE.PAUSED);
      } else if (state === STATE.PAUSED) {
        setState(STATE.PLAYING);
      }
    }

    function onKeyDown(e) {
      const key = (e.key || "").toLowerCase();
      const isFocus = document.activeElement === card;
      if (!active && !isFocus) return;
      if (key === "w" || key === "arrowup") {
        keys.up = true;
        e.preventDefault();
      } else if (key === "s" || key === "arrowdown") {
        keys.down = true;
        e.preventDefault();
      } else if (key === " ") {
        if (state !== STATE.ATTRACT) handlePauseToggle();
        e.preventDefault();
      }
    }

    function onKeyUp(e) {
      const key = (e.key || "").toLowerCase();
      const isFocus = document.activeElement === card;
      if (!active && !isFocus) return;
      if (key === "w" || key === "arrowup") {
        keys.up = false;
        e.preventDefault();
      } else if (key === "s" || key === "arrowdown") {
        keys.down = false;
        e.preventDefault();
      }
    }

    function setPaddleFromPointer(clientY) {
      const rect = pre.getBoundingClientRect();
      const rel = clamp(clientY - rect.top, 0, rect.height);
      const y = dims.minY + (rel / rect.height) * (dims.maxY - dims.minY);
      paddleL.y = clamp(y, dims.minY + 1, dims.maxY - 1);
    }

    function onPointerMove(e) {
      if (!active && state === STATE.ATTRACT) return;
      if (!pointerActive && e.pointerType !== "mouse") return;
      setPaddleFromPointer(e.clientY);
    }

    function onPointerDown(e) {
      pointerActive = true;
      card.focus();
      active = true;
      handleStart();
      setPaddleFromPointer(e.clientY);
    }

    function onPointerUp() {
      pointerActive = false;
    }

    function onMouseMove(e) {
      if (!active) return;
      setPaddleFromPointer(e.clientY);
    }

    function onVisibility() {
      if (document.hidden && state === STATE.PLAYING) {
        pausedByVisibility = true;
        setState(STATE.PAUSED);
      } else if (!document.hidden && pausedByVisibility) {
        pausedByVisibility = false;
      }
    }

    let observer = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && state === STATE.PLAYING) {
            setState(STATE.PAUSED);
          }
        });
      });
      observer.observe(card);
    }

    setupDimensions();
    resizeToFit();
    resetGame();
    render();
    raf = requestAnimationFrame(step);

    card.addEventListener("click", handleStart);
    card.addEventListener("pointerdown", onPointerDown);
    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerup", onPointerUp);
    card.addEventListener("pointercancel", onPointerUp);
    card.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer = 0;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeToFit();
        render();
      }, 120);
    });

    function destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      card.removeEventListener("click", handleStart);
      card.removeEventListener("pointerdown", onPointerDown);
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerup", onPointerUp);
      card.removeEventListener("pointercancel", onPointerUp);
      card.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("visibilitychange", onVisibility);
      if (observer) observer.disconnect();
      if (card.parentNode === container) container.removeChild(card);
    }

    return { destroy };
  }

  function autoInit() {
    const el = document.querySelector("#pong-hero");
    if (el) {
      initPongHero(el);
      return;
    }
    requestAnimationFrame(autoInit);
  }

  window.initPongHero = initPongHero;
  window.addEventListener("load", autoInit, { once: true });
})();
