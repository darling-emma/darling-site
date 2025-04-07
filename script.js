console.log("Script is connected!");

<script>
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  markers: true
});
</script>

<script>
// Animate From
$(".header u-container-horiz").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(".wrap-50 align-left");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top center",
      end: "bottom top",
      scrub: 1
    }
  });
  tl.from(targetElement, {
    height: "100%",
    duration: 1
  });
});
</script>
