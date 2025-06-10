console.log("perpage-connected");

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

    // Event listener for resizing / reload on resize
    let resizeTimeout;
    let initialWidth = window.innerWidth;
    
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (Math.abs(window.innerWidth - initialWidth) > 50) {
          const scrollY = window.scrollY;
          sessionStorage.setItem("scrollY", scrollY);
          location.reload();
        }
      }, 250);
    });
    
    window.addEventListener("load", () => {
      const savedScrollY = sessionStorage.getItem("scrollY");
      if (savedScrollY !== null) {
        window.scrollTo(0, parseInt(savedScrollY));
        sessionStorage.removeItem("scrollY");
      }
    });
})
