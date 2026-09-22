(() => {
  "use strict";

  const pages = [...document.querySelectorAll("[data-page]")];
  const routeLinks = [...document.querySelectorAll("[data-route]")];
  const navLinks = [...document.querySelectorAll(".primary-nav [data-route]")];
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  const dialog = document.querySelector(".chart-dialog");
  const dialogImage = dialog.querySelector("img");
  const toast = document.querySelector(".toast");
  const validRoutes = new Set(pages.map((page) => page.id));
  let lastChartButton = null;

  function getRoute() {
    const route = window.location.hash.replace("#", "").split("/")[0];
    return validRoutes.has(route) ? route : "home";
  }

  function showPage(route, options = {}) {
    const target = validRoutes.has(route) ? route : "home";
    pages.forEach((page) => {
      const active = page.id === target;
      page.hidden = !active;
      page.classList.toggle("is-active", active);
    });
    navLinks.forEach((link) => {
      if (link.dataset.route === target) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector(".sr-only").textContent = "Open navigation";

    if (options.scroll !== false) window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `${target === "home" ? "Australian TV Energy Explorer" : target === "televisions" ? "Television Findings" : "About the Project"} | POWER`;

    const scrollTarget = options.scrollTarget;
    if (scrollTarget) {
      requestAnimationFrame(() => document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  routeLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const route = link.dataset.route;
      const scrollTarget = link.dataset.scrollTarget;
      event.preventDefault();
      if (window.location.hash === `#${route}`) showPage(route, { scrollTarget });
      else {
        window.location.hash = route;
        if (scrollTarget) setTimeout(() => document.getElementById(scrollTarget)?.scrollIntoView({ behavior: "smooth" }), 80);
      }
    });
  });

  window.addEventListener("hashchange", () => showPage(getRoute()));

  menuButton.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      document.querySelectorAll(".finding-card").forEach((card) => {
        card.classList.toggle("is-filtered", filter !== "all" && card.dataset.category !== filter);
      });
      const count = [...document.querySelectorAll(".finding-card:not(.is-filtered)")].length;
      toast.textContent = `${count} finding${count === 1 ? "" : "s"} shown`;
      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
    });
  });

  document.querySelectorAll(".chart-switcher button").forEach((button) => {
    button.addEventListener("click", () => {
      const visual = button.closest(".finding-visual");
      const image = visual.querySelector(".chart-open img");
      visual.querySelectorAll(".chart-switcher button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      image.src = button.dataset.chart;
      image.alt = button.dataset.alt;
    });
  });

  document.querySelectorAll(".chart-open").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      lastChartButton = button;
      dialogImage.src = image.src;
      dialogImage.alt = image.alt;
      dialog.showModal();
      document.body.classList.add("dialog-open");
    });
  });

  function closeDialog() {
    dialog.close();
    document.body.classList.remove("dialog-open");
    lastChartButton?.focus();
  }

  dialog.querySelector(".dialog-close").addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

  document.querySelector("#footer-year").textContent = String(new Date().getFullYear());
  showPage(getRoute(), { scroll: false });
})();
