console.log("connected - work - v3");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

    // COLOR SET
    gsap.set("html", { "--color--darling-red": "white", "--color--white": "black" });

    // WORK CARD ANIMATION
    let workCard = gsap.utils.toArray(".work-card");

    workCard.forEach((item, i) => {
        let wcAnimation = gsap.from(item, { opacity: 0, y: 10, paused: true });

        ScrollTrigger.create({
            trigger: item,
            start: "top 90%",
            end: "top 50%",
            onEnter: () => wcAnimation.play(),
            onLeaveBack: () => wcAnimation.reverse(),
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
        { "--color--black": "black" }, 
        { "--color--black": "#ed2024" });

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
