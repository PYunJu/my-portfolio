document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: { value: 60 }, // 별 개수 조금 더 많게
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.4 }, // 살짝 더 진하게
      size: { value: 2.5 },

      line_linked: {
        enable: true,
        distance: 120, // 선이 충분히 보이게
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },

      move: {
        enable: true,
        speed: 1.8, // 부드럽지만 흐르듯 움직이게
        direction: "none",
        out_mode: "out"
      }
    },

    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: { opacity: 0.6 }
        },
        push: { particles_nb: 4 }
      }
    },

    retina_detect: true
  });
});
