console.log("connected - per page");

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
})
