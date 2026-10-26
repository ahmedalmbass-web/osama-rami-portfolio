
/* OSAMA RAMI — PORTFOLIO INTERACTIONS */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // Mobile navigation
  const menuToggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#mainNav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
      });
    });
  }

  // Light / dark theme
  const themeToggle = document.querySelector("#themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-theme");

      const isDark = body.classList.contains("dark-theme");
      themeToggle.innerHTML = isDark ? "☾" : "☼";
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "تفعيل المظهر الفاتح" : "تفعيل المظهر الداكن"
      );
    });
  }

  // Arabic / English
  const languageToggle = document.querySelector("#languageToggle");

  function applyLanguage(language) {
    const isArabic = language === "ar";

    body.lang = language;
    body.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.documentElement.dir = body.dir;

    document.querySelectorAll("[data-ar][data-en]").forEach((element) => {
      if (element.querySelector("br")) {
        element.innerHTML = isArabic
          ? element.dataset.ar
          : element.dataset.en;
      } else {
        element.textContent = isArabic
          ? element.dataset.ar
          : element.dataset.en;
      }
    });

    if (languageToggle) {
      const arLabel = languageToggle.querySelector(".lang-ar");
      const enLabel = languageToggle.querySelector(".lang-en");

      if (arLabel) arLabel.classList.toggle("active", isArabic);
      if (enLabel) enLabel.classList.toggle("active", !isArabic);

      languageToggle.setAttribute(
        "aria-label",
        isArabic ? "Switch language to English" : "التبديل إلى العربية"
      );
    }
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      applyLanguage(body.lang === "ar" ? "en" : "ar");
    });
  }

  // Real contact links
  const whatsappNumber = "967770893447";
  const emailAddress = "som770893447.123@gmail.com";

  const contactButton = document.querySelector("#contactButton");

  if (contactButton) {
    contactButton.href = `https://wa.me/${whatsappNumber}`;
    contactButton.target = "_blank";
    contactButton.rel = "noopener noreferrer";
  }

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.href = `mailto:${emailAddress}`;
    link.textContent = emailAddress;
  });

  // Back-to-top links, if present
  document.querySelectorAll(".back-to-top").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Current year
  const year = document.querySelector("#currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Start in Arabic
  applyLanguage("ar");
});
