console.log("connected - services - v1");

window.addEventListener("load", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

    const mm = gsap.matchMedia();

    // COLOR SET
    gsap.set("html", { "--color--darling-red": "#ec1115", "--color--white": "white" });

    // AUTOALPHA
    SplitText.create(".services-hero-text", {
        type: "lines",
        autoSplit: true,
        onSplit(self) {
                return gsap.timeline()
                .set(".services-hero-text", { visibility: "visible", opacity: 1 })
                .from(self.lines, { y: -5, opacity: 0, stagger: { amount: 0.3 }, ease: "power2.out" })
                .to(".services-list-content", { autoAlpha: 1, duration: 1, ease: "power2.out" }, "<")
                .to(".brochure-services", { autoAlpha: 1, duration: 1, ease: "power2.out" }, "<");
        }
    });

    // DESKTOP IMAGE SCROLL
    mm.add("(min-width: 992px)", () => {
        const bottomButtons = gsap.utils.toArray(".pill-button");
        const containers = gsap.utils.toArray(".services-list-text");
        const lists = gsap.utils.toArray(".text-list");
        const paragraphs = gsap.utils.toArray(".text-paragraph");
        const images = gsap.utils.toArray(".image-scroll");

        gsap.set(images, { opacity: 0 });
        gsap.set(images[0], { opacity: 1 });
        gsap.set([...lists, ...paragraphs], { display: "none", height: 0 });
        gsap.set(bottomButtons, { opacity: 0, display: "none" });

        let main = gsap.timeline({
            scrollTrigger: {
                trigger: ".services-list-content",
                start: "top top",
                end: "+=3500",
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
            }
        });

        for (let i = 0; i < lists.length; i++) {
            const currentItems = [lists[i], paragraphs[i]];
            const nextItems = lists[i + 1] ? [lists[i + 1], paragraphs[i + 1]] : null;

            main.set(currentItems, { display: "flex" });
            main.set(bottomButtons[i], { display: "block" }, "<");

            main.to(currentItems, { height: "auto", ease: "power1.out", duration: 1 });
            main.to([bottomButtons[i], images[i]], { opacity: 1, ease: "none", duration: 0.5 }, "<");
            main.from(containers[i], { gap: 0, ease: "power1.out", duration: 1 }, "<");

            main.to(currentItems, { duration: 1.5 })

            main.to(currentItems, { height: 0, ease: "power1.in", duration: 1 });
            if (i < images.length - 1) main.to(images[i], { opacity: 0, ease: "none", duration: 0.5 }, "<");
            main.to(bottomButtons[i], { opacity: 0, ease: "none", duration: 0.5 }, "<");

            if (i < images.length - 1) main.to(images[i + 1], { opacity: 1, ease: "none", duration: 0.5 }, "<");

            main.to(containers[i], { gap: 0, ease: "power1.in", duration: 1 }, "<");
            main.set(currentItems, { display: "none" });
            main.set(bottomButtons[i], { display: "none" }, "<");

            if (nextItems) {
                main.set(nextItems, { display: "flex" }, "<");
                main.set(bottomButtons[i + 1], { display: "block" }, "<");
            }
        }

        gsap.to(".services-page-list", {
            opacity: 0,
            scrollTrigger: {
                trigger: ".text-xl",
                start: "top bottom",
                end: "top center",
                scrub: true,
                invalidateOnRefresh: true,
            },
        });
    });

    mm.add("(max-width: 991px)", () => {
        // Services Grid
        const items = gsap.utils.toArray(".brochure-services-item");

        function remToPx(rem) {
            return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
        }

        const pxValue = remToPx(7);

        const startLine = `bottom ${pxValue}px`;

        items.forEach((item) => {
            const pin = item.querySelector(".pin-me");
            const end = item.querySelector(".end-trigger");

            ScrollTrigger.create({
                trigger: pin,
                start: startLine,
                endTrigger: end,
                end: startLine,
                pin: pin,
                scrub: true
            });
        });

        // Photos Animation
        const photoEls = gsap.utils.toArray(".scale");
        const photosTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".photos",
                pin: ".photos",
                start: "top top",
                end: "+=1500",
                scrub: true
            }
        });

        photoEls.forEach((el, i) => {
            photosTL.to(el, { scale: 1.005, duration: 1, ease: "none" }, i * 0.5);
        });
    });

    // XL TEXT
    let endValue, travelWidth;

    function calculateXLText() {
        const textWidth = document.querySelector(".text-xl-wrapper").getBoundingClientRect().width;

        const textContainer = document.querySelector(".text-xl");
        const buffer = parseFloat(getComputedStyle(textContainer).paddingLeft);

        const textTotal = textWidth + (buffer * 2);

        travelWidth = window.innerWidth - textTotal;

        endValue = travelWidth * -1.5;
    }

    document.fonts.ready.then(() => {
        calculateXLText();

        ScrollTrigger.addEventListener("refreshInit", () => calculateXLText());

        gsap.to(".text-xl-wrapper", {
            x: () => travelWidth,
            scrollTrigger: {
                trigger: ".text-xl",
                start: "top top",
                end: () => `+=${endValue}`,
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
                ease: "none",
            }
        });
    });

    // CLIENT LIST SECTION
    $('.client-list-item').each(function() {
        const idText = $(this).children('.idtext').text().trim();
        $(this).attr('id', 'item-' + idText);
    });

    $('.client-image-item').each(function() {
        const dataIdText = $(this).children('.idtext').text().trim();
        $(this).attr('data-id', 'item-' + dataIdText);
    });

    const clientNames = document.querySelectorAll(".client-list-item");

    let activeId = null;
    let hideTimeout = null;

    clientNames.forEach((name) => {
        const id = name.id;
        const relatedCard = document.querySelector(`.client-image-item[data-id="${id}"]`);
        const relatedImage = relatedCard.querySelector(".client-image");

        name.addEventListener("mouseenter", () => {
            if (activeId === id) return;

            if (activeId) {
                const prevCard = document.querySelector(`.client-image-item[data-id="${activeId}"]`);
                if (prevCard) {
                    gsap.set(prevCard, { display: "none", opacity: 0 });
                }
            }

            activeId = id;
            if (hideTimeout) clearTimeout(hideTimeout);

            gsap.set(relatedCard, { display: "flex" });
            gsap.to(relatedCard, { opacity: 1, duration: 0.1 });
            gsap.to(relatedImage, { opacity: 1, duration: 0.1 });

            clientNames.forEach((other) => {
                gsap.to(other, {
                    opacity: other === name ? 1 : 0.3,
                    duration: 0.2
                });
            });
        });

        name.addEventListener("mouseleave", () => {
            if (!activeId || activeId !== id) return;

            hideTimeout = setTimeout(() => {
                gsap.to(relatedImage, { opacity: 0, duration: 0.2 });
                gsap.to(relatedCard, { opacity: 0, duration: 0.2 });
                gsap.delayedCall(0.2, () => {
                    gsap.set(relatedCard, { display: "none" });
                });

                clientNames.forEach((name) => {
                    gsap.to(name, { opacity: 1, duration: 0.2 });
                });

                activeId = null;
            }, 150);
        })
    });

    gsap.set(".client-image-wrapper", { xPercent: -50, yPercent: -50 });

    let imageXTo = gsap.quickTo(".client-image-wrapper", "x", { duration: 0.01, ease: "none" });
    let imageYTo = gsap.quickTo(".client-image-wrapper", "y", { duration: 0.01, ease: "none" });

    window.addEventListener("mousemove", m => {
        imageXTo(m.clientX);
        imageYTo(m.clientY);
    });

    // CTA TRANSITION
    gsap.fromTo("html", {
        "--color--darling-red": "#ec1117", 
        "--color--white": "white"
    }, {
        "--color--darling-red": "white", 
        "--color--white": "#ec1117",
        scrollTrigger: {
            trigger: ".services-cta",
            start: "top 50%",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
        }
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
                invalidateOnRefresh: true,
                onUpdate: function (self) {
                    const progress = self.progress;
                    if (window.footerLottie) {
                        window.footerLottie.goToAndStop((window.footerLottie.totalFrames - 1) * progress, true);
                    } 
                },
            },
    });

    // SCROLL TRIGGER REFRESH
    function refreshScroll() {
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }

    refreshScroll();
    window.addEventListener("resize", refreshScroll);
});
