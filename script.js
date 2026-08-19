(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nodes = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((n) => n.classList.add("in"));
    return;
  }

  const reveal = (el) => {
    el.classList.add("in");
    io.unobserve(el);
  };

  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  nodes.forEach((n) => {
    // Experience & Projects sit on row 2 in the desktop grid — reveal on load
    // so they don't stay hidden until the user scrolls.
    if (n.id === "experience" || n.id === "projects" || isInViewport(n)) {
      reveal(n);
    } else {
      io.observe(n);
    }
  });

  // Subtle notebook "page open" on first paint
  requestAnimationFrame(() => {
    document.querySelector(".notebook")?.classList.add("ready");
  });
})();
