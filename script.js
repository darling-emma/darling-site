console.log("Script is connected!");

gsap.registerPlugin(ScrollTrigger);

gsap.to(".video-embed", {
  scrollTrigger: ".video-embed",
  x: 100,
  duration: 1,
});
