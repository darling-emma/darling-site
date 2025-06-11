console.log("connected - home - v2");

document.addEventListener("DOMContentLoaded", (event) => {  
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
    
    // ScrollTriggered Timeline
    function buildUsAnimation(bpSplit) {
        return gsap.timeline({
            scrollTrigger: {
                id: "usAnimation",
                trigger: ".about-us",
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: ".about-us",
                onUpdate: function (self) {
                    const progress = self.progress;
                    if (window.usLottie) {
                        window.usLottie.goToAndStop(window.usLottie.totalFrames * progress, true);
                    } 
                },
            },
        })
        .fromTo(bpSplit[1].lines, { y: -5, opacity: 0, stagger: { each: 0.1 } }, { y: 0, opacity: 1, stagger: { each: 0.1 } })
        .to(bpSplit[1].lines, { y: 5, opacity: 0, stagger: { each: 0.1, from: "end" } })

        .fromTo(bpSplit[0].lines, { y: -5, opacity: 0, stagger: { each: 0.1 } }, { y: 0, opacity: 1, stagger: { each: 0.1 } }, "<0.5")
        .to(bpSplit[0].lines, { y: 5, opacity: 0, stagger: { each: 0.1, from: "end" } })

        .fromTo(bpSplit[2].lines, { y: -5, opacity: 0, stagger: { each: 0.1 } }, { y: 0, opacity: 1, stagger: { each: 0.1 } }, "<0.5")
        .to(bpSplit[2].lines, { y: 5, opacity: 0, stagger: { each: 0.1, from: "end" } })

        .fromTo(bpSplit[3].lines, { y: -5, opacity: 0, stagger: { each: 0.1 } }, { y: 0, opacity: 1, stagger: { each: 0.1 } }, "<0.5");
    }

    // SCROLLSMOOTHER - DESKTOP
    const matchMedia = gsap.matchMedia();

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

    // HERO ANIMATION
    let heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".video-embed",
            start: "center center",
            end: "+=2000",
            scrub: true,
            pin: ".subhero",
        }
    });

    heroTimeline
    .to(".video-embed", { scale: 0.5, duration: 2 })
    .to(".video-embed", { yPercent: -100, duration: 2 }, "-=0.5")
    .to(".subhero-text-wrapper", { y: -50, opacity: 0, duration: 1 })
    .fromTo("html", 
        { "--color--darling-red": "#ed2024", "--color--white": "white" }, 
        { "--color--darling-red": "white", "--color--white": "#ed2024" })
    .from(".tertiary-text-wrapper", { y: 50, opacity: 0, duration: 1 }, "+=0.1");

    // WORK ENTRANCE
    let workEntrance = gsap.timeline({
        scrollTrigger: {
            trigger: ".work",
            start: "top 50%",
            end: "top top",
            scrub: true,
        }
    });

    workEntrance
    .fromTo("html", 
        { "--color--white": "#ed2024" }, 
        { "--color--white": "black" });

    // WORK EXIT
    let workExit = gsap.timeline({
        scrollTrigger: {
            trigger: ".services",
            start: "top 50%",
            end: "top top",
            scrub: true,
        }
    });

    workExit
    .fromTo("html", 
        { "--color--darling-red": "white", "--color--white": "black" }, 
        { "--color--darling-red": "#ed2024", "--color--white": "white" });

    // SERVICES ANIMATION
    const pinned = gsap.utils.toArray(".pin");
    const card = gsap.utils.toArray(".card");

    pinned.forEach((item, i) => {
    ScrollTrigger.create({
        trigger: item,
        start: i === 0? "top 10%" : "top 20%",
        endTrigger: ".end-pin",
        end: "top 20%",
        pin: true,
    }); 
    });

    card.forEach((item, i) => {
    if (i + 1 >= card.length) return;
    
        gsap.to(item, {
            scale: 0.8,
            opacity: 0,
            scrollTrigger: {
                trigger: card[i + 1],
                start: "top 40%",
                end: "top 20%",
                scrub: true,
            }
        });
    });

    // GET TO KNOW US ENTRANCE
        let usEntrance = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-us",
                start: "top 50%",
                end: "top top",
                scrub: true,
            }
        });

        usEntrance
        .fromTo("html", 
            { "--color--darling-red": "#ed2024", "--color--white": "white" }, 
            { "--color--darling-red": "white", "--color--white": "#ed2024" });

    // GET TO KNOW US ANIMATION
    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            setTimeout(() => {
                // SplitText
                const bulletPoints = document.querySelectorAll(".about-text");
                const bpSplit = Array.from(bulletPoints).map(bp => {
                    if (bp._split) bp._split.revert();
                    const split = SplitText.create(bp, {
                        type: "lines",
                        autoSplit: true,
                    });
                    bp._split = split;
                    return split;
                });
                
                // Load Lottie
                window.usLottie = lottie.loadAnimation({
                    container: document.getElementById("about-us-lottie"),
                    path: "https://cdn.prod.website-files.com/6418ab0e18a18160ffc38a6f/6807b14a50a2c42198f28c37_f8175d830f79db083f4bfce7b8d7a77e_Darling_Website_GetToKnowUs.json",
                    renderer: "svg",
                    autoplay: false,
                });

                // Add CSS Variables to Lottie
                if (window.usLottie) {
                    usLottie.addEventListener("DOMLoaded", () => {
                        const svg = document.querySelector("#about-us-lottie svg");
                        const lines = svg.querySelectorAll(".lottie-us-line");
                        const fills = svg.querySelectorAll(".lottie-us-mask, .lottie-us-bg");

                        lines.forEach((line) => {
                            const path = line.querySelector("path");
                            if (path) path.style.stroke = "var(--color--darling-red)"; 
                        });

                        fills.forEach((fill) => {
                            const path = fill.querySelector("path");
                            if (path) path.style.fill = "var(--color--white)"; 
                        });
                    });
                };

                buildUsAnimation(bpSplit);

            }, 100);
        });
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            document.fonts.ready.then(() => {
                const bulletPoints = document.querySelectorAll(".about-text");

                // Revert + Re-split
                const bpSplit = Array.from(bulletPoints).map(bp => {
                    if (bp._split) bp._split.revert();
                    const split = SplitText.create(bp, {
                        type: "lines",
                        autoSplit: true,
                    });
                    bp._split = split;
                    return split;
                });

                // Kill the existing ScrollTrigger + Timeline
                ScrollTrigger.getById("usAnimation")?.kill(true);

                // Rebuild the timeline
                buildUsAnimation(bpSplit);
            });
        }, 250);
    });

    // FOOTER ANIMATION
    // Load Lottie
    window.footerLottie = lottie.loadAnimation({
        container: document.getElementById("footer-lottie-div"),
        path: "https://cdn.prod.website-files.com/6418ab0e18a18160ffc38a6f/666c8a5417e8d0638851db29_Footer_Area.json",
        renderer: "svg",
        autoplay: false,
    });

    let footerAnimation = gsap.timeline({
        scrollTrigger: {
                id: "footerAnimation",
                trigger: ".footer",
                start: "top 50%",
                end: "bottom bottom",
                scrub: true,
                onUpdate: function (self) {
                    const progress = self.progress;
                    if (window.footerLottie) {
                        window.footerLottie.goToAndStop((window.footerLottie.totalFrames - 1) * progress, true);
                    } 
                },
            },
    });
});
