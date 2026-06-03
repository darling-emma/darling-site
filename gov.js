console.log("connected - gov - June 2026");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother,SplitText,Draggable,InertiaPlugin)
    
    const mm = gsap.matchMedia();

    smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper-gov",
        content: "#smooth-content-gov",
        smooth: 1,
        ignoreMobileResize: true,
        normalizeScroll: true,
    });

    // FUNCTIONS
    let heroScale, travelDistance, tabEnd, buttonEnd, paddingYes, travelDist;

    function getPadding() {
        if (window.innerWidth <= 479) {
            return 16 * 1;
        } else if (window.innerWidth <= 767) {
            return 16 * 1.5;
        } else {
            return 16 * 2;
        }
    }
    
    function scaleCalc() {
        const heroes = gsap.utils.toArray(".hero-gov");

        heroes.forEach(h => {
            const heroText = h.querySelector(".hero-text-wrap");
            let padding = getPadding();
            let heroWidth = h.offsetWidth - (2 * padding);
            let textWidth = heroText.scrollWidth || heroText.getBoundingClientRect().width;

            if (textWidth == heroWidth) {
                heroScale = 1;
            } else {
                heroScale = heroWidth / textWidth;
            }

            // console.log("text width", textWidth, "hero width", heroWidth, "hero scale", heroScale);

            gsap.set(heroText, { transformOrigin: "left center", scale: heroScale });
        });
    }

    function tabCalc() {
        const section = document.querySelector(".tabs-gov");
        const header = document.querySelector(".tab-header");
        const tabWrapper = document.querySelector(".tab-content-wrap");

        let padding = getPadding();
        paddingYes = `0px ${padding}px`;

        console.log("padding for tab header", paddingYes);

        let headerHeight = header.offsetHeight;
        gsap.set(section, { height: headerHeight });

        let contentHeight = tabWrapper.offsetHeight;
        let vHeight = window.innerHeight;
        let buttonHeight = contentHeight - vHeight + headerHeight;
        travelDistance = -1 * contentHeight;
        tabEnd = `+=${contentHeight}`;
        buttonEnd = `+=${buttonHeight}`;

        // console.log("travel distance", travelDistance, "tab end", tabEnd, "header height", headerHeight, "vHeight", vHeight, "buttonEnd", buttonEnd);
    }

    function getScrollPosition(animation, progress) {
        let p = gsap.utils.clamp(0, 1, progress || 0),
            st = animation.scrollTrigger,
            containerAnimation = st.vars.containerAnimation;
        if (containerAnimation) {
            let time = st.start + (st.end - st.start) * p;
            st = containerAnimation.scrollTrigger;
            return (
            st.start + (st.end - st.start) * (time / containerAnimation.duration())
            );
        }
        return st.start + (st.end - st.start) * p;
    }

    function freezeScroll() {
        smoother.paused(true);
    }
    
    function resumeScroll() {
        smoother.paused(false);
    }

    function tickerCalc() {
        const ticker = document.querySelector(".ticker-gov-move");
        travelDist = -1 * (ticker.scrollWidth / 2);
        console.log("travel distance", travelDist);
        return travelDist;
    }

    document.fonts.ready.then(() => {

        // MENU
        const logo = document.querySelector(".gov-logo-wrapper");
        const menuTrigger = document.getElementById("menu-trigger");
        const triggerIcon = menuTrigger.querySelector(".button-icon-gov-wrapper");
        const menuLinksWrapper = document.querySelector(".anchors-wrapper");
        const menuLinks = gsap.utils.toArray(".gov-menu-red");

        menuTrigger.dataset.open = "false";

        function menuOpen() {
            let menuOpen = gsap.timeline();

            menuOpen
            .set(menuLinksWrapper, { display: "flex" })
            .to("html", { "--color--menu-red": "#ffffff", "--color--menu-white": "#ec1115", duration: 0.4, ease: "none" }, "<")
            .to(triggerIcon, { rotation: 45, duration: 0.7, ease: "power2.out" }, "<")
            .to(logo, { rotation: -36, duration: 0.7, ease: "power2.out" }, "<")
            .fromTo(menuLinksWrapper, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: "power2.out" }, "<")
            .fromTo(menuLinks, { opacity: 0 }, { opacity: 1, stagger: 0.05, duration: 0.3, ease: "power2.out" }, "<");

            menuTrigger.querySelector(".gov-h6-white").textContent = "close";

            menuTrigger.dataset.open = "true";

            console.log("menu opened");
        }

        function menuClose() {
            let menuClose = gsap.timeline();
            const menuAlreadyClosed = menuTrigger.dataset.open === "false";

            if (menuAlreadyClosed) return;

            menuClose
            .fromTo(menuLinks, { opacity: 1 }, { opacity: 0, stagger: 0, duration: 0.3, ease: "power1.in" })
            .to("html", { "--color--menu-red": "#ec1115", "--color--menu-white": "#ffffff", duration: 0.3, ease: "none" }, "<")
            .fromTo(menuLinksWrapper, { yPercent: 0 }, { yPercent: -100, duration: 0.5, ease: "power2.in" }, "-=0.15")
            .to([logo, triggerIcon], { rotation: 0, duration: 0.5, ease: "power2.in" }, "<")
            .set(menuLinks, { opacity: 0 })
            .set(menuLinksWrapper, { display: "none" }, "<")
            .set("html", { "--color--menu-red": "var(--color--darling-red)", "--color--menu-white": "var(--color--white)" }, "<");

            menuTrigger.querySelector(".gov-h6-white").textContent = "menu";

            menuTrigger.dataset.open = "false";
            
            console.log("menu closed");
        }

        function handleClick() {
            const isClosed = menuTrigger.dataset.open === "false";

            if (isClosed) {
                menuOpen();
            } else {
                menuClose();
            }
        }

        menuTrigger.addEventListener("click", handleClick);

        const overviewB = document.getElementById("overview-nav");
        const coreB = document.getElementById("core-cap-nav");
        const govB = document.getElementById("gov-cap-nav");
        const diffB = document.getElementById("diff-nav");
        const caseB = document.getElementById("cases-nav");

        overviewB.addEventListener("click", () => {
            menuClose();
            smoother.scrollTo("#overview-section", false);
        });

        coreB.addEventListener("click", () => {
            menuClose();
            smoother.scrollTo(getScrollPosition(tabTl, 0), false);
        });

        govB.addEventListener("click", () => {
            menuClose();
            smoother.scrollTo(getScrollPosition(tabTl, 0.48), false);
        });

        diffB.addEventListener("click", () => {
            menuClose();
            smoother.scrollTo(getScrollPosition(tabTl, 0.72), false);
        });

        caseB.addEventListener("click", () => {
            menuClose();
            smoother.scrollTo("#cases-hero", false);
        });
        
        // HERO
        SplitText.create("#hero-split", {
            type: "chars",
            autoSplit: true,
            onSplit(self) {            
                return gsap.timeline()
                .set(".hero-text-wrap", { visibility: "visible", opacity: 1 })
                .from(self.chars, {
                    opacity: 0,
                    y: 100,
                    stagger: 0.05,
                    ease: "power2.out",
                    duration: 0.7,
                    onStart: scaleCalc,
                });
            }
        });

        SplitText.create("#hero-sub", {
            type: "words",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.words, {
                    autoAlpha: 0,
                    y: 25,
                    stagger: 0.05,
                    ease: "power2.out",
                    duration: 0.7
                });
            }
        });

        // VIDEO + NAV ANIMATION
        function getWidth() {
            return window.innerWidth;
        }

        function getHeight () {
            return window.innerHeight;
        }

        function remToPx(rem) {
            return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
        }

        mm.add({
            isMobile: "(max-width: 479px)",
            isDesktop: "(min-width: 480px)"
        }, (context) => {
            let { isMobile, isDesktop } = context.conditions;

            let width = () => {
                let padding = isMobile ? remToPx(2) : remToPx(4);
                return getWidth() - padding;
            };
            let height = () => {
                let padding = isMobile ? remToPx(2) : remToPx(4);
                let baseWidth = getWidth() - padding;
                return baseWidth * 0.5625;
            };
            let mobileHeight = () => {
                let mobilePadding = remToPx(4);
                return getHeight - mobilePadding;
            }

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".video-hero-wrapper",
                    start: "top 35%",
                    end: isMobile ? "bottom 90%" : "+=250",
                    scrub: true,
                    ease: "none",
                    invalidateOnRefresh: true,
                },
            });

            if (isMobile) {
                tl
                .to(".video-hero-div", { width: () => width() + "px", height: () => mobileHeight() + "px" })
                .to(".video-hero-div", { height: () => height() + "px" });
            } else {
                tl.to(".video-hero-div", { width: () => width() + "px", height: () => height() + "px" });
            }
        });
        
        // ACCORDION
		function bodyDragCreate (dragTarget, bounds, moveTarget) {
            var existingDrag = Draggable.get(dragTarget);
            if (existingDrag) { existingDrag.kill(); }

            Draggable.create(dragTarget, {
                type: "x",
                bounds: bounds,
                onDrag () {
                    var clamper = gsap.utils.clamp(0,1);

                    var bodyPercent = clamper((-1 * this.x) / (-1 * this.minX));
                    console.log("body progress:", bodyPercent);

                    var handleDrag = Draggable.get(moveTarget);
                    if (handleDrag.isPressed) return

                    gsap.set(moveTarget, {
                        x () {
                            var handleDrag = Draggable.get(moveTarget);
                            var travelDist = handleDrag.maxX;
                            var xPos = bodyPercent * travelDist;
                            console.log("x position:", xPos);
                            return xPos;
                        }
                    });
                }
            });
        }

        function handleDragCreate (dragTarget, bounds, moveTarget) {
            var existingDrag = Draggable.get(dragTarget);
            if (existingDrag) { existingDrag.kill(); }

            Draggable.create(dragTarget, {
                type: "x",
                bounds: bounds,
                onDrag() {
                    var clamper = gsap.utils.clamp(0,1);

                    var handlePercent = clamper(this.x / this.maxX);
                    console.log("handle progress:", handlePercent);

                    var bodyDrag = Draggable.get(moveTarget);
                    if (bodyDrag.isPressed) return

                    gsap.set(moveTarget, {
                        x () {
                            var bodyDrag = Draggable.get(moveTarget);
                            var travelDist = -1 * bodyDrag.minX;
                            var xPos = handlePercent * travelDist;
                            console.log("x position:", xPos);
                            if(xPos === 0) {
                                return xPos
                            } else {
                                return -1 * xPos
                            }
                        },
                        onComplete () {
                            var bodyDrag = Draggable.get(moveTarget);
                            var travelDist = -1 * bodyDrag.minX;
                            console.log("travel distance:", travelDist);
                        }
                    });
                }
            });
        }

        mm.add({
            yesScroll: "(max-width: 567px)",
            noScroll: "(min-width: 568px)"
        }, (context) => {
            let { yesScroll, noScroll } = context.conditions;

            let accordionItems = gsap.utils.toArray(".accordion-gov-item");

            let active = null;

            accordionItems.forEach((e, i) => {
                let head = e.querySelector(".gov-item-header");
                let body = e.querySelector(".gov-item-wrapper");
                let bodyContent = body.querySelector(".gov-item-content");
                let scroll = e.querySelector(".mobile-scroll");
                let scrollHandle = scroll.querySelector(".mobile-scroll-bar");
                let icon = head.querySelector(".button-icon-gov-wrapper");

                gsap.set([body, scroll], { visibility: "hidden", position: "absolute", pointerEvents: "none" });
                gsap.set(body, { height: 0, opacity: 0 });

                function closeTimeline(targetBody, targetIcon, targetScroll) {
                    let tl = gsap.timeline();
                    tl.to(targetBody, { height: "0px", ease: "power1.out", duration: 0.4 })
                        .to(targetIcon, { rotation: 0, ease: "power1.out", duration: 0.4 }, "<")
                        .to(targetBody, { opacity: 0, ease: "none", duration: 0.3 }, 0.1)
                        .set([targetBody, targetScroll], { visibility: "hidden", position: "absolute", pointerEvents: "none" }, ">");
                    return tl;
                }

                function openItem() {
                    if (active !== null && active !== i) {
                        const prev = accordionItems[active];
                        const prevBody = prev.querySelector(".gov-item-wrapper");
                        const prevHead = prev.querySelector(".gov-item-header");
                        const prevScroll = prev.querySelector(".mobile-scroll");
                        const prevIcon = prevHead.querySelector(".button-icon-gov-wrapper");

                        closeTimeline(prevBody, prevIcon, prevScroll);
                    }

                    let open = gsap.timeline();
                    open.set(body, { visibility: "visible", position: "relative", pointerEvents: "auto" })
                        .set(scroll, { visibility: yesScroll ? "visible" : "hidden", position: yesScroll ? "relative" : "absolute", pointerEvents: yesScroll ? "auto" : "none" }, "<")
                        .to(body, { opacity: 1, ease: "none", duration: 0.3 }, "<")
                        .to(body, { height: "auto", ease: "power1.out", duration: 0.4 }, "<")
                        .to(icon, { rotation: 45, ease: "power1.out", duration: 0.4 }, "<");

                    if (yesScroll) {
                        setTimeout(() => {
                            bodyDragCreate(bodyContent, body, scrollHandle);
                            handleDragCreate(scrollHandle, scroll, bodyContent);
                        }, 200)
                    }

                    active = i;
                }

                function closeItem() {
                    closeTimeline(body, icon, scroll);
                    active = null;          
                }

                head.addEventListener("click", () => {
                    if (active === i) {
                        closeItem();
                    } else {
                        openItem();
                    }
                });
            });
        });
      
        // LARGE PARAS
        let largeParas = gsap.utils.toArray("#large-para");

        largeParas.forEach(e => {
            SplitText.create(e, {
                type: "words",
                autoSplit: true,
                onSplit(self) {
                    const tl = gsap.timeline({ paused: true });
                    // explicitly set the initial (from) state so nothing pre-renders unexpectedly
                    gsap.set(self.words, { opacity: 0, y: 25 });
                    // animate to the captured final color
                    tl.to(self.words, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.05,
                        ease: "power2.out",
                        duration: 0.7,
                    });
                    ScrollTrigger.create({
                        trigger: e,
                        start: "top 95%",
                        onEnter: () => tl.play(),
                        onLeaveBack: () => tl.reverse(),
                        invalidateOnRefresh: true,
                    });
                    return tl;
                }
            });
        });

        // INTRO SMALL PARAS
        gsap.set(".slide", { opacity: 0, y: 100 });
        
        mm.add({
            isMobile: "(max-width: 479px)",
            isDesktop: "(min-width: 480px)"
        }, (context) => {
            let { isMobile, isDesktop } = context.conditions;

            gsap.to(".slide", { 
                y: 0, 
                opacity: 1, 
                stagger: 1, 
                duration: 1, 
                ease: "none",
                scrollTrigger: {
                    trigger: ".para-columns-wrapper-gov",
                    start: isDesktop ? "top 85%" : "top 75%",
                    end: isDesktop ? "top 25%" : "top top",
                    scrub: true,
                    invalidateOnRefresh: true,
                } 
            });

        });

        // TABS
        const section = document.querySelector(".tabs-gov");
        const header = document.querySelector(".tab-header");
        const content = document.querySelector(".tab-content-wrap");
        const button = document.querySelector(".download-wrapper");
        const tabs = gsap.utils.toArray(".tab-head-item");

        tabCalc();

        gsap.set(header, { margin: paddingYes, padding: "0px" });

        let headerGrow, headerShrink;

        mm.add({
            isTabletAbove: "(min-width: 768px)",
            isBelowTablet: "(max-width: 767px)",
        }, (context) => {
            let { isTabletAbove, isBelowTablet } = context.conditions;

            headerGrow = gsap.to(header, { margin: "0px", padding: isTabletAbove ? paddingYes : "0px", paused: true });
            headerShrink = gsap.to(header, { margin: paddingYes, padding: "0px", paused: true });

        });

        // Track and update the active tab based on main ScrollTrigger progress
        let currentActiveTab = -1;

        function setActiveTab(idx) {
            if (idx === currentActiveTab) return;
            // de-highlight previous
            if (currentActiveTab >= 0 && tabs[currentActiveTab]) {
                const prev = tabs[currentActiveTab];
                const prevText = prev.querySelector(".fontweight_bold");
                gsap.to(prev, { backgroundColor: "transparent", duration: 0.2 });
                gsap.to(prevText, { color: "#ec1115", duration: 0.2 });
            }
            // highlight new
            if (tabs[idx]) {
                const next = tabs[idx];
                const nextText = next.querySelector(".fontweight_bold");
                gsap.to(next, { backgroundColor: "#ec1115", duration: 0.2 });
                gsap.to(nextText, { color: "#ffffff", duration: 0.2 });
                currentActiveTab = idx;
            }
        }

        function progressToIndex(progress) {
            // Midpoints between the provided marker values (0, 0.48, 0.72)
            // thresholds: <0.24 => tab 1, >=0.24 & <0.6 => tab 2, >=0.6 => tab 3
            if (progress < 0.4) return 0;
            if (progress < 0.6) return 1;
            return 2;
        }

        if (button) {
            gsap.from(button, { 
                opacity: 0, 
                duration: 0.3, 
                ease: "none", 
                scrollTrigger: {
                    trigger: section,
                    start: "top 5%",
                    endTrigger: "#tab-diff",
                    end: "bottom bottom",
                    toggleActions: "play reverse play reverse",
                    invalidateOnRefresh: true,
                }
            });
        }

        let tabTl = gsap.to(content, {
            y: () => travelDistance,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => tabEnd,
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
                onEnter: () => headerGrow.play(),
                onLeave: () => headerShrink.play(),
                onEnterBack: () => headerShrink.reverse(),
                onLeaveBack: () => headerGrow.reverse(),
                onUpdate: (self) => {
                    const p = self.progress;
                    const idx = progressToIndex(p);
                    setActiveTab(idx);
                },
            }
        });

        tabs.forEach((t, i) => {
            t.addEventListener("click", () => {
                if (i === 0) {
                    smoother.scrollTo(getScrollPosition(tabTl, 0), false);
                }
                if (i === 1) {
                    smoother.scrollTo(getScrollPosition(tabTl, 0.48), false);
                }
                if (i === 2) {
                    smoother.scrollTo(getScrollPosition(tabTl, 0.72), false);
                }
            });
        });

        // CASE STUDY COLOR CHANGE
        let caseColor = gsap.timeline({
            scrollTrigger: {
                trigger: "#cases-hero",
                start: "top 30%",
                end: "top 10%",
                scrub: true,
                invalidateOnRefresh: true,
            }
        });

        caseColor.to("html", {
            "--color--black" : "white",
            "--color--darling-red" : "white",
            "--color--white" : "black",
            ease: "none",
            immediateRender: false,
        })
        .to(".tab-head-item", { backgroundColor: "transparent", ease: "none", immediateRender: false }, "<")
        .to("#tab-text", { color: "#ffffff", ease: "none", immediateRender: false }, "<");

        // CASE STUDY OPENING
        document.querySelectorAll('.work-page-collection-item').forEach(function(el) {
            const idTextEl = el.querySelector('.idtext');
            const idText = idTextEl ? idTextEl.textContent.trim() : '';
            if (idText) el.id = 'item-' + idText;
        });

        document.querySelectorAll('.modal-item').forEach(function(el) {
            const idTextEl = el.querySelector('.idtext');
            const dataIdText = idTextEl ? idTextEl.textContent.trim() : '';
            if (dataIdText) el.setAttribute('data-id', 'item-' + dataIdText);
        });

        const cases = gsap.utils.toArray('.work-page-collection-item');
        const modalContainer = document.querySelector(".modal");
        let modalActive = null;
        let modalAnimating = false;

        gsap.set(modalContainer, { height: 0, width: "100vw" });

        cases.forEach(function(e) {
            const id = e.id;
            const relatedModal = document.querySelector('.modal-item[data-id="' + id + '"]');
            if (!relatedModal) {
                console.warn('related modal not found');
                return;
            }

            gsap.set(relatedModal, { height: 0, width: "100vw" });

            const openModal = () => {
                if (modalAnimating || modalActive) return;
                // stop page smoothing/scroll so the modal's overflow works
                freezeScroll();
                // ensure the modal content can scroll
                relatedModal.style.overflowY = "auto";
                relatedModal.style.webkitOverflowScrolling = "touch";

                modalAnimating = true;
                let modalOpen = gsap.timeline({
                    onComplete: () => {
                        modalAnimating = false;
                        modalActive = relatedModal;
                        console.log("modal opened");
                    }
                });
                modalOpen
                .set(relatedModal, { overflow: "scroll" })
                .to(modalContainer, { height: "100svh" }, "<")
                .to(relatedModal, { height: "100svh" }, "<");
            };

            const closeBtn = relatedModal.querySelector(".modal-close-wrapper");
            const closeModal = (ev) => {
                if (ev) { ev.stopPropagation(); ev.preventDefault(); }
                if (modalAnimating || modalActive !== relatedModal) return;
                modalAnimating = true;
                let modalClose = gsap.timeline({
                    onComplete: () => {
                        modalAnimating = false;
                        modalActive = null;
                        // re-enable page scrolling
                        resumeScroll();
                        console.log("modal closed");
                    }
                });
                modalClose
                .to(relatedModal, { height: 0 })
                .to(modalContainer, { height: 0 }, "<")
                .set(relatedModal, { overflow: "hidden" });
            };

            e.addEventListener("click", openModal);
            if (closeBtn) closeBtn.addEventListener("click", closeModal);
        });

        // LOGO TICKER
        const ticker = document.querySelector(".ticker-gov-move");
        tickerCalc();
        gsap.to(ticker, { x: () => tickerCalc(), duration: 20, ease: "none", repeat: -1 });

        // FOOTER ANIMATION
        // Load Lottie
        window.footerLottie = lottie.loadAnimation({
            container: document.getElementById("footer-lottie-div"),
            path: "https://cdn.prod.website-files.com/6418ab0e18a18160ffc38a6f/666c8a5417e8d0638851db29_Footer_Area.json",
            renderer: "svg",
            autoplay: false,
        });

        let footerEntrance = gsap.timeline({
            scrollTrigger: {
                    id: "footerAnimation",
                    trigger: ".footer",
                    start: "top 50%",
                    end: "bottom bottom",
                    ease: "none",
                    scrub: true,
                    onUpdate: function (self) {
                        const progress = self.progress;
                        if (window.footerLottie) {
                            window.footerLottie.goToAndStop((window.footerLottie.totalFrames - 1) * progress, true);
                        } 
                    },
                },
        });

        footerEntrance.to("html", {
            "--color--black" : "white",
            "--color--darling-red" : "white",
            "--color--white" : "#ec1115",
            ease: "none",
            immediateRender: false,
        });

        // SCROLL TRIGGER REFRESH
        ScrollTrigger.refresh();
        setActiveTab(0);
    });

    // ON RESIZE
    window.addEventListener("resize", () => {
        setTimeout(() => {
            document.fonts.ready.then(() => {
                scaleCalc();
                tabCalc();
                tickerCalc();
                ScrollTrigger.refresh();
            })
        }, 200)
    });
});
