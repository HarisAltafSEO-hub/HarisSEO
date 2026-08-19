// scripts.js - small helpers: hamburger + optional tilt
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.nav-links');
  if (btn && menu) {
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
      btn.classList.toggle('active');
    });
  }

  // Pointer tilt (desktop only, respects reduced-motion)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.package-card, .card-3d').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rotateY = (px - 0.5) * 8; // degrees
        const rotateX = (0.5 - py) * 6;
        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
      card.addEventListener('pointerdown', () => card.style.transform = 'translateY(-4px) scale(1.01)');
      card.addEventListener('pointerup', () => card.style.transform = '');
    });
  }
});
