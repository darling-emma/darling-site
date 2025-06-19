console.log("connected - per page - v4");

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollSmoother, SplitText)

  const matchMedia = gsap.matchMedia();
    

  // Initialize ScrollSmoother, Desktop only
    matchMedia.add("(min-width: 768px)", () => {
        ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1,
            effects: true,
            ignoreMobileResize: true,
            normalizeScroll: true
        });
    });

    // Menu animation
    const menuTrigger = document.querySelector(".mobile-links");
    const menu = document.querySelector(".mobile-menu");
    const bottomlinks = document.querySelector(".mobile-menu-bottom");

    gsap.set(menu, { yPercent: -100, display: "none" });

    menuTrigger.dataset.open = "false";

    menuTrigger.addEventListener("click", () => {
      const isClosed = menuTrigger.dataset.open === "false";
      
      if (isClosed) {
        let menuOpen = gsap.timeline();

        menuOpen
        .set(menu, { display: "flex" })
        .to(menuTrigger, { rotate: 45 })
        .to(menu, { yPercent: 0 }, "<")
        .from(".mobile-link", { opacity: 0, stagger: 0.1, duration: 0.3 })
        .from(bottomlinks, { opacity: 0, duration: 0.3 }, "<");

        menuTrigger.dataset.open = "true";
      } else {
        let menuClose = gsap.timeline();

        menuClose
        .to(bottomlinks, { opacity: 0, duration: 0.3 })
        .to(".mobile-link", { opacity: 0, stagger: -0.1, duration: 0.3 }, "<")
        .to(menuTrigger, { rotate: 0 })
        .to(menu, { yPercent: -100 }, "<")
        .set(menu, { display: "flex" })
        .set(".mobile-link", { opacity: 1 }, "<")
        .set(bottomlinks, { opacity: 1 }, "<");

        menuTrigger.dataset.open = "false";
      }
    });
});
