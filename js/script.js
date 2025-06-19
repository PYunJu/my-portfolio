document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const highlight = document.querySelector(".highlight");
  const sections = document.querySelectorAll("section");

  let ignoreScroll = false; // 클릭 시 scroll-spy 잠깐 중단

  function moveHighlightTo(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.parentElement.getBoundingClientRect();

    highlight.style.width = `${rect.width}px`;
    highlight.style.left = `${rect.left - parentRect.left}px`;

    // 배경색 설정
    if (el.getAttribute("href") === "#home") {
      highlight.style.backgroundColor = "#ffffff";
    } else {
      highlight.style.backgroundColor = "#f3f4f6";
    }

    // 글자 강조 클래스 관리
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
        ignoreScroll = true;
        targetSection.scrollIntoView({ behavior: "smooth" });
        moveHighlightTo(link);

        setTimeout(() => {
          ignoreScroll = false;
        }, 500); // scroll-behavior: smooth와 맞춤
      }
    });
  });

  // 스크롤 이벤트 처리 (scroll-spy)
  window.addEventListener("scroll", () => {
    if (ignoreScroll) return;

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

  // 페이지 로드시 초기 하이라이트 위치 설정
  const initialLink = document.querySelector('.nav-links a[href="#home"]');
  if (initialLink) {
    moveHighlightTo(initialLink);
  }
});
