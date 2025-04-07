console.log("Script is connected!");

gsap.registerPlugin(ScrollTrigger);

gsap.to(".video-fullwidth u-container-vert", {
  scrollTrigger: ".video-fullwidth u-container-vert",
  x: 100,
  duration: 1,
});
