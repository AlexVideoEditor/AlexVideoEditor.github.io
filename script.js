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

function prepareSalesContent() {
  const brandMark = document.querySelector('header a[href="#top"] > span:first-child');
  if (brandMark) {
    brandMark.className = "brand-avatar";
    brandMark.textContent = "";
    const avatar = document.createElement("img");
    avatar.src = "Alex_Avatar.jpg";
    avatar.alt = "";
    avatar.setAttribute("aria-hidden", "true");
    avatar.width = 256;
    avatar.height = 256;
    brandMark.append(avatar);
  }

  const hero = document.querySelector("#top");
  if (hero && !document.querySelector(".trust-strip")) {
    const proof = document.createElement("div");
    proof.className = "trust-strip";
    proof.setAttribute("aria-label", "Experience and collaboration details");
    proof.innerHTML = `
      <div><strong>3+ years</strong><span>Professional experience</span></div>
      <div><strong>1,000+</strong><span>Completed videos</span></div>
      <div><strong>Paid test</strong><span>Before a retainer</span></div>
      <div><strong>100% async</strong><span>No call required</span></div>`;
    hero.insertAdjacentElement("afterend", proof);
  }

  const cards = [...document.querySelectorAll("#work ul > li")];
  const cardByTitle = (title) => cards.find((card) => card.querySelector("h3")?.textContent.trim() === title);
  const updateCard = (currentTitle, { title, description, url, image, alt, width, height }) => {
    const card = cardByTitle(currentTitle);
    if (!card) return;
    const heading = card.querySelector("h3");
    const paragraph = card.querySelector("h3 + p");
    const link = card.querySelector('a[target="_blank"]');
    const button = card.querySelector('button[aria-label^="Play "]');
    const img = card.querySelector("img");
    if (heading && title) heading.textContent = title;
    if (paragraph && description) paragraph.textContent = description;
    if (link && url) link.href = url;
    if (button && title) button.setAttribute("aria-label", `Play ${title}`);
    if (img && image) img.src = image;
    if (img && alt) img.alt = alt;
    if (img && width) img.width = width;
    if (img && height) img.height = height;
  };

  updateCard("Meta Ad", {
    title: "High-Ticket Meta Ad",
    description: "Campaign edit that helped generate 10+ qualified leads.",
    image: "assets/High_Ticket_Meta_Ad.jpg",
    alt: "High-Ticket Meta Ad — Short-form edit still frame",
    width: 717,
    height: 1200,
  });
  updateCard("Dietitian Reel Series", {
    title: "Dietitian Reel Series",
    description: "Recurring educational reels for a nutrition expert.",
  });
  updateCard("Legal Content Reel", {
    title: "Expert Content Reel",
    description: "Clean, branded short-form for an expert-led account.",
  });
  updateCard("Local Business Reel", {
    title: "Local Business Reel",
    description: "Short-form promotional edit for a local service business.",
    image: "assets/Local_Business_Reel.jpg",
    alt: "Local Business Reel — Short-form edit still frame",
    width: 705,
    height: 1200,
  });
  updateCard("Finance YouTube Video", {
    title: "Finance YouTube Video",
    description: "Talking-head editing for a finance YouTube channel.",
  });
  updateCard("Animated Documentary", {
    title: "Animated Documentary",
    description: "Long-form documentary with custom motion graphics.",
    image: "assets/Animated_Documentary.jpg",
    alt: "Animated Documentary — YouTube edit still frame",
    width: 1600,
    height: 893,
  });
  updateCard("Beauty Brand Collaboration", {
    title: "Beauty Brand Collaboration",
    description: "Sponsored short-form content for a beauty brand.",
  });

  const workList = document.querySelector("#work ul");
  if (workList && !cardByTitle("Glovo Branded Series")) {
    const localBusinessCard = cardByTitle("Local Business Reel");
    const glovoCard = localBusinessCard?.cloneNode(true);
    if (glovoCard) {
      glovoCard.querySelector("h3").textContent = "Glovo Branded Series";
      glovoCard.querySelector("h3 + p").textContent =
        "Recurring branded content delivered for an agency and Glovo.";
      glovoCard.querySelector('a[target="_blank"]').href = "https://www.youtube.com/shorts/re1KmohkZFw";
      glovoCard.querySelector('button[aria-label^="Play "]').setAttribute("aria-label", "Play Glovo Branded Series");
      const glovoImage = glovoCard.querySelector("img");
      glovoImage.src = "assets/Glovo_Branded_Series.jpg";
      glovoImage.alt = "Glovo Branded Series — Agency edit still frame";
      glovoImage.width = 719;
      glovoImage.height = 1200;
      glovoCard.querySelector("article button span").textContent = "Agency";
      workList.append(glovoCard);
    }
  }

  const filterRow = document.querySelector('#work [role="tablist"]');
  if (filterRow && ![...filterRow.querySelectorAll('[role="tab"]')].some((tab) => tab.textContent.trim() === "Agency")) {
    const templateTab = filterRow.querySelector('[role="tab"]:last-child');
    const agencyTab = templateTab?.cloneNode(true);
    if (agencyTab) {
      agencyTab.textContent = "Agency";
      agencyTab.setAttribute("aria-selected", "false");
      filterRow.append(agencyTab);
    }
  }

  const preferredOrder = [
    "High-Ticket Meta Ad",
    "Dietitian Reel Series",
    "Finance YouTube Video",
    "Glovo Branded Series",
    "Expert Content Reel",
    "Local Business Reel",
    "Animated Documentary",
    "Beauty Brand Collaboration",
  ];
  if (workList) {
    preferredOrder.forEach((title) => {
      const card = [...workList.children].find((item) => item.querySelector("h3")?.textContent.trim() === title);
      if (card) workList.append(card);
    });
  }

  const contact = document.querySelector("#contact");
  const contactHeading = contact?.querySelector("h2");
  const contactCopy = contactHeading?.nextElementSibling;
  const contactCards = contact?.querySelectorAll("a");
  if (contactHeading) contactHeading.textContent = "Ready to hand off the editing?";
  if (contactCopy) {
    contactCopy.textContent =
      "Send me what you create, how many videos you publish each month and one style reference. I’ll suggest the right paid test — no call required.";
  }
  if (contactCards?.[0]) {
    contactCards[0].href =
      "mailto:kontakt@olekzmontuje.pl?subject=Paid%20test%20edit&body=Hi%20Alex%2C%0A%0AI%20create%3A%20%0AVideos%20per%20month%3A%20%0AStyle%20reference%3A%20%0AAnything%20else%3A%20";
    const labels = contactCards[0].querySelectorAll("span span");
    if (labels[0]) labels[0].textContent = "Email project details";
    if (labels[1]) labels[1].textContent = "Best for scope and references";
  }
  if (contactCards?.[1]) {
    const labels = contactCards[1].querySelectorAll("span span");
    if (labels[0]) labels[0].textContent = "Send an Instagram DM";
    if (labels[1]) labels[1].textContent = "Best for a quick first message";
  }
}

