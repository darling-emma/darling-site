console.log("connected - thoughts - June 2026");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger)

    // COLOR SET
    gsap.set("html", { "--color--darling-red": "white" });

    // LOAD ANIMATION
    gsap.timeline()
    .set(".blog-collection-item", { visibility: "visible", y: -5 })
    .to(".blog-collection-item", { opacity: 1, y: 0, ease: "power2.out", duration: 0.3, stagger: 0.15 });

    // ACCORDION OPEN
    let blogHeading = [], blogText = [];

    gsap.utils.toArray(".post-body").forEach((t, i) => {
        blogText[i] = t;
        gsap.set(blogText[i], { height: 0 });
        blogText[i].dataset.open = "false";
    });

    function blogPostOpen(i) {
        gsap.to(blogText[i], { height: "auto", duration: 0.8, ease: "power2.out" });
        blogText[i].dataset.open = "true";
    }

    function blogPostClose(i) {
        gsap.to(blogText[i], { height: 0, duration: 0.8, ease: "power2.in" });
        blogText[i].dataset.open = "false";
    }

    function handleClick(i) {
        const isOpen = blogText[i].dataset.open === "true";
        if (isOpen) {
            blogPostClose(i);
        } else {
            blogPostOpen(i);
        }
    }

    gsap.utils.toArray(".blog-heading").forEach((h, i) => {
        blogHeading[i] = h;
        blogHeading[i].addEventListener("click", () => handleClick(i));
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
});
