const reveals = document.querySelectorAll(".reveal");
const modal = document.querySelector("#certificateModal");
const modalImage = document.querySelector("[data-modal-img]");
const modalClose = document.querySelector("[data-modal-close]");
const certificateButtons = document.querySelectorAll("[data-modal-image]");
const diplomaSlides = document.querySelectorAll("[data-diploma-slide]");
const diplomaDots = document.querySelectorAll("[data-diploma-dot]");
const diplomaPrev = document.querySelector("[data-diploma-prev]");
const diplomaNext = document.querySelector("[data-diploma-next]");
let currentDiplomaSlide = 0;

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

const showDiplomaSlide = (index) => {
  if (!diplomaSlides.length) {
    return;
  }

  currentDiplomaSlide = (index + diplomaSlides.length) % diplomaSlides.length;

  diplomaSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === currentDiplomaSlide);
  });

  diplomaDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentDiplomaSlide);
  });
};

diplomaPrev?.addEventListener("click", () => {
  showDiplomaSlide(currentDiplomaSlide - 1);
});

diplomaNext?.addEventListener("click", () => {
  showDiplomaSlide(currentDiplomaSlide + 1);
});

diplomaDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showDiplomaSlide(Number(dot.dataset.diplomaDot));
  });
});

certificateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.dataset.modalImage;
    const title = button.dataset.modalTitle || "Сертификат";

    if (!modal || !modalImage || !image) {
      return;
    }

    modalImage.src = image;
    modalImage.alt = title;
    modal.showModal();
  });
});

modalClose?.addEventListener("click", () => {
  modal?.close();
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
