console.log("connected - services - June 2026");

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
        const items = gsap.utils.toArray(".services-list-item");
        let lastIndexEntered = 0;

        const tls = [];

        items.forEach((item, index) => {
          const photo = item.querySelector(".services-item-image");
          const photoHeight = getComputedStyle(photo).width;
          const text = item.querySelector(".services-item-text");

          const tl = gsap.timeline({ paused: index !== 0 ? true : false });
          tl.set(text, { display: "none" })
            .fromTo(
              photo,
              { height: "0px" },
              { ease: "power2.inOut", duration: 0.2, height: photoHeight }
            )
            .set(text, { display: "flex" }, "<")
            .fromTo(
              text,
              { opacity: 0, height: "0px" },
              { opacity: 1, height: "auto", ease: "power2.inOut", duration: 0.2 },
              "<"
            );

          tls.push(tl);

          item.addEventListener("mouseenter", () => {
            tls[lastIndexEntered].timeScale(1).reverse();

            lastIndexEntered = index;

            tls[index].timeScale(1).play();
          });
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

        // Color Change
        gsap.fromTo("html", { 
            "--color--darling-red": "#ec1115", 
            "--color--white": "white",
        }, {
            "--color--darling-red": "white", 
            "--color--white": "#ec1115",
            scrollTrigger: {
                trigger: ".photos",
                start: "top top",
                end: "+=1500",
                toggleActions: "play none none reverse",
            },
            duration: 0.01,
            immediateRender: false,
        });

        gsap.fromTo("html", { 
            "--color--darling-red": "white", 
            "--color--white": "#ec1115",
        }, {
            "--color--darling-red": "#ec1115", 
            "--color--white": "white",
            scrollTrigger: {
                trigger: ".photos",
                start: "top top",
                end: "+=1500",
                toggleActions: "none play reverse none",
            },
            duration: 0.01,
            immediateRender: false,
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
        "--color--darling-red": "#ec1115", 
        "--color--white": "white"
    }, {
        "--color--darling-red": "white", 
        "--color--white": "#ec1115",
        scrollTrigger: {
            trigger: ".services-cta",
            start: "top 30%",
            end: "top 10%",
            scrub: true,
            invalidateOnRefresh: true,
        },
        immediateRender: false,
    });

    // CTA ANIMATION
    mm.add("(min-width: 992px)", () => {
        document.fonts.ready.then(() => {
            SplitText.create(".cta-text", {
                type: "chars, words",
                charsClass: "cta-char",
                autoSplit: true,
                onSplit(self) {
                    return gsap.utils.toArray(".cta-char").forEach(c => {
                        c.addEventListener("mouseenter", () => {
                            gsap.to(c, {
                                yPercent: -25,
                            });
                        });
                        c.addEventListener("mouseleave", () => {
                            gsap.to(c, {
                                yPercent: 0,
                            });
                        });
                    });
                }
            });
        });
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
