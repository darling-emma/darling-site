console.log("Script is connected!");

<script>
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: true
});
</script>

<script>
// Animate From
$(".textalign-center").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top center",
      end: "bottom top",
      scrub: true
    }
  });
  tl.from(targetElement, {
    opacity: 100,
    duration: 1
  });
});
</script>
