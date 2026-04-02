/* ===== SPARKLES ===== */
function createSparkles() {
  const container = document.getElementById("sparkle-container");
  for (let i = 0; i < 30; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${1.5 + Math.random() * 2.5}s;
      --delay: ${Math.random() * 3}s;
      width: ${2 + Math.random() * 4}px;
      height: ${2 + Math.random() * 4}px;
    `;
    container.appendChild(s);
  }
}
createSparkles();

/* ===== AIRPLANE ANIMATION ===== */
function animateAirplane() {
  const group = document.getElementById("airplane-group");
  const path = document.getElementById("flight-path");

  // Get path length
  const length = path.getTotalLength();
  let startTime = null;
  const duration = 4000; // ms
  const delay = 600;

  setTimeout(() => {
    group.style.opacity = "1";
    function step(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      const pt = path.getPointAtLength(eased * length);

      // Calculate angle from tangent
      const ptAhead = path.getPointAtLength(
        Math.min((eased + 0.01) * length, length),
      );
      const angle =
        (Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * 180) / Math.PI;

      group.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
      document
        .getElementById("airplane")
        .setAttribute("transform", `rotate(${angle})`);

      if (progress < 1) requestAnimationFrame(step);
      else group.style.opacity = "0";
    }
    requestAnimationFrame(step);
  }, delay);
}
animateAirplane();

/* ===== STAMPS ===== */
setTimeout(() => {
  document.getElementById("stamp1").classList.add("show");
}, 800);
setTimeout(() => {
  document.getElementById("stamp2").classList.add("show");
}, 1600);
setTimeout(() => {
  document.getElementById("stamp3").classList.add("show");
}, 2400);

/* ===== INTRO → MAIN TRANSITION ===== */
setTimeout(() => {
  const intro = document.getElementById("intro");
  const main = document.getElementById("main-page");
  intro.classList.add("fade-out");
  main.classList.add("visible");

  // Trigger hero fade-ins
  document.querySelectorAll(".hero .fade-in").forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), 200 + i * 150);
  });

  // Start music
  const music = document.getElementById("bg-music");
  music.volume = 0;
  music.play().catch(() => {});
  let vol = 0;
  const fadeIn = setInterval(() => {
    vol = Math.min(vol + 0.02, 0.35);
    music.volume = vol;
    if (vol >= 0.35) clearInterval(fadeIn);
  }, 150);
}, 5800);

/* ===== SCROLL FADE-IN ===== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".fade-in:not(.hero .fade-in)")
  .forEach((el) => observer.observe(el));

/* ===== MUSIC TOGGLE ===== */
let musicMuted = false;
function toggleMusic() {
  const music = document.getElementById("bg-music");
  const btn = document.getElementById("music-btn");
  musicMuted = !musicMuted;
  music.muted = musicMuted;
  btn.textContent = musicMuted ? "♪̶" : "♪";
  btn.classList.toggle("muted", musicMuted);
  btn.title = musicMuted ? "Unmute Music" : "Mute Music";
}
