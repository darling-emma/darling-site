console.log("connected - team - v1");

$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

    const matchM = gsap.matchMedia();

    // ID + DATA-ID
    $('.team-col-item').each(function() {
        const idText = $(this).children('.idtext').text().trim();
        $(this).attr('id', 'item-' + idText);
    });

    $('.bio-col-item').each(function() {
        const dataIdText = $(this).children('.idtext').text().trim();
        $(this).attr('data-id', 'item-' + dataIdText);
    });

    // Defining freeze scroll function
    function freezeScroll() {
        if (ScrollSmoother.get() && !ScrollTrigger.isTouch) {
            ScrollSmoother.get().paused(true);
            document.querySelector(".smooth-wrapper").style.pointerEvents = "none";
        } else {
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        }
    }

    // Defining resume scroll function
    function resumeScroll() {
        if (ScrollSmoother.get() && !ScrollTrigger.isTouch) {
            ScrollSmoother.get().paused(false);
            document.querySelector(".smooth-wrapper").style.pointerEvents = "auto";
        } else {
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
    }
    
    // TRIO ANIMATION
    gsap.to(".team-image-wrapper", {
        scrollTrigger: {
            trigger: ".image-trio",
            start: "top top",
            end: "+=1000",
            pin: ".image-trio",
            scrub: true,
        },
        height: 0,
        stagger: 0.1,
    });

    gsap.from(".team-trio-text-wrapper", {
        scrollTrigger: {
            trigger: ".image-trio",
            start: "top top",
            end: "+=1000",
            scrub: true,
        },
        yPercent: 5,
        stagger: 0.1,
        delay: 0.2,
    });

    // TEXT ANIMATION
    text = document.querySelector(".text-xl-wrapper");
    textWidth = text.getBoundingClientRect().width;

    textTravel = window.innerWidth - textWidth;

    gsap.to(".text-xl-wrapper", {
        scrollTrigger: {
            trigger: ".text-xl",
            start: "top top",
            end: "+=1500",
            scrub: true,
            pin: true,
        },
        x: textTravel,
    });

    // TEAM ANIMATION
    matchM.add("(min-width: 992px)", () => {
        // Select hover triggers
        const teamNames = gsap.utils.toArray(".team-col-item");

        let activeId = null;

        teamNames.forEach(name => {
            const id = name.id;
            const button = name.querySelector(".team-item-button");
            const imageSmall = name.querySelector(".team-image-small");
            const relatedBio = document.querySelector(`.bio-col-item[data-id="${id}"]`);
            const imageLarge = relatedBio.querySelector(".team-image-large");
            const title = relatedBio.querySelector(".title-wrapper");
            const bio = relatedBio.querySelector(".bio-text-wrapper");
            const links = relatedBio.querySelector(".bio-links");

            function closeBio() {
                let closeTL = gsap.timeline();

                closeTL
                .to([imageLarge, title, bio, links], { opacity: 0, duration: 0.3 })
                .to(".bio-col-wrapper", { opacity: 0, backgroundColor: "rgba(255, 255, 255, 0.0)", duration: 0.3 }, "<")
                .set(relatedBio, { display: "none" })
                .set(".bio-col-wrapper", { display: "none" })
                .set([imageLarge, title, bio, links], { opacity: 1 })
                .set(".bio-col-wrapper", { opacity: 1, backgroundColor: "rgba(255, 255, 255, 0.3)" });

                activeId = null;

                resumeScroll();
            }

            const closeWrapper = relatedBio.querySelector(".close-wrapper");
            if (closeWrapper) {
                closeWrapper.addEventListener("click", closeBio);
            }

            name.addEventListener("mouseenter", () => {
                gsap.to([button, imageSmall], { opacity: 1, duration: 0.3 });
            });

            name.addEventListener("mouseleave", () => {
                gsap.to([button, imageSmall], { opacity: 0, duration: 0.3 });
            });

            name.addEventListener("click", () => {
                if (activeId) return;
                activeId = id;

                let openTL = gsap.timeline();

                openTL
                .to(imageSmall, { opacity: 0, duration: 0.3 })
                .set(relatedBio, { display: "flex" }, "<")
                .set(".bio-col-wrapper", { display: "flex" })
                .from(".bio-col-wrapper", { opacity: 0, backgroundColor: "rgba(255, 255, 255, 0.0)", duration: 0.3 })
                .from([imageLarge, title, bio, links], { opacity: 0, duration: 0.3 }, "<");

                freezeScroll();
            });
        });
    });


    // WE'RE GOOD AT ANIMATION
    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            setTimeout(() => {
                const split = SplitText.create(".split-me", {
                    type: "words",
                    autoSplit: true,
                });

                gsap.from(split.words, {
                    scrollTrigger: {
                        trigger: ".our-skills",
                        start: "top top",
                        end: "+=1500",
                        scrub: true,
                        pin: true,
                    },
                    opacity: 0,
                    stagger: 1,
                });

                gsap.from(".skills-icon", {
                    scrollTrigger: {
                        trigger: ".our-skills",
                        start: "top top",
                        end: "+=1500",
                        scrub: true,
                    },
                    opacity: 0,
                    stagger: 1,
                });
                
            }, 100);
        });
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
