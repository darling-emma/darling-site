console.log("contact - connected - v1");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(SplitText)

    // AUTOALPHA
    gsap.to(".contact-content", { autoAlpha: 1, duration: 0.2 });

    // LOAD ANIMATION
    SplitText.create(".contact-text", {
        type: "lines",
        autoSplit: true,
        onSplit(self) {
            return gsap.from(self.lines, {
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

    gsap.from(".contact-item", {
        opacity: 0,
        stagger: {
            amount: 0.3
        },
        ease: "power2.out",
        delay: 0.2,
    });
});
