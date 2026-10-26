/* OSAMA RAMI — PORTFOLIO INTERACTIONS */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Light and dark theme
  const themeToggle = document.querySelector("#theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");

      const darkMode = body.classList.contains("dark-theme");

      themeToggle.textContent = darkMode ? "☀" : "☾";
      themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  // Arabic and English language switching
  const languageToggle = document.querySelector("#language-toggle");

  function applyLanguage(language) {
    const isArabic = language === "ar";

    body.dir = isArabic ? "rtl" : "ltr";
    body.lang = language;

    document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
      element.textContent = isArabic
        ? element.dataset.ar
        : element.dataset.en;
    });

    document.querySelectorAll("[data-ar-placeholder][data-en-placeholder]")
      .forEach((element) => {
        element.placeholder = isArabic
          ? element.dataset.arPlaceholder
          : element.dataset.enPlaceholder;
      });

    if (languageToggle) {
      languageToggle.textContent = isArabic ? "EN" : "عربي";
      languageToggle.setAttribute(
        "aria-label",
        isArabic ? "Switch to English" : "التبديل إلى العربية"
      );
    }

    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      const nextLanguage = body.lang === "ar" ? "en" : "ar";
      applyLanguage(nextLanguage);
    });
  }

  // Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter || "all";

      projectCards.forEach((card) => {
        const category = card.dataset.category || "";
        const show = filter === "all" || category === filter;

        card.hidden = !show;
      });
    });
  });

  // Reveal sections as they enter the viewport
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Contact form: open WhatsApp with the prepared message
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const subject = contactForm.querySelector('[name="subject"]');
      const message = contactForm.querySelector('[name="message"]');

      const nameValue = name ? name.value.trim() : "";
      const emailValue = email ? email.value.trim() : "";
      const subjectValue = subject ? subject.value.trim() : "";
      const messageValue = message ? message.value.trim() : "";

      const text = [
        "Hello Osama, I would like to discuss a project.",
        "",
        `Name: ${nameValue}`,
        `Email: ${emailValue}`,
        `Project: ${subjectValue}`,
        `Message: ${messageValue}`
      ].join("\n");

      /*
       * Replace 967XXXXXXXXX with Osama's real WhatsApp number.
       * Include the country code, without + or spaces.
       */
      const whatsappNumber = "967XXXXXXXXX";

      if (whatsappNumber.includes("X")) {
        alert(
          body.lang === "ar"
            ? "نموذج التواصل جاهز، لكن يجب إضافة رقم واتساب أسامة الحقيقي في ملف script.js أولاً."
            : "The contact form is ready, but Osama's real WhatsApp number must be added to script.js first."
        );
        return;
      }

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(text);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
  }

  // Back to top
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Highlight the current navigation section
  const sections = document.querySelectorAll("main section[id]");
  const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          sectionLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // Current year in the footer
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Start in Arabic
  applyLanguage("ar");
});
