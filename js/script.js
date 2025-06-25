// ✅ nav 하이라이트 및 클릭 이동
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a");
  const highlight = document.querySelector(".highlight");
  const sections = document.querySelectorAll("section");

  let ignoreScroll = false;
  let targetIdFromClick = null;

  function moveHighlightTo(el) {
    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement.parentElement.getBoundingClientRect();

    highlight.style.width = `${rect.width}px`;
    highlight.style.left = `${rect.left - parentRect.left}px`;

    if (el.getAttribute("href") === "#home") {
      highlight.style.backgroundColor = "#ffffff";
    } else {
      highlight.style.backgroundColor = "#f3f4f6";
    }

    navLinks.forEach(link => link.classList.remove("is-highlighted"));
    el.classList.add("is-highlighted");
  }

  // ✅ 메뉴 클릭 시 즉시 반응 + scroll 중에는 spy 중단
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        ignoreScroll = true;
        targetIdFromClick = targetId;

        targetSection.scrollIntoView({ behavior: "smooth" });
        moveHighlightTo(link); // ✅ 즉시 하이라이트 이동

        setTimeout(() => {
          ignoreScroll = false;
          targetIdFromClick = null;
        }, 600); // 스크롤 애니메이션 종료 이후 다시 활성화
      }
    });
  });

  // ✅ scroll spy
  window.addEventListener("scroll", () => {
    if (ignoreScroll) return;

    let currentSectionId = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY + window.innerHeight / 2 >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // ✅ 클릭으로 이동 중이면 중복 moveHighlight 방지
    if (currentSectionId && currentSectionId !== targetIdFromClick) {
      const activeLink = document.querySelector(`.nav-links a[href="#${currentSectionId}"]`);
      if (activeLink) {
        moveHighlightTo(activeLink);
      }
    }
  });

  // ✅ 첫 로딩 시 초기 하이라이트
  const initialLink = document.querySelector('.nav-links a[href="#home"]');
  if (initialLink) {
    moveHighlightTo(initialLink);
  }
});


// ✅ skills 섹션 애니메이션
window.addEventListener("load", () => {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.skills-block').forEach(block => {
      observer.observe(block);
    });
  }, 800); // 스크롤 애니메이션 안정화 후 실행
});
