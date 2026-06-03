console.log("connected - home - June 2026");

document.addEventListener("DOMContentLoaded", (event) => {  
    gsap.registerPlugin(ScrollTrigger, SplitText, Flip)

    let mm = gsap.matchMedia();

    // COLOR SET
    gsap.set("html", { 
        "--color--darling-red": "#ec1115", 
        "--color--white": "white" 
    });

    // HERO TEXT
    SplitText.create(".home-hero-heading", {
        type: "lines",
        autoSplit: true,
        onSplit(self) {
            return gsap.timeline()
            .set(".home-hero-heading", { visibility: "visible", opacity: 1 })
            .from(self.lines, { y: -5, opacity: 0, stagger: { amount: 0.5 }, delay: 1.5 });
        }
    });
    
    // VIDEO + NAV ANIMATION
    function getWidth() {
        return window.innerWidth;
    }

    function getHeight () {
        return window.innerHeight;
    }

    function remToPx(rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    mm.add({
        isMobile: "(max-width: 479px)",
        isDesktop: "(min-width: 480px)"
    }, (context) => {
        let { isMobile, isDesktop } = context.conditions;

        let width = () => {
            let padding = isMobile ? remToPx(2) : remToPx(4);
            return getWidth() - padding;
        };
        let height = () => {
            let padding = isMobile ? remToPx(2) : remToPx(4);
            let baseWidth = getWidth() - padding;
            return baseWidth * 0.5625;
        };
        let mobileHeight = () => {
            let mobilePadding = remToPx(4);
            return getHeight - mobilePadding;
        }

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".video-hero-wrapper",
                start: "top 35%",
                end: isMobile ? "bottom 90%" : "+=250",
                scrub: true,
                ease: "none",
                invalidateOnRefresh: true,
            },
        });

        if (isMobile) {
            tl
            .to(".video-hero-div", { width: () => width() + "px", height: () => mobileHeight() + "px" })
            .to(".video-hero-div", { height: () => height() + "px" });
        } else {
            tl.to(".video-hero-div", { width: () => width() + "px", height: () => height() + "px" });
        }
    });
    
    // XL TEXT HORIZONTAL SCROLL
    let travelDistance;

    function calculateXLText() {
        const ticker = document.querySelector(".home-ticker-inner");;
        const gap = parseFloat(getComputedStyle(ticker).gap);
        const measure = document.querySelector(".textwrap-none");
        const measureWidth = measure.getBoundingClientRect().width;
        travelDistance = measureWidth + gap;
    }

    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            calculateXLText();
            ScrollTrigger.addEventListener("refreshInit", () => calculateXLText());

            gsap.to("#ticker-top", {
                x: () => travelDistance * -1,
                duration: 17, 
                ease: "none",
                repeat: -1
            });

            gsap.to("#ticker-bottom", {
                x: () => travelDistance,
                duration: 17, 
                ease: "none",
                repeat: -1
            });
        });
    });

    // WORK ENTRANCE
    gsap.fromTo("html", { 
        "--color--darling-red": "#ec1115", 
        "--color--white": "white" 
    }, { 
        "--color--darling-red": "white", 
        "--color--white": "black",
        scrollTrigger: {
            trigger: ".work-wrapper",
            start: "top 90%",
            end: "top 75%",
            scrub: true,
            ease: "none",
        },
        immediateRender: false,
    });

  	// COMING SOON INTERACTION
  	const keepSecretImages = gsap.utils.toArray("#keep-secret-image");
    const comingSoonCards = gsap.utils.toArray(".work-card.coming-soon");

    gsap.set(keepSecretImages, { opacity: 0, zIndex: 20 });

    function revealSecret(index) {
        gsap.to(keepSecretImages[index], { opacity: 1, ease: "none" });
    }

    function fadeOut(index) {
        gsap.to(keepSecretImages[index], { opacity: 0, duration: 1, ease: "none", delay: 3 });
    }

    comingSoonCards.forEach((c,i) => {
        c.addEventListener("click", () => {
            revealSecret(i);
            fadeOut(i);
        })
    });
    
    // SERVICES ENTRANCE
    gsap.fromTo("html", { 
        "--color--darling-red": "white", 
        "--color--white": "black" 
    }, { 
        "--color--darling-red": "#ec1115", 
        "--color--white": "white",
        scrollTrigger: {
            trigger: ".brochure-services",
            start: "top 65%",
            end: "top 50%",
            scrub: true,
            ease: "none",
        },
        immediateRender: false,
    });

    // SERVICES GRID ANIMATION
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

    // PHOTOS ENTRANCE
    gsap.fromTo("html", { 
        "--color--darling-red": "#ec1115", 
        "--color--white": "white" 
    }, { 
        "--color--darling-red": "white", 
        "--color--white": "#ec1115",
        scrollTrigger: {
            trigger: ".photos",
            start: "top top",
            end: "+=10px",
            scrub: true,
            ease: "none",
        },
        immediateRender: false,
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

    function refreshScroll() {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    }

    window.addEventListener("load", refreshScroll);
    window.addEventListener("resize", refreshScroll);
});