function setupVslSection() {
  const workSection = document.querySelector("#work");
  if (!workSection || document.querySelector("#intro-video")) return;

  const section = document.createElement("section");
  section.id = "intro-video";
  section.className = "vsl-section";
  section.setAttribute("aria-labelledby", "intro-video-title");
  section.innerHTML = `
    <div class="vsl-section__inner">
      <div class="vsl-section__heading reveal" data-visible="false">
        <span class="section-label">Start here</span>
        <h2 id="intro-video-title">Looking for the right video editor?</h2>
        <p>Watch this short introduction to my editing style, experience and the way I work with clients.</p>
      </div>
      <div class="vsl-player reveal" data-visible="false" style="transition-delay:80ms">
        <button class="vsl-player__facade" type="button" aria-label="Play introduction video">
          <img
            src="https://i.ytimg.com/vi/y8yAQte7oi0/maxresdefault.jpg"
            alt="Introduction to Alex's video editing services"
            width="1280"
            height="720"
            loading="lazy"
          >
          <span class="vsl-player__shade" aria-hidden="true"></span>
          <span class="vsl-player__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"></path>
            </svg>
          </span>
        </button>
      </div>
    </div>`;

  workSection.insertAdjacentElement("beforebegin", section);

  section.querySelector(".vsl-player__facade")?.addEventListener("click", (event) => {
    const facade = event.currentTarget;
    const iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/y8yAQte7oi0?autoplay=1&rel=0";
    iframe.title = "Meet Alex — professional video editor";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    facade.replaceWith(iframe);
  });
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

  const featuredTitles = new Set([
    "High-Ticket Meta Ad",
    "Dietitian Reel Series",
    "Finance YouTube Video",
    "Glovo Branded Series",
  ]);
  let expanded = false;
  const mobileQuery = window.matchMedia("(max-width: 767px)");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "work-toggle";
  toggle.textContent = "View all 8 projects";
  document.querySelector("#work ul")?.insertAdjacentElement("afterend", toggle);

  let currentFilter = "All";
  const render = (selected) => {
    currentFilter = selected;
    cards.forEach((card) => {
      const category = card.querySelector("article button span")?.textContent.trim();
      const title = card.querySelector("h3")?.textContent.trim();
      const matchesCategory = selected === "All" || category === selected;
      const passesLimit = selected !== "All" || !mobileQuery.matches || expanded || featuredTitles.has(title);
      card.hidden = !matchesCategory || !passesLimit;
    });
    toggle.hidden = selected !== "All" || !mobileQuery.matches;
    toggle.textContent = expanded ? "Show featured work" : "View all 8 projects";
  };

  toggle.addEventListener("click", () => {
    expanded = !expanded;
    render("All");
    if (!expanded) document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.textContent.trim();

      tabs.forEach((item) => {
        const active = item === tab;
        item.setAttribute("aria-selected", String(active));
        item.classList.toggle("active-filter", active);
      });

      render(selected);
    });
  });

  mobileQuery.addEventListener("change", () => render(currentFilter));

  render("All");
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

prepareSalesContent();
setupVslSection();
setupRevealAnimations();
setupHeader();
setupWorkFilters();
setupVideoModal();
setupFaq();
