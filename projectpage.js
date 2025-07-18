console.log("connected - projectpage - v1.5");

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    // AUTOALPHA
    gsap.to(".project-hero-text-wrapper", { autoAlpha: 1, duration: 0.2 });

    // LOAD ANIMATION
    let heroSplit = SplitText.create(".project-hero-text", {
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
    
    // HERO ANIMATION
    let projectHeroTL = gsap.timeline({
        scrollTrigger: {
            trigger: ".project-hero",
            pin: true,
            scrub: true,
            start: "top top",
            end: "+=700",
        }
    });
    projectHeroTL
    .to(".project-hero-text", {
        yPercent: -10,
        opacity: 0,
        duration: 1
    })
    .to(".project-hero-text-wrapper", {
        backgroundColor: "hsla(0, 0.00%, 0.00%, 0.00)",
        duration: 2,
    })
    .to(".project-hero-image-wrapper", {
        scale: 0.95,
        transformOrigin: "center center",
        duration: 2,
    }, "<");
    
    // VIDEO PLAYER SCRIPT
    const iframe = document.getElementById("custom-video");
    const playPauseButton = document.getElementById("playPauseButton");
    const soundToggleButton = document.getElementById("soundToggleButton");

    // Ensure Vimeo API is accessible
    if (typeof Vimeo === 'undefined' || !Vimeo.Player) {
        console.error("Vimeo Player API not loaded!");
        return;
    }

    const player = new Vimeo.Player(iframe);

    // Initially play the video muted
    player.setVolume(0);
    player.play().catch((error) => console.error("Error playing video:", error));

    // Toggle play/pause
    playPauseButton.addEventListener("click", () => {
        player.getPaused().then((paused) => {
            if (paused) {
                player.play().then(() => {
                    playPauseButton.innerHTML = '<span class="material-symbols-rounded">pause</span>';
                });
            } else {
                player.pause().then(() => {
                    playPauseButton.innerHTML = '<span class="material-symbols-rounded">play_arrow</span>';
                });
            }
        });
    });

    // Toggle sound on/off
    soundToggleButton.addEventListener("click", () => {
        player.getVolume().then((volume) => {
            if (volume > 0) {
                player.setVolume(0).then(() => {
                    soundToggleButton.innerHTML = '<span class="material-symbols-rounded">volume_off</span>';
                });
            } else {
                player.setVolume(1).then(() => {
                    soundToggleButton.innerHTML = '<span class="material-symbols-rounded">volume_up</span>';
                });
            }
        });
    });
});
