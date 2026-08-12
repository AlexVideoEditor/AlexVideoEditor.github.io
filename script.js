const faqAnswers = {
  "What types of videos do you edit?":
    "Short-form social content, YouTube videos, talking-head content, podcasts and educational videos.",
  "Do you work with clients outside Poland?":
    "Yes. I work remotely with English-speaking creators, founders and agencies, and I'm comfortable across time zones.",
  "Can we start with one video?":
    "Yes. Most collaborations begin with a single paid test edit so you can judge the quality before committing to anything recurring.",
  "How do I send the footage?":
    "Google Drive, Dropbox, Frame.io or WeTransfer — whatever you already use. I'll confirm a folder structure that keeps things simple.",
  "How many revisions are included?":
    "Two rounds of revisions are included by default. Larger reworks are agreed on before I start so there are no surprises.",
  "Can you match our existing editing style?":
    "Yes. Send references or previous videos and I'll match the pacing, captions, graphics and overall look.",
  "Do you provide white-label editing for agencies?":
    "Yes. I deliver unbranded project files and exports that your team can publish under its own name.",
};

function youtubeEmbedUrl(url) {
  const match = url.match(/(?:youtu\.be\/|shorts\/|v=)([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1` : url;
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.setAttribute("data-visible", "true"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-visible", "true");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.08 },
  );

  elements.forEach((element) => observer.observe(element));
}

function setupHeader() {
  const header = document.querySelector("header");
  const menuButton = header?.querySelector('button[aria-label="Open menu"]');
  const desktopNav = header?.querySelector("nav");
  if (!header || !menuButton || !desktopNav) return;

  const mobileNav = document.createElement("nav");
  mobileNav.className = "mobile-nav";
  mobileNav.setAttribute("aria-label", "Mobile navigation");
  mobileNav.innerHTML = desktopNav.innerHTML;
  header.append(mobileNav);

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    mobileNav.classList.toggle("is-open", !open);
  });

  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupWorkFilters() {
  const tabs = [...document.querySelectorAll('#work [role="tab"]')];
  const cards = [...document.querySelectorAll("#work ul > li")];
  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.textContent.trim();

      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute("aria-selected", String(active));
        item.classList.toggle("active-filter", active);
      });

      cards.forEach((card) => {
        const category = card.querySelector("article button span")?.textContent.trim();
        const visible = selected === "All" || category === selected;
        card.hidden = !visible;
      });
    });
  });
}

function setupVideoModal() {
  const modal = document.createElement("div");
  modal.className = "video-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="video-modal__backdrop" data-close-modal></div>
    <div class="video-modal__dialog" role="dialog" aria-modal="true" aria-label="Video preview">
      <button class="video-modal__close" type="button" aria-label="Close video" data-close-modal>×</button>
      <div class="video-modal__frame"><iframe title="Portfolio video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
    </div>`;
  document.body.append(modal);

  const iframe = modal.querySelector("iframe");
  const close = () => {
    modal.hidden = true;
    iframe.src = "";
    document.body.classList.remove("modal-open");
  };

  modal.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", close));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) close();
  });

  document.querySelectorAll('#work article button[aria-label^="Play "]').forEach((button) => {
    button.addEventListener("click", () => {
      const link = button.closest("article")?.querySelector('a[target="_blank"]');
      if (!link) return;
      iframe.src = youtubeEmbedUrl(link.href);
      modal.hidden = false;
      document.body.classList.add("modal-open");
      modal.querySelector(".video-modal__close").focus();
    });
  });
}

function setupFaq() {
  document.querySelectorAll("#faq h3 > button").forEach((button) => {
    const answer = faqAnswers[button.textContent.trim()];
    const item = button.closest("h3")?.parentElement;
    const region = item?.querySelector('[role="region"]');
    if (!answer || !region) return;

    region.innerHTML = `<p class="faq-answer">${answer}</p>`;
    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll("#faq h3 > button").forEach((other) => {
        const otherRegion = other.closest("h3")?.parentElement?.querySelector('[role="region"]');
        other.setAttribute("aria-expanded", "false");
        other.setAttribute("data-state", "closed");
        other.closest("h3")?.setAttribute("data-state", "closed");
        other.closest("h3")?.parentElement?.setAttribute("data-state", "closed");
        if (otherRegion) {
          otherRegion.hidden = true;
          otherRegion.setAttribute("data-state", "closed");
        }
      });

      if (!open) {
        button.setAttribute("aria-expanded", "true");
        button.setAttribute("data-state", "open");
        item.setAttribute("data-state", "open");
        button.closest("h3")?.setAttribute("data-state", "open");
        region.hidden = false;
        region.setAttribute("data-state", "open");
      }
    });
  });
}

setupRevealAnimations();
setupHeader();
setupWorkFilters();
setupVideoModal();
setupFaq();

