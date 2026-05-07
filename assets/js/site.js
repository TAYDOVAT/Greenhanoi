const languageKey = "greenhanoi-lang";

function applyLanguage(lang) {
  document.documentElement.lang = lang === "en" ? "en" : "vi";
  document.querySelectorAll(".lang").forEach((node) => {
    const shouldShow = node.dataset.lang === lang;
    node.hidden = !shouldShow;
  });
  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(lang === "en"));
    button.textContent = lang === "vi" ? "VI / EN" : "EN / VI";
  });
  document.querySelectorAll("[data-label-vi][data-label-en]").forEach((node) => {
    node.textContent = lang === "en" ? node.dataset.labelEn : node.dataset.labelVi;
  });
}

function initLanguageToggle() {
  const stored = localStorage.getItem(languageKey);
  const lang = stored === "en" ? "en" : "vi";
  applyLanguage(lang);

  document.querySelectorAll("[data-lang-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next = document.documentElement.lang === "vi" ? "en" : "vi";
      localStorage.setItem(languageKey, next);
      applyLanguage(next);
    });
  });
}

function initMobileNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function markActiveNav() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-links] a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  items.forEach((item) => observer.observe(item));
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const errorNodes = {
    name: form.querySelector("[data-error-for='name']"),
    email: form.querySelector("[data-error-for='email']"),
    focus: form.querySelector("[data-error-for='focus']"),
    message: form.querySelector("[data-error-for='message']"),
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const currentLang = document.documentElement.lang === "en" ? "en" : "vi";
    const values = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      focus: form.elements.focus.value.trim(),
      message: form.elements.message.value.trim(),
    };

    let valid = true;
    Object.values(errorNodes).forEach((node) => { if (node) node.textContent = ""; });
    if (status) status.textContent = "";

    if (!values.name) {
      errorNodes.name.textContent = currentLang === "vi" ? "Vui lòng nhập tên." : "Please enter your name.";
      valid = false;
    }
    if (!validateEmail(values.email)) {
      errorNodes.email.textContent = currentLang === "vi" ? "Email chưa hợp lệ." : "Please enter a valid email.";
      valid = false;
    }
    if (!values.focus) {
      errorNodes.focus.textContent = currentLang === "vi" ? "Hãy chọn mục quan tâm." : "Please choose a focus area.";
      valid = false;
    }
    if (!values.message) {
      errorNodes.message.textContent = currentLang === "vi" ? "Vui lòng thêm lời nhắn ngắn." : "Please add a short message.";
      valid = false;
    }

    if (!valid) return;

    const subject = encodeURIComponent(`GreenHanoi | ${values.focus} | ${values.name}`);
    const body = encodeURIComponent(
      `${currentLang === "vi" ? "Tên" : "Name"}: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `${currentLang === "vi" ? "Quan tâm" : "Focus"}: ${values.focus}\n\n` +
      `${values.message}`
    );

    if (status) {
      status.textContent = currentLang === "vi"
        ? "Đang mở ứng dụng email để gửi thông tin tham gia."
        : "Opening your email app to send the join request.";
    }

    window.location.href = `mailto:hello@greenhanoi.io.vn?subject=${subject}&body=${body}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageToggle();
  initMobileNav();
  markActiveNav();
  initReveal();
  initContactForm();
});
