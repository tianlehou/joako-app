document.addEventListener("DOMContentLoaded", function () {
  const tabla = document.getElementById("miTabla");
  initScrollButtons(tabla);
});

export function initScrollButtons(tabla) {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  const scrollToBottomBtn = document.getElementById("scrollToBottomBtn");

  scrollToTopBtn.addEventListener("click", function () {
    // Selecciona la sección 'week-buttons-container'
    const weekSection = document.getElementById("month-buttons-container");

    if (weekSection) {
      weekSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  scrollToBottomBtn.addEventListener("click", function () {
    const footer = document.querySelector("footer");

    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  });
}
