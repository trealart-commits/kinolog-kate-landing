const reveals = document.querySelectorAll(".reveal");
const modal = document.querySelector("#certificateModal");
const modalImage = document.querySelector("[data-modal-img]");
const modalClose = document.querySelector("[data-modal-close]");
const certificateButtons = document.querySelectorAll("[data-modal-image]");

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
