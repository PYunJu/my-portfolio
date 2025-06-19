document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const highlight = document.querySelector(".highlight");
  const sections = document.querySelectorAll("section");

  function moveHighlightTo(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.parentElement.getBoundingClientRect();

    highlight.style.width = `${rect.width}px`;
    highlight.style.left = `${rect.left - parentRect.left}px`;

    // 색상 처리
    if (el.getAttribute("href") === "#home") {
      highlight.style.backgroundColor = "#ffffff";
    } else {
      highlight.style.backgroundColor = "#f3f4f6";
    }

    // 글자 강조 처리
    navLinks.forEach(link => link.classList.remove("is-highlighted"));
    el.classList.add("is-highlighted");
  }

  // 클릭 이벤트 처리
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        moveHighlightTo(link);
      }
    });
  });

  // ✅ 스크롤 감지하여 highlight 자동 이동
  window.addEventListener("scroll", () => {
    let currentSectionId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 2) {
        currentSectionId = section.getAttribute("id");
      }
    });

    if (currentSectionId) {
      const activeLink = document.querySelector(`.nav-links a[href="#${currentSectionId}"]`);
      if (activeLink) {
        moveHighlightTo(activeLink);
      }
    }
  });

  // 처음 로딩 시 초기 위치 세팅
  const initialLink = document.querySelector('.nav-links a[href="#home"]');
  if (initialLink) {
    moveHighlightTo(initialLink);
  }
});
