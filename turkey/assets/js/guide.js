document.documentElement.classList.add('js');
const nav = document.querySelector('.story-nav');
const sections = [...document.querySelectorAll('.chapter')];
const links = [...document.querySelectorAll('.story-nav a[href^="#"]')];

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-25% 0px -65%', threshold: [0, .2, .5] });
  sections.forEach((section) => observer.observe(section));
}

document.querySelectorAll('.gallery').forEach((gallery) => {
  gallery.addEventListener('wheel', (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || event.ctrlKey) return;
    const atStart = gallery.scrollLeft <= 0;
    const atEnd = Math.ceil(gallery.scrollLeft + gallery.clientWidth) >= gallery.scrollWidth;
    if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;
    event.preventDefault();
    gallery.scrollLeft += event.deltaY;
  }, { passive: false });
});

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * .7), { passive: true });
