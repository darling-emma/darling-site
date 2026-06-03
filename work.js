console.log("connected - work - June 2026");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    // COLOR SET
    gsap.set("html", { "--color--darling-red": "white" });

    // LOAD ANIMATION
    gsap.timeline()
    .set(".work-page-collection-wrapper", { visibility: "visible", y: 5 })
    .to(".work-page-collection-wrapper", { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 });

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

    // FOOTER ENTRANCE
    gsap.fromTo("html", { 
        "--color--black": "black" 
    }, { 
        "--color--black": "#ed2024",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 50%",
            end: "top top",
            scrub: true,
            ease: "none",
            invalidateOnRefresh: true
        }
    });

    // FOOTER ANIMATION
    // Load Lottie
    window.footerLottie = lottie.loadAnimation({
        container: document.getElementById("footer-lottie-div"),
        path: "https://cdn.prod.website-files.com/6418ab0e18a18160ffc38a6f/666c8a5417e8d0638851db29_Footer_Area.json",
        renderer: "svg",
        autoplay: false,
        ease: "none",
    });

    gsap.timeline({
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
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
    }

    window.addEventListener("load", refreshScroll);
    window.addEventListener("resize", refreshScroll);
});
