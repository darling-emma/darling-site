console.log("connected - home - v6");

document.addEventListener("DOMContentLoaded", (event) => {  
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

    const mm = gsap.matchMedia();

    // AUTOALPHA
    gsap.to(".hero-text-wrapper", { autoAlpha: 1, duration: 0.2 });

    // LOAD ANIMATION
    SplitText.create(".hero-text", {
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
    let ogDistance, scrollSegment, expCard, singleCard;

    function calculateValues(isDesktop) {
        const ogValue = isDesktop ? document.querySelector(".scroll-me").getBoundingClientRect().width : document.querySelector(".scroll-me").getBoundingClientRect().height;
        const windowValue = isDesktop ? document.querySelector(".work").getBoundingClientRect().width : document.querySelector(".work").getBoundingClientRect().height;
        ogDistance = ogValue - windowValue;

        const scrollMe = document.querySelector(".scroll-me");
        const padding = parseFloat(
            getComputedStyle(scrollMe)[isDesktop ? "paddingRight" : "paddingTop"]
        );

        const workList = document.querySelector(".work-collection-list");
        const gap = parseFloat(getComputedStyle(workList).gap);

        singleCard = document.querySelector(".work-collection-item").getBoundingClientRect().width;
        expCard = singleCard * 1.2;

        const extWidth = (padding * 2) + (gap * 5) + (singleCard * 5) + (singleCard * 1.2);
        const extDistance = extWidth - windowValue;   

        scrollSegment = extDistance / 5;
    }

    mm.add({

        isMobile: "(max-width: 478px)",
        isDesktop: "(min-width: 479px)",

    }, (context) => {

        let { isMobile, isDesktop } = context.conditions;

        calculateValues(isDesktop);

        ScrollTrigger.addEventListener("refreshInit", () => calculateValues(isDesktop));

        const cards = gsap.utils.toArray(".work-collection-item");
        const descriptions = gsap.utils.toArray(".work-descrip-item");

        gsap.set(descriptions[0], { display: "flex" });

        let workTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".work",
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: ".work",
                invalidateOnRefresh: true,
            }
        });

        workTL
        .to(cards[0], { width: () => expCard, ease: "none", duration: 0.1 })
        .to(descriptions[0], { opacity: 1, ease: "none", duration: 0.1}, "<")
        .to({}, { duration: 0.05 }) // pause
        .to(cards[0], { width: () => singleCard, ease: "none", duration: 0.1 }, ">")
        .to(descriptions[0], { opacity: 0, ease: "none", duration: 0.1 }, "<")
        .set(descriptions[0], { display: "none" }, ">");

        for (let i = 1; i <= 4; i++) {
            workTL
                .to(".scroll-me", { 
                    x: isDesktop ? () => `-=${scrollSegment}` : 0,
                    y: isMobile ? () => `-=${scrollSegment}` : 0,
                    ease: "none", 
                    duration: 0.1 
                })
                .set(descriptions[i], { display: "flex" }, "<")    
                .to(cards[i], { width: () => expCard, ease: "none", duration: 0.1 })
                .to(descriptions[i], { opacity: 1, ease: "none", duration: 0.1 }, "<")
                .to({}, { duration: 0.05 }) // pause
                .to(cards[i], { width: () => singleCard, ease: "none", duration: 0.1 }, ">")
                .to(descriptions[i], { opacity: 0, ease: "none", duration: 0.1 }, "<")
                .set(descriptions[i], { display: "none" }, ">");
        }

        workTL
        .set(descriptions[5], { display: "flex" }, "<")
        .to(".scroll-me", { 
            x: isDesktop ? () => `-=${scrollSegment}` : 0,
            y: isMobile ? () => `-=${scrollSegment}` : 0,  
            ease: "none", 
            duration: 0.1 
        })
        .to(cards[5], { width: () => expCard, ease: "none", duration: 0.1 }, "<")
        .to(descriptions[5], { opacity: 1, ease: "none", duration: 0.1 }, "<")
        .to({}, { duration: 0.05 }) // pause
        .to(".scroll-me", { 
            x: isDesktop ? () => `-${ogDistance}px` : 0, 
            y: isMobile ? () => `-${ogDistance}px` : 0,
            ease: "none", 
            duration: 0.1 
        })
        .to(cards[5], { width: () => singleCard, ease: "none", duration: 0.1 }, "<");
    });

    // SUBHERO ENTRANCE
    let subEntrance = gsap.timeline({
        scrollTrigger: {
            trigger: ".subhero",
            start: "top 50%",
            end: "top top",
            scrub: true,
            ease: "none",
        }
    });

    subEntrance
    .fromTo("html", 
    { "--color--darling-red": "#ed2024", "--color--white": "white" }, 
    { "--color--darling-red": "white", "--color--white": "#ed2024" });

    // SERVICES GRID ANIMATION
    function remToPx(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    const pxValue = remToPx(6); 

    ScrollTrigger.create({
        trigger: ".pin-me",
        start: `top ${pxValue}px`,
        endTrigger: ".end-trigger",
        end: `top ${pxValue}px`,
        pin: ".pin-me",
        scrub: true,
        ease: "none",
    });

    // PHOTOS ANIMATION
    const photoEls = gsap.utils.toArray(".scale");
    const photosTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".photos",
            pin: ".photos",
            start: "top top",
            end: "+=1500",
            scrub: true,
            ease: "none",
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

    // ABOUT US ANIMATION
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

    let tl = gsap.timeline({
        scrollTrigger: {
                id: "usAnimation",
                trigger: ".about-us",
                start: "top top",
                end: "+=3000",
                scrub: true,
                pin: ".about-us",
                ease: "none",
                onUpdate: function (self) {
                    const progress = self.progress;
                    if (window.usLottie) {
                        window.usLottie.goToAndStop(window.usLottie.totalFrames * progress, true);
                    } 
                },
            },
    });

    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            gsap.utils.toArray(".about-text").forEach((text, i) => {
                let animation;

                if (i === 0) { 
                    gsap.set(text, { y: 0, opacity: 1 }); 
                }

                SplitText.create(text, {
                    type: "lines",
                    autoSplit: true,
                    onSplit(self) {
                        animation && animation.revert();
                        let startTime = animation ? animation.startTime() : "+=0";
                        if (i === 0) {
                            animation = gsap.timeline()
                            .to(self.lines, { duration: 0.9 })
                            .fromTo(self.lines, { y: 0, opacity: 1 }, { y: 5, opacity: 0, stagger: { each: 0.1, from: "end" }, duration: 0.3 })
                        } else if (i > 0 && i < 3) {
                            animation = gsap.timeline()
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { each: 0.1 }, duration: 0.3 })
                            .to(self.lines, { duration: 0.6 })
                            .to(self.lines, { y: 5, opacity: 0, stagger: { each: 0.1, from: "end" }, duration: 0.3 });
                        } else {
                            animation = gsap.timeline()
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { each: 0.1 }, duration: 0.3 })
                            .to(self.lines, { duration: 0.9 });
                        }
                        tl.add(animation, startTime);
                    }
                });
            });
        });
    });

    

    // FOOTER ENTRANCE
    let footerEntrance = gsap.timeline({
        scrollTrigger: {
            trigger: ".footer",
            start: "top 50%",
            end: "bottom bottom",
            scrub: true,
            ease: "none",
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
                ease: "none",
                scrub: true,
                onUpdate: function (self) {
                    const progress = self.progress;
                    if (window.footerLottie) {
                        window.footerLottie.goToAndStop((window.footerLottie.totalFrames - 1) * progress, true);
                    } 
                },
            },
    });

    window.addEventListener("load", () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    });

    window.addEventListener("resize", () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    });
});
