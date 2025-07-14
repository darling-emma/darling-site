console.log("connected - home - v4.5");

document.addEventListener("DOMContentLoaded", (event) => {  
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
    
    const matchM = gsap.matchMedia();

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

    // COLOR SET
    gsap.set("html", { "--color--darling-red": "#ed2024", "--color--white": "white" });
    
    // AUTOALPHA
    gsap.to(".hero-text-wrapper", { autoAlpha: 1, duration: 0.2 });

    // LOAD ANIMATION
    let heroSplit = SplitText.create(".hero-text", {
        type: "lines",
        autoSplit: true,
        onSplit(self) {
            gsap.from(self.lines, {
                y: -5,
                opacity: 0,
                stagger: {
                    amount: 0.3
                },
                ease: "power2.out",
                delay: 0.2,
            });
        }
    });

    // WORK CARD ANIMATION
    const workImages = gsap.utils.toArray(".work-collection-item");
    const workDescrips = gsap.utils.toArray(".work-descrip-item");
    const singleImage = document.querySelector(".work-collection-item");


    const originalWidth = singleImage.getBoundingClientRect().width;
    const newWidth = originalWidth * 1.2;

    const marginTotal = window.innerWidth <= 478
        ? 8 * (workImages.length - 1)  // mobile
        : 16 * (workImages.length + 1);// desktop (fallback)
    const workWidth = originalWidth * (workImages.length - 1) + newWidth + marginTotal;
    const distance = workWidth - window.innerWidth;
    const overshoot = newWidth - originalWidth;

    const workDesktop = gsap.timeline({
        scrollTrigger: {
            trigger: ".work",
            start: "top top",
            end: "+=1500px",
            scrub: 0.5,
            pin: ".work",
        }
    });

    for (let i = 0; i < workImages.length; i++) {

        workDesktop.to(workImages[i], { width: newWidth });
        workDesktop.to(workDescrips[i], { opacity: 1 }, "<");

        workDesktop.to(workImages[i], { width: originalWidth });
        workDesktop.to(workDescrips[i], { opacity: 0 }, "<");
        workDesktop.to(workImages[i + 1], { width: newWidth }, "<");

        workDesktop.to(workDescrips[i + 1], { opacity: 1 });
    }
    
    var horizontal = gsap.timeline({
        scrollTrigger: {
            trigger: ".work",
            start: "top top",
            end: "+=1500px",
            scrub: 0.5,
        }
    });

    horizontal
    .to(".scroll-me", { x: -distance, delay: 0.8, duration: 8 })
    .to(".scroll-me", { x: -distance + overshoot, duration: 1 });
    
    // SUBHERO ENTRANCE
    let subEntrance = gsap.timeline({
        scrollTrigger: {
            trigger: ".subhero",
            start: "top 50%",
            end: "top top",
            scrub: true,
        }
    });

    subEntrance
    .fromTo("html", 
    { "--color--darling-red": "#ed2024", "--color--white": "white" }, 
    { "--color--darling-red": "white", "--color--white": "#ed2024" });


    // PHOTOS ANIMATION
    const photoEls = gsap.utils.toArray(".scale");
    const photosTL = gsap.timeline({
        scrollTrigger: {
        trigger: ".photos",
        pin: ".photos",
        start: "top top",
        end: "+=1500",
        scrub: true,
        }
    });

    photoEls.forEach((el, i) => {
        photosTL.to(el, {
        scale: 1.005,
        duration: 1,      
        ease: "none"
        }, i * 0.5);         
    });

    photosTL.to("html", 
        { "--color--darling-red": "#ed2024", "--color--white": "white" }
    );

    // SERVICES ANIMATION
    matchM.add("(min-width: 992px)", () => {
        // Select text
        const servicesItems = document.querySelectorAll(".services-item");

        // Set text to 100% opacity
        gsap.set(".services-item", { opacity: 1 });

        // Main loop
        servicesItems.forEach(item => {
            const id = item.id;
            const relatedImage = document.querySelector(`.image-cover[id="${id}"]`);

            gsap.set(relatedImage, { opacity: 0 });

            // Hover in
            item.addEventListener("mouseenter", () => {

                gsap.to(relatedImage, { opacity: 1, duration: 0.1 });

                servicesItems.forEach(other => {
                    if (other !== item) {
                        gsap.to(other, { opacity: 0.3, duration: 0.1 });
                    } else {
                        gsap.to(other, { opacity: 1, duration: 0.1 })
                    }
                });
            });

            // Hover out
            item.addEventListener("mouseleave", () => {

                gsap.to(relatedImage, { opacity: 0, duration: 0.1 })
                
                servicesItems.forEach(item => {
                    gsap.to(item, { opacity: 1, duration: 0.1 });
                });
            });
        });
    });

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

    // FOOTER ENTRANCE
    let footerEntrance = gsap.timeline({
        scrollTrigger: {
            trigger: ".footer",
            start: "top 50%",
            end: "top top",
            scrub: true,
        }
    });

    footerEntrance
    .fromTo("html", 
    { "--color--darling-red": "#ed2024", "--color--white": "white" }, 
    { "--color--darling-red": "white", "--color--white": "#ed2024" });

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
