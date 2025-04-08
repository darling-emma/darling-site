console.log("Script is connected!");

gsap.registerPlugin(ScrollTrigger);

gsap.to(".your-element", {
  scrollTrigger: ".your-element",
  x: 100,
  duration: 1,
});
