console.log("connected - about - June 2026");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(SplitText, ScrollTrigger)

    const mm = gsap.matchMedia();

    gsap.set("html", {
        "--color--white": "white",
        "--color--darling-red": "#ec1115",
    });

    // LOAD ANIMATION
    SplitText.create(".brochure-para-large", {
        type: "lines",
        autoSplit: true,
        onSplit(self) {
            return gsap.timeline()
            .set(".brochure-para-large", { visibility: "visible", opacity: 1 })
            .set(".team-image-item", { visibility: "visible" })
            .set(self.lines, { opacity: 0, y: -5 }, "<")
            .addLabel("start")
            .to(self.lines, { y: 0, opacity: 1, ease: "power2.out", duration: 0.3, stagger: 0.15 }, "start")
            .to(".team-image-item", { opacity: 1, ease: "power2.out", duration: 0.3, stagger: 0.15 }, "start")
        }
    });

    // TRIO ANIMATION
    mm.add({

        isMobile: "(max-width: 478px)",
        isDesktop: "(min-width: 479px)",

    }, (context) => {

        let { isMobile, isDesktop } = context.conditions;

        gsap.to(".team-image-wrapper", {
            scrollTrigger: {
                trigger: ".image-trio",
                start: "top top",
                end: "+=1000",
                pin: ".image-trio",
                scrub: true,
                ease: "none",
            },
            height: isDesktop ? 0 : "auto",
            width: isMobile ? 0 : "auto",
            stagger: 0.1,
        });

        gsap.from(".team-trio-text-wrapper", {
            scrollTrigger: {
                trigger: ".image-trio",
                start: "top top",
                end: "+=1000",
                scrub: true,
                ease: "none",
            },
            yPercent: isDesktop ? 10 : 0,
            xPercent: isMobile ? 10 : 0,
            stagger: 0.1,
            delay: 0.3,
        });
    });
    
    // PHOTO GRID ANIMATION
    mm.add({
        isMobile: "(max-width: 478px)",
        isDesktop: "(min-width: 479px)",
    }, (context) => {
        let {isDesktop, isMobile} = context.conditions;

        gsap.to(".pos_relative", {
            opacity: 1,
            rotation: () => (Math.random() - 0.5) * 40,
            yPercent: () => (Math.random() - 0.5) * 20,
            xPercent: () => (Math.random() - 0.5) * 10,
            duration: 0.01,
            ease: "none",
            stagger: {
                each: 0.1,
                from: "random"
            },
            scrollTrigger: {
                trigger: ".image-full",
                start: "top top",
                end: isMobile ? "+=250" : "+=500",
                scrub: true,
                pin: true,
                invalidateOnRefresh: true
            }
        });
    });
    
    // QUOTES ANIMATION
    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            gsap.utils.toArray(".quote-text").forEach((text, i) => {
                let quoteAnimation;
                const pauseDurationsFront = [0, 4, 8, 12];
                const pauseDurationsBack = [12, 8, 4, 0];

                SplitText.create(text, {
                    type: "lines",
                    autoSplit: true,
                    onSplit(self) {
                        quoteAnimation && quoteAnimation.revert();
                        if (i === 0) {
                            quoteAnimation = gsap.timeline({ repeat: -1 })
                            .to(self.lines, { duration: pauseDurationsFront[i] })
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { amount: 0.5 } })
                            .to(self.lines, { duration: 2 })
                            .to(self.lines, { y: 5, opacity: 0, stagger: { amount: 0.5, from: "end" } })
                            .to(self.lines, { duration: pauseDurationsBack[i] });
                        } else if ( i > 0 && i < 3) {
                            quoteAnimation = gsap.timeline({ repeat: -1 })
                            .to(self.lines, { duration: pauseDurationsFront[i] })
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { amount: 0.5 } })
                            .to(self.lines, { duration: 2 })
                            .to(self.lines, { y: 5, opacity: 0, stagger: { amount: 0.5, from: "end" } })
                            .to(self.lines, { duration: pauseDurationsBack[i] });
                        } else {
                            quoteAnimation = gsap.timeline({ repeat: -1 })
                            .to(self.lines, { duration: pauseDurationsFront[i] })
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { amount: 0.5 } })
                            .to(self.lines, { duration: 2 })
                            .to(self.lines, { y: 5, opacity: 0, stagger: { amount: 0.5, from: "end" } })
                            .to(self.lines, { duration: pauseDurationsBack[i] });
                        }
                    }
                });
            });

            gsap.utils.toArray(".speaker-text").forEach((text, i) => {
                let speakerAnimation;
                const pauseDurationsFront = [0, 4, 8, 12];
                const pauseDurationsBack = [12, 8, 4, 0];

                SplitText.create(text, {
                    type: "lines",
                    autoSplit: true,
                    onSplit(self) {
                        speakerAnimation && speakerAnimation.revert();
                        if (i === 0) {
                            speakerAnimation = gsap.timeline({ repeat: -1 })
                            .to(self.lines, { duration: pauseDurationsFront[i] })
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { amount: 0.5 } })
                            .to(self.lines, { duration: 2 })
                            .to(self.lines, { y: 5, opacity: 0, stagger: { amount: 0.5, from: "end" } })
                            .to(self.lines, { duration: pauseDurationsBack[i] });
                        } else if ( i > 0 && i < 3) {
                            speakerAnimation = gsap.timeline({ repeat: -1 })
                            .to(self.lines, { duration: pauseDurationsFront[i] })
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { amount: 0.5 } })
                            .to(self.lines, { duration: 2 })
                            .to(self.lines, { y: 5, opacity: 0, stagger: { amount: 0.5, from: "end" } })
                            .to(self.lines, { duration: pauseDurationsBack[i] });
                        } else {
                            speakerAnimation = gsap.timeline({ repeat: -1 })
                            .to(self.lines, { duration: pauseDurationsFront[i] })
                            .fromTo(self.lines, { y: -5, opacity: 0 }, { y: 0, opacity: 1, stagger: { amount: 0.5 } })
                            .to(self.lines, { duration: 2 })
                            .to(self.lines, { y: 5, opacity: 0, stagger: { amount: 0.5, from: "end" } })
                            .to(self.lines, { duration: pauseDurationsBack[i] });
                        }
                    }
                });
            });
        });
    });

    // WE'RE GOOD AT ANIMATION
    const initialText = gsap.utils.toArray("#one");
    const secondaryText = gsap.utils.toArray("#two");
    const textSwitch = document.querySelector(".switch-wrapper");
    const textSwitchControl = document.querySelector(".switch");

    textSwitch.dataset.open = "false";

    let footerTL = null;
    let reverseTL = null;

    function buildReverse() {
        reverseTL = gsap.fromTo("html", {
            "--color--white": "white",
            "--color--darling-red": "#ec1115",
        }, {
            "--color--white": "#ec1115",
            "--color--darling-red": "white",
            scrollTrigger: {
                trigger: ".quotes-wrapper",
                start: "bottom 10%",
                end: "bottom top",
                scrub: true,
                ease: "none",
            }
        });
    }

    function buildFooter() {
        footerTL = gsap.fromTo("html", {
            "--color--white": "white",
            "--color--darling-red": "#ec1115",
        }, {
            "--color--white": "#ec1115",
            "--color--darling-red": "white",
            scrollTrigger: {
                trigger: ".footer",
                start: "top center",
                end: "top top",
                scrub: true,
                ease: "none",
                markers: false,
            }
        });
    }

    textSwitch.addEventListener("click", () => {
        const isInitial = textSwitch.dataset.open === "false";

        if (isInitial) {
            let switchOn = gsap.timeline();

            switchOn
            .set(initialText, { visibility: "hidden" })
            .set(secondaryText, { visibility: "visible" }, "<")
            .to(textSwitchControl, { x: 25, duration: 0.3, ease: "power1.out" }, "<")
            .set("html", {
                "--color--white": "#ec1115",
                "--color--darling-red": "white",
            }, "<");

            textSwitch.dataset.open = "true";

            footerTL.kill();
            buildReverse();
        } else {
            let switchOff = gsap.timeline();

            switchOff
            .set(secondaryText, { visibility: "hidden" })
            .set(initialText, { visibility: "visible" }, "<")
            .to(textSwitchControl, { x: 0, duration: 0.3, ease: "power1.out" }, "<")
            .set("html", {
                "--color--white": "white",
                "--color--darling-red": "#ec1115",
            }, "<");

            textSwitch.dataset.open = "false";

            reverseTL.kill();
            buildFooter();
        }
    });

    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            const splits = gsap.utils.toArray(".split-me");
    
            splits.forEach((s, i) => {
                SplitText.create(s, {
                    type: "words",
                    autoSplit: true,
                    onSplit: (self) => {
                        return gsap.from(self.words, {
                            opacity: 0,
                            stagger: 1,
                            scrollTrigger: {
                                trigger: ".our-skills",
                                start: "top top",
                                end: "+=1000",
                                scrub: true,
                                ease: "none",
                                markers: false,
                            }
                        });
                    }
                });
            });

            gsap.set(splits[1], { visibility: "hidden" });
            gsap.set(secondaryText[0], { visibility: "hidden" });

            ScrollTrigger.create({
                trigger: ".our-skills",
                start: "top top",
                end: "+=1000",
                scrub: true,
                pin: true,
                ease: "none",
                markers: false,
            });
        });
    });

    mm.add("(min-width: 479px)", () => {
        gsap.from(".skills-icon", {
            opacity: 0,
            stagger: 1,
            scrollTrigger: {
                trigger: ".our-skills",
                start: "top top",
                end: "+=1000",
                scrub: true,
                ease: "none",
                markers: false,
            }
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

    gsap.timeline({
        scrollTrigger: {
                id: "footerAnimation",
                trigger: ".footer",
                start: "top 50%",
                end: "bottom bottom",
                scrub: true,
                ease: "none",
                onUpdate: function (self) {
                    const progress = self.progress;
                    if (window.footerLottie) {
                        window.footerLottie.goToAndStop((window.footerLottie.totalFrames - 1) * progress, true);
                    } 
                },
            },
    });

    function refreshScroll() {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    }

    function refreshScrollLoad() {
        setTimeout(() => {
            buildFooter();
            ScrollTrigger.refresh();
        }, 200);
    }

    window.addEventListener("load", refreshScrollLoad);
    window.addEventListener("resize", refreshScroll);
});
