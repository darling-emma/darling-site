console.log("connected - thoughts - v3");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    // COLOR SET
    gsap.set("html", { "--color--darling-red": "white" });

    // AUTOALPHA
    gsap.to(".blog-collection-list", { autoAlpha: 1, duration: 0.2 });

    // LOAD ANIMATION
    gsap.from(".blog-collection-item", {
        opacity: 0,
        stagger: {
            amount: 0.3
        },
        ease: "power2.out",
        delay: 0.2,
    });

    // Blog Post Sharing Script
    const blogPostWrappers = document.querySelectorAll('.blog-post-wrapper');

    blogPostWrappers.forEach(wrapper => {
      const cmsUrl = wrapper.getAttribute('data-cms-url');
      const fullUrl = `https://www.darling.nyc/blog-posts/${cmsUrl}`; // Replace with your actual base URL

      console.log('Full URL:', fullUrl); // Check this in the console

      const linkedinBaseUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=';
      const twitterBaseUrl = 'https://twitter.com/intent/tweet?url=';
      const facebookBaseUrl = 'https://www.facebook.com/sharer/sharer.php?u=';

      const linkedinButton = wrapper.querySelector('#share-linkedin');
      const twitterButton = wrapper.querySelector('#share-twitter');
      const facebookButton = wrapper.querySelector('#share-facebook');

      if (linkedinButton) {
        linkedinButton.href = `${linkedinBaseUrl}${encodeURIComponent(fullUrl)}`;
      }
      if (twitterButton) {
        twitterButton.href = `${twitterBaseUrl}${encodeURIComponent(fullUrl)}`;
      }
      if (facebookButton) {
        facebookButton.href = `${facebookBaseUrl}${encodeURIComponent(fullUrl)}`;
      }
    });

    // FOOTER ENTRANCE
    let footerEntrance = gsap.timeline({
        scrollTrigger: {
            trigger: ".footer",
            start: "top 50%",
            end: "top top",
            scrub: true,
            ease: "none",
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
                ease: "none",
                onUpdate: function (self) {
                    const progress = self.progress;
                    if (window.footerLottie) {
                        window.footerLottie.goToAndStop((window.footerLottie.totalFrames - 1) * progress, true);
                    } 
                },
            },
    });
});
