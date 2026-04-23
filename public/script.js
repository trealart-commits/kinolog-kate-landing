const reveals = document.querySelectorAll(".reveal");
const carousels = document.querySelectorAll("[data-carousel]");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

reveals.forEach((element, index) => {
  element.style.transitionDelay = `${index * 70}ms`;
  revealObserver.observe(element);
});

carousels.forEach((carousel) => {
  const track = carousel.querySelector("[data-carousel-track]");
  const prevButton = carousel.querySelector("[data-carousel-prev]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));

  if (!track || slides.length === 0) {
    return;
  }

  function getIndex() {
    const slideWidth = slides[0].getBoundingClientRect().width + 14;
    if (!slideWidth) {
      return 0;
    }

    return Math.round(track.scrollLeft / slideWidth);
  }

  function updateDots(index) {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  }

  function goTo(index) {
    const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
    slides[safeIndex].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    updateDots(safeIndex);
  }

  prevButton?.addEventListener("click", () => {
    goTo(getIndex() - 1);
  });

  nextButton?.addEventListener("click", () => {
    goTo(getIndex() + 1);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goTo(index);
    });
  });

  track.addEventListener("scroll", () => {
    updateDots(getIndex());
  });
});
