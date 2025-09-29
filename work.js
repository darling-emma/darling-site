console.log("connected - work - v4");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    // COLOR SET
    gsap.set("html", { "--color--darling-red": "white" });

    // LOAD ANIMATION
    gsap.timeline()
    .set(".work-page-collection-wrapper", { visibility: "visible", y: 5 })
    .to(".work-page-collection-wrapper", { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 });

    // WORK CARD ANIMATION
    let workCard = gsap.utils.toArray(".work-card");

    workCard.forEach((item) => {
        gsap.set(item, { opacity: 0, y: 10 });
        
        gsap.to(item, {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
            }
        });
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
